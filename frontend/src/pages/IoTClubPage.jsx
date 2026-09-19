import React, { useState, useEffect } from 'react';
import IoTNavbar from '../components/IoTNavbar';
import IoTHero from '../sections/IoTClub/IoTHero';
import IoTAbout from '../sections/IoTClub/IoTAbout';
import IoTHowItWorks from '../sections/IoTClub/IoTHowItWorks';
import IoTLearningPath from '../sections/IoTClub/IoTLearningPath';
import IoTHardwareLab from '../sections/IoTClub/IoTHardwareLab';
import IoTConnectedSystems from '../sections/IoTClub/IoTConnectedSystems';
import IoTToolkit from '../sections/IoTClub/IoTToolkit';
import IoTDataToAction from '../sections/IoTClub/IoTDataToAction';
import IoTWhatYoullBuild from '../sections/IoTClub/IoTWhatYoullBuild';
import IoTBuildingProgression from '../sections/IoTClub/IoTBuildingProgression';
import IoTCapstone from '../sections/IoTClub/IoTCapstone';
import IoTResponsible from '../sections/IoTClub/IoTResponsible';
import IoTSkillsExperience from '../sections/IoTClub/IoTSkillsExperience';
import IoTJoinCTA from '../sections/IoTClub/IoTJoinCTA';
import IoTFooter from '../sections/IoTClub/IoTFooter';
import { IoTOverviewModal, IoTSearchModal } from '../components/IoTClubModals/IoTClubModals';
import '../styles/IoTClub.css';

export default function IoTClubPage() {
  const [isOverviewOpen, setIsOverviewOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="iot-club-page">
      {/* 1. Header & Navigation */}
      <IoTNavbar onOpenSearch={() => setIsSearchOpen(true)} />

      <main id="main-iot-content">
        {/* 2. Three-Column Hero with Orbital Sphere Primary 3D Visual */}
        <IoTHero onWatchOverview={() => setIsOverviewOpen(true)} />

        {/* 3. About Section (Light Surface) */}
        <IoTAbout onOpenCurriculum={() => setIsOverviewOpen(true)} />

        {/* 4. How IoT Works (Dark Technical Surface) */}
        <IoTHowItWorks />

        {/* 5. IoT Learning Path (Light Surface) */}
        <IoTLearningPath />

        {/* 6. Hardware Lab (Dark Surface) */}
        <IoTHardwareLab />

        {/* 7. Connected Systems (Light Surface) */}
        <IoTConnectedSystems />

        {/* 8. IoT Toolkit (Dark Grid) */}
        <IoTToolkit />

        {/* 9. From Data to Action (Light Surface) */}
        <IoTDataToAction />

        {/* 10. What You'll Build (Dark Surface) */}
        <IoTWhatYoullBuild />

        {/* 11. Building Along the Way (Light Surface) */}
        <IoTBuildingProgression />

        {/* 12. Capstone Architecture (Dark Surface) */}
        <IoTCapstone />

        {/* 13. Responsible Technology (Light Surface) */}
        <IoTResponsible />

        {/* 14. Skills & Experience (Light Surface) */}
        <IoTSkillsExperience />

        {/* 15. Final Orange CTA Panel */}
        <IoTJoinCTA />
      </main>

      {/* 16. Footer */}
      <IoTFooter />

      {/* Interactive Modals */}
      <IoTOverviewModal
        isOpen={isOverviewOpen}
        onClose={() => setIsOverviewOpen(false)}
      />

      <IoTSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </div>
  );
}
