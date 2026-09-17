/**
 * Student Authentication API Service
 * Interacts with /api/auth endpoints using HTTP-only cookies and central apiFetch.
 */

import { apiFetch } from './api';

export const authApi = {
  /**
   * Log in student with credentials
   * Calls POST /api/auth/login with credentials: 'include'
   */
  async login({ email, password }) {
    if (!email || !password) {
      throw new Error('Email and password are required.');
    }

    const response = await apiFetch('/api/auth/login', {
      method: 'POST',
      body: {
        email: email.trim(),
        password
      }
    });

    return {
      user: {
        ...response.data,
        applicationStatus: 'APPROVED'
      }
    };
  },

  /**
   * Get current session data from authoritative backend
   * Checks GET /api/auth/me with credentials: 'include'
   */
  async getCurrentUser() {
    try {
      const response = await apiFetch('/api/auth/me', {
        method: 'GET'
      });

      if (response.success && response.data) {
        return {
          user: {
            ...response.data,
            applicationStatus: 'APPROVED'
          }
        };
      }
      return null;
    } catch (err) {
      // 401 Unauthenticated or network failure is expected when logged out
      return null;
    }
  },

  /**
   * Log out and clear session cookie on server
   * Calls POST /api/auth/logout
   */
  async logout() {
    try {
      await apiFetch('/api/auth/logout', {
        method: 'POST'
      });
    } catch (_) {
      // Ignore errors on logout
    }
    return true;
  },

  /**
   * Change student password while authenticated
   * Calls POST /api/auth/change-password
   */
  async changePassword({ currentPassword, newPassword }) {
    if (!currentPassword || !newPassword) {
      throw new Error('Current password and new password are required.');
    }

    const response = await apiFetch('/api/auth/change-password', {
      method: 'POST',
      body: {
        currentPassword,
        newPassword
      }
    });

    return response;
  },

  /**
   * Request password reset instructions
   * Calls POST /api/auth/forgot-password
   */
  async forgotPassword(email) {
    if (!email) {
      throw new Error('Email address is required.');
    }

    const response = await apiFetch('/api/auth/forgot-password', {
      method: 'POST',
      body: {
        email: email.trim().toLowerCase()
      }
    });

    return response;
  },

  /**
   * Reset password using single-use token
   * Calls POST /api/auth/reset-password
   */
  async resetPassword({ token, newPassword }) {
    if (!token || !newPassword) {
      throw new Error('Reset token and new password are required.');
    }

    const response = await apiFetch('/api/auth/reset-password', {
      method: 'POST',
      body: {
        token: token.trim(),
        newPassword
      }
    });

    return response;
  }
};

export default authApi;
