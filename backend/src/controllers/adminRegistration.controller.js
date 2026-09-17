import mongoose from 'mongoose';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import Registration, { ALLOWED_CLUBS, ALLOWED_SEMESTERS } from '../models/Registration.js';
import User from '../models/User.js';
import {
  sendApplicationApprovedEmail,
  sendApplicationRejectedEmail
} from '../services/email.service.js';
import { logAuditEvent } from '../services/audit.service.js';

/**
 * Escapes regex special characters to prevent ReDoS / query injection
 */
function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

/**
 * Normalizes club name
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
 * Generates a cryptographically strong temporary password
 */
function generateTemporaryPassword() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let randomPart = '';
  const randomBytes = crypto.randomBytes(6);
  for (let i = 0; i < 6; i++) {
    randomPart += chars[randomBytes[i] % chars.length];
  }
  return `NLT@${randomPart}!`;
}

/**
 * GET /api/admin/registrations
 * Retrieve filtered, searched, and paginated registrations
 */
export async function getRegistrations(req, res, next) {
  try {
    const rawPage = parseInt(req.query.page, 10);
    const rawLimit = parseInt(req.query.limit, 10);

    const page = !isNaN(rawPage) && rawPage > 0 ? rawPage : 1;
    let limit = !isNaN(rawLimit) && rawLimit > 0 ? rawLimit : 10;
    if (limit > 100) limit = 100; // Cap limit at 100

    const filter = {};

    // Filter: status
    if (req.query.status && req.query.status !== 'ALL') {
      const statusUpper = String(req.query.status).trim().toUpperCase();
      if (['PENDING', 'APPROVED', 'REJECTED'].includes(statusUpper)) {
        filter.status = statusUpper;
      }
    }

    // Filter: club
    if (req.query.club && req.query.club !== 'ALL') {
      const normalizedClub = normalizeClubName(String(req.query.club));
      if (ALLOWED_CLUBS.includes(normalizedClub)) {
        filter.club = normalizedClub;
      }
    }

    // Filter: semester
    if (req.query.semester && req.query.semester !== 'ALL') {
      const semNum = parseInt(req.query.semester, 10);
      if (!isNaN(semNum) && ALLOWED_SEMESTERS.includes(semNum)) {
        filter.semester = semNum;
      }
    }

    // Search: name, rollNumber, email
    if (req.query.search && typeof req.query.search === 'string' && req.query.search.trim()) {
      const searchRegex = new RegExp(escapeRegex(req.query.search.trim()), 'i');
      filter.$or = [
        { name: searchRegex },
        { rollNumber: searchRegex },
        { email: searchRegex }
      ];
    }

    const skip = (page - 1) * limit;

    const [registrations, total] = await Promise.all([
      Registration.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Registration.countDocuments(filter)
    ]);

    const pages = Math.ceil(total / limit) || 1;

    return res.status(200).json({
      success: true,
      data: registrations,
      pagination: {
        page,
        limit,
        total,
        pages
      }
    });
  } catch (error) {
    console.error('Error fetching admin registrations:', error);
    return next(error);
  }
}

/**
 * GET /api/admin/registrations/stats
 * Retrieve aggregated registration counts for dashboard
 */
export async function getRegistrationStats(req, res, next) {
  try {
    const [total, pending, approved, rejected, aiCount, progCount, cyberCount, iotCount] =
      await Promise.all([
        Registration.countDocuments({}),
        Registration.countDocuments({ status: 'PENDING' }),
        Registration.countDocuments({ status: 'APPROVED' }),
        Registration.countDocuments({ status: 'REJECTED' }),
        Registration.countDocuments({ club: 'AI' }),
        Registration.countDocuments({ club: 'Programming' }),
        Registration.countDocuments({ club: 'Cybersecurity' }),
        Registration.countDocuments({ club: 'IoT' })
      ]);

    return res.status(200).json({
      success: true,
      data: {
        total,
        pending,
        approved,
        rejected,
        byClub: {
          AI: aiCount,
          Programming: progCount,
          Cybersecurity: cyberCount,
          IoT: iotCount
        }
      }
    });
  } catch (error) {
    console.error('Error fetching registration stats:', error);
    return next(error);
  }
}

/**
 * GET /api/admin/registrations/:id
 * Retrieve details for a single registration
 */
export async function getRegistrationById(req, res, next) {
  try {
    const { id } = req.params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid registration ID format.'
      });
    }

    const registration = await Registration.findById(id).lean();

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: 'Registration record not found.'
      });
    }

    return res.status(200).json({
      success: true,
      data: registration
    });
  } catch (error) {
    console.error('Error fetching registration by ID:', error);
    return next(error);
  }
}

/**
 * PATCH /api/admin/registrations/:id/approve
 * Approves a pending registration application, creates active student User, and sends credentials email
 */
export async function approveRegistration(req, res, next) {
  try {
    const { id } = req.params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid registration ID format.'
      });
    }

    const registration = await Registration.findById(id);

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: 'Registration record not found.'
      });
    }

    if (registration.status !== 'PENDING') {
      return res.status(409).json({
        success: false,
        message: `This application has already been ${registration.status.toLowerCase()}.`
      });
    }

    // Generate secure temporary password and bcrypt hash
    const temporaryPassword = generateTemporaryPassword();
    const passwordHash = await bcrypt.hash(temporaryPassword, 10);

    // Find existing user records by email, rollNumber, or registrationId
    const existingByEmail = await User.findOne({ email: registration.email });
    const existingByRoll = await User.findOne({ rollNumber: registration.rollNumber });
    const existingByReg = await User.findOne({ registrationId: registration._id });

    let user = existingByReg || existingByEmail || existingByRoll;

    // If separate user documents exist with the same email or roll (e.g. from mixed test data), reconcile them
    if (existingByEmail && existingByRoll && String(existingByEmail._id) !== String(existingByRoll._id)) {
      await User.deleteOne({ _id: existingByRoll._id });
      user = existingByEmail;
    }

    if (!user) {
      user = new User({
        name: registration.name,
        rollNumber: registration.rollNumber,
        email: registration.email,
        semester: registration.semester,
        club: registration.club,
        passwordHash,
        role: 'STUDENT',
        accountStatus: 'ACTIVE',
        mustChangePassword: true,
        tokenVersion: 0,
        registrationId: registration._id
      });
    } else {
      user.name = registration.name;
      user.rollNumber = registration.rollNumber;
      user.email = registration.email;
      user.semester = registration.semester;
      user.club = registration.club;
      user.passwordHash = passwordHash;
      user.role = 'STUDENT';
      user.accountStatus = 'ACTIVE';
      user.mustChangePassword = true;
      user.tokenVersion = (user.tokenVersion || 0) + 1;
      user.registrationId = registration._id;
    }

    registration.status = 'APPROVED';
    registration.reviewedAt = new Date();
    registration.reviewedBy = req.user?.name || 'NIELIT Club Administrator';
    registration.decisionEmailStatus = 'PENDING';

    await user.save();
    await registration.save();

    await logAuditEvent({
      req,
      actorRole: 'ADMIN',
      actorIdentifier: req.user?.email || 'admin@nielit.edu.in',
      action: 'REGISTRATION_APPROVED',
      targetType: 'REGISTRATION',
      targetId: registration._id,
      metadata: {
        studentEmail: registration.email,
        rollNumber: registration.rollNumber,
        club: registration.club,
        userId: user._id
      }
    });

    // Dispatch approval email with temporary credentials
    const emailResult = await sendApplicationApprovedEmail({
      name: registration.name,
      email: registration.email,
      rollNumber: registration.rollNumber,
      semester: registration.semester,
      club: registration.club,
      temporaryPassword
    });

    registration.decisionEmailStatus = emailResult.success ? 'SENT' : 'FAILED';
    await registration.save();

    return res.status(200).json({
      success: true,
      message: 'Registration application approved and student account activated successfully.',
      data: {
        registrationId: registration._id,
        userId: user._id,
        status: 'APPROVED',
        accountStatus: 'ACTIVE',
        decisionEmailStatus: registration.decisionEmailStatus
      }
    });
  } catch (error) {
    console.error('Error approving registration:', error);
    return next(error);
  }
}

/**
 * PATCH /api/admin/registrations/:id/reject
 * Rejects a pending registration application and sends notification email
 */
export async function rejectRegistration(req, res, next) {
  try {
    const { id } = req.params;
    const { reason } = req.body || {};

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid registration ID format.'
      });
    }

    const registration = await Registration.findById(id);

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: 'Registration record not found.'
      });
    }

    if (registration.status !== 'PENDING') {
      return res.status(409).json({
        success: false,
        message: `This application has already been ${registration.status.toLowerCase()}.`
      });
    }

    const rejectionReason =
      typeof reason === 'string' && reason.trim()
        ? reason.trim().substring(0, 500)
        : 'The application did not meet the enrollment requirements for this academic cohort.';

    registration.status = 'REJECTED';
    registration.reviewedAt = new Date();
    registration.reviewedBy = req.user?.name || 'NIELIT Club Administrator';
    registration.rejectionReason = rejectionReason;
    registration.decisionEmailStatus = 'PENDING';

    await registration.save();

    await logAuditEvent({
      req,
      actorRole: 'ADMIN',
      actorIdentifier: req.user?.email || 'admin@nielit.edu.in',
      action: 'REGISTRATION_REJECTED',
      targetType: 'REGISTRATION',
      targetId: registration._id,
      metadata: {
        studentEmail: registration.email,
        rollNumber: registration.rollNumber,
        club: registration.club,
        rejectionReason
      }
    });

    // Dispatch rejection email
    const emailResult = await sendApplicationRejectedEmail({
      name: registration.name,
      email: registration.email,
      rollNumber: registration.rollNumber,
      semester: registration.semester,
      club: registration.club,
      rejectionReason
    });

    registration.decisionEmailStatus = emailResult.success ? 'SENT' : 'FAILED';
    await registration.save();

    return res.status(200).json({
      success: true,
      message: 'Registration application rejected.',
      data: {
        registrationId: registration._id,
        status: 'REJECTED',
        decisionEmailStatus: registration.decisionEmailStatus
      }
    });
  } catch (error) {
    console.error('Error rejecting registration:', error);
    return next(error);
  }
}

/**
 * GET /api/admin/students
 * Retrieve enrolled student records from User collection
 */
export async function getEnrolledStudents(req, res, next) {
  try {
    const filter = { role: 'STUDENT' };

    // Filter: club
    if (req.query.club && req.query.club !== 'ALL') {
      const normalizedClub = normalizeClubName(String(req.query.club));
      if (ALLOWED_CLUBS.includes(normalizedClub)) {
        filter.club = normalizedClub;
      }
    }

    // Filter: semester
    if (req.query.semester && req.query.semester !== 'ALL') {
      const semNum = parseInt(req.query.semester, 10);
      if (!isNaN(semNum) && ALLOWED_SEMESTERS.includes(semNum)) {
        filter.semester = semNum;
      }
    }

    // Search: name, rollNumber, email
    if (req.query.search && typeof req.query.search === 'string' && req.query.search.trim()) {
      const searchRegex = new RegExp(escapeRegex(req.query.search.trim()), 'i');
      filter.$or = [
        { name: searchRegex },
        { rollNumber: searchRegex },
        { email: searchRegex }
      ];
    }

    const students = await User.find(filter)
      .select('-passwordHash')
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      data: students.map((s) => ({
        _id: s._id,
        name: s.name,
        rollNumber: s.rollNumber,
        email: s.email,
        semester: s.semester,
        club: s.club,
        accountStatus: s.accountStatus,
        role: s.role,
        joinedDate: s.createdAt,
        registrationId: s.registrationId
      }))
    });
  } catch (error) {
    console.error('Error fetching enrolled students:', error);
    return next(error);
  }
}

/**
 * GET /api/admin/notifications
 * Retrieve real administrative notifications for pending applications
 */
export async function getAdminNotifications(req, res, next) {
  try {
    const pendingList = await Registration.find({ status: 'PENDING' })
      .sort({ createdAt: -1 })
      .limit(20)
      .lean();

    const notifications = pendingList.map((r, index) => ({
      id: `notif_${r._id}`,
      registrationId: r._id,
      title: 'New Registration Received',
      message: `${r.name} (${r.rollNumber}) submitted an application to join the ${r.club} Club.`,
      time: index === 0 ? 'Recent' : `${index + 1}h ago`,
      read: false,
      createdAt: r.createdAt
    }));

    return res.status(200).json({
      success: true,
      data: notifications
    });
  } catch (error) {
    console.error('Error fetching admin notifications:', error);
    return next(error);
  }
}

