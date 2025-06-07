import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Calendar, Users, Award, ExternalLink, BookOpen, Star } from 'lucide-react';
import publicationsData from '../data/publications.json';

const Publications = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [publications, setPublications] = useState([]);
  const [years, setYears] = useState(['all']);
  const [types, setTypes] = useState(['all']);

  useEffect(() => {
    // Load data from JSON file
    setPublications(publicationsData.publications);
    setYears(publicationsData.years);
    setTypes(publicationsData.types);
  }, []);

  const filteredPublications = publications.filter(pub => {
    const matchesSearch = pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pub.authors.some(author => author.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesYear = selectedYear === 'all' || pub.year.toString() === selectedYear;
    const matchesType = selectedType === 'all' || pub.type === selectedType;
    
    return matchesSearch && matchesYear && matchesType;
  });

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
            Publications
          </h1>
          <p style={{
            fontSize: '1.25rem',
            color: '#64748b',
            maxWidth: '800px',
            margin: '0 auto',
            lineHeight: 1.6
          }}>
            Discover our latest research contributions and scientific publications in the field of Human-Computer Interaction
          </p>
        </motion.div>
      </section>

      {/* Filters Section */}
      <section style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          style={{
            background: 'rgba(255, 255, 255, 0.8)',
            borderRadius: '1rem',
            padding: '2rem',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(59, 130, 246, 0.1)',
            marginBottom: '2rem'
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            {/* Search */}
            <div style={{ position: 'relative' }}>
              <Search size={20} style={{
                position: 'absolute',
                left: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#64748b'
              }} />
              <input
                type="text"
                placeholder="Search publications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 0.75rem 0.75rem 3rem',
                  border: '2px solid rgba(59, 130, 246, 0.1)',
                  borderRadius: '0.75rem',
                  background: 'rgba(255, 255, 255, 0.9)',
                  fontSize: '1rem',
                  transition: 'all 0.3s ease',
                  outline: 'none'
                }}
                onFocus={(e) => e.target.style.borderColor = '#0284c7'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(59, 130, 246, 0.1)'}
              />
            </div>

            {/* Year Filter */}
            <div style={{ position: 'relative' }}>
              <Calendar size={20} style={{
                position: 'absolute',
                left: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#64748b'
              }} />
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 0.75rem 0.75rem 3rem',
                  border: '2px solid rgba(59, 130, 246, 0.1)',
                  borderRadius: '0.75rem',
                  background: 'rgba(255, 255, 255, 0.9)',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  outline: 'none'
                }}
              >
                {years.map(year => (
                  <option key={year} value={year}>
                    {year === 'all' ? 'All Years' : year}
                  </option>
                ))}
              </select>
            </div>

            {/* Type Filter */}
            <div style={{ position: 'relative' }}>
              <Filter size={20} style={{
                position: 'absolute',
                left: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#64748b'
              }} />
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 0.75rem 0.75rem 3rem',
                  border: '2px solid rgba(59, 130, 246, 0.1)',
                  borderRadius: '0.75rem',
                  background: 'rgba(255, 255, 255, 0.9)',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  outline: 'none'
                }}
              >
                {types.map(type => (
                  <option key={type} value={type}>
                    {type === 'all' ? 'All Types' : type}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Publications List */}
      <section style={{ padding: '0 2rem 4rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {filteredPublications.map((publication, index) => (
            <motion.article
              key={publication.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -5 }}
              style={{
                background: publication.featured ? 
                  'linear-gradient(135deg, rgba(2, 132, 199, 0.05), rgba(192, 38, 211, 0.05))' : 
                  'rgba(255, 255, 255, 0.8)',
                borderRadius: '1.5rem',
                padding: '2rem',
                border: publication.featured ? 
                  '2px solid rgba(2, 132, 199, 0.2)' : 
                  '1px solid rgba(59, 130, 246, 0.1)',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {publication.featured && (
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  background: 'linear-gradient(135deg, #0284c7, #c026d3)',
                  color: 'white',
                  padding: '0.5rem 1rem',
                  borderRadius: '2rem',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <Star size={16} />
                  Featured
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <h2 style={{
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    color: '#0f172a',
                    marginBottom: '0.75rem',
                    lineHeight: 1.3
                  }}>
                    {publication.title}
                  </h2>

                  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b' }}>
                      <Users size={16} />
                      <span style={{ fontSize: '0.875rem' }}>
                        {publication.authors.join(', ')}
                      </span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
                    <span style={{
                      background: 'rgba(2, 132, 199, 0.1)',
                      color: '#0284c7',
                      padding: '0.375rem 0.75rem',
                      borderRadius: '1rem',
                      fontSize: '0.875rem',
                      fontWeight: 500
                    }}>
                      {publication.journal}
                    </span>
                    <span style={{
                      background: 'rgba(64, 748, 107, 0.1)',
                      color: '#059669',
                      padding: '0.375rem 0.75rem',
                      borderRadius: '1rem',
                      fontSize: '0.875rem',
                      fontWeight: 500
                    }}>
                      {publication.year}
                    </span>
                    <span style={{
                      background: 'rgba(192, 38, 211, 0.1)',
                      color: '#c026d3',
                      padding: '0.375rem 0.75rem',
                      borderRadius: '1rem',
                      fontSize: '0.875rem',
                      fontWeight: 500
                    }}>
                      {publication.type}
                    </span>
                    <span style={{
                      background: 'rgba(245, 158, 11, 0.1)',
                      color: '#d97706',
                      padding: '0.375rem 0.75rem',
                      borderRadius: '1rem',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem'
                    }}>
                      <BookOpen size={14} />
                      {publication.citations} citations
                    </span>
                  </div>

                  {publication.award && (
                    <div style={{
                      background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(239, 68, 68, 0.1))',
                      border: '1px solid rgba(245, 158, 11, 0.3)',
                      borderRadius: '0.75rem',
                      padding: '0.75rem',
                      marginBottom: '1rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      <Award size={18} style={{ color: '#d97706' }} />
                      <span style={{ color: '#d97706', fontWeight: 600, fontSize: '0.875rem' }}>
                        {publication.award}
                      </span>
                    </div>
                  )}

                  <p style={{
                    color: '#64748b',
                    lineHeight: 1.6,
                    marginBottom: '1.5rem'
                  }}>
                    {publication.abstract}
                  </p>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <code style={{
                      background: 'rgba(15, 23, 42, 0.1)',
                      padding: '0.375rem 0.75rem',
                      borderRadius: '0.5rem',
                      fontSize: '0.75rem',
                      color: '#334155',
                      fontFamily: 'JetBrains Mono, monospace'
                    }}>
                      DOI: {publication.doi}
                    </code>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      style={{
                        background: 'linear-gradient(135deg, #0284c7, #c026d3)',
                        color: 'white',
                        border: 'none',
                        padding: '0.75rem 1.5rem',
                        borderRadius: '0.75rem',
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <span>View Paper</span>
                      <ExternalLink size={16} />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {filteredPublications.length === 0 && (
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
            <BookOpen size={48} style={{ color: '#64748b', margin: '0 auto 1rem' }} />
            <h3 style={{ color: '#64748b', fontSize: '1.25rem', marginBottom: '0.5rem' }}>
              No publications found
            </h3>
            <p style={{ color: '#94a3b8' }}>
              Try adjusting your search criteria or filters
            </p>
          </motion.div>
        )}
      </section>
    </main>
  );
};

export default Publications; 