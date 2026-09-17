import React from 'react';
import { ArrowRight, Code, Database, Cpu, Sparkles, Terminal } from 'lucide-react';

export default function AIPracticalLearning({ onOpenCurriculum }) {
  const lessons = [
    {
      num: '01',
      title: 'AI Fundamentals',
      desc: 'Understand what AI is, how it works, and where it is used.',
      practical: 'Build a simple AI application.',
      icon: Terminal
    },
    {
      num: '02',
      title: 'Python for AI',
      desc: 'Python concepts and tools for AI and ML.',
      practical: 'Work with data and build a small AI project.',
      icon: Code
    },
    {
      num: '03',
      title: 'Working with Data',
      desc: 'Collecting, cleaning, analyzing and visualizing data.',
      practical: 'Analyze and visualize a real dataset.',
      icon: Database
    },
    {
      num: '04',
      title: 'Machine Learning',
      desc: 'How models learn, train and evaluate.',
      practical: 'Train and evaluate a model.',
      icon: Cpu
    },
    {
      num: '05',
      title: 'Generative AI',
      desc: 'Modern AI models and real-world applications.',
      practical: 'Build an application using an AI API.',
      icon: Sparkles
    }
  ];

  return (
    <section className="ai-practical-section" id="curriculum">
      <div className="ai-section-container">
        {/* Header Block */}
        <div className="ai-practical-header">
          <div>
            <span className="ai-section-eyebrow">PRACTICAL LEARNING</span>
            <h2 className="ai-section-title-light ai-title-split">
              <span>Learn It.</span>
              <span>Use It.</span>
            </h2>
          </div>
          <div className="ai-practical-sub-col">
            <p className="ai-practical-subtitle">
              Each session focuses on a specific topic and gives you the opportunity
              to work with it directly.
            </p>
            <button
              type="button"
              className="ai-link-btn ai-curriculum-cta"
              onClick={onOpenCurriculum}
            >
              <span>View Full Curriculum</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="ai-practical-cards-grid">
          {lessons.map((lesson) => {
            const Icon = lesson.icon;
            return (
              <div key={lesson.num} className="ai-lesson-card">
                <div className="ai-lesson-top">
                  <span className="ai-lesson-num">{lesson.num}</span>
                  <Icon size={18} className="ai-lesson-icon" strokeWidth={1.75} />
                </div>
                <h3 className="ai-lesson-title">{lesson.title}</h3>
                <p className="ai-lesson-desc">{lesson.desc}</p>
                <div className="ai-lesson-practical-box">
                  <span className="ai-practical-tag">Practical:</span>
                  <p className="ai-practical-text">{lesson.practical}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
