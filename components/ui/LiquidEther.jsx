'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './LiquidEther.css';

export default function LiquidEther({
  mouseForce = 20,
  cursorSize = 100,
  isViscous = false,
  viscous = 30,
  colors = ['#5227FF', '#FF9FFC', '#B497CF'],
  autoDemo = true,
  autoSpeed = 0.5,
  autoIntensity = 2.2,
  isBounce = false,
  resolution = 0.5,
  className = '',
  style = {}
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // Check WebGL availability safely
    try {
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
      if (!gl) {
        console.warn('LiquidEther: WebGL unavailable');
        return;
      }
    } catch (e) {
      console.warn('LiquidEther: WebGL check error:', e);
      return;
    }

    let animationFrameId;
    let renderer, scene, camera, material, mesh;
    let width = container.clientWidth || 1080;
    let height = container.clientHeight || 1080;

    const parsedColors = colors.map((c) => new THREE.Color(c));

    // WebGL Scene setup
    try {
      scene = new THREE.Scene();
      camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: false,
        powerPreference: 'high-performance'
      });
      renderer.setSize(width * resolution, height * resolution, false);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      // Custom WebGL Liquid Fluid Shader
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
        uniform float uMouseForce;
        uniform float uCursorSize;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform vec3 uColor3;
        uniform float uAutoSpeed;
        uniform float uAutoIntensity;
        varying vec2 vUv;

        // Simplex noise helper
        vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
        float snoise(vec2 v){
          const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                           -0.577350269189626, 0.024390243902439);
          vec2 i  = floor(v + dot(v, C.yy) );
          vec2 x0 = v -   i + dot(i, C.xx);
          vec2 i1;
          i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
          vec4 x12 = x0.xyxy + C.xxzz;
          x12.xy -= i1;
          i = mod(i, 289.0);
          vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
          + i.x + vec3(0.0, i1.x, 1.0 ) );
          vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
          m = m*m ;
          m = m*m ;
          vec3 x = 2.0 * fract(p * C.www) - 1.0;
          vec3 h = abs(x) - 0.5;
          vec3 ox = floor(x + 0.5);
          vec3 a0 = x - ox;
          m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
          vec3 g;
          g.x  = a0.x  * x0.x  + h.x  * x0.y;
          g.yz = a0.yz * x12.xz + h.yz * x12.yw;
          return 130.0 * dot(m, g);
        }

        void main() {
          vec2 st = gl_FragCoord.xy / uResolution.xy;
          float aspect = uResolution.x / uResolution.y;
          st.x *= aspect;
          vec2 mouse = uMouse;
          mouse.x *= aspect;

          float time = uTime * uAutoSpeed * 0.4;
          
          // Organic fluid displacement
          float n1 = snoise(st * 2.5 + vec2(time * 0.3, time * 0.2));
          float n2 = snoise(st * 4.0 - vec2(time * 0.2, time * 0.4) + n1 * uAutoIntensity);
          
          // Mouse force ripple
          float dist = distance(st, mouse);
          float cursorRadius = (uCursorSize / uResolution.y) * 0.5;
          float mouseImpact = smoothstep(cursorRadius, 0.0, dist) * (uMouseForce * 0.05);

          float pattern = n1 + n2 + mouseImpact;

          // Color palette interpolation
          vec3 color = mix(uColor1, uColor2, clamp(pattern, 0.0, 1.0));
          color = mix(color, uColor3, clamp(pattern * 0.8 - 0.2, 0.0, 1.0));

          // Soft translucent ether glow
          float alpha = smoothstep(0.1, 0.9, pattern) * 0.85;

          gl_FragColor = vec4(color, alpha);
        }
      `;

      const uniforms = {
        uTime: { value: 0 },
        uResolution: { value: new THREE.Vector2(width * resolution, height * resolution) },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        uMouseForce: { value: mouseForce },
        uCursorSize: { value: cursorSize },
        uColor1: { value: parsedColors[0] || new THREE.Color('#5227FF') },
        uColor2: { value: parsedColors[1] || new THREE.Color('#FF9FFC') },
        uColor3: { value: parsedColors[2] || new THREE.Color('#B497CF') },
        uAutoSpeed: { value: autoSpeed },
        uAutoIntensity: { value: autoIntensity }
      };

      material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms,
        transparent: true
      });

      mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
      scene.add(mesh);

      // Mouse pointer interaction
      const handlePointerMove = (e) => {
        const rect = canvas.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = 1.0 - (e.clientY - rect.top) / rect.height;
        uniforms.uMouse.value.set(x, y);
      };

      window.addEventListener('pointermove', handlePointerMove);

      // Resize handler
      const handleResize = () => {
        if (!container) return;
        width = container.clientWidth || 1080;
        height = container.clientHeight || 1080;
        renderer.setSize(width * resolution, height * resolution, false);
        uniforms.uResolution.value.set(width * resolution, height * resolution);
      };

      window.addEventListener('resize', handleResize);

      // Render loop
      const startTime = performance.now();
      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        const elapsed = (performance.now() - startTime) / 1000;
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
      console.warn('LiquidEther WebGL init error:', err);
    }
  }, [colors, autoSpeed, autoIntensity, mouseForce, cursorSize, resolution]);

  return (
    <div ref={containerRef} className={`liquid-ether-container ${className}`} style={style}>
      <canvas ref={canvasRef} className="liquid-ether-canvas" />
    </div>
  );
}
