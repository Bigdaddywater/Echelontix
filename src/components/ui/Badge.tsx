import React from 'react';

export interface BadgeProps {
  variant?: 'gold' | 'neon' | 'dark' | 'outline' | 'campus' | 'vip';
  size?: 'sm' | 'md';
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'dark',
  size = 'md',
  children,
  className = '',
  icon
}) => {
  const sizeClasses = {
    sm: 'text-[10px] px-2 py-0.5 font-medium tracking-wide',
    md: 'text-xs px-2.5 py-1 font-semibold tracking-wide',
  }[size];

  const variantClasses = {
    gold: 'bg-[#E5A93C]/15 text-[#FDE68A] border border-[#E5A93C]/40',
    neon: 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/40',
    dark: 'bg-zinc-800/80 text-zinc-300 border border-white/10',
    outline: 'bg-transparent text-zinc-300 border border-zinc-700',
    campus: 'bg-indigo-500/15 text-indigo-300 border border-indigo-500/40',
    vip: 'bg-gradient-to-r from-amber-500/20 to-yellow-300/20 text-yellow-300 border border-yellow-400/50 shadow-sm shadow-amber-500/20'
  }[variant];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full uppercase whitespace-nowrap select-none backdrop-blur-sm ${sizeClasses} ${variantClasses} ${className}`}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </span>
  );
};
