import React from 'react';
import { ArrowRight, Play } from 'lucide-react';
import { StructureFlowCollection } from '../../shaders/structure-flow/StructureFlowCollection';
import { navigate } from '../../utils/router';

export default function ProgHero({ onWatchOverview }) {
  return (
    <section className="prog-hero-section" id="hero">
      <div className="prog-section-container">
        <div className="prog-hero-grid">
          {/* LEFT: Programming Club Identity */}
          <div className="prog-hero-left">
            <div className="prog-hero-eyebrow">NIELIT TECH CLUBS</div>
            <h1 className="prog-hero-title">Programming Club</h1>
            <div className="prog-hero-subheading">Think. Code. Solve.</div>
            <p className="prog-hero-desc">
              Build strong programming fundamentals, sharpen your problem-solving skills, and turn ideas into working software through practical learning and collaborative projects.
            </p>

            <div className="prog-hero-actions">
              <button
                type="button"
                className="prog-btn-primary"
                onClick={() => navigate('/register?club=Programming')}
              >
                <span>Join Programming Club</span>
                <ArrowRight size={16} />
              </button>

              <button
                type="button"
                className="prog-btn-secondary"
                onClick={onWatchOverview}
              >
                <Play size={14} fill="currentColor" />
                <span>Watch Overview</span>
              </button>
            </div>

            {/* Three Compact Statements */}
            <div className="prog-hero-statements">
              <div className="prog-statement-item">
                <span className="prog-statement-label">LEARN</span>
                <span className="prog-statement-text">Strong Foundations</span>
              </div>
              <div className="prog-statement-divider" />
              <div className="prog-statement-item">
                <span className="prog-statement-label">SOLVE</span>
                <span className="prog-statement-text">Real Problems</span>
              </div>
              <div className="prog-statement-divider" />
              <div className="prog-statement-item">
                <span className="prog-statement-label">BUILD</span>
                <span className="prog-statement-text">Working Software</span>
              </div>
            </div>
          </div>

          {/* RIGHT / CENTER: Big Focused Structure Flow Animation Stage */}
          <div className="prog-hero-center">
            <div className="prog-shader-frame">
              <StructureFlowCollection
                variant="structure-flow"
                speed={1.00}
                pointSize={0.080}
                opacity={0.40}
                maskStart={0.20}
                maskSolid={0.50}
              />
            </div>
            <div className="prog-hero-center-label">STRUCTURE / LOGIC / CODE</div>
          </div>
        </div>
      </div>
    </section>
  );
}
