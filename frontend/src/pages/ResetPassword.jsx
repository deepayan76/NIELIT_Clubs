import React, { useState, useEffect } from 'react';
import { Lock, CheckCircle2, AlertCircle, ArrowRight, KeyRound, Eye, EyeOff } from 'lucide-react';
import logoImg from '../assets/logo.png';
import { authApi } from '../services/authApi';
import { navigate, useRouter } from '../utils/router';
import '../styles/login.css';

export default function ResetPassword() {
  const { search, hash } = useRouter();
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Extract reset token from search query or hash
  useEffect(() => {
    let extractedToken = '';

    // Check window.location.search (?token=...)
    if (window.location.search) {
      const params = new URLSearchParams(window.location.search);
      extractedToken = params.get('token') || '';
    }

    // Fallback: Check hash query parameters (#/reset-password?token=...)
    if (!extractedToken && window.location.hash && window.location.hash.includes('token=')) {
      const hashPart = window.location.hash.split('?')[1];
      if (hashPart) {
        const hashParams = new URLSearchParams(hashPart);
        extractedToken = hashParams.get('token') || '';
      }
    }

    setToken(extractedToken);
  }, [search, hash]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!token) {
      setErrorMessage('Missing password reset token. Please use the link provided in your reset email.');
      return;
    }

    if (newPassword.length < 8) {
      setErrorMessage('Password must be at least 8 characters long.');
      return;
    }

    if (!/[A-Z]/.test(newPassword)) {
      setErrorMessage('Password must contain at least one uppercase letter (A-Z).');
      return;
    }

    if (!/[a-z]/.test(newPassword)) {
      setErrorMessage('Password must contain at least one lowercase letter (a-z).');
      return;
    }

    if (!/[0-9]/.test(newPassword)) {
      setErrorMessage('Password must contain at least one number (0-9).');
      return;
    }

    if (/\s/.test(newPassword)) {
      setErrorMessage('Password cannot contain spaces.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    setIsSubmitting(true);
    try {
      await authApi.resetPassword({ token, newPassword });
      setSuccess(true);
    } catch (err) {
      setErrorMessage(err.message || 'Invalid or expired reset token. Please request a new link.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-card">
        {/* Brand Header */}
        <div className="login-brand-header">
          <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>
            <img src={logoImg} alt="NIELIT Logo" className="login-logo" />
          </a>
          <h1 className="login-title">Choose New Password</h1>
          <p className="login-subtitle">
            Create a secure password with at least 8 characters, an uppercase letter, and a number.
          </p>
        </div>

        {/* Missing Token Warning */}
        {!token && !success && (
          <div className="login-error-banner" role="alert" style={{ marginBottom: '16px' }}>
            <AlertCircle size={16} style={{ flexShrink: 0 }} />
            <span>No reset token detected in URL. Please click the link received in your email.</span>
          </div>
        )}

        {/* Error Banner */}
        {errorMessage && (
          <div className="login-error-banner" role="alert" style={{ marginBottom: '16px' }}>
            <AlertCircle size={16} style={{ flexShrink: 0 }} />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Success Banner */}
        {success ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="login-success-banner" role="status">
              <CheckCircle2 size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong>Password Reset Successfully!</strong>
                <p style={{ margin: '4px 0 0 0', fontSize: '0.84rem' }}>
                  Your password has been updated. You can now log in with your new credentials.
                </p>
              </div>
            </div>

            <button
              type="button"
              className="login-btn"
              onClick={() => navigate('/login')}
              style={{ marginTop: '12px' }}
            >
              Proceed to Sign In <ArrowRight size={16} />
            </button>
          </div>
        ) : (
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="login-input-group">
              <label className="login-label" htmlFor="reset-new-password">
                New Password
              </label>
              <div className="login-input-wrapper">
                <Lock size={18} className="login-input-icon" aria-hidden="true" />
                <input
                  id="reset-new-password"
                  type={showPassword ? 'text' : 'password'}
                  className="login-input"
                  placeholder="Min 8 chars, 1 uppercase, 1 number"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  autoComplete="new-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    background: 'none',
                    border: 'none',
                    color: '#94A3B8',
                    cursor: 'pointer',
                    padding: '2px'
                  }}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="login-input-group">
              <label className="login-label" htmlFor="reset-confirm-password">
                Confirm New Password
              </label>
              <div className="login-input-wrapper">
                <Lock size={18} className="login-input-icon" aria-hidden="true" />
                <input
                  id="reset-confirm-password"
                  type={showPassword ? 'text' : 'password'}
                  className="login-input"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  autoComplete="new-password"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="login-btn"
              disabled={isSubmitting || !token}
            >
              {isSubmitting ? (
                'Updating Password...'
              ) : (
                <>
                  <KeyRound size={18} /> Update Password
                </>
              )}
            </button>
          </form>
        )}

        {/* Footer Link */}
        <div className="login-footer-note" style={{ marginTop: '24px' }}>
          <a
            href="/login"
            className="login-register-link"
            onClick={(e) => {
              e.preventDefault();
              navigate('/login');
            }}
          >
            Cancel and Return to Sign In
          </a>
        </div>
      </div>
    </div>
  );
}
