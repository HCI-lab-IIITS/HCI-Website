'use client';

import React, { useRef, useState, useEffect } from 'react';
import './HCIRadiantEmblem.css';

export default function HCIRadiantEmblem({ width = 360, height = 150, className = '' }) {
  const containerRef = useRef(null);
  const [irisPos, setIrisPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Smooth cursor tracking for the letter 'I' spatial iris pupil
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width * 0.82;
    const cy = rect.top + rect.height * 0.28;
    const dx = (e.clientX - cx) / (rect.width * 0.25);
    const dy = (e.clientY - cy) / (rect.height * 0.25);
    setIrisPos({
      x: Math.max(-7, Math.min(7, dx * 7)),
      y: Math.max(-7, Math.min(7, dy * 7))
    });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setIrisPos({ x: 0, y: 0 }); }}
      className={`hci-emblem-wrapper relative inline-block ${className}`}
      style={{ width, height }}
    >
      <svg
        viewBox="0 0 540 200"
        className="hci-emblem-svg filter drop-shadow-[0_15px_35px_rgba(0,0,0,0.9)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Executive Metallic Gold Gradient */}
          <linearGradient id="emblemGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f4d888" />
            <stop offset="45%" stopColor="#c5a880" />
            <stop offset="100%" stopColor="#8c7553" />
          </linearGradient>

          {/* Deep Navy Metallic Gradient */}
          <linearGradient id="emblemNavy" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#0a0f1d" />
          </linearGradient>

          {/* Cyan Energy Glow */}
          <radialGradient id="cyanGlowRad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="1" />
            <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
          </radialGradient>

          {/* Soft Filter */}
          <filter id="irisGlowFilter" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* ================= LETTER 'H' (SPATIAL VR HEADSET CORE) ================= */}
        <g className="emblem-letter-h">
          {/* Left Vertical Pillar */}
          <rect x="25" y="20" width="38" height="160" rx="4" fill="url(#emblemNavy)" stroke="url(#emblemGold)" strokeWidth="3" />
          {/* Right Vertical Pillar */}
          <rect x="125" y="20" width="38" height="160" rx="4" fill="url(#emblemNavy)" stroke="url(#emblemGold)" strokeWidth="3" />
          {/* Center Crossbar */}
          <rect x="60" y="80" width="68" height="40" fill="url(#emblemNavy)" stroke="url(#emblemGold)" strokeWidth="3" />
          
          {/* Embedded VR Headset Silhouette */}
          <rect x="66" y="85" width="56" height="30" rx="8" fill="#090d16" stroke="#38bdf8" strokeWidth="2.5" />
          {/* Left VR Lens */}
          <circle cx="82" cy="100" r="7" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
          <circle cx="82" cy="100" r="3" fill="#38bdf8" className={isHovered ? "animate-pulse" : ""} />
          {/* Right VR Lens */}
          <circle cx="106" cy="100" r="7" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
          <circle cx="106" cy="100" r="3" fill="#38bdf8" className={isHovered ? "animate-pulse" : ""} />
          {/* Headset Strap */}
          <path d="M 66 100 L 58 100 M 122 100 L 130 100" stroke="#c5a880" strokeWidth="2" strokeLinecap="round" />
        </g>

        {/* ================= LETTER 'C' (NEURAL BRAIN SYNAPSE MESH) ================= */}
        <g className="emblem-letter-c" transform="translate(185, 0)">
          {/* Main Crescent Letter Shape */}
          <path
            d="M 125 32 C 55 32, 22 72, 22 100 C 22 128, 55 168, 125 168 C 142 168, 155 158, 155 158 L 140 132 C 140 132, 125 142, 102 142 C 70 142, 58 118, 58 100 C 58 82, 70 58, 102 58 C 125 58, 140 68, 140 68 L 155 42 C 155 42, 142 32, 125 32 Z"
            fill="url(#emblemNavy)"
            stroke="url(#emblemGold)"
            strokeWidth="3"
          />

          {/* Organic Brain Gyri Lines */}
          <path d="M 52 85 Q 85 62 118 80 T 132 110" fill="none" stroke="#c5a880" strokeWidth="1.8" strokeDasharray="4 2" className="animate-neural-pulse" />
          <path d="M 58 115 Q 88 140 120 122" fill="none" stroke="#c5a880" strokeWidth="1.5" />
          <path d="M 68 70 Q 95 90 125 72" fill="none" stroke="#38bdf8" strokeWidth="1.2" opacity="0.8" />

          {/* Synaptic Node Circles */}
          <circle cx="82" cy="74" r="3" fill="#c5a880" />
          <circle cx="116" cy="82" r="3.5" fill="#38bdf8" />
          <circle cx="92" cy="128" r="2.5" fill="#c5a880" />
        </g>

        {/* ================= LETTER 'I' (SPATIAL IRIS TARGET) ================= */}
        <g className="emblem-letter-i" transform="translate(365, 0)">
          {/* Letter Body Pillar */}
          <rect x="42" y="70" width="38" height="110" rx="4" fill="url(#emblemNavy)" stroke="url(#emblemGold)" strokeWidth="3" />

          {/* Spatial Target Concentric Outer Ring */}
          <circle cx="61" cy="35" r="23" fill="#090d16" stroke="url(#emblemGold)" strokeWidth="3" />
          {/* Inner Dashed Tracking Ring */}
          <circle cx="61" cy="35" r="14" fill="none" stroke="#38bdf8" strokeWidth="1.8" strokeDasharray="5 3" />

          {/* Dynamic Iris Pupil (Tracks Mouse Position) */}
          <circle
            cx={61 + irisPos.x}
            cy={35 + irisPos.y}
            r="6"
            fill="#38bdf8"
            filter="url(#irisGlowFilter)"
            className="animate-iris-glow"
          />
          {/* Pupil Center Core Highlight */}
          <circle
            cx={60 + irisPos.x * 1.1}
            cy={34 + irisPos.y * 1.1}
            r="2"
            fill="#ffffff"
          />
        </g>
      </svg>
    </div>
  );
}
