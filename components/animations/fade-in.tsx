'use client';
import { motion } from 'framer-motion';
import { fadeIn } from '@/lib/animations/variants';

export function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
}
