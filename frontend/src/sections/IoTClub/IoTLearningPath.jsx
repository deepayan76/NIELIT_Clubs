import React from 'react';

export default function IoTLearningPath() {
  const stages = [
    {
      num: '01',
      title: 'ELECTRONICS',
      desc: 'Master electrical fundamentals: Ohm’s law, breadboard prototyping, circuit analysis, pull-up resistors, voltage dividers, and safe power delivery.',
      pills: ['Circuit Design', 'Ohm’s Law', 'Breadboarding', 'Power Delivery']
    },
    {
      num: '02',
      title: 'SENSORS',
      desc: 'Interface with analog and digital transducers: measuring temperature, humidity, ultrasonic distance, light intensity, pressure, and motion.',
      pills: ['ADC Conversion', 'I2C / SPI', 'IMU Motion', 'Transducers']
    },
    {
      num: '03',
      title: 'MICROCONTROLLERS',
      desc: 'Program embedded boards (ESP32, STM32, Arduino): timers, interrupts, GPIO manipulation, PWM signal control, and firmware architecture.',
      pills: ['ESP32', 'GPIO & PWM', 'Hardware Interrupts', 'Firmware']
    },
    {
      num: '04',
      title: 'CONNECTIVITY',
      desc: 'Link embedded systems across local and remote networks: Wi-Fi pairing, Bluetooth Low Energy (BLE) GATT services, MQTT messaging, and HTTP REST.',
      pills: ['Wi-Fi & BLE', 'MQTT Broker', 'HTTP / REST', 'Socket Streams']
    },
    {
      num: '05',
      title: 'DATA',
      desc: 'Structure and manage device telemetry: JSON payload encoding, time-series storage, edge signal filtering, and cloud database synchronization.',
      pills: ['JSON Payloads', 'Time-Series DB', 'Edge Filtering', 'Telemetry Ingestion']
    },
    {
      num: '06',
      title: 'AUTOMATION',
      desc: 'Build complete closed-loop systems: telemetry dashboards, rule engines, webhook alerts, relay actuation, and smart home automation.',
      pills: ['Relay Control', 'Rule Engines', 'Web Dashboards', 'Closed-Loop Systems']
    }
  ];

  return (
    <section className="iot-path-section" id="learning-path">
      <div className="iot-section-container">
        <div className="iot-section-header">
          <span className="iot-meta-label">
            <span className="iot-meta-dot" />
            THE IOT LEARNING PATH
          </span>
          <h2 className="iot-section-title dark-text">A Structured Engineering Journey</h2>
          <p className="iot-section-subtitle muted-light">
            Six progressive stages taking you from basic electronic circuits to fully connected, autonomous IoT systems.
          </p>
        </div>

        <div className="iot-path-grid">
          {stages.map((stage) => (
            <div className="iot-path-card" key={stage.num}>
              <span className="iot-path-stage-badge">STAGE {stage.num}</span>
              <h3 className="iot-path-card-title">{stage.title}</h3>
              <p className="iot-path-card-desc">{stage.desc}</p>
              <div className="iot-path-topics-list">
                {stage.pills.map((pill) => (
                  <span className="iot-path-pill" key={pill}>{pill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
