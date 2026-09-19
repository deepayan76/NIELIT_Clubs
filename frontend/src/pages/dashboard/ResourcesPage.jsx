import React, { useState, useEffect, useCallback } from 'react';
import { resourceApi } from '../../services/resourceApi';
import {
  Search,
  BookOpen,
  Video,
  FileText,
  Globe,
  Code2,
  GraduationCap,
  FileCode,
  Bookmark,
  ExternalLink,
  RefreshCw,
  AlertCircle,
  Calendar,
  Tag,
  Eye,
  X
} from 'lucide-react';

const CLUB_COLORS = {
  AI: { text: '#7C3AED', bg: '#F5F3FF', border: '#DDD6FE', accent: '#8B5CF6' },
  Programming: { text: '#1D4ED8', bg: '#EFF6FF', border: '#BFDBFE', accent: '#2563EB' },
  Cybersecurity: { text: '#047857', bg: '#ECFDF5', border: '#A7F3D0', accent: '#10B981' },
  IoT: { text: '#C2410C', bg: '#FFF7ED', border: '#FED7AA', accent: '#F97316' }
};

const TYPE_ICONS = {
  Video: Video,
  PDF: FileText,
  Article: BookOpen,
  GitHub: Code2,
  Website: Globe,
  Course: GraduationCap,
  Documentation: FileCode,
  Other: Bookmark
};

export default function ResourcesPage() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Search & Filter state
  const [search, setSearch] = useState('');
  const [clubFilter, setClubFilter] = useState('ALL');
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // Modal for detailed resource preview
  const [selectedResource, setSelectedResource] = useState(null);

  const fetchResources = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await resourceApi.getPublishedResources({
        search,
        club: clubFilter,
        type: typeFilter,
        page,
        limit: 12
      });
      setResources(data.resources || []);
      setTotalPages(data.totalPages || 1);
      setTotalCount(data.total || 0);
    } catch (err) {
      console.error('Failed to load resources:', err);
      setError(err.message || 'Unable to load learning resources. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [search, clubFilter, typeFilter, page]);

  useEffect(() => {
    fetchResources();
  }, [fetchResources]);

  const getTypeIcon = (type) => {
    const IconComponent = TYPE_ICONS[type] || Bookmark;
    return <IconComponent size={16} aria-hidden="true" />;
  };

  return (
    <div>
      {/* Welcome / Header Banner */}
      <div className="dash-welcome-banner">
        <h2 className="dash-welcome-title">Club Learning Resources</h2>
        <p className="dash-welcome-subtitle">
          Curated technical tutorials, repositories, documentation, and guides published by NIELIT Tech Clubs.
        </p>
      </div>

      {/* Filter and Search Bar Card */}
      <div className="editorial-card" style={{ padding: '18px 24px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px' }}>
          {/* Search Input */}
          <div className="admin-search-wrapper" style={{ flex: '1 1 280px', minWidth: '240px' }}>
            <Search size={16} className="admin-search-icon" />
            <input
              type="text"
              className="admin-search-input"
              style={{ width: '100%' }}
              placeholder="Search resources by title, topic, or tag..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            {/* Club Filter */}
            <select
              className="admin-select"
              value={clubFilter}
              onChange={(e) => {
                setClubFilter(e.target.value);
                setPage(1);
              }}
              aria-label="Filter by Club"
            >
              <option value="ALL">All Clubs</option>
              <option value="AI">AI Club</option>
              <option value="Programming">Programming Club</option>
              <option value="Cybersecurity">Cybersecurity Club</option>
              <option value="IoT">IoT Club</option>
            </select>

            {/* Resource Type Filter */}
            <select
              className="admin-select"
              value={typeFilter}
              onChange={(e) => {
                setTypeFilter(e.target.value);
                setPage(1);
              }}
              aria-label="Filter by Resource Type"
            >
              <option value="ALL">All Types</option>
              <option value="Video">Video</option>
              <option value="PDF">PDF Document</option>
              <option value="Article">Article</option>
              <option value="GitHub">GitHub Repository</option>
              <option value="Website">Website</option>
              <option value="Course">Course</option>
              <option value="Documentation">Documentation</option>
              <option value="Other">Other</option>
            </select>

            {(search || clubFilter !== 'ALL' || typeFilter !== 'ALL') && (
              <button
                type="button"
                className="dash-btn dash-btn-secondary"
                style={{ padding: '8px 14px', fontSize: '0.82rem' }}
                onClick={() => {
                  setSearch('');
                  setClubFilter('ALL');
                  setTypeFilter('ALL');
                  setPage(1);
                }}
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div
          style={{
            backgroundColor: '#FEF2F2',
            border: '1px solid #FECACA',
            borderRadius: '10px',
            padding: '16px 20px',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            color: '#B91C1C'
          }}
          role="alert"
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <AlertCircle size={20} style={{ flexShrink: 0 }} />
            <span style={{ fontSize: '0.92rem' }}>{error}</span>
          </div>
          <button
            type="button"
            className="dash-btn dash-btn-secondary"
            style={{ padding: '6px 12px', fontSize: '0.82rem', borderColor: '#FECACA' }}
            onClick={fetchResources}
          >
            Retry
          </button>
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="editorial-card" style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--dash-gray)' }}>
          <RefreshCw size={28} style={{ animation: 'spin 1s linear infinite', margin: '0 auto 12px auto', color: 'var(--dash-blue-muted)' }} />
          <h4 style={{ margin: '0 0 6px 0', fontSize: '1.05rem', color: 'var(--dash-dark-blue)' }}>Loading Learning Resources...</h4>
          <p style={{ margin: 0, fontSize: '0.88rem' }}>Fetching latest club tutorials and documentation</p>
        </div>
      ) : resources.length === 0 ? (
        /* Empty State */
        <div className="editorial-card" style={{ textAlign: 'center', padding: '64px 24px', color: 'var(--dash-gray)' }}>
          <BookOpen size={48} style={{ margin: '0 auto 16px auto', color: '#94A3B8', opacity: 0.85 }} />
          <h4 style={{ margin: '0 0 8px 0', fontSize: '1.2rem', fontWeight: 700, color: 'var(--dash-dark-blue)' }}>
            No resources available yet.
          </h4>
          <p style={{ margin: 0, fontSize: '0.92rem', maxWidth: '460px', marginInline: 'auto', lineHeight: '1.5' }}>
            {search || clubFilter !== 'ALL' || typeFilter !== 'ALL'
              ? 'No learning resources match your current filter criteria. Try adjusting your search query or filters.'
              : 'Learning resources will appear here once they are published by the club administration.'}
          </p>
        </div>
      ) : (
        /* Resource Cards Grid */
        <div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '20px',
              marginBottom: '32px'
            }}
          >
            {resources.map((item) => {
              const clubStyle = CLUB_COLORS[item.club] || {
                text: '#16364A',
                bg: '#F1F5F9',
                border: '#CBD5E1',
                accent: '#6A89A7'
              };

              const formattedDate = item.createdAt
                ? new Date(item.createdAt).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  })
                : 'Recent';

              return (
                <div
                  key={item._id}
                  className="editorial-card"
                  style={{
                    margin: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    position: 'relative',
                    overflow: 'hidden',
                    borderTop: `4px solid ${clubStyle.accent}`
                  }}
                >
                  <div>
                    {/* Optional Thumbnail Image */}
                    {item.thumbnail ? (
                      <div
                        style={{
                          width: '100%',
                          height: '140px',
                          borderRadius: '6px',
                          overflow: 'hidden',
                          marginBottom: '16px',
                          backgroundColor: '#F1F5F9'
                        }}
                      >
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                          }}
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                      </div>
                    ) : null}

                    {/* Badge Row (Club + Type) */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '14px', flexWrap: 'wrap' }}>
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '4px 10px',
                          borderRadius: '9999px',
                          fontSize: '0.74rem',
                          fontWeight: 700,
                          letterSpacing: '0.04em',
                          textTransform: 'uppercase',
                          color: clubStyle.text,
                          backgroundColor: clubStyle.bg,
                          border: `1px solid ${clubStyle.border}`
                        }}
                      >
                        {item.club} Club
                      </span>

                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '5px',
                          padding: '4px 9px',
                          borderRadius: '6px',
                          fontSize: '0.74rem',
                          fontWeight: 600,
                          color: '#475569',
                          backgroundColor: '#F1F5F9',
                          border: '1px solid #E2E8F0'
                        }}
                      >
                        {getTypeIcon(item.type)}
                        <span>{item.type}</span>
                      </span>
                    </div>

                    {/* Resource Title */}
                    <h3
                      style={{
                        margin: '0 0 10px 0',
                        fontSize: '1.15rem',
                        fontWeight: 700,
                        color: 'var(--dash-dark-blue)',
                        lineHeight: 1.35
                      }}
                    >
                      {item.title}
                    </h3>

                    {/* Resource Description */}
                    <p
                      style={{
                        margin: '0 0 16px 0',
                        fontSize: '0.88rem',
                        color: '#475569',
                        lineHeight: 1.55,
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}
                    >
                      {item.description}
                    </p>

                    {/* Tags (if any) */}
                    {item.tags && item.tags.length > 0 && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
                        {item.tags.slice(0, 4).map((tag, idx) => (
                          <span
                            key={idx}
                            style={{
                              fontSize: '0.72rem',
                              color: '#64748B',
                              backgroundColor: '#F8FAFC',
                              border: '1px solid #E2E8F0',
                              padding: '2px 7px',
                              borderRadius: '4px',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '3px'
                            }}
                          >
                            <Tag size={10} /> {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Card Footer: Date & Actions */}
                  <div
                    style={{
                      borderTop: '1px solid var(--dash-gray-border)',
                      paddingTop: '14px',
                      marginTop: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: '10px'
                    }}
                  >
                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px',
                        fontSize: '0.76rem',
                        color: '#94A3B8'
                      }}
                    >
                      <Calendar size={13} />
                      <span>{formattedDate}</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <button
                        type="button"
                        className="dash-btn dash-btn-secondary"
                        style={{ padding: '7px 10px', fontSize: '0.82rem' }}
                        onClick={() => setSelectedResource(item)}
                        title="View Resource Details"
                        aria-label="View Details"
                      >
                        <Eye size={14} /> Details
                      </button>

                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="dash-btn dash-btn-primary"
                        style={{
                          padding: '7px 14px',
                          fontSize: '0.82rem',
                          textDecoration: 'none'
                        }}
                      >
                        Open Resource <ExternalLink size={14} />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div
              className="editorial-card"
              style={{
                padding: '12px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px'
              }}
            >
              <span style={{ fontSize: '0.85rem', color: 'var(--dash-gray)' }}>
                Showing Page {page} of {totalPages} ({totalCount} total resources)
              </span>

              <div className="pagination-btn-group">
                <button
                  type="button"
                  className="pagination-btn"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page <= 1}
                >
                  Previous
                </button>
                <button
                  type="button"
                  className="pagination-btn"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page >= totalPages}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Resource Details Modal (Student View Only) */}
      {selectedResource && (
        <div className="admin-modal-backdrop" role="dialog" aria-modal="true">
          <div className="admin-modal" style={{ maxWidth: '640px' }}>
            <div className="admin-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px',
                    padding: '4px 8px',
                    borderRadius: '5px',
                    fontSize: '0.74rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    color: CLUB_COLORS[selectedResource.club]?.text || '#16364A',
                    backgroundColor: CLUB_COLORS[selectedResource.club]?.bg || '#F1F5F9',
                    border: `1px solid ${CLUB_COLORS[selectedResource.club]?.border || '#CBD5E1'}`
                  }}
                >
                  {selectedResource.club} Club
                </span>
                <span style={{ fontSize: '0.82rem', color: '#64748B', fontWeight: 600 }}>
                  • {selectedResource.type}
                </span>
              </div>
              <button
                type="button"
                className="admin-modal-close"
                onClick={() => setSelectedResource(null)}
                aria-label="Close dialog"
              >
                <X size={20} />
              </button>
            </div>

            <div className="admin-modal-body">
              {selectedResource.thumbnail && (
                <div
                  style={{
                    width: '100%',
                    maxHeight: '220px',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    marginBottom: '18px',
                    backgroundColor: '#F1F5F9'
                  }}
                >
                  <img
                    src={selectedResource.thumbnail}
                    alt={selectedResource.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              )}

              <h3 style={{ margin: '0 0 12px 0', fontSize: '1.3rem', color: 'var(--dash-dark-blue)', fontWeight: 700 }}>
                {selectedResource.title}
              </h3>

              <div style={{ marginBottom: '16px' }}>
                <span style={{ fontSize: '0.76rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--dash-gray)', letterSpacing: '0.04em' }}>
                  Description
                </span>
                <p style={{ margin: '6px 0 0 0', fontSize: '0.92rem', color: '#334155', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
                  {selectedResource.description}
                </p>
              </div>

              {selectedResource.tags && selectedResource.tags.length > 0 && (
                <div style={{ marginBottom: '16px' }}>
                  <span style={{ fontSize: '0.76rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--dash-gray)', letterSpacing: '0.04em' }}>
                    Tags & Topics
                  </span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '6px' }}>
                    {selectedResource.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        style={{
                          fontSize: '0.76rem',
                          color: '#475569',
                          backgroundColor: '#F1F5F9',
                          border: '1px solid #E2E8F0',
                          padding: '3px 8px',
                          borderRadius: '4px'
                        }}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div
                style={{
                  padding: '12px 16px',
                  backgroundColor: '#F8FAFC',
                  borderRadius: '8px',
                  border: '1px solid #E2E8F0',
                  fontSize: '0.82rem',
                  color: '#64748B'
                }}
              >
                Added on{' '}
                <strong>
                  {selectedResource.createdAt
                    ? new Date(selectedResource.createdAt).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })
                    : 'Recent'}
                </strong>
                {selectedResource.createdByName ? ` by ${selectedResource.createdByName}` : ''}
              </div>
            </div>

            <div className="admin-modal-footer">
              <button
                type="button"
                className="dash-btn dash-btn-secondary"
                onClick={() => setSelectedResource(null)}
              >
                Close
              </button>
              <a
                href={selectedResource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="dash-btn dash-btn-primary"
                style={{ textDecoration: 'none' }}
              >
                Open Resource <ExternalLink size={15} />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
