import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function CyberThreatDefense() {
  const pairs = [
    {
      threat: 'Reconnaissance & Asset Probing',
      threatTag: 'ATTACK SURFACE',
      defense: 'Visibility & Asset Inventory',
      defenseTag: 'PROACTIVE DEFENSE'
    },
    {
      threat: 'Insecure Default Configurations',
      threatTag: 'MISCONFIGURATION',
      defense: 'System Hardening & CIS Baselines',
      defenseTag: 'RESILIENCE'
    },
    {
      threat: 'Exploitation of Unpatched Code',
      threatTag: 'VULNERABILITY',
      defense: 'Secure Coding & Patch Pipelines',
      defenseTag: 'MITIGATION'
    },
    {
      threat: 'Credential Abuse & Hijacking',
      threatTag: 'UNAUTHORIZED ACCESS',
      defense: 'MFA & Least-Privilege IAM',
      defenseTag: 'ACCESS CONTROL'
    },
    {
      threat: 'Data Exfiltration & Tampering',
      threatTag: 'INTEGRITY BREACH',
      defense: 'End-to-End Encryption & Auditing',
      defenseTag: 'INTEGRITY'
    }
  ];

  return (
    <section className="cyber-threat-defense-section" id="threat-defense">
      <div className="cyber-section-container">
        <div className="cyber-threat-defense-header">
          <div className="cyber-section-eyebrow" style={{ justifyContent: 'center' }}>DEFENSIVE DUALITY</div>
          <h2 className="cyber-toolkit-heading" style={{ textAlign: 'center', marginBottom: '14px' }}>
            Understand The Attack.<br />Build The Defense.
          </h2>
          <p className="cyber-how-desc" style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto' }}>
            Defenders must understand offensive methodology to engineer architectures that reliably detect and mitigate adversarial behavior.
          </p>
        </div>

        <div className="cyber-split-threat-defense">
          {/* Left: Threat Vectors */}
          <div className="cyber-threat-col">
            <div className="cyber-split-col-header">THREAT VECTORS</div>
            {pairs.map((p, i) => (
              <div key={i} className="cyber-split-item">
                <span className="cyber-split-title">{p.threat}</span>
                <span className="cyber-split-tag">{p.threatTag}</span>
              </div>
            ))}
          </div>

          {/* Center: Connectors */}
          <div className="cyber-split-connectors" aria-hidden="true">
            {pairs.map((_, i) => (
              <div key={i} className="cyber-connector-arrow">
                <ArrowRight size={18} />
              </div>
            ))}
          </div>

          {/* Right: Defensive Countermeasures */}
          <div className="cyber-defense-col">
            <div className="cyber-split-col-header">DEFENSIVE COUNTERMEASURES</div>
            {pairs.map((p, i) => (
              <div key={i} className="cyber-split-item">
                <span className="cyber-split-title">{p.defense}</span>
                <span className="cyber-split-tag" style={{ color: 'var(--cyber-emerald)' }}>
                  {p.defenseTag}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
