import express from 'express';
import {
  getRegistrations,
  getRegistrationStats,
  getRegistrationById,
  approveRegistration,
  rejectRegistration,
  getEnrolledStudents,
  getAdminNotifications
} from '../controllers/adminRegistration.controller.js';
import { requireAdmin } from '../middleware/auth.js';

const router = express.Router();

/**
 * Protected Admin Registration Endpoints
 * All routes require valid Admin JWT authentication
 */

// Apply requireAdmin middleware to all routes in this router
router.use(requireAdmin);

// GET /api/admin/registrations - Paginated, filtered, searched list of registrations
router.get('/registrations', getRegistrations);

// GET /api/admin/registrations/stats - Live aggregated counts (total, pending, approved, rejected, byClub)
router.get('/registrations/stats', getRegistrationStats);

// GET /api/admin/registrations/:id - Single registration record details
router.get('/registrations/:id', getRegistrationById);

// PATCH /api/admin/registrations/:id/approve - Approve pending registration & activate student account
router.patch('/registrations/:id/approve', approveRegistration);

// PATCH /api/admin/registrations/:id/reject - Reject pending registration
router.patch('/registrations/:id/reject', rejectRegistration);

// GET /api/admin/students - Enrolled active students list from User collection
router.get('/students', getEnrolledStudents);

// GET /api/admin/notifications - Real-time admin notifications
router.get('/notifications', getAdminNotifications);

export default router;

