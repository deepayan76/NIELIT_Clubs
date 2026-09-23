import React from 'react';
import { ArrowRight, Terminal, Cpu, Layers } from 'lucide-react';

export default function AICapstone({ onExploreProjects }) {
  const tags = ['Python', 'NLP', 'APIs', 'Machine Learning', 'Web Development'];

  return (
    <section className="ai-capstone-section" id="capstone">
      <div className="ai-section-container">
        <div className="ai-capstone-grid">
          {/* Left Column: Information & Action */}
          <div className="ai-capstone-info-col">
            <span className="ai-section-eyebrow">CAPSTONE PROJECT</span>
            <h2 className="ai-section-title-light">
              Turn What You Learned Into Something Real.
            </h2>
            <div className="ai-capstone-divider" />
            <p className="ai-capstone-desc">
              The capstone project gives you the opportunity to apply everything
              you've learned to solve a meaningful problem. Work individually or
              in a team to build, test and present a complete AI-powered solution.
            </p>
            <button
              type="button"
              className="ai-link-btn"
              onClick={onExploreProjects}
            >
              <span>Explore Project Ideas</span>
              <ArrowRight size={15} />
            </button>
          </div>

          {/* Right Column: Example Project Card */}
          <div className="ai-capstone-card-col">
            <div className="ai-capstone-project-card">
              <div className="ai-card-header-bar">
                <span className="ai-card-badge">Example Project</span>
                <span className="ai-card-status">DEPLOYED PROTOTYPE</span>
              </div>

              <div className="ai-card-body-content">
                <h3 className="ai-capstone-proj-title">
                  AI-Powered Student Assistant
                </h3>
                <p className="ai-capstone-proj-desc">
                  A smart assistant to help students find information, organize tasks
                  and interact with NEXORA club resources.
                </p>

                {/* Technical Architecture Specs */}
                <div className="ai-capstone-specs-grid">
                  <div className="ai-spec-item">
                    <span className="ai-spec-label">Domain</span>
                    <span className="ai-spec-val">NLP & Conversational AI</span>
                  </div>
                  <div className="ai-spec-item">
                    <span className="ai-spec-label">Deliverable</span>
                    <span className="ai-spec-val">Working Web Application</span>
                  </div>
                  <div className="ai-spec-item">
                    <span className="ai-spec-label">Team Format</span>
                    <span className="ai-spec-val">1 - 3 Students</span>
                  </div>
                </div>

                {/* Technology Tags */}
                <div className="ai-tech-tags-wrapper">
                  <span className="ai-tags-label">STACK:</span>
                  <div className="ai-tech-tags-list">
                    {tags.map((tag) => (
                      <span key={tag} className="ai-tech-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
