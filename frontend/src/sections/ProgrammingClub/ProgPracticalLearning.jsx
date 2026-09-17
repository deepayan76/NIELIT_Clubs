import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function ProgPracticalLearning({ onOpenCurriculum }) {
  const lessons = [
    {
      num: '01',
      title: 'PROGRAMMING FUNDAMENTALS',
      theory: 'Understand variables, data types, conditions, loops and functions.',
      practical: 'Build small programs and solve structured coding exercises.'
    },
    {
      num: '02',
      title: 'PROBLEM SOLVING',
      theory: 'Learn how to break complex problems into smaller logical steps.',
      practical: 'Solve programming challenges using systematic approaches.'
    },
    {
      num: '03',
      title: 'DATA STRUCTURES',
      theory: 'Understand how data can be organized and accessed efficiently.',
      practical: 'Implement and use common data structures.'
    },
    {
      num: '04',
      title: 'ALGORITHMS',
      theory: 'Learn how algorithms can make solutions more efficient.',
      practical: 'Design, implement and compare different approaches.'
    },
    {
      num: '05',
      title: 'GIT & COLLABORATION',
      theory: 'Learn the basics of version control and collaborative development.',
      practical: 'Create repositories, commit code and collaborate through Git.'
    },
    {
      num: '06',
      title: 'SOFTWARE DEVELOPMENT',
      theory: 'Understand how individual programs become complete software projects.',
      practical: 'Build a small working application as a team.'
    }
  ];

  return (
    <section className="prog-practice-section" id="practice">
      <div className="prog-section-container">
        <div className="prog-practice-header">
          <div>
            <div className="prog-section-eyebrow">PRACTICAL LEARNING</div>
            <h2 className="prog-practice-heading">Write It.<br />Run It.<br />Improve It.</h2>
            <p className="prog-practice-desc">
              Every activity gives students an opportunity to write code, test ideas, solve problems, and understand how software works in practice.
            </p>
          </div>
          <button
            type="button"
            className="prog-btn-primary"
            onClick={onOpenCurriculum}
          >
            <span>View Full Curriculum</span>
            <ArrowRight size={15} />
          </button>
        </div>

        <div className="prog-practice-grid">
          {lessons.map((item) => (
            <div key={item.num} className="prog-practice-card">
              <div className="prog-card-top">
                <span className="prog-card-num">{item.num}</span>
              </div>
              <h3 className="prog-card-title">{item.title}</h3>
              <p className="prog-card-theory">{item.theory}</p>
              <div className="prog-card-practical">
                <strong>Practical Task</strong>
                {item.practical}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
