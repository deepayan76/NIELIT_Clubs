import React from 'react';
import { ArrowRight, Play } from 'lucide-react';
import { PredictiveArcCanvas } from '../../components/PredictiveArc/PredictiveArcCanvas';
import { navigate } from '../../utils/router';

export default function AIHero({ onWatchOverview }) {
  return (
    <section className="ai-hero-section" id="hero">
      <div className="ai-hero-container">
        {/* Two-Column Focal Hero Composition */}
        <div className="ai-hero-grid">
          {/* LEFT COLUMN: AI Club Information & Actions */}
          <div className="ai-hero-col-left">
            <div className="ai-hero-header-block">
              <span className="ai-hero-eyebrow">NEXORA TECH CLUBS</span>
              <h1 className="ai-hero-title">AI Club</h1>
              <h2 className="ai-hero-tagline">Learn. Experiment. Build.</h2>
              <p className="ai-hero-desc">
                Explore Artificial Intelligence through practical learning, hands-on
                activities, and projects that turn concepts into working solutions.
              </p>
            </div>

            {/* CTAs */}
            <div className="ai-hero-cta-row">
              <button
                type="button"
                className="ai-btn-emerald"
                onClick={() => navigate('/?club=ai#register')}
              >
                <span>Join AI Club</span>
                <ArrowRight size={16} />
              </button>

              <button
                type="button"
                className="ai-btn-ghost"
                onClick={onWatchOverview}
              >
                <Play size={14} className="ai-play-icon" />
                <span>Watch Overview</span>
              </button>
            </div>

            {/* Small Editorial Information Row */}
            <div className="ai-hero-info-row">
              <div className="ai-info-col">
                <span className="ai-info-label">LEARN</span>
                <span className="ai-info-sub">Together</span>
              </div>
              <div className="ai-info-sep" />
              <div className="ai-info-col">
                <span className="ai-info-label">BUILD</span>
                <span className="ai-info-sub">Real Projects</span>
              </div>
              <div className="ai-info-sep" />
              <div className="ai-info-col">
                <span className="ai-info-label">GROW</span>
                <span className="ai-info-sub">With a Community</span>
              </div>
            </div>
          </div>

          {/* RIGHT / MAIN CENTER COLUMN: Big Focused PredictiveArcCanvas Visual Centerpiece */}
          <div className="ai-hero-col-center">
            <div className="ai-predictive-arc-wrapper">
              <PredictiveArcCanvas
                variant="data-pixel"
                mode="dark"
                speed={1.00}
                hue={0}
                saturation={1.00}
                brightness={1.00}
                className="ai-hero-arc-canvas"
              />

              {/* Understated Technical Phrase */}
              <div className="ai-arc-text-overlay" aria-hidden="true">
                <span className="ai-arc-word">IDEAS</span>
                <span className="ai-arc-word">INTELLIGENCE</span>
                <span className="ai-arc-word">IMPACT</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
