import dotenv from 'dotenv';
dotenv.config();

const API_BASE = 'http://localhost:5000';

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`✅ PASS: ${message}`);
    passed++;
  } else {
    console.error(`❌ FAIL: ${message}`);
    failed++;
  }
}

async function runPhase6Tests() {
  console.log('====================================================');
  console.log('🧪 Starting NIELIT Tech Clubs Phase 6 Test Suite');
  console.log('====================================================\n');

  try {
    // 1. Health check
    const healthRes = await fetch(`${API_BASE}/api/health`);
    const healthJson = await healthRes.json();
    assert(healthRes.status === 200 && healthJson.database === 'connected', 'Server health check returns connected database');

    // 2. Student unauthenticated access check
    const unauthProf = await fetch(`${API_BASE}/api/student/profile`);
    assert(unauthProf.status === 401, 'GET /api/student/profile without cookie returns 401 Unauthorized');

    const unauthApp = await fetch(`${API_BASE}/api/student/application`);
    assert(unauthApp.status === 401, 'GET /api/student/application without cookie returns 401 Unauthorized');

    // 3. Admin unauthenticated access check
    const unauthStudents = await fetch(`${API_BASE}/api/admin/students`);
    assert(unauthStudents.status === 401, 'GET /api/admin/students without admin cookie returns 401 Unauthorized');

    const unauthAdminNotifs = await fetch(`${API_BASE}/api/admin/notifications`);
    assert(unauthAdminNotifs.status === 401, 'GET /api/admin/notifications without admin cookie returns 401 Unauthorized');

    // 4. Admin Login
    const adminLoginRes = await fetch(`${API_BASE}/api/admin/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: process.env.ADMIN_EMAIL || 'admin@nexora.club.in',
        password: process.env.ADMIN_PASSWORD || 'Admin@123'
      })
    });
    const adminCookie = adminLoginRes.headers.get('set-cookie');
    assert(adminLoginRes.status === 200 && adminCookie && adminCookie.includes('nielit_admin_token'), 'Admin logs in and receives nielit_admin_token cookie');

    // 5. Admin fetches enrolled students
    const adminStudentsRes = await fetch(`${API_BASE}/api/admin/students`, {
      headers: { Cookie: adminCookie }
    });
    const adminStudentsJson = await adminStudentsRes.json();
    assert(
      adminStudentsRes.status === 200 && adminStudentsJson.success && Array.isArray(adminStudentsJson.data),
      `GET /api/admin/students returns 200 and list of active students (${adminStudentsJson.data?.length || 0} enrolled)`
    );

    // Ensure passwordHash is NEVER exposed in admin students list
    const hasExposedHash = adminStudentsJson.data.some(s => s.passwordHash !== undefined);
    assert(!hasExposedHash, 'Admin students list does NOT expose passwordHash');

    // 6. Admin fetches notifications
    const adminNotifsRes = await fetch(`${API_BASE}/api/admin/notifications`, {
      headers: { Cookie: adminCookie }
    });
    const adminNotifsJson = await adminNotifsRes.json();
    assert(
      adminNotifsRes.status === 200 && adminNotifsJson.success && Array.isArray(adminNotifsJson.data),
      'GET /api/admin/notifications returns 200 and notifications array'
    );

    // 7. Register a new student for Phase 6 end-to-end verification
    const timestamp = Date.now();
    const testEmail = `phase6_${timestamp}@nielit.edu.in`;
    const testRoll = `P6_${timestamp.toString().slice(-6)}`;

    const regRes = await fetch(`${API_BASE}/api/registrations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Phase 6 Integration Tester',
        rollNumber: testRoll,
        email: testEmail,
        semester: 3,
        club: 'AI',
        reason: 'Testing real frontend-backend connectivity and authenticated portal data.'
      })
    });
    const regJson = await regRes.json();
    const regId = regJson.registration?.id;
    assert(regRes.status === 201 && regId, 'Student submits registration -> saved and returned registration id');

    // 8. Admin approves the registration
    const approveRes = await fetch(`${API_BASE}/api/admin/registrations/${regId}/approve`, {
      method: 'PATCH',
      headers: { Cookie: adminCookie }
    });
    const approveJson = await approveRes.json();
    assert(approveRes.status === 200 && approveJson.data?.status === 'APPROVED', 'Admin approves registration -> status becomes APPROVED');

    // 9. Admin checks student directory
    const updatedStudentsRes = await fetch(`${API_BASE}/api/admin/students?search=${testRoll}`, {
      headers: { Cookie: adminCookie }
    });
    const updatedStudentsJson = await updatedStudentsRes.json();
    const foundStudent = updatedStudentsJson.data?.find(s => s.rollNumber === testRoll);
    assert(foundStudent && foundStudent.email === testEmail, 'GET /api/admin/students with search filter finds the newly approved student');

  } catch (err) {
    console.error('Unexpected test failure:', err);
    failed++;
  }

  console.log('\n====================================================');
  console.log(`📊 Phase 6 Test Summary: Passed: ${passed}, Failed: ${failed}`);
  console.log('====================================================');

  if (failed > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

runPhase6Tests();
