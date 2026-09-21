'use client';

import React, { useEffect, useRef } from 'react';
import './FogUnderlay.css';

export default function FogUnderlay({
  colors = ['rgba(82, 39, 255, 0.22)', 'rgba(56, 189, 248, 0.18)', 'rgba(197, 168, 128, 0.16)', 'rgba(255, 159, 252, 0.14)'],
  speed = 0.6,
  density = 18,
  className = '',
  style = {}
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = container.clientWidth || 800);
    let height = (canvas.height = container.clientHeight || 400);

    // Initialize multi-layered volumetric fog cloud particles
    const puffs = [];
    const puffCount = Math.max(12, density);

    for (let i = 0; i < puffCount; i++) {
      puffs.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: (Math.random() * 0.4 + 0.35) * Math.max(width, height) * 0.7,
        vx: (Math.random() - 0.5) * 0.4 * speed,
        vy: (Math.random() - 0.5) * 0.25 * speed,
        scale: Math.random() * 0.5 + 0.75,
        growth: (Math.random() * 0.002 + 0.001) * speed,
        growthDir: 1,
        angle: Math.random() * Math.PI * 2,
        angularSpeed: (Math.random() - 0.5) * 0.004 * speed,
        colorIndex: i % colors.length,
        baseAlpha: Math.random() * 0.3 + 0.5
      });
    }

    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;

    const handlePointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      targetMouseX = e.clientX - rect.left;
      targetMouseY = e.clientY - rect.top;
    };

    window.addEventListener('pointermove', handlePointerMove);

    const handleResize = () => {
      if (!container) return;
      width = canvas.width = container.clientWidth || 800;
      height = canvas.height = container.clientHeight || 400;
    };

    const ro = new ResizeObserver(handleResize);
    ro.observe(container);

    let time = 0;

    const render = () => {
      time += 0.01 * speed;
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse interpolation
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      puffs.forEach((puff) => {
        // Organic sinusoidal motion + drift
        puff.x += puff.vx + Math.sin(time + puff.angle) * 0.3 * speed;
        puff.y += puff.vy + Math.cos(time * 0.8 + puff.angle) * 0.2 * speed;
        puff.angle += puff.angularSpeed;

        // Breathing scale pulsation
        puff.scale += puff.growth * puff.growthDir;
        if (puff.scale > 1.3) puff.growthDir = -1;
        if (puff.scale < 0.7) puff.growthDir = 1;

        // Wrap around boundaries
        const r = puff.radius * puff.scale;
        if (puff.x < -r) puff.x = width + r;
        if (puff.x > width + r) puff.x = -r;
        if (puff.y < -r) puff.y = height + r;
        if (puff.y > height + r) puff.y = -r;

        // Subtle interactive mouse swirl repulsion
        const dx = mouseX - puff.x;
        const dy = mouseY - puff.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 250 && dist > 0) {
          const force = (1 - dist / 250) * 0.8;
          puff.x -= (dx / dist) * force;
          puff.y -= (dy / dist) * force;
        }

        // Draw radial volumetric fog puff
        const grad = ctx.createRadialGradient(
          puff.x,
          puff.y,
          0,
          puff.x,
          puff.y,
          puff.radius * puff.scale
        );

        const col = colors[puff.colorIndex] || colors[0];
        grad.addColorStop(0, col);
        grad.addColorStop(0.5, col.replace(/[\d.]+\)$/g, (m) => `${parseFloat(m) * 0.4})`));
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(puff.x, puff.y, puff.radius * puff.scale, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('pointermove', handlePointerMove);
      ro.disconnect();
    };
  }, [colors, speed, density]);

  return (
    <div ref={containerRef} className={`fog-underlay-container ${className}`} style={style}>
      <canvas ref={canvasRef} className="fog-underlay-canvas" />
    </div>
  );
}
