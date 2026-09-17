/**
 * Student User API Service
 * Fetches real profile, registration, and club data from /api/student/* endpoints.
 */

import { apiFetch } from './api';

export const CLUB_METADATA = {
  Programming: {
    id: 'programming',
    name: 'Programming Club',
    tagline: 'Think. Code. Solve.',
    description:
      'Sharpen your coding skills, solve problems, build software, and turn ideas into working projects.',
    accentColor: '#2563EB',
    publicRoute: '/programming'
  },
  AI: {
    id: 'ai',
    name: 'AI Club',
    tagline: 'Explore the Future of Intelligence',
    description:
      'Explore Artificial Intelligence and Machine Learning through hands-on projects, experiments, and real-world applications.',
    accentColor: '#8B5CF6',
    publicRoute: '/ai'
  },
  Cybersecurity: {
    id: 'cybersecurity',
    name: 'Cybersecurity Club',
    tagline: 'Defend, Secure, and Master the Digital Realm',
    description:
      'Learn to identify, understand, and defend against cyber threats through ethical hacking, security challenges, and practical learning.',
    accentColor: '#10B981',
    publicRoute: '/cybersecurity'
  },
  IoT: {
    id: 'iot',
    name: 'IoT Club',
    tagline: 'Connected Systems. Smart Devices. Real-World Tech.',
    description:
      'Connect the physical and digital worlds by building smart systems with sensors, embedded devices, and connected technologies.',
    accentColor: '#F97316',
    publicRoute: '/iot'
  }
};

function getOrdinal(n) {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return s[(v - 20) % 10] || s[v] || s[0];
}

function formatDate(dateString) {
  if (!dateString) return '17 Sep 2026';
  try {
    const d = new Date(dateString);
    return d.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  } catch {
    return '17 Sep 2026';
  }
}

export const userApi = {
  /**
   * Get dynamic dashboard summary for authenticated student
   */
  async getDashboardSummary(user) {
    if (!user) return null;

    let appData = null;
    try {
      const appRes = await this.getApplication();
      appData = appRes;
    } catch (_) {}

    const clubInfo = CLUB_METADATA[user.club] || CLUB_METADATA.Programming;
    const memberYear = user.createdAt ? new Date(user.createdAt).getFullYear() : '2026';
    const submittedDate = appData?.submittedAt ? formatDate(appData.submittedAt) : formatDate(user.createdAt);

    return {
      applicationStatus: user.applicationStatus || 'APPROVED',
      clubName: clubInfo.name,
      clubTagline: clubInfo.tagline,
      clubDescription: clubInfo.description,
      clubAccentColor: clubInfo.accentColor,
      semester: `${user.semester}${getOrdinal(user.semester)} Semester`,
      memberSince: memberYear,
      submittedDate,
      reason: appData?.reason
    };
  },

  /**
   * Get detailed profile data from backend
   * Calls GET /api/student/profile
   */
  async getProfile() {
    const response = await apiFetch('/api/student/profile', {
      method: 'GET'
    });
    return response.data;
  },

  /**
   * Get full submitted application from backend
   * Calls GET /api/student/application
   */
  async getApplication() {
    const response = await apiFetch('/api/student/application', {
      method: 'GET'
    });
    return response.data;
  },

  /**
   * Get assigned club details
   */
  async getClub(clubName) {
    return CLUB_METADATA[clubName] || CLUB_METADATA.Programming;
  }
};

export default userApi;
