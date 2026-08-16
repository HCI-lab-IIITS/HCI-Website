'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Users, Star, Building, ExternalLink, X, ArrowUpRight } from 'lucide-react';
import projectsData from '../../data/projects.json';

interface Deployment {
  name: string;
  link: string;
}

interface Project {
  id: number;
  title: string;
  description: string;
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
  bannerImage?: string;
  galleryImages?: string[];
  deployments?: Deployment[];
  publications?: string[];
}

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = useMemo(() => {
    return (projectsData.projects as Project[]).filter((project) => {
      const matchesSearch =
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.technologies.some((tech) => tech.toLowerCase().includes(searchTerm.toLowerCase())) ||
        project.team.some((member) => member.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesStatus = selectedStatus === 'all' || project.status === selectedStatus;
      const matchesFeatured = !showFeaturedOnly || project.featured;

      return matchesSearch && matchesStatus && matchesFeatured;
    });
  }, [searchTerm, selectedStatus, showFeaturedOnly]);

  return (
    <div className="w-screen min-h-screen flex flex-col relative bg-[#090d16] text-white pt-28 pb-24 px-6 md:px-16 overflow-x-hidden font-sans">
      {/* MIT Media Lab Inspired Header Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto w-full mb-12 border-b border-white/15 pb-10"
      >
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#c5a880] font-mono mb-3">
          <span>HCI LAB</span>
          <span>/</span>
          <span>RESEARCH & INITIATIVES</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-light tracking-tight text-white mb-4">
          Research Projects
        </h1>
        <p className="text-base md:text-lg text-slate-400 font-light max-w-3xl leading-relaxed">
          Exploring spatial computing, multi-modal mixed reality, cognitive neural interaction, high-fidelity physics for VR, and speech/gesture inclusion AI. Inspired by the rigorous interdisciplinary methodology of the MIT Media Lab.
        </p>
      </motion.div>

      {/* Filter & Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="max-w-7xl mx-auto w-full mb-10 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center bg-slate-900/60 p-4 rounded-2xl border border-white/10 backdrop-blur-md"
      >
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

        {/* Filter Controls */}
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
              className="group bg-slate-900/50 border border-white/10 rounded-2xl overflow-hidden hover:border-[#c5a880]/50 transition-all duration-300 flex flex-col justify-between backdrop-blur-xl relative"
            >
              {/* Media Banner Top Block */}
              <div className="h-48 w-full relative overflow-hidden bg-slate-950 border-b border-white/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.bannerImage || '/photos/lab/vr_teleconsultation.jpg'}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-85"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-mono uppercase tracking-wider bg-black/80 backdrop-blur-md border border-white/20 text-[#c5a880]">
                  {project.status}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
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

                  <h3 className="text-lg font-light text-white mb-3 group-hover:text-[#c5a880] transition-colors leading-snug">
                    {project.title}
                  </h3>

                  <p className="text-xs text-slate-400 font-light line-clamp-3 leading-relaxed mb-6">
                    {project.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-4">
                    <span className="font-mono text-[11px]">PI: {project.team[0]}</span>
                    {project.funding && (
                      <span className="text-[10px] text-[#c5a880] font-mono bg-[#c5a880]/10 px-2 py-0.5 rounded border border-[#c5a880]/20">
                        {project.funding}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => setSelectedProject(project)}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-950 hover:bg-slate-800 border border-white/10 hover:border-[#c5a880]/40 text-xs font-mono uppercase tracking-wider text-white transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>View Project Overview</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#c5a880]" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* MIT Media Lab Style Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="bg-slate-900 border border-white/15 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-10 shadow-2xl relative text-white"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-slate-800 hover:bg-slate-700 border border-white/10 text-slate-300 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#c5a880] mb-3">
                <span>HCI PROJECT SPECIFICATION</span>
                <span>/</span>
                <span className="text-white">{selectedProject.status}</span>
              </div>

              <h2 className="text-2xl md:text-4xl font-light mb-4 text-white leading-tight">
                {selectedProject.title}
              </h2>

              <p className="text-sm md:text-base text-slate-300 font-light leading-relaxed mb-8 border-b border-white/10 pb-6">
                {selectedProject.description}
              </p>

              {/* Grid Metadata Sections */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-[#c5a880] mb-3 flex items-center gap-2">
                    <Users className="w-4 h-4" /> Research Investigators & Team
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {selectedProject.team.map((member) => (
                      <li key={member} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#c5a880]" />
                        <span>{member}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-[#38bdf8] mb-3 flex items-center gap-2">
                    <Building className="w-4 h-4" /> Funding Agency & Grants
                  </h4>
                  <p className="text-xs text-slate-300 mb-1">
                    {selectedProject.fundingAgency || 'HCI Research Initiative'}
                  </p>
                  {selectedProject.funding && (
                    <span className="inline-block px-2.5 py-1 rounded bg-[#c5a880]/15 text-[#c5a880] text-xs font-mono border border-[#c5a880]/30 mt-1">
                      {selectedProject.funding}
                    </span>
                  )}
                </div>
              </div>

              {/* Technologies */}
              <div className="mb-8">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
                  Core Technologies & Methodologies
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-lg text-xs font-mono bg-slate-950 text-slate-200 border border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Deployments & Publications */}
              {(selectedProject.deployments?.length || selectedProject.publications?.length) ? (
                <div className="space-y-4 pt-6 border-t border-white/10">
                  {selectedProject.deployments && selectedProject.deployments.length > 0 && (
                    <div>
                      <h4 className="text-xs font-mono uppercase tracking-wider text-[#c5a880] mb-2">
                        Live Deployments & Demonstrations
                      </h4>
                      <div className="flex flex-wrap gap-3">
                        {selectedProject.deployments.map((dep) => (
                          <a
                            key={dep.name}
                            href={dep.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs text-[#38bdf8] hover:underline"
                          >
                            <span>{dep.name}</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedProject.publications && selectedProject.publications.length > 0 && (
                    <div>
                      <h4 className="text-xs font-mono uppercase tracking-wider text-[#c5a880] mb-2">
                        Associated Publications
                      </h4>
                      <ul className="list-disc list-inside text-xs text-slate-300 space-y-1">
                        {selectedProject.publications.map((pub) => (
                          <li key={pub}>{pub}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ) : null}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
