import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Registration from './src/models/Registration.js';

dotenv.config();

const BASE_URL = 'http://localhost:5000/api/registrations';

async function runTests() {
  console.log('====================================================');
  console.log('🧪 RUNNING REGISTRATION API INTEGRATION TEST SUITE');
  console.log('====================================================\n');

  await mongoose.connect(process.env.MONGODB_URI);
  console.log('✓ Connected to MongoDB for database inspection.\n');

  // Clean up any prior test records
  await Registration.deleteMany({ email: /test.*@example\.com/ });

  let passed = 0;
  let total = 0;

  async function assertTest(name, fn) {
    total++;
    try {
      await fn();
      console.log(`✅ [PASS] ${name}`);
      passed++;
    } catch (err) {
      console.error(`❌ [FAIL] ${name}:`, err.message);
    }
  }

  // Test A — Valid registration
  await assertTest('Test A: Valid registration submission returns 201 Created and persists to DB', async () => {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test Student One',
        rollNumber: 'TEST001',
        email: 'test1@example.com',
        semester: 1,
        club: 'Programming',
        reason: 'I want to improve my programming skills and build projects.'
      })
    });

    if (res.status !== 201) throw new Error(`Expected status 201, got ${res.status}`);
    const data = await res.json();
    if (!data.success || !data.registration?.id) throw new Error('Invalid success response body');

    const doc = await Registration.findById(data.registration.id);
    if (!doc) throw new Error('Document not found in MongoDB');
    if (doc.status !== 'PENDING') throw new Error(`Expected status PENDING, got ${doc.status}`);
  });

  // Test B — Missing name
  await assertTest('Test B: Missing name returns 400 Bad Request', async () => {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        rollNumber: 'TEST002',
        email: 'test2@example.com',
        semester: 1,
        club: 'AI',
        reason: 'I want to study AI and neural networks.'
      })
    });

    if (res.status !== 400) throw new Error(`Expected status 400, got ${res.status}`);
    const data = await res.json();
    if (data.success !== false) throw new Error('Expected success: false');
  });

  // Test C — Invalid email format
  await assertTest('Test C: Invalid email format returns 400 Bad Request', async () => {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test Student Three',
        rollNumber: 'TEST003',
        email: 'not-an-email',
        semester: 2,
        club: 'Cybersecurity',
        reason: 'Interested in vulnerability research.'
      })
    });

    if (res.status !== 400) throw new Error(`Expected status 400, got ${res.status}`);
  });

  // Test D — Invalid club
  await assertTest('Test D: Invalid club name returns 400 Bad Request', async () => {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test Student Four',
        rollNumber: 'TEST004',
        email: 'test4@example.com',
        semester: 1,
        club: 'Random Club',
        reason: 'Interested in club activities.'
      })
    });

    if (res.status !== 400) throw new Error(`Expected status 400, got ${res.status}`);
  });

  // Test E — Invalid semester
  await assertTest('Test E: Invalid semester (semester = 10) returns 400 Bad Request', async () => {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test Student Five',
        rollNumber: 'TEST005',
        email: 'test5@example.com',
        semester: 10,
        club: 'IoT',
        reason: 'Interested in smart sensors.'
      })
    });

    if (res.status !== 400) throw new Error(`Expected status 400, got ${res.status}`);
  });

  // Test F — Empty / short reason
  await assertTest('Test F: Empty or very short reason returns 400 Bad Request', async () => {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test Student Six',
        rollNumber: 'TEST006',
        email: 'test6@example.com',
        semester: 3,
        club: 'Programming',
        reason: 'short'
      })
    });

    if (res.status !== 400) throw new Error(`Expected status 400, got ${res.status}`);
  });

  // Test G — Duplicate registration
  await assertTest('Test G: Duplicate registration submission returns 409 Conflict', async () => {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test Student One',
        rollNumber: 'TEST001',
        email: 'test1@example.com',
        semester: 1,
        club: 'Programming',
        reason: 'I want to improve my programming skills and build projects.'
      })
    });

    if (res.status !== 409) throw new Error(`Expected status 409 Conflict, got ${res.status}`);
    const data = await res.json();
    if (!data.message.includes('already submitted')) throw new Error('Expected duplicate message');
  });

  // Test H — Malicious client attempts approval state injection
  await assertTest('Test H: Client attempts status bypass (status: APPROVED) is forced to PENDING', async () => {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test Student Eight',
        rollNumber: 'TEST008',
        email: 'test8@example.com',
        semester: 2,
        club: 'AI',
        reason: 'I want to learn machine learning models.',
        status: 'APPROVED',
        role: 'ADMIN',
        accountStatus: 'ACTIVE'
      })
    });

    if (res.status !== 201) throw new Error(`Expected status 201, got ${res.status}`);
    const data = await res.json();
    const doc = await Registration.findById(data.registration.id);
    if (doc.status !== 'PENDING') throw new Error(`Expected status to be PENDING, but got ${doc.status}`);
  });

  // Clean up test documents
  await Registration.deleteMany({ email: /test.*@example\.com/ });
  await mongoose.disconnect();

  console.log('\n====================================================');
  console.log(`📊 TEST RESULTS: ${passed}/${total} TESTS PASSED`);
  console.log('====================================================\n');

  if (passed === total) {
    process.exit(0);
  } else {
    process.exit(1);
  }
}

runTests().catch((e) => {
  console.error('Fatal test error:', e);
  process.exit(1);
});
