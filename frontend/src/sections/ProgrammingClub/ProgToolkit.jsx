import React from 'react';

export default function ProgToolkit() {
  const tools = [
    { name: 'Python', category: 'Language & Scripting' },
    { name: 'C++', category: 'Performance & Systems' },
    { name: 'Java', category: 'Enterprise & OOP' },
    { name: 'JavaScript', category: 'Web & Runtime' },
    { name: 'HTML', category: 'Semantic Structure' },
    { name: 'CSS', category: 'Layout & Styling' },
    { name: 'Git', category: 'Version Control' },
    { name: 'GitHub', category: 'Collaboration' },
    { name: 'SQL', category: 'Relational Data' }
  ];

  return (
    <section className="prog-toolkit-section" id="toolkit">
      <div className="prog-section-container">
        <div className="prog-toolkit-header">
          <div className="prog-section-eyebrow">YOUR TOOLKIT</div>
          <h2 className="prog-toolkit-heading">Learn The Tools.<br />Build With Them.</h2>
        </div>

        <div className="prog-toolkit-grid">
          {tools.map((t) => (
            <div key={t.name} className="prog-toolkit-cell">
              <span className="prog-toolkit-name">{t.name}</span>
              <span className="prog-toolkit-tag">{t.category}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
