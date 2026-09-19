import React, { useState, useEffect, useCallback } from 'react';
import { resourceApi } from '../../services/resourceApi';
import ResourceFormModal from '../../components/admin/ResourceFormModal';
import ResourceDeleteDialog from '../../components/admin/ResourceDeleteDialog';
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  Globe,
  ExternalLink,
  Eye,
  EyeOff,
  RefreshCw,
  CheckCircle2,
  XCircle,
  Video,
  FileText,
  BookOpen,
  Code2,
  GraduationCap,
  FileCode,
  Bookmark
} from 'lucide-react';

const CLUB_COLORS = {
  AI: { text: '#7C3AED', bg: '#F5F3FF', border: '#DDD6FE' },
  Programming: { text: '#1D4ED8', bg: '#EFF6FF', border: '#BFDBFE' },
  Cybersecurity: { text: '#047857', bg: '#ECFDF5', border: '#A7F3D0' },
  IoT: { text: '#C2410C', bg: '#FFF7ED', border: '#FED7AA' }
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

export default function AdminResources() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  // Search & Filter state
  const [search, setSearch] = useState('');
  const [clubFilter, setClubFilter] = useState('ALL');
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // Modal states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingResource, setEditingResource] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deletingResource, setDeletingResource] = useState(null);

  const showToast = (message, type = 'success') => {
    setToastMessage(message);
    setToastType(type);
    setTimeout(() => {
      setToastMessage('');
    }, 5000);
  };

  const fetchResources = useCallback(async () => {
    setLoading(true);
    try {
      const data = await resourceApi.getAdminResources({
        search,
        club: clubFilter,
        type: typeFilter,
        status: statusFilter,
        page,
        limit: 10
      });
      setResources(data.resources || []);
      setTotalPages(data.totalPages || 1);
      setTotalCount(data.total || 0);
    } catch (err) {
      console.error('Failed to load admin resources:', err);
      showToast(err.message || 'Error loading resources.', 'error');
    } finally {
      setLoading(false);
    }
  }, [search, clubFilter, typeFilter, statusFilter, page]);

  useEffect(() => {
    fetchResources();
  }, [fetchResources]);

  const handleCreateOrUpdate = async (formData, id) => {
    if (id) {
      await resourceApi.updateResource(id, formData);
      showToast('✓ Learning resource updated successfully.');
    } else {
      await resourceApi.createResource(formData);
      showToast('✓ New learning resource published successfully.');
    }
    await fetchResources();
  };

  const handleDelete = async (id) => {
    try {
      await resourceApi.deleteResource(id);
      showToast('✓ Resource deleted permanently.');
      await fetchResources();
    } catch (err) {
      console.error('Delete failed:', err);
      showToast(`✕ Deletion failed: ${err.message}`, 'error');
    }
  };

  const handleTogglePublish = async (resource) => {
    try {
      if (resource.isPublished) {
        await resourceApi.unpublishResource(resource._id);
        showToast(`Resource "${resource.title}" unpublished (set to draft).`);
      } else {
        await resourceApi.publishResource(resource._id);
        showToast(`✓ Resource "${resource.title}" is now published.`);
      }
      await fetchResources();
    } catch (err) {
      console.error('Toggle publish failed:', err);
      showToast(`✕ Update failed: ${err.message}`, 'error');
    }
  };

  const getTypeIcon = (type) => {
    const IconComponent = TYPE_ICONS[type] || Bookmark;
    return <IconComponent size={14} aria-hidden="true" />;
  };

  return (
    <div>
      {/* Header Banner */}
      <div className="dash-welcome-banner">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h2 className="dash-welcome-title">Resources</h2>
            <p className="dash-welcome-subtitle">
              Add, manage, and share learning resources with NIELIT Tech Club students.
            </p>
          </div>
          <button
            type="button"
            className="dash-btn dash-btn-primary"
            onClick={() => {
              setEditingResource(null);
              setIsFormOpen(true);
            }}
          >
            <Plus size={16} /> Add Resource
          </button>
        </div>
      </div>

      {/* Toast Alert Message */}
      {toastMessage && (
        <div
          style={{
            padding: '12px 18px',
            backgroundColor: toastType === 'success' ? '#ECFDF5' : '#FEF2F2',
            color: toastType === 'success' ? '#047857' : '#B91C1C',
            border: `1px solid ${toastType === 'success' ? '#A7F3D0' : '#FECACA'}`,
            borderRadius: '8px',
            marginBottom: '20px',
            fontWeight: 600,
            fontSize: '0.9rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
          role="status"
        >
          {toastType === 'success' ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Table Card */}
      <div className="admin-table-card">
        {/* Table Header Bar with Search & Filters */}
        <div className="admin-table-header-bar">
          <div>
            <h3 className="admin-table-title">All Resources ({totalCount})</h3>
          </div>

          <div className="admin-toolbar">
            {/* Search Input */}
            <div className="admin-search-wrapper">
              <Search size={16} className="admin-search-icon" />
              <input
                type="text"
                className="admin-search-input"
                placeholder="Search resources..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
              />
            </div>

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
              <option value="AI">AI</option>
              <option value="Programming">Programming</option>
              <option value="Cybersecurity">Cybersecurity</option>
              <option value="IoT">IoT</option>
            </select>

            {/* Type Filter */}
            <select
              className="admin-select"
              value={typeFilter}
              onChange={(e) => {
                setTypeFilter(e.target.value);
                setPage(1);
              }}
              aria-label="Filter by Type"
            >
              <option value="ALL">All Types</option>
              <option value="Video">Video</option>
              <option value="PDF">PDF</option>
              <option value="Article">Article</option>
              <option value="GitHub">GitHub</option>
              <option value="Website">Website</option>
              <option value="Course">Course</option>
              <option value="Documentation">Documentation</option>
              <option value="Other">Other</option>
            </select>

            {/* Status Filter */}
            <select
              className="admin-select"
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
              aria-label="Filter by Status"
            >
              <option value="ALL">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft / Unpublished</option>
            </select>
          </div>
        </div>

        {/* Table Content */}
        <div className="admin-table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Club</th>
                <th>Type</th>
                <th>Status</th>
                <th>Date Added</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '40px', color: 'var(--admin-gray)' }}>
                    <RefreshCw size={20} style={{ animation: 'spin 1s linear infinite', margin: '0 auto 8px auto' }} />
                    <p style={{ margin: 0 }}>Loading resources...</p>
                  </td>
                </tr>
              ) : resources.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '48px 20px', color: 'var(--admin-gray)' }}>
                    <p style={{ margin: '0 0 12px 0', fontSize: '1rem', fontWeight: 600, color: 'var(--admin-dark-blue)' }}>
                      No resources have been added yet.
                    </p>
                    <button
                      type="button"
                      className="dash-btn dash-btn-primary"
                      style={{ padding: '8px 16px', fontSize: '0.85rem' }}
                      onClick={() => {
                        setEditingResource(null);
                        setIsFormOpen(true);
                      }}
                    >
                      <Plus size={15} /> Add Resource
                    </button>
                  </td>
                </tr>
              ) : (
                resources.map((res) => {
                  const clubStyle = CLUB_COLORS[res.club] || {
                    text: '#16364A',
                    bg: '#F1F5F9',
                    border: '#CBD5E1'
                  };

                  const formattedDate = res.createdAt
                    ? new Date(res.createdAt).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })
                    : 'Recent';

                  return (
                    <tr key={res._id}>
                      {/* Title & URL snippet */}
                      <td>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', maxWidth: '320px' }}>
                          <span className="admin-student-name" style={{ lineHeight: 1.3 }}>
                            {res.title}
                          </span>
                          <a
                            href={res.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              fontSize: '0.76rem',
                              color: 'var(--admin-blue)',
                              textDecoration: 'none',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap'
                            }}
                          >
                            <span>{res.url}</span>
                            <ExternalLink size={11} />
                          </a>
                        </div>
                      </td>

                      {/* Club */}
                      <td>
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            padding: '3px 8px',
                            borderRadius: '9999px',
                            fontSize: '0.74rem',
                            fontWeight: 700,
                            letterSpacing: '0.03em',
                            textTransform: 'uppercase',
                            color: clubStyle.text,
                            backgroundColor: clubStyle.bg,
                            border: `1px solid ${clubStyle.border}`
                          }}
                        >
                          {res.club}
                        </span>
                      </td>

                      {/* Type */}
                      <td>
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            padding: '3px 8px',
                            borderRadius: '4px',
                            fontSize: '0.76rem',
                            fontWeight: 600,
                            color: '#475569',
                            backgroundColor: '#F1F5F9',
                            border: '1px solid #E2E8F0'
                          }}
                        >
                          {getTypeIcon(res.type)}
                          <span>{res.type}</span>
                        </span>
                      </td>

                      {/* Status */}
                      <td>
                        {res.isPublished ? (
                          <span className="status-tag approved" style={{ fontSize: '0.74rem', padding: '3px 8px' }}>
                            ✓ Published
                          </span>
                        ) : (
                          <span className="status-tag pending" style={{ fontSize: '0.74rem', padding: '3px 8px' }}>
                            ◷ Draft
                          </span>
                        )}
                      </td>

                      {/* Date Added */}
                      <td>{formattedDate}</td>

                      {/* Actions */}
                      <td>
                        <div className="admin-table-actions" style={{ justifyContent: 'flex-end' }}>
                          {/* Publish/Unpublish toggle */}
                          <button
                            type="button"
                            className="btn-action-view"
                            onClick={() => handleTogglePublish(res)}
                            title={res.isPublished ? 'Unpublish (Set to draft)' : 'Publish immediately'}
                            style={{
                              padding: '5px 10px',
                              color: res.isPublished ? '#D97706' : '#047857'
                            }}
                          >
                            {res.isPublished ? <EyeOff size={13} /> : <Eye size={13} />}
                            <span>{res.isPublished ? 'Unpublish' : 'Publish'}</span>
                          </button>

                          {/* Edit Button */}
                          <button
                            type="button"
                            className="btn-action-view"
                            onClick={() => {
                              setEditingResource(res);
                              setIsFormOpen(true);
                            }}
                            title="Edit Resource"
                            style={{ padding: '5px 10px' }}
                          >
                            <Edit2 size={13} />
                            <span>Edit</span>
                          </button>

                          {/* Delete Button */}
                          <button
                            type="button"
                            className="btn-action-reject"
                            onClick={() => {
                              setDeletingResource(res);
                              setIsDeleteOpen(true);
                            }}
                            title="Delete Resource"
                            style={{ padding: '5px 10px' }}
                          >
                            <Trash2 size={13} />
                            <span>Delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        {totalPages > 1 && (
          <div className="admin-pagination-bar">
            <span>
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

      {/* Add / Edit Resource Modal */}
      <ResourceFormModal
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingResource(null);
        }}
        onSave={handleCreateOrUpdate}
        resource={editingResource}
      />

      {/* Delete Confirmation Dialog */}
      <ResourceDeleteDialog
        isOpen={isDeleteOpen}
        resource={deletingResource}
        onClose={() => {
          setIsDeleteOpen(false);
          setDeletingResource(null);
        }}
        onConfirm={handleDelete}
      />
    </div>
  );
}
