import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

const Spotlight = ({ className = '', size = 160, springOptions = { bounce: 0.1 } }) => {
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [parentElement, setParentElement] = useState(null);

  const mouseX = useSpring(0, springOptions);
  const mouseY = useSpring(0, springOptions);

  const spotlightLeft = useTransform(mouseX, (x) => `${x - size / 2}px`);
  const spotlightTop = useTransform(mouseY, (y) => `${y - size / 2}px`);

  useEffect(() => {
    if (containerRef.current) {
      const parent = containerRef.current.parentElement;
      if (parent) {
        parent.style.position = 'relative';
        parent.style.overflow = 'hidden';
        setParentElement(parent);
      }
    }
  }, []);

  const handleMouseMove = useCallback((event) => {
    if (!parentElement) return;
    const { left, top } = parentElement.getBoundingClientRect();
    mouseX.set(event.clientX - left);
    mouseY.set(event.clientY - top);
  }, [mouseX, mouseY, parentElement]);

  useEffect(() => {
    if (!parentElement) return;

    const onEnter = () => setIsHovered(true);
    const onLeave = () => setIsHovered(false);

    parentElement.addEventListener('mousemove', handleMouseMove);
    parentElement.addEventListener('mouseenter', onEnter);
    parentElement.addEventListener('mouseleave', onLeave);

    return () => {
      parentElement.removeEventListener('mousemove', handleMouseMove);
      parentElement.removeEventListener('mouseenter', onEnter);
      parentElement.removeEventListener('mouseleave', onLeave);
    };
  }, [parentElement, handleMouseMove]);

  return (
    <motion.div
      ref={containerRef}
      className={`pointer-events-none absolute rounded-full transition-opacity duration-200 ${isHovered ? 'opacity-60' : 'opacity-0'} ${className}`}
      style={{
        width: size,
        height: size,
        left: spotlightLeft,
        top: spotlightTop,
        background: 'radial-gradient(closest-side, rgba(255,255,255,0.25), rgba(255,255,255,0.08), transparent 70%)',
        filter: 'blur(8px)'
      }}
    />
  );
};

export default Spotlight;


