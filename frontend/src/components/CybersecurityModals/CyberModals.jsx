import React, { useState } from 'react';
import { X, Search, Shield, Terminal, BookOpen, AlertTriangle, ArrowRight, Play, CheckCircle } from 'lucide-react';
import { navigate } from '../../utils/router';

// 1. Overview Video / Tour Modal
export function CyberOverviewModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="cyber-modal-backdrop" onClick={onClose}>
      <div className="cyber-modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="cyber-modal-close-btn" onClick={onClose} aria-label="Close">
          <X size={16} />
        </button>

        <span className="cyber-section-eyebrow">NEXORA CYBERSECURITY CLUB</span>
        <h3 className="cyber-modal-title">Club Overview & Experience</h3>
        <p className="cyber-modal-subtitle">Defensive Security • Ethical Experimentation • Hands-On Labs</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--cyber-dark-border)', borderRadius: 'var(--cyber-radius-sm)', padding: '16px' }}>
            <h4 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--cyber-text-white)', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Shield size={16} color="var(--cyber-emerald)" />
              Weekly Hands-On Security Labs
            </h4>
            <p style={{ fontSize: '13px', lineHeight: '1.5', color: 'var(--cyber-text-muted-dark)' }}>
              Engage in guided laboratory exercises exploring network traffic analysis, web security testing, and system hardening in safe, isolated virtual environments.
            </p>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--cyber-dark-border)', borderRadius: 'var(--cyber-radius-sm)', padding: '16px' }}>
            <h4 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--cyber-text-white)', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Terminal size={16} color="var(--cyber-emerald)" />
              Internal CTF & Defense Challenges
            </h4>
            <p style={{ fontSize: '13px', lineHeight: '1.5', color: 'var(--cyber-text-muted-dark)' }}>
              Test your analytical abilities with category-based security challenges covering cryptography, forensics, network tracing, and incident remediation.
            </p>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--cyber-dark-border)', borderRadius: 'var(--cyber-radius-sm)', padding: '16px' }}>
            <h4 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--cyber-text-white)', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BookOpen size={16} color="var(--cyber-emerald)" />
              Collaborative Project Mentorship
            </h4>
            <p style={{ fontSize: '13px', lineHeight: '1.5', color: 'var(--cyber-text-muted-dark)' }}>
              Work in teams to develop open-source security utilities, log visualizers, and campus monitoring frameworks under senior peer guidance.
            </p>
          </div>
        </div>

        <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
          <button
            type="button"
            className="cyber-btn-primary"
            style={{ width: '100%', justifyContent: 'center' }}
            onClick={() => {
              onClose();
              navigate('/register?club=Cybersecurity');
            }}
          >
            <span>Join Cybersecurity Club →</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// 2. Full Curriculum Modal
export function CyberCurriculumModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const modules = [
    { title: 'Module 1: Cyber Fundamentals & Threat Landscape', duration: 'Weeks 1-2', topics: ['CIA Triad & Security Principles', 'Attack Surfaces & Threat Actors', 'Common Vulnerability Scoring (CVSS)', 'Security Hygiene & Ethics'] },
    { title: 'Module 2: Networking & Protocol Analysis', duration: 'Weeks 3-4', topics: ['OSI & TCP/IP Model In Depth', 'Wireshark Packet Capture & Tracing', 'DNS, HTTP/S, SSH & TLS Handshakes', 'Port Scanning & Reconnaissance with Nmap'] },
    { title: 'Module 3: Linux System Hardening', duration: 'Weeks 5-6', topics: ['Linux Permissions & Access Controls', 'Process & Service Auditing', 'Log Inspection & Syslog Analysis', 'Firewall Rules & iptables/UFW'] },
    { title: 'Module 4: Web Application Security', duration: 'Weeks 7-8', topics: ['OWASP Top 10 Deep Dive', 'SQL Injection & Prepared Statements', 'Cross-Site Scripting (XSS) & CSRF', 'Authentication & Session Hardening'] },
    { title: 'Module 5: Ethical Security Testing', duration: 'Weeks 9-10', topics: ['Vulnerability Assessment Workflows', 'Controlled Sandbox Reconnaissance', 'Burp Suite Proxy Basics', 'Responsible Vulnerability Reporting'] },
    { title: 'Module 6: Capstone Defense Project', duration: 'Weeks 11-12', topics: ['Threat Modeling & System Design', 'Automated Security Scripting (Python)', 'Incident Response Simulation', 'Presentation & Defensive Documentation'] },
  ];

  return (
    <div className="cyber-modal-backdrop" onClick={onClose}>
      <div className="cyber-modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="cyber-modal-close-btn" onClick={onClose} aria-label="Close">
          <X size={16} />
        </button>

        <span className="cyber-section-eyebrow">SYLLABUS & ROADMAP</span>
        <h3 className="cyber-modal-title">Comprehensive Learning Curriculum</h3>
        <p className="cyber-modal-subtitle">12-Week Structured Pathway from Fundamentals to Security Engineering</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '16px' }}>
          {modules.map((m, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid var(--cyber-dark-border)', borderRadius: 'var(--cyber-radius-sm)', padding: '14px 16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <h4 style={{ fontSize: '14.5px', fontWeight: '700', color: 'var(--cyber-text-white)' }}>{m.title}</h4>
                <span style={{ fontSize: '11px', color: 'var(--cyber-emerald)', fontFamily: 'monospace', fontWeight: '700' }}>{m.duration}</span>
              </div>
              <ul style={{ paddingLeft: '18px', margin: 0, fontSize: '12.5px', color: 'var(--cyber-text-muted-dark)', lineHeight: '1.6' }}>
                {m.topics.map((t, idx) => (
                  <li key={idx}>{t}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 3. Project Ideas Modal
export function CyberProjectIdeasModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const projects = [
    { title: 'Campus Network Log Analyzer', level: 'Beginner', desc: 'A Python tool that parses server access logs, flags anomalous IP bursts, and generates clean Markdown reports.' },
    { title: 'Automated Port & Service Auditor', level: 'Intermediate', desc: 'A modular CLI scanner that tests authorized test environments for unpatched services and insecure defaults.' },
    { title: 'Web Header Security Scanner', level: 'Intermediate', desc: 'An interactive inspector that checks HTTP security response headers (CSP, HSTS, X-Frame-Options) and scores compliance.' },
    { title: 'Incident Response Event Correlator', level: 'Advanced', desc: 'A lightweight defensive dashboard correlating auth failure logs across multiple virtual servers to detect brute-force attempts.' },
  ];

  return (
    <div className="cyber-modal-backdrop" onClick={onClose}>
      <div className="cyber-modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="cyber-modal-close-btn" onClick={onClose} aria-label="Close">
          <X size={16} />
        </button>

        <span className="cyber-section-eyebrow">PROJECT INSPIRATION</span>
        <h3 className="cyber-modal-title">Capstone & Defense Project Ideas</h3>
        <p className="cyber-modal-subtitle">Practical systems you can build and showcase in your portfolio</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '16px' }}>
          {projects.map((p, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--cyber-dark-border)', borderRadius: 'var(--cyber-radius-sm)', padding: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                <h4 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--cyber-text-white)' }}>{p.title}</h4>
                <span style={{ fontSize: '10.5px', padding: '2px 8px', borderRadius: 'var(--cyber-radius-pill)', background: 'rgba(16,185,129,0.1)', color: 'var(--cyber-emerald)', border: '1px solid rgba(16,185,129,0.3)', fontWeight: '700' }}>
                  {p.level}
                </span>
              </div>
              <p style={{ fontSize: '13px', lineHeight: '1.5', color: 'var(--cyber-text-muted-dark)' }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 4. Responsible Security Charter Modal
export function CyberResponsibleCharterModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="cyber-modal-backdrop" onClick={onClose}>
      <div className="cyber-modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="cyber-modal-close-btn" onClick={onClose} aria-label="Close">
          <X size={16} />
        </button>

        <span className="cyber-section-eyebrow">ETHICAL CHARTER</span>
        <h3 className="cyber-modal-title">Responsible Security Code</h3>
        <p className="cyber-modal-subtitle">Our commitment to ethical experimentation and digital safety</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '16px' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <CheckCircle size={18} color="var(--cyber-emerald)" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <strong style={{ color: '#fff', fontSize: '14px' }}>Explicit Authorization Only</strong>
              <p style={{ fontSize: '13px', color: 'var(--cyber-text-muted-dark)', marginTop: '2px' }}>
                Members must never test, probe, or scan systems without prior written authorization from system owners.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <CheckCircle size={18} color="var(--cyber-emerald)" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <strong style={{ color: '#fff', fontSize: '14px' }}>Isolated Sandbox Environments</strong>
              <p style={{ fontSize: '13px', color: 'var(--cyber-text-muted-dark)', marginTop: '2px' }}>
                All hands-on practice, attack simulations, and exploits are confined strictly to club-provided sandboxes and local virtual machines.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <CheckCircle size={18} color="var(--cyber-emerald)" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <strong style={{ color: '#fff', fontSize: '14px' }}>Privacy & Data Integrity</strong>
              <p style={{ fontSize: '13px', color: 'var(--cyber-text-muted-dark)', marginTop: '2px' }}>
                Respect the privacy of others and safeguard confidential information discovered during legitimate educational reviews.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <CheckCircle size={18} color="var(--cyber-emerald)" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <strong style={{ color: '#fff', fontSize: '14px' }}>Responsible Disclosure</strong>
              <p style={{ fontSize: '13px', color: 'var(--cyber-text-muted-dark)', marginTop: '2px' }}>
                Follow established ethical disclosure processes, giving maintainers reasonable time to patch vulnerabilities before public discussion.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 5. Global Search Modal
export function CyberSearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const searchableItems = [
    { title: 'System Status & Threat Overview', tag: 'Hero', href: '#hero' },
    { title: 'The Security Loop (Discover, Detect, Defend, Respond)', tag: 'Loop', href: '#security-loop' },
    { title: 'About Cybersecurity Club & Core Principles', tag: 'About', href: '#about' },
    { title: 'The Security Mindset (Understand, Question, Protect)', tag: 'Mindset', href: '#mindset' },
    { title: '7-Stage Learning Path (Basics to Capstone)', tag: 'Roadmap', href: '#learning-path' },
    { title: 'Hands-On Security Labs (Network, Web, System)', tag: 'Labs', href: '#hands-on' },
    { title: 'Security Toolkit (Linux, Wireshark, Nmap, Burp)', tag: 'Tools', href: '#toolkit' },
    { title: 'Threat vs Defense Matrix', tag: 'Architecture', href: '#threat-defense' },
    { title: 'Security Challenge Categories', tag: 'Challenges', href: '#challenges' },
    { title: 'Building Security Projects', tag: 'Projects', href: '#projects' },
    { title: 'Capstone: Campus Security Monitor', tag: 'Capstone', href: '#capstone' },
    { title: 'Responsible Security & Ethical Practice', tag: 'Charter', href: '#responsible' },
    { title: 'Skills You Will Build', tag: 'Skills', href: '#skills' },
    { title: 'Join Cybersecurity Club (Registration)', tag: 'Action', href: '/register?club=Cybersecurity' },
  ];

  const filtered = query.trim() === ''
    ? searchableItems
    : searchableItems.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.tag.toLowerCase().includes(query.toLowerCase())
      );

  return (
    <div className="cyber-modal-backdrop" onClick={onClose}>
      <div className="cyber-modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="cyber-modal-close-btn" onClick={onClose} aria-label="Close">
          <X size={16} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--cyber-dark-border)', borderRadius: 'var(--cyber-radius-sm)', padding: '10px 14px', marginBottom: '20px' }}>
          <Search size={18} color="var(--cyber-emerald)" />
          <input
            type="text"
            placeholder="Search topics, tools, modules, challenges..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            style={{ background: 'transparent', border: 'none', color: '#ffffff', width: '100%', outline: 'none', fontSize: '14.5px' }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '360px', overflowY: 'auto' }}>
          {filtered.map((item, index) => (
            <button
              key={index}
              type="button"
              onClick={() => {
                onClose();
                navigate(item.href);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 14px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid var(--cyber-dark-border)',
                borderRadius: 'var(--cyber-radius-sm)',
                color: '#ffffff',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.15s ease'
              }}
            >
              <span style={{ fontSize: '13.5px', fontWeight: '600' }}>{item.title}</span>
              <span style={{ fontSize: '11px', color: 'var(--cyber-emerald)', fontFamily: 'monospace', textTransform: 'uppercase' }}>
                {item.tag}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
