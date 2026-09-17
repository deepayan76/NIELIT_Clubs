import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function CyberCapstone({ onExploreProjects }) {
  const capStages = [
    { num: '01', title: 'IDENTIFY', text: 'Choose a security challenge, threat model, or vulnerable workflow to defend.' },
    { num: '02', title: 'INVESTIGATE', text: 'Map attack surfaces, analyze protocol dependencies, and inspect threat behaviors.' },
    { num: '03', title: 'BUILD', text: 'Develop defensive software, monitoring pipelines, and verification test suites.' },
    { num: '04', title: 'DEMONSTRATE', text: 'Audit resilience, document findings, and present the completed project.' }
  ];

  const exampleTech = ['Python', 'Linux', 'Networking', 'Web APIs', 'SQL', 'Git'];

  return (
    <section className="cyber-capstone-section" id="capstone">
      <div className="cyber-section-container">
        <div className="cyber-capstone-grid">
          {/* Left: Capstone Framework */}
          <div className="cyber-capstone-left">
            <div className="cyber-section-eyebrow">CAPSTONE</div>
            <h2 className="cyber-capstone-heading">Turn Security Knowledge<br />Into A Real System.</h2>
            <p className="cyber-capstone-desc">
              The capstone brings together networking, systems, web security, analysis, automation and defensive thinking into a practical, demonstrable security project.
            </p>

            <div className="cyber-capstone-stages">
              {capStages.map((s) => (
                <div key={s.num} className="cyber-capstone-stage-card">
                  <div className="cyber-capstone-stage-num">{s.num}</div>
                  <h3 className="cyber-capstone-stage-title">{s.title}</h3>
                  <p className="cyber-capstone-stage-text">{s.text}</p>
                </div>
              ))}
            </div>

            <button
              type="button"
              className="cyber-btn-primary"
              onClick={onExploreProjects}
            >
              <span>Explore Project Ideas</span>
              <ArrowRight size={15} />
            </button>
          </div>

          {/* Right: Featured Capstone Box */}
          <div className="cyber-example-project-box">
            <div className="cyber-example-eyebrow">EXAMPLE PROJECT</div>
            <h3 className="cyber-example-title">Campus Security Monitor</h3>
            <p className="cyber-example-desc">
              A learning-focused system for collecting and visualizing security events from controlled campus or laboratory environments. Includes real-time port auditing, syslog anomaly detection, and automated containment alert webhooks.
            </p>
            <div className="cyber-example-tech">
              {exampleTech.map((t) => (
                <span key={t} className="cyber-tech-pill">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
