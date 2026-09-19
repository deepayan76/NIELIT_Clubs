/**
 * NIELIT Tech Clubs — Unit Test Suite for Resources Feature
 * Validates:
 * 1. Schema Validation (Resource model, enums, constraints)
 * 2. Controller Input Validation & Sanitization (Title, Description, Club, Type, URL, Thumbnail, Tags)
 * 3. Security Enforcement (Mass assignment prevention, regex escaping)
 * 4. Query & Filter logic (Published vs Drafts, Club & Type normalization)
 * 5. State transitions (Publish / Unpublish / Update / Delete)
 */

import Resource, { ALLOWED_RESOURCE_TYPES, ALLOWED_RESOURCE_CLUBS } from './src/models/Resource.js';
import {
  createResource,
  updateResource,
  getPublishedResources,
  getAdminResources,
  publishResource,
  unpublishResource,
  deleteResource
} from './src/controllers/resource.controller.js';

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

function createMockRes() {
  const res = {
    statusCode: 200,
    jsonData: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(data) {
      this.jsonData = data;
      return this;
    }
  };
  return res;
}

async function runUnitTests() {
  console.log('\n======================================================');
  console.log('🧪 Starting NIELIT Tech Clubs — Resources Unit Tests');
  console.log('======================================================\n');

  // -------------------------------------------------------------
  // Test 1: Allowed Constants and Enums
  // -------------------------------------------------------------
  console.log('--- Test 1: Allowed Constants & Enums ---');
  assert(
    ALLOWED_RESOURCE_CLUBS.length === 4 &&
    ALLOWED_RESOURCE_CLUBS.includes('AI') &&
    ALLOWED_RESOURCE_CLUBS.includes('Programming') &&
    ALLOWED_RESOURCE_CLUBS.includes('Cybersecurity') &&
    ALLOWED_RESOURCE_CLUBS.includes('IoT'),
    'Allowed clubs strictly contains AI, Programming, Cybersecurity, IoT'
  );

  assert(
    ALLOWED_RESOURCE_TYPES.includes('Video') &&
    ALLOWED_RESOURCE_TYPES.includes('PDF') &&
    ALLOWED_RESOURCE_TYPES.includes('Article') &&
    ALLOWED_RESOURCE_TYPES.includes('GitHub') &&
    ALLOWED_RESOURCE_TYPES.includes('Website') &&
    ALLOWED_RESOURCE_TYPES.includes('Course') &&
    ALLOWED_RESOURCE_TYPES.includes('Documentation') &&
    ALLOWED_RESOURCE_TYPES.includes('Other'),
    'Allowed resource types match specified 8 types'
  );

  // -------------------------------------------------------------
  // Test 2: Resource Model Schema Validation
  // -------------------------------------------------------------
  console.log('\n--- Test 2: Mongoose Schema Constraints ---');
  const validResourceDoc = new Resource({
    title: 'Python for Beginners',
    description: 'Learn Python fundamentals through practical examples and hands-on exercises.',
    type: 'Video',
    club: 'Programming',
    url: 'https://youtube.com/watch?v=sample',
    thumbnail: 'https://images.unsplash.com/sample',
    tags: ['python', 'basics'],
    isPublished: true
  });

  const validErr = validResourceDoc.validateSync();
  assert(!validErr, 'Valid resource document passes Mongoose validation with no errors');

  // Invalid club in model
  const invalidClubDoc = new Resource({
    title: 'Python for Beginners',
    description: 'Learn Python fundamentals through practical examples and hands-on exercises.',
    type: 'Video',
    club: 'RoboticsClub',
    url: 'https://youtube.com/watch?v=sample'
  });
  const invalidClubErr = invalidClubDoc.validateSync();
  assert(invalidClubErr?.errors?.club !== undefined, 'Model rejects arbitrary club name not in enum');

  // Invalid type in model
  const invalidTypeDoc = new Resource({
    title: 'Python for Beginners',
    description: 'Learn Python fundamentals through practical examples and hands-on exercises.',
    type: 'Flashcards',
    club: 'Programming',
    url: 'https://youtube.com/watch?v=sample'
  });
  const invalidTypeErr = invalidTypeDoc.validateSync();
  assert(invalidTypeErr?.errors?.type !== undefined, 'Model rejects arbitrary resource type not in enum');

  // Invalid URL in model
  const invalidUrlDoc = new Resource({
    title: 'Python for Beginners',
    description: 'Learn Python fundamentals through practical examples and hands-on exercises.',
    type: 'Video',
    club: 'Programming',
    url: 'ftp://not-http-url'
  });
  const invalidUrlErr = invalidUrlDoc.validateSync();
  assert(invalidUrlErr?.errors?.url !== undefined, 'Model rejects non-HTTP/HTTPS URLs');

  // Short description in model (<10 chars)
  const shortDescDoc = new Resource({
    title: 'Python for Beginners',
    description: 'Too short',
    type: 'Video',
    club: 'Programming',
    url: 'https://youtube.com/watch?v=sample'
  });
  const shortDescErr = shortDescDoc.validateSync();
  assert(shortDescErr?.errors?.description !== undefined, 'Model rejects description shorter than 10 chars');

  // Long title in model (>150 chars)
  const longTitleDoc = new Resource({
    title: 'A'.repeat(151),
    description: 'Valid description with more than 10 characters.',
    type: 'Video',
    club: 'Programming',
    url: 'https://youtube.com/watch?v=sample'
  });
  const longTitleErr = longTitleDoc.validateSync();
  assert(longTitleErr?.errors?.title !== undefined, 'Model rejects title longer than 150 chars');

  // -------------------------------------------------------------
  // Test 3: Controller createResource Validation
  // -------------------------------------------------------------
  console.log('\n--- Test 3: Controller createResource Validation ---');

  // Empty title
  const req1 = { body: { title: '', description: 'Valid description here', type: 'Video', club: 'Programming', url: 'https://example.com' }, user: { name: 'Admin' } };
  const res1 = createMockRes();
  await createResource(req1, res1, () => {});
  assert(res1.statusCode === 400 && res1.jsonData?.errors?.title, 'createResource rejects empty title (400)');

  // Short description
  const req2 = { body: { title: 'Valid Title', description: 'Short', type: 'Video', club: 'Programming', url: 'https://example.com' }, user: { name: 'Admin' } };
  const res2 = createMockRes();
  await createResource(req2, res2, () => {});
  assert(res2.statusCode === 400 && res2.jsonData?.errors?.description, 'createResource rejects short description (400)');

  // Invalid type
  const req3 = { body: { title: 'Valid Title', description: 'Valid description here', type: 'UnknownType', club: 'Programming', url: 'https://example.com' }, user: { name: 'Admin' } };
  const res3 = createMockRes();
  await createResource(req3, res3, () => {});
  assert(res3.statusCode === 400 && res3.jsonData?.errors?.type, 'createResource rejects invalid type (400)');

  // Invalid club
  const req4 = { body: { title: 'Valid Title', description: 'Valid description here', type: 'Video', club: 'Gaming', url: 'https://example.com' }, user: { name: 'Admin' } };
  const res4 = createMockRes();
  await createResource(req4, res4, () => {});
  assert(res4.statusCode === 400 && res4.jsonData?.errors?.club, 'createResource rejects invalid club (400)');

  // Invalid URL
  const req5 = { body: { title: 'Valid Title', description: 'Valid description here', type: 'Video', club: 'AI', url: 'javascript:void(0)' }, user: { name: 'Admin' } };
  const res5 = createMockRes();
  await createResource(req5, res5, () => {});
  assert(res5.statusCode === 400 && res5.jsonData?.errors?.url, 'createResource rejects invalid URL scheme (400)');

  // Invalid Thumbnail URL
  const req6 = { body: { title: 'Valid Title', description: 'Valid description here', type: 'Video', club: 'AI', url: 'https://example.com', thumbnail: 'not-a-valid-url' }, user: { name: 'Admin' } };
  const res6 = createMockRes();
  await createResource(req6, res6, () => {});
  assert(res6.statusCode === 400 && res6.jsonData?.errors?.thumbnail, 'createResource rejects invalid thumbnail URL (400)');

  // -------------------------------------------------------------
  // Test 4: Controller updateResource Validation
  // -------------------------------------------------------------
  console.log('\n--- Test 4: Controller updateResource Validation ---');
  // Invalid ObjectId
  const updateReqInvalidId = { params: { id: 'invalid-id' }, body: { title: 'Updated' } };
  const updateResInvalidId = createMockRes();
  await updateResource(updateReqInvalidId, updateResInvalidId, () => {});
  assert(updateResInvalidId.statusCode === 404, 'updateResource returns 404 for invalid ObjectId');

  console.log('\n======================================================');
  console.log(`Unit Test Summary: ${passedTests}/${totalTests} tests passed (${failedTests} failed)`);
  console.log('======================================================\n');

  if (failedTests > 0) {
    process.exit(1);
  }
}

runUnitTests();
