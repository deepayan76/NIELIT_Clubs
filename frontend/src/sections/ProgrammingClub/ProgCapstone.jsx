import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function ProgCapstone({ onExploreProjects }) {
  const capstoneStages = [
    {
      num: '01',
      title: 'DEFINE',
      desc: 'Choose a meaningful problem.'
    },
    {
      num: '02',
      title: 'DESIGN',
      desc: 'Plan the solution and architecture.'
    },
    {
      num: '03',
      title: 'DEVELOP',
      desc: 'Write, test and improve the software.'
    },
    {
      num: '04',
      title: 'PRESENT',
      desc: 'Demonstrate the final project and explain the approach.'
    }
  ];

  const exampleTech = ['JavaScript', 'React', 'Node.js', 'SQL', 'Git'];

  return (
    <section className="prog-capstone-section" id="capstone">
      <div className="prog-section-container">
        <div className="prog-capstone-grid">
          {/* Left: Capstone Framework */}
          <div>
            <div className="prog-section-eyebrow">CAPSTONE PROJECT</div>
            <h2 className="prog-capstone-heading">Turn Code Into Something Real.</h2>
            <p className="prog-capstone-desc">
              The capstone project brings together the concepts and skills developed through the practical activities. Students work individually or in teams to design, develop, test and present a complete software project.
            </p>

            <div className="prog-capstone-stages">
              {capstoneStages.map((st) => (
                <div key={st.num} className="prog-capstone-stage-card">
                  <div className="prog-capstone-stage-num">{st.num}</div>
                  <h4 className="prog-capstone-stage-title">{st.title}</h4>
                  <p className="prog-capstone-stage-text">{st.desc}</p>
                </div>
              ))}
            </div>

            <button
              type="button"
              className="prog-btn-primary"
              onClick={onExploreProjects}
            >
              <span>Explore Project Ideas</span>
              <ArrowRight size={15} />
            </button>
          </div>

          {/* Right: Example Project Box */}
          <div className="prog-example-project-box">
            <div className="prog-example-eyebrow">EXAMPLE PROJECT</div>
            <h3 className="prog-example-title">Student Productivity Platform</h3>
            <p className="prog-example-desc">
              A web-based application designed to help students organize tasks, manage study activities, and keep track of academic goals.
            </p>

            <div className="prog-example-tech-title">Technologies Used</div>
            <div className="prog-example-tech-tags">
              {exampleTech.map((tech) => (
                <span key={tech} className="prog-tech-tag">{tech}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
