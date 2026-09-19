import React, { useState } from 'react';
import { UserX, AlertTriangle, X } from 'lucide-react';

export default function TerminateStudentDialog({ student, isOpen, onClose, onConfirm }) {
  const [reason, setReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen || !student) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      await onConfirm(student._id, reason.trim());
      setReason('');
      onClose();
    } catch (err) {
      console.error('Termination error:', err);
      setError(err.message || 'Failed to terminate student account.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="admin-modal-backdrop" role="dialog" aria-modal="true">
      <div className="admin-modal" style={{ maxWidth: '540px' }}>
        <div className="admin-modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <UserX size={22} style={{ color: '#DC2626' }} />
            <h3 className="admin-modal-title">Terminate Student Account?</h3>
          </div>
          <button
            type="button"
            className="admin-modal-close"
            onClick={onClose}
            aria-label="Close dialog"
            disabled={isSubmitting}
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="admin-modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {error && (
              <div
                style={{
                  padding: '10px 14px',
                  backgroundColor: '#FEF2F2',
                  border: '1px solid #FECACA',
                  borderRadius: '6px',
                  color: '#B91C1C',
                  fontSize: '0.88rem'
                }}
              >
                {error}
              </div>
            )}

            <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: '1.5', color: '#334155' }}>
              You are about to terminate the student account for <strong>{student.name}</strong>.
            </p>

            {/* Target Student Summary */}
            <div
              style={{
                backgroundColor: '#F8FAFC',
                border: '1px solid #E2E8F0',
                borderRadius: '8px',
                padding: '14px 18px',
                fontSize: '0.88rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748B' }}>Roll Number:</span>
                <span style={{ fontWeight: 600, color: 'var(--admin-dark-blue)' }}>{student.rollNumber}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748B' }}>Official Email:</span>
                <span style={{ fontWeight: 600, color: '#334155' }}>{student.email}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748B' }}>Club Chapter:</span>
                <span style={{ fontWeight: 600, color: 'var(--admin-dark-blue)' }}>{student.club} Club</span>
              </div>
            </div>

            {/* Security Warning Box */}
            <div
              style={{
                padding: '12px 16px',
                backgroundColor: '#FEF2F2',
                border: '1px solid #FECACA',
                borderRadius: '8px',
                color: '#991B1B',
                fontSize: '0.88rem',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px'
              }}
            >
              <AlertTriangle size={18} style={{ color: '#DC2626', flexShrink: 0, marginTop: '2px' }} />
              <div>
                This will immediately disable the student&apos;s account, revoke their active login sessions, and prevent future dashboard access. Historical records will remain saved for administrative audit.
              </div>
            </div>

            {/* Termination Reason Field */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--admin-dark-blue)' }}>
                Reason <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 400 }}>(Optional, maximum 500 characters)</span>
              </label>
              <textarea
                rows={3}
                className="admin-search-input"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  fontFamily: 'inherit',
                  resize: 'vertical'
                }}
                placeholder="e.g. Violation of club guidelines, student requested account closure, or administrative action..."
                value={reason}
                maxLength={500}
                onChange={(e) => setReason(e.target.value)}
              />
              <div style={{ textAlign: 'right', fontSize: '0.75rem', color: '#94A3B8' }}>
                {reason.length}/500
              </div>
            </div>
          </div>

          <div className="admin-modal-footer">
            <button
              type="button"
              className="dash-btn dash-btn-secondary"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="dash-btn dash-btn-primary"
              style={{ backgroundColor: '#DC2626', borderColor: '#DC2626' }}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Terminating...' : 'Terminate Account'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
