/**
 * Student Notification API Service
 * Interacts with /api/student/notifications endpoint.
 */

import { apiFetch } from './api';

export const notificationApi = {
  /**
   * Get notifications for authenticated student
   * Calls GET /api/student/notifications
   */
  async getNotifications() {
    try {
      const response = await apiFetch('/api/student/notifications', {
        method: 'GET'
      });
      return response.data || [];
    } catch (_) {
      return [];
    }
  },

  /**
   * Mark single notification as read
   */
  async markAsRead(id, currentList = []) {
    return currentList.map((item) => (item.id === id ? { ...item, read: true } : item));
  },

  /**
   * Mark all notifications as read
   */
  async markAllAsRead(currentList = []) {
    return currentList.map((item) => ({ ...item, read: true }));
  }
};

export default notificationApi;
