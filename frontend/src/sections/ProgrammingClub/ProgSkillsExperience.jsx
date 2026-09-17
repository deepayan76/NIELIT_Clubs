import React from 'react';

export default function ProgSkillsExperience() {
  const skills = [
    'Programming Fundamentals',
    'Problem Solving',
    'Algorithms',
    'Project Development',
    'Version Control',
    'Collaboration'
  ];

  return (
    <section className="prog-skills-section" id="skills">
      <div className="prog-section-container">
        <div className="prog-skills-header">
          <div className="prog-section-eyebrow">SKILLS & EXPERIENCE</div>
          <h2 className="prog-skills-heading">More Than Just Writing Code.</h2>
          <p className="prog-skills-desc">
            Develop the technical and problem-solving skills needed to approach software development with confidence.
          </p>
        </div>

        <div className="prog-skills-grid">
          {skills.map((skill) => (
            <div key={skill} className="prog-skill-card">
              <div className="prog-skill-indicator" />
              <span className="prog-skill-name">{skill}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
