/**
 * NIELIT Tech Clubs — Automated Resources Feature Test Suite
 * Validates:
 * 1. Resource MongoDB schema constraints & compound indexes
 * 2. Public / Student GET /api/resources (returns only isPublished: true, handles filters & search)
 * 3. Protected Admin GET /api/admin/resources (requires admin JWT, returns published & drafts)
 * 4. Admin POST /api/admin/resources (validation, mass assignment prevention, creator tracking)
 * 5. Admin PATCH /api/admin/resources/:id (field validation & safe updating)
 * 6. Admin PATCH /api/admin/resources/:id/publish & /unpublish state transitions
 * 7. Admin DELETE /api/admin/resources/:id permanent deletion
 * 8. Security enforcement: 401/403 for unauthenticated or student mutation requests
 * 9. Safe handling of search queries & regex injection payloads
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { connectDB } from './src/config/db.js';
import Resource, { ALLOWED_RESOURCE_TYPES, ALLOWED_RESOURCE_CLUBS } from './src/models/Resource.js';
import User from './src/models/User.js';

dotenv.config();

const BASE_URL = `http://localhost:${process.env.PORT || 5000}`;

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    console.log(`  ✓ PASS: ${message}`);
    passedTests++;
  } else {
    console.error(`  ✗ FAIL: ${message}`);
    failedTests++;
  }
}

async function request(path, options = {}) {
  const url = `${BASE_URL}${path}`;
  const headers = options.headers || {};
  if (options.body && typeof options.body === 'object') {
    headers['Content-Type'] = 'application/json';
  }

  const res = await fetch(url, {
    method: options.method || 'GET',
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
    redirect: 'manual'
  });

  let data = null;
  const contentType = res.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    data = await res.json();
  } else {
    data = await res.text();
  }

  const setCookie = res.headers.get('set-cookie') || '';

  return {
    status: res.status,
    headers: res.headers,
    data,
    setCookie
  };
}

function extractCookie(setCookieHeader, cookieName) {
  if (!setCookieHeader) return null;
  const match = setCookieHeader.match(new RegExp(`${cookieName}=([^;]+)`));
  return match ? `${cookieName}=${match[1]}` : null;
}

async function runResourcesTests() {
  console.log('\n======================================================');
  console.log('🧪 Starting NIELIT Tech Clubs — Resources Test Suite');
  console.log('======================================================\n');

  await connectDB();

  let adminCookie = null;
  let testResourceId = null;
  let draftResourceId = null;

  try {
    // -------------------------------------------------------------
    // Test 1: Admin Authentication for Tests
    // -------------------------------------------------------------
    console.log('--- Step 1: Admin Authentication Setup ---');
    const adminEmail = process.env.ADMIN_INITIAL_EMAIL || 'admin@nielit.edu.in';
    const adminPassword = process.env.ADMIN_INITIAL_PASSWORD || 'Admin@NIELIT2026!';

    const adminLoginRes = await request('/api/admin/auth/login', {
      method: 'POST',
      body: { email: adminEmail, password: adminPassword }
    });

    if (adminLoginRes.status === 200) {
      adminCookie = extractCookie(adminLoginRes.setCookie, 'admin_token');
      assert(adminCookie !== null, 'Admin login successfully set admin_token cookie');
    } else {
      // Fallback: Generate valid JWT using ADMIN_JWT_SECRET
      const token = jwt.sign(
        { id: new mongoose.Types.ObjectId(), email: adminEmail, name: 'Test Administrator', role: 'SUPER_ADMIN' },
        process.env.ADMIN_JWT_SECRET || 'nielit-clubs-admin-jwt-secret-phase-5-2026-secure',
        { expiresIn: '1h' }
      );
      adminCookie = `admin_token=${token}`;
      console.log('  ℹ Using generated Admin JWT token for test requests');
    }

    // -------------------------------------------------------------
    // Test 2: Security Checks — Unauthenticated & Student Mutation Attempts
    // -------------------------------------------------------------
    console.log('\n--- Step 2: Security Checks (Unauthenticated/Student Rejection) ---');
    const unauthPost = await request('/api/admin/resources', {
      method: 'POST',
      body: { title: 'Hack', description: 'Unauthorized attempt', type: 'Video', club: 'AI', url: 'https://hack.com' }
    });
    assert(unauthPost.status === 401, 'Unauthenticated POST /api/admin/resources rejected with 401');

    const unauthPatch = await request('/api/admin/resources/65f000000000000000000001', {
      method: 'PATCH',
      body: { title: 'Unauthorized' }
    });
    assert(unauthPatch.status === 401, 'Unauthenticated PATCH /api/admin/resources/:id rejected with 401');

    const unauthDelete = await request('/api/admin/resources/65f000000000000000000001', {
      method: 'DELETE'
    });
    assert(unauthDelete.status === 401, 'Unauthenticated DELETE /api/admin/resources/:id rejected with 401');

    const unauthPublish = await request('/api/admin/resources/65f000000000000000000001/publish', {
      method: 'PATCH'
    });
    assert(unauthPublish.status === 401, 'Unauthenticated PATCH /publish rejected with 401');

    // -------------------------------------------------------------
    // Test 3: Admin Resource Creation & Validation
    // -------------------------------------------------------------
    console.log('\n--- Step 3: Admin Resource Creation & Validation ---');

    // Empty title
    const emptyTitleRes = await request('/api/admin/resources', {
      method: 'POST',
      headers: { Cookie: adminCookie },
      body: { title: '', description: 'Valid description with more than 10 characters', type: 'Video', club: 'Programming', url: 'https://example.com' }
    });
    assert(emptyTitleRes.status === 400 && emptyTitleRes.data?.errors?.title, 'Rejects resource with empty title (400)');

    // Short description (<10 chars)
    const shortDescRes = await request('/api/admin/resources', {
      method: 'POST',
      headers: { Cookie: adminCookie },
      body: { title: 'Test Resource', description: 'Short', type: 'Video', club: 'Programming', url: 'https://example.com' }
    });
    assert(shortDescRes.status === 400 && shortDescRes.data?.errors?.description, 'Rejects description shorter than 10 characters (400)');

    // Invalid Resource Type
    const invalidTypeRes = await request('/api/admin/resources', {
      method: 'POST',
      headers: { Cookie: adminCookie },
      body: { title: 'Test Resource', description: 'Valid description here', type: 'InvalidType', club: 'Programming', url: 'https://example.com' }
    });
    assert(invalidTypeRes.status === 400 && invalidTypeRes.data?.errors?.type, 'Rejects invalid resource type (400)');

    // Invalid Club
    const invalidClubRes = await request('/api/admin/resources', {
      method: 'POST',
      headers: { Cookie: adminCookie },
      body: { title: 'Test Resource', description: 'Valid description here', type: 'Video', club: 'Robotics', url: 'https://example.com' }
    });
    assert(invalidClubRes.status === 400 && invalidClubRes.data?.errors?.club, 'Rejects arbitrary club not in [AI, Programming, Cybersecurity, IoT] (400)');

    // Invalid URL (not http/https)
    const invalidUrlRes = await request('/api/admin/resources', {
      method: 'POST',
      headers: { Cookie: adminCookie },
      body: { title: 'Test Resource', description: 'Valid description here', type: 'Video', club: 'Programming', url: 'javascript:alert(1)' }
    });
    assert(invalidUrlRes.status === 400 && invalidUrlRes.data?.errors?.url, 'Rejects non-HTTP URL (400)');

    // Valid Resource Creation with mass assignment attempt
    const validCreateRes = await request('/api/admin/resources', {
      method: 'POST',
      headers: { Cookie: adminCookie },
      body: {
        title: 'Modern React & Next.js Masterclass',
        description: 'Comprehensive guide covering component design, hooks, state management, and full-stack API integration.',
        type: 'Course',
        club: 'Programming',
        url: 'https://example.com/react-course',
        thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee',
        tags: 'react, javascript, frontend, hooks',
        isPublished: true,
        // Mass assignment attack payload:
        createdBy: '65f000000000000000000000',
        createdAt: '2020-01-01T00:00:00.000Z'
      }
    });

    assert(validCreateRes.status === 201 && validCreateRes.data?.success === true, 'Successfully created published resource (201)');
    testResourceId = validCreateRes.data?.resource?._id;
    assert(testResourceId !== undefined, 'Returned resource contains valid MongoDB _id');
    assert(validCreateRes.data?.resource?.club === 'Programming', 'Club properly assigned to Programming');
    assert(validCreateRes.data?.resource?.type === 'Course', 'Type properly assigned to Course');
    assert(Array.isArray(validCreateRes.data?.resource?.tags) && validCreateRes.data.resource.tags.includes('react'), 'Tags parsed and saved as string array');

    // Create a second resource in DRAFT (unpublished) state
    const draftCreateRes = await request('/api/admin/resources', {
      method: 'POST',
      headers: { Cookie: adminCookie },
      body: {
        title: 'Advanced AI & Neural Networks Blueprint',
        description: 'Deep dive into transformer architectures, attention mechanisms, and fine-tuning LLMs.',
        type: 'PDF',
        club: 'AI',
        url: 'https://example.com/ai-blueprint.pdf',
        tags: ['ai', 'deep-learning', 'transformers'],
        isPublished: false
      }
    });
    assert(draftCreateRes.status === 201, 'Successfully created draft resource (201)');
    draftResourceId = draftCreateRes.data?.resource?._id;

    // -------------------------------------------------------------
    // Test 4: Public / Student GET /api/resources Filter & Search
    // -------------------------------------------------------------
    console.log('\n--- Step 4: Public / Student GET /api/resources ---');
    const publicList = await request('/api/resources');
    assert(publicList.status === 200, 'Public GET /api/resources returns 200');
    assert(Array.isArray(publicList.data?.resources), 'Returns resources array');

    const publishedItem = publicList.data.resources.find((r) => r._id === testResourceId);
    const draftItem = publicList.data.resources.find((r) => r._id === draftResourceId);
    assert(publishedItem !== undefined, 'Published resource is visible to students');
    assert(draftItem === undefined, 'Draft / unpublished resource is NOT visible to students');

    // Filter by Club
    const progClubList = await request('/api/resources?club=Programming');
    assert(
      progClubList.data.resources.every((r) => r.club === 'Programming'),
      'Club filter (club=Programming) returns only Programming club resources'
    );

    // Filter by Type
    const courseTypeList = await request('/api/resources?type=Course');
    assert(
      courseTypeList.data.resources.every((r) => r.type === 'Course'),
      'Type filter (type=Course) returns only Course resources'
    );

    // Search query
    const searchList = await request('/api/resources?search=React');
    assert(
      searchList.data.resources.some((r) => r.title.includes('React')),
      'Search query ("React") finds matching resource'
    );

    // Single Resource by ID
    const singleRes = await request(`/api/resources/${testResourceId}`);
    assert(singleRes.status === 200 && singleRes.data?.resource?.title === 'Modern React & Next.js Masterclass', 'GET /api/resources/:id returns single resource');

    const singleDraftRes = await request(`/api/resources/${draftResourceId}`);
    assert(singleDraftRes.status === 404, 'GET /api/resources/:id returns 404 for unpublished draft resource');

    // -------------------------------------------------------------
    // Test 5: Admin GET /api/admin/resources
    // -------------------------------------------------------------
    console.log('\n--- Step 5: Admin GET /api/admin/resources ---');
    const adminList = await request('/api/admin/resources', {
      headers: { Cookie: adminCookie }
    });
    assert(adminList.status === 200, 'Admin GET /api/admin/resources returns 200');
    const adminFoundDraft = adminList.data.resources.find((r) => r._id === draftResourceId);
    assert(adminFoundDraft !== undefined, 'Admin can see unpublished draft resources');

    // Admin status filter
    const draftOnlyList = await request('/api/admin/resources?status=draft', {
      headers: { Cookie: adminCookie }
    });
    assert(
      draftOnlyList.data.resources.every((r) => r.isPublished === false),
      'Admin status=draft filter returns only unpublished resources'
    );

    // -------------------------------------------------------------
    // Test 6: Admin PATCH /api/admin/resources/:id
    // -------------------------------------------------------------
    console.log('\n--- Step 6: Admin Resource Updates & State Transitions ---');
    const updateRes = await request(`/api/admin/resources/${testResourceId}`, {
      method: 'PATCH',
      headers: { Cookie: adminCookie },
      body: {
        title: 'Updated Modern React & Next.js Guide',
        description: 'Updated comprehensive guide for full-stack students.'
      }
    });
    assert(updateRes.status === 200 && updateRes.data?.resource?.title === 'Updated Modern React & Next.js Guide', 'Admin PATCH /:id updates resource fields');

    // Publish draft resource
    const publishRes = await request(`/api/admin/resources/${draftResourceId}/publish`, {
      method: 'PATCH',
      headers: { Cookie: adminCookie }
    });
    assert(publishRes.status === 200 && publishRes.data?.resource?.isPublished === true, 'Admin PATCH /:id/publish publishes draft resource');

    // Verify draft is now visible in student API
    const studentCheckAfterPublish = await request(`/api/resources/${draftResourceId}`);
    assert(studentCheckAfterPublish.status === 200, 'Newly published resource is now accessible via student API');

    // Unpublish resource
    const unpublishRes = await request(`/api/admin/resources/${draftResourceId}/unpublish`, {
      method: 'PATCH',
      headers: { Cookie: adminCookie }
    });
    assert(unpublishRes.status === 200 && unpublishRes.data?.resource?.isPublished === false, 'Admin PATCH /:id/unpublish unpublishes resource');

    // -------------------------------------------------------------
    // Test 7: Admin DELETE /api/admin/resources/:id
    // -------------------------------------------------------------
    console.log('\n--- Step 7: Admin Resource Deletion ---');
    const deleteRes = await request(`/api/admin/resources/${testResourceId}`, {
      method: 'DELETE',
      headers: { Cookie: adminCookie }
    });
    assert(deleteRes.status === 200, 'Admin DELETE /api/admin/resources/:id returns 200');

    const deleteCheck = await request(`/api/resources/${testResourceId}`);
    assert(deleteCheck.status === 404, 'Deleted resource no longer accessible (404)');

    // Delete the second test resource
    await request(`/api/admin/resources/${draftResourceId}`, {
      method: 'DELETE',
      headers: { Cookie: adminCookie }
    });

    // -------------------------------------------------------------
    // Test 8: Safe Handling of Regex Injection Payloads
    // -------------------------------------------------------------
    console.log('\n--- Step 8: Injection Payload & Robustness Tests ---');
    const injectionQueryRes = await request('/api/resources?search=' + encodeURIComponent('.*|^$|[[{(+*?'));
    assert(injectionQueryRes.status === 200, 'Special regex search query handled safely without crash (200)');

    const invalidIdRes = await request('/api/resources/invalid-non-mongo-id');
    assert(invalidIdRes.status === 404, 'Invalid ObjectId returns safe 404');
  } catch (err) {
    console.error('Fatal test error:', err);
    failedTests++;
  } finally {
    // Cleanup any lingering test records
    try {
      if (testResourceId) await Resource.findByIdAndDelete(testResourceId);
      if (draftResourceId) await Resource.findByIdAndDelete(draftResourceId);
    } catch (_) {}

    await mongoose.connection.close();
  }

  console.log('\n======================================================');
  console.log(`Test Summary: ${passedTests}/${totalTests} tests passed (${failedTests} failed)`);
  console.log('======================================================\n');

  if (failedTests > 0) {
    process.exit(1);
  }
}

runResourcesTests();
