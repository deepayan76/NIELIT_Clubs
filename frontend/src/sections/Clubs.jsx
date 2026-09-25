"use client";

import React, { useState } from 'react';
import SectionHeading from '../components/SectionHeading';
import { OrbitCardStack } from '@/components/ui/orbit-card-stack';
import ClubsMobileCardStack from '../components/ClubsMobileCardStack';
import { navigate } from '../utils/router';
import aiImg from '../assets/clubs/ai-card.png';
import programmingImg from '../assets/clubs/programming-card.png';
import cyberImg from '../assets/clubs/cybersecurity-card.png';
import iotImg from '../assets/clubs/iot-card.png';
import '../styles/Clubs.css';

const clubStackItems = [
  {
    name: "AI Club",
    role: "Artificial Intelligence",
    description: "Explore Artificial Intelligence and Machine Learning through hands-on projects, experiments, and real-world applications.",
    initials: "AI",
    stat: "Neural Networks & ML",
    accent: "#8B5CF6",
    image: aiImg,
    href: "/ai"
  },
  {
    name: "Programming Club",
    role: "Software Engineering",
    description: "Sharpen your coding skills, solve problems, build software, and turn ideas into working projects.",
    initials: "PC",
    stat: "Algorithms & Systems",
    accent: "#2563EB",
    image: programmingImg,
    href: "/programming"
  },
  {
    name: "Cybersecurity Club",
    role: "Security & Defense",
    description: "Learn to identify, understand, and defend against cyber threats through ethical hacking, security challenges, and practical learning.",
    initials: "CS",
    stat: "Ethical Hacking & SecOps",
    accent: "#10B981",
    image: cyberImg,
    href: "/cybersecurity"
  },
  {
    name: "IoT Club",
    role: "Connected Systems",
    description: "Connect the physical and digital worlds by building smart systems with sensors, embedded devices, and connected technologies.",
    initials: "IOT",
    stat: "Embedded & Robotics",
    accent: "#F97316",
    image: iotImg,
    href: "/iot"
  }
];

export default function Clubs() {
  const [activeClub, setActiveClub] = useState(clubStackItems[0]);

  const handleCardClick = (item) => {
    if (item && item.href) {
      navigate(item.href);
    }
  };

  return (
    <section className="clubs-section container" id="clubs">
      <SectionHeading
        title="Explore clubs"
        subtitle="Find the space where you belong."
        align="center"
      />

      {/* Desktop Orbit Stack (Unchanged) */}
      <div className="clubs-orbit-wrapper desktop-only">
        <OrbitCardStack
          items={clubStackItems}
          defaultActiveIndex={0}
          spread={150}
          lift={40}
          onActiveChange={(item) => setActiveClub(item)}
          onCardClick={handleCardClick}
        />
      </div>

      {/* Mobile Scroll-Driven Card Stack */}
      <ClubsMobileCardStack
        items={clubStackItems}
        onCardClick={handleCardClick}
      />
    </section>
  );
}
