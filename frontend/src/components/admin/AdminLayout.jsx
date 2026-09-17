import React, { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import AdminProtectedRoute from './AdminProtectedRoute';
import '../../styles/admin.css';

export default function AdminLayout({ title, activeRoute, children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="admin-app">
      {/* Admin Sidebar */}
      <AdminSidebar
        activeRoute={activeRoute}
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      {/* Main Admin Wrapper */}
      <div className="admin-main-wrapper">
        <AdminHeader
          title={title}
          onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
        />

        <main className="admin-content">
          <AdminProtectedRoute>
            {children}
          </AdminProtectedRoute>
        </main>
      </div>
    </div>
  );
}
