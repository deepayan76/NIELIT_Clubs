import React from 'react';
import { ArrowDown } from 'lucide-react';

export default function IoTCapstone() {
  const capstoneLayers = [
    {
      title: 'SENSORS',
      desc: 'Precision environmental & physical input transducers'
    },
    {
      title: 'CONTROLLER',
      desc: 'Dual-core MCU executing calibrated edge processing'
    },
    {
      title: 'CONNECTION',
      desc: 'Low-latency Wi-Fi / MQTT telemetry communication link'
    },
    {
      title: 'DATA',
      desc: 'Time-series database ingestion & rules evaluation engine'
    },
    {
      title: 'APPLICATION',
      desc: 'Real-time telemetry dashboard & actuator control interface'
    }
  ];

  return (
    <section className="iot-capstone-section" id="capstone">
      <div className="iot-section-container">
        <div className="iot-capstone-container">
          <div className="iot-section-header text-center">
            <span className="iot-meta-label">
              <span className="iot-meta-dot" />
              CAPSTONE PROJECT
            </span>
            <h2 className="iot-section-title">Build a Connected System</h2>
            <p className="iot-section-subtitle muted-dark">
              Bring sensors, hardware, connectivity, software, and data together into one working prototype.
            </p>
          </div>

          <div className="iot-capstone-arch-stack">
            {capstoneLayers.map((layer, idx) => (
              <React.Fragment key={layer.title}>
                <div className="iot-capstone-block">
                  <h3 className="iot-capstone-block-title">{layer.title}</h3>
                  <span className="iot-capstone-block-desc">{layer.desc}</span>
                </div>

                {idx < capstoneLayers.length - 1 && (
                  <div className="iot-capstone-down-arrow">
                    <ArrowDown size={16} />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
