'use client';

import React, { useState, useEffect } from 'react';
import { Eye, Gamepad2, Layers, Sparkles, Zap } from 'lucide-react';

export default function XRSpatialHUD() {
  const [activeTab, setActiveTab] = useState<'6dof' | 'gaze' | 'badminton'>('6dof');
  const [trackerCoords, setTrackerCoords] = useState({ x: 0.12, y: -0.45, z: 1.84, pitch: 4.2, yaw: -12.8 });
  const [shuttleVelocity, setShuttleVelocity] = useState(318);
  const [gazeFixation, setGazeFixation] = useState(99.4);

  // Live simulation tick
  useEffect(() => {
    const interval = setInterval(() => {
      setTrackerCoords((prev) => ({
        x: +(prev.x + (Math.random() * 0.04 - 0.02)).toFixed(2),
        y: +(prev.y + (Math.random() * 0.04 - 0.02)).toFixed(2),
        z: +(prev.z + (Math.random() * 0.02 - 0.01)).toFixed(2),
        pitch: +(prev.pitch + (Math.random() * 0.4 - 0.2)).toFixed(1),
        yaw: +(prev.yaw + (Math.random() * 0.6 - 0.3)).toFixed(1),
      }));

      setShuttleVelocity(Math.floor(310 + Math.random() * 25));
      setGazeFixation(+(98 + Math.random() * 1.8).toFixed(1));
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-gradient-to-br from-[#0d254c]/80 via-slate-950 to-black border border-[#d4af37]/30 rounded-3xl p-6 md:p-8 backdrop-blur-2xl shadow-[0_0_50px_rgba(26,73,147,0.25)] relative overflow-hidden text-white">
      {/* Background Spatial Grid Accent */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      {/* Top HUD Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-white/10 relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#d4af37]/40 bg-[#d4af37]/10 text-[#f3d068] text-[11px] font-mono uppercase tracking-wider mb-2">
            <Sparkles className="w-3 h-3" /> HCI Spatial XR & Gaming Engine HUD
          </div>
          <h3 className="text-xl md:text-2xl font-light text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#06b6d4]" /> Spatial Telemetry & 6DOF Physics Simulator
          </h3>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap gap-2 bg-black/60 p-1.5 rounded-2xl border border-white/10">
          <button
            onClick={() => setActiveTab('6dof')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-light transition-all flex items-center gap-1.5 ${
              activeTab === '6dof'
                ? 'bg-[#1a4993] text-[#f3d068] border border-[#d4af37]/40 shadow-md'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" /> 6DOF XR Tracker
          </button>
          <button
            onClick={() => setActiveTab('gaze')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-light transition-all flex items-center gap-1.5 ${
              activeTab === 'gaze'
                ? 'bg-[#1a4993] text-[#06b6d4] border border-[#06b6d4]/40 shadow-md'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <Eye className="w-3.5 h-3.5" /> Gaze & EOG Target
          </button>
          <button
            onClick={() => setActiveTab('badminton')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-light transition-all flex items-center gap-1.5 ${
              activeTab === 'badminton'
                ? 'bg-[#1a4993] text-[#f3d068] border border-[#d4af37]/40 shadow-md'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <Gamepad2 className="w-3.5 h-3.5" /> VR Badminton Physics
          </button>
        </div>
      </div>

      {/* Interactive Telemetry Panel */}
      <div className="mt-6 relative z-10">
        {activeTab === '6dof' && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-black/60 border border-white/10 rounded-2xl p-4">
              <span className="text-[10px] font-mono text-[#d4af37] uppercase block mb-1">Position (X, Y, Z)</span>
              <span className="text-lg font-mono text-white">
                {trackerCoords.x}m, {trackerCoords.y}m, {trackerCoords.z}m
              </span>
              <span className="text-[10px] text-white/40 block mt-1">Spatial Headset Anchor</span>
            </div>

            <div className="bg-black/60 border border-white/10 rounded-2xl p-4">
              <span className="text-[10px] font-mono text-[#06b6d4] uppercase block mb-1">Rotation (Pitch, Yaw)</span>
              <span className="text-lg font-mono text-[#06b6d4]">
                {trackerCoords.pitch}°, {trackerCoords.yaw}°
              </span>
              <span className="text-[10px] text-white/40 block mt-1">6DOF Gyro Sensor</span>
            </div>

            <div className="bg-black/60 border border-white/10 rounded-2xl p-4">
              <span className="text-[10px] font-mono text-[#f3d068] uppercase block mb-1">Render Refresh Rate</span>
              <span className="text-lg font-mono text-emerald-400">120.0 FPS</span>
              <span className="text-[10px] text-white/40 block mt-1">Ultra-low Motion Latency (&lt;4ms)</span>
            </div>

            <div className="bg-black/60 border border-white/10 rounded-2xl p-4">
              <span className="text-[10px] font-mono text-purple-400 uppercase block mb-1">Tracking Confidence</span>
              <span className="text-lg font-mono text-purple-300">99.8%</span>
              <span className="text-[10px] text-white/40 block mt-1">OptiTrack + IMU Fusion</span>
            </div>
          </div>
        )}

        {activeTab === 'gaze' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-black/60 border border-[#06b6d4]/30 rounded-2xl p-5 flex flex-col justify-between">
              <div>
                <span className="text-xs text-[#06b6d4] font-mono uppercase block mb-2">EOG & Gaze Fixation</span>
                <div className="text-3xl font-mono text-white mb-2">{gazeFixation}%</div>
                <p className="text-xs text-white/60 font-light">Real-time Electrooculography dwell attention analysis.</p>
              </div>
              <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden mt-4">
                <div className="bg-[#06b6d4] h-full transition-all duration-500" style={{ width: `${gazeFixation}%` }} />
              </div>
            </div>

            <div className="bg-black/60 border border-white/10 rounded-2xl p-5 md:col-span-2 flex flex-col justify-between">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-mono text-[#f3d068] uppercase">Target Selection Dwell Radius</span>
                <span className="text-xs font-mono text-white/50">Dwell Time: 350ms</span>
              </div>
              <div className="h-24 bg-gradient-to-r from-[#1a4993]/40 via-black to-[#06b6d4]/20 rounded-xl border border-white/10 p-4 flex items-center justify-around">
                <div className="w-10 h-10 rounded-full border-2 border-dashed border-[#06b6d4] flex items-center justify-center animate-spin">
                  <div className="w-3 h-3 rounded-full bg-[#06b6d4]" />
                </div>
                <div className="text-center">
                  <span className="text-xs font-mono text-white block">EOG Gaze Lock</span>
                  <span className="text-[10px] text-emerald-400 font-mono">Target Selected</span>
                </div>
                <Zap className="w-6 h-6 text-[#f3d068] animate-pulse" />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'badminton' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-black/60 border border-[#d4af37]/30 rounded-2xl p-5">
              <span className="text-xs font-mono text-[#f3d068] uppercase block mb-1">Simulated Shuttlecock Velocity</span>
              <div className="text-3xl font-mono text-[#f3d068] mb-2">{shuttleVelocity} <span className="text-xs font-normal text-white/50">km/h</span></div>
              <p className="text-xs text-white/60 font-light">High-fidelity aerodynamic drag and racquet strike collision physics (IEEE ISMAR 2026).</p>
            </div>

            <div className="bg-black/60 border border-white/10 rounded-2xl p-5 md:col-span-2 flex flex-col justify-between">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-mono text-white/70 uppercase">Adaptive VR Coaching Feedback</span>
                <span className="text-xs text-emerald-400 font-mono">Physics Engine: Unity 6 Physics</span>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-white/80 font-mono leading-relaxed">
                [Stroke Analysis]: Wrist rotation angle 42° • Smash trajectory optimal • Aerodynamic drag coefficient 0.58 • Feedback: Excellent forearm snap!
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
