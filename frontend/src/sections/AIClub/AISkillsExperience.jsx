import React from 'react';
import {
  Code2,
  Cpu,
  FolderGit2,
  Users,
  FlaskConical,
  TrendingUp
} from 'lucide-react';

export default function AISkillsExperience() {
  const items = [
    {
      title: 'Technical Skills',
      desc: 'Master real programming paradigms, data pipelines, model building, and evaluation.',
      icon: Code2
    },
    {
      title: 'Problem Solving',
      desc: 'Deconstruct complex real-world challenges into structured mathematical & algorithmic models.',
      icon: Cpu
    },
    {
      title: 'Project Experience',
      desc: 'Build a tangible portfolio of deployed applications rather than just theoretical notes.',
      icon: FolderGit2
    },
    {
      title: 'Collaboration',
      desc: 'Work in agile student squads, brainstorm architectures, and review code together.',
      icon: Users
    },
    {
      title: 'Experimentation',
      desc: 'Safe laboratory sandbox to test bold ideas, fail fast, debug, and iterate.',
      icon: FlaskConical
    },
    {
      title: 'Career Growth',
      desc: 'Gain industry-relevant practical confidence and hackathon-ready experience.',
      icon: TrendingUp
    }
  ];

  return (
    <section className="ai-skills-section" id="skills">
      <div className="ai-section-container">
        {/* Header */}
        <div className="ai-section-header-dark">
          <span className="ai-section-eyebrow-dark">SKILLS & EXPERIENCE</span>
          <h2 className="ai-section-title-dark">More Than A Certificate.</h2>
          <p className="ai-section-subtitle-dark">
            Gain practical skills, real project experience and a supportive
            community that helps you grow.
          </p>
        </div>

        {/* 6 Clean Items Grid */}
        <div className="ai-skills-grid">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="ai-skill-item">
                <div className="ai-skill-icon-wrap">
                  <Icon size={20} className="ai-skill-icon" strokeWidth={1.75} />
                </div>
                <div className="ai-skill-text">
                  <h3 className="ai-skill-title">{item.title}</h3>
                  <p className="ai-skill-desc">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
