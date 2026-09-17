import React, { useState } from 'react';
import { X, Search, Cpu, Radio, Zap, Activity, ArrowRight, ShieldCheck } from 'lucide-react';
import { navigate, scrollToSection } from '../../utils/router';

// 1. Overview Modal
export function IoTOverviewModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="iot-modal-overlay" onClick={onClose}>
      <div className="iot-modal-panel" onClick={(e) => e.stopPropagation()}>
        <div className="iot-modal-header">
          <div>
            <span className="iot-meta-label">
              <span className="iot-meta-dot" />
              NIELIT IOT CLUB
            </span>
            <h3 className="iot-modal-title">Connected Engineering Overview</h3>
          </div>
          <button className="iot-modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={16} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ background: '#181818', border: '1px solid var(--iot-dark-border)', borderRadius: 'var(--iot-radius-md)', padding: '16px' }}>
            <h4 style={{ fontSize: '15px', fontWeight: '700', color: '#ffffff', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Cpu size={16} color="var(--iot-orange)" />
              Hands-On Embedded Prototyping
            </h4>
            <p style={{ fontSize: '13px', lineHeight: '1.5', color: 'var(--iot-text-muted-dark)', margin: 0 }}>
              Work with sensors, microcontrollers (ESP32/STM32), wiring schematics, and analog/digital converter peripherals in structured workshops.
            </p>
          </div>

          <div style={{ background: '#181818', border: '1px solid var(--iot-dark-border)', borderRadius: 'var(--iot-radius-md)', padding: '16px' }}>
            <h4 style={{ fontSize: '15px', fontWeight: '700', color: '#ffffff', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Radio size={16} color="var(--iot-orange)" />
              Telemetry & Wireless Networking
            </h4>
            <p style={{ fontSize: '13px', lineHeight: '1.5', color: 'var(--iot-text-muted-dark)', margin: 0 }}>
              Learn how device data flows through Wi-Fi, Bluetooth LE, and MQTT broker channels to cloud servers and live user dashboards.
            </p>
          </div>

          <div style={{ background: '#181818', border: '1px solid var(--iot-dark-border)', borderRadius: 'var(--iot-radius-md)', padding: '16px' }}>
            <h4 style={{ fontSize: '15px', fontWeight: '700', color: '#ffffff', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Zap size={16} color="var(--iot-orange)" />
              Autonomous Closed-Loop Control
            </h4>
            <p style={{ fontSize: '13px', lineHeight: '1.5', color: 'var(--iot-text-muted-dark)', margin: 0 }}>
              Transform real-time sensor measurements into automated physical actuation via relays, motors, and intelligent rule engines.
            </p>
          </div>
        </div>

        <div style={{ marginTop: '24px' }}>
          <button
            type="button"
            className="iot-btn-primary"
            style={{ width: '100%', justifyContent: 'center' }}
            onClick={() => {
              onClose();
              navigate('/register?club=IoT');
            }}
          >
            <span>Register for IoT Club</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

// 2. Search Modal
export function IoTSearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const topics = [
    { title: 'The IoT Loop', section: 'hero', tags: 'Sense, Connect, Analyze, Act' },
    { title: 'System Architecture', section: 'about', tags: 'Physical to Digital, Telemetry' },
    { title: 'Five-Stage Pipeline', section: 'how-it-works', tags: 'Sense, Process, Connect, Analyze, Act' },
    { title: 'Learning Path', section: 'learning-path', tags: 'Electronics, Sensors, MCUs, Networks, Data' },
    { title: 'Hardware Lab', section: 'hardware-lab', tags: 'ESP32, Sensors, Actuators, Power, Transceivers' },
    { title: 'Connected Systems', section: 'systems', tags: 'Device to Cloud Network Architecture' },
    { title: 'IoT Toolkit', section: 'toolkit', tags: 'C/C++, Python, MQTT, APIs, InfluxDB' },
    { title: 'Project Ideas', section: 'projects', tags: 'Smart Home, Smart Agriculture, Environment' },
    { title: 'Capstone Project', section: 'capstone', tags: 'End-to-End Connected System Prototype' }
  ];

  const filtered = query.trim()
    ? topics.filter((t) =>
        t.title.toLowerCase().includes(query.toLowerCase()) ||
        t.tags.toLowerCase().includes(query.toLowerCase())
      )
    : topics;

  const handleSelect = (sectionId) => {
    onClose();
    scrollToSection(sectionId);
  };

  return (
    <div className="iot-modal-overlay" onClick={onClose}>
      <div className="iot-modal-panel" onClick={(e) => e.stopPropagation()}>
        <div className="iot-modal-header">
          <h3 className="iot-modal-title">Search IoT Club Topics</h3>
          <button className="iot-modal-close-btn" onClick={onClose} aria-label="Close search">
            <X size={16} />
          </button>
        </div>

        <div style={{ position: 'relative', marginBottom: '18px' }}>
          <Search size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#71717A' }} />
          <input
            type="text"
            placeholder="Search sensors, microcontrollers, protocols, projects..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 14px 12px 40px',
              background: '#1c1c1c',
              border: '1px solid var(--iot-dark-border)',
              borderRadius: 'var(--iot-radius-sm)',
              color: '#ffffff',
              fontSize: '14px',
              outline: 'none',
              boxSizing: 'border-box'
            }}
            autoFocus
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '300px', overflowY: 'auto' }}>
          {filtered.map((item) => (
            <button
              key={item.title}
              type="button"
              onClick={() => handleSelect(item.section)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 14px',
                background: '#181818',
                border: '1px solid var(--iot-dark-border)',
                borderRadius: 'var(--iot-radius-sm)',
                color: '#ffffff',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'border-color 150ms'
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--iot-orange)'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--iot-dark-border)'}
            >
              <div>
                <div style={{ fontSize: '14px', fontWeight: '700' }}>{item.title}</div>
                <div style={{ fontSize: '11.5px', color: '#71717A' }}>{item.tags}</div>
              </div>
              <ArrowRight size={14} color="var(--iot-orange)" />
            </button>
          ))}
          {filtered.length === 0 && (
            <p style={{ textAlign: 'center', color: '#71717A', padding: '20px' }}>
              No topics found matching "{query}".
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
