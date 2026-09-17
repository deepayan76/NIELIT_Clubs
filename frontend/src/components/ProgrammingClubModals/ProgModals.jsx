import React, { useEffect, useState } from 'react';
import { X, CheckCircle, Clock, BookOpen, Search, ArrowRight, Play, Award, Code, Terminal, Layers } from 'lucide-react';
import { navigate } from '../../utils/router';

export function CurriculumModal({ isOpen, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const modules = [
    {
      num: '01',
      title: 'Programming Fundamentals & Computational Logic',
      duration: '4 Weeks',
      topics: [
        'Memory, variables, data types, and operators',
        'Control structures: nested conditionals and loop invariants',
        'Modular architecture: functional decomposition & scope',
        'Hands-on: Implementing core mathematical algorithms & logic puzzles'
      ]
    },
    {
      num: '02',
      title: 'Data Structures & Memory Models',
      duration: '4 Weeks',
      topics: [
        'Arrays, dynamic vectors, strings, and matrix processing',
        'Linked lists, stacks, queues, and recursion depth',
        'Trees (BST, AVL) and graph representations (Adjacency Lists)',
        'Hands-on: Building custom data structures from scratch in C++ / Python'
      ]
    },
    {
      num: '03',
      title: 'Algorithmic Problem Solving & Optimization',
      duration: '4 Weeks',
      topics: [
        'Asymptotic analysis: Big-O, time & space trade-offs',
        'Sorting & searching: quicksort, binary search variations',
        'Dynamic programming & greedy paradigms',
        'Hands-on: Competitive programming sprints & LeetCode challenge series'
      ]
    },
    {
      num: '04',
      title: 'Modern Software Engineering & Git Version Control',
      duration: '4 Weeks',
      topics: [
        'Git branching models (GitFlow), rebasing, conflict resolution & PRs',
        'Object-oriented design patterns & clean code principles (SOLID)',
        'Unit testing, CI/CD automated linting & test suites',
        'Hands-on: Collaborative open-source contribution sprint on GitHub'
      ]
    },
    {
      num: '05',
      title: 'Full-Stack Software Architecture',
      duration: '4 Weeks',
      topics: [
        'Web architecture: HTTP protocols, RESTful APIs & WebSocket communication',
        'Frontend state management & reactive component trees',
        'Backend services, database modeling (SQL / Relational Schema) & caching',
        'Hands-on: Building scalable microservices and API gateways'
      ]
    },
    {
      num: '06',
      title: 'Capstone Engineering & Software Deployment',
      duration: '4 Weeks',
      topics: [
        'System design, architectural review & technical specifications',
        'End-to-end development, containerization with Docker',
        'Production monitoring, error handling, and performance tuning',
        'Hands-on: Ship full capstone software to production'
      ]
    }
  ];

  return (
    <div className="prog-modal-overlay" onClick={onClose}>
      <div className="prog-modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '780px' }}>
        <button type="button" className="prog-modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <BookOpen size={20} color="var(--prog-blue)" />
          <span className="prog-section-eyebrow" style={{ margin: 0 }}>OFFICIAL SYLLABUS</span>
        </div>
        <h2 className="prog-modal-title">Programming Club Curriculum</h2>
        <p className="prog-modal-subtitle">
          Comprehensive 24-week engineering progression designed to build foundational mastery, problem-solving prowess, and production-grade software delivery.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {modules.map((m) => (
            <div
              key={m.num}
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid var(--prog-dark-border)',
                borderLeft: '4px solid var(--prog-blue)',
                borderRadius: '4px',
                padding: '18px 20px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ fontSize: '12px', fontWeight: '800', color: 'var(--prog-blue)', letterSpacing: '0.1em' }}>
                  MODULE {m.num}
                </span>
                <span style={{ fontSize: '12px', color: 'var(--prog-text-muted-dark)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={13} /> {m.duration}
                </span>
              </div>
              <h4 style={{ fontSize: '15px', fontWeight: '700', color: '#ffffff', marginBottom: '10px' }}>{m.title}</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {m.topics.map((t, idx) => (
                  <li key={idx} style={{ fontSize: '13px', color: 'var(--prog-text-muted-dark)', display: 'flex', alignItems: 'flex-start', gap: '8px', lineHeight: '1.4' }}>
                    <CheckCircle size={14} color="var(--prog-blue)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '24px', paddingTop: '18px', borderTop: '1px solid var(--prog-dark-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <span style={{ fontSize: '13px', color: 'var(--prog-text-muted-dark)' }}>Prerequisites: Basic arithmetic & curiosity to code.</span>
          <button
            type="button"
            className="prog-btn-primary"
            onClick={() => {
              onClose();
              navigate('/register?club=Programming');
            }}
          >
            <span>Enroll in Club</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

export function OverviewModal({ isOpen, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="prog-modal-overlay" onClick={onClose}>
      <div className="prog-modal-card" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="prog-modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <Terminal size={20} color="var(--prog-blue)" />
          <span className="prog-section-eyebrow" style={{ margin: 0 }}>CLUB OVERVIEW</span>
        </div>
        <h2 className="prog-modal-title">Welcome to NIELIT Programming Club</h2>
        <p className="prog-modal-subtitle">
          A hands-on student engineering ecosystem dedicated to code logic, algorithmic mastery, and collaborative building.
        </p>

        <div
          style={{
            background: '#040507',
            border: '1px solid var(--prog-dark-border)',
            borderRadius: '6px',
            padding: '24px',
            marginBottom: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}
        >
          <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '4px', background: 'var(--prog-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flexShrink: 0 }}>
              <Code size={16} />
            </div>
            <div>
              <h4 style={{ fontSize: '14.5px', fontWeight: '700', color: '#fff', marginBottom: '4px' }}>Weekly Code Sprints</h4>
              <p style={{ fontSize: '13px', color: 'var(--prog-text-muted-dark)', lineHeight: '1.5' }}>
                Structured problem-solving sessions focusing on core logic, algorithmic paradigms, and competitive coding fundamentals.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '4px', background: 'var(--prog-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flexShrink: 0 }}>
              <Layers size={16} />
            </div>
            <div>
              <h4 style={{ fontSize: '14.5px', fontWeight: '700', color: '#fff', marginBottom: '4px' }}>Hands-on Software Building</h4>
              <p style={{ fontSize: '13px', color: 'var(--prog-text-muted-dark)', lineHeight: '1.5' }}>
                Students collaborate on real web applications, utilities, and developer tools using industry-standard tooling like Git, GitHub, and modern web frameworks.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '4px', background: 'var(--prog-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flexShrink: 0 }}>
              <Award size={16} />
            </div>
            <div>
              <h4 style={{ fontSize: '14.5px', fontWeight: '700', color: '#fff', marginBottom: '4px' }}>Hackathons & Capstone Showcase</h4>
              <p style={{ fontSize: '13px', color: 'var(--prog-text-muted-dark)', lineHeight: '1.5' }}>
                Participate in internal hackathons and present your complete capstone project to peers and mentors at the end of each semester.
              </p>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
          <button type="button" className="prog-btn-secondary" onClick={onClose}>
            Close
          </button>
          <button
            type="button"
            className="prog-btn-primary"
            onClick={() => {
              onClose();
              navigate('/register?club=Programming');
            }}
          >
            <span>Join Club Now</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

export function VisionModal({ isOpen, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="prog-modal-overlay" onClick={onClose}>
      <div className="prog-modal-card" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="prog-modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        <span className="prog-section-eyebrow" style={{ marginBottom: '8px' }}>OUR VISION & MISSION</span>
        <h2 className="prog-modal-title">Cultivating Engineers of the Future</h2>
        <p className="prog-modal-subtitle">
          Demystifying technology through deep structural understanding and empowering every student to become a confident software creator.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', color: 'var(--prog-text-muted-dark)', fontSize: '14px', lineHeight: '1.65', marginBottom: '24px' }}>
          <p>
            At NIELIT, we believe programming is not merely memorizing syntax—it is a rigorous discipline of logic, decomposition, and creative problem solving.
          </p>
          <p>
            Our vision is to bridge theoretical computer science fundamentals with modern software craftsmanship. We establish a supportive peer-driven environment where beginners gain confidence, intermediate developers refine their architecture skills, and advanced coders mentor the next wave of builders.
          </p>
          <p>
            By focusing on code clarity, structural elegance, and systematic debugging, members build software that solves real institutional and community challenges.
          </p>
        </div>

        <button
          type="button"
          className="prog-btn-primary"
          style={{ width: '100%', justifyContent: 'center' }}
          onClick={() => {
            onClose();
            navigate('/register?club=Programming');
          }}
        >
          <span>Be Part of the Vision — Join Us</span>
          <ArrowRight size={15} />
        </button>
      </div>
    </div>
  );
}

export function ProjectIdeasModal({ isOpen, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const ideas = [
    {
      level: 'Beginner',
      title: 'Automated Student Attendance & Grade Tracker',
      tech: ['Python', 'SQLite', 'Tkinter / Flask'],
      desc: 'A robust utility program calculating weighted GPA, tracking lecture attendance thresholds, and generating automated email alerts.'
    },
    {
      level: 'Intermediate',
      title: 'Student Productivity & Task Management Hub',
      tech: ['React', 'Node.js', 'PostgreSQL', 'Git'],
      desc: 'Full-stack collaborative dashboard enabling students to organize coursework milestones, coordinate team sprints, and track deadlines.'
    },
    {
      level: 'Intermediate',
      title: 'Algorithm Visualizer & Interactive Workbench',
      tech: ['JavaScript (ES6)', 'HTML5 Canvas', 'CSS3'],
      desc: 'A high-performance visual playground demonstrating sorting algorithms, pathfinding searches (Dijkstra, A*), and dynamic programming graphs.'
    },
    {
      level: 'Advanced',
      title: 'Decentralized Campus Resource Sharing API',
      tech: ['TypeScript', 'Express', 'Redis', 'Docker'],
      desc: 'Scalable REST and GraphQL microservice backend managing laboratory inventory, book exchanges, and peer study room reservations.'
    }
  ];

  return (
    <div className="prog-modal-overlay" onClick={onClose}>
      <div className="prog-modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '720px' }}>
        <button type="button" className="prog-modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        <span className="prog-section-eyebrow" style={{ marginBottom: '8px' }}>PROJECT BLUEPRINTS</span>
        <h2 className="prog-modal-title">Capstone Project Ideas</h2>
        <p className="prog-modal-subtitle">
          Inspirational project directions for your individual or team capstone deliverables.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px' }}>
          {ideas.map((item, idx) => (
            <div
              key={idx}
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid var(--prog-dark-border)',
                borderRadius: '6px',
                padding: '16px 20px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: '800',
                    color: item.level === 'Beginner' ? '#10b981' : item.level === 'Intermediate' ? 'var(--prog-blue)' : '#8b5cf6',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em'
                  }}
                >
                  {item.level} Track
                </span>
                <div style={{ display: 'flex', gap: '6px' }}>
                  {item.tech.map((t, tidx) => (
                    <span
                      key={tidx}
                      style={{
                        fontSize: '10.5px',
                        background: 'rgba(255, 255, 255, 0.06)',
                        padding: '2px 6px',
                        borderRadius: '3px',
                        color: 'var(--prog-text-muted-dark)'
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <h4 style={{ fontSize: '15px', fontWeight: '700', color: '#fff', marginBottom: '6px' }}>{item.title}</h4>
              <p style={{ fontSize: '13px', color: 'var(--prog-text-muted-dark)', lineHeight: '1.45', margin: 0 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        <button
          type="button"
          className="prog-btn-primary"
          style={{ width: '100%', justifyContent: 'center' }}
          onClick={() => {
            onClose();
            navigate('/register?club=Programming');
          }}
        >
          <span>Start Building Your Project — Join Us</span>
          <ArrowRight size={15} />
        </button>
      </div>
    </div>
  );
}

export function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const searchableItems = [
    { title: 'Programming Fundamentals', category: 'Curriculum', section: '#practice' },
    { title: 'Data Structures & Algorithms', category: 'Curriculum', section: '#practice' },
    { title: 'Git & Version Control', category: 'Toolkit', section: '#practice' },
    { title: 'Problem Solving Methodologies', category: 'How It Works', section: '#how-it-works' },
    { title: 'Capstone Project Submission', category: 'Capstone', section: '#capstone' },
    { title: 'Student Productivity Platform', category: 'Example Project', section: '#capstone' },
    { title: 'Python, C++, Java, JavaScript', category: 'Toolkit', section: '#toolkit' },
    { title: 'Register for Programming Club', category: 'Registration', section: '/register?club=Programming' }
  ];

  const filtered = query.trim()
    ? searchableItems.filter((i) =>
        i.title.toLowerCase().includes(query.toLowerCase()) ||
        i.category.toLowerCase().includes(query.toLowerCase())
      )
    : searchableItems;

  const handleSelect = (section) => {
    onClose();
    if (section.startsWith('#')) {
      const el = document.getElementById(section.substring(1));
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate(section);
    }
  };

  return (
    <div className="prog-modal-overlay" onClick={onClose}>
      <div className="prog-modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '580px' }}>
        <button type="button" className="prog-modal-close-btn" onClick={onClose} aria-label="Close search">
          <X size={20} />
        </button>

        <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#fff', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Search size={18} color="var(--prog-blue)" />
          Search Programming Club
        </h3>

        <div style={{ position: 'relative', marginBottom: '16px' }}>
          <input
            type="text"
            placeholder="Search topics, modules, tools, or projects..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            style={{
              width: '100%',
              padding: '12px 16px',
              paddingLeft: '40px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--prog-dark-border)',
              borderRadius: '4px',
              color: '#ffffff',
              fontSize: '14px',
              outline: 'none'
            }}
          />
          <Search size={16} color="var(--prog-text-muted-dark)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '300px', overflowY: 'auto' }}>
          {filtered.map((item, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelect(item.section)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 14px',
                background: 'transparent',
                border: '1px solid transparent',
                borderRadius: '4px',
                color: '#fff',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.15s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(37, 99, 235, 0.1)';
                e.currentTarget.style.borderColor = 'var(--prog-blue)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.borderColor = 'transparent';
              }}
            >
              <span style={{ fontSize: '13.5px', fontWeight: '600' }}>{item.title}</span>
              <span style={{ fontSize: '11px', color: 'var(--prog-text-muted-dark)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                {item.category}
              </span>
            </button>
          ))}
          {filtered.length === 0 && (
            <p style={{ textAlign: 'center', color: 'var(--prog-text-muted-dark)', padding: '24px 0', fontSize: '13px' }}>
              No results found for "{query}".
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
