import React from 'react';

export default function AdminStatCard({ label, value, type = 'default', icon: Icon }) {
  return (
    <div className={`admin-stat-card ${type}`}>
      <div className="admin-stat-header">
        <span className="admin-stat-label">{label}</span>
        {Icon && <Icon size={18} style={{ opacity: 0.7 }} aria-hidden="true" />}
      </div>
      <p className="admin-stat-value">{value}</p>
    </div>
  );
}
