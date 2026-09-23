import React from 'react';
import { ArrowRight, Play } from 'lucide-react';
import { StructureFlowCollection } from '../../shaders/structure-flow/StructureFlowCollection';
import { navigate } from '../../utils/router';

export default function CyberHero({ onWatchOverview }) {
  return (
    <section className="cyber-hero-section" id="hero">
      <div className="cyber-section-container">
        <div className="cyber-hero-grid">
          <div className="cyber-hero-left">
            <div className="cyber-hero-eyebrow">NEXORA TECH CLUBS</div>
            <h1 className="cyber-hero-title">Cybersecurity Club</h1>
            <div className="cyber-hero-subheading">Secure. Defend. Evolve.</div>
            <p className="cyber-hero-desc">
              Explore cybersecurity through practical security concepts, ethical hacking, threat analysis, network defense, and hands-on challenges.
            </p>

            <div className="cyber-hero-actions">
              <button
                type="button"
                className="cyber-btn-primary"
                onClick={() => navigate('/register?club=Cybersecurity')}
              >
                <span>Join Cybersecurity Club</span>
                <ArrowRight size={16} />
              </button>

              <button
                type="button"
                className="cyber-btn-secondary"
                onClick={onWatchOverview}
              >
                <Play size={14} fill="currentColor" />
                <span>Explore Security</span>
              </button>
            </div>

            {/* Three Compact Editorial Statements */}
            <div className="cyber-hero-statements">
              <div className="cyber-statement-item">
                <span className="cyber-statement-label">DETECT</span>
                <span className="cyber-statement-text">Understand Threats</span>
              </div>
              <div className="cyber-statement-divider" />
              <div className="cyber-statement-item">
                <span className="cyber-statement-label">DEFEND</span>
                <span className="cyber-statement-text">Protect Systems</span>
              </div>
              <div className="cyber-statement-divider" />
              <div className="cyber-statement-item">
                <span className="cyber-statement-label">RESPOND</span>
                <span className="cyber-statement-text">Solve Incidents</span>
              </div>
            </div>
          </div>

          {/* RIGHT / CENTER: Big Focused Flux Vortex Animation Stage */}
          <div className="cyber-hero-center">
            <div className="cyber-shader-frame">
              <StructureFlowCollection
                variant="flux-vortex"
                speed={1.00}
                size={1.00}
                length={1.00}
                density={1.00}
                opacity={1.00}
                hue={0}
                saturation={1.00}
                brightness={1.00}
              />
            </div>
            <div className="cyber-hero-center-label">THREAT / DETECT / DEFEND / RESPOND</div>
          </div>
        </div>
      </div>
    </section>
  );
}
