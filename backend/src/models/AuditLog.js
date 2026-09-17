import mongoose from 'mongoose';

const auditLogSchema = new mongoose.Schema(
  {
    actorRole: {
      type: String,
      enum: ['ADMIN', 'STUDENT', 'SYSTEM', 'ANONYMOUS'],
      required: true
    },
    actorIdentifier: {
      type: String,
      required: true,
      trim: true
    },
    action: {
      type: String,
      enum: [
        'ADMIN_LOGIN_SUCCESS',
        'ADMIN_LOGIN_FAILED',
        'REGISTRATION_SUBMITTED',
        'REGISTRATION_APPROVED',
        'REGISTRATION_REJECTED',
        'STUDENT_LOGIN_SUCCESS',
        'STUDENT_LOGIN_FAILED',
        'STUDENT_PASSWORD_CHANGED',
        'STUDENT_PASSWORD_RESET_REQUESTED',
        'STUDENT_PASSWORD_RESET_COMPLETED'
      ],
      required: true
    },
    targetType: {
      type: String,
      enum: ['REGISTRATION', 'USER', 'AUTH', 'SYSTEM'],
      required: true
    },
    targetId: {
      type: String,
      default: null
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {}
    },
    ip: {
      type: String,
      default: null
    },
    userAgent: {
      type: String,
      default: null
    }
  },
  {
    timestamps: { createdAt: true, updatedAt: false }
  }
);

// Indexes for fast audit retrieval and filtering
auditLogSchema.index({ createdAt: -1 });
auditLogSchema.index({ action: 1, createdAt: -1 });
auditLogSchema.index({ actorIdentifier: 1, createdAt: -1 });

const AuditLog = mongoose.model('AuditLog', auditLogSchema);

export default AuditLog;
