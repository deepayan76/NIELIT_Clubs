import React from 'react';

export default function ProgHowItWorks() {
  const stages = [
    {
      num: '01',
      title: 'LEARN',
      desc: 'Understand programming concepts and core principles.'
    },
    {
      num: '02',
      title: 'PRACTICE',
      desc: 'Write code through guided exercises and challenges.'
    },
    {
      num: '03',
      title: 'SOLVE',
      desc: 'Break problems down and develop efficient solutions.'
    },
    {
      num: '04',
      title: 'BUILD',
      desc: 'Turn ideas into working applications and software.'
    },
    {
      num: '05',
      title: 'CAPSTONE',
      desc: 'Apply your skills to a larger real-world project.'
    }
  ];

  return (
    <section className="prog-how-section" id="how-it-works">
      <div className="prog-section-container">
        <div className="prog-how-header">
          <div className="prog-section-eyebrow">HOW IT WORKS</div>
          <h2 className="prog-how-heading">From Logic To Software.</h2>
          <p className="prog-how-desc">
            A structured journey that takes you from understanding programming fundamentals to building complete projects.
          </p>
        </div>

        <div className="prog-how-stages-wrapper">
          <div className="prog-how-line" />
          <div className="prog-how-stages">
            {stages.map((st) => (
              <div key={st.num} className="prog-how-stage">
                <div className="prog-how-marker">{st.num}</div>
                <h3 className="prog-how-stage-title">{st.title}</h3>
                <p className="prog-how-stage-desc">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
