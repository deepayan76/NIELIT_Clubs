const BASE_URL = 'http://localhost:5000';

async function runTests() {
  console.log('====================================================');
  console.log('🧪 Starting Phase 4 Admin Registration API Tests');
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

  let sampleRecordId = null;
  let adminCookie = null;

  // Authenticate as Admin first
  await test('Admin authenticates for test suite access', async () => {
    const res = await fetch(`${BASE_URL}/api/admin/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@nielit.edu.in', password: 'Admin@123' })
    });
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
    const setCookie = res.headers.get('set-cookie');
    adminCookie = setCookie ? setCookie.split(';')[0] : '';
  });

  // Test 1: GET /api/admin/registrations
  await test('GET /api/admin/registrations returns 200 with data & pagination', async () => {
    const res = await fetch(`${BASE_URL}/api/admin/registrations`, {
      headers: { Cookie: adminCookie }
    });
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
    const body = await res.json();
    if (!body.success) throw new Error('Expected success to be true');
    if (!Array.isArray(body.data)) throw new Error('Expected data to be an array');
    if (!body.pagination || typeof body.pagination.total !== 'number') {
      throw new Error('Expected valid pagination object');
    }
    if (body.data.length > 0) {
      sampleRecordId = body.data[0]._id;
    }
  });

  // Test 2: Pagination limits
  await test('GET /api/admin/registrations?page=1&limit=2 respects limit', async () => {
    const res = await fetch(`${BASE_URL}/api/admin/registrations?page=1&limit=2`, {
      headers: { Cookie: adminCookie }
    });
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
    const body = await res.json();
    if (body.data.length > 2) throw new Error(`Expected at most 2 items, got ${body.data.length}`);
    if (body.pagination.limit !== 2) throw new Error(`Expected pagination.limit = 2, got ${body.pagination.limit}`);
    if (body.pagination.page !== 1) throw new Error(`Expected pagination.page = 1, got ${body.pagination.page}`);
  });

  // Test 3: Status filter
  await test('GET /api/admin/registrations?status=PENDING filters correctly', async () => {
    const res = await fetch(`${BASE_URL}/api/admin/registrations?status=PENDING`, {
      headers: { Cookie: adminCookie }
    });
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
    const body = await res.json();
    const nonPending = body.data.filter(r => r.status !== 'PENDING');
    if (nonPending.length > 0) {
      throw new Error(`Found ${nonPending.length} non-PENDING records in filtered response`);
    }
  });

  // Test 4: Club filter
  await test('GET /api/admin/registrations?club=AI filters correctly', async () => {
    const res = await fetch(`${BASE_URL}/api/admin/registrations?club=AI`, {
      headers: { Cookie: adminCookie }
    });
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
    const body = await res.json();
    const nonAi = body.data.filter(r => r.club !== 'AI');
    if (nonAi.length > 0) {
      throw new Error(`Found ${nonAi.length} non-AI records in filtered response`);
    }
  });

  // Test 5: Search filter
  await test('GET /api/admin/registrations?search=... performs case-insensitive text search', async () => {
    const res = await fetch(`${BASE_URL}/api/admin/registrations?search=gmail`, {
      headers: { Cookie: adminCookie }
    });
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
    const body = await res.json();
    for (const item of body.data) {
      const match = (item.name && item.name.toLowerCase().includes('gmail')) ||
                    (item.email && item.email.toLowerCase().includes('gmail')) ||
                    (item.rollNumber && item.rollNumber.toLowerCase().includes('gmail'));
      if (!match) throw new Error(`Item ${item._id} did not match search query`);
    }
  });

  // Test 6: GET /api/admin/registrations/stats
  await test('GET /api/admin/registrations/stats returns accurate live counts', async () => {
    const res = await fetch(`${BASE_URL}/api/admin/registrations/stats`, {
      headers: { Cookie: adminCookie }
    });
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
    const body = await res.json();
    if (!body.success) throw new Error('Expected success to be true');
    const { total, pending, approved, rejected, byClub } = body.data;
    if (typeof total !== 'number' || typeof pending !== 'number' || typeof approved !== 'number' || typeof rejected !== 'number') {
      throw new Error('Stats counts must be numbers');
    }
    if (!byClub || typeof byClub.AI !== 'number' || typeof byClub.Programming !== 'number') {
      throw new Error('byClub structure invalid');
    }
    console.log(`      📊 Live Stats: Total=${total}, Pending=${pending}, Approved=${approved}, Rejected=${rejected}`);
  });

  // Test 7: GET /api/admin/registrations/:id with valid ID
  await test('GET /api/admin/registrations/:id returns single record', async () => {
    if (!sampleRecordId) {
      console.log('   ⚠️ Skipping single record test because collection is empty');
      return;
    }
    const res = await fetch(`${BASE_URL}/api/admin/registrations/${sampleRecordId}`, {
      headers: { Cookie: adminCookie }
    });
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
    const body = await res.json();
    if (!body.success || !body.data || body.data._id !== sampleRecordId) {
      throw new Error('Failed to retrieve matching single record');
    }
  });

  // Test 8: GET /api/admin/registrations/:id with invalid ID format
  await test('GET /api/admin/registrations/:id with invalid ID format returns 400', async () => {
    const res = await fetch(`${BASE_URL}/api/admin/registrations/not-a-valid-object-id`, {
      headers: { Cookie: adminCookie }
    });
    if (res.status !== 400) throw new Error(`Expected 400, got ${res.status}`);
    const body = await res.json();
    if (body.success !== false) throw new Error('Expected success: false');
  });

  // Test 9: GET /api/admin/registrations/:id with non-existent ID
  await test('GET /api/admin/registrations/:id with non-existent ID returns 404', async () => {
    const fakeId = '507f1f77bcf86cd799439011';
    const res = await fetch(`${BASE_URL}/api/admin/registrations/${fakeId}`, {
      headers: { Cookie: adminCookie }
    });
    if (res.status !== 404) throw new Error(`Expected 404, got ${res.status}`);
    const body = await res.json();
    if (body.success !== false) throw new Error('Expected success: false');
  });

  console.log('\n====================================================');
  console.log(`Test Summary: Passed: ${passed}, Failed: ${failed}`);
  console.log('====================================================');

  if (failed > 0) {
    process.exit(1);
  }
}

runTests();
