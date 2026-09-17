import React, { useState } from 'react';

export default function ProgBuildingProgression() {
  const [activeMilestone, setActiveMilestone] = useState(6);

  const milestones = [
    { name: 'FUNDAMENTALS', id: 0 },
    { name: 'PROBLEM SOLVING', id: 1 },
    { name: 'DATA STRUCTURES', id: 2 },
    { name: 'ALGORITHMS', id: 3 },
    { name: 'VERSION CONTROL', id: 4 },
    { name: 'SOFTWARE', id: 5 },
    { name: 'CAPSTONE PROJECT', id: 6, isCapstone: true }
  ];

  return (
    <section className="prog-building-section" id="building-progression">
      <div className="prog-section-container">
        <div className="prog-building-header">
          <div className="prog-section-eyebrow">BUILDING ALONG THE WAY</div>
          <h2 className="prog-building-heading">Every Problem Makes You Better.</h2>
          <p className="prog-building-desc">
            The practical activities build progressively, allowing students to move from basic concepts to more complex programming challenges and projects.
          </p>
        </div>

        <div className="prog-progression-track">
          <div className="prog-progression-line" />
          {milestones.map((m) => (
            <div
              key={m.id}
              className={`prog-milestone-node ${m.isCapstone ? 'is-capstone' : ''}`}
              onMouseEnter={() => setActiveMilestone(m.id)}
              style={{
                opacity: activeMilestone >= m.id ? 1 : 0.65
              }}
            >
              <div className="prog-milestone-dot" />
              <span className="prog-milestone-name">{m.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
