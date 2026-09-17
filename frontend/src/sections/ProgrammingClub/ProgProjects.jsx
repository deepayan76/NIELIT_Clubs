import React from 'react';

export default function ProgProjects() {
  const projectTypes = [
    {
      title: 'SMALL BUILDS',
      desc: 'Short projects designed to practice a specific programming concept.'
    },
    {
      title: 'TEAM PROJECTS',
      desc: 'Collaborative applications developed with other club members.'
    },
    {
      title: 'CHALLENGES',
      desc: 'Programming problems that test logic, algorithms and efficiency.'
    },
    {
      title: 'CAPSTONE',
      desc: 'A complete project that brings your learning together.'
    }
  ];

  return (
    <section className="prog-build-section" id="projects">
      <div className="prog-section-container">
        <div className="prog-build-header">
          <div className="prog-section-eyebrow">PROJECTS</div>
          <h2 className="prog-build-heading">From Small Programs<br />To Real Software.</h2>
        </div>

        <div className="prog-build-grid">
          {projectTypes.map((block) => (
            <div key={block.title} className="prog-build-block">
              <h3 className="prog-build-block-title">{block.title}</h3>
              <p className="prog-build-block-desc">{block.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
