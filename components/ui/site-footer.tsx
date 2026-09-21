'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, MapPin, ExternalLink } from 'lucide-react';

export function SiteFooter() {
  return (
    <footer className="w-full bg-[#060910] text-white border-t border-white/10 relative z-20 font-sans">
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          
          {/* Column 1: Lab Branding & Institutional Overview */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <div className="flex items-center gap-3 mb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.png"
                alt="HCI Lab Logo"
                className="w-10 h-10 object-contain"
              />
              <div>
                <span className="font-semibold text-sm tracking-tight text-white block">
                  HCI Laboratory
                </span>
                <span className="text-[11px] font-mono text-[#c5a880] tracking-wider uppercase block">
                  IIIT Sri City
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 font-light leading-relaxed mb-6 max-w-sm">
              Dedicated to pioneering spatial computing, mixed reality environments, biomechanical physics simulation, assistive neural interfaces, and applied artificial intelligence.
            </p>

            <div className="text-xs text-slate-500 font-mono">
              Indian Institute of Information Technology Sri City, Chittoor
            </div>
          </div>

          {/* Column 2: Research Focus */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#c5a880] mb-4">
              Research Domains
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-400 font-light">
              <li>
                <Link href="/projects/vr-badminton" className="hover:text-white transition-colors">
                  Spatial Computing & VR Coaching
                </Link>
              </li>
              <li>
                <Link href="/projects/mr-teleconsultation" className="hover:text-white transition-colors">
                  Healthcare Mixed Reality
                </Link>
              </li>
              <li>
                <Link href="/projects/eog-object-selection" className="hover:text-white transition-colors">
                  Assistive Gaze & EOG Interfaces
                </Link>
              </li>
              <li>
                <Link href="/projects/isl-translation" className="hover:text-white transition-colors">
                  Indian Sign Language Translation
                </Link>
              </li>
              <li>
                <Link href="/projects/dpla-retriever" className="hover:text-white transition-colors">
                  Neural Retrieval & LLM Systems
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Navigation */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#c5a880] mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-400 font-light">
              <li>
                <Link href="/projects" className="hover:text-white transition-colors">
                  Research Projects
                </Link>
              </li>
              <li>
                <Link href="/publications" className="hover:text-white transition-colors">
                  Publications
                </Link>
              </li>
              <li>
                <Link href="/people" className="hover:text-white transition-colors">
                  Researchers & Alumni
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-white transition-colors">
                  News & Impact
                </Link>
              </li>
              <li>
                <Link href="/xr-hack-25" className="hover:text-white transition-colors">
                  XR Hack &apos;25
                </Link>
              </li>
              <li>
                <Link href="/global-game-jam" className="hover:text-white transition-colors">
                  Global Game Jam
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Institute */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#c5a880] mb-4">
              Laboratory Contact
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-slate-400 font-light">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#c5a880] flex-shrink-0 mt-0.5" />
                <span>
                  Academic Block, IIIT Sri City<br />
                  630 Gnan Marg, Sri City, Tirupati District<br />
                  Andhra Pradesh 517646, India
                </span>
              </div>

              <div className="flex items-center gap-2.5 pt-1">
                <Mail className="w-4 h-4 text-[#c5a880] flex-shrink-0" />
                <a
                  href="mailto:himangshu.sarma@iiits.in"
                  className="hover:text-white transition-colors truncate"
                >
                  himangshu.sarma@iiits.in
                </a>
              </div>

              <div className="pt-3">
                <a
                  href="https://www.iiits.ac.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-[#c5a880] hover:text-white transition-colors font-mono"
                >
                  <span>Visit IIIT Sri City</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono">
          <div>
            © {new Date().getFullYear()} Human-Computer Interaction Laboratory, IIIT Sri City.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-slate-400 transition-colors">
              Home
            </Link>
            <Link href="/publications" className="hover:text-slate-400 transition-colors">
              Publications
            </Link>
            <Link href="/projects" className="hover:text-slate-400 transition-colors">
              Projects
            </Link>
            <Link href="/people" className="hover:text-slate-400 transition-colors">
              People
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
