import React from 'react';
import { HoverTransition } from '@/components/ui/hover-transition';
import AboutMobileCardStack from '../components/AboutMobileCardStack';
import learnImg from '../assets/about/learn.png';
import buildImg from '../assets/about/build.png';
import leadImg from '../assets/about/lead.png';
import '../styles/About.css';

const pillars = [
  {
    title: 'LEARN',
    accessibleLabel: 'Learn',
    image: learnImg,
    description:
      'At NEXORA, learning goes beyond textbooks and lectures. Members explore emerging technologies, understand how things work, and build a strong foundation through hands-on experimentation.',
  },
  {
    title: 'BUILD',
    accessibleLabel: 'Build',
    image: buildImg,
    description:
      'At NEXORA, building means turning knowledge into real-world projects. Members take their ideas, experiment with technologies, solve problems, and create practical solutions that bring concepts to life.',
  },
  {
    title: 'LEAD',
    accessibleLabel: 'Lead',
    image: leadImg,
    description:
      'At NEXORA, leading means using your knowledge and skills to inspire others, take initiative, and make a positive impact. Members grow as confident problem-solvers, collaborators, and innovators who contribute to the community and help others move forward.',
  },
];

export default function About() {
  return (
    <section className="about-section container" id="about">
      <div className="about-container-wrapper">
        {/* Existing About Card (Preserved Intact) */}
        <div className="about-left-panel">
          <div className="about-panel-header">
            <img src="/nexora-icon.png" alt="NEXORA Icon" className="about-panel-logo" />
            <div className="about-panel-titles">
              <h2 className="about-panel-eyebrow">ABOUT NEXORA CLUBS</h2>
              <p className="about-panel-subtitle">
                A Space to Learn, Build & Lead
              </p>
            </div>
          </div>

          <div className="about-panel-body">
            <p className="about-paragraph">
              NEXORA's technical clubs bring together students with a shared passion for
              technology and innovation. Through the AI, Programming, Cybersecurity, and
              IoT clubs, students get opportunities to explore their interests, develop
              practical skills, work on projects, and learn from one another.
            </p>
            <p className="about-paragraph">
              Whether you're discovering technology for the first time or already building
              your own projects, there's a club for you.
            </p>
          </div>
        </div>

        {/* Learn / Build / Lead Pillars Section (Desktop Grid) */}
        <div className="about-pillars-grid desktop-only" aria-label="NEXORA Core Pillars: Learn, Build, Lead">
          {pillars.map((pillar) => (
            <HoverTransition
              key={pillar.title}
              effect="morph"
              direction="center"
              duration={0.72}
              easing="cubic-bezier(0.22, 1, 0.36, 1)"
              label={pillar.accessibleLabel}
              className="about-pillar-card"
              defaultComponent={
                <div className="pillar-default-content">
                  <div className="pillar-image-box">
                    <img
                      src={pillar.image}
                      alt={`${pillar.title} illustration`}
                      className="pillar-illustration"
                      loading="lazy"
                    />
                  </div>
                  <div className="pillar-default-footer">
                    <span className="pillar-default-label">{pillar.title}</span>
                  </div>
                </div>
              }
              hoverComponent={
                <div className="pillar-hover-content">
                  <h3 className="pillar-hover-title">{pillar.title}</h3>
                  <div className="pillar-hover-divider" aria-hidden="true" />
                  <p className="pillar-hover-desc">{pillar.description}</p>
                </div>
              }
            />
          ))}
        </div>

        {/* Mobile-Only Scroll-Driven Stacked Card Animation */}
        <AboutMobileCardStack pillars={pillars} />
      </div>
    </section>
  );
}
