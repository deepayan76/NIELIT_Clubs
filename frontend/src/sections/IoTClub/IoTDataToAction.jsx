import React from 'react';

export default function IoTDataToAction() {
  const steps = [
    { idx: '01', name: 'REAL WORLD', sub: 'Physical change (e.g. ambient temperature rises to 34°C)' },
    { idx: '02', name: 'SENSOR', sub: 'Transducer detects thermal resistance change' },
    { idx: '03', name: 'SIGNAL', sub: 'Analog voltage converted to digital bytes' },
    { idx: '04', name: 'DEVICE', sub: 'MCU packages reading into JSON payload' },
    { idx: '05', name: 'NETWORK', sub: 'Encrypted MQTT packet sent over Wi-Fi' },
    { idx: '06', name: 'DATA', sub: 'Time-series log stored and parsed in cloud' },
    { idx: '07', name: 'DECISION', sub: 'Threshold rule matches: > 30°C condition' },
    { idx: '08', name: 'ACTION', sub: 'Relay clicks, cooling ventilation powers ON' }
  ];

  return (
    <section className="iot-data-action-section" id="data-to-action">
      <div className="iot-section-container">
        <div className="iot-section-header">
          <span className="iot-meta-label">
            <span className="iot-meta-dot" />
            FROM DATA TO ACTION
          </span>
          <h2 className="iot-section-title dark-text">How Physical Signals Become Smart Actions</h2>
          <p className="iot-section-subtitle muted-light">
            Understand the complete eight-step chain from a physical fluctuation in the real world to an automated decision and physical response.
          </p>
        </div>

        <div className="iot-d2a-steps-grid">
          {steps.map((step) => (
            <div className="iot-d2a-step-card" key={step.idx}>
              <div className="iot-d2a-step-idx">{step.idx}</div>
              <h3 className="iot-d2a-step-name">{step.name}</h3>
              <p className="iot-d2a-step-sub">{step.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
