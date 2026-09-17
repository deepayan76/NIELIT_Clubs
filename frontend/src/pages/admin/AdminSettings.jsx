import React, { useState } from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { ShieldCheck, Lock, Bell, Check, Info, LogOut } from 'lucide-react';
import { navigate } from '../../utils/router';

export default function AdminSettings() {
  const { adminUser, adminLogout } = useAdminAuth();
  const [newRegNotif, setNewRegNotif] = useState(true);
  const [approvalAlert, setApprovalAlert] = useState(true);

  if (!adminUser) return null;

  const handleLogoutAll = async () => {
    await adminLogout();
    navigate('/admin/login');
  };

  return (
    <div>
      <div className="dash-welcome-banner">
        <h2 className="dash-welcome-title">Admin Configuration</h2>
        <p className="dash-welcome-subtitle">
          Manage administrator account settings, notification preferences, and security access.
        </p>
      </div>

      {/* Account Info */}
      <div className="editorial-card">
        <div className="editorial-card-header">
          <h3 className="editorial-card-title">Administrator Profile</h3>
        </div>

        <div className="details-grid">
          <div className="detail-item">
            <span className="detail-label">Admin Name</span>
            <span className="detail-value highlight">{adminUser.name}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Designation</span>
            <span className="detail-value">{adminUser.designation || 'Club Director'}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Official Email</span>
            <span className="detail-value">{adminUser.email}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Access Level</span>
            <span className="detail-value" style={{ color: '#0369A1', fontWeight: 600 }}>
              Master Administrator ({adminUser.role})
            </span>
          </div>
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="editorial-card">
        <div className="editorial-card-header">
          <h3 className="editorial-card-title">Notification Channels</h3>
        </div>

        <div className="settings-toggle-row">
          <div>
            <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--admin-dark-blue)' }}>
              New Registration Alerts
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--admin-gray)' }}>
              Receive instant dashboard notifications when students submit joining requests.
            </div>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={newRegNotif}
              onChange={(e) => setNewRegNotif(e.target.checked)}
            />
            <span className="toggle-slider" />
          </label>
        </div>

        <div className="settings-toggle-row">
          <div>
            <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--admin-dark-blue)' }}>
              Approval Confirmation Logs
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--admin-gray)' }}>
              Log audit records whenever an application is approved or rejected.
            </div>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={approvalAlert}
              onChange={(e) => setApprovalAlert(e.target.checked)}
            />
            <span className="toggle-slider" />
          </label>
        </div>
      </div>

      {/* Security & Credentials Policy */}
      <div className="editorial-card">
        <div className="editorial-card-header">
          <h3 className="editorial-card-title">Security & System Access</h3>
        </div>

        <div
          style={{
            padding: '14px 18px',
            backgroundColor: '#F8FAFC',
            border: '1px solid #E2E8F0',
            borderRadius: '8px',
            fontSize: '0.88rem',
            color: '#334155',
            lineHeight: '1.5',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '10px'
          }}
        >
          <Info size={18} style={{ color: '#0284C7', marginTop: '2px', flexShrink: 0 }} />
          <div>
            <strong>Administrator Access Policy:</strong> Master administrator credentials and security hashes are securely configured in the server environment. To rotate administrative credentials or update system keys, modify the backend server environment configuration.
          </div>
        </div>

        <div className="sidebar-divider" style={{ background: '#E2E8F0', margin: '24px 0' }} />

        <div>
          <h4 style={{ margin: '0 0 8px 0', fontSize: '0.95rem', color: '#DC2626' }}>
            Session Termination
          </h4>
          <p style={{ margin: '0 0 14px 0', fontSize: '0.85rem', color: 'var(--admin-gray)' }}>
            Terminate the current administrative session and clear security cookies.
          </p>
          <button
            type="button"
            className="dash-btn dash-btn-secondary"
            style={{ color: '#DC2626', borderColor: '#FECACA', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            onClick={handleLogoutAll}
          >
            <LogOut size={15} /> Sign Out of Admin Portal
          </button>
        </div>
      </div>
    </div>
  );
}
