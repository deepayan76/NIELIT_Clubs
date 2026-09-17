import mongoose from 'mongoose';

export const ALLOWED_CLUBS = ['AI', 'Programming', 'Cybersecurity', 'IoT'];
export const ALLOWED_SEMESTERS = [1, 2, 3, 4, 5, 6];

const registrationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Student name is required.'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters.']
    },
    rollNumber: {
      type: String,
      required: [true, 'Roll number is required.'],
      trim: true,
      maxlength: [50, 'Roll number cannot exceed 50 characters.']
    },
    email: {
      type: String,
      required: [true, 'Email address is required.'],
      trim: true,
      lowercase: true,
      maxlength: [100, 'Email cannot exceed 100 characters.'],
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please provide a valid email address.']
    },
    semester: {
      type: Number,
      required: [true, 'Semester is required.'],
      enum: {
        values: ALLOWED_SEMESTERS,
        message: 'Semester must be between 1 and 6.'
      }
    },
    club: {
      type: String,
      required: [true, 'Club selection is required.'],
      enum: {
        values: ALLOWED_CLUBS,
        message: 'Club must be one of: AI, Programming, Cybersecurity, IoT.'
      }
    },
    reason: {
      type: String,
      required: [true, 'Reason for joining is required.'],
      trim: true,
      minlength: [10, 'Reason must be at least 10 characters long.'],
      maxlength: [1000, 'Reason cannot exceed 1000 characters.']
    },
    status: {
      type: String,
      enum: ['PENDING', 'APPROVED', 'REJECTED'],
      default: 'PENDING'
    },
    emailStatus: {
      type: String,
      enum: ['PENDING', 'SENT', 'FAILED', 'SKIPPED'],
      default: 'PENDING'
    },
    decisionEmailStatus: {
      type: String,
      enum: ['PENDING', 'SENT', 'FAILED', 'SKIPPED'],
      default: 'PENDING'
    },
    reviewedAt: {
      type: Date
    },
    reviewedBy: {
      type: String
    },
    rejectionReason: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

// Indexes for duplicate detection, filtering, and sorting
registrationSchema.index({ email: 1, club: 1 });
registrationSchema.index({ rollNumber: 1, club: 1 });
registrationSchema.index({ status: 1, createdAt: -1 });
registrationSchema.index({ club: 1, createdAt: -1 });
registrationSchema.index({ semester: 1, createdAt: -1 });
registrationSchema.index({ createdAt: -1 });

const Registration = mongoose.model('Registration', registrationSchema);

export default Registration;

