import React from 'react';

export default function CyberSkills() {
  const skills = [
    'Security Fundamentals',
    'Networking & Protocols',
    'Linux System Hardening',
    'Threat & Attack Analysis',
    'Web Application Security',
    'Analytical Problem Solving',
    'Python & Automation',
    'Incident Response Workflows',
    'Technical Communication',
    'Security Documentation'
  ];

  return (
    <section className="cyber-skills-section" id="skills">
      <div className="cyber-section-container">
        <div className="cyber-skills-header">
          <span className="cyber-section-eyebrow">CORE COMPETENCIES</span>
          <h2 className="cyber-section-title">More Than Security Tools.</h2>
          <p className="cyber-section-desc">
            Build long-term engineering rigor, analytical reflexes, and defensive competencies that translate directly to industry and research.
          </p>
        </div>

        <div className="cyber-skills-grid">
          {skills.map((skill, index) => (
            <div key={index} className="cyber-skill-card">
              <span className="cyber-skill-indicator" />
              <span className="cyber-skill-name">{skill}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
