import React from 'react';
import logoImg from '../../assets/logo.png';
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
              aria-label="NIELIT Tech Clubs Home"
            >
              <img
                src={logoImg}
                alt="NIELIT Logo"
                className="prog-footer-logo-img"
              />
            </a>
            <h3 className="prog-footer-brand-title">NIELIT TECH CLUBS</h3>
            <p className="prog-footer-tagline">Learn. Build. Together.</p>
            <p className="prog-footer-desc">
              A community of students exploring technology and innovation across programming, AI, security, and hardware.
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
                <button type="button" onClick={() => handleNav('/#club-cybersecurity')}>
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
                <a href="mailto:clubs@nielit.edu.in">Email Contact</a>
              </li>
            </ul>

            <div className="prog-footer-inst-note">
              <span className="prog-inst-name">
                National Institute of Electronics and Information Technology
              </span>
              <span className="prog-inst-sub">Built by students, for students.</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="prog-footer-bottom">
          <p className="prog-footer-copy">
            © 2026 NIELIT Tech Clubs. All rights reserved.
          </p>
          <div className="prog-footer-legal-links">
            <button type="button" onClick={() => alert('NIELIT Clubs Privacy Policy')}>
              Privacy
            </button>
            <span className="prog-legal-dot">•</span>
            <button type="button" onClick={() => alert('NIELIT Clubs Terms')}>
              Terms
            </button>
            <span className="prog-legal-dot">•</span>
            <button type="button" onClick={() => alert('NIELIT Clubs FAQs & Support')}>
              FAQs
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
