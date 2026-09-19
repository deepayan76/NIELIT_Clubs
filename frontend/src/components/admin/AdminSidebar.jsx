import React from 'react';
import {
  LayoutDashboard,
  FileCheck2,
  Users,
  Layers,
  BookMarked,
  Bell,
  Settings,
  LogOut,
  ShieldAlert
} from 'lucide-react';
import logoImg from '../../assets/logo.png';
import { navigate } from '../../utils/router';
import { useAdminAuth } from '../../context/AdminAuthContext';

export default function AdminSidebar({ activeRoute, isOpen, onClose }) {
  const { adminLogout, unreadAdminCount } = useAdminAuth();

  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      route: '/admin/dashboard',
      icon: LayoutDashboard
    },
    {
      id: 'registrations',
      label: 'Registrations',
      route: '/admin/registrations',
      icon: FileCheck2
    },
    {
      id: 'students',
      label: 'Students',
      route: '/admin/students',
      icon: Users
    },
    {
      id: 'clubs',
      label: 'Clubs',
      route: '/admin/clubs',
      icon: Layers
    },
    {
      id: 'resources',
      label: 'Resources',
      route: '/admin/resources',
      icon: BookMarked
    },
    {
      id: 'notifications',
      label: 'Notifications',
      route: '/admin/notifications',
      icon: Bell,
      badge: unreadAdminCount > 0 ? unreadAdminCount : null
    },
    {
      id: 'settings',
      label: 'Settings',
      route: '/admin/settings',
      icon: Settings
    }
  ];

  const handleNav = (route) => {
    if (onClose) onClose();
    navigate(route);
  };

  const handleLogout = async () => {
    if (onClose) onClose();
    await adminLogout();
    navigate('/admin/login');
  };

  return (
    <>
      <div
        className={`sidebar-backdrop ${isOpen ? 'mobile-open' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside className={`admin-sidebar ${isOpen ? 'mobile-open' : ''}`}>
        <a
          href="/admin/dashboard"
          className="admin-sidebar-brand"
          onClick={(e) => {
            e.preventDefault();
            handleNav('/admin/dashboard');
          }}
        >
          <img src={logoImg} alt="NIELIT Logo" className="admin-brand-logo" />
          <div className="admin-brand-text">
            <span className="admin-brand-title">NIELIT TECH CLUBS</span>
            <span className="admin-brand-badge">
              <ShieldAlert size={12} /> Admin Portal
            </span>
          </div>
        </a>

        <nav className="admin-sidebar-nav" aria-label="Admin Navigation">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeRoute === item.id;
            return (
              <button
                key={item.id}
                type="button"
                className={`admin-nav-item ${isActive ? 'active' : ''}`}
                onClick={() => handleNav(item.route)}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon size={18} aria-hidden="true" />
                <span style={{ flex: 1 }}>{item.label}</span>
                {item.badge && (
                  <span
                    style={{
                      background: '#EF4444',
                      color: '#FFF',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      padding: '1px 6px',
                      borderRadius: '999px'
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="sidebar-divider" />
        </nav>

        <div className="admin-sidebar-footer">
          <button
            type="button"
            className="sidebar-logout-btn"
            onClick={handleLogout}
            aria-label="Log out of admin portal"
          >
            <LogOut size={18} aria-hidden="true" />
            <span>Admin Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
