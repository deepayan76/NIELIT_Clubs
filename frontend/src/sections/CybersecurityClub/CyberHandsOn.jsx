import React from 'react';

export default function CyberHandsOn() {
  const modules = [
    {
      num: '01',
      title: 'NETWORK ANALYSIS',
      concept: 'Understand traffic, protocols and network behaviour.',
      practical: 'Inspect controlled network traffic and identify unusual packet patterns with Wireshark.'
    },
    {
      num: '02',
      title: 'WEB SECURITY',
      concept: 'Understand how web applications and APIs can become vulnerable to exploitation.',
      practical: 'Explore common vulnerabilities in intentionally vulnerable sandbox environments.'
    },
    {
      num: '03',
      title: 'SYSTEM SECURITY',
      concept: 'Learn how operating systems and system services can be hardened and protected.',
      practical: 'Identify configuration weaknesses and apply defensive improvements on Linux nodes.'
    },
    {
      num: '04',
      title: 'ETHICAL HACKING',
      concept: 'Understand how authorized security testing and evaluation workflows work.',
      practical: 'Perform controlled reconnaissance and vulnerability assessment on authorized targets.'
    },
    {
      num: '05',
      title: 'INCIDENT RESPONSE',
      concept: 'Learn how security breaches and unauthorized events can be investigated.',
      practical: 'Analyze syslog dumps and reconstruct timeline sequences of controlled security incidents.'
    },
    {
      num: '06',
      title: 'SECURITY AUTOMATION',
      concept: 'Use scripts and automated tools to improve repetitive security workflows.',
      practical: 'Build small defensive utilities, log parsers, and automation scripts using Python.'
    }
  ];

  return (
    <section className="cyber-handson-section" id="hands-on">
      <div className="cyber-section-container">
        <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto' }}>
          <span className="cyber-section-eyebrow">LABORATORY PRACTICE</span>
          <h2 className="cyber-section-title">Learn By Investigating.</h2>
          <p className="cyber-section-desc">
            Security becomes easier to understand when concepts are connected to real systems, controlled experiments, and practical challenges.
          </p>
        </div>

        <div className="cyber-handson-grid">
          {modules.map((m, i) => (
            <div key={i} className="cyber-handson-card">
              <div className="cyber-handson-top">
                <h3 className="cyber-handson-title">{m.title}</h3>
                <span className="cyber-handson-num">MOD {m.num}</span>
              </div>
              <p className="cyber-handson-concept">{m.concept}</p>
              <div className="cyber-handson-practical">
                <span className="cyber-practical-label">PRACTICAL LAB:</span>
                <span className="cyber-practical-text">{m.practical}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
