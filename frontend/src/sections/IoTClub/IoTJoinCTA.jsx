import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { navigate } from '../../utils/router';

export default function IoTJoinCTA() {
  return (
    <section className="iot-cta-section" id="join">
      <div className="iot-section-container">
        <div className="iot-cta-panel">
          <div className="iot-cta-content">
            <h2 className="iot-cta-heading">READY TO CONNECT THE WORLD?</h2>
            <p className="iot-cta-subtext">
              Join the IoT Club and start building systems that connect the physical and digital worlds.
            </p>

            <div className="iot-cta-buttons-row">
              <button
                type="button"
                className="iot-cta-btn-white"
                onClick={() => navigate('/register?club=IoT')}
                aria-label="Join IoT Club"
              >
                <span>Join IoT Club</span>
                <ArrowRight size={16} />
              </button>

              <button
                type="button"
                className="iot-cta-btn-outline"
                onClick={() => navigate('/#clubs')}
                aria-label="Explore other NEXORA Tech Clubs"
              >
                <span>Explore Other Clubs</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
