import React, { useState } from 'react';
import DashboardSidebar from './DashboardSidebar';
import DashboardHeader from './DashboardHeader';
import ProtectedRoute from './ProtectedRoute';
import '../../styles/dashboard.css';

export default function DashboardLayout({ title, activeRoute, children, allowPending = false }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="dashboard-app">
      {/* Sidebar Navigation */}
      <DashboardSidebar
        activeRoute={activeRoute}
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      {/* Main Content Area */}
      <div className="dashboard-main-wrapper">
        <DashboardHeader
          title={title}
          onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
        />

        <main className="dashboard-content">
          <ProtectedRoute allowPending={allowPending}>
            {children}
          </ProtectedRoute>
        </main>
      </div>
    </div>
  );
}
