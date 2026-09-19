import { api } from './api';

/**
 * Frontend Resource API Service
 * Interacts with /api/resources (Student/Public) and /api/admin/resources (Admin)
 */
export const resourceApi = {
  /**
   * Fetch published resources for students with optional search & filters
   * @param {Object} params - { club, type, search, page, limit }
   */
  async getPublishedResources(params = {}) {
    const query = new URLSearchParams();
    if (params.club && params.club !== 'ALL') query.append('club', params.club);
    if (params.type && params.type !== 'ALL') query.append('type', params.type);
    if (params.search && params.search.trim()) query.append('search', params.search.trim());
    if (params.page) query.append('page', params.page);
    if (params.limit) query.append('limit', params.limit);

    const qs = query.toString();
    const endpoint = `/api/resources${qs ? `?${qs}` : ''}`;
    return await api.get(endpoint);
  },

  /**
   * Fetch single published resource by ID
   * @param {string} id
   */
  async getPublishedResourceById(id) {
    return await api.get(`/api/resources/${id}`);
  },

  /**
   * Fetch all resources (published + drafts) for Admin
   * @param {Object} params - { club, type, status, search, page, limit }
   */
  async getAdminResources(params = {}) {
    const query = new URLSearchParams();
    if (params.club && params.club !== 'ALL') query.append('club', params.club);
    if (params.type && params.type !== 'ALL') query.append('type', params.type);
    if (params.status && params.status !== 'ALL') query.append('status', params.status);
    if (params.search && params.search.trim()) query.append('search', params.search.trim());
    if (params.page) query.append('page', params.page);
    if (params.limit) query.append('limit', params.limit);

    const qs = query.toString();
    const endpoint = `/api/admin/resources${qs ? `?${qs}` : ''}`;
    return await api.get(endpoint);
  },

  /**
   * Create new resource (Admin only)
   * @param {Object} data - { title, description, type, club, url, thumbnail, tags, isPublished }
   */
  async createResource(data) {
    return await api.post('/api/admin/resources', data);
  },

  /**
   * Update existing resource (Admin only)
   * @param {string} id
   * @param {Object} data
   */
  async updateResource(id, data) {
    return await api.patch(`/api/admin/resources/${id}`, data);
  },

  /**
   * Delete resource permanently (Admin only)
   * @param {string} id
   */
  async deleteResource(id) {
    return await api.delete(`/api/admin/resources/${id}`);
  },

  /**
   * Publish a draft resource (Admin only)
   * @param {string} id
   */
  async publishResource(id) {
    return await api.patch(`/api/admin/resources/${id}/publish`);
  },

  /**
   * Unpublish a resource (Admin only)
   * @param {string} id
   */
  async unpublishResource(id) {
    return await api.patch(`/api/admin/resources/${id}/unpublish`);
  }
};

export default resourceApi;
