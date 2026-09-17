import React from 'react';

export default function CyberMindset() {
  const mindsetStages = [
    {
      step: 'STAGE 01',
      title: 'UNDERSTAND',
      desc: 'Master the architectural foundations of operating systems, network protocols, memory management, and access controls.'
    },
    {
      step: 'STAGE 02',
      title: 'QUESTION',
      desc: 'Probe assumptions, identify unstated trust boundaries, and analyze potential failure points before attackers do.'
    },
    {
      step: 'STAGE 03',
      title: 'PROTECT',
      desc: 'Engineer resilient defensive systems, automate monitoring pipelines, and implement principle of least privilege.'
    }
  ];

  return (
    <section className="cyber-mindset-section" id="mindset">
      <div className="cyber-section-container">
        <div className="cyber-mindset-header">
          <span className="cyber-section-eyebrow">THE SECURITY MINDSET</span>
          <h2 className="cyber-section-title">Think Like A Defender.</h2>
          <p className="cyber-section-desc">
            Cybersecurity is not only about finding vulnerabilities. It is about understanding systems, anticipating threats, reducing risk, and building stronger defenses.
          </p>
        </div>

        <div className="cyber-mindset-triad">
          {mindsetStages.map((stage, index) => (
            <div key={index} className="cyber-mindset-card">
              <span className="cyber-mindset-step">{stage.step}</span>
              <h3 className="cyber-mindset-title">{stage.title}</h3>
              <p className="cyber-mindset-desc">{stage.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
