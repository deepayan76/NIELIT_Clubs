import React from 'react';

export default function CyberProjects() {
  const projectTypes = [
    {
      title: 'SMALL BUILDS',
      desc: 'Short scripts, port auditors, and single-purpose utilities designed to practice a specific security concept.'
    },
    {
      title: 'TEAM PROJECTS',
      desc: 'Multi-node defensive monitoring frameworks and log analyzers built collaboratively with other club members.'
    },
    {
      title: 'CTF CHALLENGES',
      desc: 'Structured problem sets covering reverse engineering, packet forensics, web attacks, and cryptography.'
    },
    {
      title: 'CAPSTONE DEFENSE',
      desc: 'A complete, demonstrable security project that brings your learning, analysis, and engineering together.'
    }
  ];

  return (
    <section className="cyber-build-section" id="projects">
      <div className="cyber-section-container">
        <div className="cyber-build-header">
          <div className="cyber-section-eyebrow">WHAT YOU'LL BUILD</div>
          <h2 className="cyber-build-heading">From Small Utilities<br />To Real Defensive Systems.</h2>
        </div>

        <div className="cyber-build-grid">
          {projectTypes.map((block) => (
            <div key={block.title} className="cyber-build-block">
              <h3 className="cyber-build-block-title">{block.title}</h3>
              <p className="cyber-build-block-desc">{block.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
