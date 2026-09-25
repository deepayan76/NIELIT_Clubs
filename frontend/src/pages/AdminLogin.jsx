import React, { useState } from 'react';
import { Mail, Lock, ShieldCheck, AlertCircle, ArrowLeft } from 'lucide-react';
import logoImg from '../assets/nexora-logo.png';
import { useAdminAuth } from '../context/AdminAuthContext';
import { navigate } from '../utils/router';
import '../styles/login.css';

export default function AdminLogin() {
  const { adminLogin, isLoading } = useAdminAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter your administrator email and password.');
      return;
    }

    try {
      await adminLogin({ email, password });
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.message || 'Invalid administrator credentials.');
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-card" style={{ maxWidth: '460px' }}>
        {/* Brand Header */}
        <div className="login-brand-header">
          <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }} aria-label="NEXORA Tech Clubs">
            <img src={logoImg} alt="NEXORA Tech Clubs" className="login-logo" />
          </a>
          <div className="login-motto-tag">LEARN. BUILD. LEAD.</div>
          <h1 className="login-title">Admin Portal</h1>
          <p className="login-subtitle">NEXORA Tech Clubs Administration</p>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="login-error-banner" role="alert" style={{ marginBottom: '16px' }}>
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-input-group">
            <label className="login-label" htmlFor="admin-email">
              Admin Email
            </label>
            <div className="login-input-wrapper">
              <Mail size={18} className="login-input-icon" aria-hidden="true" />
              <input
                id="admin-email"
                type="email"
                className="login-input"
                placeholder="admin@nexora.club.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </div>
          </div>

          <div className="login-input-group">
            <label className="login-label" htmlFor="admin-password">
              Security Password
            </label>
            <div className="login-input-wrapper">
              <Lock size={18} className="login-input-icon" aria-hidden="true" />
              <input
                id="admin-password"
                type="password"
                className="login-input"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="login-btn"
            disabled={isLoading}
          >
            {isLoading ? 'Verifying role...' : (
              <>
                <ShieldCheck size={18} /> Authenticate Admin Access
              </>
            )}
          </button>
        </form>

        {/* Return to Public Site */}
        <div className="login-footer-note" style={{ display: 'flex', justifyContent: 'center', marginTop: '24px' }}>
          <button
            type="button"
            className="login-link-muted"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            onClick={() => navigate('/')}
          >
            <ArrowLeft size={14} /> Return to Public Website
          </button>
        </div>
      </div>
    </div>
  );
}
