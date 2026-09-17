import React, { useState } from 'react';
import { Cpu, Radio, Database, Zap, Layers, ArrowDown } from 'lucide-react';

export default function IoTAbout({ onOpenCurriculum }) {
  const [activeNode, setActiveNode] = useState(1);

  const systemDiagramNodes = [
    {
      id: 0,
      title: 'Physical Environment',
      detail: 'Sensors detect temperature, light, motion, pressure',
      icon: <Zap size={16} />
    },
    {
      id: 1,
      title: 'Embedded Controller',
      detail: 'Microcontroller reads inputs & computes edge logic',
      icon: <Cpu size={16} />
    },
    {
      id: 2,
      title: 'Connectivity Layer',
      detail: 'Wi-Fi, Bluetooth, or MQTT transmits telemetry payload',
      icon: <Radio size={16} />
    },
    {
      id: 3,
      title: 'Cloud & Dashboards',
      detail: 'Data visualization, analytics & automated actuation',
      icon: <Database size={16} />
    }
  ];

  return (
    <section className="iot-about-section" id="about">
      <div className="iot-section-container">
        <div className="iot-about-grid">
          {/* Left Column */}
          <div className="iot-about-left">
            <div className="iot-section-header">
              <span className="iot-meta-label">
                <span className="iot-meta-dot" />
                ABOUT IOT
              </span>
              <h2 className="iot-section-title dark-text">Bringing the Physical World Online</h2>
              <p className="iot-about-lead">
                The IoT Club explores how physical objects can sense their surroundings, communicate information, and respond intelligently. Students learn how sensors, microcontrollers, networks, software, and data come together to create connected systems.
              </p>
              <p className="iot-about-body">
                From simple sensor experiments to complete connected prototypes, the club focuses on learning by building and understanding how technology interacts with the world around us.
              </p>
            </div>

            <div className="iot-about-highlights-grid">
              <div className="iot-about-stat-card">
                <div className="iot-stat-number">01 / HARDWARE</div>
                <div className="iot-stat-title">Physical Computing</div>
                <p className="iot-stat-desc">Circuit prototyping, microcontroller programming & sensor integration.</p>
              </div>

              <div className="iot-about-stat-card">
                <div className="iot-stat-number">02 / NETWORKING</div>
                <div className="iot-stat-title">Connected Devices</div>
                <p className="iot-stat-desc">Lightweight protocols (MQTT/HTTP), wireless telemetry & device communication.</p>
              </div>

              <div className="iot-about-stat-card">
                <div className="iot-stat-number">03 / SOFTWARE</div>
                <div className="iot-stat-title">Real-Time Telemetry</div>
                <p className="iot-stat-desc">APIs, data processing, live streaming & dashboard visualization.</p>
              </div>

              <div className="iot-about-stat-card">
                <div className="iot-stat-number">04 / INTELLIGENCE</div>
                <div className="iot-stat-title">Closed-Loop Control</div>
                <p className="iot-stat-desc">Turning sensor readings into reliable automated real-world actions.</p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Diagram Physical → Digital */}
          <div className="iot-about-right">
            <div className="iot-diagram-box">
              <div className="iot-diagram-header">
                <h3 className="iot-diagram-title">System Flow Architecture</h3>
                <span className="iot-diagram-badge">PHYSICAL → DIGITAL</span>
              </div>

              <div className="iot-diagram-flow-chain">
                {systemDiagramNodes.map((node, index) => (
                  <React.Fragment key={node.id}>
                    <div
                      className={`iot-diagram-node ${activeNode === node.id ? 'active-node' : ''}`}
                      onMouseEnter={() => setActiveNode(node.id)}
                      tabIndex={0}
                      role="button"
                      onFocus={() => setActiveNode(node.id)}
                      aria-label={`Flow Node: ${node.title}`}
                    >
                      <div className="iot-diagram-node-info">
                        <div className="iot-diagram-node-icon">
                          {node.icon}
                        </div>
                        <div>
                          <h4 className="iot-diagram-node-name">{node.title}</h4>
                          <p className="iot-diagram-node-detail">{node.detail}</p>
                        </div>
                      </div>
                      <span className="iot-stat-number">0{index + 1}</span>
                    </div>

                    {index < systemDiagramNodes.length - 1 && (
                      <div className="iot-diagram-arrow">
                        <ArrowDown size={14} />
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
