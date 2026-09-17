import React from 'react';
import { Radio, Cpu, Network, BarChart3, Zap, ArrowRight } from 'lucide-react';

export default function IoTHowItWorks() {
  const steps = [
    {
      num: '01',
      title: 'SENSE',
      desc: 'Sensors collect physical information such as temperature, humidity, vibration, optical waves, or movement from the ambient environment.',
      icon: <Radio size={20} />
    },
    {
      num: '02',
      title: 'PROCESS',
      desc: 'Microcontrollers process incoming analog and digital signals, apply calibration filters, and prepare structured telemetry payloads.',
      icon: <Cpu size={20} />
    },
    {
      num: '03',
      title: 'CONNECT',
      desc: 'Embedded devices transmit packets across local Wi-Fi, Bluetooth Low Energy, or low-overhead MQTT brokers to upstream gateways.',
      icon: <Network size={20} />
    },
    {
      num: '04',
      title: 'ANALYZE',
      desc: 'Telemetry data is ingested, parsed against thresholds, and evaluated by software algorithms or streaming dashboards.',
      icon: <BarChart3 size={20} />
    },
    {
      num: '05',
      title: 'ACT',
      desc: 'Autonomous logic triggers actuators, turns on relays, dispatches notifications, or adjusts system parameters in real time.',
      icon: <Zap size={20} />
    }
  ];

  return (
    <section className="iot-how-section" id="how-it-works">
      <div className="iot-section-container">
        <div className="iot-section-header text-center">
          <span className="iot-meta-label">
            <span className="iot-meta-dot" />
            HOW IOT WORKS
          </span>
          <h2 className="iot-section-title">From Signal to Action</h2>
          <p className="iot-section-subtitle muted-dark">
            A continuous loop that bridges hardware sensing with digital computation to deliver responsive, automated physical systems.
          </p>
        </div>

        <div className="iot-how-pipeline-grid">
          {steps.map((step, idx) => (
            <div className="iot-how-card" key={step.num}>
              <div className="iot-how-step-num">{step.num} // STAGE</div>
              <h3 className="iot-how-title">{step.title}</h3>
              <p className="iot-how-desc">{step.desc}</p>
              <div className="iot-how-footer-arrow">
                <span>{idx < steps.length - 1 ? 'NEXT' : 'COMPLETE'}</span>
                <ArrowRight size={13} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
