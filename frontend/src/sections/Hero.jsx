import React from 'react';
import Navbar from '../components/Navbar';
import { GalleryHeading } from '../shaders';
import { navigate, scrollToSection } from '../utils/router';
import '../styles/Hero.css';

export default function Hero() {
  const handleBtnClick = (e, targetId) => {
    if (e && e.preventDefault) e.preventDefault();
    navigate(`#${targetId}`);
    scrollToSection(targetId);
  };

  return (
    <section className="hero-outer-section" id="home">
      <div className="hero-white-container">
        {/* Integrated Top Navbar with Logo & Nav Pill */}
        <Navbar />

        {/* Hero Two-Zone Main Grid / Layout */}
        <div className="hero-two-zone-layout">
          {/* Left Zone: All Text Content & CTA Buttons */}
          <div className="hero-content-zone">
            <h1 className="hero-main-title">
              <span>Where Ideas</span>
              <span>Become Innovation</span>
            </h1>

            <p className="hero-subtext">
              Explore, build, compete, and innovate across AI, Programming, Cybersecurity, and IoT.
            </p>

            <div className="hero-cta-group">
              <a
                href="#clubs"
                className="hero-cta-btn"
                onClick={(e) => handleBtnClick(e, 'clubs')}
              >
                Explore a clubs
              </a>
              <a
                href="#register"
                className="hero-cta-btn"
                onClick={(e) => handleBtnClick(e, 'register')}
              >
                Join A Club
              </a>
            </div>
          </div>

          {/* Right Zone: ThreeUI GalleryHeading Animation */}
          <div className="hero-visual-zone">
            <div className="hero-gallery-container">
              <GalleryHeading
                variant="rising-diagonal"
                mode="dark"
                font="sans"
                weight="400"
                headlineSize={1.15}
                hue={0}
                saturation={1.00}
                brightness={1.00}
                className="hero-gallery-canvas"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
