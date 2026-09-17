import React from 'react';
import { ArrowRight } from 'lucide-react';
import { navigate } from '../../utils/router';

export default function AIAbout({ onOpenVision }) {
  const pillars = [
    { num: '01', title: 'PRACTICAL LEARNING' },
    { num: '02', title: 'REAL PROJECTS' },
    { num: '03', title: 'SUPPORTIVE COMMUNITY' },
    { num: '04', title: 'A STRONGER TOMORROW' }
  ];

  return (
    <section className="ai-about-section" id="about">
      <div className="ai-section-container">
        <div className="ai-about-grid">
          {/* Left / Main Editorial Block */}
          <div className="ai-about-main">
            <span className="ai-section-eyebrow">ABOUT AI CLUB</span>
            <h2 className="ai-section-title-light">More Than Just Theory.</h2>
            <div className="ai-about-divider" />
            <p className="ai-about-body">
              AI Club is a hands-on learning community for students interested in
              Artificial Intelligence and its real-world applications. We focus on
              practical learning, collaborative projects, and giving students the
              space to experiment, make mistakes, and build something meaningful.
            </p>
            <div className="ai-about-action">
              <button
                type="button"
                className="ai-link-btn"
                onClick={onOpenVision}
              >
                <span>Our Vision</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>

          {/* Right: Numbered Pillars Statement */}
          <div className="ai-about-pillars">
            <div className="ai-pillars-list">
              {pillars.map((pillar) => (
                <div key={pillar.num} className="ai-pillar-item">
                  <span className="ai-pillar-num">{pillar.num}</span>
                  <div className="ai-pillar-line" />
                  <span className="ai-pillar-title">{pillar.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
