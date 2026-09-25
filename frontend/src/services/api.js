/**
 * Central API Utility for NEXORA Tech Clubs
 * Handles base URL, JSON headers, credentialed requests (HTTP-only cookies), and unified error parsing.
 */

export const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000').replace(/\/$/, '');

/**
 * Universal fetch wrapper
 * @param {string} path - API path (e.g. '/api/registrations')
 * @param {RequestInit} [options] - Standard fetch options
 * @returns {Promise<any>} Parsed response data
 */
export async function apiFetch(path, options = {}) {
  const url = path.startsWith('http') ? path : `${API_BASE_URL}${path.startsWith('/') ? '' : '/'}${path}`;

  const isJsonBody =
    options.body &&
    typeof options.body === 'object' &&
    !(options.body instanceof FormData) &&
    !(options.body instanceof Blob);

  const headers = {
    ...(isJsonBody ? { 'Content-Type': 'application/json' } : {}),
    ...(options.headers || {})
  };

  const body = isJsonBody ? JSON.stringify(options.body) : options.body;

  let response;
  try {
    response = await fetch(url, {
      ...options,
      credentials: 'include',
      headers,
      body
    });
  } catch (netErr) {
    const error = new Error(
      `Unable to connect to backend server at ${API_BASE_URL}. Please ensure the server is running.`
    );
    error.isNetworkError = true;
    error.status = 0;
    throw error;
  }

  // Parse JSON response safely
  let data = {};
  const contentType = response.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    data = await response.json().catch(() => ({}));
  } else {
    const text = await response.text().catch(() => '');
    data = { message: text };
  }

  if (!response.ok) {
    const errorMsg =
      data.message ||
      (data.errors && typeof data.errors === 'string' ? data.errors : null) ||
      `Request failed with status ${response.status}.`;

    const error = new Error(errorMsg);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

export const api = {
  get: (path, options = {}) => apiFetch(path, { ...options, method: 'GET' }),
  post: (path, body, options = {}) => apiFetch(path, { ...options, method: 'POST', body }),
  patch: (path, body, options = {}) => apiFetch(path, { ...options, method: 'PATCH', body }),
  put: (path, body, options = {}) => apiFetch(path, { ...options, method: 'PUT', body }),
  delete: (path, options = {}) => apiFetch(path, { ...options, method: 'DELETE' })
};

export default api;
