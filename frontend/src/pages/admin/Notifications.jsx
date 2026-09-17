import React from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { Bell, Clock, FileText, CheckCircle2, ArrowRight } from 'lucide-react';
import { navigate } from '../../utils/router';

export default function Notifications() {
  const { adminNotifications, markAdminNotificationRead, markAllAdminNotificationsRead } = useAdminAuth();

  return (
    <div>
      <div className="dash-welcome-banner">
        <h2 className="dash-welcome-title">System & Registration Notifications</h2>
        <p className="dash-welcome-subtitle">
          Real-time event log for new student submissions and membership status updates.
        </p>
      </div>

      <div className="admin-table-card">
        <div className="admin-table-header-bar">
          <h3 className="admin-table-title">Activity Feed</h3>
          {adminNotifications.some((n) => !n.read) && (
            <button
              type="button"
              className="dash-btn dash-btn-secondary"
              style={{ fontSize: '0.82rem', padding: '6px 12px' }}
              onClick={markAllAdminNotificationsRead}
            >
              Mark all as read
            </button>
          )}
        </div>

        <ul className="notif-list" style={{ maxHeight: 'none' }}>
          {adminNotifications.length === 0 ? (
            <li className="notif-empty-state">No active notifications.</li>
          ) : (
            adminNotifications.map((n) => (
              <li
                key={n.id}
                className={`notif-item ${!n.read ? 'unread' : ''}`}
                style={{ padding: '18px 24px' }}
                onClick={() => markAdminNotificationRead(n.id)}
              >
                <div className="notif-icon-col" style={{ marginTop: '2px' }}>
                  <Bell size={20} style={{ color: 'var(--admin-dark-blue)' }} />
                </div>
                <div className="notif-content">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <h4 className="notif-item-title" style={{ fontSize: '0.95rem' }}>{n.title}</h4>
                    <span className="notif-item-time">{n.time}</span>
                  </div>
                  <p className="notif-item-desc" style={{ fontSize: '0.88rem', margin: '4px 0 10px 0' }}>{n.message}</p>
                  <div>
                    <button
                      type="button"
                      className="btn-action-view"
                      onClick={(e) => {
                        e.stopPropagation();
                        markAdminNotificationRead(n.id);
                        navigate('/admin/registrations');
                      }}
                    >
                      View in Registrations <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
