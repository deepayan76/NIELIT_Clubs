import React, { useState, useRef, useEffect } from 'react';
import { Bell, Menu, Settings, LogOut, ChevronDown, ShieldCheck } from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { navigate } from '../../utils/router';

export default function AdminHeader({ title, onToggleMobileMenu }) {
  const { adminUser, unreadAdminCount, adminLogout } = useAdminAuth();
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setProfileOpen(false);
    await adminLogout();
    navigate('/admin/login');
  };

  return (
    <header className="admin-header">
      <div className="header-left">
        <button
          type="button"
          className="mobile-menu-btn"
          onClick={onToggleMobileMenu}
          aria-label="Toggle navigation menu"
        >
          <Menu size={22} />
        </button>
        <h1 className="header-page-title">{title}</h1>
      </div>

      <div className="header-right">
        {/* Admin Role Badge */}
        <span className="admin-header-badge">
          <ShieldCheck size={13} /> ADMIN
        </span>

        {/* Notification Bell */}
        <button
          type="button"
          className="notif-trigger-btn"
          onClick={() => navigate('/admin/notifications')}
          aria-label={`Admin Notifications ${unreadAdminCount > 0 ? `(${unreadAdminCount} unread)` : ''}`}
        >
          <Bell size={18} />
          {unreadAdminCount > 0 && <span className="notif-badge-dot" />}
        </button>

        {/* Admin Profile Dropdown */}
        <div className="header-user-profile" ref={profileRef}>
          <button
            type="button"
            className="header-user-btn"
            onClick={() => setProfileOpen(!profileOpen)}
            aria-expanded={profileOpen}
            aria-label="Admin account menu"
          >
            <div className="avatar-circle">
              ADM
            </div>
            <div className="user-info-snippet">
              <span className="user-name-label">{adminUser?.name?.replace(/NIELIT\s*/gi, '').replace(/NEXORA\s*/gi, '').trim() || 'Club Administrator'}</span>
              <span className="user-role-label">{adminUser?.designation || 'Club Director'}</span>
            </div>
            <ChevronDown size={14} className="text-gray-400" />
          </button>

          {profileOpen && (
            <div className="user-profile-menu" role="menu">
              <div className="profile-menu-header">
                Signed in as <strong>{adminUser?.email}</strong>
              </div>

              <button
                type="button"
                className="profile-menu-item"
                role="menuitem"
                onClick={() => {
                  setProfileOpen(false);
                  navigate('/admin/settings');
                }}
              >
                <Settings size={16} /> Admin Settings
              </button>

              <button
                type="button"
                className="profile-menu-item logout"
                role="menuitem"
                onClick={handleLogout}
              >
                <LogOut size={16} /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
