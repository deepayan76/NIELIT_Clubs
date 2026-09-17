import React from 'react';
import Button from '../components/Button';
import Hero3DScene from '../components/ThreeCanvas/Hero3DScene';
import heroCharImg from '../assets/hero/hero-character.png';
import '../styles/Hero.css';

export default function Hero() {
  return (
    <section className="hero-section container" id="home">
      <div className="hero-panel">
        {/* Left Column: Headings, Character & Buttons */}
        <div className="hero-content-left">
          <div className="hero-text-block">
            <span className="hero-eyebrow">NIELIT TECH CLUBS</span>
            <h1 className="hero-title">Where Ideas Become Innovation</h1>
            <p className="hero-desc">
              Explore, build, compete, and innovate<br className="hero-br" />
              across AI, Programming, Cybersecurity, and IoT.
            </p>
          </div>

          {/* 3D Character Illustration */}
          <div className="hero-character-wrapper">
            <img
              src={heroCharImg}
              alt="Student exploring tech with laptop"
              className="hero-character-img"
              loading="eager"
            />
          </div>

          {/* Action Buttons */}
          <div className="hero-cta-group">
            <Button variant="white" size="md" href="#clubs" ariaLabel="Explore Clubs">
              Explore Clubs
            </Button>
            <Button variant="white" size="md" href="#register" ariaLabel="Join a Club">
              Join a Club
            </Button>
          </div>
        </div>

        {/* Right Column: Hero Pure 3D Interactive Tech Scene */}
        <div className="hero-content-right">
          <div className="hero-3d-wrapper">
            <Hero3DScene className="hero-3d-scene" />
          </div>
        </div>
      </div>
    </section>
  );
}
