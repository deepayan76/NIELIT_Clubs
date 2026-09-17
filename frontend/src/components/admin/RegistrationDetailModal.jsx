import React from 'react';
import { X, CheckCircle2, Clock, XCircle, User, BookOpen, Layers, HelpCircle, Calendar, Shield } from 'lucide-react';

export default function RegistrationDetailModal({
  registration,
  isOpen,
  onClose,
  onOpenApprove,
  onOpenReject
}) {
  if (!isOpen || !registration) return null;

  const isPending = registration.status === 'PENDING';
  const isApproved = registration.status === 'APPROVED';
  const isRejected = registration.status === 'REJECTED';

  const getStatusBadge = (status) => {
    switch (status) {
      case 'APPROVED':
        return (
          <span className="status-tag approved">
            <CheckCircle2 size={16} /> ✓ APPROVED
          </span>
        );
      case 'REJECTED':
        return (
          <span className="status-tag rejected">
            <XCircle size={16} /> ✕ REJECTED
          </span>
        );
      default:
        return (
          <span className="status-tag pending">
            <Clock size={16} /> ◷ PENDING REVIEW
          </span>
        );
    }
  };

  const formattedDate = registration.createdAt
    ? new Date(registration.createdAt).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    : 'Recently';

  return (
    <div className="admin-modal-backdrop" role="dialog" aria-modal="true">
      <div className="admin-modal" style={{ maxWidth: '680px' }}>
        <div className="admin-modal-header">
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--admin-gray)', letterSpacing: '0.05em' }}>
              Application ID: {registration._id}
            </span>
            <h3 className="admin-modal-title" style={{ marginTop: '2px' }}>
              Registration Details
            </h3>
          </div>
          <button type="button" className="admin-modal-close" onClick={onClose} aria-label="Close dialog">
            <X size={20} />
          </button>
        </div>

        <div className="admin-modal-body">
          {/* Status Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid var(--admin-border)' }}>
            <div>
              <span style={{ fontSize: '0.8rem', color: 'var(--admin-gray)', display: 'block' }}>Current Status</span>
              <div style={{ marginTop: '4px' }}>{getStatusBadge(registration.status)}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--admin-gray)', display: 'block' }}>Submitted</span>
              <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--admin-dark-blue)' }}>{formattedDate}</span>
            </div>
          </div>

          {/* Student Info */}
          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ margin: '0 0 12px 0', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--admin-dark-blue)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <User size={16} /> Student Information
            </h4>
            <div className="details-grid">
              <div className="detail-item">
                <span className="detail-label">Full Name</span>
                <span className="detail-value highlight">{registration.name}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Roll Number</span>
                <span className="detail-value">{registration.rollNumber}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Official Email</span>
                <span className="detail-value">{registration.email}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Academic Semester</span>
                <span className="detail-value">{registration.semester}th Semester</span>
              </div>
            </div>
          </div>

          {/* Club Selection */}
          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ margin: '0 0 12px 0', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--admin-dark-blue)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Layers size={16} /> Applied Division
            </h4>
            <div className="details-grid">
              <div className="detail-item">
                <span className="detail-label">Selected Club</span>
                <span className="detail-value highlight">{registration.club} Club</span>
              </div>
            </div>
          </div>

          {/* Statement of Intent */}
          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ margin: '0 0 8px 0', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--admin-dark-blue)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <HelpCircle size={16} /> Why do you want to join?
            </h4>
            <div
              style={{
                padding: '14px 16px',
                background: '#F8FAFC',
                border: '1px solid var(--admin-border)',
                borderRadius: '8px',
                fontSize: '0.9rem',
                lineHeight: '1.5',
                color: '#334155'
              }}
            >
              "{registration.reason || 'No statement provided.'}"
            </div>
          </div>

          {/* Audit Trail if already reviewed */}
          {registration.reviewedAt && (
            <div style={{ padding: '12px 16px', background: '#F1F5F9', borderRadius: '8px', fontSize: '0.82rem', color: '#475569' }}>
              <strong>Audit Trail:</strong> Reviewed by <strong>{registration.reviewedBy || 'Admin'}</strong> on{' '}
              {new Date(registration.reviewedAt).toLocaleString('en-GB')}.
              {registration.rejectionReason && (
                <div style={{ marginTop: '4px', color: '#B91C1C' }}>
                  <strong>Reason:</strong> {registration.rejectionReason}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer with Actions */}
        <div className="admin-modal-footer">
          <button type="button" className="dash-btn dash-btn-secondary" onClick={onClose}>
            Close
          </button>
          {isPending && (
            <>
              <button
                type="button"
                className="btn-action-reject"
                style={{ padding: '8px 16px', fontSize: '0.9rem' }}
                onClick={() => {
                  onClose();
                  onOpenReject(registration);
                }}
              >
                Reject Application
              </button>
              <button
                type="button"
                className="btn-action-approve"
                style={{ padding: '8px 16px', fontSize: '0.9rem' }}
                onClick={() => {
                  onClose();
                  onOpenApprove(registration);
                }}
              >
                Approve Application
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
