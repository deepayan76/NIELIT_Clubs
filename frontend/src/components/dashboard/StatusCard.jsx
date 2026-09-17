import React from 'react';
import { CheckCircle2, Clock, XCircle } from 'lucide-react';

export default function StatusCard({ status, clubName, submittedDate }) {
  const normalizedStatus = (status || 'PENDING').toUpperCase();

  if (normalizedStatus === 'APPROVED') {
    return (
      <div className="status-card approved" role="region" aria-label="Application Status: Approved">
        <div className="status-card-header">
          <div className="status-label-section">
            <span className="status-category-eyebrow">Application Status</span>
            <span className="status-tag approved">
              <CheckCircle2 size={16} aria-hidden="true" /> ✓ APPROVED
            </span>
          </div>
        </div>
        <p className="status-message">
          Your application has been approved. Welcome to the official NIELIT Tech Clubs student community!
        </p>
        <div className="status-meta-row">
          <div className="status-meta-item">
            <span className="status-meta-label">Club</span>
            <span className="status-meta-value">{clubName || 'Programming Club'}</span>
          </div>
          <div className="status-meta-item">
            <span className="status-meta-label">Submitted</span>
            <span className="status-meta-value">{submittedDate || '17 Sep 2026'}</span>
          </div>
        </div>
      </div>
    );
  }

  if (normalizedStatus === 'REJECTED') {
    return (
      <div className="status-card rejected" role="region" aria-label="Application Status: Not Approved">
        <div className="status-card-header">
          <div className="status-label-section">
            <span className="status-category-eyebrow">Application Status</span>
            <span className="status-tag rejected">
              <XCircle size={16} aria-hidden="true" /> ✕ APPLICATION NOT APPROVED
            </span>
          </div>
        </div>
        <p className="status-message">
          Your application was not approved. If appropriate, contact the club administration for further information.
        </p>
        <div className="status-meta-row">
          <div className="status-meta-item">
            <span className="status-meta-label">Club Applied</span>
            <span className="status-meta-value">{clubName || 'Tech Club'}</span>
          </div>
          <div className="status-meta-item">
            <span className="status-meta-label">Submitted</span>
            <span className="status-meta-value">{submittedDate || '17 Sep 2026'}</span>
          </div>
        </div>
      </div>
    );
  }

  // Fallback / PENDING
  return (
    <div className="status-card pending" role="region" aria-label="Application Status: Pending Review">
      <div className="status-card-header">
        <div className="status-label-section">
          <span className="status-category-eyebrow">Application Status</span>
          <span className="status-tag pending">
            <Clock size={16} aria-hidden="true" /> ◷ PENDING
          </span>
        </div>
      </div>
      <p className="status-message">
        Your registration has been received and is currently under review by the club administration.
        You'll receive an email when your application is reviewed.
      </p>
      <div className="status-meta-row">
        <div className="status-meta-item">
          <span className="status-meta-label">Club Applied</span>
          <span className="status-meta-value">{clubName || 'Tech Club'}</span>
        </div>
        <div className="status-meta-item">
          <span className="status-meta-label">Submitted</span>
          <span className="status-meta-value">{submittedDate || '17 Sep 2026'}</span>
        </div>
      </div>
    </div>
  );
}
