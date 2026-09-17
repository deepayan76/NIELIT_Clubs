import React from 'react';

export default function CyberSecurityLoop() {
  const loopStages = [
    {
      num: '01',
      name: 'DISCOVER',
      desc: 'Understand systems, networks and potential attack surfaces before threats emerge.'
    },
    {
      num: '02',
      name: 'DETECT',
      desc: 'Identify suspicious activity, anomalies, and structural security weaknesses.'
    },
    {
      num: '03',
      name: 'DEFEND',
      desc: 'Apply hardening techniques, firewall policies, and defenses that reduce system risk.'
    },
    {
      num: '04',
      name: 'RESPOND',
      desc: 'Investigate incidents, reconstruct breach logs, and develop resilient responses.'
    }
  ];

  return (
    <section className="cyber-loop-section" id="security-loop">
      <div className="cyber-section-container">
        <div className="cyber-loop-header">
          <span className="cyber-section-eyebrow">CONTINUOUS RESILIENCE</span>
          <h2 className="cyber-section-title">The Security Loop</h2>
          <p className="cyber-section-desc">
            Cybersecurity is not a one-time setup—it is a continuous systematic cycle of discovery, detection, defense, and response.
          </p>
        </div>

        <div className="cyber-loop-grid">
          {loopStages.map((stage, index) => (
            <div key={index} className="cyber-loop-card">
              <span className="cyber-loop-num">{stage.num}</span>
              <h3 className="cyber-loop-name">{stage.name}</h3>
              <p className="cyber-loop-desc">{stage.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
