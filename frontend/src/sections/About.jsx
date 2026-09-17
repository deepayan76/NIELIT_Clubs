import React from 'react';
import logoImg from '../assets/logo.png';
import exploreImg from '../assets/about/explore.png';
import createImg from '../assets/about/create.png';
import collaborateImg from '../assets/about/collaborate.png';
import Interactive3DScene from '../components/ThreeCanvas/Interactive3DScene';
import '../styles/About.css';

export default function About() {
  return (
    <section className="about-section container" id="about">
      <div className="about-grid">
        {/* Left Blue Panel */}
        <div className="about-left-panel">
          <div className="about-panel-header">
            <img src={logoImg} alt="NIELIT Logo" className="about-panel-logo" />
            <div className="about-panel-titles">
              <h2 className="about-panel-eyebrow">ABOUT NIELIT CLUBS</h2>
              <p className="about-panel-subtitle">
                A Space to Learn, Build &<br />
                Grow
              </p>
            </div>
          </div>

          <div className="about-panel-body">
            <p className="about-paragraph">
              NIELIT's technical clubs bring together students with a shared passion for
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

        {/* Right 3-Stage Process */}
        <div className="about-process-wrapper">
          {/* Stage 1: Explore */}
          <div className="process-stage stage-explore">
            <div className="stage-image-container image-left">
              <Interactive3DScene
                src={exploreImg}
                modelPath="/models/about/explore.glb"
                alt="Student exploring tech in 3D"
                className="stage-img stage-explore-img"
                maxRotX={0.075}
                maxRotY={0.10}
                maxTrans={0.08}
                scaleOnHover={1.04}
                floating={true}
                interactive={true}
                seed={1.2}
              />
            </div>
            <h3 className="stage-title">Explore</h3>
          </div>

          {/* Connector 1 */}
          <div className="process-connector" aria-hidden="true" />

          {/* Stage 2: Create */}
          <div className="process-stage stage-create">
            <h3 className="stage-title">Create</h3>
            <div className="stage-image-container image-right">
              <Interactive3DScene
                src={createImg}
                modelPath="/models/about/create.glb"
                alt="Student creating tech project in 3D"
                className="stage-img stage-create-img"
                maxRotX={0.075}
                maxRotY={0.10}
                maxTrans={0.08}
                scaleOnHover={1.04}
                floating={true}
                interactive={true}
                seed={3.4}
              />
            </div>
          </div>

          {/* Connector 2 */}
          <div className="process-connector" aria-hidden="true" />

          {/* Stage 3: Collaborate */}
          <div className="process-stage stage-collaborate">
            <h3 className="stage-title">Collaborate</h3>
            <div className="stage-image-container image-bottom">
              <Interactive3DScene
                src={collaborateImg}
                modelPath="/models/about/collaborate.glb"
                alt="Students collaborating in 3D"
                className="stage-img stage-collaborate-img"
                maxRotX={0.075}
                maxRotY={0.10}
                maxTrans={0.08}
                scaleOnHover={1.04}
                floating={true}
                interactive={true}
                seed={5.6}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
