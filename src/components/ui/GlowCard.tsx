import React from 'react';
import { motion, HTMLMotionProps } from 'motion/react';

export interface GlowCardProps extends HTMLMotionProps<'div'> {
  glowColor?: 'gold' | 'emerald' | 'subtle';
  hoverEffect?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const GlowCard: React.FC<GlowCardProps> = ({
  glowColor = 'gold',
  hoverEffect = true,
  className = '',
  children,
  ...props
}) => {
  const glowClasses = {
    gold: 'hover:border-[#E5A93C]/40 hover:shadow-[0_0_30px_-5px_rgba(229,169,60,0.2)]',
    emerald: 'hover:border-emerald-500/40 hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.2)]',
    subtle: 'hover:border-white/20 hover:shadow-[0_0_20px_-5px_rgba(255,255,255,0.1)]',
  }[glowColor];

  return (
    <motion.div
      whileHover={hoverEffect ? { y: -4, transition: { duration: 0.2 } } : undefined}
      className={`relative bg-[#0E0E16]/90 backdrop-blur-md rounded-2xl border border-white/8 transition-all duration-300 ${hoverEffect ? glowClasses : ''} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};
