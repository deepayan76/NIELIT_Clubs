import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { adminApi } from '../services/adminApi';

const AdminAuthContext = createContext(null);

export function AdminAuthProvider({ children }) {
  const [adminUser, setAdminUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [adminNotifications, setAdminNotifications] = useState([]);

  // Restore Authoritative Admin Session
  useEffect(() => {
    async function initAdminAuth() {
      try {
        const session = await adminApi.getCurrentAdmin();
        if (session && session.admin && session.admin.role === 'ADMIN') {
          setAdminUser(session.admin);
          const notifs = await adminApi.getAdminNotifications();
          setAdminNotifications(notifs);
        } else {
          setAdminUser(null);
        }
      } catch (err) {
        console.error('Failed to restore admin auth session:', err);
        setAdminUser(null);
      } finally {
        setIsLoading(false);
      }
    }
    initAdminAuth();
  }, []);

  const refreshAdminNotifications = useCallback(async () => {
    try {
      const notifs = await adminApi.getAdminNotifications();
      setAdminNotifications(notifs);
    } catch (e) {
      console.error('Failed to reload admin notifications:', e);
    }
  }, []);

  const adminLogin = useCallback(async ({ email, password }) => {
    setIsLoading(true);
    try {
      const session = await adminApi.login({ email, password });
      setAdminUser(session.admin);
      await refreshAdminNotifications();
      return session.admin;
    } finally {
      setIsLoading(false);
    }
  }, [refreshAdminNotifications]);

  const adminLogout = useCallback(async () => {
    setIsLoading(true);
    try {
      await adminApi.logout();
      setAdminUser(null);
      setAdminNotifications([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const markAdminNotificationRead = useCallback((id) => {
    setAdminNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }, []);

  const markAllAdminNotificationsRead = useCallback(() => {
    setAdminNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const isAdminAuthenticated = !!adminUser && adminUser.role === 'ADMIN';
  const unreadAdminCount = adminNotifications.filter((n) => !n.read).length;

  const value = {
    adminUser,
    isAdminAuthenticated,
    isLoading,
    adminNotifications,
    unreadAdminCount,
    adminLogin,
    adminLogout,
    refreshAdminNotifications,
    markAdminNotificationRead,
    markAllAdminNotificationsRead
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
}

export default AdminAuthContext;
