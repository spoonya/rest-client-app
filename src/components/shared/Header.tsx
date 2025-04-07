'use client';

import { motion, useScroll, useTransform } from 'framer-motion';

import { Navigation } from './Navigation';

export const Header = () => {
  const { scrollY } = useScroll();

  const borderOpacity = useTransform(scrollY, [0, 100], [1, 0]);

  const shadow = useTransform(
    scrollY,
    [0, 100],
    ['none', '0 2px 4px -2px rgba(0, 0, 0, 0.05)']
  );

  return (
    <motion.header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid #e2e8f0',
        boxShadow: shadow,
      }}
      className="transition-all duration-300"
    >
      <motion.div
        style={{ opacity: borderOpacity }}
        className="absolute bottom-0 left-0 w-full h-px bg-slate-200"
      />
      <Navigation />
    </motion.header>
  );
};
