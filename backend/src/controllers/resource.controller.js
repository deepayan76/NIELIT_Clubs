import mongoose from 'mongoose';
import Resource, { ALLOWED_RESOURCE_TYPES, ALLOWED_RESOURCE_CLUBS } from '../models/Resource.js';

const URL_REGEX = /^https?:\/\/.+/i;

/**
 * Helper to escape special regex characters for safe MongoDB text search
 */
function escapeRegex(text) {
  if (typeof text !== 'string') return '';
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

/**
 * GET /api/resources
 * Retrieves paginated, published learning resources for students
 */
export async function getPublishedResources(req, res, next) {
  try {
    const { club, type, search, page = 1, limit = 12 } = req.query;

    const filter = { isPublished: true };

    // Filter by Club
    if (club && typeof club === 'string' && club.toUpperCase() !== 'ALL') {
      const normalizedClub = ALLOWED_RESOURCE_CLUBS.find(
        (c) => c.toLowerCase() === club.trim().toLowerCase()
      );
      if (normalizedClub) {
        filter.club = normalizedClub;
      }
    }

    // Filter by Resource Type
    if (type && typeof type === 'string' && type.toUpperCase() !== 'ALL') {
      const normalizedType = ALLOWED_RESOURCE_TYPES.find(
        (t) => t.toLowerCase() === type.trim().toLowerCase()
      );
      if (normalizedType) {
        filter.type = normalizedType;
      }
    }

    // Safe Search on Title, Description, or Tags
    if (search && typeof search === 'string' && search.trim()) {
      const safeSearch = escapeRegex(search.trim());
      filter.$or = [
        { title: { $regex: safeSearch, $options: 'i' } },
        { description: { $regex: safeSearch, $options: 'i' } },
        { tags: { $regex: safeSearch, $options: 'i' } }
      ];
    }

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.max(1, Math.min(100, parseInt(limit, 10) || 12));
    const skip = (pageNum - 1) * limitNum;

    const [resources, total] = await Promise.all([
      Resource.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum)
        .lean(),
      Resource.countDocuments(filter)
    ]);

    return res.status(200).json({
      success: true,
      resources,
      total,
      page: pageNum,
      totalPages: Math.ceil(total / limitNum) || 1
    });
  } catch (err) {
    console.error('Error fetching published resources:', err);
    return next(err);
  }
}

/**
 * GET /api/resources/:id
 * Retrieves a single published resource by ID
 */
export async function getPublishedResourceById(req, res, next) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        success: false,
        message: 'Resource not found.'
      });
    }

    const resource = await Resource.findOne({ _id: id, isPublished: true }).lean();

    if (!resource) {
      return res.status(404).json({
        success: false,
        message: 'Resource not found.'
      });
    }

    return res.status(200).json({
      success: true,
      resource
    });
  } catch (err) {
    console.error('Error fetching resource details:', err);
    return next(err);
  }
}

/**
 * GET /api/admin/resources
 * Retrieves all resources (published & draft) with full metadata for administrators
 */
export async function getAdminResources(req, res, next) {
  try {
    const { club, type, status, search, page = 1, limit = 10 } = req.query;

    const filter = {};

    // Filter by Club
    if (club && typeof club === 'string' && club.toUpperCase() !== 'ALL') {
      const normalizedClub = ALLOWED_RESOURCE_CLUBS.find(
        (c) => c.toLowerCase() === club.trim().toLowerCase()
      );
      if (normalizedClub) {
        filter.club = normalizedClub;
      }
    }

    // Filter by Type
    if (type && typeof type === 'string' && type.toUpperCase() !== 'ALL') {
      const normalizedType = ALLOWED_RESOURCE_TYPES.find(
        (t) => t.toLowerCase() === type.trim().toLowerCase()
      );
      if (normalizedType) {
        filter.type = normalizedType;
      }
    }

    // Filter by Publication Status
    if (status && typeof status === 'string') {
      const cleanStatus = status.trim().toLowerCase();
      if (cleanStatus === 'published') {
        filter.isPublished = true;
      } else if (cleanStatus === 'draft' || cleanStatus === 'unpublished') {
        filter.isPublished = false;
      }
    }

    // Safe Search
    if (search && typeof search === 'string' && search.trim()) {
      const safeSearch = escapeRegex(search.trim());
      filter.$or = [
        { title: { $regex: safeSearch, $options: 'i' } },
        { description: { $regex: safeSearch, $options: 'i' } },
        { tags: { $regex: safeSearch, $options: 'i' } }
      ];
    }

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.max(1, Math.min(100, parseInt(limit, 10) || 10));
    const skip = (pageNum - 1) * limitNum;

    const [resources, total] = await Promise.all([
      Resource.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum)
        .lean(),
      Resource.countDocuments(filter)
    ]);

    return res.status(200).json({
      success: true,
      resources,
      total,
      page: pageNum,
      totalPages: Math.ceil(total / limitNum) || 1
    });
  } catch (err) {
    console.error('Error fetching admin resources:', err);
    return next(err);
  }
}

/**
 * POST /api/admin/resources
 * Creates a new learning resource
 */
export async function createResource(req, res, next) {
  try {
    const rawBody = req.body || {};
    const errors = {};

    // 1. Title validation
    const title = typeof rawBody.title === 'string' ? rawBody.title.trim() : '';
    if (!title) {
      errors.title = 'Resource title is required.';
    } else if (title.length > 150) {
      errors.title = 'Title cannot exceed 150 characters.';
    }

    // 2. Description validation
    const description = typeof rawBody.description === 'string' ? rawBody.description.trim() : '';
    if (!description) {
      errors.description = 'Resource description is required.';
    } else if (description.length < 10) {
      errors.description = 'Description must be at least 10 characters long.';
    } else if (description.length > 1000) {
      errors.description = 'Description cannot exceed 1000 characters.';
    }

    // 3. Type validation
    const rawType = typeof rawBody.type === 'string' ? rawBody.type.trim() : '';
    const type = ALLOWED_RESOURCE_TYPES.find(
      (t) => t.toLowerCase() === rawType.toLowerCase()
    );
    if (!type) {
      errors.type = `Resource type must be one of: ${ALLOWED_RESOURCE_TYPES.join(', ')}.`;
    }

    // 4. Club validation
    const rawClub = typeof rawBody.club === 'string' ? rawBody.club.trim() : '';
    const club = ALLOWED_RESOURCE_CLUBS.find(
      (c) => c.toLowerCase() === rawClub.toLowerCase()
    );
    if (!club) {
      errors.club = `Club must be one of: ${ALLOWED_RESOURCE_CLUBS.join(', ')}.`;
    }

    // 5. URL validation
    const url = typeof rawBody.url === 'string' ? rawBody.url.trim() : '';
    if (!url) {
      errors.url = 'Resource URL is required.';
    } else if (!URL_REGEX.test(url)) {
      errors.url = 'Please provide a valid HTTP or HTTPS URL.';
    }

    // 6. Thumbnail URL validation (optional)
    const thumbnail = typeof rawBody.thumbnail === 'string' ? rawBody.thumbnail.trim() : '';
    if (thumbnail && !URL_REGEX.test(thumbnail)) {
      errors.thumbnail = 'Thumbnail must be a valid HTTP or HTTPS URL.';
    }

    // 7. Tags normalization
    let tags = [];
    if (Array.isArray(rawBody.tags)) {
      tags = rawBody.tags
        .filter((t) => typeof t === 'string' && t.trim().length > 0)
        .map((t) => t.trim().slice(0, 40));
    } else if (typeof rawBody.tags === 'string' && rawBody.tags.trim()) {
      tags = rawBody.tags
        .split(',')
        .map((t) => t.trim().slice(0, 40))
        .filter(Boolean);
    }

    // 8. Publication state
    const isPublished = rawBody.isPublished !== false;

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Resource validation failed.',
        errors
      });
    }

    // Prevent mass assignment and enforce backend creator assignment
    const resource = new Resource({
      title,
      description,
      type,
      club,
      url,
      thumbnail,
      tags,
      isPublished,
      createdBy: req.user?.id ? new mongoose.Types.ObjectId(req.user.id) : undefined,
      createdByName: req.user?.name || 'Administrator',
      updatedBy: ''
    });

    const saved = await resource.save();

    return res.status(201).json({
      success: true,
      message: 'Resource created successfully.',
      resource: saved
    });
  } catch (err) {
    console.error('Error creating resource:', err);
    return next(err);
  }
}

/**
 * PATCH /api/admin/resources/:id
 * Updates an existing resource
 */
export async function updateResource(req, res, next) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        success: false,
        message: 'Resource not found.'
      });
    }

    const existing = await Resource.findById(id);
    if (!existing) {
      return res.status(404).json({
        success: false,
        message: 'Resource not found.'
      });
    }

    const rawBody = req.body || {};
    const errors = {};

    // Validate fields if provided
    if (rawBody.title !== undefined) {
      const title = typeof rawBody.title === 'string' ? rawBody.title.trim() : '';
      if (!title) {
        errors.title = 'Resource title cannot be empty.';
      } else if (title.length > 150) {
        errors.title = 'Title cannot exceed 150 characters.';
      } else {
        existing.title = title;
      }
    }

    if (rawBody.description !== undefined) {
      const description = typeof rawBody.description === 'string' ? rawBody.description.trim() : '';
      if (!description) {
        errors.description = 'Resource description cannot be empty.';
      } else if (description.length < 10) {
        errors.description = 'Description must be at least 10 characters long.';
      } else if (description.length > 1000) {
        errors.description = 'Description cannot exceed 1000 characters.';
      } else {
        existing.description = description;
      }
    }

    if (rawBody.type !== undefined) {
      const rawType = typeof rawBody.type === 'string' ? rawBody.type.trim() : '';
      const type = ALLOWED_RESOURCE_TYPES.find(
        (t) => t.toLowerCase() === rawType.toLowerCase()
      );
      if (!type) {
        errors.type = `Resource type must be one of: ${ALLOWED_RESOURCE_TYPES.join(', ')}.`;
      } else {
        existing.type = type;
      }
    }

    if (rawBody.club !== undefined) {
      const rawClub = typeof rawBody.club === 'string' ? rawBody.club.trim() : '';
      const club = ALLOWED_RESOURCE_CLUBS.find(
        (c) => c.toLowerCase() === rawClub.toLowerCase()
      );
      if (!club) {
        errors.club = `Club must be one of: ${ALLOWED_RESOURCE_CLUBS.join(', ')}.`;
      } else {
        existing.club = club;
      }
    }

    if (rawBody.url !== undefined) {
      const url = typeof rawBody.url === 'string' ? rawBody.url.trim() : '';
      if (!url) {
        errors.url = 'Resource URL cannot be empty.';
      } else if (!URL_REGEX.test(url)) {
        errors.url = 'Please provide a valid HTTP or HTTPS URL.';
      } else {
        existing.url = url;
      }
    }

    if (rawBody.thumbnail !== undefined) {
      const thumbnail = typeof rawBody.thumbnail === 'string' ? rawBody.thumbnail.trim() : '';
      if (thumbnail && !URL_REGEX.test(thumbnail)) {
        errors.thumbnail = 'Thumbnail must be a valid HTTP or HTTPS URL.';
      } else {
        existing.thumbnail = thumbnail;
      }
    }

    if (rawBody.tags !== undefined) {
      if (Array.isArray(rawBody.tags)) {
        existing.tags = rawBody.tags
          .filter((t) => typeof t === 'string' && t.trim().length > 0)
          .map((t) => t.trim().slice(0, 40));
      } else if (typeof rawBody.tags === 'string') {
        existing.tags = rawBody.tags
          .split(',')
          .map((t) => t.trim().slice(0, 40))
          .filter(Boolean);
      }
    }

    if (rawBody.isPublished !== undefined) {
      existing.isPublished = Boolean(rawBody.isPublished);
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Resource validation failed.',
        errors
      });
    }

    existing.updatedBy = req.user?.name || 'Administrator';

    const updated = await existing.save();

    return res.status(200).json({
      success: true,
      message: 'Resource updated successfully.',
      resource: updated
    });
  } catch (err) {
    console.error('Error updating resource:', err);
    return next(err);
  }
}

/**
 * DELETE /api/admin/resources/:id
 * Removes a resource permanently
 */
export async function deleteResource(req, res, next) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        success: false,
        message: 'Resource not found.'
      });
    }

    const deleted = await Resource.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Resource not found.'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Resource deleted successfully.'
    });
  } catch (err) {
    console.error('Error deleting resource:', err);
    return next(err);
  }
}

/**
 * PATCH /api/admin/resources/:id/publish
 * Publishes a draft resource
 */
export async function publishResource(req, res, next) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        success: false,
        message: 'Resource not found.'
      });
    }

    const updated = await Resource.findByIdAndUpdate(
      id,
      { isPublished: true, updatedBy: req.user?.name || 'Administrator' },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Resource not found.'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Resource published successfully.',
      resource: updated
    });
  } catch (err) {
    console.error('Error publishing resource:', err);
    return next(err);
  }
}

/**
 * PATCH /api/admin/resources/:id/unpublish
 * Unpublishes a resource (sets to draft)
 */
export async function unpublishResource(req, res, next) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        success: false,
        message: 'Resource not found.'
      });
    }

    const updated = await Resource.findByIdAndUpdate(
      id,
      { isPublished: false, updatedBy: req.user?.name || 'Administrator' },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Resource unpublished successfully.',
        resource: updated
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Resource unpublished successfully.',
      resource: updated
    });
  } catch (err) {
    console.error('Error unpublishing resource:', err);
    return next(err);
  }
}
