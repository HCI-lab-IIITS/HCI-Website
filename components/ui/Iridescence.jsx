'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './Iridescence.css';

export default function Iridescence({
  color = [0.15, 0.25, 0.45],
  speed = 1,
  amplitude = 0.1,
  mouseReact = true,
  className = '',
  style = {}
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // Check WebGL availability safely using dummy element to avoid canvas locking
    try {
      const dummy = document.createElement('canvas');
      const gl = dummy.getContext('webgl2') || dummy.getContext('webgl');
      if (!gl) {
        console.warn('Iridescence: WebGL unavailable');
        return;
      }
    } catch (e) {
      console.warn('Iridescence: WebGL check error:', e);
      return;
    }

    let animationFrameId;
    let renderer, scene, camera, material, mesh;
    let width = container.clientWidth || 1080;
    let height = container.clientHeight || 1080;

    const mouse = new THREE.Vector2(0.5, 0.5);
    const targetMouse = new THREE.Vector2(0.5, 0.5);

    try {
      scene = new THREE.Scene();
      camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: false,
        antialias: true,
        powerPreference: 'high-performance'
      });
      renderer.setClearColor(new THREE.Color(0x090d16), 1.0);
      renderer.setSize(width, height, false);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      // Iridescence Wave Mesh Vertex & Fragment Shaders
      const vertexShader = `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 1.0);
        }
      `;

      const fragmentShader = `
        uniform float uTime;
        uniform vec2 uResolution;
        uniform vec2 uMouse;
        uniform vec3 uColor;
        uniform float uSpeed;
        uniform float uAmplitude;
        varying vec2 vUv;

        // Cosine based palette generators by Inigo Quilez
        vec3 palette( in float t, in vec3 a, in vec3 b, in vec3 c, in vec3 d ) {
          return a + b*cos( 6.28318*(c*t+d) );
        }

        void main() {
          vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution.xy) / uResolution.y;
          vec2 mouse = (uMouse - 0.5) * 0.5;

          float time = uTime * uSpeed * 0.5;
          
          float d = length(uv - mouse * 0.5);
          float wave = sin(d * 10.0 - time * 1.5) * uAmplitude;
          
          vec2 st = uv + wave + mouse * 0.1;
          
          float n = sin(st.x * 4.0 + time) * cos(st.y * 4.0 - time);
          
          // Subtle dark cyan/gold/purple iridescence palette
          vec3 col = palette(
            n + d * 0.3,
            vec3(0.05, 0.08, 0.15),
            vec3(0.12, 0.10, 0.18),
            vec3(0.8, 0.8, 0.8),
            vec3(0.0, 0.33, 0.67)
          );

          // Deep Space Dark Background #090d16
          vec3 bgDark = vec3(0.035, 0.051, 0.086);
          float vignette = smoothstep(1.5, 0.1, length(uv));
          vec3 finalColor = mix(bgDark, col, vignette * 0.25);

          gl_FragColor = vec4(finalColor, 1.0);
        }
      `;

      const uniforms = {
        uTime: { value: 0 },
        uResolution: { value: new THREE.Vector2(width, height) },
        uMouse: { value: mouse },
        uColor: { value: new THREE.Color(color[0], color[1], color[2]) },
        uSpeed: { value: speed },
        uAmplitude: { value: amplitude }
      };

      material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms
      });

      mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
      scene.add(mesh);

      // Mouse reactivity
      const handlePointerMove = (e) => {
        if (!mouseReact) return;
        const rect = canvas.getBoundingClientRect();
        targetMouse.x = (e.clientX - rect.left) / rect.width;
        targetMouse.y = 1.0 - (e.clientY - rect.top) / rect.height;
      };

      window.addEventListener('pointermove', handlePointerMove);

      const handleResize = () => {
        if (!container) return;
        width = container.clientWidth || 1080;
        height = container.clientHeight || 1080;
        renderer.setSize(width, height, false);
        uniforms.uResolution.value.set(width, height);
      };

      window.addEventListener('resize', handleResize);

      const startTime = performance.now();
      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        const elapsed = (performance.now() - startTime) / 1000;
        
        // Smooth interpolation for mouse position
        mouse.x += (targetMouse.x - mouse.x) * 0.05;
        mouse.y += (targetMouse.y - mouse.y) * 0.05;

        uniforms.uTime.value = elapsed;
        renderer.render(scene, camera);
      };

      animate();

      return () => {
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener('pointermove', handlePointerMove);
        window.removeEventListener('resize', handleResize);
        if (renderer) {
          renderer.dispose();
          renderer.forceContextLoss();
        }
        if (material) material.dispose();
      };
    } catch (err) {
      console.warn('Iridescence WebGL init error:', err);
    }
  }, [color, speed, amplitude, mouseReact]);

  return (
    <div ref={containerRef} className={`iridescence-container ${className}`} style={style}>
      <canvas ref={canvasRef} className="iridescence-canvas" />
    </div>
  );
}
