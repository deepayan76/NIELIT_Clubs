import express from 'express';
import {
  studentLogin,
  studentLogout,
  getStudentMe,
  changePassword,
  forgotPassword,
  resetPassword
} from '../controllers/studentAuth.controller.js';
import { requireStudent } from '../middleware/auth.js';
import { authLimiter, passwordResetLimiter, changePasswordLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

// Student Authentication Routes
router.post('/login', authLimiter, studentLogin);
router.post('/logout', studentLogout);
router.get('/me', requireStudent, getStudentMe);

// Phase 7: Password Hardening & Self-Service Reset Routes
router.post('/change-password', requireStudent, changePasswordLimiter, changePassword);
router.post('/forgot-password', passwordResetLimiter, forgotPassword);
router.post('/reset-password', passwordResetLimiter, resetPassword);

export default router;
