import React from 'react';
import { useAuth } from '../../context/AuthContext';
import UserAvatar from '../../components/dashboard/UserAvatar';
import { Shield, Lock, CheckCircle2 } from 'lucide-react';

export default function Profile() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div>
      <div className="dash-welcome-banner">
        <h2 className="dash-welcome-title">My Profile</h2>
        <p className="dash-welcome-subtitle">View your registered student credentials and club membership</p>
      </div>

      {/* Main Profile Card */}
      <div className="editorial-card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '28px', flexWrap: 'wrap' }}>
          <UserAvatar name={user.name} size="large" />
          <div>
            <h3 style={{ margin: '0 0 4px 0', fontSize: '1.4rem', color: 'var(--dash-dark-blue)' }}>
              {user.name}
            </h3>
            <p style={{ margin: '0 0 8px 0', color: 'var(--dash-gray)', fontSize: '0.9rem' }}>
              Roll No: <strong>{user.rollNumber}</strong> • Semester {user.semester}
            </p>
            <span className="status-tag approved" style={{ fontSize: '0.78rem', padding: '4px 10px' }}>
              <CheckCircle2 size={14} /> Account Status: {user.accountStatus || 'Active'}
            </span>
          </div>
        </div>

        <div className="sidebar-divider" style={{ background: '#E2E8F0', margin: '0 0 24px 0' }} />

        <h4 className="profile-section-title">
          <Shield size={18} /> Student Details
        </h4>

        <div className="details-grid">
          <div className="detail-item">
            <span className="detail-label">
              Full Name <span className="read-only-badge"><Lock size={10} /> Read Only</span>
            </span>
            <span className="detail-value highlight">{user.name}</span>
          </div>

          <div className="detail-item">
            <span className="detail-label">
              Roll / Registration Number <span className="read-only-badge"><Lock size={10} /> Read Only</span>
            </span>
            <span className="detail-value">{user.rollNumber}</span>
          </div>

          <div className="detail-item">
            <span className="detail-label">
              Official Email <span className="read-only-badge"><Lock size={10} /> Read Only</span>
            </span>
            <span className="detail-value">{user.email}</span>
          </div>

          <div className="detail-item">
            <span className="detail-label">
              Academic Semester <span className="read-only-badge"><Lock size={10} /> Read Only</span>
            </span>
            <span className="detail-value">{user.semester}th Semester</span>
          </div>

          <div className="detail-item">
            <span className="detail-label">
              Assigned Club <span className="read-only-badge"><Lock size={10} /> Read Only</span>
            </span>
            <span className="detail-value highlight">{user.club} Club</span>
          </div>

          <div className="detail-item">
            <span className="detail-label">
              Access Role <span className="read-only-badge"><Lock size={10} /> Read Only</span>
            </span>
            <span className="detail-value">Student ({user.role})</span>
          </div>

          <div className="detail-item">
            <span className="detail-label">
              Account Status <span className="read-only-badge"><Lock size={10} /> Read Only</span>
            </span>
            <span className="detail-value" style={{ color: '#047857', fontWeight: 600 }}>
              {user.accountStatus}
            </span>
          </div>

          <div className="detail-item">
            <span className="detail-label">
              Application Status <span className="read-only-badge"><Lock size={10} /> Read Only</span>
            </span>
            <span className="detail-value highlight">{user.applicationStatus}</span>
          </div>
        </div>
      </div>

      {/* Security notice */}
      <div className="editorial-card" style={{ background: '#F8FAFC', borderStyle: 'dashed' }}>
        <p style={{ margin: 0, fontSize: '0.86rem', color: 'var(--dash-gray)', lineHeight: '1.5' }}>
          <strong>Notice:</strong> Institutional student identity records, enrollment roles, and club assignments are verified by the NIELIT administration and cannot be modified directly from this portal. If any detail is incorrect, please contact your club coordinator.
        </p>
      </div>
    </div>
  );
}
