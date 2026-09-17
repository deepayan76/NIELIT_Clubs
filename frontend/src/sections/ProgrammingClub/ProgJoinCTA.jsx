import React from 'react';
import { ArrowRight } from 'lucide-react';
import { navigate } from '../../utils/router';

export default function ProgJoinCTA() {
  return (
    <section className="prog-join-section" id="join">
      <div className="prog-section-container">
        <div className="prog-join-container">
          <div className="prog-join-eyebrow">READY TO BUILD?</div>
          <h2 className="prog-join-heading">Join Programming Club</h2>
          <p className="prog-join-desc">
            Learn the fundamentals, solve meaningful problems, build real software, and grow alongside other students who enjoy creating with code.
          </p>
          <button
            type="button"
            className="prog-join-btn-cta"
            onClick={() => navigate('/register?club=Programming')}
          >
            <span>Join Programming Club</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
