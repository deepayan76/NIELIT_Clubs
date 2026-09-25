import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from './src/models/User.js';
import Registration from './src/models/Registration.js';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

const BASE_URL = 'http://localhost:5000';

async function runPhase5Tests() {
  console.log('====================================================');
  console.log('🧪 Starting NIELIT Tech Clubs Phase 5 Test Suite');
  console.log('====================================================\n');

  let passed = 0;
  let failed = 0;

  async function test(name, fn) {
    try {
      await fn();
      console.log(`✅ PASS: ${name}`);
      passed++;
    } catch (err) {
      console.error(`❌ FAIL: ${name}`);
      console.error(`   Reason: ${err.message}`);
      failed++;
    }
  }

  // Connect to DB directly for state inspections
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGODB_URI);
  }

  let adminCookie = null;
  let studentCookie = null;
  let testReg1Id = null;
  let testReg2Id = null;
  let studentUserId = null;

  // Cleanup old test data
  await Registration.deleteMany({ email: 'deepayansaha76@gmail.com' });
  await User.deleteMany({ email: 'deepayansaha76@gmail.com' });

  // Test 1: Admin Login Failure (Wrong password)
  await test('Admin login with invalid credentials returns 401', async () => {
    const res = await fetch(`${BASE_URL}/api/admin/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: process.env.ADMIN_EMAIL || 'admin@nexora.club.in', password: 'WrongPassword999' })
    });
    if (res.status !== 401) throw new Error(`Expected 401, got ${res.status}`);
    const body = await res.json();
    if (body.success !== false) throw new Error('Expected success to be false');
  });

  // Test 2: Admin Login Success (Issues HTTP-only Cookie)
  await test('Admin login with valid credentials returns 200 and sets nielit_admin_token cookie', async () => {
    const res = await fetch(`${BASE_URL}/api/admin/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: process.env.ADMIN_EMAIL || 'admin@nexora.club.in', password: 'Admin@123' })
    });
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
    const setCookie = res.headers.get('set-cookie');
    if (!setCookie || !setCookie.includes('nielit_admin_token')) {
      throw new Error('Expected set-cookie header containing nielit_admin_token');
    }
    // Extract cookie value for subsequent requests
    adminCookie = setCookie.split(';')[0];
    const body = await res.json();
    if (!body.success) throw new Error('Expected success: true');
  });

  // Test 3: Protected Admin Endpoints without Cookie -> 401
  await test('GET /api/admin/registrations without admin cookie returns 401 Unauthorized', async () => {
    const res = await fetch(`${BASE_URL}/api/admin/registrations`);
    if (res.status !== 401) throw new Error(`Expected 401, got ${res.status}`);
  });

  // Test 4: Protected Admin Endpoints with Admin Cookie -> 200
  await test('GET /api/admin/registrations with valid admin cookie returns 200', async () => {
    const res = await fetch(`${BASE_URL}/api/admin/registrations`, {
      headers: { Cookie: adminCookie }
    });
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
    const body = await res.json();
    if (!body.success) throw new Error('Expected success: true');
  });

  // Test 5: Submit Fresh Registration 1 for Approval Test
  await test('Student submits registration -> saved to MongoDB with PENDING status', async () => {
    const res = await fetch(`${BASE_URL}/api/registrations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test Student One',
        rollNumber: '24NLT888',
        email: 'deepayansaha76@gmail.com',
        semester: 1,
        club: 'Programming',
        reason: 'Passionate about systems programming and competitive algorithms.'
      })
    });
    if (res.status !== 201) throw new Error(`Expected 201, got ${res.status}`);
    const body = await res.json();
    testReg1Id = body.registration.id;
    const doc = await Registration.findById(testReg1Id);
    if (!doc || doc.status !== 'PENDING') throw new Error('Registration is not PENDING in DB');
  });

  // Test 6: Student Login before approval -> 401
  await test('Student login before approval returns 401 (No account exists yet)', async () => {
    const res = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'deepayansaha76@gmail.com', password: 'SomePassword123' })
    });
    if (res.status !== 401) throw new Error(`Expected 401, got ${res.status}`);
  });

  // Test 7: Admin Approves Registration 1
  await test('Admin approves registration -> creates ACTIVE User, updates status, and hashes password', async () => {
    const res = await fetch(`${BASE_URL}/api/admin/registrations/${testReg1Id}/approve`, {
      method: 'PATCH',
      headers: { Cookie: adminCookie }
    });
    if (res.status !== 200) {
      const errBody = await res.json();
      throw new Error(`Expected 200, got ${res.status}: ${JSON.stringify(errBody)}`);
    }

    const body = await res.json();
    if (!body.success) throw new Error('Expected success: true');

    // Check MongoDB Registration status
    const regDoc = await Registration.findById(testReg1Id);
    if (!regDoc || regDoc.status !== 'APPROVED') {
      throw new Error('Registration status in DB is not APPROVED');
    }

    // Check MongoDB User document
    const userDoc = await User.findOne({ registrationId: testReg1Id });
    if (!userDoc) throw new Error('Student User was not created in DB');
    if (userDoc.role !== 'STUDENT') throw new Error('User role is not STUDENT');
    if (userDoc.accountStatus !== 'ACTIVE') throw new Error('User accountStatus is not ACTIVE');
    if (!userDoc.passwordHash || !userDoc.passwordHash.startsWith('$2')) {
      throw new Error('User passwordHash is missing or not a valid bcrypt hash');
    }

    studentUserId = userDoc._id;
  });

  // Test 8: Duplicate Approval returns 409 Conflict
  await test('Attempting duplicate approval on already approved registration returns 409 Conflict', async () => {
    const res = await fetch(`${BASE_URL}/api/admin/registrations/${testReg1Id}/approve`, {
      method: 'PATCH',
      headers: { Cookie: adminCookie }
    });
    if (res.status !== 409) throw new Error(`Expected 409, got ${res.status}`);
  });

  // Test 9: Student Authentication with bcrypt password & /api/auth/me
  await test('Approved student logs in, receives nielit_student_token, and /api/auth/me returns profile safely', async () => {
    // For test verification, update student password to known test password
    const testPlainPass = 'Student@2026!';
    const testHash = await bcrypt.hash(testPlainPass, 10);
    await User.findByIdAndUpdate(studentUserId, { passwordHash: testHash });

    const loginRes = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'deepayansaha76@gmail.com', password: testPlainPass })
    });

    if (loginRes.status !== 200) throw new Error(`Expected 200, got ${loginRes.status}`);
    const setCookie = loginRes.headers.get('set-cookie');
    if (!setCookie || !setCookie.includes('nielit_student_token')) {
      throw new Error('Expected set-cookie header with nielit_student_token');
    }
    studentCookie = setCookie.split(';')[0];

    // Test GET /api/auth/me
    const meRes = await fetch(`${BASE_URL}/api/auth/me`, {
      headers: { Cookie: studentCookie }
    });
    if (meRes.status !== 200) throw new Error(`Expected 200 on /api/auth/me, got ${meRes.status}`);
    const meBody = await meRes.json();
    if (!meBody.success || !meBody.data) throw new Error('Expected meBody.data');
    if (meBody.data.passwordHash) throw new Error('CRITICAL: passwordHash was leaked in /api/auth/me');
    if (meBody.data.email !== 'deepayansaha76@gmail.com') throw new Error('Mismatched student email');
    if (meBody.data.role !== 'STUDENT') throw new Error('Mismatched student role');
  });

  // Test 10: Submit Fresh Registration 2 for Rejection Test
  await test('Submit registration 2 for Rejection workflow testing', async () => {
    const res = await fetch(`${BASE_URL}/api/registrations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test Student Two',
        rollNumber: '24NLT999',
        email: 'deepayansaha76@gmail.com',
        semester: 2,
        club: 'IoT',
        reason: 'Interested in smart microcontrollers and robotics.'
      })
    });
    if (res.status !== 201) throw new Error(`Expected 201, got ${res.status}`);
    const body = await res.json();
    testReg2Id = body.registration.id;
  });

  // Test 11: Admin Rejects Registration 2
  await test('Admin rejects registration 2 -> status becomes REJECTED and NO User is created', async () => {
    const rejectionReason = 'Incomplete documentation provided for club prerequisite criteria.';
    const res = await fetch(`${BASE_URL}/api/admin/registrations/${testReg2Id}/reject`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Cookie: adminCookie
      },
      body: JSON.stringify({ reason: rejectionReason })
    });

    if (res.status !== 200) {
      const errBody = await res.json();
      throw new Error(`Expected 200, got ${res.status}: ${JSON.stringify(errBody)}`);
    }

    const regDoc = await Registration.findById(testReg2Id);
    if (!regDoc || regDoc.status !== 'REJECTED') {
      throw new Error('Registration status in DB is not REJECTED');
    }
    if (regDoc.rejectionReason !== rejectionReason) {
      throw new Error('Rejection reason was not saved to DB');
    }

    // Verify NO user created for Reg 2
    const userDoc = await User.findOne({ registrationId: testReg2Id });
    if (userDoc) {
      throw new Error('CRITICAL: A User was unexpectedly created for a rejected registration!');
    }
  });

  // Test 12: Duplicate Rejection returns 409 Conflict
  await test('Attempting duplicate rejection on already rejected registration returns 409 Conflict', async () => {
    const res = await fetch(`${BASE_URL}/api/admin/registrations/${testReg2Id}/reject`, {
      method: 'PATCH',
      headers: { Cookie: adminCookie }
    });
    if (res.status !== 409) throw new Error(`Expected 409, got ${res.status}`);
  });

  // Test 13: Student Logout & Session Invalidation
  await test('Student logout clears cookie and subsequent /api/auth/me returns 401', async () => {
    const logoutRes = await fetch(`${BASE_URL}/api/auth/logout`, {
      method: 'POST',
      headers: { Cookie: studentCookie }
    });
    if (logoutRes.status !== 200) throw new Error(`Expected 200 on logout, got ${logoutRes.status}`);

    // Verify /api/auth/me without token returns 401
    const meRes = await fetch(`${BASE_URL}/api/auth/me`);
    if (meRes.status !== 401) throw new Error(`Expected 401 on /api/auth/me after logout, got ${meRes.status}`);
  });

  // Test 14: Admin Logout & Session Invalidation
  await test('Admin logout clears cookie and subsequent /api/admin/registrations returns 401', async () => {
    const logoutRes = await fetch(`${BASE_URL}/api/admin/auth/logout`, {
      method: 'POST',
      headers: { Cookie: adminCookie }
    });
    if (logoutRes.status !== 200) throw new Error(`Expected 200 on admin logout, got ${logoutRes.status}`);

    // Verify /api/admin/registrations without token returns 401
    const regRes = await fetch(`${BASE_URL}/api/admin/registrations`);
    if (regRes.status !== 401) throw new Error(`Expected 401 on admin endpoint after logout, got ${regRes.status}`);
  });

  console.log('\n====================================================');
  console.log(`📊 Phase 5 Test Summary: Passed: ${passed}, Failed: ${failed}`);
  console.log('====================================================');

  await mongoose.disconnect();

  if (failed > 0) {
    process.exit(1);
  }
}

runPhase5Tests();
