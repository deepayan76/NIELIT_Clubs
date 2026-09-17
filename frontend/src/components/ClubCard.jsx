import React from 'react';
import Button from './Button';
import Interactive3DScene from './ThreeCanvas/Interactive3DScene';
import { navigate } from '../utils/router';
import '../styles/ClubCard.css';

const clubConfig = {
  ai: {
    accentHex: '#8B5CF6',
    modelPath: '/models/clubs/ai/ai-club.glb',
    hoverTargetName: 'robot',
    href: '/ai'
  },
  programming: {
    accentHex: '#2563EB',
    modelPath: '/models/clubs/programming/programming-club.glb',
    hoverTargetName: 'laptop',
    href: '/programming'
  },
  cybersecurity: {
    accentHex: '#10B981',
    modelPath: '/models/clubs/cybersecurity/cybersecurity-club.glb',
    hoverTargetName: 'shield',
    href: '/cybersecurity'
  },
  iot: {
    accentHex: '#F97316',
    modelPath: '/models/clubs/iot/iot-club.glb',
    hoverTargetName: 'iot_board',
    href: '/iot'
  }
};

export default function ClubCard({ club, index }) {
  const { id, name, description, image } = club;
  const config = clubConfig[id] || {
    accentHex: '#8EA8C0',
    modelPath: null,
    hoverTargetName: null,
    href: '#register'
  };

  const handleExplore = (e) => {
    if (config.href.startsWith('/')) {
      e.preventDefault();
      navigate(config.href);
    }
  };

  return (
    <article className="club-card" id={`club-${id}`}>
      <div className="club-card-media">
        <Interactive3DScene
          src={image}
          modelPath={config.modelPath}
          hoverTargetName={config.hoverTargetName}
          alt={`${name} 3D illustration`}
          className="club-card-image"
          accentColor={config.accentHex}
          maxRotX={0.08}
          maxRotY={0.11}
          maxTrans={0.10}
          scaleOnHover={1.04}
          floating={true}
          interactive={true}
          seed={index * 2.5}
        />
      </div>
      <div className="club-card-content">
        <h3 className="club-card-title">{name}</h3>
        <p className="club-card-description">{description}</p>
        <div className="club-card-action">
          <Button
            variant="white"
            size="sm"
            href={config.href}
            onClick={handleExplore}
            className="club-explore-btn"
            ariaLabel={`Explore ${name}`}
          >
            Explore &gt;
          </Button>
        </div>
      </div>
    </article>
  );
}
