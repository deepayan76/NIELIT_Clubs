import React from 'react';
import {
  LayoutDashboard,
  User,
  FileText,
  Layers,
  BookMarked,
  Settings,
  LogOut,
  GraduationCap
} from 'lucide-react';
import logoImg from '../../assets/logoiconWhite.png';
import { navigate } from '../../utils/router';
import { useAuth } from '../../context/AuthContext';

export default function DashboardSidebar({ activeRoute, isOpen, onClose }) {
  const { logout } = useAuth();

  const navItems = [
    {
      id: 'home',
      label: 'Dashboard',
      route: '/dashboard',
      icon: LayoutDashboard
    },
    {
      id: 'profile',
      label: 'My Profile',
      route: '/dashboard/profile',
      icon: User
    },
    {
      id: 'application',
      label: 'Application',
      route: '/dashboard/application',
      icon: FileText
    },
    {
      id: 'club',
      label: 'My Club',
      route: '/dashboard/club',
      icon: Layers
    },
    {
      id: 'resources',
      label: 'Resources',
      route: '/dashboard/resources',
      icon: BookMarked
    },
    {
      id: 'settings',
      label: 'Settings',
      route: '/dashboard/settings',
      icon: Settings
    }
  ];

  const handleNav = (route) => {
    if (onClose) onClose();
    navigate(route);
  };

  const handleLogout = async () => {
    if (onClose) onClose();
    await logout();
    navigate('/login');
  };

  return (
    <>
      {/* Mobile Drawer Backdrop */}
      <div
        className={`sidebar-backdrop ${isOpen ? 'mobile-open' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside className={`dashboard-sidebar ${isOpen ? 'mobile-open' : ''}`}>
        {/* Brand Header */}
        <a
          href="/dashboard"
          className="sidebar-brand"
          onClick={(e) => {
            e.preventDefault();
            handleNav('/dashboard');
          }}
          aria-label="NEXORA Tech Clubs Student Portal"
        >
          <img src={logoImg} alt="NEXORA Logo" className="sidebar-brand-logo" />
          <div className="sidebar-brand-text">
            <span className="sidebar-brand-title">NEXORA TECH CLUBS</span>
            <span className="sidebar-brand-subtitle">
              <GraduationCap size={11} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '3px' }} />
              Student Portal
            </span>
          </div>
        </a>

        {/* Navigation links */}
        <nav className="sidebar-nav" aria-label="Dashboard Sidebar Navigation">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeRoute === item.id;
            return (
              <button
                key={item.id}
                type="button"
                className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
                onClick={() => handleNav(item.route)}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon aria-hidden="true" />
                <span>{item.label}</span>
              </button>
            );
          })}

          <div className="sidebar-divider" />
        </nav>

        {/* Sidebar Footer / Logout */}
        <div className="sidebar-footer">
          <button
            type="button"
            className="sidebar-logout-btn"
            onClick={handleLogout}
            aria-label="Log out of student portal"
          >
            <LogOut size={16} aria-hidden="true" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
