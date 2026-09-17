import React from 'react';
import { ArrowRight } from 'lucide-react';
import { navigate } from '../../utils/router';

export default function AIJoinCTA() {
  return (
    <section className="ai-cta-section" id="join">
      <div className="ai-section-container">
        <div className="ai-cta-card">
          <div className="ai-cta-content">
            <span className="ai-cta-eyebrow">READY TO BUILD WITH AI?</span>
            <h2 className="ai-cta-title">Join AI Club</h2>
            <p className="ai-cta-desc">
              Start learning, practice what you learn, and turn your ideas into
              working projects. No matter where you're starting, there's room to
              learn, experiment and grow.
            </p>
            <div className="ai-cta-action">
              <button
                type="button"
                className="ai-btn-cta-primary"
                onClick={() => navigate('/?club=ai#register')}
              >
                <span>Join AI Club</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
