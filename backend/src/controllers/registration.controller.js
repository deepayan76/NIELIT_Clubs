import Registration, { ALLOWED_CLUBS, ALLOWED_SEMESTERS } from '../models/Registration.js';
import { sendRegistrationReceivedEmail } from '../services/email.service.js';

/**
 * Normalizes club name to official enum casing
 */
function normalizeClubName(clubStr) {
  if (!clubStr || typeof clubStr !== 'string') return '';
  const clean = clubStr.trim().toLowerCase();
  if (clean === 'ai') return 'AI';
  if (clean === 'programming') return 'Programming';
  if (clean === 'cybersecurity' || clean === 'cyber') return 'Cybersecurity';
  if (clean === 'iot') return 'IoT';
  return clubStr.trim();
}

/**
 * Handle new student registration submission
 * POST /api/registrations
 */
export async function createRegistration(req, res, next) {
  try {
    const rawBody = req.body || {};

    // 1. Input Normalization & Extraction
    const name = typeof rawBody.name === 'string' ? rawBody.name.trim() : '';
    const rollNumber = typeof rawBody.rollNumber === 'string' ? rawBody.rollNumber.trim() : '';
    const email = typeof rawBody.email === 'string' ? rawBody.email.trim().toLowerCase() : '';
    const rawSemester = rawBody.semester;
    const semester = typeof rawSemester === 'number' ? rawSemester : parseInt(rawSemester, 10);
    const club = normalizeClubName(rawBody.club);
    const reason = typeof rawBody.reason === 'string' ? rawBody.reason.trim() : '';

    // 2. Field Validation
    const errors = {};

    if (!name) {
      errors.name = 'Student name is required.';
    } else if (name.length > 100) {
      errors.name = 'Student name cannot exceed 100 characters.';
    }

    if (!rollNumber) {
      errors.rollNumber = 'Roll number is required.';
    } else if (rollNumber.length > 50) {
      errors.rollNumber = 'Roll number cannot exceed 50 characters.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      errors.email = 'Email address is required.';
    } else if (!emailRegex.test(email)) {
      errors.email = 'Please provide a valid email address.';
    } else if (email.length > 100) {
      errors.email = 'Email cannot exceed 100 characters.';
    }

    if (isNaN(semester) || !ALLOWED_SEMESTERS.includes(semester)) {
      errors.semester = 'Semester must be an integer between 1 and 6.';
    }

    if (!club || !ALLOWED_CLUBS.includes(club)) {
      errors.club = 'Invalid club selected. Allowed clubs: AI, Programming, Cybersecurity, IoT.';
    }

    if (!reason) {
      errors.reason = 'Reason for joining is required.';
    } else if (reason.length < 10) {
      errors.reason = 'Reason must be at least 10 characters long.';
    } else if (reason.length > 1000) {
      errors.reason = 'Reason cannot exceed 1000 characters.';
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed.',
        errors
      });
    }

    // 3. Duplicate Registration Check (by email+club or rollNumber+club)
    const existingRegistration = await Registration.findOne({
      $or: [
        { email, club },
        { rollNumber, club }
      ]
    });

    if (existingRegistration) {
      return res.status(409).json({
        success: false,
        message: 'You have already submitted a registration for this club.'
      });
    }

    // 4. Persistence with Enforced PENDING Status
    // Any client-supplied 'status', 'role', or 'accountStatus' is explicitly stripped
    const registration = new Registration({
      name,
      rollNumber,
      email,
      semester,
      club,
      reason,
      status: 'PENDING',
      emailStatus: 'PENDING'
    });

    const saved = await registration.save();

    // 5. Trigger Automated Registration Received Email via Resend
    // Executed strictly after successful MongoDB save; failure does not delete document
    try {
      const emailResult = await sendRegistrationReceivedEmail({
        name: saved.name,
        email: saved.email,
        rollNumber: saved.rollNumber,
        semester: saved.semester,
        club: saved.club
      });

      if (emailResult.success) {
        await Registration.findByIdAndUpdate(saved._id, { emailStatus: 'SENT' });
      } else {
        await Registration.findByIdAndUpdate(saved._id, { emailStatus: 'FAILED' });
      }
    } catch (emailErr) {
      console.error('Non-blocking email delivery error:', emailErr.message || emailErr);
      await Registration.findByIdAndUpdate(saved._id, { emailStatus: 'FAILED' }).catch(() => {});
    }

    // 6. Clean Success Response
    return res.status(201).json({
      success: true,
      message: 'Registration submitted successfully.',
      registration: {
        id: saved._id
      }
    });
  } catch (error) {
    console.error('Error creating registration:', error);
    return next(error);
  }
}
