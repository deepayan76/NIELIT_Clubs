import React from 'react';

export default function SummaryCard({ label, value, subtext, icon: Icon }) {
  return (
    <div className="summary-card">
      <div className="summary-card-header">
        <span className="summary-card-label">{label}</span>
        {Icon && <Icon size={18} className="summary-card-icon" aria-hidden="true" />}
      </div>
      <p className="summary-card-value">{value}</p>
      {subtext && <span className="summary-card-sub">{subtext}</span>}
    </div>
  );
}
