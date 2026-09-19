/**
 * Admin API Service
 * Interacts with /api/admin/* and /api/admin/auth/* endpoints using HTTP-only cookies and central apiFetch.
 */

import { apiFetch } from './api';
import { clubs as officialClubs } from '../data/clubs';

export const adminApi = {
  /**
   * Admin Login Authentication
   * Calls POST /api/admin/auth/login
   */
  async login({ email, password }) {
    if (!email || !password) {
      throw new Error('Administrator email and password are required.');
    }

    const response = await apiFetch('/api/admin/auth/login', {
      method: 'POST',
      body: {
        email: email.trim(),
        password
      }
    });

    return {
      admin: response.admin || {
        _id: 'adm_root',
        name: 'NIELIT Club Administrator',
        email: email.trim(),
        role: 'ADMIN',
        accountStatus: 'ACTIVE'
      }
    };
  },

  /**
   * Get Current Admin Session
   * Checks GET /api/admin/auth/me
   */
  async getCurrentAdmin() {
    try {
      const response = await apiFetch('/api/admin/auth/me', {
        method: 'GET'
      });

      if (response.success && response.data) {
        return {
          admin: {
            _id: 'adm_root',
            name: response.data.name || 'NIELIT Club Administrator',
            email: response.data.email,
            role: 'ADMIN',
            accountStatus: 'ACTIVE'
          }
        };
      }
      return null;
    } catch (_) {
      return null;
    }
  },

  /**
   * Admin Logout
   * Calls POST /api/admin/auth/logout
   */
  async logout() {
    try {
      await apiFetch('/api/admin/auth/logout', {
        method: 'POST'
      });
    } catch (_) {}
    return true;
  },

  /**
   * Get dynamic statistics for admin dashboard
   * Calls GET /api/admin/registrations/stats
   */
  async getDashboardStats() {
    const response = await apiFetch('/api/admin/registrations/stats', {
      method: 'GET'
    });
    return response.data || { total: 0, pending: 0, approved: 0, rejected: 0, byClub: {} };
  },

  /**
   * Get paginated, searchable, filterable registrations
   * Calls GET /api/admin/registrations?...
   */
  async getRegistrations({ search = '', club = 'ALL', semester = 'ALL', status = 'ALL', page = 1, limit = 10 } = {}) {
    const params = new URLSearchParams();
    if (page) params.set('page', page);
    if (limit) params.set('limit', limit);
    if (status && status !== 'ALL') params.set('status', status);
    if (club && club !== 'ALL') params.set('club', club);
    if (semester && semester !== 'ALL') params.set('semester', semester);
    if (search && search.trim()) params.set('search', search.trim());

    const response = await apiFetch(`/api/admin/registrations?${params.toString()}`, {
      method: 'GET'
    });

    return {
      registrations: response.data || [],
      total: response.pagination?.total ?? (response.data?.length || 0),
      page: response.pagination?.page ?? page,
      limit: response.pagination?.limit ?? limit,
      totalPages: response.pagination?.pages ?? 1
    };
  },

  /**
   * Get single registration details by ID
   * Calls GET /api/admin/registrations/:id
   */
  async getRegistrationById(id) {
    const response = await apiFetch(`/api/admin/registrations/${id}`, {
      method: 'GET'
    });
    return response.data;
  },

  /**
   * Approve a registration request
   * Calls PATCH /api/admin/registrations/:id/approve
   */
  async approveRegistration(id) {
    const response = await apiFetch(`/api/admin/registrations/${id}/approve`, {
      method: 'PATCH'
    });
    return response.data || { status: 'APPROVED' };
  },

  /**
   * Reject a registration request
   * Calls PATCH /api/admin/registrations/:id/reject
   */
  async rejectRegistration(id, reason = '') {
    const response = await apiFetch(`/api/admin/registrations/${id}/reject`, {
      method: 'PATCH',
      body: { reason }
    });
    return response.data || { status: 'REJECTED' };
  },

  /**
   * Get enrolled students directory
   * Calls GET /api/admin/students?...
   */
  async getStudents({ search = '', club = 'ALL', semester = 'ALL' } = {}) {
    const params = new URLSearchParams();
    if (club && club !== 'ALL') params.set('club', club);
    if (semester && semester !== 'ALL') params.set('semester', semester);
    if (search && search.trim()) params.set('search', search.trim());

    const response = await apiFetch(`/api/admin/students?${params.toString()}`, {
      method: 'GET'
    });

    return response.data || [];
  },

  /**
   * Terminate/deactivate student account
   * Calls PATCH /api/admin/students/:id/terminate
   */
  async terminateStudent(id, reason = '') {
    const response = await apiFetch(`/api/admin/students/${id}/terminate`, {
      method: 'PATCH',
      body: { reason }
    });
    return response;
  },

  /**
   * Get official clubs metadata and live member counts
   */
  async getClubsWithStats() {
    try {
      const stats = await this.getDashboardStats();
      const byClub = stats.byClub || {};

      return [
        {
          id: 'ai',
          name: 'AI Club',
          tagline: 'Explore the Future of Intelligence',
          description: 'Explore Artificial Intelligence and Machine Learning through hands-on projects, experiments, and real-world applications.',
          accentColor: '#8B5CF6',
          approvedCount: byClub.AI || 0,
          pendingCount: 0
        },
        {
          id: 'programming',
          name: 'Programming Club',
          tagline: 'Think. Code. Solve.',
          description: 'Sharpen your coding skills, solve problems, build software, and turn ideas into working projects.',
          accentColor: '#2563EB',
          approvedCount: byClub.Programming || 0,
          pendingCount: 0
        },
        {
          id: 'cybersecurity',
          name: 'Cybersecurity Club',
          tagline: 'Defend, Secure, and Master the Digital Realm',
          description: 'Learn to identify, understand, and defend against cyber threats through ethical hacking, security challenges, and practical learning.',
          accentColor: '#10B981',
          approvedCount: byClub.Cybersecurity || 0,
          pendingCount: 0
        },
        {
          id: 'iot',
          name: 'IoT Club',
          tagline: 'Connected Systems. Smart Devices. Real-World Tech.',
          description: 'Connect the physical and digital worlds by building smart systems with sensors, embedded devices, and connected technologies.',
          accentColor: '#F97316',
          approvedCount: byClub.IoT || 0,
          pendingCount: 0
        }
      ];
    } catch (_) {
      return [
        {
          id: 'ai',
          name: 'AI Club',
          tagline: 'Explore the Future of Intelligence',
          description: 'Explore Artificial Intelligence and Machine Learning.',
          accentColor: '#8B5CF6',
          approvedCount: 0,
          pendingCount: 0
        },
        {
          id: 'programming',
          name: 'Programming Club',
          tagline: 'Think. Code. Solve.',
          description: 'Sharpen your coding skills, solve problems, build software.',
          accentColor: '#2563EB',
          approvedCount: 0,
          pendingCount: 0
        },
        {
          id: 'cybersecurity',
          name: 'Cybersecurity Club',
          tagline: 'Defend, Secure, and Master the Digital Realm',
          description: 'Learn to identify and defend against cyber threats.',
          accentColor: '#10B981',
          approvedCount: 0,
          pendingCount: 0
        },
        {
          id: 'iot',
          name: 'IoT Club',
          tagline: 'Connected Systems. Smart Devices. Real-World Tech.',
          description: 'Connect the physical and digital worlds by building smart systems.',
          accentColor: '#F97316',
          approvedCount: 0,
          pendingCount: 0
        }
      ];
    }
  },

  /**
   * Get administrative notifications for new registrations
   * Calls GET /api/admin/notifications
   */
  async getAdminNotifications() {
    try {
      const response = await apiFetch('/api/admin/notifications', {
        method: 'GET'
      });
      return response.data || [];
    } catch (_) {
      return [];
    }
  }
};

export default adminApi;
