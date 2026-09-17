import React, { useState, useRef, useEffect } from 'react';
import { Bell, Menu, User, Settings, LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { navigate } from '../../utils/router';
import UserAvatar from './UserAvatar';
import NotificationPanel from './NotificationPanel';

export default function DashboardHeader({ title, onToggleMobileMenu }) {
  const { user, unreadCount, logout } = useAuth();
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const notifRef = useRef(null);
  const profileRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setNotifOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setProfileMenuOpen(false);
    await logout();
    navigate('/login');
  };

  return (
    <header className="dashboard-header">
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
        {/* Notifications */}
        <div ref={notifRef} style={{ position: 'relative' }}>
          <button
            type="button"
            className="notif-trigger-btn"
            onClick={() => setNotifOpen(!notifOpen)}
            aria-expanded={notifOpen}
            aria-label={`Notifications ${unreadCount > 0 ? `(${unreadCount} unread)` : ''}`}
          >
            <Bell size={18} />
            {unreadCount > 0 && <span className="notif-badge-dot" />}
          </button>
          <NotificationPanel isOpen={notifOpen} onClose={() => setNotifOpen(false)} />
        </div>

        {/* User Profile dropdown */}
        <div className="header-user-profile" ref={profileRef}>
          <button
            type="button"
            className="header-user-btn"
            onClick={() => setProfileMenuOpen(!profileMenuOpen)}
            aria-expanded={profileMenuOpen}
            aria-label="User account menu"
          >
            <UserAvatar name={user?.name} />
            <div className="user-info-snippet">
              <span className="user-name-label">{user?.name || 'Student'}</span>
              <span className="user-role-label">{user?.club ? `${user.club} Club` : 'Student'}</span>
            </div>
            <ChevronDown size={14} className="text-gray-400" />
          </button>

          {profileMenuOpen && (
            <div className="user-profile-menu" role="menu">
              <div className="profile-menu-header">
                Signed in as <strong>{user?.email}</strong>
              </div>

              <button
                type="button"
                className="profile-menu-item"
                role="menuitem"
                onClick={() => {
                  setProfileMenuOpen(false);
                  navigate('/dashboard/profile');
                }}
              >
                <User size={16} /> My Profile
              </button>

              <button
                type="button"
                className="profile-menu-item"
                role="menuitem"
                onClick={() => {
                  setProfileMenuOpen(false);
                  navigate('/dashboard/settings');
                }}
              >
                <Settings size={16} /> Settings
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
