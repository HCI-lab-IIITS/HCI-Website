import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Zap, CheckCircle, Clock, PlayCircle, Github, ExternalLink, Users, Calendar } from 'lucide-react';
import projectsData from '../data/projects.json';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Load data from JSON file
    setProjects(projectsData.projects);
  }, []);

  const filters = [
    { id: 'all', label: 'All Projects', icon: Cpu },
    { id: 'active', label: 'Active', icon: Zap },
    { id: 'completed', label: 'Completed', icon: CheckCircle },
    { id: 'planning', label: 'Planning', icon: Clock },
  ];

  const filteredProjects = projects.filter(project =>
    activeFilter === 'all' || project.status === activeFilter
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return '#059669';
      case 'completed': return '#0284c7';
      case 'planning': return '#d97706';
      default: return '#64748b';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return Zap;
      case 'completed': return CheckCircle;
      case 'planning': return Clock;
      default: return Cpu;
    }
  };

  const ProjectCard = ({ project, index }) => {
    const [showAllMembers, setShowAllMembers] = useState(false); 
    const StatusIcon = getStatusIcon(project.status);

    const visibleTeam = showAllMembers ? project.team : project.team.slice(0, 3);

    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1, duration: 0.6 }}
        whileHover={{ y: -10 }}
        style={{
          background: project.featured ?
            'linear-gradient(135deg, rgba(2, 132, 199, 0.05), rgba(192, 38, 211, 0.05))' :
            'rgba(255, 255, 255, 0.8)',
          borderRadius: '1.5rem',
          padding: '2rem',
          border: project.featured ?
            '2px solid rgba(2, 132, 199, 0.2)' :
            '1px solid rgba(59, 130, 246, 0.1)',
          backdropFilter: 'blur(10px)',
          transition: 'all 0.3s ease',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative'
        }}
      >
        {/* Featured Badge */}
        {project.featured && (
          <div style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'linear-gradient(135deg, #0284c7, #c026d3)',
            color: 'white',
            padding: '0.5rem 1rem',
            borderRadius: '2rem',
            fontSize: '0.75rem',
            fontWeight: 600
          }}>
            Featured
          </div>
        )}

        {/* Header */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1rem'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: `rgba(${getStatusColor(project.status).slice(1).match(/.{2}/g).map(hex => parseInt(hex, 16)).join(', ')}, 0.1)`,
              color: getStatusColor(project.status),
              padding: '0.5rem 1rem',
              borderRadius: '2rem',
              fontSize: '0.875rem',
              fontWeight: 600
            }}>
              <StatusIcon size={16} />
              <span style={{ textTransform: 'capitalize' }}>{project.status}</span>
            </div>
          </div>

          <h3 style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            color: '#0f172a',
            marginBottom: '0.75rem',
            lineHeight: 1.3
          }}>
            {project.title}
          </h3>

          <p style={{
            color: '#64748b',
            fontSize: '0.875rem',
            lineHeight: 1.5,
            marginBottom: '1rem'
          }}>
            {project.description}
          </p>
        </div>

        {/* Progress Bar */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '0.5rem'
          }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#334155' }}>
              Progress
            </span>
            <span style={{ fontSize: '0.875rem', fontWeight: 600, color: getStatusColor(project.status) }}>
              {project.progress}%
            </span>
          </div>
          <div style={{
            width: '100%',
            height: '8px',
            background: 'rgba(59, 130, 246, 0.1)',
            borderRadius: '4px',
            overflow: 'hidden'
          }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${project.progress}%` }}
              transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
              style={{
                height: '100%',
                background: `linear-gradient(90deg, ${getStatusColor(project.status)}, ${getStatusColor(project.status)}dd)`,
                borderRadius: '4px'
              }}
            />
          </div>
        </div>

        {/* Team */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '0.5rem'
          }}>
            <Users size={16} style={{ color: '#64748b' }} />
            <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#334155' }}>
              Team
            </span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {visibleTeam.map((member, i) => (
              <span
                key={i}
                style={{
                  background: 'rgba(2, 132, 199, 0.1)',
                  color: '#0284c7',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '1rem',
                  fontSize: '0.75rem',
                  fontWeight: 500
                }}
              >
                {member}
              </span>
            ))}
            {project.team.length > 3 && !showAllMembers && (
              <span
                onClick={() => setShowAllMembers(true)}
                style={{
                  background: 'rgba(100, 116, 139, 0.1)',
                  color: '#64748b',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '1rem',
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  cursor: 'pointer'
                }}
              >
                +{project.team.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Technologies */}
        <div style={{ marginBottom: '1.5rem' }}>
          <p style={{
            fontSize: '0.875rem',
            fontWeight: 600,
            marginBottom: '0.5rem',
            color: '#334155'
          }}>
            Technologies
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {project.technologies.slice(0, 4).map((tech, i) => (
              <span
                key={i}
                style={{
                  background: 'rgba(192, 38, 211, 0.1)',
                  color: '#c026d3',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '1rem',
                  fontSize: '0.75rem',
                  fontWeight: 500
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Funding */}
        <div style={{ marginBottom: '1.5rem' }}>
          <p style={{
            fontSize: '0.875rem',
            fontWeight: 600,
            marginBottom: '0.25rem',
            color: '#334155'
          }}>
            Funding
          </p>
          <p style={{ color: '#64748b', fontSize: '0.875rem' }}>
            {project.funding}
          </p>
        </div>

        {/* Timeline */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '0.5rem'
          }}>
            <Calendar size={16} style={{ color: '#64748b' }} />
            <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#334155' }}>
              Timeline
            </span>
          </div>
          <p style={{ color: '#64748b', fontSize: '0.875rem' }}>
            {new Date(project.startDate).toLocaleDateString()} - {new Date(project.expectedCompletion).toLocaleDateString()}
          </p>
        </div>

        {/* Publications */}
        {project.publications && (
          <div style={{ marginBottom: '1.5rem' }}>
            <p style={{
              fontSize: '0.875rem',
              fontWeight: 600,
              marginBottom: '0.5rem',
              color: '#334155'
            }}>
              Publications
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              {project.publications.slice(0, 2).map((pub, i) => (
                <span
                  key={i}
                  style={{
                    color: '#d97706',
                    fontSize: '0.75rem',
                    fontWeight: 500
                  }}
                >
                  • {pub}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div style={{
          marginTop: 'auto',
          paddingTop: '1rem',
          borderTop: '1px solid rgba(59, 130, 246, 0.1)',
          display: 'flex',
          gap: '0.75rem',
          flexWrap: 'wrap'
        }}>
          {project.github && (
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'rgba(15, 23, 42, 0.1)',
                color: '#334155',
                padding: '0.5rem 1rem',
                borderRadius: '0.75rem',
                fontSize: '0.875rem',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'all 0.3s ease'
              }}
            >
              <Github size={16} />
              <span>Code</span>
            </motion.a>
          )}
          {project.demo && (
            <motion.a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'linear-gradient(135deg, #0284c7, #c026d3)',
                color: 'white',
                padding: '0.5rem 1rem',
                borderRadius: '0.75rem',
                fontSize: '0.875rem',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'all 0.3s ease'
              }}
            >
              <PlayCircle size={16} />
              <span>Demo</span>
            </motion.a>
          )}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'rgba(2, 132, 199, 0.1)',
              color: '#0284c7',
              padding: '0.5rem 1rem',
              borderRadius: '0.75rem',
              fontSize: '0.875rem',
              fontWeight: 600,
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            <ExternalLink size={16} />
            <span>Details</span>
          </motion.button>
        </div>
      </motion.div>
    );
  };

  return (
    <main style={{ paddingTop: '5rem', minHeight: '100vh', background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)' }}>
      {/* Header Section */}
      <section style={{ padding: '4rem 2rem 2rem', textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 style={{
            fontSize: '3rem',
            fontWeight: 700,
            marginBottom: '1.5rem',
            background: 'linear-gradient(135deg, #0284c7, #c026d3)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent'
          }}>
            Research Projects
          </h1>
          <p style={{
            fontSize: '1.25rem',
            color: '#64748b',
            maxWidth: '800px',
            margin: '0 auto',
            lineHeight: 1.6
          }}>
            Explore our ongoing and completed research projects advancing the field of human-computer interaction
          </p>
        </motion.div>
      </section>

      {/* Filter Tabs */}
      <section style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
            marginBottom: '3rem',
            flexWrap: 'wrap'
          }}
        >
          {filters.map((filter) => (
            <motion.button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.5rem',
                borderRadius: '2rem',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '0.875rem',
                transition: 'all 0.3s ease',
                background: activeFilter === filter.id
                  ? 'linear-gradient(135deg, #0284c7, #c026d3)'
                  : 'rgba(255, 255, 255, 0.8)',
                color: activeFilter === filter.id ? 'white' : '#64748b',
                backdropFilter: 'blur(10px)',
                boxShadow: activeFilter === filter.id
                  ? '0 10px 25px rgba(59, 130, 246, 0.3)'
                  : '0 2px 10px rgba(0, 0, 0, 0.1)'
              }}
            >
              <filter.icon size={18} />
              <span>{filter.label}</span>
            </motion.button>
          ))}
        </motion.div>
      </section>

      {/* Projects Grid */}
      <section style={{ padding: '0 2rem 4rem', maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '2rem'
        }}>
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              textAlign: 'center',
              padding: '4rem 2rem',
              background: 'rgba(255, 255, 255, 0.8)',
              borderRadius: '1rem',
              border: '1px solid rgba(59, 130, 246, 0.1)'
            }}
          >
            <Cpu size={48} style={{ color: '#64748b', margin: '0 auto 1rem' }} />
            <h3 style={{ color: '#64748b', fontSize: '1.25rem', fontWeight: 600 }}>
              No projects found for this category
            </h3>
          </motion.div>
        )}
      </section>
    </main>
  );
};

export default Projects;
