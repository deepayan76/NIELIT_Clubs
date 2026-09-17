import React from 'react';
import { CloudSun, Home, Sprout, MapPin, LayoutDashboard, Cog } from 'lucide-react';

export default function IoTWhatYoullBuild({ onOpenProjectDetails }) {
  const projects = [
    {
      id: 'env',
      title: 'Smart Environment',
      desc: 'Monitor ambient environmental conditions such as air quality, temperature, acoustic noise, and humidity using connected sensors.',
      tag: 'ENVIRONMENTAL TELEMETRY',
      icon: <CloudSun size={20} />
    },
    {
      id: 'home',
      title: 'Smart Home',
      desc: 'Build connected systems that respond to proximity sensors, ambient light, and user mobile/web commands to automate lighting and climate.',
      tag: 'HOME AUTOMATION',
      icon: <Home size={20} />
    },
    {
      id: 'agri',
      title: 'Smart Agriculture',
      desc: 'Use connected sensing to observe soil moisture, temperature, and sunlight levels to automate precision irrigation schedules.',
      tag: 'PRECISION SENSING',
      icon: <Sprout size={20} />
    },
    {
      id: 'asset',
      title: 'Asset Monitoring',
      desc: 'Track the operational state, orientation, vibration, or physical location of hardware assets with low-power telemetry beacons.',
      tag: 'TELEMETRY TRACKING',
      icon: <MapPin size={20} />
    },
    {
      id: 'dashboard',
      title: 'Connected Dashboard',
      desc: 'Visualize real-time device data streams, historic sensor trends, and diagnostic telemetry through a responsive web interface.',
      tag: 'WEB INTERFACE',
      icon: <LayoutDashboard size={20} />
    },
    {
      id: 'auto',
      title: 'Automated System',
      desc: 'Combine sensors, microcontrollers, edge logic, and mechanical actuators to create a self-regulating, automated physical prototype.',
      tag: 'CLOSED-LOOP CONTROL',
      icon: <Cog size={20} />
    }
  ];

  return (
    <section className="iot-projects-section" id="projects">
      <div className="iot-section-container">
        <div className="iot-section-header text-center">
          <span className="iot-meta-label">
            <span className="iot-meta-dot" />
            WHAT YOU'LL BUILD // PROJECT IDEAS
          </span>
          <h2 className="iot-section-title">Hands-On Connected Prototyping</h2>
          <p className="iot-section-subtitle muted-dark">
            Explore example project ideas that blend electronic circuits, microcontroller firmware, and web telemetry to solve real-world problems.
          </p>
        </div>

        <div className="iot-projects-grid">
          {projects.map((proj) => (
            <div className="iot-project-card" key={proj.id}>
              <div className="iot-project-icon-badge">
                {proj.icon}
              </div>
              <h3 className="iot-project-title">{proj.title}</h3>
              <p className="iot-project-desc">{proj.desc}</p>
              <div className="iot-project-footer">
                <span className="iot-project-tag">{proj.tag}</span>
              </div>
            </div>
          ))}
        </div>

        <p className="iot-disclaimer-note">
          * Example project concepts students can design and build during collaborative club hackathons and lab sessions.
        </p>
      </div>
    </section>
  );
}
