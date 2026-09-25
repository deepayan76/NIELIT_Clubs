import React, { useState, useEffect } from 'react';
import { adminApi } from '../../services/adminApi';
import { ArrowRight } from 'lucide-react';
import { navigate } from '../../utils/router';

export default function Clubs() {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await adminApi.getClubsWithStats();
      setClubs(data);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return <div style={{ color: 'var(--admin-gray)', padding: '20px' }}>Loading club chapters...</div>;
  }

  return (
    <div>
      <div className="dash-welcome-banner">
        <h2 className="dash-welcome-title">Technical Clubs Overview</h2>
        <p className="dash-welcome-subtitle">
          Manage and monitor official NEXORA student chapters and member enrollments.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        {clubs.map((club) => (
          <div
            key={club.id}
            className="club-hero-card"
            style={{ '--club-accent': club.accentColor, margin: 0 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ fontSize: '0.74rem', fontWeight: 700, textTransform: 'uppercase', color: club.accentColor, letterSpacing: '0.06em' }}>
                Official Chapter
              </span>
              <span className="status-tag approved" style={{ fontSize: '0.72rem', padding: '2px 8px' }}>
                Active
              </span>
            </div>

            <h3 className="club-title-large" style={{ fontSize: '1.3rem' }}>{club.name}</h3>
            <p className="club-tagline-text" style={{ fontSize: '0.9rem', marginBottom: '10px' }}>{club.tagline}</p>
            <p className="club-desc-text" style={{ fontSize: '0.86rem', minHeight: '56px', marginBottom: '16px' }}>
              {club.description}
            </p>

            <div style={{ display: 'flex', gap: '20px', padding: '14px 0', borderTop: '1px solid #F1F5F9', marginBottom: '16px' }}>
              <div>
                <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--admin-gray)', fontWeight: 600, display: 'block' }}>
                  Approved Members
                </span>
                <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--admin-black)' }}>
                  {club.approvedCount}
                </span>
              </div>
              <div>
                <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--admin-gray)', fontWeight: 600, display: 'block' }}>
                  Pending Reviews
                </span>
                <span style={{ fontSize: '1.25rem', fontWeight: 700, color: '#D97706' }}>
                  {club.pendingCount}
                </span>
              </div>
            </div>

            <button
              type="button"
              className="dash-btn dash-btn-secondary"
              style={{ width: '100%', fontSize: '0.84rem' }}
              onClick={() => navigate('/admin/registrations')}
            >
              Manage Registrations <ArrowRight size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
