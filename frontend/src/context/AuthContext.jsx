import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authApi } from '../services/authApi';
import { notificationApi } from '../services/notificationApi';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);

  // Load authoritative session on startup
  useEffect(() => {
    async function initAuth() {
      try {
        const session = await authApi.getCurrentUser();
        if (session && session.user) {
          setUser(session.user);
          const notifs = await notificationApi.getNotifications();
          setNotifications(notifs);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error('Failed to restore student auth session:', err);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    }
    initAuth();
  }, []);

  // Fetch notifications when user changes
  const reloadNotifications = useCallback(async () => {
    try {
      const list = await notificationApi.getNotifications();
      setNotifications(list);
    } catch (e) {
      console.error('Error fetching student notifications:', e);
    }
  }, []);

  const login = useCallback(async ({ email, password }) => {
    setIsLoading(true);
    try {
      const session = await authApi.login({ email, password });
      setUser(session.user);
      await reloadNotifications();
      return session.user;
    } finally {
      setIsLoading(false);
    }
  }, [reloadNotifications]);

  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      await authApi.logout();
      setUser(null);
      setNotifications([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const markNotificationRead = useCallback((id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }, []);

  const markAllNotificationsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const changePassword = useCallback(async ({ currentPassword, newPassword }) => {
    const res = await authApi.changePassword({ currentPassword, newPassword });
    setUser((prev) => (prev ? { ...prev, mustChangePassword: false } : prev));
    return res;
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;
  const isAuthenticated = !!user;
  const isApproved = user?.accountStatus === 'ACTIVE';
  const mustChangePassword = user?.mustChangePassword === true;

  const value = {
    user,
    isLoading,
    isAuthenticated,
    isApproved,
    mustChangePassword,
    notifications,
    unreadCount,
    login,
    logout,
    changePassword,
    setUser,
    markNotificationRead,
    markAllNotificationsRead,
    reloadNotifications
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
