import React from 'react';

export default function IoTBuildingProgression() {
  const steps = [
    {
      num: '01',
      title: 'UNDERSTAND',
      desc: 'Learn the fundamentals of electronics, circuit diagrams, breadboarding, and microcontroller architecture.'
    },
    {
      num: '02',
      title: 'EXPERIMENT',
      desc: 'Test sensors, measure signals, calibrate analog inputs, and practice writing clean embedded firmware routines.'
    },
    {
      num: '03',
      title: 'CONNECT',
      desc: 'Bring hardware and software together by establishing Wi-Fi connections, MQTT broker topics, and data pipelines.'
    },
    {
      num: '04',
      title: 'BUILD',
      desc: 'Turn the system into a robust, working prototype complete with physical enclosures and live web dashboards.'
    }
  ];

  return (
    <section className="iot-progression-section" id="progression">
      <div className="iot-section-container">
        <div className="iot-section-header">
          <span className="iot-meta-label">
            <span className="iot-meta-dot" />
            BUILDING ALONG THE WAY
          </span>
          <h2 className="iot-section-title dark-text">From Concept to Finished System</h2>
          <p className="iot-section-subtitle muted-light">
            A milestone-driven progression ensuring every student gains practical, hands-on experience at each step.
          </p>
        </div>

        <div className="iot-progression-grid">
          {steps.map((step) => (
            <div className="iot-progression-card" key={step.num}>
              <div className="iot-prog-num">{step.num} // MILESTONE</div>
              <h3 className="iot-prog-title">{step.title}</h3>
              <p className="iot-prog-desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
