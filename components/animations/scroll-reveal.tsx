'use client';
import { motion } from 'framer-motion';
import { fadeUp } from '@/lib/animations/variants';

export function ScrollReveal({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.div>
  );
}
