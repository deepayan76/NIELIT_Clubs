import React from 'react';
import { ArrowRight } from 'lucide-react';
import { navigate } from '../../utils/router';

export default function ApplicationOverview({ user, submittedDate }) {
  if (!user) return null;

  return (
    <div className="editorial-card" role="region" aria-label="Application Summary">
      <div className="editorial-card-header">
        <h3 className="editorial-card-title">Your Application</h3>
        <button
          type="button"
          className="editorial-card-action"
          onClick={() => navigate('/dashboard/application')}
        >
          View Full Application <ArrowRight size={16} aria-hidden="true" />
        </button>
      </div>

      <div className="details-grid">
        <div className="detail-item">
          <span className="detail-label">Name</span>
          <span className="detail-value highlight">{user.name}</span>
        </div>

        <div className="detail-item">
          <span className="detail-label">Roll Number</span>
          <span className="detail-value">{user.rollNumber}</span>
        </div>

        <div className="detail-item">
          <span className="detail-label">Email</span>
          <span className="detail-value">{user.email}</span>
        </div>

        <div className="detail-item">
          <span className="detail-label">Semester</span>
          <span className="detail-value">{user.semester}</span>
        </div>

        <div className="detail-item">
          <span className="detail-label">Club</span>
          <span className="detail-value highlight">{user.club} Club</span>
        </div>

        <div className="detail-item">
          <span className="detail-label">Status</span>
          <span className="detail-value highlight">{user.applicationStatus}</span>
        </div>

        <div className="detail-item">
          <span className="detail-label">Submitted</span>
          <span className="detail-value">{submittedDate || '17 Sep 2026'}</span>
        </div>
      </div>
    </div>
  );
}
