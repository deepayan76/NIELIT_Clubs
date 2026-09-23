import React from 'react';
import '../styles/ArchitectureDiagram.css';

export default function ArchitectureDiagram({ className = '' }) {
  return (
    <div className={`arch-diagram-wrapper ${className}`} role="img" aria-label="Technical Architecture Diagram: User to Load Balancer to API 1 & API 2 to Database">
      <svg
        viewBox="0 0 460 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="arch-diagram-svg"
      >
        {/* Connector Lines */}
        <g stroke="#777777" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          {/* User to Load Balancer */}
          <line x1="68" y1="90" x2="132" y2="90" />

          {/* Load Balancer to Vertical Split Bracket */}
          <line x1="184" y1="90" x2="218" y2="90" />
          {/* Vertical Split Bar */}
          <line x1="218" y1="40" x2="218" y2="140" />
          {/* Top Branch to API 1 */}
          <line x1="218" y1="40" x2="250" y2="40" />
          {/* Bottom Branch to API 2 */}
          <line x1="218" y1="140" x2="250" y2="140" />

          {/* Top Output from API 1 to Vertical Merge Bar */}
          <line x1="302" y1="40" x2="334" y2="40" />
          {/* Bottom Output from API 2 to Vertical Merge Bar */}
          <line x1="302" y1="140" x2="334" y2="140" />
          {/* Vertical Merge Bar */}
          <line x1="334" y1="40" x2="334" y2="140" />
          {/* Horizontal to Database */}
          <line x1="334" y1="90" x2="368" y2="90" />
        </g>

        {/* ==================================================== */}
        {/* NODE 1: USER */}
        {/* ==================================================== */}
        <g className="arch-node arch-node-user">
          {/* Node Box */}
          <rect
            x="16"
            y="64"
            width="52"
            height="52"
            rx="11"
            fill="#FFFFFF"
            stroke="#777777"
            strokeWidth="2.2"
          />
          {/* Globe Icon */}
          <circle cx="42" cy="90" r="14" stroke="#777777" strokeWidth="1.8" />
          <ellipse cx="42" cy="90" rx="6.5" ry="14" stroke="#777777" strokeWidth="1.8" />
          <line x1="28" y1="90" x2="56" y2="90" stroke="#777777" strokeWidth="1.8" />
          <line x1="30.5" y1="82" x2="53.5" y2="82" stroke="#777777" strokeWidth="1.6" />
          <line x1="30.5" y1="98" x2="53.5" y2="98" stroke="#777777" strokeWidth="1.6" />
          {/* Label */}
          <text
            x="42"
            y="132"
            textAnchor="middle"
            fill="#777777"
            fontFamily="Poppins, sans-serif"
            fontSize="12.5"
            fontWeight="500"
          >
            User
          </text>
        </g>

        {/* ==================================================== */}
        {/* NODE 2: LOAD BALANCER */}
        {/* ==================================================== */}
        <g className="arch-node arch-node-lb">
          {/* Node Box */}
          <rect
            x="132"
            y="64"
            width="52"
            height="52"
            rx="11"
            fill="#FFFFFF"
            stroke="#777777"
            strokeWidth="2.2"
          />
          {/* Load Balancer Fork / Balancing Icon */}
          <g stroke="#777777" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none">
            {/* Left stem branching to two loops */}
            <path d="M150 83 C150 80, 153 78, 156 78 C159 78, 162 80, 162 83 C162 88, 153 89, 153 96 L153 101" />
            <circle cx="153" cy="102" r="1.5" fill="#777777" />
            <path d="M166 84 C166 82, 164 80, 162 80" />
          </g>
          {/* Label */}
          <text
            x="158"
            y="132"
            textAnchor="middle"
            fill="#777777"
            fontFamily="Poppins, sans-serif"
            fontSize="12"
            fontWeight="500"
          >
            Load Balancer
          </text>
        </g>

        {/* ==================================================== */}
        {/* NODE 3A: API 1 */}
        {/* ==================================================== */}
        <g className="arch-node arch-node-api1">
          {/* Node Box */}
          <rect
            x="250"
            y="14"
            width="52"
            height="52"
            rx="11"
            fill="#FFFFFF"
            stroke="#777777"
            strokeWidth="2.2"
          />
          {/* Server / Dual Pill Icon */}
          <g stroke="#777777" strokeWidth="1.8" strokeLinecap="round" fill="none">
            <rect x="261" y="25" width="30" height="12" rx="4" />
            <rect x="261" y="43" width="30" height="12" rx="4" />
            <line x1="267" y1="31" x2="269" y2="31" />
            <line x1="267" y1="49" x2="269" y2="49" />
          </g>
          {/* Label */}
          <text
            x="276"
            y="81"
            textAnchor="middle"
            fill="#777777"
            fontFamily="Poppins, sans-serif"
            fontSize="12.5"
            fontWeight="500"
          >
            API 1
          </text>
        </g>

        {/* ==================================================== */}
        {/* NODE 3B: API 2 */}
        {/* ==================================================== */}
        <g className="arch-node arch-node-api2">
          {/* Node Box */}
          <rect
            x="250"
            y="114"
            width="52"
            height="52"
            rx="11"
            fill="#FFFFFF"
            stroke="#777777"
            strokeWidth="2.2"
          />
          {/* Server / Dual Pill Icon */}
          <g stroke="#777777" strokeWidth="1.8" strokeLinecap="round" fill="none">
            <rect x="261" y="125" width="30" height="12" rx="4" />
            <rect x="261" y="143" width="30" height="12" rx="4" />
            <line x1="267" y1="131" x2="269" y2="131" />
            <line x1="267" y1="149" x2="269" y2="149" />
          </g>
          {/* Label */}
          <text
            x="276"
            y="181"
            textAnchor="middle"
            fill="#777777"
            fontFamily="Poppins, sans-serif"
            fontSize="12.5"
            fontWeight="500"
          >
            API 2
          </text>
        </g>

        {/* ==================================================== */}
        {/* NODE 4: DATABASE */}
        {/* ==================================================== */}
        <g className="arch-node arch-node-db">
          {/* Node Box */}
          <rect
            x="368"
            y="64"
            width="52"
            height="52"
            rx="11"
            fill="#FFFFFF"
            stroke="#777777"
            strokeWidth="2.2"
          />
          {/* Database Stack Cylinder Icon */}
          <g stroke="#777777" strokeWidth="1.8" fill="none" strokeLinecap="round">
            <ellipse cx="394" cy="79" rx="13" ry="4.5" />
            <path d="M381 79 L381 92 C381 94.5, 386.8 96.5, 394 96.5 C401.2 96.5, 407 94.5, 407 92 L407 79" />
            <path d="M381 86 C381 88.5, 386.8 90.5, 394 90.5 C401.2 90.5, 407 88.5, 407 86" />
            <path d="M381 92 L381 99 C381 101.5, 386.8 103.5, 394 103.5 C401.2 103.5, 407 101.5, 407 99 L407 92" />
          </g>
          {/* Label */}
          <text
            x="394"
            y="132"
            textAnchor="middle"
            fill="#777777"
            fontFamily="Poppins, sans-serif"
            fontSize="12.5"
            fontWeight="500"
          >
            Database
          </text>
        </g>
      </svg>
    </div>
  );
}
