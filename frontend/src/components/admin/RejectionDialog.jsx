import React, { useState } from 'react';
import { AlertTriangle, X } from 'lucide-react';

export default function RejectionDialog({ registration, isOpen, onClose, onConfirm }) {
  const [reason, setReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !registration) return null;

  const handleConfirm = async () => {
    setIsSubmitting(true);
    try {
      await onConfirm(registration._id, reason);
      setReason('');
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="admin-modal-backdrop" role="dialog" aria-modal="true">
      <div className="admin-modal">
        <div className="admin-modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AlertTriangle size={22} style={{ color: '#DC2626' }} />
            <h3 className="admin-modal-title">Reject Application?</h3>
          </div>
          <button type="button" className="admin-modal-close" onClick={onClose} aria-label="Close dialog">
            <X size={20} />
          </button>
        </div>

        <div className="admin-modal-body">
          <p style={{ margin: '0 0 16px 0', fontSize: '0.95rem', lineHeight: '1.5', color: '#334155' }}>
            Are you sure you want to reject the application for <strong>{registration.name}</strong> ({registration.rollNumber})?
          </p>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--admin-dark-blue)', marginBottom: '6px' }}>
              Reason for Rejection (Optional)
            </label>
            <textarea
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: '6px',
                border: '1px solid var(--admin-border)',
                fontSize: '0.88rem',
                minHeight: '80px',
                fontFamily: 'inherit',
                boxSizing: 'border-box'
              }}
              placeholder="e.g. Incomplete statement of purpose or invalid semester eligibility."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>

          <div style={{ padding: '12px', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '8px', color: '#991B1B', fontSize: '0.85rem' }}>
            ✕ The student will remain locked out of club features and receive a status notification.
          </div>
        </div>

        <div className="admin-modal-footer">
          <button type="button" className="dash-btn dash-btn-secondary" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </button>
          <button
            type="button"
            className="dash-btn dash-btn-primary"
            style={{ background: '#DC2626', borderColor: '#DC2626' }}
            onClick={handleConfirm}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Rejecting...' : 'Confirm Rejection'}
          </button>
        </div>
      </div>
    </div>
  );
}
