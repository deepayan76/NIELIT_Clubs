import aiImg from '../assets/clubs/ai.png';
import programmingImg from '../assets/clubs/programming.png';
import cyberImg from '../assets/clubs/cybersecurity.png';
import iotImg from '../assets/clubs/iot.png';

import aiIcon from '../assets/icons/ai-icon.svg';
import programmingIcon from '../assets/icons/programming-icon.svg';
import cyberIcon from '../assets/icons/cyber-icon.svg';
import iotIcon from '../assets/icons/iot-icon.svg';

export const clubs = [
  {
    id: "ai",
    name: "AI Club",
    shortName: "AI",
    description: "Explore Artificial Intelligence and Machine Learning through hands-on projects, experiments, and real-world applications.",
    image: aiImg,
    icon: aiIcon,
    accentColor: "var(--ai-purple)"
  },
  {
    id: "programming",
    name: "Programming Club",
    shortName: "Programming",
    description: "Sharpen your coding skills, solve problems, build software, and turn ideas into working projects.",
    image: programmingImg,
    icon: programmingIcon,
    accentColor: "var(--programming-blue)"
  },
  {
    id: "cybersecurity",
    name: "Cybersecurity Club",
    shortName: "Cybersecurity",
    description: "Learn to identify, understand, and defend against cyber threats through ethical hacking, security challenges, and practical learning.",
    image: cyberImg,
    icon: cyberIcon,
    accentColor: "var(--cyber-green)"
  },
  {
    id: "iot",
    name: "IoT Club",
    shortName: "IoT",
    description: "Connect the physical and digital worlds by building smart systems with sensors, embedded devices, and connected technologies.",
    image: iotImg,
    icon: iotIcon,
    accentColor: "var(--iot-orange)"
  }
];
