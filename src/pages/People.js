import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, GraduationCap, Award, Mail, Linkedin, Github, Globe, MapPin } from 'lucide-react';
import peopleData from '../data/people.json';

const People = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load data from JSON file
    const allPeople = [
      ...peopleData.faculty,
      ...peopleData.students,
      ...peopleData.alumni
    ];
    setPeople(allPeople);
    setLoading(false);
  }, []);

  const samplePeople = [
    {
      id: 1,
      name: 'Dr. Priya Sharma',
      role: 'Principal Investigator',
      category: 'faculty',
      image: '/api/placeholder/300/400',
      education: 'PhD in Computer Science, MIT',
      expertise: ['Brain-Computer Interfaces', 'Neural Signal Processing', 'Machine Learning'],
      achievements: ['NSF CAREER Award', 'IEEE Fellow', 'Best Paper Award CHI 2023'],
      bio: 'Dr. Sharma leads cutting-edge research in brain-computer interfaces with over 15 years of experience.',
      email: 'priya.sharma@iiitsricty.ac.in',
      linkedin: 'https://linkedin.com/in/priyasharma',
      website: 'https://priyasharma.research.com',
      location: 'Sri City, India'
    },
    {
      id: 2,
      name: 'Prof. Michael Chen',
      role: 'Co-Principal Investigator',
      category: 'faculty',
      image: '/api/placeholder/300/400',
      education: 'PhD in Cognitive Science, Stanford',
      expertise: ['Human Factors', 'Usability Engineering', 'Cognitive Modeling'],
      achievements: ['ACM Distinguished Scientist', 'Google Faculty Award', 'SIGCHI Lifetime Achievement'],
      bio: 'Prof. Chen specializes in understanding human cognition for better interface design.',
      email: 'michael.chen@iiitsricty.ac.in',
      linkedin: 'https://linkedin.com/in/michaelchen',
      github: 'https://github.com/mchen',
      location: 'Sri City, India'
    },
    {
      id: 3,
      name: 'Dr. Sarah Johnson',
      role: 'Associate Professor',
      category: 'faculty',
      image: '/api/placeholder/300/400',
      education: 'PhD in Electrical Engineering, Carnegie Mellon',
      expertise: ['Haptic Feedback', 'Virtual Reality', 'Sensory Substitution'],
      achievements: ['IEEE Early Career Award', 'Best Demo Award UIST 2022'],
      bio: 'Dr. Johnson explores haptic technologies for immersive virtual experiences.',
      email: 'sarah.johnson@iiitsricty.ac.in',
      website: 'https://sarahjohnson.lab.com',
      location: 'Sri City, India'
    },
    {
      id: 4,
      name: 'Alex Kumar',
      role: 'PhD Student',
      category: 'students',
      image: '/api/placeholder/300/400',
      education: 'MS in Computer Science, IIT Delhi',
      expertise: ['Deep Learning', 'Computer Vision', 'Gesture Recognition'],
      achievements: ['Google PhD Fellowship', 'Best Student Paper ICMI 2023'],
      bio: 'Alex is developing next-generation gesture recognition systems using deep learning.',
      email: 'alex.kumar@research.iiitsricty.ac.in',
      github: 'https://github.com/alexkumar',
      linkedin: 'https://linkedin.com/in/alexkumar'
    },
    {
      id: 5,
      name: 'Emma Rodriguez',
      role: 'PhD Student',
      category: 'students',
      image: '/api/placeholder/300/400',
      education: 'MS in Biomedical Engineering, Johns Hopkins',
      expertise: ['Neural Interfaces', 'Signal Processing', 'Rehabilitation Technology'],
      achievements: ['NIH Graduate Fellowship', 'Outstanding Presentation Award'],
      bio: 'Emma focuses on neural interfaces for rehabilitation and assistive technologies.',
      email: 'emma.rodriguez@research.iiitsricty.ac.in',
      linkedin: 'https://linkedin.com/in/emmarodriguez'
    },
    {
      id: 6,
      name: 'David Kim',
      role: 'Research Assistant',
      category: 'students',
      image: '/api/placeholder/300/400',
      education: 'BS in Computer Engineering, IIIT Sri City',
      expertise: ['Web Development', 'Data Analysis', 'User Studies'],
      achievements: ['Dean\'s List', 'Hackathon Winner 2023'],
      bio: 'David assists in user studies and develops tools for research data analysis.',
      email: 'david.kim@student.iiitsricty.ac.in',
      github: 'https://github.com/davidkim'
    },
    {
      id: 7,
      name: 'Dr. Jennifer Lee',
      role: 'Senior Research Scientist',
      category: 'alumni',
      image: '/api/placeholder/300/400',
      education: 'PhD in HCI, University of Washington',
      expertise: ['Eye Tracking', 'Attention Modeling', 'Educational Technology'],
      achievements: ['Microsoft Research Award', 'Best Paper CHI 2021'],
      bio: 'Now at Google Research, Jennifer continues her work in attention-aware interfaces.',
      currentPosition: 'Senior Researcher at Google',
      location: 'Mountain View, CA'
    },
    {
      id: 8,
      name: 'Robert Taylor',
      role: 'Former Postdoc',
      category: 'alumni',
      image: '/api/placeholder/300/400',
      education: 'PhD in Robotics, ETH Zurich',
      expertise: ['Human-Robot Interaction', 'Autonomous Systems', 'Safety'],
      achievements: ['Best Dissertation Award', 'IEEE RAS Award'],
      bio: 'Robert now leads HRI research at a major automotive company.',
      currentPosition: 'Principal Scientist at Tesla',
      location: 'Austin, TX'
    }
  ];

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