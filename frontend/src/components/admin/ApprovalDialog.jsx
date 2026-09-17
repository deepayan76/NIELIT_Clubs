import React, { useState } from 'react';
import { ShieldCheck, X } from 'lucide-react';

export default function ApprovalDialog({ registration, isOpen, onClose, onConfirm }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !registration) return null;

  const handleConfirm = async () => {
    setIsSubmitting(true);
    try {
      await onConfirm(registration._id);
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
            <ShieldCheck size={22} style={{ color: '#047857' }} />
            <h3 className="admin-modal-title">Approve Application?</h3>
          </div>
          <button type="button" className="admin-modal-close" onClick={onClose} aria-label="Close dialog">
            <X size={20} />
          </button>
        </div>

        <div className="admin-modal-body">
          <p style={{ margin: '0 0 16px 0', fontSize: '0.95rem', lineHeight: '1.5', color: '#334155' }}>
            You are about to approve <strong>{registration.name}</strong> ({registration.rollNumber}) for the{' '}
            <strong>{registration.club} Club</strong>.
          </p>

          <div style={{ padding: '14px', background: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: '8px', color: '#065F46', fontSize: '0.88rem', lineHeight: '1.4' }}>
            ✓ The student account will immediately become <strong>ACTIVE</strong> with role <code>USER</code>.
            <br />
            ✓ An official registration approval email with login credentials will be triggered.
          </div>
        </div>

        <div className="admin-modal-footer">
          <button type="button" className="dash-btn dash-btn-secondary" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </button>
          <button
            type="button"
            className="dash-btn dash-btn-primary"
            style={{ background: '#047857', borderColor: '#047857' }}
            onClick={handleConfirm}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Approving...' : 'Confirm Approval'}
          </button>
        </div>
      </div>
    </div>
  );
}
