import React, { useState, useEffect } from 'react';
import AINavbar from '../components/AINavbar';
import AIHero from '../sections/AIClub/AIHero';
import AIAbout from '../sections/AIClub/AIAbout';
import AIHowItWorks from '../sections/AIClub/AIHowItWorks';
import AIPracticalLearning from '../sections/AIClub/AIPracticalLearning';
import AIBuildingProgression from '../sections/AIClub/AIBuildingProgression';
import AICapstone from '../sections/AIClub/AICapstone';
import AISkillsExperience from '../sections/AIClub/AISkillsExperience';
import AIJoinCTA from '../sections/AIClub/AIJoinCTA';
import AIFooter from '../sections/AIClub/AIFooter';

import CurriculumModal from '../components/AIClubModals/CurriculumModal';
import {
  OverviewModal,
  VisionModal,
  ProjectIdeasModal,
  SearchModal
} from '../components/AIClubModals/AIClubModals';

import '../styles/AIClub.css';

export default function AIClubPage() {
  const [curriculumModalOpen, setCurriculumModalOpen] = useState(false);
  const [overviewModalOpen, setOverviewModalOpen] = useState(false);
  const [visionModalOpen, setVisionModalOpen] = useState(false);
  const [ideasModalOpen, setIdeasModalOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="ai-club-page">
      {/* 1. Minimal Fixed/Sticky Navbar */}
      <AINavbar onOpenSearch={() => setSearchModalOpen(true)} />

      <main id="main-ai-content">
        {/* 2. Hero Section with Three-Column Layout & PredictiveArcCanvas */}
        <AIHero onWatchOverview={() => setOverviewModalOpen(true)} />

        {/* 3. About Section (Light) */}
        <AIAbout onOpenVision={() => setVisionModalOpen(true)} />

        {/* 4. How It Works (Dark) */}
        <AIHowItWorks />

        {/* 5. Practical Learning (Light) */}
        <AIPracticalLearning onOpenCurriculum={() => setCurriculumModalOpen(true)} />

        {/* 6. Building Along The Way (Dark) */}
        <AIBuildingProgression />

        {/* 7. Capstone Section (Light) */}
        <AICapstone onExploreProjects={() => setIdeasModalOpen(true)} />

        {/* 8. Skills & Experience (Dark) */}
        <AISkillsExperience />

        {/* 9. Final Join CTA Section (Emerald) */}
        <AIJoinCTA />
      </main>

      {/* 10. Dark Footer */}
      <AIFooter />

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
