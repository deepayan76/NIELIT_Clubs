import React from 'react';
import logoImg from '../../assets/logoiconWhite.png';
import { navigate } from '../../utils/router';

export default function ProgFooter() {
  const handleNav = (url) => {
    navigate(url);
  };

  return (
    <footer className="prog-footer-section" id="contact">
      <div className="prog-section-container">
        {/* Main Grid */}
        <div className="prog-footer-grid">
          {/* Brand Col */}
          <div className="prog-footer-brand-col">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                handleNav('/');
              }}
              className="prog-footer-brand-link"
              aria-label="NEXORA Tech Clubs Home"
            >
              <img
                src={logoImg}
                alt="NEXORA Logo"
                className="prog-footer-logo-img"
              />
            </a>
            <h3 className="prog-footer-brand-title">NEXORA TECH CLUBS</h3>
            <p className="prog-footer-tagline">LEARN. BUILD. LEAD.</p>
            <p className="prog-footer-desc">
              Where Ideas Become Innovation. A community of students exploring technology and innovation across programming, AI, security, and hardware.
            </p>
          </div>

          {/* Quick Links */}
          <div className="prog-footer-col">
            <h4 className="prog-footer-col-title">QUICK LINKS</h4>
            <ul className="prog-footer-list">
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
          <div className="prog-footer-col">
            <h4 className="prog-footer-col-title">OUR CLUBS</h4>
            <ul className="prog-footer-list">
              <li>
                <button type="button" onClick={() => handleNav('/ai')}>
                  AI Club
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="prog-footer-active-link"
                  onClick={() => handleNav('/programming')}
                >
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
          <div className="prog-footer-col prog-footer-col-institute">
            <h4 className="prog-footer-col-title">CONNECT</h4>
            <ul className="prog-footer-list">
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

            <div className="prog-footer-inst-note">
              <span className="prog-inst-name">
                NEXORA TECH CLUBS
              </span>
              <span className="prog-inst-sub">LEARN. BUILD. LEAD.</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="prog-footer-bottom">
          <p className="prog-footer-copy">
            © 2026 NEXORA Tech Clubs. All rights reserved.
          </p>
          <div className="prog-footer-legal-links">
            <button type="button" onClick={() => alert('NEXORA Tech Clubs Privacy Policy')}>
              Privacy
            </button>
            <span className="prog-legal-dot">•</span>
            <button type="button" onClick={() => alert('NEXORA Tech Clubs Terms')}>
              Terms
            </button>
            <span className="prog-legal-dot">•</span>
            <button type="button" onClick={() => alert('NEXORA Tech Clubs FAQs & Support')}>
              FAQs
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
