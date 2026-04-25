'use client';
import { motion } from 'framer-motion';
import { slideInLeft, slideInRight } from '@/lib/animations/variants';

export function SlideIn({
  children,
  from = 'left',
  delay = 0,
}: {
  children: React.ReactNode;
  from?: 'left' | 'right';
  delay?: number;
}) {
  return (
    <motion.div
      variants={from === 'left' ? slideInLeft : slideInRight}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
}
