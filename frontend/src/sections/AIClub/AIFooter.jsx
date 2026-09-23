import React from 'react';
import logoImg from '../../assets/logoiconWhite.png';
import { navigate } from '../../utils/router';

export default function AIFooter() {
  const handleNav = (url) => {
    navigate(url);
  };

  return (
    <footer className="ai-footer-section" id="contact">
      <div className="ai-section-container">
        {/* Main Grid */}
        <div className="ai-footer-grid">
          {/* Brand Col */}
          <div className="ai-footer-brand-col">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                handleNav('/');
              }}
              className="ai-footer-brand-link"
              aria-label="NEXORA Tech Clubs Home"
            >
              <img
                src={logoImg}
                alt="NEXORA Logo"
                className="ai-footer-logo-img"
              />
            </a>
            <h3 className="ai-footer-brand-title">NEXORA TECH CLUBS</h3>
            <p className="ai-footer-tagline">LEARN. BUILD. LEAD.</p>
            <p className="ai-footer-desc">
              Where Ideas Become Innovation. A community of students exploring technology and innovation across AI,
              software, security, and hardware.
            </p>
          </div>

          {/* Quick Links */}
          <div className="ai-footer-col">
            <h4 className="ai-footer-col-title">QUICK LINKS</h4>
            <ul className="ai-footer-list">
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
                  Events
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleNav('#contact')}>
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Our Clubs */}
          <div className="ai-footer-col">
            <h4 className="ai-footer-col-title">OUR CLUBS</h4>
            <ul className="ai-footer-list">
              <li>
                <button
                  type="button"
                  className="ai-footer-active-link"
                  onClick={() => handleNav('/ai')}
                >
                  AI Club
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleNav('/programming')}>
                  Programming Club
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleNav('/cybersecurity')}>
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
          <div className="ai-footer-col ai-footer-col-institute">
            <h4 className="ai-footer-col-title">CONNECT</h4>
            <ul className="ai-footer-list">
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

            <div className="ai-footer-inst-note">
              <span className="ai-inst-name">
                NEXORA TECH CLUBS
              </span>
              <span className="ai-inst-sub">LEARN. BUILD. LEAD.</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="ai-footer-bottom">
          <p className="ai-footer-copy">
            © 2026 NEXORA Tech Clubs. All rights reserved.
          </p>
          <div className="ai-footer-legal-links">
            <button type="button" onClick={() => alert('NEXORA Tech Clubs Privacy Policy')}>
              Privacy
            </button>
            <span className="ai-legal-dot">•</span>
            <button type="button" onClick={() => alert('NEXORA Tech Clubs Terms')}>
              Terms
            </button>
            <span className="ai-legal-dot">•</span>
            <button type="button" onClick={() => alert('NEXORA Tech Clubs FAQs & Support')}>
              FAQs
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
