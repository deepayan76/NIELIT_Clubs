import React, { useState, useEffect } from 'react';
import { X, BookPlus, Edit3, AlertCircle, CheckCircle2 } from 'lucide-react';

const ALLOWED_TYPES = [
  'Video',
  'PDF',
  'Article',
  'GitHub',
  'Website',
  'Course',
  'Documentation',
  'Other'
];

const ALLOWED_CLUBS = ['AI', 'Programming', 'Cybersecurity', 'IoT'];

const URL_REGEX = /^https?:\/\/.+/i;

export default function ResourceFormModal({ isOpen, onClose, onSave, resource = null }) {
  const isEditing = Boolean(resource && resource._id);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'Video',
    club: 'Programming',
    url: '',
    thumbnail: '',
    tags: '',
    isPublished: true
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');

  useEffect(() => {
    if (resource) {
      setFormData({
        title: resource.title || '',
        description: resource.description || '',
        type: resource.type || 'Video',
        club: resource.club || 'Programming',
        url: resource.url || '',
        thumbnail: resource.thumbnail || '',
        tags: Array.isArray(resource.tags) ? resource.tags.join(', ') : resource.tags || '',
        isPublished: resource.isPublished !== undefined ? resource.isPublished : true
      });
    } else {
      setFormData({
        title: '',
        description: '',
        type: 'Video',
        club: 'Programming',
        url: '',
        thumbnail: '',
        tags: '',
        isPublished: true
      });
    }
    setErrors({});
    setServerError('');
  }, [resource, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const errs = {};

    const cleanTitle = formData.title.trim();
    if (!cleanTitle) {
      errs.title = 'Title is required.';
    } else if (cleanTitle.length > 150) {
      errs.title = 'Title cannot exceed 150 characters.';
    }

    const cleanDesc = formData.description.trim();
    if (!cleanDesc) {
      errs.description = 'Description is required.';
    } else if (cleanDesc.length < 10) {
      errs.description = 'Description must be at least 10 characters long.';
    } else if (cleanDesc.length > 1000) {
      errs.description = 'Description cannot exceed 1000 characters.';
    }

    if (!ALLOWED_TYPES.includes(formData.type)) {
      errs.type = `Type must be one of: ${ALLOWED_TYPES.join(', ')}.`;
    }

    if (!ALLOWED_CLUBS.includes(formData.club)) {
      errs.club = `Club must be one of: ${ALLOWED_CLUBS.join(', ')}.`;
    }

    const cleanUrl = formData.url.trim();
    if (!cleanUrl) {
      errs.url = 'Resource URL is required.';
    } else if (!URL_REGEX.test(cleanUrl)) {
      errs.url = 'Please provide a valid HTTP or HTTPS URL (e.g. https://example.com).';
    }

    const cleanThumb = formData.thumbnail.trim();
    if (cleanThumb && !URL_REGEX.test(cleanThumb)) {
      errs.thumbnail = 'Thumbnail must be a valid HTTP or HTTPS URL.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');

    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const payload = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        type: formData.type,
        club: formData.club,
        url: formData.url.trim(),
        thumbnail: formData.thumbnail.trim(),
        tags: formData.tags
          ? formData.tags
              .split(',')
              .map((t) => t.trim())
              .filter(Boolean)
          : [],
        isPublished: Boolean(formData.isPublished)
      };

      await onSave(payload, resource?._id);
      onClose();
    } catch (err) {
      console.error('Save resource failed:', err);
      setServerError(err.message || 'Failed to save resource. Please check the inputs.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="admin-modal-backdrop" role="dialog" aria-modal="true">
      <div className="admin-modal" style={{ maxWidth: '640px' }}>
        <div className="admin-modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {isEditing ? (
              <Edit3 size={20} color="var(--admin-dark-blue)" />
            ) : (
              <BookPlus size={20} color="var(--admin-dark-blue)" />
            )}
            <h3 className="admin-modal-title">
              {isEditing ? 'Edit Learning Resource' : 'Add New Learning Resource'}
            </h3>
          </div>
          <button
            type="button"
            className="admin-modal-close"
            onClick={onClose}
            aria-label="Close dialog"
            disabled={isSubmitting}
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="admin-modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {serverError && (
              <div
                style={{
                  padding: '12px 16px',
                  backgroundColor: '#FEF2F2',
                  border: '1px solid #FECACA',
                  borderRadius: '8px',
                  color: '#B91C1C',
                  fontSize: '0.88rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
                role="alert"
              >
                <AlertCircle size={18} style={{ flexShrink: 0 }} />
                <span>{serverError}</span>
              </div>
            )}

            {/* Title Field */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--admin-dark-blue)' }}>
                Resource Title <span style={{ color: '#DC2626' }}>*</span>
              </label>
              <input
                type="text"
                className="admin-search-input"
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderColor: errors.title ? '#DC2626' : 'var(--admin-border)'
                }}
                placeholder="e.g. Python Fundamentals Masterclass"
                value={formData.title}
                maxLength={150}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#64748B' }}>
                <span>{errors.title ? <span style={{ color: '#DC2626' }}>{errors.title}</span> : 'Clear, concise title for students'}</span>
                <span>{formData.title.length}/150</span>
              </div>
            </div>

            {/* Club and Type Row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {/* Club Dropdown */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--admin-dark-blue)' }}>
                  Club Division <span style={{ color: '#DC2626' }}>*</span>
                </label>
                <select
                  className="admin-select"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderColor: errors.club ? '#DC2626' : 'var(--admin-border)'
                  }}
                  value={formData.club}
                  onChange={(e) => setFormData({ ...formData, club: e.target.value })}
                  required
                >
                  <option value="AI">AI</option>
                  <option value="Programming">Programming</option>
                  <option value="Cybersecurity">Cybersecurity</option>
                  <option value="IoT">IoT</option>
                </select>
                {errors.club && <span style={{ fontSize: '0.75rem', color: '#DC2626' }}>{errors.club}</span>}
              </div>

              {/* Resource Type Dropdown */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--admin-dark-blue)' }}>
                  Resource Type <span style={{ color: '#DC2626' }}>*</span>
                </label>
                <select
                  className="admin-select"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderColor: errors.type ? '#DC2626' : 'var(--admin-border)'
                  }}
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  required
                >
                  {ALLOWED_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                {errors.type && <span style={{ fontSize: '0.75rem', color: '#DC2626' }}>{errors.type}</span>}
              </div>
            </div>

            {/* Description Field */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--admin-dark-blue)' }}>
                Description <span style={{ color: '#DC2626' }}>*</span>
              </label>
              <textarea
                rows={4}
                className="admin-search-input"
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  fontFamily: 'inherit',
                  resize: 'vertical',
                  borderColor: errors.description ? '#DC2626' : 'var(--admin-border)'
                }}
                placeholder="Provide a detailed description or learning outcome of this resource (10-1000 chars)..."
                value={formData.description}
                maxLength={1000}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#64748B' }}>
                <span>{errors.description ? <span style={{ color: '#DC2626' }}>{errors.description}</span> : 'Between 10 and 1000 characters'}</span>
                <span>{formData.description.length}/1000</span>
              </div>
            </div>

            {/* Resource URL Field */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--admin-dark-blue)' }}>
                Resource URL <span style={{ color: '#DC2626' }}>*</span>
              </label>
              <input
                type="url"
                className="admin-search-input"
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderColor: errors.url ? '#DC2626' : 'var(--admin-border)'
                }}
                placeholder="https://youtube.com/watch?v=... or https://github.com/..."
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                required
              />
              {errors.url && <span style={{ fontSize: '0.75rem', color: '#DC2626' }}>{errors.url}</span>}
            </div>

            {/* Thumbnail URL Field (Optional) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--admin-dark-blue)' }}>
                Thumbnail URL <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 400 }}>(Optional)</span>
              </label>
              <input
                type="url"
                className="admin-search-input"
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderColor: errors.thumbnail ? '#DC2626' : 'var(--admin-border)'
                }}
                placeholder="https://images.unsplash.com/... or https://..."
                value={formData.thumbnail}
                onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
              />
              {errors.thumbnail && <span style={{ fontSize: '0.75rem', color: '#DC2626' }}>{errors.thumbnail}</span>}
            </div>

            {/* Tags Field (Optional) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--admin-dark-blue)' }}>
                Tags <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 400 }}>(Optional, comma-separated)</span>
              </label>
              <input
                type="text"
                className="admin-search-input"
                style={{ width: '100%', padding: '10px 14px' }}
                placeholder="e.g. beginner, python, algorithms, video-tutorial"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              />
            </div>

            {/* Published Checkbox */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 14px',
                backgroundColor: '#F8FAFC',
                border: '1px solid #E2E8F0',
                borderRadius: '8px'
              }}
            >
              <input
                type="checkbox"
                id="isPublishedCheck"
                checked={formData.isPublished}
                onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                style={{ width: '18px', height: '18px', cursor: 'pointer' }}
              />
              <label htmlFor="isPublishedCheck" style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--admin-dark-blue)', cursor: 'pointer' }}>
                Publish Immediately <span style={{ fontWeight: 400, color: '#64748B' }}>(Visible to students in the club portal)</span>
              </label>
            </div>
          </div>

          <div className="admin-modal-footer">
            <button
              type="button"
              className="dash-btn dash-btn-secondary"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="dash-btn dash-btn-primary"
              disabled={isSubmitting}
              style={{ minWidth: '130px' }}
            >
              {isSubmitting ? 'Saving...' : isEditing ? 'Update Resource' : 'Save Resource'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
