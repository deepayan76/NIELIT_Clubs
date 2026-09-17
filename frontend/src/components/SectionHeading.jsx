import React from 'react';
import '../styles/SectionHeading.css';

export default function SectionHeading({
  title,
  subtitle,
  align = 'center',
  className = ''
}) {
  return (
    <div className={`section-heading-wrapper align-${align} ${className}`}>
      {title && <h2 className="section-title">{title}</h2>}
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </div>
  );
}
