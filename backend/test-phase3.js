import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Registration from './src/models/Registration.js';
import { getRegistrationReceivedTemplate } from './src/templates/registrationReceived.js';

dotenv.config();

const BASE_URL = 'http://localhost:5000/api/registrations';

async function runPhase3Tests() {
  console.log('====================================================');
  console.log('🧪 RUNNING PHASE 3 AUTOMATED EMAIL TEST SUITE');
  console.log('====================================================\n');

  // Test 1: Template rendering
  console.log('1. Testing HTML Email Template Generation...');
  const html = getRegistrationReceivedTemplate({
    name: 'Rahul Das',
    club: 'Programming',
    rollNumber: '24NLT0108',
    semester: 1
  });

  if (!html.includes('Rahul Das')) throw new Error('Template missing student name');
  if (!html.includes('Programming Club')) throw new Error('Template missing club name');
  if (!html.includes('24NLT0108')) throw new Error('Template missing roll number');
  if (!html.includes('1st Semester')) throw new Error('Template missing semester');
  if (!html.includes('PENDING REVIEW')) throw new Error('Template missing PENDING status');
  if (html.includes('login') || html.includes('password')) throw new Error('Template should not contain login links');
  console.log('✅ [PASS] Email Template renders required dynamic content cleanly.\n');

  // Connect to DB for testing
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('✓ Connected to MongoDB for database inspection.\n');

  // Clean up previous test entries
  await Registration.deleteMany({ email: /phase3test.*@example\.com/ });

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

  // Test A: Valid Registration + emailStatus
  await assertTest('Test A: Valid registration saved to MongoDB with PENDING status and emailStatus tracking', async () => {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Phase3 Student One',
        rollNumber: 'P3TEST001',
        email: 'phase3test1@example.com',
        semester: 1,
        club: 'Programming',
        reason: 'I want to build software and learn algorithms.'
      })
    });

    if (res.status !== 201) throw new Error(`Expected status 201, got ${res.status}`);
    const data = await res.json();
    if (!data.success || !data.registration?.id) throw new Error('Invalid success response body');

    const doc = await Registration.findById(data.registration.id);
    if (!doc) throw new Error('Document not found in MongoDB');
    if (doc.status !== 'PENDING') throw new Error(`Expected status PENDING, got ${doc.status}`);
    if (!['PENDING', 'SENT', 'FAILED'].includes(doc.emailStatus)) {
      throw new Error(`Invalid emailStatus: ${doc.emailStatus}`);
    }
  });

  // Test B: Duplicate Registration prevention
  await assertTest('Test B: Duplicate registration submission returns 409 Conflict', async () => {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Phase3 Student One',
        rollNumber: 'P3TEST001',
        email: 'phase3test1@example.com',
        semester: 1,
        club: 'Programming',
        reason: 'I want to build software and learn algorithms.'
      })
    });

    if (res.status !== 409) throw new Error(`Expected status 409 Conflict, got ${res.status}`);
  });

  // Test C: Validation Failure
  await assertTest('Test C: Invalid club selection returns 400 Bad Request', async () => {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Phase3 Student Two',
        rollNumber: 'P3TEST002',
        email: 'phase3test2@example.com',
        semester: 2,
        club: 'NonExistentClub',
        reason: 'Invalid club test.'
      })
    });

    if (res.status !== 400) throw new Error(`Expected status 400, got ${res.status}`);
  });

  // Test D: Status Bypass Protection
  await assertTest('Test D: Client status injection (status: APPROVED) is forced to PENDING', async () => {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Phase3 Student Four',
        rollNumber: 'P3TEST004',
        email: 'phase3test4@example.com',
        semester: 2,
        club: 'AI',
        reason: 'Interested in neural network applications.',
        status: 'APPROVED',
        emailStatus: 'SENT'
      })
    });

    if (res.status !== 201) throw new Error(`Expected status 201, got ${res.status}`);
    const data = await res.json();
    const doc = await Registration.findById(data.registration.id);
    if (doc.status !== 'PENDING') throw new Error(`Expected status PENDING, got ${doc.status}`);
  });

  // Clean up test documents
  await Registration.deleteMany({ email: /phase3test.*@example\.com/ });
  await mongoose.disconnect();

  console.log('\n====================================================');
  console.log(`📊 TEST RESULTS: ${passed}/${total} PHASE 3 TESTS PASSED`);
  console.log('====================================================\n');

  if (passed === total) {
    process.exit(0);
  } else {
    process.exit(1);
  }
}

runPhase3Tests().catch((e) => {
  console.error('Fatal test error:', e);
  process.exit(1);
});
