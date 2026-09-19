import express from 'express';
import {
  getPublishedResources,
  getPublishedResourceById
} from '../controllers/resource.controller.js';

const router = express.Router();

/**
 * Public/Student Learning Resources API
 * Returns only published resources
 */

// GET /api/resources - List published resources with search & filtering
router.get('/', getPublishedResources);

// GET /api/resources/:id - Get single published resource details
router.get('/:id', getPublishedResourceById);

export default router;
