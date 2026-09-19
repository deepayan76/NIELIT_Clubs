import mongoose from 'mongoose';
import { ALLOWED_CLUBS, ALLOWED_SEMESTERS } from './Registration.js';

const userSchema = new mongoose.Schema(
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
      unique: true,
      maxlength: [50, 'Roll number cannot exceed 50 characters.']
    },
    email: {
      type: String,
      required: [true, 'Email address is required.'],
      trim: true,
      lowercase: true,
      unique: true,
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
    passwordHash: {
      type: String,
      required: [true, 'Password hash is required.']
    },
    mustChangePassword: {
      type: Boolean,
      default: false
    },
    tokenVersion: {
      type: Number,
      default: 0
    },
    passwordResetTokenHash: {
      type: String,
      default: null
    },
    passwordResetExpiresAt: {
      type: Date,
      default: null
    },
    role: {
      type: String,
      enum: ['STUDENT', 'ADMIN'],
      default: 'STUDENT'
    },
    accountStatus: {
      type: String,
      enum: ['ACTIVE', 'INACTIVE', 'SUSPENDED', 'TERMINATED'],
      default: 'ACTIVE'
    },
    terminatedAt: {
      type: Date,
      default: null
    },
    terminatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null
    },
    terminationReason: {
      type: String,
      maxlength: [500, 'Termination reason cannot exceed 500 characters.'],
      trim: true,
      default: null
    },
    registrationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Registration',
      required: [true, 'Registration reference ID is required.'],
      unique: true
    }
  },
  {
    timestamps: true
  }
);

// Secondary Query Indexes
userSchema.index({ passwordResetTokenHash: 1 });
userSchema.index({ role: 1, accountStatus: 1 });

// Never expose passwordHash or passwordResetTokenHash in JSON serialization
userSchema.methods.toJSON = function () {
  const userObj = this.toObject();
  delete userObj.passwordHash;
  delete userObj.passwordResetTokenHash;
  return userObj;
};

const User = mongoose.model('User', userSchema);

export default User;
