import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Publications from './pages/Publications';
import People from './pages/People';
import Projects from './pages/Projects';
import News from './pages/News';
import Footer from './components/Footer';
import NeuralBackground from './components/NeuralBackground';

function App() {
  return (
    <Router>
      <div className="min-h-screen" style={{ position: 'relative' }}>
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0, pointerEvents: 'none', opacity: 1, width: '100vw' }}>
          <NeuralBackground />
        </div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <Navbar />
          <AnimatePresence mode="wait">
            <motion.main
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="pt-20"
            >
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/publications" element={<Publications />} />
                <Route path="/people" element={<People />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/news" element={<News />} />
              </Routes>
            </motion.main>
          </AnimatePresence>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
