import React from 'react';
import { Bell, Check, CheckCheck, Clock, ShieldCheck, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function NotificationPanel({ isOpen, onClose }) {
  const { notifications, markNotificationRead, markAllNotificationsRead } = useAuth();

  if (!isOpen) return null;

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <ShieldCheck size={18} className="text-emerald-600" />;
      case 'warning':
        return <Clock size={18} className="text-amber-600" />;
      case 'error':
        return <AlertCircle size={18} className="text-red-600" />;
      default:
        return <Bell size={18} />;
    }
  };

  return (
    <div className="notification-popover" role="dialog" aria-label="Notifications Panel">
      <div className="notif-popover-header">
        <h4 className="notif-popover-title">Notifications</h4>
        {notifications.some((n) => !n.read) && (
          <button
            type="button"
            className="notif-mark-all-btn"
            onClick={markAllNotificationsRead}
          >
            Mark all as read
          </button>
        )}
      </div>

      <ul className="notif-list">
        {notifications.length === 0 ? (
          <li className="notif-empty-state">No new notifications</li>
        ) : (
          notifications.map((notif) => (
            <li
              key={notif.id}
              className={`notif-item ${!notif.read ? 'unread' : ''}`}
              onClick={() => markNotificationRead(notif.id)}
            >
              <div className="notif-icon-col">{getIcon(notif.type)}</div>
              <div className="notif-content">
                <div className="notif-item-title">{notif.title}</div>
                <div className="notif-item-desc">{notif.message}</div>
                <div className="notif-item-time">{notif.time}</div>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
