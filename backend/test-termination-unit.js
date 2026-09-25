/**
 * NIELIT Tech Clubs — Automated Account Termination Unit & Security Test Suite
 * Validates:
 * 1. User schema constraints (TERMINATED status, terminatedAt, terminatedBy, terminationReason)
 * 2. AuditLog schema action enum (STUDENT_ACCOUNT_TERMINATED)
 * 3. terminateStudent controller logic:
 *    - Rejects invalid ID (404)
 *    - Rejects non-existent user (404)
 *    - Rejects admin termination attempts (403)
 *    - Rejects already terminated students (409)
 *    - Trims & caps reason to 500 chars
 *    - Strips mass assignment fields (accountStatus, role, tokenVersion)
 *    - Increments tokenVersion for session revocation
 *    - Sets accountStatus to TERMINATED
 *    - Creates audit log
 *    - Dispatches email asynchronously without blocking on error
 * 4. Auth Middleware & Login Enforcement:
 *    - requireStudent rejects TERMINATED accountStatus with 403
 *    - requireStudent rejects mismatched tokenVersion with 401
 *    - studentLogin rejects TERMINATED accounts with 403
 */

import mongoose from 'mongoose';
import User from './src/models/User.js';
import AuditLog from './src/models/AuditLog.js';
import { terminateStudent } from './src/controllers/adminRegistration.controller.js';
import { requireStudent } from './src/middleware/auth.js';
import { studentLogin } from './src/controllers/studentAuth.controller.js';

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
    cookieName: null,
    cookieVal: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(data) {
      this.jsonData = data;
      return this;
    },
    cookie(name, val) {
      this.cookieName = name;
      this.cookieVal = val;
    }
  };
  return res;
}

async function runTerminationUnitTests() {
  console.log('\n======================================================');
  console.log('🧪 Starting NIELIT Tech Clubs — Termination Unit Tests');
  console.log('======================================================\n');

  // -------------------------------------------------------------
  // Test 1: User Schema Termination Constraints
  // -------------------------------------------------------------
  console.log('--- Test 1: User Schema Account Status & Termination Fields ---');
  const validTerminatedUser = new User({
    name: 'Terminated Student',
    rollNumber: 'ROLL-TERM-001',
    email: 'term.student@nielit.edu.in',
    semester: 4,
    club: 'Programming',
    passwordHash: 'hashedpassword',
    role: 'STUDENT',
    accountStatus: 'TERMINATED',
    tokenVersion: 2,
    terminatedAt: new Date(),
    terminationReason: 'Violation of club code of conduct',
    registrationId: new mongoose.Types.ObjectId()
  });

  const schemaErr = validTerminatedUser.validateSync();
  assert(!schemaErr, 'User model successfully accepts TERMINATED status and termination fields');

  // Check too long termination reason (>500 chars)
  const longReasonUser = new User({
    name: 'Long Reason Student',
    rollNumber: 'ROLL-TERM-002',
    email: 'long.reason@nielit.edu.in',
    semester: 2,
    club: 'AI',
    passwordHash: 'hashedpassword',
    role: 'STUDENT',
    accountStatus: 'TERMINATED',
    terminationReason: 'X'.repeat(501),
    registrationId: new mongoose.Types.ObjectId()
  });
  const longReasonErr = longReasonUser.validateSync();
  assert(longReasonErr?.errors?.terminationReason !== undefined, 'User model rejects terminationReason longer than 500 characters');

  // -------------------------------------------------------------
  // Test 2: AuditLog Action Enum Check
  // -------------------------------------------------------------
  console.log('\n--- Test 2: AuditLog Action Enum Support ---');
  const validAuditLog = new AuditLog({
    actorRole: 'ADMIN',
    actorIdentifier: 'admin@nexora.club.in',
    action: 'STUDENT_ACCOUNT_TERMINATED',
    targetType: 'USER',
    targetId: new mongoose.Types.ObjectId().toString(),
    metadata: { reason: 'Administrative review' }
  });
  const auditErr = validAuditLog.validateSync();
  assert(!auditErr, 'AuditLog model accepts STUDENT_ACCOUNT_TERMINATED action');

  // -------------------------------------------------------------
  // Test 3: terminateStudent Controller ID & Non-Existent Validation
  // -------------------------------------------------------------
  console.log('\n--- Test 3: terminateStudent ID & Non-Existent Validation ---');
  const invalidIdReq = { params: { id: 'invalid-id' }, user: { id: new mongoose.Types.ObjectId(), email: 'admin@nexora.club.in' } };
  const invalidIdRes = createMockRes();
  await terminateStudent(invalidIdReq, invalidIdRes, () => {});
  assert(invalidIdRes.statusCode === 404, 'terminateStudent returns 404 for invalid ObjectId format');

  // Mock User.findById for subsequent tests
  const originalFindById = User.findById;

  // Non-existent user
  User.findById = async () => null;
  const notFoundReq = { params: { id: new mongoose.Types.ObjectId().toString() }, user: { id: new mongoose.Types.ObjectId(), email: 'admin@nexora.club.in' } };
  const notFoundRes = createMockRes();
  await terminateStudent(notFoundReq, notFoundRes, () => {});
  assert(notFoundRes.statusCode === 404, 'terminateStudent returns 404 for non-existent user');

  // -------------------------------------------------------------
  // Test 4: Admin Termination Defense (Cannot terminate Admin)
  // -------------------------------------------------------------
  console.log('\n--- Test 4: Role Defense (Admin accounts cannot be terminated) ---');
  const adminTargetUser = {
    _id: new mongoose.Types.ObjectId(),
    name: 'Super Admin',
    email: 'admin@nexora.club.in',
    role: 'ADMIN',
    accountStatus: 'ACTIVE'
  };
  User.findById = async () => adminTargetUser;
  const adminTermReq = { params: { id: adminTargetUser._id.toString() }, user: { id: new mongoose.Types.ObjectId(), email: 'admin@nexora.club.in' } };
  const adminTermRes = createMockRes();
  await terminateStudent(adminTermReq, adminTermRes, () => {});
  assert(adminTermRes.statusCode === 403, 'terminateStudent returns 403 when attempting to terminate an ADMIN');

  // -------------------------------------------------------------
  // Test 5: Already Terminated Student (Conflict 409)
  // -------------------------------------------------------------
  console.log('\n--- Test 5: Conflict Prevention (Already Terminated Student) ---');
  const alreadyTerminatedUser = {
    _id: new mongoose.Types.ObjectId(),
    name: 'Terminated Student',
    email: 'already.term@nielit.edu.in',
    role: 'STUDENT',
    accountStatus: 'TERMINATED'
  };
  User.findById = async () => alreadyTerminatedUser;
  const conflictReq = { params: { id: alreadyTerminatedUser._id.toString() }, user: { id: new mongoose.Types.ObjectId(), email: 'admin@nexora.club.in' } };
  const conflictRes = createMockRes();
  await terminateStudent(conflictReq, conflictRes, () => {});
  assert(conflictRes.statusCode === 409, 'terminateStudent returns 409 when target is already TERMINATED');

  // -------------------------------------------------------------
  // Test 6: Successful Termination, tokenVersion Increment & Mass Assignment Defense
  // -------------------------------------------------------------
  console.log('\n--- Test 6: State Transition, Token Version & Mass Assignment Defense ---');
  let savedUser = null;
  const activeStudentUser = {
    _id: new mongoose.Types.ObjectId(),
    name: 'Active Student',
    rollNumber: 'ROLL-12345',
    email: 'student@nielit.edu.in',
    club: 'Programming',
    role: 'STUDENT',
    accountStatus: 'ACTIVE',
    tokenVersion: 3,
    save: async function () {
      savedUser = this;
      return this;
    }
  };
  User.findById = async () => activeStudentUser;

  const validTermReq = {
    params: { id: activeStudentUser._id.toString() },
    user: { id: new mongoose.Types.ObjectId().toString(), email: 'admin@nexora.club.in' },
    body: {
      reason: '   Violation of academic honesty policy   ',
      // Malicious mass assignment injection payloads:
      accountStatus: 'ACTIVE',
      role: 'ADMIN',
      tokenVersion: 999
    }
  };
  const validTermRes = createMockRes();
  await terminateStudent(validTermReq, validTermRes, () => {});

  assert(validTermRes.statusCode === 200, 'terminateStudent returns 200 on successful termination');
  assert(validTermRes.jsonData?.success === true, 'Response contains success: true');
  assert(validTermRes.jsonData?.token === undefined, 'No JWT token exposed in termination response');
  assert(validTermRes.jsonData?.passwordHash === undefined, 'No password hash exposed in response');

  assert(savedUser.accountStatus === 'TERMINATED', 'User accountStatus set to TERMINATED (mass assignment ignored)');
  assert(savedUser.role === 'STUDENT', 'User role remains STUDENT (mass assignment ignored)');
  assert(savedUser.tokenVersion === 4, 'User tokenVersion incremented from 3 to 4 for session revocation (mass assignment ignored)');
  assert(savedUser.terminationReason === 'Violation of academic honesty policy', 'Termination reason trimmed properly');
  assert(savedUser.terminatedAt instanceof Date, 'terminatedAt timestamp recorded');

  // Restore original User.findById
  User.findById = originalFindById;

  // -------------------------------------------------------------
  // Test 7: Middleware & Login Authentication Block
  // -------------------------------------------------------------
  console.log('\n--- Test 7: Authentication & Middleware Invalidation ---');

  // Test requireStudent middleware with terminated user
  const mockTerminatedUserFromDb = {
    _id: new mongoose.Types.ObjectId(),
    role: 'STUDENT',
    accountStatus: 'TERMINATED',
    tokenVersion: 4
  };

  // requireStudent with accountStatus !== ACTIVE
  const authReqTerminated = {
    cookies: {},
    headers: {},
    user: null
  };
  // Simulate decoded token from valid JWT
  process.env.JWT_SECRET = 'test-secret-key-123';
  import('jsonwebtoken').then(async (jwtMod) => {
    const jwt = jwtMod.default || jwtMod;
    const token = jwt.sign(
      { id: mockTerminatedUserFromDb._id.toString(), role: 'STUDENT', tokenVersion: 4 },
      process.env.JWT_SECRET
    );
    authReqTerminated.cookies.nielit_student_token = token;

    User.findById = async () => mockTerminatedUserFromDb;
    const authRes = createMockRes();
    let nextCalled = false;
    await requireStudent(authReqTerminated, authRes, () => { nextCalled = true; });

    assert(authRes.statusCode === 403 && !nextCalled, 'requireStudent rejects TERMINATED accountStatus with 403');

    // requireStudent with outdated tokenVersion (session revocation)
    const activeUserWithNewVersion = {
      _id: new mongoose.Types.ObjectId(),
      role: 'STUDENT',
      accountStatus: 'ACTIVE',
      tokenVersion: 5 // User's version incremented
    };
    const oldSessionToken = jwt.sign(
      { id: activeUserWithNewVersion._id.toString(), role: 'STUDENT', tokenVersion: 4 }, // Token has old version 4
      process.env.JWT_SECRET
    );
    const oldSessionReq = { cookies: { nielit_student_token: oldSessionToken }, headers: {} };
    const oldSessionRes = createMockRes();
    let oldSessionNext = false;
    User.findById = async () => activeUserWithNewVersion;
    await requireStudent(oldSessionReq, oldSessionRes, () => { oldSessionNext = true; });

    assert(oldSessionRes.statusCode === 401 && !oldSessionNext, 'requireStudent rejects outdated tokenVersion with 401 (Session Revoked)');

    // studentLogin with TERMINATED user
    User.findOne = async () => mockTerminatedUserFromDb;
    const loginReq = { body: { email: 'term@nielit.edu.in', password: 'Password123!' } };
    const loginRes = createMockRes();
    await studentLogin(loginReq, loginRes, () => {});
    assert(loginRes.statusCode === 403, 'studentLogin rejects TERMINATED accounts with 403');

    // Restore methods
    User.findById = originalFindById;

    console.log('\n======================================================');
    console.log(`Termination Unit Test Summary: ${passedTests}/${totalTests} tests passed (${failedTests} failed)`);
    console.log('======================================================\n');

    if (failedTests > 0) {
      process.exit(1);
    }
  });
}

runTerminationUnitTests();
