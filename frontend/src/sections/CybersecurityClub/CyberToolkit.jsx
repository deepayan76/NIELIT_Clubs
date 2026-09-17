import React from 'react';

export default function CyberToolkit() {
  const tools = [
    { name: 'Linux', tag: 'SYSTEMS' },
    { name: 'Wireshark', tag: 'PACKET ANALYSIS' },
    { name: 'Nmap', tag: 'PORT AUDITING' },
    { name: 'Burp Suite', tag: 'WEB PROXY' },
    { name: 'Python', tag: 'AUTOMATION' },
    { name: 'Git & GitHub', tag: 'COLLABORATION' },
    { name: 'OWASP', tag: 'FRAMEWORKS' },
    { name: 'Docker', tag: 'SANDBOX LABS' }
  ];

  return (
    <section className="cyber-toolkit-section" id="toolkit">
      <div className="cyber-section-container">
        <div className="cyber-toolkit-header">
          <div className="cyber-section-eyebrow">SECURITY TOOLKIT</div>
          <h2 className="cyber-toolkit-heading">Tools Are Only As Good<br />As The Person Using Them.</h2>
        </div>

        <div className="cyber-toolkit-grid">
          {tools.map((t) => (
            <div key={t.name} className="cyber-toolkit-cell">
              <span className="cyber-toolkit-name">{t.name}</span>
              <span className="cyber-toolkit-tag">{t.tag}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
