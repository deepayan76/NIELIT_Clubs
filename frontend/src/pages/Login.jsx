import React, { useState } from 'react';
import { Mail, Lock, LogIn, AlertCircle, ArrowRight } from 'lucide-react';
import logoImg from '../assets/nexora-logo.png';
import { useAuth } from '../context/AuthContext';
import { navigate } from '../utils/router';
import '../styles/login.css';

export default function Login() {
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    try {
      await login({ email, password });
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Invalid email or password.');
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-card">
        {/* Brand Header */}
        <div className="login-brand-header">
          <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }} aria-label="NEXORA Tech Clubs">
            <img src={logoImg} alt="NEXORA Tech Clubs" className="login-logo" />
          </a>
          <div className="login-motto-tag">LEARN. BUILD. LEAD.</div>
          <h1 className="login-title">Student Portal</h1>
          <p className="login-subtitle">Sign in to manage your NEXORA Tech Clubs membership</p>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="login-error-banner" role="alert">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-input-group">
            <label className="login-label" htmlFor="email-input">
              Email Address
            </label>
            <div className="login-input-wrapper">
              <Mail size={18} className="login-input-icon" aria-hidden="true" />
              <input
                id="email-input"
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

          <div className="login-input-group">
            <label className="login-label" htmlFor="password-input">
              Password
            </label>
            <div className="login-input-wrapper">
              <Lock size={18} className="login-input-icon" aria-hidden="true" />
              <input
                id="password-input"
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
            {isLoading ? 'Signing in...' : (
              <>
                <LogIn size={18} /> Sign In
              </>
            )}
          </button>

          <div className="login-links-row">
            <button
              type="button"
              className="login-link-muted"
              onClick={() => navigate('/forgot-password')}
            >
              Forgot Password?
            </button>
          </div>
        </form>

        {/* Registration Footnote */}
        <div className="login-footer-note">
          Don't have an approved account?{' '}
          <a
            href="/#register"
            className="login-register-link"
            onClick={(e) => {
              e.preventDefault();
              navigate('/#register');
            }}
          >
            Complete registration first <ArrowRight size={12} style={{ display: 'inline' }} />
          </a>
        </div>
      </div>
    </div>
  );
}
