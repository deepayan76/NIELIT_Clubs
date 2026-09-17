import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Lock, Shield, Info, LogOut, CheckCircle2, AlertTriangle, AlertCircle, KeyRound, Eye, EyeOff } from 'lucide-react';
import { navigate } from '../../utils/router';

export default function SettingsPage() {
  const { user, logout, changePassword, mustChangePassword } = useAuth();
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [dashNotifs, setDashNotifs] = useState(true);

  // Password change state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [passwordError, setPasswordError] = useState('');

  if (!user) return null;

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError('Please fill in all password fields.');
      return;
    }

    if (newPassword.length < 8) {
      setPasswordError('New password must be at least 8 characters long.');
      return;
    }

    if (!/[A-Z]/.test(newPassword)) {
      setPasswordError('New password must contain at least one uppercase letter (A-Z).');
      return;
    }

    if (!/[a-z]/.test(newPassword)) {
      setPasswordError('New password must contain at least one lowercase letter (a-z).');
      return;
    }

    if (!/[0-9]/.test(newPassword)) {
      setPasswordError('New password must contain at least one number (0-9).');
      return;
    }

    if (/\s/.test(newPassword)) {
      setPasswordError('New password cannot contain spaces.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('New password and confirmation do not match.');
      return;
    }

    if (currentPassword === newPassword) {
      setPasswordError('New password must be different from your current password.');
      return;
    }

    setIsChangingPassword(true);
    try {
      await changePassword({ currentPassword, newPassword });
      setPasswordSuccess('Password successfully updated! Your credentials have been secured.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setPasswordError(err.message || 'Failed to update password. Please check your current password.');
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleLogoutAll = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div>
      <div className="dash-welcome-banner">
        <h2 className="dash-welcome-title">Portal Settings & Security</h2>
        <p className="dash-welcome-subtitle">Manage your account credentials, notifications, and security preferences</p>
      </div>

      {/* Must Change Password Alert Banner */}
      {mustChangePassword && !passwordSuccess && (
        <div
          style={{
            backgroundColor: '#FFFBEB',
            border: '1px solid #FDE68A',
            borderRadius: '10px',
            padding: '16px 20px',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px',
            color: '#92400E'
          }}
          role="alert"
        >
          <AlertTriangle size={20} style={{ color: '#D97706', flexShrink: 0, marginTop: '2px' }} />
          <div>
            <strong style={{ fontSize: '0.95rem', display: 'block', marginBottom: '4px' }}>
              Action Required: Temporary Password Detected
            </strong>
            <span style={{ fontSize: '0.88rem', lineHeight: '1.5' }}>
              You are currently using the temporary password generated upon admission approval. For your security, please choose a permanent custom password below.
            </span>
          </div>
        </div>
      )}

      {/* Account Info */}
      <div className="editorial-card">
        <div className="editorial-card-header">
          <h3 className="editorial-card-title">Account Identity</h3>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--dash-dark-blue)', textTransform: 'uppercase' }}>
            Registered Student Email
          </label>
          <input
            type="email"
            style={{
              width: '100%',
              maxWidth: '400px',
              padding: '10px 14px',
              border: '1px solid #CBD5E1',
              borderRadius: '8px',
              backgroundColor: '#F8FAFC',
              color: '#334155',
              fontSize: '0.92rem'
            }}
            value={user.email}
            disabled
          />
          <span style={{ fontSize: '0.78rem', color: 'var(--dash-gray)' }}>
            Verified institutional email address assigned to your NIELIT student account.
          </span>
        </div>
      </div>

      {/* Change Password Card */}
      <div className="editorial-card">
        <div className="editorial-card-header">
          <h3 className="editorial-card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <KeyRound size={18} color="var(--dash-dark-blue)" /> Change Password
          </h3>
        </div>

        {/* Success Alert */}
        {passwordSuccess && (
          <div
            style={{
              backgroundColor: '#F0FDF4',
              border: '1px solid #BBF7D0',
              borderRadius: '8px',
              padding: '12px 16px',
              color: '#166534',
              fontSize: '0.88rem',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '18px'
            }}
            role="status"
          >
            <CheckCircle2 size={18} style={{ flexShrink: 0 }} />
            <span>{passwordSuccess}</span>
          </div>
        )}

        {/* Error Alert */}
        {passwordError && (
          <div
            style={{
              backgroundColor: '#FEF2F2',
              border: '1px solid #FECACA',
              borderRadius: '8px',
              padding: '12px 16px',
              color: '#B91C1C',
              fontSize: '0.88rem',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '18px'
            }}
            role="alert"
          >
            <AlertCircle size={18} style={{ flexShrink: 0 }} />
            <span>{passwordError}</span>
          </div>
        )}

        <form onSubmit={handlePasswordSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '440px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#16364A' }}>
              Current Password
            </label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <input
                type={showCurrent ? 'text' : 'password'}
                style={{
                  width: '100%',
                  padding: '10px 40px 10px 14px',
                  border: '1px solid #CBD5E1',
                  borderRadius: '8px',
                  fontSize: '0.92rem'
                }}
                placeholder="Enter current or temporary password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  background: 'none',
                  border: 'none',
                  color: '#94A3B8',
                  cursor: 'pointer'
                }}
                aria-label={showCurrent ? 'Hide password' : 'Show password'}
              >
                {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#16364A' }}>
              New Password
            </label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <input
                type={showNew ? 'text' : 'password'}
                style={{
                  width: '100%',
                  padding: '10px 40px 10px 14px',
                  border: '1px solid #CBD5E1',
                  borderRadius: '8px',
                  fontSize: '0.92rem'
                }}
                placeholder="Min 8 chars, 1 uppercase, 1 number"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                autoComplete="new-password"
                required
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  background: 'none',
                  border: 'none',
                  color: '#94A3B8',
                  cursor: 'pointer'
                }}
                aria-label={showNew ? 'Hide password' : 'Show password'}
              >
                {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            <span style={{ fontSize: '0.75rem', color: '#64748B' }}>
              Must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number.
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#16364A' }}>
              Confirm New Password
            </label>
            <input
              type={showNew ? 'text' : 'password'}
              style={{
                width: '100%',
                padding: '10px 14px',
                border: '1px solid #CBD5E1',
                borderRadius: '8px',
                fontSize: '0.92rem'
              }}
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
              required
            />
          </div>

          <button
            type="submit"
            className="dash-btn dash-btn-primary"
            style={{ marginTop: '8px', width: 'fit-content' }}
            disabled={isChangingPassword}
          >
            {isChangingPassword ? 'Updating Password...' : 'Save New Password'}
          </button>
        </form>
      </div>

      {/* Notification Preferences */}
      <div className="editorial-card">
        <div className="editorial-card-header">
          <h3 className="editorial-card-title">Notification Preferences</h3>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #F1F5F9' }}>
          <div>
            <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--dash-dark-blue)' }}>
              Email Notifications
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--dash-gray)' }}>
              Receive updates regarding club meetings and application notices via email.
            </div>
          </div>
          <input
            type="checkbox"
            checked={emailNotifs}
            onChange={(e) => setEmailNotifs(e.target.checked)}
            style={{ width: '18px', height: '18px', cursor: 'pointer' }}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0' }}>
          <div>
            <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--dash-dark-blue)' }}>
              Dashboard Alerts
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--dash-gray)' }}>
              Show unread notification badges in the top navigation bar.
            </div>
          </div>
          <input
            type="checkbox"
            checked={dashNotifs}
            onChange={(e) => setDashNotifs(e.target.checked)}
            style={{ width: '18px', height: '18px', cursor: 'pointer' }}
          />
        </div>
      </div>

      {/* Session Management */}
      <div className="editorial-card">
        <div className="editorial-card-header">
          <h3 className="editorial-card-title">Session Management</h3>
        </div>

        <div>
          <p style={{ margin: '0 0 14px 0', fontSize: '0.85rem', color: 'var(--dash-gray)' }}>
            Safely log out from this device and end your active authenticated student session.
          </p>
          <button
            type="button"
            className="dash-btn dash-btn-secondary"
            style={{ color: '#DC2626', borderColor: '#FECACA', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            onClick={handleLogoutAll}
          >
            <LogOut size={15} /> Sign Out of Student Portal
          </button>
        </div>
      </div>
    </div>
  );
}
