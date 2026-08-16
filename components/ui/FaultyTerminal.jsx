'use client';

import React, { useEffect, useRef } from 'react';
import './FaultyTerminal.css';

export default function FaultyTerminal({
  scale = 1,
  digitSize = 1.5,
  scanlineIntensity = 0.3,
  glitchAmount = 1,
  flickerAmount = 1,
  noiseAmp = 0,
  chromaticAberration = 0,
  dither = 0,
  curvature = 0.2,
  tint = '#c5a880',
  mouseReact = true,
  mouseStrength = 0.2,
  brightness = 1,
  className = '',
  style = {}
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Matrix characters pool
    const chars = '0123456789ABCDEF⌘⌥⌖⌬⚡︎λµ∫∬∭'.split('');
    const fontSize = Math.max(12, Math.floor(14 * digitSize * scale));
    const columns = Math.ceil(width / fontSize);
    const rows = Math.ceil(height / fontSize);
    const drops = Array(columns).fill(0).map(() => Math.floor(Math.random() * -50));

    let mouseX = width / 2;
    let mouseY = height / 2;

    const handlePointerMove = (e) => {
      if (!mouseReact) return;
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
      // Clear base deep dark space background #090d16 with subtle tail fade
      ctx.fillStyle = 'rgba(9, 13, 22, 0.2)';
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px monospace`;

      // Draw digital terminal stream
      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Calculate cursor displacement if mouseReact is enabled
        let offsetX = 0;
        let offsetY = 0;
        if (mouseReact) {
          const dx = x - mouseX;
          const dy = y - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 200) {
            const force = (1 - dist / 200) * mouseStrength * 30;
            offsetX = (dx / dist) * force;
            offsetY = (dy / dist) * force;
          }
        }

        // Random Glitch Flickers
        const isGlitch = glitchAmount > 0 && Math.random() < glitchAmount * 0.03;
        ctx.fillStyle = isGlitch ? '#38bdf8' : tint;
        ctx.globalAlpha = Math.min(1, (isGlitch ? 1 : 0.45) * brightness);

        ctx.fillText(char, x + offsetX, y + offsetY);

        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      // Draw CRT Scanlines Overlay
      if (scanlineIntensity > 0) {
        ctx.fillStyle = `rgba(0, 0, 0, ${scanlineIntensity * 0.5})`;
        for (let s = 0; s < height; s += 4) {
          ctx.fillRect(0, s, width, 1.5);
        }
      }

      // CRT Glitch Flicker effect
      if (flickerAmount > 0 && Math.random() < flickerAmount * 0.05) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
        ctx.fillRect(0, 0, width, height);
      }

      ctx.globalAlpha = 1.0;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
    };
  }, [scale, digitSize, scanlineIntensity, glitchAmount, flickerAmount, tint, mouseReact, mouseStrength, brightness]);

  return (
    <div className={`faulty-terminal-container ${className}`} style={style}>
      <canvas ref={canvasRef} className="faulty-terminal-canvas" />
    </div>
  );
}
