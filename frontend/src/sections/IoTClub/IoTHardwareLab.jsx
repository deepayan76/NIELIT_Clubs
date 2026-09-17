import React from 'react';
import { Eye, Cpu, Radio, Zap, BatteryCharging } from 'lucide-react';

export default function IoTHardwareLab() {
  const categories = [
    {
      id: 'sensors',
      title: 'SENSORS',
      desc: 'Transducers measuring ambient physics into precision digital data.',
      icon: <Eye size={20} />,
      items: ['DHT22 / BME280 Environment', 'HC-SR04 Ultrasonic Distance', 'MPU6050 6-Axis Gyro/Acc', 'LDR & Infrared Optical Modules', 'Soil Moisture & Water Level']
    },
    {
      id: 'mcus',
      title: 'MICROCONTROLLERS',
      desc: 'Programmable silicon driving real-time edge calculations & control.',
      icon: <Cpu size={20} />,
      items: ['ESP32 Dual-Core (Wi-Fi/BLE)', 'STM32 ARM Cortex-M Series', 'Arduino UNO / Nano AVR', 'Raspberry Pi Pico RP2040', 'Hardware Timers & DMA Channels']
    },
    {
      id: 'actuators',
      title: 'ACTUATORS',
      desc: 'Physical mechanisms converting electronic logic into mechanical action.',
      icon: <Zap size={20} />,
      items: ['SG90 & MG996R Servo Motors', 'Optocoupled Solid-State Relays', 'Stepper Motors & A4988 Drivers', 'Piezo Buzzers & Audio Alarms', '0.96" I2C OLED Displays']
    },
    {
      id: 'communication',
      title: 'COMMUNICATION',
      desc: 'Wireless and wired protocols establishing telemetry networks.',
      icon: <Radio size={20} />,
      items: ['2.4 GHz 802.11 b/g/n Wi-Fi', 'Bluetooth Low Energy (BLE)', 'NRF24L01 RF Transceivers', 'LoRa SX1278 Long-Range', 'Hardware UART / I2C / SPI Buses']
    },
    {
      id: 'power',
      title: 'POWER',
      desc: 'Reliable energy distribution, voltage regulation & battery management.',
      icon: <BatteryCharging size={20} />,
      items: ['LiPo TP4056 Battery Charging', 'Buck & Boost DC Converters', 'Deep Sleep State Optimization', 'Solar Energy Harvesting', 'Low-Dropout (LDO) Regulators']
    }
  ];

  return (
    <section className="iot-hardware-section" id="hardware-lab">
      <div className="iot-section-container">
        <div className="iot-section-header">
          <span className="iot-meta-label">
            <span className="iot-meta-dot" />
            THE HARDWARE LAB
          </span>
          <h2 className="iot-section-title">Build Things That Sense the World</h2>
          <p className="iot-section-subtitle muted-dark">
            Work with sensors, microcontrollers, actuators, communication modules, and embedded systems to understand how connected devices interact with their environment.
          </p>
        </div>

        <div className="iot-hardware-categories-grid">
          {categories.map((cat) => (
            <div className="iot-hw-category-card" key={cat.id}>
              <div className="iot-hw-icon-wrap">
                {cat.icon}
              </div>
              <h3 className="iot-hw-cat-title">{cat.title}</h3>
              <p className="iot-hw-cat-desc">{cat.desc}</p>
              <div className="iot-hw-tags">
                {cat.items.map((item) => (
                  <div className="iot-hw-tag-item" key={item}>
                    <span className="iot-hw-tag-bullet" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="iot-disclaimer-note">
          * These represent engineering learning categories and example modules students explore during practical club workshops.
        </p>
      </div>
    </section>
  );
}
