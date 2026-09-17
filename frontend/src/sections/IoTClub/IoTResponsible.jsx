import React from 'react';
import { ShieldCheck, Lock, ShieldAlert, CheckCircle2 } from 'lucide-react';

export default function IoTResponsible() {
  const principles = [
    {
      title: 'SAFETY',
      desc: 'Physical fail-safes, thermal limit monitoring, proper fuse protections, and galvanic isolation for all electrical components.',
      icon: <ShieldCheck size={20} />
    },
    {
      title: 'PRIVACY',
      desc: 'Local edge data processing, strict sensor data minimization, encryption in transit, and explicit user consent boundaries.',
      icon: <Lock size={20} />
    },
    {
      title: 'SECURITY',
      desc: 'Encrypted firmware updates (OTA), unique device authentication tokens, secure MQTT credentials, and port hardening.',
      icon: <ShieldAlert size={20} />
    },
    {
      title: 'RELIABILITY',
      desc: 'Hardware watchdog timers, automatic reconnection back-off strategies, power outage recovery, and memory leak prevention.',
      icon: <CheckCircle2 size={20} />
    }
  ];

  return (
    <section className="iot-responsible-section" id="responsible">
      <div className="iot-section-container">
        <div className="iot-section-header">
          <span className="iot-meta-label">
            <span className="iot-meta-dot" />
            BUILD RESPONSIBLY
          </span>
          <h2 className="iot-section-title dark-text">Responsible Hardware & Connected Systems</h2>
          <p className="iot-section-subtitle muted-light">
            Connected technology directly affects the physical world. Learn to design systems with safety, privacy, security, and reliability engineered from day one.
          </p>
        </div>

        <div className="iot-responsible-grid">
          {principles.map((p) => (
            <div className="iot-resp-card" key={p.title}>
              <h3 className="iot-resp-title">{p.title}</h3>
              <p className="iot-resp-desc">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
