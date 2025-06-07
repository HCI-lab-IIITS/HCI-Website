import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Award, Newspaper, Users, ChevronRight, Mail, Star } from 'lucide-react';
import newsData from '../data/news.json';

const News = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [email, setEmail] = useState('');
  const [newsItems, setNewsItems] = useState([]);

  useEffect(() => {
    // Load data from JSON file
    setNewsItems(newsData.news);
  }, []);

  const filters = [
    { id: 'all', label: 'All News', icon: Newspaper },
    { id: 'awards', label: 'Awards', icon: Award },
    { id: 'publications', label: 'Publications', icon: Star },
    { id: 'events', label: 'Events', icon: Users },
    { id: 'news', label: 'General News', icon: Newspaper },
  ];

  const filteredNews = newsItems.filter(item => 
    activeFilter === 'all' || item.category === activeFilter
  );

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Newsletter subscription:', email);
    setEmail('');
    alert('Thank you for subscribing to our newsletter!');
  };

  const NewsCard = ({ item, index }) => (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ y: -5 }}
      style={{
        background: item.featured ? 
          'linear-gradient(135deg, rgba(2, 132, 199, 0.05), rgba(192, 38, 211, 0.05))' : 
          'rgba(255, 255, 255, 0.8)',
        borderRadius: '1.5rem',
        padding: '0',
        border: item.featured ? 
          '2px solid rgba(2, 132, 199, 0.2)' : 
          '1px solid rgba(59, 130, 246, 0.1)',
        backdropFilter: 'blur(10px)',
        transition: 'all 0.3s ease',
        overflow: 'hidden',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative'
      }}
    >
      {/* Featured Badge */}
      {item.featured && (
        <div style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          background: 'linear-gradient(135deg, #0284c7, #c026d3)',
          color: 'white',
          padding: '0.5rem 1rem',
          borderRadius: '2rem',
          fontSize: '0.75rem',
          fontWeight: 600,
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          gap: '0.25rem'
        }}>
          <Star size={12} />
          Featured
        </div>
      )}

      {/* Image */}
      <div style={{
        height: '200px',
        background: 'linear-gradient(135deg, #0284c7, #c026d3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '3rem',
        fontWeight: 700,
        position: 'relative'
      }}>
        <Newspaper size={64} style={{ opacity: 0.3 }} />
      </div>

      {/* Content */}
      <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
        {/* Category and Date */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '1rem'
        }}>
          <span style={{
            background: 'rgba(2, 132, 199, 0.1)',
            color: '#0284c7',
            padding: '0.375rem 0.75rem',
            borderRadius: '1rem',
            fontSize: '0.75rem',
            fontWeight: 600,
            textTransform: 'capitalize'
          }}>
            {item.category}
          </span>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem',
            color: '#64748b',
            fontSize: '0.875rem'
          }}>
            <Calendar size={14} />
            <span>{new Date(item.date).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Title */}
        <h3 style={{
          fontSize: '1.25rem',
          fontWeight: 700,
          color: '#0f172a',
          marginBottom: '0.75rem',
          lineHeight: 1.3
        }}>
          {item.title}
        </h3>

        {/* Excerpt */}
        <p style={{
          color: '#64748b',
          fontSize: '0.875rem',
          lineHeight: 1.6,
          marginBottom: '1rem',
          flex: 1
        }}>
          {item.excerpt}
        </p>

        {/* Tags */}
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: '0.5rem',
          marginBottom: '1.5rem'
        }}>
          {item.tags.slice(0, 3).map((tag, i) => (
            <span
              key={i}
              style={{
                background: 'rgba(100, 116, 139, 0.1)',
                color: '#64748b',
                padding: '0.25rem 0.5rem',
                borderRadius: '0.75rem',
                fontSize: '0.75rem',
                fontWeight: 500
              }}
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: '1rem',
          borderTop: '1px solid rgba(59, 130, 246, 0.1)'
        }}>
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column',
            gap: '0.25rem'
          }}>
            <span style={{
              color: '#334155',
              fontSize: '0.875rem',
              fontWeight: 600
            }}>
              {item.author}
            </span>
            <span style={{
              color: '#64748b',
              fontSize: '0.75rem'
            }}>
              {item.readTime}
            </span>
          </div>

          <motion.button
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
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            <span>Read More</span>
            <ChevronRight size={16} />
          </motion.button>
        </div>
      </div>
    </motion.article>
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
            Latest News
          </h1>
          <p style={{
            fontSize: '1.25rem',
            color: '#64748b',
            maxWidth: '800px',
            margin: '0 auto',
            lineHeight: 1.6
          }}>
            Stay updated with the latest developments, achievements, and events from our research lab
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

      {/* Featured News (if any) */}
      {filteredNews.some(item => item.featured) && (
        <section style={{ padding: '0 2rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            color: '#0f172a',
            marginBottom: '1.5rem',
            textAlign: 'center'
          }}>
            Featured Stories
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
            gap: '2rem',
            marginBottom: '3rem'
          }}>
            {filteredNews.filter(item => item.featured).map((item, index) => (
              <NewsCard key={item.id} item={item} index={index} />
            ))}
          </div>
        </section>
      )}

      {/* News Grid */}
      <section style={{ padding: '0 2rem 4rem', maxWidth: '1200px', margin: '0 auto' }}>
        {filteredNews.some(item => !item.featured) && (
          <>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 700,
              color: '#0f172a',
              marginBottom: '1.5rem',
              textAlign: 'center'
            }}>
              {filteredNews.some(item => item.featured) ? 'More Stories' : 'All Stories'}
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: '2rem'
            }}>
              {filteredNews.filter(item => !item.featured).map((item, index) => (
                <NewsCard key={item.id} item={item} index={index + filteredNews.filter(i => i.featured).length} />
              ))}
            </div>
          </>
        )}

        {filteredNews.length === 0 && (
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
            <Newspaper size={48} style={{ color: '#64748b', margin: '0 auto 1rem' }} />
            <h3 style={{ color: '#64748b', fontSize: '1.25rem', marginBottom: '0.5rem' }}>
              No news found
            </h3>
            <p style={{ color: '#94a3b8' }}>
              Try selecting a different category
            </p>
          </motion.div>
        )}
      </section>

      {/* Newsletter Subscription */}
      <section style={{
        padding: '4rem 2rem',
        background: 'linear-gradient(135deg, #0284c7, #c026d3)',
        marginTop: '4rem'
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          textAlign: 'center',
          color: 'white'
        }}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Mail size={48} style={{ margin: '0 auto 1.5rem', opacity: 0.9 }} />
            <h2 style={{
              fontSize: '2.5rem',
              fontWeight: 700,
              marginBottom: '1rem',
              color: 'white'
            }}>
              Stay In The Loop
            </h2>
            <p style={{
              fontSize: '1.25rem',
              opacity: 0.9,
              marginBottom: '2rem',
              lineHeight: 1.6
            }}>
              Subscribe to our newsletter to receive the latest updates on our research, publications, and events
            </p>

            <form onSubmit={handleNewsletterSubmit} style={{
              display: 'flex',
              gap: '1rem',
              maxWidth: '500px',
              margin: '0 auto',
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                style={{
                  flex: '1',
                  minWidth: '250px',
                  padding: '1rem 1.5rem',
                  borderRadius: '2rem',
                  border: 'none',
                  fontSize: '1rem',
                  outline: 'none',
                  background: 'rgba(255, 255, 255, 0.9)',
                  color: '#0f172a'
                }}
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  background: 'white',
                  color: '#0284c7',
                  padding: '1rem 2rem',
                  borderRadius: '2rem',
                  border: 'none',
                  fontSize: '1rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s ease'
                }}
              >
                Subscribe
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default News; 