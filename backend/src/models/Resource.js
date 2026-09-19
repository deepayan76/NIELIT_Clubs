import mongoose from 'mongoose';

export const ALLOWED_RESOURCE_TYPES = [
  'Video',
  'PDF',
  'Article',
  'GitHub',
  'Website',
  'Course',
  'Documentation',
  'Other'
];

export const ALLOWED_RESOURCE_CLUBS = ['AI', 'Programming', 'Cybersecurity', 'IoT'];

const urlRegex = /^https?:\/\/.+/i;

const resourceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Resource title is required.'],
      trim: true,
      maxlength: [150, 'Title cannot exceed 150 characters.']
    },
    description: {
      type: String,
      required: [true, 'Resource description is required.'],
      trim: true,
      minlength: [10, 'Description must be at least 10 characters long.'],
      maxlength: [1000, 'Description cannot exceed 1000 characters.']
    },
    type: {
      type: String,
      required: [true, 'Resource type is required.'],
      enum: {
        values: ALLOWED_RESOURCE_TYPES,
        message: 'Invalid resource type. Allowed types: Video, PDF, Article, GitHub, Website, Course, Documentation, Other.'
      }
    },
    club: {
      type: String,
      required: [true, 'Club is required.'],
      enum: {
        values: ALLOWED_RESOURCE_CLUBS,
        message: 'Invalid club. Allowed clubs: AI, Programming, Cybersecurity, IoT.'
      }
    },
    url: {
      type: String,
      required: [true, 'Resource URL is required.'],
      trim: true,
      match: [urlRegex, 'Please provide a valid HTTP or HTTPS URL.']
    },
    thumbnail: {
      type: String,
      trim: true,
      default: ''
    },
    tags: {
      type: [String],
      default: []
    },
    isPublished: {
      type: Boolean,
      default: true
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    createdByName: {
      type: String,
      default: 'Administrator'
    },
    updatedBy: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true
  }
);

// Compound indexes for optimal filtering and sorting
resourceSchema.index({ isPublished: 1, club: 1, createdAt: -1 });
resourceSchema.index({ isPublished: 1, type: 1, createdAt: -1 });
resourceSchema.index({ club: 1, type: 1 });
resourceSchema.index({ createdAt: -1 });

const Resource = mongoose.model('Resource', resourceSchema);

export default Resource;
