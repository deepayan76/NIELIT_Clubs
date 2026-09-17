import React, { useState, useEffect } from 'react';
import ProgNavbar from '../components/ProgNavbar';
import ProgHero from '../sections/ProgrammingClub/ProgHero';
import ProgAbout from '../sections/ProgrammingClub/ProgAbout';
import ProgHowItWorks from '../sections/ProgrammingClub/ProgHowItWorks';
import ProgPracticalLearning from '../sections/ProgrammingClub/ProgPracticalLearning';
import ProgToolkit from '../sections/ProgrammingClub/ProgToolkit';
import ProgBuildingProgression from '../sections/ProgrammingClub/ProgBuildingProgression';
import ProgCapstone from '../sections/ProgrammingClub/ProgCapstone';
import ProgProjects from '../sections/ProgrammingClub/ProgProjects';
import ProgSkillsExperience from '../sections/ProgrammingClub/ProgSkillsExperience';
import ProgJoinCTA from '../sections/ProgrammingClub/ProgJoinCTA';
import ProgFooter from '../sections/ProgrammingClub/ProgFooter';

import {
  CurriculumModal,
  OverviewModal,
  VisionModal,
  ProjectIdeasModal,
  SearchModal
} from '../components/ProgrammingClubModals/ProgModals';

import '../styles/ProgrammingClub.css';

export default function ProgrammingClubPage() {
  const [curriculumModalOpen, setCurriculumModalOpen] = useState(false);
  const [overviewModalOpen, setOverviewModalOpen] = useState(false);
  const [visionModalOpen, setVisionModalOpen] = useState(false);
  const [ideasModalOpen, setIdeasModalOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  useEffect(() => {
    document.title = 'Programming Club | NIELIT Tech Clubs';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="prog-club-page">
      {/* 1. Header & Navigation */}
      <ProgNavbar onOpenSearch={() => setSearchModalOpen(true)} />

      <main id="main-prog-content">
        {/* 2. Hero Section with 3-Column Layout & Structure Flow Three.js Animation */}
        <ProgHero onWatchOverview={() => setOverviewModalOpen(true)} />

        {/* 3. About Section (Light #F5F4EF) */}
        <ProgAbout onOpenVision={() => setVisionModalOpen(true)} />

        {/* 4. How It Works (Dark #0A0D11) */}
        <ProgHowItWorks />

        {/* 5. Practical Learning (Light #FFFFFF) */}
        <ProgPracticalLearning onOpenCurriculum={() => setCurriculumModalOpen(true)} />

        {/* 6. Programming Toolkit (Dark #0A0D11) */}
        <ProgToolkit />

        {/* 7. Building Along The Way (Light #F5F4EF) */}
        <ProgBuildingProgression />

        {/* 8. Capstone Project (Light #FFFFFF) */}
        <ProgCapstone onExploreProjects={() => setIdeasModalOpen(true)} />

        {/* 9. What You'll Build (Dark #0A0D11) */}
        <ProgProjects />

        {/* 10. Skills & Experience (Light #F5F4EF) */}
        <ProgSkillsExperience />

        {/* 11. Final Join Section (Solid Blue #2563EB) */}
        <ProgJoinCTA />
      </main>

      {/* 12. Footer */}
      <ProgFooter />

      {/* Modals */}
      <CurriculumModal
        isOpen={curriculumModalOpen}
        onClose={() => setCurriculumModalOpen(false)}
      />
      <OverviewModal
        isOpen={overviewModalOpen}
        onClose={() => setOverviewModalOpen(false)}
      />
      <VisionModal
        isOpen={visionModalOpen}
        onClose={() => setVisionModalOpen(false)}
      />
      <ProjectIdeasModal
        isOpen={ideasModalOpen}
        onClose={() => setIdeasModalOpen(false)}
      />
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
      />
    </div>
  );
}
