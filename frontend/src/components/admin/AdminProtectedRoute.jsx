import React, { useEffect } from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { navigate } from '../../utils/router';
import { ShieldAlert, LogIn, RefreshCw } from 'lucide-react';

export default function AdminProtectedRoute({ children }) {
  const { isAdminAuthenticated, isLoading } = useAdminAuth();

  useEffect(() => {
    if (!isLoading && !isAdminAuthenticated) {
      navigate('/admin/login');
    }
  }, [isLoading, isAdminAuthenticated]);

  if (isLoading) {
    return (
      <div className="locked-dashboard-container">
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <div className="avatar-circle" style={{ margin: '0 auto 16px auto', animation: 'spin 1s linear infinite', background: '#16364A' }}>
            <RefreshCw size={20} />
          </div>
          <p style={{ color: 'var(--admin-gray)', fontSize: '0.95rem' }}>Verifying administrator authentication...</p>
        </div>
      </div>
    );
  }

  if (!isAdminAuthenticated) {
    return (
      <div className="locked-dashboard-container">
        <div className="locked-card" role="alert">
          <div className="locked-icon-wrapper rejected">
            <ShieldAlert size={32} />
          </div>
          <h2 className="locked-title">Admin Access Restricted</h2>
          <p className="locked-description">
            This area requires authorized NIELIT Administrator credentials. Please sign in with an administrative account to proceed.
          </p>
          <button
            type="button"
            className="dash-btn dash-btn-primary"
            onClick={() => navigate('/admin/login')}
          >
            <LogIn size={16} /> Go to Admin Login
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
