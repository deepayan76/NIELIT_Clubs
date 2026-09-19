import React from 'react';
import logoImg from '../../assets/logo.png';
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
            >
              <img
                src={logoImg}
                alt="NIELIT Logo"
                className="ai-footer-logo-img"
              />
            </a>
            <h3 className="ai-footer-brand-title">NIELIT TECH CLUBS</h3>
            <p className="ai-footer-tagline">Learn. Build. Together.</p>
            <p className="ai-footer-desc">
              A community of students exploring technology and innovation across AI,
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
                <a href="mailto:clubs@nielit.edu.in">Email Contact</a>
              </li>
            </ul>

            <div className="ai-footer-inst-note">
              <span className="ai-inst-name">
                National Institute of Electronics and Information Technology
              </span>
              <span className="ai-inst-sub">Built by students, for students.</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="ai-footer-bottom">
          <p className="ai-footer-copy">
            © 2026 NIELIT Tech Clubs. All rights reserved.
          </p>
          <div className="ai-footer-legal-links">
            <button type="button" onClick={() => alert('NIELIT Clubs Privacy Policy')}>
              Privacy
            </button>
            <span className="ai-legal-dot">•</span>
            <button type="button" onClick={() => alert('NIELIT Clubs Terms')}>
              Terms
            </button>
            <span className="ai-legal-dot">•</span>
            <button type="button" onClick={() => alert('NIELIT Clubs FAQs & Support')}>
              FAQs
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
