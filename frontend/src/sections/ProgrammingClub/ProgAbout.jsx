import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function ProgAbout({ onOpenVision }) {
  const pillars = [
    { num: '01', title: 'STRONG FOUNDATIONS' },
    { num: '02', title: 'PROBLEM SOLVING' },
    { num: '03', title: 'PRACTICAL CODING' },
    { num: '04', title: 'PROJECT EXPERIENCE' }
  ];

  return (
    <section className="prog-about-section" id="about">
      <div className="prog-section-container">
        <div className="prog-about-grid">
          {/* Left: Editorial Copy */}
          <div>
            <div className="prog-section-eyebrow">ABOUT PROGRAMMING CLUB</div>
            <h2 className="prog-about-heading">Learn To Think In Code.</h2>
            <p className="prog-about-text">
              Programming Club is a hands-on community for students who want to understand how software is built and how problems can be solved through code. The club focuses on strong fundamentals, logical thinking, practical programming, and collaborative project development.
            </p>
            <p className="prog-about-text">
              Whether you're writing your first program or already solving programming challenges, the club provides a space to practice, experiment, learn from others, and build useful software.
            </p>
            <button
              type="button"
              className="prog-btn-primary prog-about-btn"
              onClick={onOpenVision}
            >
              <span>Our Vision</span>
              <ArrowRight size={15} />
            </button>
          </div>

          {/* Right: Numbered Pillars */}
          <div className="prog-about-list">
            {pillars.map((p) => (
              <div key={p.num} className="prog-about-item">
                <span className="prog-about-num">{p.num}</span>
                <span className="prog-about-item-title">{p.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
