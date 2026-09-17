import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { getCookieOptions } from './adminAuth.controller.js';
import { validatePassword } from '../utils/passwordValidator.js';
import { sendPasswordResetEmail } from '../services/email.service.js';
import { logAuditEvent } from '../services/audit.service.js';

/**
 * Helper to generate student JWT token
 */
function generateStudentToken(user) {
  const jwtSecret = process.env.JWT_SECRET;
  const jwtExpiresIn = process.env.JWT_EXPIRES_IN || '1d';

  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      rollNumber: user.rollNumber,
      name: user.name,
      club: user.club,
      semester: user.semester,
      role: 'STUDENT',
      tokenVersion: user.tokenVersion || 0,
      mustChangePassword: user.mustChangePassword || false
    },
    jwtSecret,
    { expiresIn: jwtExpiresIn }
  );
}

/**
 * POST /api/auth/login
 * Authenticates active student and issues HTTP-only JWT cookie
 */
export async function studentLogin(req, res, next) {
  try {
    const { email, password } = req.body || {};

    if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required.'
      });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      await logAuditEvent({
        req,
        actorRole: 'ANONYMOUS',
        actorIdentifier: normalizedEmail,
        action: 'STUDENT_LOGIN_FAILED',
        targetType: 'AUTH',
        metadata: { reason: 'User not found' }
      });

      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.'
      });
    }

    if (user.role !== 'STUDENT') {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized role.'
      });
    }

    if (user.accountStatus !== 'ACTIVE') {
      return res.status(403).json({
        success: false,
        message: 'Your student account is not active. Please contact administration.'
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.passwordHash);

    if (!passwordMatch) {
      await logAuditEvent({
        req,
        actorRole: 'STUDENT',
        actorIdentifier: user.email,
        action: 'STUDENT_LOGIN_FAILED',
        targetType: 'USER',
        targetId: user._id,
        metadata: { reason: 'Password mismatch' }
      });

      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.'
      });
    }

    const token = generateStudentToken(user);

    // Set HTTP-only student token cookie
    res.cookie('nielit_student_token', token, getCookieOptions());

    await logAuditEvent({
      req,
      actorRole: 'STUDENT',
      actorIdentifier: user.email,
      action: 'STUDENT_LOGIN_SUCCESS',
      targetType: 'USER',
      targetId: user._id
    });

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        rollNumber: user.rollNumber,
        semester: user.semester,
        club: user.club,
        role: 'STUDENT',
        accountStatus: user.accountStatus,
        mustChangePassword: user.mustChangePassword || false
      }
    });
  } catch (error) {
    console.error('Error during student login:', error);
    return next(error);
  }
}

/**
 * POST /api/auth/logout
 * Clears student authentication cookie
 */
export function studentLogout(req, res) {
  res.clearCookie('nielit_student_token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
  });

  return res.status(200).json({
    success: true,
    message: 'Student logout successful'
  });
}

/**
 * GET /api/auth/me
 * Returns authenticated student's profile (guarded by requireStudent)
 */
export function getStudentMe(req, res) {
  return res.status(200).json({
    success: true,
    data: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      rollNumber: req.user.rollNumber,
      semester: req.user.semester,
      club: req.user.club,
      role: req.user.role,
      accountStatus: req.user.accountStatus,
      mustChangePassword: req.user.mustChangePassword || false
    }
  });
}

/**
 * POST /api/auth/change-password
 * Authenticated student updates their own password (guarded by requireStudent)
 */
export async function changePassword(req, res, next) {
  try {
    const { currentPassword, newPassword } = req.body || {};

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Current password and new password are required.'
      });
    }

    const validation = validatePassword(newPassword);
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: validation.message
      });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Student record not found.'
      });
    }

    const currentMatches = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!currentMatches) {
      return res.status(400).json({
        success: false,
        message: 'Incorrect current password.'
      });
    }

    if (currentPassword === newPassword) {
      return res.status(400).json({
        success: false,
        message: 'New password must be different from your current password.'
      });
    }

    // Hash new password and increment tokenVersion for session revocation
    const newPasswordHash = await bcrypt.hash(newPassword, 10);
    user.passwordHash = newPasswordHash;
    user.mustChangePassword = false;
    user.tokenVersion = (user.tokenVersion || 0) + 1;

    await user.save();

    // Issue fresh cookie with updated tokenVersion so current session continues
    const freshToken = generateStudentToken(user);
    res.cookie('nielit_student_token', freshToken, getCookieOptions());

    await logAuditEvent({
      req,
      actorRole: 'STUDENT',
      actorIdentifier: user.email,
      action: 'STUDENT_PASSWORD_CHANGED',
      targetType: 'USER',
      targetId: user._id
    });

    return res.status(200).json({
      success: true,
      message: 'Password successfully changed.',
      data: {
        mustChangePassword: false
      }
    });
  } catch (error) {
    console.error('Error changing student password:', error);
    return next(error);
  }
}

/**
 * POST /api/auth/forgot-password
 * Initiates single-use password reset workflow with generic anti-enumeration response
 */
export async function forgotPassword(req, res, next) {
  try {
    const { email } = req.body || {};

    const genericSuccess = {
      success: true,
      message: 'If an account exists for this email, password reset instructions have been sent.'
    };

    if (!email || typeof email !== 'string') {
      return res.status(200).json(genericSuccess);
    }

    const normalizedEmail = email.trim().toLowerCase();
    const user = await User.findOne({ email: normalizedEmail, role: 'STUDENT', accountStatus: 'ACTIVE' });

    if (!user) {
      // Return identical generic response to prevent email enumeration
      return res.status(200).json(genericSuccess);
    }

    // Generate cryptographically random 32-byte raw token and SHA-256 hash
    const rawToken = crypto.randomBytes(32).toString('hex');
    const tokenHash = crypto.createHash('sha256').update(rawToken).digest('hex');

    user.passwordResetTokenHash = tokenHash;
    user.passwordResetExpiresAt = new Date(Date.now() + 20 * 60 * 1000); // 20 minutes expiry
    await user.save();

    await logAuditEvent({
      req,
      actorRole: 'ANONYMOUS',
      actorIdentifier: normalizedEmail,
      action: 'STUDENT_PASSWORD_RESET_REQUESTED',
      targetType: 'USER',
      targetId: user._id
    });

    // Send single-use reset link via Resend
    await sendPasswordResetEmail({
      name: user.name,
      email: user.email,
      token: rawToken
    });

    return res.status(200).json(genericSuccess);
  } catch (error) {
    console.error('Error in forgot password request:', error);
    return next(error);
  }
}

/**
 * POST /api/auth/reset-password
 * Resets student password using single-use hashed reset token
 */
export async function resetPassword(req, res, next) {
  try {
    const { token, newPassword } = req.body || {};

    if (!token || !newPassword || typeof token !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'Reset token and new password are required.'
      });
    }

    const validation = validatePassword(newPassword);
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: validation.message
      });
    }

    // Hash token to compare against stored hash
    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');

    const user = await User.findOne({
      passwordResetTokenHash: tokenHash,
      passwordResetExpiresAt: { $gt: new Date() }
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired password reset link. Please request a new one.'
      });
    }

    // Update password, clear reset token, increment tokenVersion to revoke all older sessions
    const passwordHash = await bcrypt.hash(newPassword, 10);
    user.passwordHash = passwordHash;
    user.passwordResetTokenHash = null;
    user.passwordResetExpiresAt = null;
    user.mustChangePassword = false;
    user.tokenVersion = (user.tokenVersion || 0) + 1;

    await user.save();

    await logAuditEvent({
      req,
      actorRole: 'STUDENT',
      actorIdentifier: user.email,
      action: 'STUDENT_PASSWORD_RESET_COMPLETED',
      targetType: 'USER',
      targetId: user._id
    });

    return res.status(200).json({
      success: true,
      message: 'Your password has been successfully reset. Please log in with your new credentials.'
    });
  } catch (error) {
    console.error('Error resetting student password:', error);
    return next(error);
  }
}
