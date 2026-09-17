import jwt from 'jsonwebtoken';
import User from '../models/User.js';

/**
 * Middleware: requireAdmin
 * Verifies that the incoming request contains a valid Admin JWT cookie.
 */
export function requireAdmin(req, res, next) {
  try {
    const token =
      req.cookies?.nielit_admin_token ||
      (req.headers.authorization?.startsWith('Bearer ')
        ? req.headers.authorization.split(' ')[1]
        : null);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required. Please log in as an administrator.'
      });
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.error('CRITICAL: JWT_SECRET is not configured in backend environment.');
      return res.status(500).json({
        success: false,
        message: 'Internal server security configuration error.'
      });
    }

    const decoded = jwt.verify(token, secret);

    if (decoded.role !== 'ADMIN') {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized. Administrator privileges required.'
      });
    }

    req.user = decoded;
    return next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Session expired. Please log in again.'
      });
    }
    return res.status(401).json({
      success: false,
      message: 'Invalid or malformed authentication token.'
    });
  }
}

/**
 * Middleware: requireStudent
 * Verifies that the incoming request contains a valid Student JWT cookie, active account, and matching tokenVersion.
 */
export async function requireStudent(req, res, next) {
  try {
    const token =
      req.cookies?.nielit_student_token ||
      (req.headers.authorization?.startsWith('Bearer ')
        ? req.headers.authorization.split(' ')[1]
        : null);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required. Please log in to your student account.'
      });
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.error('CRITICAL: JWT_SECRET is not configured in backend environment.');
      return res.status(500).json({
        success: false,
        message: 'Internal server security configuration error.'
      });
    }

    const decoded = jwt.verify(token, secret);

    if (decoded.role !== 'STUDENT') {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized. Student privileges required.'
      });
    }

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Student account not found.'
      });
    }

    if (user.accountStatus !== 'ACTIVE') {
      return res.status(403).json({
        success: false,
        message: 'Your student account is not active. Please contact administration.'
      });
    }

    // Session revocation check via tokenVersion
    const userTokenVersion = user.tokenVersion || 0;
    const tokenVersionInJwt = decoded.tokenVersion || 0;
    if (userTokenVersion !== tokenVersionInJwt) {
      return res.status(401).json({
        success: false,
        message: 'Your session has been invalidated due to a security update. Please log in again.'
      });
    }

    req.user = user;
    return next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Session expired. Please log in again.'
      });
    }
    return res.status(401).json({
      success: false,
      message: 'Invalid or malformed authentication token.'
    });
  }
}
