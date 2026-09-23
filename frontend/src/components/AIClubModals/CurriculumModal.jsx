import React, { useEffect } from 'react';
import { X, CheckCircle, Clock, BookOpen } from 'lucide-react';

export default function CurriculumModal({ isOpen, onClose }) {
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
      week: 'Weeks 1-2',
      title: 'Module 01: AI Fundamentals & Mathematical Intuition',
      topics: [
        'Linear algebra fundamentals, vectors, matrices & dot products',
        'Calculus for optimization: loss functions and gradient descent',
        'Probability foundations and Bayesian thinking in AI',
        'Hands-on: Implementing linear regression from scratch in Python'
      ]
    },
    {
      week: 'Weeks 3-4',
      title: 'Module 02: Python for AI & High-Performance Data Handling',
      topics: [
        'Vectorized operations with NumPy & pandas dataframe manipulation',
        'Data cleaning, missing value imputations, and normalization',
        'Exploratory data analysis & statistical visualization with Seaborn',
        'Hands-on: Building an automated data analysis pipeline'
      ]
    },
    {
      week: 'Weeks 5-6',
      title: 'Module 03: Classical Machine Learning & Model Evaluation',
      topics: [
        'Supervised learning: Logistic Regression, Decision Trees & Random Forests',
        'Unsupervised learning: K-Means clustering, PCA dimensionality reduction',
        'Cross-validation, bias-variance tradeoff, ROC-AUC, Precision/Recall',
        'Hands-on: Training a predictive model for student performance analytics'
      ]
    },
    {
      week: 'Weeks 7-8',
      title: 'Module 04: Neural Networks & Deep Learning Foundations',
      topics: [
        'Perceptrons, activation functions (ReLU, Sigmoid, GELU), backpropagation',
        'Building multi-layer neural networks using PyTorch / TensorFlow',
        'Optimization techniques: Adam, learning rate schedules, dropout & regularizers',
        'Hands-on: Image classification on MNIST / CIFAR with PyTorch'
      ]
    },
    {
      week: 'Weeks 9-10',
      title: 'Module 05: Modern NLP, LLMs & Retrieval Augmented Generation (RAG)',
      topics: [
        'Tokenization, word embeddings (Word2Vec, FastText) & attention mechanisms',
        'Transformer architecture fundamentals & encoder-decoder models',
        'Working with open-weight LLMs, HuggingFace Transformers & vector DBs (Chroma/FAISS)',
        'Hands-on: Building a custom document Q&A assistant with RAG'
      ]
    },
    {
      week: 'Weeks 11-12',
      title: 'Module 06: Capstone Project Delivery & Deployment',
      topics: [
        'End-to-end model pipeline packaging using FastAPI',
        'Containerization with Docker & lightweight cloud deployment',
        'UI integration with React and real-time streaming inference',
        'Hands-on: Final team capstone demonstration and technical review'
      ]
    }
  ];

  return (
    <div className="ai-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="ai-modal-card ai-curriculum-modal" onClick={(e) => e.stopPropagation()}>
        <div className="ai-modal-header">
          <div>
            <span className="ai-modal-eyebrow">NEXORA AI CLUB CURRICULUM</span>
            <h2 className="ai-modal-title">Full 12-Week Technical Syllabus</h2>
          </div>
          <button
            type="button"
            className="ai-modal-close-btn"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        <div className="ai-modal-body">
          <p className="ai-modal-lead">
            A comprehensive, project-first roadmap designed to bridge theoretical concepts
            with production-grade software and machine learning engineering.
          </p>

          <div className="ai-curriculum-list">
            {modules.map((mod) => (
              <div key={mod.title} className="ai-curriculum-module">
                <div className="ai-module-badge">
                  <Clock size={14} />
                  <span>{mod.week}</span>
                </div>
                <h3 className="ai-module-heading">{mod.title}</h3>
                <ul className="ai-module-topics">
                  {mod.topics.map((t, idx) => (
                    <li key={idx}>
                      <CheckCircle size={14} className="ai-topic-check" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="ai-modal-footer">
          <button type="button" className="ai-btn-emerald" onClick={onClose}>
            <span>Got It</span>
          </button>
        </div>
      </div>
    </div>
  );
}
