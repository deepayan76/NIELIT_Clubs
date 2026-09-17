import React, { useState } from 'react';
import { Mail, ArrowLeft, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import logoImg from '../assets/logo.png';
import { authApi } from '../services/authApi';
import { navigate } from '../utils/router';
import '../styles/login.css';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!email || !email.trim()) {
      setErrorMessage('Please enter your registered institutional email address.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await authApi.forgotPassword(email.trim());
      setSuccessMessage(
        res.message ||
          'If an account exists for this email, password reset instructions have been sent. Please check your inbox.'
      );
    } catch (err) {
      setErrorMessage(err.message || 'Failed to request password reset. Please try again.');
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
          <h1 className="login-title">Reset Your Password</h1>
          <p className="login-subtitle">
            Enter your student email and we'll send you a single-use link to reset your credentials.
          </p>
        </div>

        {/* Success Banner */}
        {successMessage && (
          <div className="login-success-banner" role="status">
            <CheckCircle2 size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Error Banner */}
        {errorMessage && (
          <div className="login-error-banner" role="alert">
            <AlertCircle size={16} />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Form */}
        {!successMessage ? (
          <form className="login-form" onSubmit={handleSubmit} style={{ marginTop: '16px' }}>
            <div className="login-input-group">
              <label className="login-label" htmlFor="forgot-email-input">
                Registered Student Email
              </label>
              <div className="login-input-wrapper">
                <Mail size={18} className="login-input-icon" aria-hidden="true" />
                <input
                  id="forgot-email-input"
                  type="email"
                  className="login-input"
                  placeholder="student@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            <button type="submit" className="login-btn" disabled={isSubmitting}>
              {isSubmitting ? (
                'Sending Link...'
              ) : (
                <>
                  <Send size={18} /> Send Reset Instructions
                </>
              )}
            </button>
          </form>
        ) : (
          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <p style={{ fontSize: '0.86rem', color: '#64748B', lineHeight: '1.5' }}>
              The reset link will remain active for 20 minutes. If you don't receive an email, make sure your account is approved and check your spam folder.
            </p>
          </div>
        )}

        {/* Back Link */}
        <div className="login-footer-note" style={{ marginTop: '24px' }}>
          <a
            href="/login"
            className="login-register-link"
            onClick={(e) => {
              e.preventDefault();
              navigate('/login');
            }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            <ArrowLeft size={14} /> Back to Sign In
          </a>
        </div>
      </div>
    </div>
  );
}
