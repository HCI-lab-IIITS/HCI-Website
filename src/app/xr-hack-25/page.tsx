'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Zap,
  Calendar,
  MapPin,
  Users,
  Award,
  ArrowLeft,
  Sparkles,
  Code,
  Layers,
  HeartPulse,
  BookOpen,
  Mail
} from 'lucide-react';

export default function XRHack25Page() {
  const tracks = [
    {
      icon: HeartPulse,
      title: 'Healthcare & Assistive XR',
      desc: 'Mixed reality applications for motor rehabilitation, surgical planning, cognitive training, and accessible spatial user interfaces.',
      color: 'text-rose-400 border-rose-500/30 bg-rose-950/20'
    },
    {
      icon: BookOpen,
      title: 'STEM & Interactive Learning',
      desc: 'Immersive simulations making complex physics, engineering, and mathematical concepts tangible in 6DOF virtual space.',
      color: 'text-sky-400 border-sky-500/30 bg-sky-950/20'
    },
    {
      icon: Layers,
      title: 'Cultural Heritage & Tourism',
      desc: 'Augmented reality guides, spatial architectural reconstruction, and interactive virtual walkthroughs of heritage monuments.',
      color: 'text-amber-400 border-amber-500/30 bg-amber-950/20'
    },
    {
      icon: Code,
      title: 'Open Spatial Computing',
      desc: 'Experimental projects exploring novel gaze tracking, gesture recognition, multimodal AI integration, and WebXR interactions.',
      color: 'text-emerald-400 border-emerald-500/30 bg-emerald-950/20'
    }
  ];

  return (
    <div className="w-full min-h-screen flex flex-col relative bg-[#090d16] text-white pt-24 pb-20 px-4 sm:px-6 md:px-16 overflow-x-hidden font-sans">
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
        <span className="text-xs font-mono text-purple-400 uppercase tracking-wider">
          Student Hackathon
        </span>
      </motion.div>

      {/* Hero Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto w-full mb-10"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-purple-500/40 bg-purple-950/40 text-purple-300 text-xs tracking-wide uppercase mb-4 backdrop-blur-md">
          <Zap className="w-3.5 h-3.5 text-purple-400" />
          <span>Annual Innovation Sprint</span>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-light tracking-tight text-white mb-4 leading-tight">
          XR Hack &apos;25
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-slate-300 font-light max-w-3xl leading-relaxed">
          The flagship student extended reality hackathon hosted by the Human-Computer Interaction Laboratory at IIIT Sri City. Bringing together multidisciplinary developers, designers, and researchers to prototype spatial computing solutions.
        </p>

        {/* Event Quick Info */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-8">
          {[
            { icon: Calendar, label: 'Timeline', val: 'Annual Edition' },
            { icon: MapPin, label: 'Location', val: 'IIIT Sri City' },
            { icon: Users, label: 'Eligibility', val: 'Students & Devs' },
            { icon: Award, label: 'Recognition', val: 'Awards & Mentorship' }
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
            src="/photos/events/xr_hack_2025.jpg"
            alt="XR Hack 2025 Event"
            className="w-full h-full object-cover object-center filter brightness-[0.85] contrast-[1.05] group-hover:scale-[1.02] transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
          <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6">
            <span className="text-[11px] font-mono text-[#c5a880] uppercase tracking-wider block mb-1">
              HCI Lab Innovation Platform
            </span>
            <h3 className="text-lg sm:text-2xl font-light text-white">
              Prototyping Future Realities
            </h3>
          </div>
        </div>
      </motion.div>

      {/* Challenge Tracks */}
      <section className="max-w-6xl mx-auto w-full mb-16">
        <div className="mb-8">
          <span className="text-xs font-mono uppercase tracking-widest text-[#c5a880] block mb-2">
            Focus Tracks
          </span>
          <h2 className="text-2xl sm:text-3xl font-light text-white">
            Hackathon Problem Statements
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {tracks.map((track) => (
            <div
              key={track.title}
              className="p-6 rounded-2xl bg-slate-900/50 border border-white/10 backdrop-blur-md flex flex-col justify-between"
            >
              <div>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 border ${track.color}`}>
                  <track.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-light text-white mb-2">
                  {track.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 font-light leading-relaxed">
                  {track.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact & Registration Inquiries */}
      <section className="max-w-6xl mx-auto w-full">
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-purple-950/40 via-slate-900/80 to-slate-900/60 border border-purple-500/30 backdrop-blur-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-purple-400 mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Get Involved</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-light text-white mb-2">
              Participate or Mentor at XR Hack
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 font-light max-w-xl">
              For event inquiries, partner sponsorships, or upcoming registration cycles, contact the organizing team at IIIT Sri City.
            </p>
          </div>

          <a
            href="mailto:himangshu.sarma@iiits.in?subject=XR%20Hack%20Inquiry"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-mono text-xs uppercase tracking-wider transition-all shadow-lg shadow-purple-600/20 whitespace-nowrap"
          >
            <Mail className="w-4 h-4" />
            <span>Contact Organizers</span>
          </a>
        </div>
      </section>
    </div>
  );
}
