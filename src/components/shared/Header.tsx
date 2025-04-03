'use client';

// import { cn } from '@/utils';
import { motion, useScroll, useTransform } from 'framer-motion';

import { Navigation } from './Navigation';

// interface HeadeProps {
//   className?: string;
// }

export const Header = () => {
  const { scrollY } = useScroll();
  const backgroundColor = useTransform(
    scrollY,
    [0, 0.5, 1],
    ['#0f0', '#0f0', '#00f']
  );
  return (
    <motion.header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 10,
        backgroundColor: backgroundColor,
        transition: 'all',
        transitionDuration: '0.5s',
      }}
    >
      <Navigation />
    </motion.header>
  );
};
