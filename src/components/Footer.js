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
    <footer className="bg-neural-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-12 gap-4 h-full">
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
              className="bg-primary-400 rounded-full w-2 h-2"
            />
          ))}
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Lab Info */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <Link to="/" className="flex items-center space-x-3 mb-6">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full animate-pulse opacity-20"></div>
                  <Brain className="h-10 w-10 text-primary-400 relative z-10" />
                </motion.div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold gradient-text">HCI Lab</span>
                  <span className="text-sm text-neural-400">IIIT Sri City</span>
                </div>
              </Link>
              
              <p className="text-neural-300 leading-relaxed mb-6">
                Pioneering research in human-computer interaction, developing innovative technologies 
                that enhance the way humans interact with digital systems.
              </p>

              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 bg-neural-800 rounded-xl hover:bg-primary-600 transition-all duration-300 group"
                  >
                    <social.icon className="h-5 w-5 text-neural-400 group-hover:text-white transition-colors duration-300" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold mb-6 gradient-text">Quick Links</h3>
              <ul className="space-y-3">
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
                      className="text-neural-300 hover:text-primary-400 transition-colors duration-200 flex items-center space-x-2 group"
                    >
                      <span className="w-1 h-1 bg-primary-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                      <span>{link.name}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Research Areas */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold mb-6 gradient-text">Research Areas</h3>
              <ul className="space-y-3">
                {researchAreas.map((area, index) => (
                  <motion.li
                    key={area}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                    viewport={{ once: true }}
                    className="text-neural-300 text-sm flex items-center space-x-2"
                  >
                    <div className="w-1 h-1 bg-accent-400 rounded-full"></div>
                    <span>{area}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold mb-6 gradient-text">Contact Us</h3>
              <div className="space-y-4">
                {contactInfo.map((contact, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                    viewport={{ once: true }}
                    className="flex items-start space-x-3"
                  >
                    <div className="p-2 bg-neural-800 rounded-lg">
                      <contact.icon className="h-4 w-4 text-primary-400" />
                    </div>
                    <span className="text-neural-300 text-sm leading-relaxed">
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
                className="inline-flex items-center space-x-2 mt-6 bg-gradient-to-r from-primary-600 to-accent-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-300"
              >
                <span>Visit Us</span>
                <ExternalLink className="h-4 w-4" />
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
          className="border-t border-neural-800 mt-12 pt-8 text-center"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-neural-400 text-sm">
              © 2024 Human-Computer Interaction Lab, IIIT Sri City. All rights reserved.
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <button className="text-neural-400 hover:text-primary-400 transition-colors duration-200">
                Privacy Policy
              </button>
              <button className="text-neural-400 hover:text-primary-400 transition-colors duration-200">
                Terms of Use
              </button>
              <button className="text-neural-400 hover:text-primary-400 transition-colors duration-200">
                Accessibility
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer; 