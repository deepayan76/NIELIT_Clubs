import React from 'react';
import { Eye, Cpu, Radio, Server, LayoutDashboard, User } from 'lucide-react';

export default function IoTConnectedSystems() {
  const nodes = [
    {
      label: 'Sensor',
      sub: 'Physical signal acquisition',
      icon: <Eye size={18} />
    },
    {
      label: 'Microcontroller',
      sub: 'Edge sampling & conversion',
      icon: <Cpu size={18} />
    },
    {
      label: 'Network',
      sub: 'Wi-Fi / MQTT gateway link',
      icon: <Radio size={18} />
    },
    {
      label: 'Cloud / Server',
      sub: 'Data pipeline & storage',
      icon: <Server size={18} />
    },
    {
      label: 'Application',
      sub: 'Live UI & telemetry analytics',
      icon: <LayoutDashboard size={18} />
    },
    {
      label: 'User',
      sub: 'Insight & autonomous control',
      icon: <User size={18} />
    }
  ];

  return (
    <section className="iot-systems-section" id="systems">
      <div className="iot-section-container">
        <div className="iot-section-header">
          <span className="iot-meta-label">
            <span className="iot-meta-dot" />
            CONNECTED SYSTEMS
          </span>
          <h2 className="iot-section-title dark-text">Devices Are Only the Beginning</h2>
          <p className="iot-section-subtitle muted-light">
            True IoT occurs when edge hardware, robust wireless networks, scalable cloud infrastructure, and user applications operate as a unified ecosystem.
          </p>
        </div>

        <div className="iot-systems-arch-chain">
          {nodes.map((node, idx) => (
            <div className="iot-arch-node-block" key={node.label}>
              <div className="iot-arch-icon">
                {node.icon}
              </div>
              <h3 className="iot-arch-label">{node.label}</h3>
              <p className="iot-arch-sub">{node.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
