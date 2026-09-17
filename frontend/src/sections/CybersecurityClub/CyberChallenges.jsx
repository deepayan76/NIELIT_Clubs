import React from 'react';

export default function CyberChallenges() {
  const challenges = [
    {
      cat: 'WEB',
      tag: 'APPLICATION',
      desc: 'Analyze insecure input handling, bypass broken auth controls, and discover hidden API vulnerabilities in safe mock targets.'
    },
    {
      cat: 'NETWORK',
      tag: 'PACKET TRACE',
      desc: 'Inspect raw PCAP network captures, follow protocol streams, and extract concealed payloads transmitted across test subnets.'
    },
    {
      cat: 'SYSTEM',
      tag: 'PRIVILEGE & DAEMON',
      desc: 'Audit vulnerable Linux and container configurations to discover permission escalations and unquoted service paths.'
    },
    {
      cat: 'CRYPTO',
      tag: 'ALGORITHMS',
      desc: 'Understand the mechanics of hashing, symmetric and asymmetric ciphers, and identify flaws in weak implementation keys.'
    },
    {
      cat: 'FORENSICS',
      tag: 'EVIDENCE AUDIT',
      desc: 'Analyze memory dumps, file metadata, and deleted artifacts to reconstruct attacker activity timelines.'
    },
    {
      cat: 'RESPONSE',
      tag: 'CONTAINMENT',
      desc: 'Isolate compromised sandbox machines, revoke active credentials, patch breach entry vectors, and harden defenses.'
    }
  ];

  return (
    <section className="cyber-challenges-section" id="challenges">
      <div className="cyber-section-container">
        <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto' }}>
          <span className="cyber-section-eyebrow">CTF & PRACTICE CATEGORIES</span>
          <h2 className="cyber-section-title" style={{ color: 'var(--cyber-text-dark)' }}>
            Test What You Know.
          </h2>
          <p className="cyber-section-desc" style={{ color: 'var(--cyber-text-muted-light)' }}>
            Challenge-based problem sets designed to build deep forensic intuition, reverse engineering skills, and defensive reflexes.
          </p>
        </div>

        <div className="cyber-challenges-grid">
          {challenges.map((c, i) => (
            <div key={i} className="cyber-challenge-card">
              <div className="cyber-challenge-header">
                <h3 className="cyber-challenge-cat">{c.cat}</h3>
                <span className="cyber-challenge-tag">{c.tag}</span>
              </div>
              <p className="cyber-challenge-desc">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
