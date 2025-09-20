'use client';

import { useState, useMemo } from 'react';
import { Search, FolderGit2, Calendar, DollarSign, Users, Star, Play, CheckCircle, Clock } from 'lucide-react';
import projectsData from '../../data/projects.json';

interface Project {
  id: number;
  title: string;
  description: string;
  status: 'active' | 'completed' | 'planned';
  progress: number;
  startDate: string;
  endDate: string;
  team: string[];
  technologies: string[];
  funding: string;
  fundingAgency: string;
  featured: boolean;
}

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedAgency, setSelectedAgency] = useState('all');
  const [selectedTechnology, setSelectedTechnology] = useState('all');
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

  const filteredProjects = useMemo(() => {
    return projectsData.projects.filter((project: Project) => {
      const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.technologies.some(tech => 
                             tech.toLowerCase().includes(searchTerm.toLowerCase())
                           ) ||
                           project.team.some(member => 
                             member.toLowerCase().includes(searchTerm.toLowerCase())
                           );
      
      const matchesStatus = selectedStatus === 'all' || project.status === selectedStatus;
      const matchesAgency = selectedAgency === 'all' || project.fundingAgency === selectedAgency;
      const matchesTechnology = selectedTechnology === 'all' || 
                               project.technologies.includes(selectedTechnology);
      const matchesFeatured = !showFeaturedOnly || project.featured;
      
      return matchesSearch && matchesStatus && matchesAgency && matchesTechnology && matchesFeatured;
    });
  }, [searchTerm, selectedStatus, selectedAgency, selectedTechnology, showFeaturedOnly]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <Play className="w-3 h-3" />;
      case 'completed':
        return <CheckCircle className="w-3 h-3" />;
      case 'planned':
        return <Clock className="w-3 h-3" />;
      default:
        return <FolderGit2 className="w-3 h-3" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-400/20 text-green-400 border-green-400/30';
      case 'completed':
        return 'bg-blue-400/20 text-blue-400 border-blue-400/30';
      case 'planned':
        return 'bg-yellow-400/20 text-yellow-400 border-yellow-400/30';
      default:
        return 'bg-gray-400/20 text-gray-400 border-gray-400/30';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-400';
    if (progress >= 50) return 'bg-yellow-400';
    return 'bg-red-400';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short' 
    });
  };

  return (
    <div className="w-screen min-h-screen flex flex-col relative bg-black">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extralight tracking-tight text-white mb-4">
              Research Projects
            </h1>
            <p className="text-lg text-white/70 font-light max-w-2xl mx-auto">
              Explore our cutting-edge research initiatives in Human-Computer Interaction, Virtual Reality, and AI
            </p>
          </div>

          {/* Search and Filters */}
          <div className="space-y-4 mb-8 max-w-6xl mx-auto">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/40" />
              <input
                type="text"
                placeholder="Search by title, description, technologies, or team members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-white/30 transition-colors backdrop-blur-sm"
              />
            </div>

            {/* Filters Row */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex flex-wrap gap-3">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-white/30 transition-colors backdrop-blur-sm"
                >
                  {projectsData.statuses.map((status) => (
                    <option key={status} value={status} className="bg-black text-white">
                      {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
                    </option>
                  ))}
                </select>

                <select
                  value={selectedAgency}
                  onChange={(e) => setSelectedAgency(e.target.value)}
                  className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-white/30 transition-colors backdrop-blur-sm"
                >
                  {projectsData.fundingAgencies.map((agency) => (
                    <option key={agency} value={agency} className="bg-black text-white">
                      {agency === 'all' ? 'All Funding Agencies' : agency}
                    </option>
                  ))}
                </select>

                <select
                  value={selectedTechnology}
                  onChange={(e) => setSelectedTechnology(e.target.value)}
                  className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-white/30 transition-colors backdrop-blur-sm"
                >
                  {projectsData.technologies.map((tech) => (
                    <option key={tech} value={tech} className="bg-black text-white">
                      {tech === 'all' ? 'All Technologies' : tech}
                    </option>
                  ))}
                </select>
              </div>

              {/* Featured Toggle */}
              <button
                onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
                className={`px-4 py-3 rounded-xl border transition-colors backdrop-blur-sm flex items-center gap-2 ${
                  showFeaturedOnly
                    ? 'bg-yellow-400/20 text-yellow-400 border-yellow-400/30'
                    : 'bg-white/5 text-white/70 border-white/10 hover:border-white/30'
                }`}
              >
                <Star className="w-4 h-4" />
                Featured Only
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="relative pb-24 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredProjects.map((project: Project) => (
              <div
                key={project.id}
                className={`group bg-white/5 border rounded-2xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-sm ${
                  project.featured ? 'border-yellow-400/30' : 'border-white/10'
                }`}
              >
                {/* Project Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-light text-white mb-2 leading-tight">
                      {project.title}
                    </h3>
                    
                    {/* Status and Featured Badge */}
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium border ${getStatusColor(project.status)}`}>
                        {getStatusIcon(project.status)}
                        <span className="ml-1">{project.status.charAt(0).toUpperCase() + project.status.slice(1)}</span>
                      </span>
                      
                      {project.featured && (
                        <span className="inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium bg-yellow-400/20 text-yellow-400 border border-yellow-400/30">
                          <Star className="w-3 h-3 mr-1" />
                          Featured
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-white/50 mb-2">
                      <span>Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-1">
                      <div
                        className={`h-1 rounded-full transition-all duration-300 ${getProgressColor(project.progress)}`}
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-white/60 leading-relaxed mb-4 font-light">
                    {project.description}
                  </p>

                  {/* Project Details - Minimal */}
                  <div className="space-y-2 mb-4 text-xs text-white/50">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-3 h-3" />
                      <span>{project.funding}</span>
                      <span>•</span>
                      <span className="truncate">{project.fundingAgency}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3 h-3" />
                      <span>{formatDate(project.startDate)} - {formatDate(project.endDate)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-3 h-3" />
                      <span>{project.team.length} members</span>
                    </div>
                  </div>

                  {/* Technologies - Minimal */}
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.slice(0, 3).map((tech, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-white/5 rounded text-xs text-white/50 border border-white/10"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 bg-white/5 rounded text-xs text-white/40 border border-white/10">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <FolderGit2 className="w-16 h-16 text-white/20 mx-auto mb-4" />
              <h3 className="text-xl font-light text-white/60 mb-2">No projects found</h3>
              <p className="text-white/40">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}


