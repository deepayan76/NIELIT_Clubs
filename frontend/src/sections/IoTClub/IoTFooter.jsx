import React from 'react';
import logoImg from '../../assets/logoiconWhite.png';
import { navigate, scrollToSection } from '../../utils/router';

export default function IoTFooter() {
  const handleNav = (url) => {
    if (url.startsWith('#')) {
      scrollToSection(url.substring(1));
    } else {
      navigate(url);
    }
  };

  return (
    <footer className="iot-footer-section" id="footer">
      <div className="iot-section-container">
        {/* Upper 3 Columns */}
        <div className="iot-footer-top-grid">
          {/* Column 1: Brand & Tagline */}
          <div className="iot-footer-col">
            <h3 className="iot-footer-brand-title">NEXORA TECH CLUBS</h3>
            <p className="iot-footer-tagline">LEARN. BUILD. LEAD.</p>
            <p className="iot-footer-desc">A community exploring technology and physical-digital systems.</p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="iot-footer-col">
            <h4 className="iot-footer-col-title">QUICK LINKS</h4>
            <ul className="iot-footer-list">
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
                <button type="button" onClick={() => handleNav('/register?club=IoT')}>
                  Register
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Our Clubs */}
          <div className="iot-footer-col">
            <h4 className="iot-footer-col-title">OUR CLUBS</h4>
            <ul className="iot-footer-list">
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
                <button type="button" onClick={() => handleNav('/cybersecurity')}>
                  Cybersecurity Club
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="iot-footer-active-link"
                  onClick={() => handleNav('/iot')}
                >
                  IoT Club
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Lower Legal / Branding Row */}
        <div className="iot-footer-bottom-row">
          <div className="iot-footer-bottom-brand">
            <img src={logoImg} alt="NEXORA Logo" className="iot-footer-logo-img" />
            <div className="iot-footer-legal-text">
              <span className="iot-footer-year">© 2026 NEXORA Tech Clubs. All rights reserved.</span>
              <span className="iot-footer-institute">
                NEXORA TECH CLUBS • LEARN. BUILD. LEAD.
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
