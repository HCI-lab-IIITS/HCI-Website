'use client';

import React, { useEffect, useRef } from 'react';
import './IridescenceBackground.css';

export default function IridescenceBackground({ className = '' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Ambient floating glow orbs
    const orbs = [
      { x: width * 0.2, y: height * 0.3, r: 350, color: 'rgba(197, 168, 128, 0.12)', vx: 0.3, vy: 0.2 },
      { x: width * 0.8, y: height * 0.4, r: 400, color: 'rgba(56, 189, 248, 0.10)', vx: -0.2, vy: 0.3 },
      { x: width * 0.5, y: height * 0.7, r: 450, color: 'rgba(82, 39, 255, 0.10)', vx: 0.25, vy: -0.25 },
      { x: width * 0.3, y: height * 0.8, r: 300, color: 'rgba(255, 159, 252, 0.08)', vx: -0.3, vy: -0.15 }
    ];

    let mouseX = width / 2;
    let mouseY = height / 2;

    const handlePointerMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('pointermove', handlePointerMove);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const render = () => {
      // Clear base deep dark space background #090d16
      ctx.fillStyle = '#090d16';
      ctx.fillRect(0, 0, width, height);

      // Render floating gradient orbs
      orbs.forEach((orb) => {
        orb.x += orb.vx;
        orb.y += orb.vy;

        if (orb.x < -100 || orb.x > width + 100) orb.vx *= -1;
        if (orb.y < -100 || orb.y > height + 100) orb.vy *= -1;

        // Subtle mouse attraction
        const dx = mouseX - orb.x;
        const dy = mouseY - orb.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 600) {
          orb.x += (dx / dist) * 0.4;
          orb.y += (dy / dist) * 0.4;
        }

        const gradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.r);
        gradient.addColorStop(0, orb.color);
        gradient.addColorStop(1, 'rgba(9, 13, 22, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.r, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={`iridescence-bg-container ${className}`}>
      <canvas ref={canvasRef} className="iridescence-bg-canvas" />
    </div>
  );
}
