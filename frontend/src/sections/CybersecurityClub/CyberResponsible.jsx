import React from 'react';

export default function CyberResponsible() {
  const pillars = [
    {
      title: 'AUTHORIZED',
      desc: 'Only test systems when you have explicit, documented permission from system owners.'
    },
    {
      title: 'CONTROLLED',
      desc: 'Perform simulations inside isolated labs, sandboxes, and intentionally vulnerable environments.'
    },
    {
      title: 'RESPONSIBLE',
      desc: 'Handle security findings with absolute discretion and adhere to strict disclosure protocols.'
    },
    {
      title: 'RESPECTFUL',
      desc: 'Safeguard user privacy, maintain system integrity, and prevent disruptive or harmful actions.'
    }
  ];

  return (
    <section className="cyber-responsible-section" id="responsible">
      <div className="cyber-section-container">
        <div className="cyber-responsible-header">
          <div className="cyber-section-eyebrow" style={{ justifyContent: 'center' }}>ETHICAL COMMITMENT</div>
          <h2 className="cyber-toolkit-heading" style={{ textAlign: 'center', color: 'var(--cyber-text-dark)', marginBottom: '14px' }}>
            Learn To Hack Responsibly.
          </h2>
          <p className="cyber-how-desc" style={{ textAlign: 'center', color: 'var(--cyber-text-muted-light)', maxWidth: '640px', margin: '0 auto' }}>
            Cybersecurity learning should always happen within authorized, controlled environments. The club focuses on ethical experimentation, responsible disclosure, respect for privacy, and safe security practice.
          </p>
        </div>

        <div className="cyber-responsible-grid">
          {pillars.map((p) => (
            <div key={p.title} className="cyber-resp-card">
              <h3 className="cyber-resp-pillar">{p.title}</h3>
              <p className="cyber-resp-desc">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
