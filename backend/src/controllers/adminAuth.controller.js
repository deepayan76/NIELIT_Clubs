import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { logAuditEvent } from '../services/audit.service.js';

/**
 * Helper to get cookie options
 */
export function getCookieOptions() {
  const isProduction = process.env.NODE_ENV === 'production';
  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  };
}

/**
 * POST /api/admin/auth/login
 * Authenticates administrator and sets HTTP-only JWT cookie
 */
export async function adminLogin(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'Administrator email and password are required.'
      });
    }

    const adminEmail = process.env.ADMIN_EMAIL || 'admin@nielit.edu.in';
    const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;
    const jwtSecret = process.env.JWT_SECRET;
    const jwtExpiresIn = process.env.JWT_EXPIRES_IN || '1d';

    if (!adminPasswordHash || !jwtSecret) {
      console.error('CRITICAL: ADMIN_PASSWORD_HASH or JWT_SECRET is not configured.');
      return res.status(500).json({
        success: false,
        message: 'Server authentication configuration error.'
      });
    }

    // Constant-time-like validation
    const emailMatches = email.trim().toLowerCase() === adminEmail.trim().toLowerCase();
    const passwordMatches = await bcrypt.compare(password, adminPasswordHash);

    if (!emailMatches || !passwordMatches) {
      await logAuditEvent({
        req,
        actorRole: 'ANONYMOUS',
        actorIdentifier: email.trim().toLowerCase(),
        action: 'ADMIN_LOGIN_FAILED',
        targetType: 'AUTH',
        metadata: { reason: 'Invalid admin credentials' }
      });

      return res.status(401).json({
        success: false,
        message: 'Invalid administrator credentials.'
      });
    }

    // Sign JWT
    const token = jwt.sign(
      {
        id: 'adm_root',
        email: adminEmail,
        role: 'ADMIN',
        name: 'NIELIT Club Administrator'
      },
      jwtSecret,
      { expiresIn: jwtExpiresIn }
    );

    // Set HTTP-only Cookie
    res.cookie('nielit_admin_token', token, getCookieOptions());

    await logAuditEvent({
      req,
      actorRole: 'ADMIN',
      actorIdentifier: adminEmail,
      action: 'ADMIN_LOGIN_SUCCESS',
      targetType: 'AUTH'
    });

    return res.status(200).json({
      success: true,
      message: 'Admin login successful',
      admin: {
        _id: 'adm_root',
        email: adminEmail,
        role: 'ADMIN',
        name: 'NIELIT Club Administrator'
      }
    });
  } catch (error) {
    console.error('Error during admin login:', error);
    return next(error);
  }
}

/**
 * POST /api/admin/auth/logout
 * Clears administrator authentication cookie
 */
export function adminLogout(req, res) {
  res.clearCookie('nielit_admin_token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
  });

  return res.status(200).json({
    success: true,
    message: 'Admin logout successful'
  });
}

/**
 * GET /api/admin/auth/me
 * Returns current admin profile if authenticated
 */
export function getAdminMe(req, res) {
  return res.status(200).json({
    success: true,
    data: {
      email: req.user.email,
      role: 'ADMIN',
      name: req.user.name || 'NIELIT Club Administrator'
    }
  });
}
