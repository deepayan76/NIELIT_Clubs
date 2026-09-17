import React from 'react';

export default function CyberHowItWorks() {
  const stages = [
    {
      num: '01',
      title: 'DISCOVER',
      desc: 'Understand systems, networks and potential attack surfaces before threats emerge.'
    },
    {
      num: '02',
      title: 'DETECT',
      desc: 'Identify suspicious activity, anomalies, and structural security weaknesses.'
    },
    {
      num: '03',
      title: 'DEFEND',
      desc: 'Apply hardening techniques, firewall policies, and defenses that reduce risk.'
    },
    {
      num: '04',
      title: 'RESPOND',
      desc: 'Investigate incidents, reconstruct breach logs, and develop resilient responses.'
    },
    {
      num: '05',
      title: 'CAPSTONE',
      desc: 'Apply your cumulative defensive skills to build a complete security system.'
    }
  ];

  return (
    <section className="cyber-how-section" id="how-it-works">
      <div className="cyber-section-container">
        <div className="cyber-how-header">
          <div className="cyber-section-eyebrow">HOW IT WORKS</div>
          <h2 className="cyber-how-heading">From Threat To Resilience.</h2>
          <p className="cyber-how-desc">
            A continuous, systematic security loop that takes students from discovering network fundamentals to engineering resilient defensive architectures.
          </p>
        </div>

        <div className="cyber-how-stages-wrapper">
          <div className="cyber-how-line" />
          <div className="cyber-how-stages">
            {stages.map((st) => (
              <div key={st.num} className="cyber-how-stage">
                <div className="cyber-how-marker">{st.num}</div>
                <h3 className="cyber-how-stage-title">{st.title}</h3>
                <p className="cyber-how-stage-desc">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
