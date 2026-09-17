import React, { useState } from 'react';

export default function CyberBuildingProgression() {
  const [activeMilestone, setActiveMilestone] = useState(6);

  const milestones = [
    { name: 'FUNDAMENTALS', id: 0 },
    { name: 'NETWORKING', id: 1 },
    { name: 'LINUX HARDENING', id: 2 },
    { name: 'WEB DEFENSE', id: 3 },
    { name: 'SECURITY TESTING', id: 4 },
    { name: 'INCIDENT ANALYSIS', id: 5 },
    { name: 'CAPSTONE DEFENSE', id: 6, isCapstone: true }
  ];

  return (
    <section className="cyber-building-section" id="building-progression">
      <div className="cyber-section-container">
        <div className="cyber-building-header">
          <div className="cyber-section-eyebrow">BUILDING ALONG THE WAY</div>
          <h2 className="cyber-building-heading">Every Challenge Hardens Your Defense.</h2>
          <p className="cyber-building-desc">
            The practical activities build progressively, allowing students to move from core packet analysis to architecting multi-layered security defenses.
          </p>
        </div>

        <div className="cyber-progression-track">
          <div className="cyber-progression-line" />
          {milestones.map((m) => (
            <div
              key={m.id}
              className={`cyber-milestone-node ${m.isCapstone ? 'is-capstone' : ''}`}
              onMouseEnter={() => setActiveMilestone(m.id)}
              style={{
                opacity: activeMilestone >= m.id ? 1 : 0.65
              }}
            >
              <div className="cyber-milestone-dot" />
              <span className="cyber-milestone-name">{m.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
