import express from 'express';
import {
  getAdminResources,
  createResource,
  updateResource,
  deleteResource,
  publishResource,
  unpublishResource
} from '../controllers/resource.controller.js';
import { requireAdmin } from '../middleware/auth.js';

const router = express.Router();

/**
 * Protected Admin Resource Management API
 * Requires valid Admin JWT authentication
 */

// Enforce requireAdmin on all /api/admin/resources routes
router.use(requireAdmin);

// GET /api/admin/resources - Get all resources (published & draft) with search, filter, pagination
router.get('/', getAdminResources);

// POST /api/admin/resources - Create new learning resource
router.post('/', createResource);

// PATCH /api/admin/resources/:id/publish - Publish draft resource
router.patch('/:id/publish', publishResource);

// PATCH /api/admin/resources/:id/unpublish - Unpublish resource
router.patch('/:id/unpublish', unpublishResource);

// PATCH /api/admin/resources/:id - Update existing resource
router.patch('/:id', updateResource);

// DELETE /api/admin/resources/:id - Delete resource permanently
router.delete('/:id', deleteResource);

export default router;
