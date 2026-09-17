import React, { useState } from 'react';

export default function AIHowItWorks() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      num: '01',
      title: 'LEARN',
      desc: 'Focused technical topics with explanations and demonstrations.'
    },
    {
      num: '02',
      title: 'PRACTICE',
      desc: 'Hands-on exercises, coding tasks and guided challenges.'
    },
    {
      num: '03',
      title: 'EXPLORE',
      desc: 'Experiment with tools, datasets and ideas.'
    },
    {
      num: '04',
      title: 'BUILD',
      desc: 'Create prototypes and small applications.'
    },
    {
      num: '05',
      title: 'CAPSTONE',
      desc: 'Apply everything in a larger real-world project.'
    }
  ];

  return (
    <section className="ai-how-section" id="how-it-works">
      <div className="ai-section-container">
        {/* Header Block */}
        <div className="ai-section-header-dark">
          <span className="ai-section-eyebrow-dark">HOW IT WORKS</span>
          <h2 className="ai-section-title-dark">From Learning To Impact.</h2>
          <p className="ai-section-subtitle-dark">
            A structured journey that takes you from understanding the basics to
            creating real-world AI solutions.
          </p>
        </div>

        {/* 5-Step Horizontal Process with Connecting Emerald Line */}
        <div className="ai-how-track-wrapper">
          <div className="ai-how-connecting-line" />
          <div className="ai-how-steps-grid">
            {steps.map((step, idx) => {
              const isActive = activeStep === idx;
              return (
                <div
                  key={step.num}
                  className={`ai-how-step-col ${isActive ? 'is-active' : ''}`}
                  onMouseEnter={() => setActiveStep(idx)}
                  tabIndex={0}
                  onFocus={() => setActiveStep(idx)}
                >
                  <div className="ai-how-marker-wrap">
                    <div className="ai-how-marker">
                      <span className="ai-marker-num">{step.num}</span>
                    </div>
                  </div>
                  <div className="ai-how-step-content">
                    <h3 className="ai-how-step-title">{step.title}</h3>
                    <p className="ai-how-step-desc">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
