import React, { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { navigate } from '../../utils/router';
import { ShieldAlert, RefreshCw } from 'lucide-react';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isLoading, isAuthenticated]);

  if (isLoading) {
    return (
      <div className="locked-dashboard-container">
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <div className="avatar-circle" style={{ margin: '0 auto 16px auto', animation: 'spin 1s linear infinite' }}>
            <RefreshCw size={20} />
          </div>
          <p style={{ color: 'var(--dash-gray)', fontSize: '0.95rem' }}>Verifying student authentication...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="locked-dashboard-container">
        <div className="locked-card">
          <div className="locked-icon-wrapper rejected">
            <ShieldAlert size={32} />
          </div>
          <h2 className="locked-title">Authentication Required</h2>
          <p className="locked-description">Please log in with your student credentials to access the student dashboard.</p>
          <button type="button" className="dash-btn dash-btn-primary" onClick={() => navigate('/login')}>
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
