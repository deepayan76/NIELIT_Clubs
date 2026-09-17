import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function CyberPracticalLearning({ onOpenCurriculum }) {
  const lessons = [
    {
      num: '01',
      title: 'NETWORK ANALYSIS',
      theory: 'Understand OSI layers, packet routing, TLS handshakes, and protocol behavior.',
      practical: 'Capture live test network traffic in Wireshark and isolate unauthorized DNS & ARP queries.'
    },
    {
      num: '02',
      title: 'WEB SECURITY',
      theory: 'Understand how web applications, APIs, and auth tokens can become vulnerable.',
      practical: 'Audit intentionally vulnerable mock web endpoints for SQL injection, XSS, and CSRF flaws.'
    },
    {
      num: '03',
      title: 'SYSTEM HARDENING',
      theory: 'Learn how operating systems, user permissions, and daemons are secured against privilege escalation.',
      practical: 'Apply CIS benchmark configurations, audit active ports with Nmap, and enforce strict firewall rules.'
    },
    {
      num: '04',
      title: 'ETHICAL SECURITY TESTING',
      theory: 'Understand the methodology of authorized vulnerability assessments and threat modeling.',
      practical: 'Execute structured reconnaissance in sandbox environments and draft responsible disclosure reports.'
    },
    {
      num: '05',
      title: 'INCIDENT INVESTIGATION',
      theory: 'Learn how security breaches, credential abuse, and unauthorized intrusions are reconstructed.',
      practical: 'Analyze multi-node syslog dumps and correlate authentication failure timestamps to trace breach origins.'
    },
    {
      num: '06',
      title: 'DEFENSIVE AUTOMATION',
      theory: 'Use automated tooling and scripting pipelines to eliminate repetitive defensive tasks.',
      practical: 'Develop modular Python utilities to parse security logs and dispatch real-time firewall alert webhooks.'
    }
  ];

  return (
    <section className="cyber-practice-section" id="practice">
      <div className="cyber-section-container">
        <div className="cyber-practice-header">
          <div>
            <div className="cyber-section-eyebrow">PRACTICAL LEARNING</div>
            <h2 className="cyber-practice-heading">Inspect Traffic.<br />Break Safely.<br />Patch Strongly.</h2>
            <p className="cyber-practice-desc">
              Every laboratory activity gives students an opportunity to analyze real protocols, test defensive controls in isolated sandboxes, and build hands-on security intuition.
            </p>
          </div>
          <button
            type="button"
            className="cyber-btn-primary"
            onClick={onOpenCurriculum}
          >
            <span>View Full Curriculum</span>
            <ArrowRight size={15} />
          </button>
        </div>

        <div className="cyber-practice-grid">
          {lessons.map((item) => (
            <div key={item.num} className="cyber-practice-card">
              <div className="cyber-card-top">
                <span className="cyber-card-num">{item.num}</span>
              </div>
              <h3 className="cyber-card-title">{item.title}</h3>
              <p className="cyber-card-theory">{item.theory}</p>
              <div className="cyber-card-practical">
                <strong>Practical Task</strong>
                {item.practical}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
