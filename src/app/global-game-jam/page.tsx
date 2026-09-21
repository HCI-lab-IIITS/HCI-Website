'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Gamepad2,
  Calendar,
  MapPin,
  Users,
  Trophy,
  ArrowLeft,
  Sparkles,
  Layers,
  Cpu,
  Smile,
  Compass,
  Mail
} from 'lucide-react';

export default function GlobalGameJamPage() {
  const pillars = [
    {
      icon: Cpu,
      title: '48-Hour Rapid Prototyping',
      desc: 'Form teams, brainstorm around the secret annual global theme, and build a complete playable game from scratch within 48 hours.',
      color: 'text-emerald-400 border-emerald-500/30 bg-emerald-950/20'
    },
    {
      icon: Layers,
      title: 'Immersive & Spatial Gameplay',
      desc: 'Explore novel mechanics utilizing virtual reality headsets, spatial motion controllers, hand tracking, and physics simulations.',
      color: 'text-teal-400 border-teal-500/30 bg-teal-950/20'
    },
    {
      icon: Compass,
      title: 'Serious Games & Storytelling',
      desc: 'Design games that educate, foster empathy, tackle social or ecological challenges, and introduce meaningful interactive narratives.',
      color: 'text-cyan-400 border-cyan-500/30 bg-cyan-950/20'
    },
    {
      icon: Smile,
      title: 'Inclusive Collaboration',
      desc: 'Open to programmers, artists, 3D modelers, musicians, narrative designers, and curious first-time creators of all skill levels.',
      color: 'text-amber-400 border-amber-500/30 bg-amber-950/20'
    }
  ];

  return (
    <div className="w-screen min-h-screen flex flex-col relative bg-[#090d16] text-white pt-24 pb-20 px-4 sm:px-6 md:px-16 overflow-x-hidden font-sans">
      {/* Top Breadcrumb */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-6xl mx-auto w-full mb-6 sm:mb-8 flex items-center justify-between border-b border-white/10 pb-4"
      >
        <Link
          href="/"
          className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#c5a880] font-mono hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>
        <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">
          Game Jam Site
        </span>
      </motion.div>

      {/* Hero Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto w-full mb-10"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/40 bg-emerald-950/40 text-emerald-300 text-xs tracking-wide uppercase mb-4 backdrop-blur-md">
          <Gamepad2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>Global Game Jam Chapter</span>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-light tracking-tight text-white mb-4 leading-tight">
          Global Game Jam
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-slate-300 font-light max-w-3xl leading-relaxed">
          Hosted annually at IIIT Sri City, uniting student developers, digital artists, audio designers, and game enthusiasts to build experimental games under a unified worldwide theme.
        </p>

        {/* Quick Info */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-8">
          {[
            { icon: Calendar, label: 'Duration', val: '48-Hour Sprint' },
            { icon: MapPin, label: 'Host Venue', val: 'IIIT Sri City' },
            { icon: Users, label: 'Community', val: 'All Disciplines' },
            { icon: Trophy, label: 'Showcase', val: 'Playable Demos' }
          ].map((item) => (
            <div
              key={item.label}
              className="p-3.5 sm:p-4 rounded-xl bg-slate-900/60 border border-white/10 backdrop-blur-md"
            >
              <item.icon className="w-4 h-4 text-[#c5a880] mb-2" />
              <div className="text-[10px] font-mono uppercase text-slate-400 tracking-wider">
                {item.label}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-white mt-0.5">
                {item.val}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Real Event Photo Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="max-w-6xl mx-auto w-full mb-14"
      >
        <div className="relative w-full h-[240px] sm:h-[360px] md:h-[460px] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 shadow-2xl bg-slate-950 group">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/photos/events/global_game_jam.jpg"
            alt="Global Game Jam Event"
            className="w-full h-full object-cover object-center filter brightness-[0.85] contrast-[1.05] group-hover:scale-[1.02] transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
          <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6">
            <span className="text-[11px] font-mono text-[#c5a880] uppercase tracking-wider block mb-1">
              Creative Computing & Game Dev
            </span>
            <h3 className="text-lg sm:text-2xl font-light text-white">
              Collaborative Innovation & Experimentation
            </h3>
          </div>
        </div>
      </motion.div>

      {/* Core Jam Pillars */}
      <section className="max-w-6xl mx-auto w-full mb-16">
        <div className="mb-8">
          <span className="text-xs font-mono uppercase tracking-widest text-[#c5a880] block mb-2">
            Experience
          </span>
          <h2 className="text-2xl sm:text-3xl font-light text-white">
            What Happens at the Jam
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="p-6 rounded-2xl bg-slate-900/50 border border-white/10 backdrop-blur-md flex flex-col justify-between"
            >
              <div>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 border ${pillar.color}`}>
                  <pillar.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-light text-white mb-2">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 font-light leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Participation CTA */}
      <section className="max-w-6xl mx-auto w-full">
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900/80 to-slate-900/60 border border-emerald-500/30 backdrop-blur-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-400 mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Join the Community</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-light text-white mb-2">
              Build Games with Us at IIIT Sri City
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 font-light max-w-xl">
              Stay connected for Jam dates, workshop announcements, and team formation sessions throughout the academic calendar.
            </p>
          </div>

          <a
            href="mailto:himangshu.sarma@iiits.in?subject=Global%20Game%20Jam%20Inquiry"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs uppercase tracking-wider transition-all shadow-lg shadow-emerald-600/20 whitespace-nowrap"
          >
            <Mail className="w-4 h-4" />
            <span>Contact Host</span>
          </a>
        </div>
      </section>
    </div>
  );
}
