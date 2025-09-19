import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Brain, Users, BookOpen, Lightbulb, ArrowRight, Cpu, Eye, Hand } from 'lucide-react';
import { Link } from 'react-router-dom';
import homeData from '../data/home.json';
import SplineScene from '../components/SplineScene';
import Spotlight from '../components/Spotlight';
import NeuralBackground from '../components/NeuralBackground';

const Home = () => {
  const [heroData, setHeroData] = useState({});
  const [stats, setStats] = useState([]);
  const [researchAreas, setResearchAreas] = useState([]);

  useEffect(() => {
    // Load data from JSON file
    setHeroData(homeData.hero);
    setStats(homeData.statistics);
    setResearchAreas(homeData.researchAreas);
  }, []);

  const floatingElements = [
    { icon: Brain, delay: 0, position: 'top-20 left-10' },
    { icon: Eye, delay: 0.5, position: 'top-40 right-20' },
    { icon: Hand, delay: 1, position: 'bottom-40 left-20' },
    { icon: Cpu, delay: 1.5, position: 'bottom-20 right-10' },
  ];

  const iconMap = {
    'Research Papers': BookOpen,
    'Team Members': Users,
    'Active Projects': Lightbulb,
    'Citations': Brain,
    'Neural Interfaces': Brain,
    'Gesture Recognition': Hand,
    'Eye Tracking': Eye,
    'Haptic Technology': Hand,
    'Accessibility': Users,
    'Mixed Reality': Cpu
  };

  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Floating Background Elements */}
      {floatingElements.map((element, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ delay: element.delay, duration: 1 }}
          style={{
            position: 'absolute',
            top: element.position.includes('top-20') ? '5rem' : 'auto',
            bottom: element.position.includes('bottom-20') ? '5rem' : element.position.includes('bottom-40') ? '10rem' : 'auto',
            left: element.position.includes('left-10') ? '2.5rem' : element.position.includes('left-20') ? '5rem' : 'auto',
            right: element.position.includes('right-10') ? '2.5rem' : element.position.includes('right-20') ? '5rem' : 'auto',
            display: window.innerWidth >= 1024 ? 'block' : 'none'
          }}
        >
          <motion.div
            animate={{ y: [-20, 20, -20] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <element.icon size={128} style={{ color: 'rgba(2, 132, 199, 0.3)' }} />
          </motion.div>
        </motion.div>
      ))}

      {/* Hero Section */}
      {/* <section style={{
        padding: '8rem 2rem 4rem',
        textAlign: 'center',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ maxWidth: '1000px', width: '100%' }}
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 700,
              marginBottom: '2rem',
              lineHeight: 1.2
            }}
          >
            <span style={{
              background: 'linear-gradient(135deg, #0284c7, #c026d3)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent'
            }}>
              {heroData.title?.split(' ').slice(0, -2).join(' ')}
            </span>
            <br />
            <span style={{ color: '#0f172a' }}>
              {heroData.title?.split(' ').slice(-2).join(' ')}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            style={{
              fontSize: '1.25rem',
              color: '#64748b',
              maxWidth: '800px',
              margin: '0 auto 3rem',
              lineHeight: 1.6
            }}
          >
            {heroData.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            style={{
              display: 'flex',
              gap: '1.5rem',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: 'linear-gradient(135deg, #0284c7, #c026d3)',
                color: 'white',
                padding: '1rem 2rem',
                borderRadius: '2rem',
                border: 'none',
                fontSize: '1.1rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                boxShadow: '0 10px 25px rgba(2, 132, 199, 0.3)',
                transition: 'all 0.3s ease'
              }}
            >
              <span>Explore Research</span>
              <ArrowRight size={20} />
            </motion.button>

            <Link to="/people" style={{ textDecoration: 'none' }}>
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  background: 'rgba(255, 255, 255, 0.8)',
                  color: '#0284c7',
                  padding: '1rem 2rem',
                  borderRadius: '2rem',
                  border: '2px solid #0284c7',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease'
                }}
              >
                Meet Our Team
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </section> */}

      {/* 3D Robot Section */}
      <section style={{ padding: '0 1rem', margin: '2rem auto', maxWidth: '1400px' }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          style={{
            width: '100%',
            height: '760px',
            background: 'transparent',
            borderRadius: '0',
            position: 'relative',
            overflow: 'visible',
            border: 'none'
          }}
        >
          
          <Spotlight />
          <div style={{ display: 'flex', height: '100%', flexDirection: window.innerWidth < 1024 ? 'column' : 'row' }}>
            {/* Left content */}
            <div style={{ flex: 1, padding: '2.25rem', position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h2 style={{
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                fontWeight: 800,
                background: 'linear-gradient(180deg, #ffffff, #e2e8f0)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent'
              }}>Human-Computer Interaction Lab</h2>
              <p style={{ marginTop: '1rem', color: '#ffffff', maxWidth: '720px', lineHeight: 1.75, fontSize: '1.1rem' }}>
                We explore how people interact with technology and build human-centered systems that are
                usable, accessible, and intelligent. Our work spans eye tracking, gesture recognition,
                haptics, accessibility, and mixed reality—bridging rigorous research with real-world impact.
              </p>
            </div>

            {/* Right content */}
            <div style={{ flex: 1, position: 'relative', transform: window.innerWidth < 1024 ? 'scale(1)' : 'scale(1.05)', transformOrigin: 'center', height: window.innerWidth < 1024 ? '360px' : 'auto' }}>
              <SplineScene
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                style={{ width: '100%', height: '100%' }}
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section style={{
        padding: '4rem 2rem',
        background: 'transparent',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '2rem',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {stats.map((stat, index) => {
          const IconComponent = iconMap[stat.label] || Brain;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              style={{
                background: 'rgba(17, 24, 39, 0.6)',
                borderRadius: '1.5rem',
                padding: '2rem',
                textAlign: 'center',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(12px)',
                transition: 'all 0.3s ease'
              }}
              whileHover={{ y: -10 }}
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
                <IconComponent size={32} color="white" />
              </motion.div>
              <div style={{
                fontSize: '2.5rem',
                fontWeight: 700,
                background: 'linear-gradient(135deg, #0284c7, #c026d3)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                marginBottom: '0.5rem'
              }}>
                {stat.number}{stat.suffix}
              </div>
              <div style={{
                color: '#cbd5e1',
                fontSize: '1rem',
                fontWeight: 500
              }}>
                {stat.label}
              </div>
            </motion.div>
          );
        })}
      </section>

      {/* Research Areas */}
      <section style={{
        padding: '4rem 2rem',
        background: 'transparent'
      }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{ 
            textAlign: 'center', 
            marginBottom: '4rem',
            maxWidth: '1200px',
            margin: '0 auto 4rem'
          }}
        >
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: 700,
            marginBottom: '1.5rem',
            background: 'linear-gradient(135deg, #0284c7, #c026d3)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent'
          }}>
            Research Areas
          </h2>
          <p style={{
            fontSize: '1.25rem',
            color: '#64748b',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: 1.6
          }}>
            Our interdisciplinary research spans multiple domains of human-computer interaction
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {researchAreas.map((area, index) => {
            const IconComponent = iconMap[area.title] || Brain;
            return (
              <motion.div
                key={area.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                style={{
                  background: 'rgba(17, 24, 39, 0.6)',
                  borderRadius: '1.5rem',
                  padding: '2rem',
                  textAlign: 'center',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(12px)',
                  transition: 'all 0.3s ease',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
              >
                <div style={{
                  width: '80px',
                  height: '80px',
                  background: 'linear-gradient(135deg, #0284c7, #c026d3)',
                  borderRadius: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.5rem',
                  boxShadow: '0 10px 25px rgba(59, 130, 246, 0.3)'
                }}>
                  <IconComponent size={40} color="white" />
                </div>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: '#e5e7eb',
                  marginBottom: '1rem'
                }}>
                  {area.title}
                </h3>
                <p style={{
                  color: '#cbd5e1',
                  lineHeight: 1.6,
                  fontSize: '1rem'
                }}>
                  {area.description}
                </p>
              </motion.div>
            );
          })}
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