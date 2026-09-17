import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { userApi, CLUB_METADATA } from '../../services/userApi';
import { Layers, ShieldCheck, ExternalLink, Sparkles, FolderCode } from 'lucide-react';
import { navigate } from '../../utils/router';

export default function MyClubPage() {
  const { user } = useAuth();
  const [club, setClub] = useState(null);

  useEffect(() => {
    if (user?.club) {
      userApi.getClub(user.club).then(setClub);
    }
  }, [user]);

  if (!user || !club) return null;

  return (
    <div>
      <div className="dash-welcome-banner">
        <h2 className="dash-welcome-title">My Club</h2>
        <p className="dash-welcome-subtitle">Overview of your enrolled technical division</p>
      </div>

      {/* Main Club Hero Card */}
      <div
        className="club-hero-card"
        style={{ '--club-accent': club.accentColor }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <span className="status-tag approved" style={{ fontSize: '0.76rem', padding: '4px 10px' }}>
            <ShieldCheck size={14} /> Active Member
          </span>
        </div>

        <h3 className="club-title-large">{club.name}</h3>
        <p className="club-tagline-text">{club.tagline}</p>
        <p className="club-desc-text">{club.description}</p>

        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
          <button
            type="button"
            className="dash-btn dash-btn-primary"
            onClick={() => navigate(club.publicRoute)}
          >
            Visit Public Club Page <ExternalLink size={15} />
          </button>
        </div>
      </div>

      {/* Club Modules Placeholder (Clean, realistic empty state without fake numbers) */}
      <div className="editorial-card">
        <div className="editorial-card-header">
          <h4 className="editorial-card-title">Club Activities & Resources</h4>
        </div>
        <div style={{ textAlign: 'center', padding: '36px 20px', color: 'var(--dash-gray)' }}>
          <FolderCode size={40} style={{ margin: '0 auto 12px auto', color: '#94A3B8', opacity: 0.8 }} />
          <h5 style={{ margin: '0 0 6px 0', fontSize: '1.05rem', color: 'var(--dash-dark-blue)' }}>
            Club workspace syncing
          </h5>
          <p style={{ margin: 0, fontSize: '0.88rem', maxWidth: '480px', marginInline: 'auto', lineHeight: '1.5' }}>
            Club announcements, repositories, project guides, and workshop materials will appear here when scheduled by the club mentors.
          </p>
        </div>
      </div>
    </div>
  );
}
