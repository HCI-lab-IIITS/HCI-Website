'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, Star, ArrowRight } from 'lucide-react';
import projectsData from '@/data/projects.json';

interface GalleryImage {
  src: string;
  title: string;
  caption: string;
}

interface Publication {
  title: string;
  authors: string[];
  journal: string;
  year: number;
  link?: string;
  pdf?: string;
}

interface Deployment {
  name: string;
  link: string;
}

interface Project {
  id: number;
  slug: string;
  title: string;
  category: string;
  description: string;
  summary?: string;
  status: string;
  progress: number;
  startDate?: string;
  endDate?: string;
  team: string[];
  externalCollaborators?: string[];
  technologies: string[];
  funding?: string;
  fundingAgency?: string;
  featured?: boolean;
  bannerImage: string;
  galleryImages?: GalleryImage[];
  deployments?: Deployment[];
  publications?: Publication[];
}

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

  const categories = useMemo(() => {
    return projectsData.categories || ['all'];
  }, []);

  const filteredProjects = useMemo(() => {
    return (projectsData.projects as unknown as Project[]).filter((project) => {
      const matchesSearch =
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (project.summary && project.summary.toLowerCase().includes(searchTerm.toLowerCase())) ||
        project.technologies.some((tech) => tech.toLowerCase().includes(searchTerm.toLowerCase())) ||
        project.team.some((member) => member.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesStatus = selectedStatus === 'all' || project.status === selectedStatus;
      const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
      const matchesFeatured = !showFeaturedOnly || project.featured;

      return matchesSearch && matchesStatus && matchesCategory && matchesFeatured;
    });
  }, [searchTerm, selectedStatus, selectedCategory, showFeaturedOnly]);

  return (
    <div className="w-full min-h-screen flex flex-col relative bg-[#090d16] text-white pt-24 pb-20 px-4 sm:px-6 md:px-16 overflow-x-hidden font-sans">
      {/* Research Initiatives Header Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto w-full mb-8 sm:mb-12 border-b border-white/15 pb-6 sm:pb-10"
      >
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#c5a880] font-mono mb-3">
          <span>HCI LAB</span>
          <span>/</span>
          <span>RESEARCH & INITIATIVES</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-light tracking-tight text-white mb-3 sm:mb-4">
          Research Projects
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-slate-400 font-light max-w-3xl leading-relaxed">
          Interdisciplinary research across spatial computing, mixed reality, assistive neural interfaces, biomechanical physics simulation, and accessibility AI at IIIT Sri City.
        </p>
      </motion.div>

      {/* Filter & Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="max-w-7xl mx-auto w-full mb-8 sm:mb-10 flex flex-col gap-4 bg-slate-900/60 p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-white/10 backdrop-blur-md shadow-xl"
      >
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
          {/* Search */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by title, technology, or investigator..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-950/80 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#c5a880]/60 transition-colors"
            />
          </div>

          {/* Status & Featured Controls */}
          <div className="flex flex-wrap gap-2 items-center w-full md:w-auto">
            {['all', 'active', 'completed'].map((status) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all border ${
                  selectedStatus === status
                    ? 'bg-[#c5a880] text-black border-[#c5a880] font-semibold'
                    : 'bg-slate-950/60 text-slate-400 border-white/10 hover:border-white/20'
                }`}
              >
                {status === 'all' ? 'ALL STATUS' : status}
              </button>
            ))}

            <button
              onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
              className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider border transition-all flex items-center gap-1.5 ${
                showFeaturedOnly
                  ? 'bg-[#38bdf8]/20 text-[#38bdf8] border-[#38bdf8]'
                  : 'bg-slate-950/60 text-slate-400 border-white/10 hover:border-white/20'
              }`}
            >
              <Star className="w-3.5 h-3.5 fill-current" />
              FEATURED
            </button>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-2 border-t border-white/5 scrollbar-thin">
          <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider whitespace-nowrap">DOMAIN:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-lg text-[11px] font-mono uppercase tracking-wider transition-all whitespace-nowrap border ${
                selectedCategory === cat
                  ? 'bg-white text-black border-white font-semibold'
                  : 'bg-slate-950/50 text-slate-400 border-white/10 hover:border-white/20'
              }`}
            >
              {cat === 'all' ? 'ALL DOMAINS' : cat}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Projects Grid */}
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="group bg-slate-900/50 border border-white/10 rounded-2xl overflow-hidden hover:border-[#c5a880]/50 transition-all duration-300 flex flex-col justify-between backdrop-blur-xl relative shadow-xl hover:shadow-2xl"
            >
              {/* Media Banner Top Block */}
              <Link href={`/projects/${project.id}`} className="block">
                <div className="h-52 w-full relative overflow-hidden bg-slate-950 border-b border-white/10 cursor-pointer">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.bannerImage || '/photos/lab/vr_teleconsultation.jpg'}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-85 group-hover:opacity-100"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/photos/lab/vr_teleconsultation.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                  
                  {project.status && (
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-mono uppercase tracking-wider bg-black/80 backdrop-blur-md border border-white/20 text-[#c5a880]">
                      {project.status === 'active' ? '● ACTIVE' : '✓ COMPLETED'}
                    </div>
                  )}

                  {project.galleryImages && project.galleryImages.length > 0 && (
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md text-[10px] font-mono uppercase tracking-wider bg-black/80 backdrop-blur-md border border-white/20 text-slate-300">
                      {project.galleryImages.length} {project.galleryImages.length === 1 ? 'PHOTO' : 'PHOTOS'}
                    </div>
                  )}

                  {project.category && (
                    <div className="absolute bottom-3 left-3 right-3">
                      <span className="text-[10px] font-mono uppercase text-[#c5a880] tracking-wider block mb-0.5">
                        {project.category}
                      </span>
                    </div>
                  )}
                </div>
              </Link>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 text-slate-300 border border-white/10"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  <Link href={`/projects/${project.id}`}>
                    <h3 className="text-lg font-light text-white mb-2 group-hover:text-[#c5a880] transition-colors leading-snug cursor-pointer line-clamp-2">
                      {project.title}
                    </h3>
                  </Link>

                  {(project.summary || project.description) && (
                    <p className="text-xs text-slate-400 font-light line-clamp-3 leading-relaxed mb-6">
                      {project.summary || project.description}
                    </p>
                  )}
                </div>

                <div className="pt-4 border-t border-white/10">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-4 min-h-[20px]">
                    {project.team && project.team.length > 0 ? (
                      <span className="font-mono text-[11px] truncate max-w-[170px]">
                        {project.team[0]}
                      </span>
                    ) : (
                      <span />
                    )}
                    {project.funding && (
                      <span className="text-[10px] text-[#c5a880] font-mono bg-[#c5a880]/10 px-2 py-0.5 rounded border border-[#c5a880]/20">
                        {project.funding}
                      </span>
                    )}
                  </div>

                  {/* Direct Link to Full Dedicated Project Detail Page */}
                  <Link
                    href={`/projects/${project.id}`}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-950 hover:bg-[#c5a880] hover:text-black border border-white/10 hover:border-[#c5a880] text-xs font-mono uppercase tracking-wider text-white transition-all flex items-center justify-center gap-2 group/btn"
                  >
                    <span>Explore Full Project Details</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
