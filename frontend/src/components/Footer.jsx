import React from 'react';
import logoImg from '../assets/logoiconWhite.png';
import { navigate } from '../utils/router';
import '../styles/Footer.css';

export default function Footer() {
  const handleNav = (url) => {
    navigate(url);
  };

  return (
    <footer className="footer-section" id="footer">
      <div className="container footer-container">
        {/* Upper 3 Columns */}
        <div className="footer-top-grid">
          {/* Column 1: Brand & Tagline */}
          <div className="footer-col footer-col-brand">
            <h3 className="footer-brand-title">NEXORA TECH CLUBS</h3>
            <p className="footer-brand-tagline">LEARN. BUILD. LEAD.</p>
            <p className="footer-brand-desc">Where Ideas Become Innovation.</p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-col footer-col-links">
            <h4 className="footer-col-heading">QUICK LINKS</h4>
            <ul className="footer-links-list">
              <li>
                <a href="#home" onClick={(e) => { e.preventDefault(); handleNav('#home'); }}>
                  Home
                </a>
              </li>
              <li>
                <a href="#about" onClick={(e) => { e.preventDefault(); handleNav('#about'); }}>
                  About
                </a>
              </li>
              <li>
                <a href="#clubs" onClick={(e) => { e.preventDefault(); handleNav('#clubs'); }}>
                  Clubs
                </a>
              </li>
              <li>
                <a href="#register" onClick={(e) => { e.preventDefault(); handleNav('#register'); }}>
                  Join Us
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Our Clubs */}
          <div className="footer-col footer-col-clubs">
            <h4 className="footer-col-heading">OUR CLUBS</h4>
            <ul className="footer-links-list">
              <li>
                <a href="/ai" onClick={(e) => { e.preventDefault(); handleNav('/ai'); }}>
                  AI Club
                </a>
              </li>
              <li>
                <a href="/programming" onClick={(e) => { e.preventDefault(); handleNav('/programming'); }}>
                  Programming Club
                </a>
              </li>
              <li>
                <a href="/cybersecurity" onClick={(e) => { e.preventDefault(); handleNav('/cybersecurity'); }}>
                  Cybersecurity Club
                </a>
              </li>
              <li>
                <a href="/iot" onClick={(e) => { e.preventDefault(); handleNav('/iot'); }}>
                  IoT Club
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Lower Legal / Branding Row */}
        <div className="footer-bottom-row">
          <div className="footer-bottom-brand">
            <img src={logoImg} alt="NEXORA Logo" className="footer-logo-img" />
            <div className="footer-legal-text">
              <span className="footer-year">2026 NEXORA Tech Clubs</span>
              <span className="footer-institute">
                LEARN. BUILD. LEAD.
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
