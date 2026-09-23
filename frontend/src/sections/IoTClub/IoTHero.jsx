import React from 'react';
import { ArrowRight, Play } from 'lucide-react';
import { navigate } from '../../utils/router';
import { StructureFlowCollection } from "@designcodeio/threeui";
import "@designcodeio/threeui/style.css";

export function Scene() {
  return (
    <div className="shader-frame">
      <StructureFlowCollection
        variant="orbital-sphere"
        speed={1.00}
        particleSize={0.015}
        particleOpacity={0.80}
        orbitOpacity={0.25}
        hue={0}
        scale={1.00}
        haloOpacity={0.20}
      />
    </div>
  );
}

export default function IoTHero({ onWatchOverview }) {
  return (
    <section className="iot-hero-section" id="hero">
      <div className="iot-section-container">
        <div className="iot-hero-grid">
          {/* LEFT: IoT Club Identity & Story */}
          <div className="iot-hero-left">
            <div className="iot-hero-eyebrow">NEXORA TECH CLUBS</div>
            <h1 className="iot-hero-title">IoT Club</h1>
            <div className="iot-hero-tagline">Connect. Sense. Automate.</div>
            <p className="iot-hero-desc">
              Explore the Internet of Things by building connected devices, working with sensors and embedded systems, and turning real-world data into intelligent actions.
            </p>

            <div className="iot-hero-actions">
              <button
                type="button"
                className="iot-btn-primary"
                onClick={() => navigate('/register?club=IoT')}
                aria-label="Join IoT Club"
              >
                <span>Join IoT Club</span>
                <ArrowRight size={16} />
              </button>

              {onWatchOverview && (
                <button
                  type="button"
                  className="iot-btn-secondary"
                  onClick={onWatchOverview}
                  aria-label="Explore IoT Curriculum Overview"
                >
                  <Play size={14} fill="currentColor" />
                  <span>Explore IoT</span>
                </button>
              )}
            </div>

            {/* Three Compact Editorial Statements */}
            <div className="iot-hero-statements">
              <div className="iot-statement-item">
                <span className="iot-statement-label">SENSE</span>
                <span className="iot-statement-text">Physical Transducers</span>
              </div>
              <div className="iot-statement-divider" />
              <div className="iot-statement-item">
                <span className="iot-statement-label">CONNECT</span>
                <span className="iot-statement-text">Telemetry Networks</span>
              </div>
              <div className="iot-statement-divider" />
              <div className="iot-statement-item">
                <span className="iot-statement-label">AUTOMATE</span>
                <span className="iot-statement-text">Closed-Loop Control</span>
              </div>
            </div>
          </div>

          {/* RIGHT / CENTER: Big Focused Orbital Sphere Three.js Animation Stage */}
          <div className="iot-hero-center">
            <div className="iot-shader-frame-wrapper">
              <Scene />
            </div>
            <div className="iot-hero-center-label">SENSORS / CONNECTIVITY / EMBEDDED / AUTOMATION</div>
          </div>
        </div>
      </div>
    </section>
  );
}
