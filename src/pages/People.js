import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, GraduationCap, Award, Mail, Linkedin, Github, Globe, MapPin } from 'lucide-react';
import peopleData from '../data/people.json';

const People = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [people, setPeople] = useState([]);

  useEffect(() => {
    // Load data from JSON file
    const allPeople = [
      ...peopleData.faculty,
      ...peopleData.students,
      ...peopleData.alumni
    ];
    setPeople(allPeople);
  }, []);

  const filters = [
    { id: 'all', label: 'All Members', icon: Users },
    { id: 'faculty', label: 'Faculty', icon: GraduationCap },
    { id: 'students', label: 'Students', icon: Users },
    { id: 'alumni', label: 'Alumni', icon: Award },
  ];

  const filteredPeople = people.filter(person => {
    if (activeFilter === 'all') return true;
    
    // Determine category from original data structure
    if (activeFilter === 'faculty') {
      return peopleData.faculty.some(f => f.id === person.id);
    }
    if (activeFilter === 'students') {
      return peopleData.students.some(s => s.id === person.id);
    }
    if (activeFilter === 'alumni') {
      return peopleData.alumni.some(a => a.id === person.id);
    }
    
    return false;
  });

  const PersonCard = ({ person, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ y: -10 }}
      style={{
        background: 'rgba(255, 255, 255, 0.8)',
        borderRadius: '1.5rem',
        padding: '2rem',
        border: '1px solid rgba(59, 130, 246, 0.1)',
        backdropFilter: 'blur(10px)',
        transition: 'all 0.3s ease',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Profile Image */}
      <div style={{ 
        width: '120px', 
        height: '120px', 
        borderRadius: '50%', 
        background: 'linear-gradient(135deg, #0284c7, #c026d3)',
        margin: '0 auto 1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '2rem',
        fontWeight: 700,
        color: 'white'
      }}>
        {person.name.split(' ').map(n => n[0]).join('')}
      </div>

      {/* Name and Role */}
      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <h3 style={{
          fontSize: '1.25rem',
          fontWeight: 700,
          color: '#0f172a',
          marginBottom: '0.5rem'
        }}>
          {person.name}
        </h3>
        <p style={{
          color: '#0284c7',
          fontWeight: 600,
          fontSize: '0.875rem'
        }}>
          {person.role}
        </p>
        {person.currentPosition && (
          <p style={{
            color: '#64748b',
            fontSize: '0.875rem',
            marginTop: '0.25rem'
          }}>
            {person.currentPosition}
          </p>
        )}
      </div>

      {/* Education */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.5rem', 
          marginBottom: '0.5rem',
          color: '#334155'
        }}>
          <GraduationCap size={16} />
          <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>Education</span>
        </div>
        <p style={{ color: '#64748b', fontSize: '0.875rem', lineHeight: 1.4 }}>
          {person.education}
        </p>
      </div>

      {/* Expertise */}
      <div style={{ marginBottom: '1.5rem' }}>
        <p style={{ 
          fontSize: '0.875rem', 
          fontWeight: 600, 
          marginBottom: '0.5rem',
          color: '#334155'
        }}>
          Expertise
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {person.expertise?.slice(0, 3).map((skill, i) => (
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
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Achievements */}
      {person.achievements && person.achievements.length > 0 && (
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            marginBottom: '0.5rem' 
          }}>
            <Award size={16} style={{ color: '#d97706' }} />
            <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#334155' }}>
              Recent Achievement
            </span>
          </div>
          <p style={{ color: '#64748b', fontSize: '0.875rem' }}>
            {person.achievements[0]}
          </p>
        </div>
      )}

      {/* Bio */}
      <div style={{ marginBottom: '1.5rem', flex: 1 }}>
        <p style={{ color: '#64748b', fontSize: '0.875rem', lineHeight: 1.5 }}>
          {person.bio}
        </p>
      </div>

      {/* Location */}
      {person.location && (
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.5rem', 
          marginBottom: '1.5rem',
          color: '#64748b',
          fontSize: '0.875rem'
        }}>
          <MapPin size={14} />
          <span>{person.location}</span>
        </div>
      )}

      {/* Contact Links */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: '1rem',
        paddingTop: '1rem',
        borderTop: '1px solid rgba(59, 130, 246, 0.1)'
      }}>
        {person.email && (
          <motion.a
            href={`mailto:${person.email}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '2.5rem',
              height: '2.5rem',
              background: 'rgba(2, 132, 199, 0.1)',
              borderRadius: '50%',
              color: '#0284c7',
              transition: 'all 0.3s ease'
            }}
          >
            <Mail size={18} />
          </motion.a>
        )}
        {person.linkedin && (
          <motion.a
            href={person.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '2.5rem',
              height: '2.5rem',
              background: 'rgba(2, 132, 199, 0.1)',
              borderRadius: '50%',
              color: '#0284c7',
              transition: 'all 0.3s ease'
            }}
          >
            <Linkedin size={18} />
          </motion.a>
        )}
        {person.github && (
          <motion.a
            href={person.github}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '2.5rem',
              height: '2.5rem',
              background: 'rgba(15, 23, 42, 0.1)',
              borderRadius: '50%',
              color: '#334155',
              transition: 'all 0.3s ease'
            }}
          >
            <Github size={18} />
          </motion.a>
        )}
        {person.website && (
          <motion.a
            href={person.website}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '2.5rem',
              height: '2.5rem',
              background: 'rgba(192, 38, 211, 0.1)',
              borderRadius: '50%',
              color: '#c026d3',
              transition: 'all 0.3s ease'
            }}
          >
            <Globe size={18} />
          </motion.a>
        )}
      </div>
    </motion.div>
  );

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
            Our Team
          </h1>
          <p style={{
            fontSize: '1.25rem',
            color: '#64748b',
            maxWidth: '800px',
            margin: '0 auto',
            lineHeight: 1.6
          }}>
            Meet the brilliant minds driving innovation in human-computer interaction research
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

      {/* People Grid */}
      <section style={{ padding: '0 2rem 4rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem'
        }}>
          {filteredPeople.map((person, index) => (
            <PersonCard key={person.id} person={person} index={index} />
          ))}
        </div>

        {filteredPeople.length === 0 && (
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
            <Users size={48} style={{ color: '#64748b', margin: '0 auto 1rem' }} />
            <h3 style={{ color: '#64748b', fontSize: '1.25rem', marginBottom: '0.5rem' }}>
              No team members found
            </h3>
            <p style={{ color: '#94a3b8' }}>
              Try selecting a different category
            </p>
          </motion.div>
        )}
      </section>
    </main>
  );
};

export default People; 