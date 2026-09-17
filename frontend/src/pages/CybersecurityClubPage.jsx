import React, { useState, useEffect } from 'react';
import CyberNavbar from '../components/CyberNavbar';
import CyberHero from '../sections/CybersecurityClub/CyberHero';
import CyberAbout from '../sections/CybersecurityClub/CyberAbout';
import CyberHowItWorks from '../sections/CybersecurityClub/CyberHowItWorks';
import CyberPracticalLearning from '../sections/CybersecurityClub/CyberPracticalLearning';
import CyberToolkit from '../sections/CybersecurityClub/CyberToolkit';
import CyberThreatDefense from '../sections/CybersecurityClub/CyberThreatDefense';
import CyberBuildingProgression from '../sections/CybersecurityClub/CyberBuildingProgression';
import CyberCapstone from '../sections/CybersecurityClub/CyberCapstone';
import CyberProjects from '../sections/CybersecurityClub/CyberProjects';
import CyberResponsible from '../sections/CybersecurityClub/CyberResponsible';
import CyberSkillsExperience from '../sections/CybersecurityClub/CyberSkillsExperience';
import CyberJoinCTA from '../sections/CybersecurityClub/CyberJoinCTA';
import CyberFooter from '../sections/CybersecurityClub/CyberFooter';
import {
  CyberOverviewModal,
  CyberCurriculumModal,
  CyberProjectIdeasModal,
  CyberResponsibleCharterModal,
  CyberSearchModal
} from '../components/CybersecurityModals/CyberModals';
import '../styles/CybersecurityClub.css';

export default function CybersecurityClubPage() {
  const [isOverviewOpen, setIsOverviewOpen] = useState(false);
  const [isCurriculumOpen, setIsCurriculumOpen] = useState(false);
  const [isProjectIdeasOpen, setIsProjectIdeasOpen] = useState(false);
  const [isCharterOpen, setIsCharterOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    document.title = 'Cybersecurity Club | NIELIT Tech Clubs';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="cyber-club-page">
      {/* 1. Header & Sable Top Dock Navigation */}
      <CyberNavbar onOpenSearch={() => setIsSearchOpen(true)} />

      <main id="main-cyber-content">
        {/* 2. Hero Section with 2-Column Layout & Flux Vortex Three.js Animation */}
        <CyberHero onWatchOverview={() => setIsOverviewOpen(true)} />

        {/* 3. About Section (Light #F5F5F2) */}
        <CyberAbout onOpenCharter={() => setIsCharterOpen(true)} />

        {/* 4. How It Works / Continuous Security Loop (Dark #0A0D0F) */}
        <CyberHowItWorks />

        {/* 5. Practical Learning (Light #FFFFFF) */}
        <CyberPracticalLearning onOpenCurriculum={() => setIsCurriculumOpen(true)} />

        {/* 6. Security Toolkit (Dark #0A0D0F) */}
        <CyberToolkit />

        {/* 7. Threat → Defense Matrix (Near-Black #050607) */}
        <CyberThreatDefense />

        {/* 8. Building Along The Way (Light #F5F5F2) */}
        <CyberBuildingProgression />

        {/* 9. Capstone Project (Light #FFFFFF) */}
        <CyberCapstone onExploreProjects={() => setIsProjectIdeasOpen(true)} />

        {/* 10. What You'll Build (Dark #0A0D0F) */}
        <CyberProjects />

        {/* 11. Responsible Security (Light #F5F5F2) */}
        <CyberResponsible />

        {/* 12. Skills & Experience (Light #FFFFFF) */}
        <CyberSkillsExperience />

        {/* 13. Final Join Section (Solid Green #10B981) */}
        <CyberJoinCTA />
      </main>

      {/* 14. Footer */}
      <CyberFooter />

      {/* Interactive Modals */}
      <CyberOverviewModal
        isOpen={isOverviewOpen}
        onClose={() => setIsOverviewOpen(false)}
      />

      <CyberCurriculumModal
        isOpen={isCurriculumOpen}
        onClose={() => setIsCurriculumOpen(false)}
      />

      <CyberProjectIdeasModal
        isOpen={isProjectIdeasOpen}
        onClose={() => setIsProjectIdeasOpen(false)}
      />

      <CyberResponsibleCharterModal
        isOpen={isCharterOpen}
        onClose={() => setIsCharterOpen(false)}
      />

      <CyberSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </div>
  );
}
