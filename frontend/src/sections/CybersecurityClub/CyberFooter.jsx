import React from 'react';
import logoImg from '../../assets/logoiconWhite.png';
import { navigate, scrollToSection } from '../../utils/router';

export default function CyberFooter() {
  const handleNav = (url) => {
    if (url.startsWith('#')) {
      scrollToSection(url.substring(1));
    } else {
      navigate(url);
    }
  };

  return (
    <footer className="cyber-footer-section" id="contact">
      <div className="cyber-section-container">
        {/* Main Grid */}
        <div className="cyber-footer-grid">
          {/* Brand Col */}
          <div className="cyber-footer-brand-col">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                handleNav('/');
              }}
              className="cyber-footer-brand-link"
              aria-label="NEXORA Tech Clubs Home"
            >
              <img
                src={logoImg}
                alt="NEXORA Logo"
                className="cyber-footer-logo-img"
              />
            </a>
            <h3 className="cyber-footer-brand-title">NEXORA TECH CLUBS</h3>
            <p className="cyber-footer-tagline">Secure. Defend. Evolve.</p>
            <p className="cyber-footer-desc">
              A community of students exploring technology and innovation across cybersecurity, AI, software, and hardware.
            </p>
          </div>

          {/* Quick Links */}
          <div className="cyber-footer-col">
            <h4 className="cyber-footer-col-title">QUICK LINKS</h4>
            <ul className="cyber-footer-list">
              <li>
                <button type="button" onClick={() => handleNav('/')}>
                  Home
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleNav('#about')}>
                  About
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleNav('/#clubs')}>
                  Clubs
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleNav('#how-it-works')}>
                  How It Works
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleNav('#practice')}>
                  Practice & Labs
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleNav('/register?club=Cybersecurity')}>
                  Register
                </button>
              </li>
            </ul>
          </div>

          {/* Our Clubs */}
          <div className="cyber-footer-col">
            <h4 className="cyber-footer-col-title">OUR CLUBS</h4>
            <ul className="cyber-footer-list">
              <li>
                <button type="button" onClick={() => handleNav('/ai')}>
                  AI Club
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleNav('/programming')}>
                  Programming Club
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="cyber-footer-active-link"
                  onClick={() => handleNav('/cybersecurity')}
                >
                  Cybersecurity Club
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleNav('/iot')}>
                  IoT Club
                </button>
              </li>
            </ul>
          </div>

          {/* Connect & Institute */}
          <div className="cyber-footer-col cyber-footer-col-institute">
            <h4 className="cyber-footer-col-title">CONNECT</h4>
            <ul className="cyber-footer-list">
              <li>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                  GitHub ↗
                </a>
              </li>
              <li>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  LinkedIn ↗
                </a>
              </li>
              <li>
                <a href="https://discord.com" target="_blank" rel="noopener noreferrer">
                  Discord ↗
                </a>
              </li>
              <li>
                <a href="mailto:contact@nexoratech.org">Email Contact</a>
              </li>
            </ul>

            <div className="cyber-footer-inst-note">
              <span className="cyber-inst-name">
                NEXORA TECH CLUBS
              </span>
              <span className="cyber-inst-sub">LEARN. BUILD. LEAD.</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="cyber-footer-bottom">
          <p className="cyber-footer-copy">
            © 2026 NEXORA Tech Clubs. All rights reserved.
          </p>
          <div className="cyber-footer-legal-links">
            <button type="button" onClick={() => alert('NEXORA Cybersecurity Ethics & Privacy Policy')}>
              Privacy
            </button>
            <span className="cyber-legal-dot">•</span>
            <button type="button" onClick={() => alert('NEXORA Responsible Disclosure Policy')}>
              Responsible Security
            </button>
            <span className="cyber-legal-dot">•</span>
            <button type="button" onClick={() => alert('NEXORA Tech Clubs Terms')}>
              Terms
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
