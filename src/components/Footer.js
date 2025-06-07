import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Mail, Phone, MapPin, ExternalLink, Twitter, Linkedin, Github } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Publications', path: '/publications' },
    { name: 'People', path: '/people' },
    { name: 'Projects', path: '/projects' },
    { name: 'News', path: '/news' }
  ];

  const researchAreas = [
    'Neural Interfaces',
    'Gesture Recognition',
    'Eye Tracking',
    'Haptic Technology',
    'Accessibility',
    'Mixed Reality'
  ];

  const contactInfo = [
    {
      icon: MapPin,
      text: 'IIIT Sri City, Chittoor District, Andhra Pradesh, India'
    },
    {
      icon: Mail,
      text: 'hci-lab@iiits.in'
    },
    {
      icon: Phone,
      text: '+91 8772 222 111'
    }
  ];

  const socialLinks = [
    { icon: Twitter, url: 'https://twitter.com/hci_iiits', label: 'Twitter' },
    { icon: Linkedin, url: 'https://linkedin.com/company/hci-lab-iiits', label: 'LinkedIn' },
    { icon: Github, url: 'https://github.com/hci-lab-iiits', label: 'GitHub' }
  ];

  return (
    <footer style={{
      background: '#0f172a',
      color: 'white',
      position: 'relative',
      overflow: 'hidden',
      marginTop: '4rem'
    }}>
      {/* Background Pattern */}
      <div style={{
        position: 'absolute',
        inset: 0,
        opacity: 0.05
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gap: '1rem',
          height: '100%'
        }}>
          {Array.from({ length: 60 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.3, 0] }}
              transition={{
                duration: 3,
                delay: i * 0.1,
                repeat: Infinity,
                repeatDelay: 5
              }}
              style={{
                background: '#0284c7',
                borderRadius: '50%',
                width: '8px',
                height: '8px'
              }}
            />
          ))}
        </div>
      </div>

      <div style={{
        position: 'relative',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '4rem 2rem'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem'
        }}>
          {/* Lab Info */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              style={{ marginBottom: '2rem' }}
            >
              <Link to="/" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '1.5rem',
                textDecoration: 'none',
                color: 'inherit'
              }}>
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  style={{ position: 'relative' }}
                >
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(135deg, #0284c7, #c026d3)',
                    borderRadius: '50%',
                    opacity: 0.2,
                    animation: 'pulse 2s infinite'
                  }}></div>
                  <Brain size={40} style={{ color: '#0284c7', position: 'relative', zIndex: 10 }} />
                </motion.div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    background: 'linear-gradient(135deg, #0284c7, #c026d3)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: 'transparent'
                  }}>
                    HCI Lab
                  </span>
                  <span style={{
                    fontSize: '0.875rem',
                    color: '#94a3b8'
                  }}>
                    IIIT Sri City
                  </span>
                </div>
              </Link>
              
              <p style={{
                color: '#cbd5e1',
                lineHeight: 1.6,
                marginBottom: '1.5rem'
              }}>
                Pioneering research in human-computer interaction, developing innovative technologies 
                that enhance the way humans interact with digital systems.
              </p>

              {/* Social Links */}
              <div style={{ display: 'flex', gap: '1rem' }}>
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    style={{
                      padding: '0.75rem',
                      background: '#1e293b',
                      borderRadius: '0.75rem',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = '#0284c7';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = '#1e293b';
                    }}
                  >
                    <social.icon size={20} style={{ color: '#94a3b8' }} />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Quick Links */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 style={{
                fontSize: '1.125rem',
                fontWeight: 600,
                marginBottom: '1.5rem',
                background: 'linear-gradient(135deg, #0284c7, #c026d3)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent'
              }}>
                Quick Links
              </h3>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem'
              }}>
                {quickLinks.map((link, index) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                    viewport={{ once: true }}
                  >
                    <Link
                      to={link.path}
                      style={{
                        color: '#cbd5e1',
                        textDecoration: 'none',
                        transition: 'color 0.3s ease',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.color = '#0284c7';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.color = '#cbd5e1';
                      }}
                    >
                      <span style={{
                        width: '4px',
                        height: '4px',
                        background: '#0284c7',
                        borderRadius: '50%',
                        opacity: 0,
                        transition: 'opacity 0.3s ease'
                      }}></span>
                      <span>{link.name}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Research Areas */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 style={{
                fontSize: '1.125rem',
                fontWeight: 600,
                marginBottom: '1.5rem',
                background: 'linear-gradient(135deg, #0284c7, #c026d3)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent'
              }}>
                Research Areas
              </h3>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem'
              }}>
                {researchAreas.map((area, index) => (
                  <motion.li
                    key={area}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                    viewport={{ once: true }}
                    style={{
                      color: '#cbd5e1',
                      fontSize: '0.875rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    <div style={{
                      width: '4px',
                      height: '4px',
                      background: '#c026d3',
                      borderRadius: '50%'
                    }}></div>
                    <span>{area}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Contact Info */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 style={{
                fontSize: '1.125rem',
                fontWeight: 600,
                marginBottom: '1.5rem',
                background: 'linear-gradient(135deg, #0284c7, #c026d3)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent'
              }}>
                Contact Us
              </h3>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
              }}>
                {contactInfo.map((contact, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                    viewport={{ once: true }}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.75rem'
                    }}
                  >
                    <div style={{
                      padding: '0.5rem',
                      background: '#1e293b',
                      borderRadius: '0.5rem'
                    }}>
                      <contact.icon size={16} style={{ color: '#0284c7' }} />
                    </div>
                    <span style={{
                      color: '#cbd5e1',
                      fontSize: '0.875rem',
                      lineHeight: 1.6
                    }}>
                      {contact.text}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Visit Button */}
              <motion.a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginTop: '1.5rem',
                  padding: '0.75rem 1rem',
                  background: 'linear-gradient(135deg, #0284c7, #c026d3)',
                  borderRadius: '0.75rem',
                  textDecoration: 'none',
                  color: 'white',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  transition: 'all 0.3s ease',
                  hover: {
                    shadow: '0 0 20px rgba(2, 132, 199, 0.5)'
                  },
                  tap: {
                    scale: 0.95
                  }
                }}
              >
                <span>Visit Us</span>
                <ExternalLink size={16} />
              </motion.a>
            </motion.div>
          </div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
          style={{
            borderTop: '1px solid #334155',
            marginTop: '3rem',
            paddingTop: '2rem',
            textAlign: 'center'
          }}
        >
          <p style={{
            color: '#64748b',
            fontSize: '0.875rem'
          }}>
            © 2024 HCI Lab, IIIT Sri City. All rights reserved. 
            <span style={{ margin: '0 0.5rem' }}>|</span>
            <button 
              style={{
                background: 'none',
                border: 'none',
                color: '#0284c7',
                cursor: 'pointer',
                fontSize: 'inherit'
              }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              Back to Top
            </button>
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer; 