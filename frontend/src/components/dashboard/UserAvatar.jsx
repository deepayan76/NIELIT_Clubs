import React from 'react';

/**
 * Generates user initials from name (e.g. "Deepayan Das" -> "DD")
 */
function getInitials(name) {
  if (!name) return 'ST';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default function UserAvatar({ name, size = 'medium', className = '' }) {
  const initials = getInitials(name);
  const sizeClass = size === 'large' ? 'profile-avatar-large' : 'avatar-circle';

  return (
    <div className={`${sizeClass} ${className}`} aria-label={name || 'User Avatar'}>
      {initials}
    </div>
  );
}
