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

    ["#E6E6FA", "#0f0", "#000"],

  )

  const padding = useTransform(
    scrollY,
    [0, 0.5, 1],
    [5, 10, 20],

  )
  const color = useTransform(
    scrollY,
    [0, 0.5, 1],
    ['#4169E1', '#0f0', '#fff'],

  )

  const box = useTransform(
    scrollY,
    [0, 0.5, 1],
    ["#778899 5px 10px 5px", "#0ff 5px 10px 5px", "#B0C4DE 5px 10px 5px"],

  )
  return (
    <motion.header style={{ position: 'sticky', fontSize: 17, color: color, paddingTop: padding, paddingBottom: padding, top: 0, zIndex: 10, boxShadow: box, backgroundColor: backgroundColor, transition: 'all', transitionDuration: '0.5s'
    }}
     >
        <Navigation />
      </motion.header>
  
  );
};
