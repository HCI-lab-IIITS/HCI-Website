import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Brain, Menu, X, Zap } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/publications', label: 'Publications' },
    { path: '/people', label: 'People' },
    { path: '/projects', label: 'Projects' },
    { path: '/news', label: 'News' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      style={{
        background: scrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(59, 130, 246, 0.1)',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: '1rem 2rem',
        transition: 'all 0.3s ease'
      }}
    >
      <div className="nav-container">
        {/* Logo */}
        <Link to="/" className="logo">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
            style={{
              position: 'relative',
              width: '2.5rem',
              height: '2.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(135deg, #0284c7, #c026d3)',
              borderRadius: '50%',
              opacity: 0.2,
              animation: 'pulse 2s infinite'
            }}></div>
            <Brain size={24} style={{ color: '#0284c7', position: 'relative', zIndex: 10 }} />
          </motion.div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span className="logo-text">HCI Lab</span>
            <span className="logo-subtitle">IIIT Sri City</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="nav-links" style={{ display: window.innerWidth >= 768 ? 'flex' : 'none' }}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              style={{
                textDecoration: 'none',
                color: location.pathname === item.path ? '#0284c7' : '#334155',
                fontWeight: 500,
                padding: '0.5rem 1rem',
                borderRadius: '0.5rem',
                transition: 'all 0.3s ease',
                position: 'relative'
              }}
            >
              <motion.span
                whileHover={{ y: -2 }}
              >
                {item.label}
              </motion.span>
              {location.pathname === item.path && (
                <motion.div
                  layoutId="activeTab"
                  style={{
                    position: 'absolute',
                    bottom: '-2px',
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: 'linear-gradient(135deg, #0284c7, #c026d3)',
                    borderRadius: '1px'
                  }}
                />
              )}
            </Link>
          ))}
        </div>

        {/* Contact Button */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{ display: window.innerWidth >= 768 ? 'block' : 'none' }}
        >
          <button className="contact-btn">
            <Zap size={16} />
            <span>Contact</span>
          </button>
        </motion.div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            display: window.innerWidth < 768 ? 'block' : 'none',
            background: 'rgba(255, 255, 255, 0.8)',
            border: '1px solid rgba(59, 130, 246, 0.2)',
            borderRadius: '0.5rem',
            padding: '0.5rem',
            cursor: 'pointer'
          }}
        >
          <motion.div
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.div>
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          style={{
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '0.5rem',
            marginTop: '1rem',
            padding: '1rem',
            backdropFilter: 'blur(10px)'
          }}
        >
          {navItems.map((item, index) => (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={item.path}
                onClick={() => setIsOpen(false)}
                style={{
                  display: 'block',
                  padding: '0.75rem 1rem',
                  textDecoration: 'none',
                  color: location.pathname === item.path ? '#0284c7' : '#334155',
                  fontWeight: 500,
                  borderRadius: '0.5rem',
                  transition: 'all 0.3s ease',
                  marginBottom: '0.5rem'
                }}
              >
                {item.label}
              </Link>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar; 