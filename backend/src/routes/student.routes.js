import express from 'express';
import {
  getStudentProfile,
  getStudentApplication,
  getStudentNotifications
} from '../controllers/student.controller.js';
import { requireStudent } from '../middleware/auth.js';

const router = express.Router();

// Apply requireStudent middleware to all /api/student/* endpoints
router.use(requireStudent);

// GET /api/student/profile
router.get('/profile', getStudentProfile);

// GET /api/student/application
router.get('/application', getStudentApplication);

// GET /api/student/notifications
router.get('/notifications', getStudentNotifications);

export default router;
