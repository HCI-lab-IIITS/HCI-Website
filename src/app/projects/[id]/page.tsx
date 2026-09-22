'use client';

import React, { useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Users,
  Building,
  DollarSign,
  Sparkles,
  Layers,
  FileText,
  Video,
  Eye,
  X,
  Download,
  Maximize2
} from 'lucide-react';
import projectsData from '@/data/projects.json';

interface GalleryImage {
  src: string;
  title?: string;
  caption?: string;
}

interface Publication {
  title: string;
  authors?: string[];
  journal?: string;
  year?: number;
  link?: string;
  pdf?: string;
}

interface Deployment {
  name: string;
  link: string;
}

interface Project {
  id: number;
  slug?: string;
  title: string;
  category?: string;
  domains?: string[];
  status?: string;
  progress?: number;
  startDate?: string;
  endDate?: string;
  summary?: string;
  description?: string;
  bannerImage?: string;
  galleryImages?: GalleryImage[];
  video?: string;
  team?: string[];
  externalCollaborators?: string[];
  funding?: string | null;
  fundingAgency?: string | null;
  featured?: boolean;
  technologies?: string[];
  features?: { title: string; description: string }[];
  publications?: Publication[];
  deployments?: Deployment[];
}

export default function ProjectDetailPage() {
  const params = useParams();
  const rawId = params?.id as string;

  // Find project dynamically by numeric ID or string slug
  const project = useMemo(() => {
    const projects = projectsData.projects as unknown as Project[];
    return (
      projects.find((p) => String(p.id) === rawId || p.slug === rawId) ||
      projects[0]
    );
  }, [rawId]);

  // Gallery Lightbox Modal State
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  // PDF Preview Modal State
  const [previewPdf, setPreviewPdf] = useState<{ title: string; url: string } | null>(null);

  // Dynamic Next & Prev Project navigation
  const { prevProject, nextProject } = useMemo(() => {
    const projects = projectsData.projects as unknown as Project[];
    const currentIndex = projects.findIndex((p) => p.id === project.id);
    const prev = currentIndex > 0 ? projects[currentIndex - 1] : projects[projects.length - 1];
    const next = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : projects[0];
    return { prevProject: prev, nextProject: next };
  }, [project]);

  const hasGallery = Boolean(project?.galleryImages && project.galleryImages.length > 0);
  const hasPublications = Boolean(project?.publications && project.publications.length > 0);
  const hasVideo = Boolean(project?.video && project.video.trim() !== '');
  const hasTeam = Boolean(project?.team && project.team.length > 0);
  const hasCollaborators = Boolean(project?.externalCollaborators && project.externalCollaborators.length > 0);
  const hasFunding = Boolean(project?.funding || project?.fundingAgency);
  const hasTechnologies = Boolean(project?.technologies && project.technologies.length > 0);
  const hasDeployments = Boolean(project?.deployments && project.deployments.length > 0);

  return (
    <div className="w-full min-h-screen flex flex-col relative bg-[#090d16] text-white pt-24 pb-20 px-4 sm:px-6 md:px-16 overflow-x-hidden font-sans">
      
      {/* Top Breadcrumb Bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-7xl mx-auto w-full mb-6 sm:mb-8 flex items-center justify-between border-b border-white/10 pb-4"
      >
        <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-[#c5a880] font-mono">
          <Link
            href="/projects"
            className="flex items-center gap-1.5 hover:text-white transition-colors duration-200"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>RESEARCH INITIATIVES</span>
          </Link>
          {project.category && (
            <>
              <span className="text-white/30">/</span>
              <Link
                href={`/projects?domain=${encodeURIComponent(project.category)}`}
                className="text-slate-400 hover:text-[#c5a880] transition-colors truncate max-w-xs md:max-w-md"
              >
                {project.category}
              </Link>
            </>
          )}
        </div>

        <Link
          href="/projects"
          className="hidden sm:inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400 hover:text-white transition-colors"
        >
          <span>All Projects [{projectsData.projects.length}]</span>
        </Link>
      </motion.div>

      {/* Hero Banner Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto w-full mb-8 sm:mb-12"
      >
        {/* Banner Container */}
        <div className="relative w-full h-[240px] sm:h-[340px] md:h-[460px] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 shadow-2xl bg-slate-950 mb-6 sm:mb-8 group">
          {project.bannerImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={project.bannerImage}
              alt={project.title}
              className="w-full h-full object-cover object-center filter brightness-[0.75] contrast-[1.05] group-hover:scale-[1.02] transition-transform duration-700"
              onError={(e) => {
                // Fallback gracefully
                (e.target as HTMLImageElement).src = '/photos/lab/generic_research_cover.jpg';
              }}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-950" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#090d16] via-[#090d16]/50 to-transparent" />

          {/* Banner Overlays */}
          <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 md:bottom-10 md:left-10 md:right-10 flex flex-col items-start">
            <div className="flex flex-wrap items-center gap-2 mb-2 sm:mb-3">
              {project.category && (
                <Link
                  href={`/projects?domain=${encodeURIComponent(project.category)}`}
                  className="px-2.5 sm:px-3 py-1 bg-[#c5a880] text-black font-mono font-bold text-[9px] sm:text-[10px] uppercase tracking-widest rounded-md shadow-lg hover:bg-white transition-colors"
                >
                  {project.category}
                </Link>
              )}
              {Array.isArray(project.domains) &&
                project.domains
                  .filter((d) => d !== project.category)
                  .map((d) => (
                    <Link
                      key={d}
                      href={`/projects?domain=${encodeURIComponent(d)}`}
                      className="px-2.5 sm:px-3 py-1 bg-slate-800/80 text-[#38bdf8] border border-[#38bdf8]/30 font-mono font-bold text-[9px] sm:text-[10px] uppercase tracking-widest rounded-md shadow-lg hover:bg-[#38bdf8]/20 transition-colors"
                    >
                      {d}
                    </Link>
                  ))}
              {project.status && (
                <span
                  className={`px-2.5 sm:px-3 py-1 font-mono text-[9px] sm:text-[10px] uppercase tracking-widest border backdrop-blur-md ${
                    project.status === 'active'
                      ? 'border-emerald-500/50 bg-emerald-950/70 text-emerald-300'
                      : 'border-blue-500/50 bg-blue-950/70 text-blue-300'
                  }`}
                >
                  {project.status === 'active' ? '● ACTIVE RESEARCH' : '✓ COMPLETED'}
                </span>
              )}
              {project.fundingAgency && (
                <span className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 bg-black/80 border border-white/20 text-slate-300 font-mono text-[10px] uppercase tracking-wider backdrop-blur-md">
                  <Building className="w-3 h-3 text-[#c5a880]" />
                  {project.fundingAgency.split(',')[0]}
                </span>
              )}
            </div>

            <h1 className="text-xl sm:text-3xl md:text-5xl font-light tracking-tight text-white max-w-4xl leading-tight">
              {project.title}
            </h1>
          </div>
        </div>

        {/* Executive Summary Callout Box */}
        {(project.summary || project.funding) && (
          <div className="p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl bg-gradient-to-r from-slate-900/90 to-black/80 border border-[#c5a880]/30 shadow-xl backdrop-blur-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            {project.summary && (
              <div className="flex-1">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#c5a880] mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Project Summary</span>
                </div>
                <p className="text-base md:text-lg text-slate-200 font-light leading-relaxed">
                  &ldquo;{project.summary}&rdquo;
                </p>
              </div>
            )}

            {hasFunding && (
              <div className="flex flex-col items-start md:items-end border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-8 min-w-[200px]">
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">RESEARCH GRANT</span>
                <span className="text-xl md:text-2xl font-mono font-bold text-[#c5a880] mt-0.5">{project.funding || 'Sanctioned Grant'}</span>
                {(project.startDate || project.endDate) && (
                  <span className="text-xs text-slate-400 mt-1">
                    {project.startDate ? project.startDate.slice(0, 4) : ''}
                    {project.endDate ? ` – ${project.endDate.slice(0, 4)}` : ''}
                  </span>
                )}
              </div>
            )}
          </div>
        )}
      </motion.div>

      {/* Main Content & Sidebar Grid */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* LEFT COLUMN: Main Research Description, Gallery, Video, Publications */}
        <div className="lg:col-span-8 flex flex-col gap-14">
          
          {/* Research Overview & Details */}
          {project.description && (
            <section className="flex flex-col gap-4">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#c5a880] font-mono">
                <Layers className="w-3.5 h-3.5" />
                <span>RESEARCH OVERVIEW & DETAILS</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-light text-white tracking-tight">
                Project Scope & Details
              </h2>
              <div className="text-slate-300 text-base leading-relaxed space-y-4 font-light border-l-2 border-[#c5a880]/50 pl-5 pt-1">
                {project.description.split('\n\n').map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>
            </section>
          )}

          {/* Key System Features & Architectural Highlights */}
          {project.features && project.features.length > 0 && (
            <section className="flex flex-col gap-5">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#c5a880] font-mono border-b border-white/10 pb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>ARCHITECTURAL & SCIENTIFIC HIGHLIGHTS</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-md flex flex-col justify-between hover:border-[#c5a880]/40 transition-colors"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] font-mono text-[#38bdf8] font-semibold">
                          0{idx + 1}.
                        </span>
                        <h4 className="text-sm font-medium text-white">{feat.title}</h4>
                      </div>
                      <p className="text-xs text-slate-300 font-light leading-relaxed">
                        {feat.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}



          {/* Interactive Media Gallery (Rendered only if images exist) */}
          {hasGallery && (
            <section className="flex flex-col gap-5">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#c5a880] font-mono">
                  <Eye className="w-3.5 h-3.5" />
                  <span>PROJECT GALLERY [{project.galleryImages?.length || 0} PHOTOS]</span>
                </div>
                <span className="text-[11px] font-mono text-slate-400">Click to expand</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {project.galleryImages?.map((img, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -4 }}
                    onClick={() => setSelectedImageIndex(idx)}
                    className="group relative rounded-2xl overflow-hidden border border-white/10 bg-slate-950 aspect-[4/3] cursor-pointer shadow-lg"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img.src}
                      alt={img.title || `Project Image ${idx + 1}`}
                      className="w-full h-full object-cover filter brightness-90 group-hover:brightness-100 group-hover:scale-105 transition-all duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/photos/lab/generic_research_cover.jpg';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
                    
                    <div className="absolute bottom-3 left-3 right-3">
                      <span className="text-[10px] font-mono text-[#c5a880] block mb-0.5">FIG. 0{idx + 1}</span>
                      {img.title && (
                        <h4 className="text-xs font-medium text-white line-clamp-1 group-hover:text-[#c5a880] transition-colors">
                          {img.title}
                        </h4>
                      )}
                    </div>

                    <div className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 p-1.5 rounded-lg text-white">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          )}

          {/* Project Teaser Video (Rendered only if available) */}
          {hasVideo && (
            <section className="flex flex-col gap-4">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#c5a880] font-mono">
                <Video className="w-3.5 h-3.5" />
                <span>PROJECT DEMONSTRATION VIDEO</span>
              </div>
              <h2 className="text-2xl font-light text-white tracking-tight">
                Video Teaser & Demo
              </h2>
              <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-black aspect-video shadow-2xl">
                <video
                  controls
                  preload="metadata"
                  src={project.video}
                  className="w-full h-full object-contain"
                  poster={project.bannerImage}
                />
              </div>
            </section>
          )}

          {/* Associated Academic Publications (Rendered only if available) */}
          {hasPublications && (
            <section className="flex flex-col gap-5">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#c5a880] font-mono border-b border-white/10 pb-3">
                <FileText className="w-3.5 h-3.5" />
                <span>ACADEMIC PUBLICATIONS [{project.publications?.length || 0}]</span>
              </div>

              <div className="space-y-4">
                {project.publications?.map((paper, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-slate-900/70 border border-white/10 hover:border-[#c5a880]/50 transition-all duration-300 shadow-xl"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {paper.year && (
                        <span className="px-2.5 py-0.5 bg-[#c5a880]/20 text-[#c5a880] border border-[#c5a880]/40 font-mono text-[10px] uppercase tracking-wider">
                          {paper.year}
                        </span>
                      )}
                      {paper.journal && (
                        <span className="text-xs font-mono text-slate-400 truncate">{paper.journal}</span>
                      )}
                    </div>

                    <h3 className="text-lg font-medium text-white mb-2 leading-snug">{paper.title}</h3>
                    {paper.authors && paper.authors.length > 0 && (
                      <p className="text-xs text-slate-400 font-light mb-4">
                        Authors: {paper.authors.join(', ')}
                      </p>
                    )}

                    <div className="flex flex-wrap items-center gap-3">
                      {paper.pdf && (
                        <button
                          onClick={() => setPreviewPdf({ title: paper.title, url: paper.pdf! })}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-[#c5a880] text-black font-mono font-bold text-xs uppercase tracking-wider hover:bg-white transition-colors"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>Preview Document [PDF]</span>
                        </button>
                      )}
                      {paper.link && (
                        <a
                          href={paper.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 text-slate-200 border border-white/15 font-mono text-xs uppercase tracking-wider hover:border-[#c5a880] hover:text-[#c5a880] transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Publisher Link</span>
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* RIGHT COLUMN: Sidebar (Team, Collaborators, Funding, Technologies, Deployments) */}
        <div className="lg:col-span-4 flex flex-col gap-8 lg:sticky lg:top-28">
          
          {/* Research Team Card */}
          {hasTeam && (
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-white/10 shadow-xl backdrop-blur-md">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#c5a880] mb-4">
                <Users className="w-3.5 h-3.5" />
                <span>RESEARCH TEAM</span>
              </div>

              <ul className="space-y-3">
                {project.team?.map((member, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm text-slate-200">
                    <div className="w-2 h-2 rounded-full bg-[#c5a880]" />
                    <span className="font-light">{member}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* External Collaborators Card (Rendered only if available) */}
          {hasCollaborators && (
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-white/10 shadow-xl backdrop-blur-md">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#c5a880] mb-4">
                <Building className="w-3.5 h-3.5" />
                <span>EXTERNAL COLLABORATORS</span>
              </div>

              <ul className="space-y-2.5">
                {project.externalCollaborators?.map((collab, idx) => (
                  <li key={idx} className="text-xs text-slate-300 font-light flex items-start gap-2">
                    <span className="text-[#c5a880] font-mono">▸</span>
                    <span>{collab}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Funding & Grants Card (Rendered only if available) */}
          {hasFunding && (
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-white/10 shadow-xl backdrop-blur-md">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#c5a880] mb-4">
                <DollarSign className="w-3.5 h-3.5" />
                <span>FUNDING & GRANTS</span>
              </div>

              <div className="space-y-3 text-xs text-slate-300 font-light">
                {project.funding && (
                  <div>
                    <span className="text-slate-500 uppercase font-mono block text-[10px]">SANCTIONED BUDGET</span>
                    <span className="text-lg font-mono font-bold text-white block mt-0.5">{project.funding}</span>
                  </div>
                )}
                {project.fundingAgency && (
                  <div>
                    <span className="text-slate-500 uppercase font-mono block text-[10px]">SPONSORING AGENCY</span>
                    <span className="text-slate-200 block mt-0.5">{project.fundingAgency}</span>
                  </div>
                )}
                {(project.startDate || project.endDate) && (
                  <div>
                    <span className="text-slate-500 uppercase font-mono block text-[10px]">PROJECT TIMELINE</span>
                    <span className="text-slate-200 block mt-0.5">
                      {project.startDate || 'N/A'} &ndash; {project.endDate || 'Present'}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Technologies Stack (Rendered only if available) */}
          {hasTechnologies && (
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-white/10 shadow-xl backdrop-blur-md">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#c5a880] mb-4">
                <Layers className="w-3.5 h-3.5" />
                <span>TECHNOLOGIES</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {project.technologies?.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 bg-slate-950/80 border border-white/10 text-[11px] font-mono text-slate-300 rounded-md"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Deployments & Links (Rendered only if available) */}
          {hasDeployments && (
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-white/10 shadow-xl backdrop-blur-md">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#c5a880] mb-4">
                <ExternalLink className="w-3.5 h-3.5" />
                <span>PROJECT DEPLOYMENTS</span>
              </div>

              <div className="space-y-2.5">
                {project.deployments?.map((dep, idx) => (
                  <a
                    key={idx}
                    href={dep.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 bg-black/60 border border-white/10 hover:border-[#c5a880] rounded-xl text-xs text-slate-200 hover:text-[#c5a880] transition-colors group"
                  >
                    <span>{dep.name}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#c5a880] transition-colors" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Pagination: Previous / Next Project */}
      <div className="max-w-7xl mx-auto w-full mt-20 pt-10 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Link
          href={`/projects/${prevProject.id}`}
          className="p-6 rounded-2xl bg-slate-900/50 border border-white/10 hover:border-[#c5a880]/50 transition-all flex items-center gap-4 group"
        >
          <ChevronLeft className="w-6 h-6 text-[#c5a880] group-hover:-translate-x-1 transition-transform" />
          <div className="flex flex-col text-left">
            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">PREVIOUS PROJECT</span>
            <span className="text-sm font-medium text-white group-hover:text-[#c5a880] transition-colors line-clamp-1">
              {prevProject.title}
            </span>
          </div>
        </Link>

        <Link
          href={`/projects/${nextProject.id}`}
          className="p-6 rounded-2xl bg-slate-900/50 border border-white/10 hover:border-[#c5a880]/50 transition-all flex items-center justify-between text-right group"
        >
          <div className="flex flex-col text-right">
            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">NEXT PROJECT</span>
            <span className="text-sm font-medium text-white group-hover:text-[#c5a880] transition-colors line-clamp-1">
              {nextProject.title}
            </span>
          </div>
          <ChevronRight className="w-6 h-6 text-[#c5a880] group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedImageIndex !== null && project.galleryImages?.[selectedImageIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-4 md:p-10"
            onClick={() => setSelectedImageIndex(null)}
          >
            {/* Top Toolbar */}
            <div className="absolute top-6 left-6 right-6 flex items-center justify-between text-white z-50">
              <div className="flex items-center gap-2 font-mono text-xs text-[#c5a880]">
                <span>FIG. 0{selectedImageIndex + 1} OF 0{project.galleryImages.length}</span>
                {project.galleryImages[selectedImageIndex].title && (
                  <>
                    <span className="text-white/40">|</span>
                    <span className="text-slate-300 truncate max-w-sm">{project.galleryImages[selectedImageIndex].title}</span>
                  </>
                )}
              </div>

              <button
                onClick={() => setSelectedImageIndex(null)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Image Container with Prev/Next Navigation */}
            <div
              className="relative max-w-5xl max-h-[75vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.galleryImages[selectedImageIndex].src}
                alt={project.galleryImages[selectedImageIndex].title || 'Gallery image'}
                className="max-w-full max-h-[70vh] object-contain rounded-xl shadow-2xl border border-white/20"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/photos/lab/generic_research_cover.jpg';
                }}
              />

              {project.galleryImages.length > 1 && (
                <>
                  {/* Prev Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImageIndex((prev) =>
                        prev !== null && prev > 0 ? prev - 1 : project.galleryImages!.length - 1
                      );
                    }}
                    className="absolute -left-12 md:-left-16 p-3 bg-black/70 hover:bg-[#c5a880] text-white hover:text-black rounded-full border border-white/20 transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  {/* Next Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImageIndex((prev) =>
                        prev !== null && prev < project.galleryImages!.length - 1 ? prev + 1 : 0
                      );
                    }}
                    className="absolute -right-12 md:-right-16 p-3 bg-black/70 hover:bg-[#c5a880] text-white hover:text-black rounded-full border border-white/20 transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Image Caption Bar */}
            {(project.galleryImages[selectedImageIndex].title || project.galleryImages[selectedImageIndex].caption) && (
              <div
                className="mt-6 max-w-2xl text-center px-4"
                onClick={(e) => e.stopPropagation()}
              >
                {project.galleryImages[selectedImageIndex].title && (
                  <h3 className="text-base font-medium text-white mb-1">
                    {project.galleryImages[selectedImageIndex].title}
                  </h3>
                )}
                {project.galleryImages[selectedImageIndex].caption && (
                  <p className="text-xs text-slate-400 font-light leading-relaxed">
                    {project.galleryImages[selectedImageIndex].caption}
                  </p>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* PDF VIEWER MODAL */}
      <AnimatePresence>
        {previewPdf && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-8"
            onClick={() => setPreviewPdf(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-900 border border-white/20 rounded-2xl w-full max-w-5xl h-[85vh] flex flex-col overflow-hidden shadow-2xl"
            >
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-slate-950">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-[#c5a880]" />
                  <div>
                    <h3 className="text-sm font-semibold text-white truncate max-w-md md:max-w-xl">
                      {previewPdf.title}
                    </h3>
                    <p className="text-xs text-slate-400 font-mono">Research Manuscript Viewer</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={previewPdf.url}
                    download
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-colors"
                    title="Download PDF"
                  >
                    <Download className="h-4 w-4" />
                  </a>
                  <button
                    onClick={() => setPreviewPdf(null)}
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-colors"
                    title="Close"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* PDF Embed */}
              <div className="flex-1 bg-slate-950 p-2 relative">
                <iframe
                  src={`${previewPdf.url}#toolbar=1&navpanes=0`}
                  className="w-full h-full rounded-lg border-0"
                  title={previewPdf.title}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
