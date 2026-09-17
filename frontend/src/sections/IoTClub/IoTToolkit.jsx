import React from 'react';
import { Cpu, Radio, Code2, Database } from 'lucide-react';

export default function IoTToolkit() {
  const toolkitCategories = [
    {
      title: 'HARDWARE',
      icon: <Cpu size={18} />,
      items: ['Microcontrollers (ESP32, STM32)', 'Sensors & Transducers', 'Actuators & Servo Motors', 'Embedded Prototyping Boards']
    },
    {
      title: 'CONNECTIVITY',
      icon: <Radio size={18} />,
      items: ['Wi-Fi 802.11 b/g/n', 'Bluetooth Low Energy (BLE)', 'MQTT Telemetry Broker', 'HTTP REST & WebSockets']
    },
    {
      title: 'SOFTWARE',
      icon: <Code2 size={18} />,
      items: ['C / C++ Embedded Firmware', 'MicroPython & Python Scripting', 'JavaScript / TypeScript', 'Node.js Edge Runtimes']
    },
    {
      title: 'DATA',
      icon: <Database size={18} />,
      items: ['REST & GraphQL APIs', 'Time-Series Databases (InfluxDB)', 'Telemetry Dashboards (Grafana)', 'Real-Time Event Streams']
    }
  ];

  return (
    <section className="iot-toolkit-section" id="toolkit">
      <div className="iot-section-container">
        <div className="iot-section-header">
          <span className="iot-meta-label">
            <span className="iot-meta-dot" />
            THE IOT TOOLKIT
          </span>
          <h2 className="iot-section-title">Tools of Connected Engineering</h2>
          <p className="iot-section-subtitle muted-dark">
            A versatile stack of industry-standard hardware, network protocols, languages, and data frameworks students can explore.
          </p>
        </div>

        <div className="iot-toolkit-grid">
          {toolkitCategories.map((cat) => (
            <div className="iot-toolkit-card" key={cat.title}>
              <div className="iot-toolkit-cat-header">
                {cat.icon}
                <h3 className="iot-toolkit-cat-title">{cat.title}</h3>
              </div>
              <div className="iot-toolkit-items-list">
                {cat.items.map((item) => (
                  <div className="iot-toolkit-item" key={item}>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="iot-disclaimer-note">
          * Technologies students may explore throughout practical workshops and project development.
        </p>
      </div>
    </section>
  );
}
