import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { userApi } from '../../services/userApi';
import { UserCheck, Layers, HelpCircle, CheckCircle2, Clock, XCircle, RefreshCw } from 'lucide-react';

export default function ApplicationPage() {
  const { user } = useAuth();
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadApplication() {
      try {
        const app = await userApi.getApplication();
        setApplication(app);
      } catch (err) {
        console.error('Error loading application record:', err);
      } finally {
        setLoading(false);
      }
    }
    loadApplication();
  }, []);

  if (!user) return null;

  const status = application?.status || user.applicationStatus || 'APPROVED';

  const getStatusBadge = (st) => {
    switch (st) {
      case 'APPROVED':
        return (
          <span className="status-tag approved">
            <CheckCircle2 size={16} /> ✓ APPROVED
          </span>
        );
      case 'REJECTED':
        return (
          <span className="status-tag rejected">
            <XCircle size={16} /> ✕ APPLICATION NOT APPROVED
          </span>
        );
      default:
        return (
          <span className="status-tag pending">
            <Clock size={16} /> ◷ UNDER REVIEW
          </span>
        );
    }
  };

  const formattedDate = application?.submittedAt
    ? new Date(application.submittedAt).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })
    : user.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })
    : '17 September 2026';

  return (
    <div>
      <div className="dash-welcome-banner">
        <h2 className="dash-welcome-title">Application Record</h2>
        <p className="dash-welcome-subtitle">Complete registration application submitted to NIELIT Tech Clubs</p>
      </div>

      {loading ? (
        <div className="editorial-card" style={{ textAlign: 'center', padding: '40px' }}>
          <RefreshCw size={24} style={{ animation: 'spin 1s linear infinite', margin: '0 auto 12px auto' }} />
          <p style={{ margin: 0, color: 'var(--dash-gray)' }}>Loading official application record...</p>
        </div>
      ) : (
        <div className="editorial-card">
          {/* Header with status */}
          <div className="editorial-card-header">
            <div>
              <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', color: 'var(--dash-gray)', fontWeight: 700, letterSpacing: '0.05em' }}>
                Application ID: {application?._id || user.registrationId || user._id || 'NLT-APP-2026'}
              </span>
              <h3 className="editorial-card-title" style={{ marginTop: '2px' }}>
                Club Membership Application
              </h3>
            </div>
            <div>{getStatusBadge(status)}</div>
          </div>

          {/* Section 1: Personal Information */}
          <div style={{ marginBottom: '28px' }}>
            <h4 className="profile-section-title">
              <UserCheck size={18} /> Personal Information
            </h4>
            <div className="details-grid">
              <div className="detail-item">
                <span className="detail-label">Full Name</span>
                <span className="detail-value highlight">{application?.name || user.name}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Roll Number</span>
                <span className="detail-value">{application?.rollNumber || user.rollNumber}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Email</span>
                <span className="detail-value">{application?.email || user.email}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Current Semester</span>
                <span className="detail-value">{application?.semester || user.semester}th Semester</span>
              </div>
            </div>
          </div>

          <div className="sidebar-divider" style={{ background: '#E2E8F0', margin: '24px 0' }} />

          {/* Section 2: Club Selection */}
          <div style={{ marginBottom: '28px' }}>
            <h4 className="profile-section-title">
              <Layers size={18} /> Club Selection
            </h4>
            <div className="details-grid">
              <div className="detail-item">
                <span className="detail-label">Chosen Technical Club</span>
                <span className="detail-value highlight">{application?.club || user.club} Club</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Submission Date</span>
                <span className="detail-value">{formattedDate}</span>
              </div>
            </div>
          </div>

          <div className="sidebar-divider" style={{ background: '#E2E8F0', margin: '24px 0' }} />

          {/* Section 3: Statement of Intent */}
          <div style={{ marginBottom: '16px' }}>
            <h4 className="profile-section-title">
              <HelpCircle size={18} /> Why I Want to Join
            </h4>
            <div
              style={{
                padding: '16px 20px',
                backgroundColor: '#F8FAFC',
                border: '1px solid #E2E8F0',
                borderRadius: '8px',
                fontSize: '0.95rem',
                lineHeight: '1.6',
                color: '#334155'
              }}
            >
              {application?.reason ? `"${application.reason}"` : 'No statement recorded for this application.'}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
