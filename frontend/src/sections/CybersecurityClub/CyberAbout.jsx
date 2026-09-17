import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function CyberAbout({ onOpenCharter }) {
  const pillars = [
    { num: '01', title: 'UNDERSTAND SYSTEMS & NETWORKS' },
    { num: '02', title: 'ANALYZE THREATS & ATTACK VECTORS' },
    { num: '03', title: 'DEFEND & HARDEN INFRASTRUCTURE' },
    { num: '04', title: 'RESPOND TO INCIDENTS RESPONSIBLY' }
  ];

  return (
    <section className="cyber-about-section" id="about">
      <div className="cyber-section-container">
        <div className="cyber-about-grid">
          {/* Left: About Text */}
          <div className="cyber-about-left">
            <span className="cyber-section-eyebrow">ABOUT CYBERSECURITY CLUB</span>
            <h2 className="cyber-about-heading">Understand The Threat.<br />Build The Defense.</h2>
            <div className="cyber-about-divider" />
            <p className="cyber-about-body">
              Cybersecurity Club is a practical learning community for students who want to understand how digital systems can be protected. Members explore security concepts, ethical hacking, networking, vulnerability analysis, and defensive techniques through structured activities and projects.
            </p>
            <p className="cyber-about-body">
              Whether you're completely new to cybersecurity or already exploring security tools and techniques, the club provides a space to learn, experiment responsibly, solve challenges, and build practical security skills.
            </p>
            <div className="cyber-about-action">
              <button
                type="button"
                className="cyber-link-btn"
                onClick={onOpenCharter}
              >
                <span>Our Responsible Charter</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>

          {/* Right: Numbered Pillars Box */}
          <div className="cyber-about-pillars">
            <div className="cyber-about-pillars-box">
              {pillars.map((pillar) => (
                <div key={pillar.num} className="cyber-about-pillar-item">
                  <span className="cyber-about-pillar-num">{pillar.num}</span>
                  <span className="cyber-about-pillar-title">{pillar.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
