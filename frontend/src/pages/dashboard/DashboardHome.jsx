import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { userApi } from '../../services/userApi';
import StatusCard from '../../components/dashboard/StatusCard';
import SummaryCard from '../../components/dashboard/SummaryCard';
import ApplicationOverview from '../../components/dashboard/ApplicationOverview';
import { FileCheck, Layers, BookOpen, Calendar, ArrowRight } from 'lucide-react';
import { navigate } from '../../utils/router';

export default function DashboardHome() {
  const { user } = useAuth();
  const [summaryData, setSummaryData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSummary() {
      if (user) {
        const data = await userApi.getDashboardSummary(user);
        setSummaryData(data);
      }
      setLoading(false);
    }
    loadSummary();
  }, [user]);

  if (loading || !user) {
    return <div>Loading dashboard...</div>;
  }

  return (
    <div>
      {/* Welcome Banner */}
      <div className="dash-welcome-banner">
        <h2 className="dash-welcome-title">Welcome back, {user.name} 👋</h2>
        <p className="dash-welcome-subtitle">Your NIELIT Tech Clubs journey starts here.</p>
      </div>

      {/* Application Status Card (First Major Card) */}
      <StatusCard
        status={user.applicationStatus}
        clubName={summaryData?.clubName}
        submittedDate={summaryData?.submittedDate}
      />

      {/* Summary Cards Grid */}
      <div className="summary-grid">
        <SummaryCard
          label="Application"
          value={user.applicationStatus}
          subtext="Verified by Admin"
          icon={FileCheck}
        />
        <SummaryCard
          label="My Club"
          value={user.club}
          subtext={summaryData?.clubTagline || 'Technical Club'}
          icon={Layers}
        />
        <SummaryCard
          label="Semester"
          value={`${user.semester}${user.semester === 1 ? 'st' : user.semester === 2 ? 'nd' : user.semester === 3 ? 'rd' : 'th'} Sem`}
          subtext="Academic Term"
          icon={BookOpen}
        />
        <SummaryCard
          label="Member Since"
          value={summaryData?.memberSince || '2026'}
          subtext="NIELIT Tech Clubs"
          icon={Calendar}
        />
      </div>

      {/* Application Overview */}
      <ApplicationOverview user={user} submittedDate={summaryData?.submittedDate} />

      {/* Quick Club Snippet */}
      <div className="editorial-card" style={{ marginBottom: 0 }}>
        <div className="editorial-card-header">
          <h3 className="editorial-card-title">Enrolled Club: {summaryData?.clubName}</h3>
          <button
            type="button"
            className="editorial-card-action"
            onClick={() => navigate('/dashboard/club')}
          >
            Go to Club Page <ArrowRight size={16} aria-hidden="true" />
          </button>
        </div>
        <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.6', margin: '0 0 16px 0' }}>
          {summaryData?.clubDescription}
        </p>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            type="button"
            className="dash-btn dash-btn-secondary"
            onClick={() => navigate('/dashboard/club')}
          >
            View Club Details
          </button>
        </div>
      </div>
    </div>
  );
}
