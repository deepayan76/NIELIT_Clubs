import React, { useState } from 'react';

export default function AIBuildingProgression() {
  const [hoveredNode, setHoveredNode] = useState(null);

  const nodes = [
    { id: 'fnd', name: 'Fundamentals', step: '01', detail: 'Foundational logic & math' },
    { id: 'py', name: 'Python', step: '02', detail: 'Vectorized computing & NumPy' },
    { id: 'dat', name: 'Data', step: '03', detail: 'Pipelines & feature extraction' },
    { id: 'ml', name: 'Machine Learning', step: '04', detail: 'Classification & regression' },
    { id: 'cv', name: 'Computer Vision', step: '05', detail: 'CNNs & object detection' },
    { id: 'gen', name: 'Generative AI', step: '06', detail: 'LLMs, Embeddings & RAG' },
    { id: 'cap', name: 'CAPSTONE PROJECT', step: '07', isCapstone: true, detail: 'Complete end-to-end working system' }
  ];

  return (
    <section className="ai-progression-section" id="building-path">
      <div className="ai-section-container">
        {/* Header Block */}
        <div className="ai-section-header-dark">
          <span className="ai-section-eyebrow-dark">BUILDING ALONG THE WAY</span>
          <h2 className="ai-section-title-dark">Every Activity Adds A Piece.</h2>
          <p className="ai-section-subtitle-dark">
            Each session builds on the previous one, giving you the knowledge and
            experience to take on more complex challenges.
          </p>
        </div>

        {/* Technical Ascending Flow Line Diagram */}
        <div className="ai-progression-flow-wrapper">
          <div className="ai-flow-chart">
            {/* SVG Connecting Track */}
            <svg
              className="ai-flow-svg-line"
              viewBox="0 0 1000 160"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="emeraldPathGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(16, 185, 129, 0.25)" />
                  <stop offset="50%" stopColor="rgba(16, 185, 129, 0.6)" />
                  <stop offset="100%" stopColor="#10B981" />
                </linearGradient>
              </defs>
              <path
                d="M 50 120 Q 250 115 450 85 T 850 40 L 950 40"
                fill="none"
                stroke="url(#emeraldPathGrad)"
                strokeWidth="2.5"
                strokeDasharray="4 4"
                className="ai-svg-path-anim"
              />
            </svg>

            {/* Step Nodes along the flow */}
            <div className="ai-flow-nodes-row">
              {nodes.map((node, index) => {
                const isHovered = hoveredNode === node.id;
                return (
                  <div
                    key={node.id}
                    className={`ai-flow-node-item ${node.isCapstone ? 'is-capstone' : ''} ${isHovered ? 'is-hovered' : ''}`}
                    onMouseEnter={() => setHoveredNode(node.id)}
                    onMouseLeave={() => setHoveredNode(null)}
                    style={{ '--node-index': index }}
                  >
                    <div className="ai-node-marker">
                      <div className="ai-node-dot" />
                      <span className="ai-node-step">{node.step}</span>
                    </div>

                    <div className="ai-node-badge">
                      <span className="ai-node-title">{node.name}</span>
                      {node.isCapstone && (
                        <span className="ai-capstone-tag">FINAL GOAL</span>
                      )}
                    </div>

                    <p className="ai-node-detail">{node.detail}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
