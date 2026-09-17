import express from 'express';
import { adminLogin, adminLogout, getAdminMe } from '../controllers/adminAuth.controller.js';
import { requireAdmin } from '../middleware/auth.js';
import { authLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

// Admin Authentication Routes
router.post('/login', authLimiter, adminLogin);
router.post('/logout', adminLogout);
router.get('/me', requireAdmin, getAdminMe);

export default router;
