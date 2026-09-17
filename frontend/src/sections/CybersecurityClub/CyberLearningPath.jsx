import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function CyberLearningPath({ onOpenCurriculum }) {
  const pathStages = [
    {
      num: '01',
      title: 'CYBER BASICS',
      desc: 'Understand cybersecurity principles, confidentiality-integrity-availability triad, terminology, and common threat classifications.'
    },
    {
      num: '02',
      title: 'NETWORKING',
      desc: 'Understand how devices, protocols and networks communicate through OSI layers, packet tracing, and socket analysis.'
    },
    {
      num: '03',
      title: 'LINUX & SYSTEMS',
      desc: 'Work directly with operating systems, user permissions, system daemons, syslog pipelines, and system-level security.'
    },
    {
      num: '04',
      title: 'WEB SECURITY',
      desc: 'Explore common web vulnerabilities (OWASP Top 10), SQL injection, cross-site scripting, and robust defensive practices.'
    },
    {
      num: '05',
      title: 'ETHICAL HACKING',
      desc: 'Learn how authorized security testing, vulnerability assessments, and sandbox evaluations identify weaknesses responsibly.'
    },
    {
      num: '06',
      title: 'DEFENSE',
      desc: 'Explore real-time monitoring, infrastructure hardening, firewall rule configuration, and systematic incident response.'
    },
    {
      num: '07',
      title: 'CAPSTONE',
      desc: 'Apply your cumulative knowledge to design, code, and deploy a practical security defensive tool or monitoring project.'
    }
  ];

  return (
    <section className="cyber-learning-section" id="learning-path">
      <div className="cyber-section-container">
        <div className="cyber-learning-header">
          <span className="cyber-section-eyebrow">STRUCTURED ROADMAP</span>
          <h2 className="cyber-section-title">From Fundamentals<br />To Security Engineering.</h2>
          <p className="cyber-section-desc">
            A progressive, seven-stage trajectory designed to take students from foundational concepts to advanced practical defensive engineering.
          </p>
        </div>

        <div className="cyber-path-list">
          <div className="cyber-path-line" />
          {pathStages.map((stage, index) => (
            <div key={index} className="cyber-path-item">
              <div className="cyber-path-num-badge">{stage.num}</div>
              <div className="cyber-path-card">
                <h3 className="cyber-path-stage-title">{stage.title}</h3>
                <p className="cyber-path-stage-desc">{stage.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <button
            type="button"
            className="cyber-about-btn"
            onClick={onOpenCurriculum}
            style={{ margin: '0 auto' }}
          >
            <span>View 12-Week Syllabus</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </section>
  );
}
