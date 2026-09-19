import React, { useState } from 'react';
import { Trash2, AlertTriangle, X } from 'lucide-react';

export default function ResourceDeleteDialog({ resource, isOpen, onClose, onConfirm }) {
  const [isDeleting, setIsDeleting] = useState(false);

  if (!isOpen || !resource) return null;

  const handleConfirm = async () => {
    setIsDeleting(true);
    try {
      await onConfirm(resource._id);
      onClose();
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="admin-modal-backdrop" role="dialog" aria-modal="true">
      <div className="admin-modal" style={{ maxWidth: '520px' }}>
        <div className="admin-modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Trash2 size={20} style={{ color: '#DC2626' }} />
            <h3 className="admin-modal-title">Delete Resource?</h3>
          </div>
          <button
            type="button"
            className="admin-modal-close"
            onClick={onClose}
            aria-label="Close dialog"
            disabled={isDeleting}
          >
            <X size={20} />
          </button>
        </div>

        <div className="admin-modal-body">
          <p style={{ margin: '0 0 16px 0', fontSize: '0.95rem', lineHeight: '1.5', color: '#334155' }}>
            Are you sure you want to permanently delete <strong>&quot;{resource.title}&quot;</strong>?
          </p>

          <div
            style={{
              padding: '12px 16px',
              background: '#FEF2F2',
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
              This action cannot be undone. The resource will be permanently removed from the club repository and will no longer be visible to students.
            </div>
          </div>
        </div>

        <div className="admin-modal-footer">
          <button
            type="button"
            className="dash-btn dash-btn-secondary"
            onClick={onClose}
            disabled={isDeleting}
          >
            Cancel
          </button>
          <button
            type="button"
            className="dash-btn dash-btn-primary"
            style={{ backgroundColor: '#DC2626', borderColor: '#DC2626' }}
            onClick={handleConfirm}
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Delete Permanently'}
          </button>
        </div>
      </div>
    </div>
  );
}
