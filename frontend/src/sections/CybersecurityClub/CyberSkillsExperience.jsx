import React from 'react';

export default function CyberSkillsExperience() {
  const skills = [
    {
      title: 'SECURITY FUNDAMENTALS',
      desc: 'Master core principles of confidentiality, integrity, availability, threat modeling, and defensive attack surface management.'
    },
    {
      title: 'NETWORKING & PACKETS',
      desc: 'Analyze live packet streams, trace TLS handshakes, and debug protocol behavior using Wireshark and socket analyzers.'
    },
    {
      title: 'LINUX & HARDENING',
      desc: 'Administer Linux distributions, manage user privileges, configure daemons, and enforce strict iptables/UFW firewall rules.'
    },
    {
      title: 'WEB APP SECURITY',
      desc: 'Identify, exploit, and remediate OWASP Top 10 vulnerabilities including SQL injection, cross-site scripting, and broken authentication.'
    },
    {
      title: 'INCIDENT RESPONSE',
      desc: 'Parse complex authentication logs, trace intrusion timelines, isolate compromised nodes, and draft incident post-mortems.'
    },
    {
      title: 'PYTHON & AUTOMATION',
      desc: 'Build modular defensive utilities, automated port scanners, log visualizers, and alerting pipelines using Python.'
    }
  ];

  return (
    <section className="cyber-skills-section" id="skills">
      <div className="cyber-section-container">
        <div className="cyber-skills-header">
          <div className="cyber-section-eyebrow" style={{ justifyContent: 'center' }}>SKILLS & EXPERIENCE</div>
          <h2 className="cyber-toolkit-heading" style={{ textAlign: 'center', color: 'var(--cyber-text-dark)', marginBottom: '14px' }}>
            Skills You'll Actually Use.
          </h2>
          <p className="cyber-how-desc" style={{ textAlign: 'center', color: 'var(--cyber-text-muted-light)', maxWidth: '640px', margin: '0 auto' }}>
            Practical engineering competencies and analytical reflexes that directly translate to security research, certifications, and industry careers.
          </p>
        </div>

        <div className="cyber-skills-grid">
          {skills.map((s) => (
            <div key={s.title} className="cyber-skill-card">
              <div className="cyber-skill-header">
                <span className="cyber-skill-indicator" />
                <h3 className="cyber-skill-name">{s.title}</h3>
              </div>
              <p className="cyber-skill-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
