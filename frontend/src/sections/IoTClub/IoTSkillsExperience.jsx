import React from 'react';

export default function IoTSkillsExperience() {
  const skillSets = [
    {
      category: 'HARDWARE',
      skills: ['Sensors & Transducers', 'Microcontrollers (ESP32/STM32)', 'Embedded Systems', 'Circuit Understanding & Prototyping']
    },
    {
      category: 'SOFTWARE',
      skills: ['C / C++ & MicroPython', 'REST & Streaming APIs', 'Backend Integration', 'Data Handling & Visualization']
    },
    {
      category: 'NETWORKING',
      skills: ['Device Communication', 'Protocols (MQTT, HTTP, BLE)', 'Wireless Connectivity', 'System Architecture']
    },
    {
      category: 'PROBLEM SOLVING',
      skills: ['Hardware & Signal Debugging', 'Hands-On Experimentation', 'Iterative Prototyping', 'Systems Thinking']
    }
  ];

  return (
    <section className="iot-skills-section" id="skills">
      <div className="iot-section-container">
        <div className="iot-section-header">
          <span className="iot-meta-label">
            <span className="iot-meta-dot" />
            SKILLS & EXPERIENCE
          </span>
          <h2 className="iot-section-title dark-text">Engineering Capabilities You Will Develop</h2>
          <p className="iot-section-subtitle muted-light">
            Acquire a comprehensive skill set bridging physical electronics, embedded firmware, networking protocols, and cloud computing.
          </p>
        </div>

        <div className="iot-skills-grid">
          {skillSets.map((set) => (
            <div className="iot-skills-card" key={set.category}>
              <h3 className="iot-skills-cat-title">{set.category}</h3>
              <ul className="iot-skills-list">
                {set.skills.map((skill) => (
                  <li className="iot-skill-item" key={skill}>
                    <span className="iot-skill-dot" />
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
