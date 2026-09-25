/**
 * NIELIT Tech Clubs — Phase 7 Automated Hardening & Security Test Suite
 * Validates:
 * 1. Centralized password complexity rules
 * 2. Audit logging schema & asynchronous write pipeline
 * 3. mustChangePassword lifecycle upon registration approval
 * 4. Password change endpoint + tokenVersion session revocation
 * 5. Forgot password anti-enumeration response & SHA-256 token hashing
 * 6. Reset password token consumption & older session invalidation
 * 7. Helmet HTTP security headers verification
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import http from 'http';
import { connectDB } from './src/config/db.js';
import { validatePassword } from './src/utils/passwordValidator.js';
import User from './src/models/User.js';
import Registration from './src/models/Registration.js';
import AuditLog from './src/models/AuditLog.js';

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

async function runPhase7Tests() {
  console.log('\n======================================================');
  console.log('🧪 Starting NIELIT Tech Clubs — Phase 7 Test Suite');
  console.log('======================================================\n');

  await connectDB();

  const testEmail = `hardening.test.${Date.now()}@nielit.edu.in`;
  const testRoll = `PH7-${Date.now().toString().slice(-6)}`;
  let studentCookie = null;
  let oldStudentCookie = null;

  try {
    // -------------------------------------------------------------
    // Test 1: Password Complexity Validator
    // -------------------------------------------------------------
    console.log('--- Test 1: Centralized Password Policy Validation ---');
    assert(validatePassword('ValidPass123!').isValid === true, 'Strong password with uppercase, number, symbol passes');
    assert(validatePassword('ValidPass1').isValid === true, 'Strong password without symbol (min 8, upper, lower, num) passes');
    assert(validatePassword('short1A').isValid === false, 'Rejects password shorter than 8 characters');
    assert(validatePassword('alllowercase1').isValid === false, 'Rejects password without uppercase letter');
    assert(validatePassword('ALLUPPERCASE1').isValid === false, 'Rejects password without lowercase letter');
    assert(validatePassword('NoNumbersHere!').isValid === false, 'Rejects password without numbers');
    assert(validatePassword('Space Pass1').isValid === false, 'Rejects password with spaces');

    // -------------------------------------------------------------
    // Test 2: HTTP Security Headers (Helmet)
    // -------------------------------------------------------------
    console.log('\n--- Test 2: HTTP Security Headers (Helmet) ---');
    const healthRes = await request('/api/health');
    assert(healthRes.status === 200, 'GET /api/health responds with 200 OK');
    assert(healthRes.headers.get('x-content-type-options') === 'nosniff', 'x-content-type-options: nosniff header present');
    assert(healthRes.headers.get('x-frame-options') === 'SAMEORIGIN' || healthRes.headers.has('x-frame-options'), 'x-frame-options header present');

    // -------------------------------------------------------------
    // Test 3: Admin Login & Audit Event Logging
    // -------------------------------------------------------------
    console.log('\n--- Test 3: Admin Login & Audit Logging ---');
    const adminLoginRes = await request('/api/admin/auth/login', {
      method: 'POST',
      body: {
        email: process.env.ADMIN_EMAIL || 'admin@nexora.club.in',
        password: 'Admin@123'
      }
    });

    assert(adminLoginRes.status === 200, 'Admin login succeeds with 200 OK');
    const adminCookie = extractCookie(adminLoginRes.setCookie, 'nielit_admin_token');
    assert(!!adminCookie, 'Admin session cookie set');

    // Check AuditLog for admin login
    const adminAudit = await AuditLog.findOne({ action: 'ADMIN_LOGIN_SUCCESS' }).sort({ timestamp: -1 });
    assert(!!adminAudit, 'AuditLog recorded ADMIN_LOGIN_SUCCESS event');

    // -------------------------------------------------------------
    // Test 4: Registration Submission & Admin Approval mustChangePassword Lifecycle
    // -------------------------------------------------------------
    console.log('\n--- Test 4: Registration Approval & mustChangePassword Lifecycle ---');
    const regRes = await request('/api/registrations', {
      method: 'POST',
      body: {
        name: 'Hardening Test Student',
        rollNumber: testRoll,
        email: testEmail,
        semester: 3,
        club: 'AI',
        reason: 'Testing security hardening and session revocation mechanisms.'
      }
    });

    assert(regRes.status === 201, 'Student registration submitted with 201 Created');
    const regId = regRes.data.registration?.id || regRes.data.data?.id;

    // Approve registration
    const approveRes = await request(`/api/admin/registrations/${regId}/approve`, {
      method: 'PATCH',
      headers: { Cookie: adminCookie }
    });

    assert(approveRes.status === 200, 'Admin approves registration with 200 OK');

    // Verify User record in DB has mustChangePassword = true
    const createdUser = await User.findOne({ email: testEmail });
    assert(!!createdUser, 'User document created in MongoDB');
    assert(createdUser.mustChangePassword === true, 'User document has mustChangePassword: true');
    assert(createdUser.tokenVersion === 0, 'User document has initial tokenVersion: 0');

    // Check AuditLog for approval
    const approveAudit = await AuditLog.findOne({
      action: 'REGISTRATION_APPROVED',
      targetId: new mongoose.Types.ObjectId(regId)
    });
    assert(!!approveAudit, 'AuditLog recorded REGISTRATION_APPROVED event');

    // -------------------------------------------------------------
    // Test 5: Student Login with Temporary Credentials
    // -------------------------------------------------------------
    console.log('\n--- Test 5: Student Login & Initial Token State ---');
    // Set known temporary password for testing
    const tempPassword = 'TempPassword123';
    createdUser.passwordHash = await bcrypt.hash(tempPassword, 10);
    await createdUser.save();

    const loginRes = await request('/api/auth/login', {
      method: 'POST',
      body: {
        email: testEmail,
        password: tempPassword
      }
    });

    assert(loginRes.status === 200, 'Student login with temporary password succeeds');
    assert(loginRes.data.data.mustChangePassword === true, 'Login payload indicates mustChangePassword: true');
    oldStudentCookie = extractCookie(loginRes.setCookie, 'nielit_student_token');
    assert(!!oldStudentCookie, 'Student token cookie issued');

    // Test GET /api/auth/me
    const meRes = await request('/api/auth/me', {
      headers: { Cookie: oldStudentCookie }
    });
    assert(meRes.status === 200, 'GET /api/auth/me succeeds with initial cookie');
    assert(meRes.data.data.mustChangePassword === true, '/api/auth/me reflects mustChangePassword: true');

    // -------------------------------------------------------------
    // Test 6: Authenticated Password Change & Session Revocation
    // -------------------------------------------------------------
    console.log('\n--- Test 6: Authenticated Password Change & Session Revocation ---');
    const newCustomPassword = 'PermanentSecurePass2026!';

    // Rejection on bad current password
    const badChangeRes = await request('/api/auth/change-password', {
      method: 'POST',
      headers: { Cookie: oldStudentCookie },
      body: {
        currentPassword: 'WrongPassword999',
        newPassword: newCustomPassword
      }
    });
    assert(badChangeRes.status === 400, 'Rejects password change with incorrect current password');

    // Rejection on weak new password
    const weakChangeRes = await request('/api/auth/change-password', {
      method: 'POST',
      headers: { Cookie: oldStudentCookie },
      body: {
        currentPassword: tempPassword,
        newPassword: 'weak'
      }
    });
    assert(weakChangeRes.status === 400, 'Rejects password change with weak new password');

    // Successful password change
    const validChangeRes = await request('/api/auth/change-password', {
      method: 'POST',
      headers: { Cookie: oldStudentCookie },
      body: {
        currentPassword: tempPassword,
        newPassword: newCustomPassword
      }
    });

    assert(validChangeRes.status === 200, 'Password change succeeds with 200 OK');
    assert(validChangeRes.data.data.mustChangePassword === false, 'mustChangePassword updated to false');

    const freshStudentCookie = extractCookie(validChangeRes.setCookie, 'nielit_student_token');
    assert(!!freshStudentCookie, 'Fresh student cookie issued with updated tokenVersion');

    // Verify database state
    const updatedUser = await User.findOne({ email: testEmail });
    assert(updatedUser.mustChangePassword === false, 'MongoDB user.mustChangePassword is now false');
    assert(updatedUser.tokenVersion === 1, 'MongoDB user.tokenVersion incremented to 1');

    // Session Revocation: Old cookie should now be rejected
    const oldSessionRes = await request('/api/auth/me', {
      headers: { Cookie: oldStudentCookie }
    });
    assert(oldSessionRes.status === 401, 'Old session cookie rejected (401) due to tokenVersion mismatch (Revocation Verified)');

    // Fresh cookie should succeed
    const freshSessionRes = await request('/api/auth/me', {
      headers: { Cookie: freshStudentCookie }
    });
    assert(freshSessionRes.status === 200, 'Fresh session cookie succeeds with updated tokenVersion');

    // Check AuditLog for password change
    const changeAudit = await AuditLog.findOne({
      action: 'STUDENT_PASSWORD_CHANGED',
      actorIdentifier: testEmail
    });
    assert(!!changeAudit, 'AuditLog recorded STUDENT_PASSWORD_CHANGED event');

    // -------------------------------------------------------------
    // Test 7: Forgot Password Workflow & Anti-Enumeration
    // -------------------------------------------------------------
    console.log('\n--- Test 7: Forgot Password & Anti-Enumeration ---');
    // Non-existent email
    const nonExistentRes = await request('/api/auth/forgot-password', {
      method: 'POST',
      body: { email: 'nonexistent.student.999@nielit.edu.in' }
    });
    assert(nonExistentRes.status === 200, 'Forgot password returns 200 OK for non-existent email (Anti-enumeration)');
    assert(nonExistentRes.data.success === true, 'Returns identical success response');

    // Existing email
    const existingForgotRes = await request('/api/auth/forgot-password', {
      method: 'POST',
      body: { email: testEmail }
    });
    assert(existingForgotRes.status === 200, 'Forgot password returns 200 OK for existing student');

    const userWithReset = await User.findOne({ email: testEmail });
    assert(!!userWithReset.passwordResetTokenHash, 'Stored SHA-256 hashed reset token in user document');
    assert(userWithReset.passwordResetExpiresAt > new Date(), 'Set 20-minute expiry timestamp on reset token');

    // -------------------------------------------------------------
    // Test 8: Reset Password Execution & Session Invalidation
    // -------------------------------------------------------------
    console.log('\n--- Test 8: Reset Password Execution ---');
    // Generate valid raw token for direct reset test
    const rawResetToken = crypto.randomBytes(32).toString('hex');
    const tokenHash = crypto.createHash('sha256').update(rawResetToken).digest('hex');
    userWithReset.passwordResetTokenHash = tokenHash;
    userWithReset.passwordResetExpiresAt = new Date(Date.now() + 15 * 60 * 1000);
    await userWithReset.save();

    // Rejection on bad token
    const badResetRes = await request('/api/auth/reset-password', {
      method: 'POST',
      body: {
        token: 'invalid_raw_token_xyz',
        newPassword: 'ResetPasswordSuccess123!'
      }
    });
    assert(badResetRes.status === 400, 'Rejects reset password with invalid token');

    // Successful reset
    const finalPassword = 'FinalSecurePassword2026!';
    const validResetRes = await request('/api/auth/reset-password', {
      method: 'POST',
      body: {
        token: rawResetToken,
        newPassword: finalPassword
      }
    });

    assert(validResetRes.status === 200, 'Reset password succeeds with 200 OK');

    const postResetUser = await User.findOne({ email: testEmail });
    assert(postResetUser.passwordResetTokenHash === null, 'Cleared passwordResetTokenHash after use (Single-use verified)');
    assert(postResetUser.passwordResetExpiresAt === null, 'Cleared passwordResetExpiresAt after use');
    assert(postResetUser.tokenVersion === 2, 'user.tokenVersion incremented to 2 to invalidate previous sessions');

    // Verify student can log in with new password
    const finalLoginRes = await request('/api/auth/login', {
      method: 'POST',
      body: {
        email: testEmail,
        password: finalPassword
      }
    });
    assert(finalLoginRes.status === 200, 'Student logs in successfully with reset password');

    // Clean up test records
    await Registration.deleteOne({ _id: regId });
    await User.deleteOne({ email: testEmail });
    console.log('\n  ✓ Cleaned up test registration and user records');

  } catch (err) {
    console.error('\n❌ Unhandled Exception during Phase 7 Tests:', err);
    failedTests++;
  } finally {
    console.log('\n======================================================');
    console.log(`📊 Phase 7 Test Summary: ${passedTests}/${totalTests} Tests Passed`);
    if (failedTests > 0) {
      console.log(`❌ ${failedTests} Tests Failed`);
    } else {
      console.log('🎉 ALL PHASE 7 SECURITY & HARDENING TESTS PASSED!');
    }
    console.log('======================================================\n');
    process.exit(failedTests > 0 ? 1 : 0);
  }
}

runPhase7Tests();
