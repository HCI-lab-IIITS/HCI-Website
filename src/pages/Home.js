import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Users, BookOpen, Lightbulb, ArrowRight, Cpu, Eye, Hand } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const floatingElements = [
    { icon: Brain, delay: 0, position: 'top-20 left-10' },
    { icon: Eye, delay: 0.5, position: 'top-40 right-20' },
    { icon: Hand, delay: 1, position: 'bottom-40 left-20' },
    { icon: Cpu, delay: 1.5, position: 'bottom-20 right-10' },
  ];

  const stats = [
    { number: '50+', label: 'Research Papers', icon: BookOpen },
    { number: '25+', label: 'Team Members', icon: Users },
    { number: '15+', label: 'Active Projects', icon: Lightbulb },
    { number: '100+', label: 'Citations', icon: Brain },
  ];

  const researchAreas = [
    {
      title: 'Neural Interfaces',
      description: 'Brain-computer interfaces and neural signal processing',
      icon: Brain,
    },
    {
      title: 'Gesture Recognition',
      description: 'Hand tracking and gesture-based interaction systems',
      icon: Hand,
    },
    {
      title: 'Eye Tracking',
      description: 'Gaze-based interfaces and attention modeling',
      icon: Eye,
    },
    {
      title: 'AI-Human Collaboration',
      description: 'Intelligent systems that augment human capabilities',
      icon: Cpu,
    },
  ];

  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Floating Background Elements */}
      {floatingElements.map((element, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ delay: element.delay, duration: 1 }}
          className={`absolute ${element.position} hidden lg:block`}
        >
          <motion.div
            animate={{ y: [-20, 20, -20] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <element.icon className="h-32 w-32 text-primary-300" />
          </motion.div>
        </motion.div>
      ))}

      {/* Hero Section */}
      <section className="hero">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="animate-fade-in"
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <span className="gradient-text">Human-Computer</span>
            <br />
            <span>Interaction Lab</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Pioneering the future of human-computer interaction through 
            <span className="gradient-text" style={{ fontWeight: 600 }}> innovative research</span>, 
            cutting-edge technology, and 
            <span className="gradient-text" style={{ fontWeight: 600 }}> collaborative innovation</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="hero-buttons"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary"
            >
              <span>Explore Research</span>
              <ArrowRight size={20} />
            </motion.button>

            <Link to="/people">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary"
              >
                Meet Our Team
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="stats animate-fade-in animate-delay-1">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            className="stat-card"
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '4rem',
                height: '4rem',
                background: 'linear-gradient(135deg, #0284c7, #c026d3)',
                borderRadius: '1rem',
                marginBottom: '1rem',
                boxShadow: '0 10px 25px rgba(59, 130, 246, 0.3)',
                transition: 'all 0.3s ease'
              }}
            >
              <stat.icon size={32} color="white" />
            </motion.div>
            <div className="stat-number">{stat.number}</div>
            <div className="stat-label">{stat.label}</div>
          </motion.div>
        ))}
      </section>

      {/* Research Areas */}
      <section className="research-areas">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <h2>Research Areas</h2>
          <p>
            Our interdisciplinary research spans multiple domains of human-computer interaction
          </p>
        </motion.div>

        <div className="research-grid">
          {researchAreas.map((area, index) => (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="research-card"
            >
              <div className="research-icon">
                <area.icon size={28} color="white" />
              </div>
              <h3>{area.title}</h3>
              <p>{area.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section 
        style={{
          padding: '5rem 2rem',
          background: 'linear-gradient(135deg, #0284c7, #c026d3)',
          marginTop: '4rem'
        }}
      >
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
            <h2 style={{ 
              fontSize: '2.5rem', 
              fontWeight: 700, 
              marginBottom: '1.5rem',
              color: 'white'
            }}>
              Join Our Research Community
            </h2>
            <p style={{ 
              fontSize: '1.25rem', 
              opacity: 0.9, 
              marginBottom: '2rem',
              lineHeight: 1.6
            }}>
              Collaborate with us to shape the future of human-computer interaction
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: 'white',
                color: '#0284c7',
                padding: '1rem 2rem',
                borderRadius: '2rem',
                fontSize: '1.1rem',
                fontWeight: 600,
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              Get In Touch
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home; 