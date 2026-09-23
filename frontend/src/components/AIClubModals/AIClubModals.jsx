import React, { useEffect, useState } from 'react';
import { X, Play, Sparkles, CheckCircle2, Shield, Code2, Users2 } from 'lucide-react';
import { navigate } from '../../utils/router';

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
    <div className="ai-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="ai-modal-card ai-overview-modal" onClick={(e) => e.stopPropagation()}>
        <div className="ai-modal-header">
          <div>
            <span className="ai-modal-eyebrow">NEXORA AI CLUB OVERVIEW</span>
            <h2 className="ai-modal-title">Welcome to AI Club</h2>
          </div>
          <button type="button" className="ai-modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        <div className="ai-modal-body">
          <div className="ai-video-placeholder">
            <div className="ai-video-inner">
              <div className="ai-video-play-pulse">
                <Play size={28} fill="currentColor" />
              </div>
              <p className="ai-video-title">AI Club: From Concept to Production</p>
              <span className="ai-video-sub">Interactive Student Orientation • 3:45 mins</span>
            </div>
          </div>

          <div className="ai-overview-highlights">
            <div className="ai-highlight-box">
              <Users2 size={18} className="ai-hl-icon" />
              <div>
                <strong>Peer Squads</strong>
                <p>Collaborate in squads of 3-4 students with hands-on mentoring.</p>
              </div>
            </div>
            <div className="ai-highlight-box">
              <Code2 size={18} className="ai-hl-icon" />
              <div>
                <strong>Build-First</strong>
                <p>No passive lectures. Every single session ends with working code.</p>
              </div>
            </div>
            <div className="ai-highlight-box">
              <Sparkles size={18} className="ai-hl-icon" />
              <div>
                <strong>Real Deployments</strong>
                <p>Ship prototypes live so anyone on campus can use them.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="ai-modal-footer">
          <button
            type="button"
            className="ai-btn-emerald"
            onClick={() => {
              onClose();
              navigate('/?club=ai#register');
            }}
          >
            <span>Ready to Join AI Club →</span>
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
    <div className="ai-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="ai-modal-card ai-vision-modal" onClick={(e) => e.stopPropagation()}>
        <div className="ai-modal-header">
          <div>
            <span className="ai-modal-eyebrow">OUR VISION & MANIFESTO</span>
            <h2 className="ai-modal-title">Democratizing Practical AI</h2>
          </div>
          <button type="button" className="ai-modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        <div className="ai-modal-body">
          <div className="ai-manifesto-text">
            <p>
              We believe Artificial Intelligence should not remain locked behind research papers or enterprise paywalls. At NEXORA, our student club creates a vibrant laboratory where curiosity turns into engineering excellence.
            </p>
            <div className="ai-manifesto-quote">
              "We don't just consume technology; we dissect it, understand its principles, and build software that makes a tangible difference."
            </div>
            <div className="ai-manifesto-pillars">
              <div className="ai-mf-pillar">
                <span className="ai-mf-num">01</span>
                <strong>Accessible to All</strong>
                <p>Whether you're writing your first Python line or tuning transformers, you have a place here.</p>
              </div>
              <div className="ai-mf-pillar">
                <span className="ai-mf-num">02</span>
                <strong>Ethical & Responsible</strong>
                <p>Understanding fairness, data privacy, and ethical guardrails in artificial intelligence.</p>
              </div>
              <div className="ai-mf-pillar">
                <span className="ai-mf-num">03</span>
                <strong>Open Innovation</strong>
                <p>Sharing knowledge freely through open-source repositories and peer workshops.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="ai-modal-footer">
          <button type="button" className="ai-btn-emerald" onClick={onClose}>
            <span>Back to AI Club</span>
          </button>
        </div>
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

  const projectIdeas = [
    {
      title: 'Automated Attendance via Edge Face Recognition',
      domain: 'Computer Vision & Embedded Edge',
      desc: 'Real-time multi-person face embedding matching on Raspberry Pi / Jetson with privacy-preserving local storage.',
      stack: ['PyTorch', 'OpenCV', 'FaceNet', 'FastAPI']
    },
    {
      title: 'Multilingual Campus Notice Summarizer & Voice Bot',
      domain: 'NLP & Speech Recognition',
      desc: 'Converts official PDF circulars into summarized audio briefings across regional Indian languages with Whisper & LLaMA.',
      stack: ['HuggingFace', 'Whisper', 'RAG', 'Streamlit']
    },
    {
      title: 'Campus Network Anomaly & Intrusion Detection',
      domain: 'Cybersecurity & Machine Learning',
      desc: 'Unsupervised autoencoder model analyzing packet telemetry to flag zero-day vulnerability scanning in real time.',
      stack: ['Scikit-learn', 'PyTorch', 'Wireshark Logs', 'Docker']
    },
    {
      title: 'Smart Lab Resource Scheduler & Predictive Energy Optimizer',
      domain: 'IoT & Predictive Analytics',
      desc: 'Predicts computer lab utilization and dynamically adjusts HVAC/lighting schedules based on student schedules.',
      stack: ['Time-Series LSTM', 'MQTT', 'InfluxDB', 'Grafana']
    }
  ];

  return (
    <div className="ai-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="ai-modal-card ai-ideas-modal" onClick={(e) => e.stopPropagation()}>
        <div className="ai-modal-header">
          <div>
            <span className="ai-modal-eyebrow">CAPSTONE INSPIRATION</span>
            <h2 className="ai-modal-title">Curated Capstone Project Ideas</h2>
          </div>
          <button type="button" className="ai-modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        <div className="ai-modal-body">
          <p className="ai-modal-lead">
            Explore active capstone concepts tackled by NEXORA students or propose your own custom problem statement with faculty mentorship.
          </p>

          <div className="ai-ideas-list">
            {projectIdeas.map((idea) => (
              <div key={idea.title} className="ai-idea-item">
                <div className="ai-idea-top">
                  <span className="ai-idea-domain">{idea.domain}</span>
                </div>
                <h3 className="ai-idea-title">{idea.title}</h3>
                <p className="ai-idea-desc">{idea.desc}</p>
                <div className="ai-idea-stack">
                  {idea.stack.map((s) => (
                    <span key={s} className="ai-tech-tag">{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="ai-modal-footer">
          <button
            type="button"
            className="ai-btn-emerald"
            onClick={() => {
              onClose();
              navigate('/?club=ai#register');
            }}
          >
            <span>Propose or Join a Project Team →</span>
          </button>
        </div>
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

  const topics = [
    { title: 'AI Fundamentals & Linear Algebra', tag: 'Curriculum', href: '#curriculum' },
    { title: 'Python for AI & Data Handling', tag: 'Curriculum', href: '#curriculum' },
    { title: 'Machine Learning & Neural Networks', tag: 'Curriculum', href: '#curriculum' },
    { title: 'Generative AI & LLM Engineering', tag: 'Curriculum', href: '#curriculum' },
    { title: 'The AI Club Journey (4 Stages)', tag: 'Roadmap', href: '#hero' },
    { title: '5-Step Process: Learn to Impact', tag: 'How It Works', href: '#how-it-works' },
    { title: 'AI-Powered Student Assistant (Capstone)', tag: 'Capstone', href: '#capstone' },
    { title: 'Student Squads & Problem Solving', tag: 'Skills', href: '#skills' },
    { title: 'Register for NEXORA AI Club', tag: 'Join', href: '/?club=ai#register' }
  ];

  const filtered = topics.filter((t) =>
    t.title.toLowerCase().includes(query.toLowerCase()) ||
    t.tag.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (href) => {
    onClose();
    navigate(href);
  };

  return (
    <div className="ai-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="ai-modal-card ai-search-modal" onClick={(e) => e.stopPropagation()}>
        <div className="ai-search-input-wrap">
          <input
            type="text"
            className="ai-search-input"
            placeholder="Search AI Club topics, curriculum, capstone ideas..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          <button type="button" className="ai-modal-close-btn" onClick={onClose} aria-label="Close search">
            <X size={20} />
          </button>
        </div>

        <div className="ai-search-results">
          {filtered.length > 0 ? (
            filtered.map((item) => (
              <button
                key={item.title}
                type="button"
                className="ai-search-item"
                onClick={() => handleSelect(item.href)}
              >
                <div className="ai-search-item-info">
                  <span className="ai-search-item-title">{item.title}</span>
                  <span className="ai-search-item-tag">{item.tag}</span>
                </div>
                <span className="ai-search-arrow">→</span>
              </button>
            ))
          ) : (
            <p className="ai-search-empty">No results found for "{query}".</p>
          )}
        </div>
      </div>
    </div>
  );
}
