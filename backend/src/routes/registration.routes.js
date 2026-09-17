import express from 'express';
import { createRegistration } from '../controllers/registration.controller.js';

const router = express.Router();

/**
 * @route   POST /api/registrations
 * @desc    Submit a new student club registration application
 * @access  Public
 */
router.post('/', createRegistration);

export default router;
