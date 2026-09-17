import React from 'react';
import { ArrowRight } from 'lucide-react';
import { navigate } from '../../utils/router';

export default function CyberJoinCTA() {
  return (
    <section className="cyber-join-cta-section" id="join">
      <div className="cyber-section-container">
        <div className="cyber-cta-container">
          <span className="cyber-cta-eyebrow">READY TO DEFEND?</span>
          <h2 className="cyber-cta-heading">Join Cybersecurity Club</h2>
          <p className="cyber-cta-desc">
            Learn how systems fail, understand how threats work, and build the skills needed to make technology more secure.
          </p>
          <button
            type="button"
            className="cyber-cta-btn-dark"
            onClick={() => navigate('/register?club=Cybersecurity')}
          >
            <span>Join Cybersecurity Club</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
