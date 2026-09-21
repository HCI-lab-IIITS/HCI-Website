'use client';

import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { Compass, Activity } from 'lucide-react';

interface SpatialViewerProps {
  projectSlug?: string;
  projectTitle?: string;
}

// 3D Scene Geometry Component
function SpatialAsset({ 
  mode, 
  projectSlug, 
  onUpdateCoords 
}: { 
  mode: 'solid' | 'wireframe' | 'points'; 
  projectSlug?: string; 
  onUpdateCoords: (coords: { x: string; y: string; z: string }) => void;
}) {
  const meshRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  // Determine geometry type based on research project domain
  const { primaryGeom, secondaryGeom } = useMemo(() => {
    if (projectSlug === 'mr-teleconsultation') {
      // Anatomical organ representation (TorusKnot / Volume)
      return {
        primaryGeom: new THREE.TorusKnotGeometry(1.2, 0.4, 128, 32, 2, 3),
        secondaryGeom: new THREE.SphereGeometry(1.6, 24, 24)
      };
    } else if (projectSlug === 'vr-badminton') {
      // Kinetic kinematic stroke trajectory & racket frame
      return {
        primaryGeom: new THREE.IcosahedronGeometry(1.4, 2),
        secondaryGeom: new THREE.RingGeometry(1.2, 1.35, 48)
      };
    } else if (projectSlug === 'phylos' || projectSlug === 'egoscore') {
      // Hyperbolic topological graph / neural routing polyhedron
      return {
        primaryGeom: new THREE.DodecahedronGeometry(1.3, 1),
        secondaryGeom: new THREE.OctahedronGeometry(1.8, 2)
      };
    } else if (projectSlug === 'mangaspace') {
      // Stylized non-linear viscoelastic deformation manifold
      return {
        primaryGeom: new THREE.TorusKnotGeometry(1.1, 0.35, 120, 20, 3, 5),
        secondaryGeom: new THREE.DodecahedronGeometry(1.7, 1)
      };
    } else {
      // Default 6DOF spatial bounding coordinate system
      return {
        primaryGeom: new THREE.TorusGeometry(1.2, 0.35, 30, 100),
        secondaryGeom: new THREE.BoxGeometry(2, 2, 2)
      };
    }
  }, [projectSlug]);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.45;
      meshRef.current.rotation.x += delta * 0.15;

      // Report simulated real-time 6DOF telemetry coordinates
      const t = state.clock.getElapsedTime();
      const x = (Math.sin(t * 0.8) * 0.45).toFixed(3);
      const y = (1.2 + Math.cos(t * 0.6) * 0.15).toFixed(3);
      const z = (-0.85 + Math.sin(t * 0.4) * 0.3).toFixed(3);
      onUpdateCoords({ x, y, z });
    }

    if (ringRef.current) {
      ringRef.current.rotation.z -= delta * 0.6;
    }
  });

  const materialProps = useMemo(() => {
    const isManga = projectSlug === 'mangaspace';
    const isMR = projectSlug === 'mr-teleconsultation';
    const isEgo = projectSlug === 'egoscore';
    return {
      color: isMR ? '#f43f5e' : isEgo ? '#a855f7' : isManga ? '#fbbf24' : '#38bdf8',
      roughness: isManga ? 0.4 : 0.25,
      metalness: isManga ? 0.5 : 0.75,
      emissive: isMR ? '#881337' : isEgo ? '#3b0764' : isManga ? '#78350f' : '#0369a1',
      emissiveIntensity: 0.35,
      wireframe: mode === 'wireframe',
      transparent: true,
      opacity: mode === 'wireframe' ? 0.85 : 0.92
    };
  }, [mode, projectSlug]);

  return (
    <group ref={meshRef}>
      {mode === 'points' ? (
        <points geometry={primaryGeom}>
          <pointsMaterial 
            size={0.065} 
            color="#38bdf8" 
            transparent 
            opacity={0.85} 
            sizeAttenuation 
          />
        </points>
      ) : (
        <mesh ref={coreRef} geometry={primaryGeom}>
          <meshStandardMaterial {...materialProps} />
        </mesh>
      )}

      {/* Outer Spatial Bounding Lattice */}
      <mesh ref={ringRef} geometry={secondaryGeom}>
        <meshBasicMaterial 
          color="#c5a880" 
          wireframe 
          transparent 
          opacity={0.25} 
        />
      </mesh>

      {/* Origin Coordinate Grid Helper */}
      <gridHelper args={[6, 12, '#38bdf8', '#1e293b']} position={[0, -2, 0]} />
    </group>
  );
}

export function SpatialModelViewer({ projectSlug, projectTitle }: SpatialViewerProps) {
  const [mode, setMode] = useState<'solid' | 'wireframe' | 'points'>('solid');
  const [coords, setCoords] = useState({ x: '0.000', y: '1.200', z: '-0.850' });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="w-full my-6 rounded-2xl overflow-hidden border border-white/15 bg-slate-950 shadow-2xl flex flex-col relative">
      
      {/* Top Telemetry Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3.5 bg-slate-900/90 border-b border-white/10 backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-mono font-medium text-white uppercase tracking-wider">
            WebGL OpenXR 6DOF Simulator
          </span>
          <span className="hidden sm:inline-block text-[11px] font-mono text-slate-400">
            • {projectTitle || 'Spatial Kinematic Inspection'}
          </span>
        </div>

        {/* Display Mode Toggles */}
        <div className="flex items-center gap-1.5 bg-slate-950/80 p-1 rounded-xl border border-white/10">
          <button
            onClick={() => setMode('solid')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-mono uppercase tracking-wider transition-colors ${
              mode === 'solid'
                ? 'bg-[#c5a880] text-black font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Shaded
          </button>
          <button
            onClick={() => setMode('wireframe')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-mono uppercase tracking-wider transition-colors ${
              mode === 'wireframe'
                ? 'bg-[#c5a880] text-black font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Wireframe
          </button>
          <button
            onClick={() => setMode('points')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-mono uppercase tracking-wider transition-colors ${
              mode === 'points'
                ? 'bg-[#c5a880] text-black font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Points
          </button>
        </div>
      </div>

      {/* 3D Canvas Viewport */}
      <div 
        className="w-full h-80 sm:h-96 relative cursor-grab active:cursor-grabbing bg-gradient-to-b from-[#060a12] via-[#090d16] to-[#05080e]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Canvas camera={{ position: [0, 1.2, 4.2], fov: 50 }}>
          <ambientLight intensity={0.7} />
          <directionalLight position={[10, 10, 5]} intensity={1.2} />
          <pointLight position={[-10, -10, -5]} color="#38bdf8" intensity={0.8} />
          
          <SpatialAsset 
            mode={mode} 
            projectSlug={projectSlug} 
            onUpdateCoords={setCoords} 
          />
          
          <OrbitControls 
            enablePan={false} 
            enableZoom={true} 
            minDistance={2.5} 
            maxDistance={7.0} 
            autoRotate={!isHovered}
            autoRotateSpeed={0.8}
          />
        </Canvas>

        {/* Live Coordinate Overlay HUD */}
        <div className="absolute top-3 left-3 p-2.5 sm:p-3 rounded-xl bg-black/75 border border-white/10 backdrop-blur-md font-mono text-[10px] sm:text-xs text-slate-300 space-y-1 pointer-events-none shadow-lg">
          <div className="flex items-center gap-2 text-[#38bdf8] font-bold tracking-wider">
            <Compass className="w-3.5 h-3.5" />
            <span>DYNAMIC 6DOF POSE:</span>
          </div>
          <div>X: <span className="text-white font-semibold">{coords.x}m</span></div>
          <div>Y: <span className="text-white font-semibold">{coords.y}m</span></div>
          <div>Z: <span className="text-white font-semibold">{coords.z}m</span></div>
          <div className="text-slate-500 pt-1 text-[9px] border-t border-white/10 flex items-center justify-between gap-3">
            <span>REFRESH: 90Hz</span>
            <span className="text-emerald-400">SYNC: 0.8ms</span>
          </div>
        </div>

        {/* Interaction Hint Bottom Right */}
        <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-lg bg-black/60 border border-white/10 backdrop-blur-md font-mono text-[10px] text-slate-400 pointer-events-none">
          Drag to Orbit • Scroll to Zoom
        </div>
      </div>

      {/* Bottom Technical Explainer Banner */}
      <div className="px-4 sm:px-6 py-2.5 bg-slate-950 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-slate-400">
        <span className="flex items-center gap-1.5 text-slate-300">
          <Activity className="w-3.5 h-3.5 text-[#c5a880]" />
          <span>Simulated Spatial Tracking Engine • OpenXR Coordinate Pipeline</span>
        </span>
        <span className="text-slate-500 text-[11px]">
          Rendering via WebGL / Three.js Shaders
        </span>
      </div>

    </div>
  );
}
