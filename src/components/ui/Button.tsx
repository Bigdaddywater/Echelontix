import React from 'react';
import { motion, HTMLMotionProps } from 'motion/react';

export interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: 'gold' | 'glass' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'gold',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  children,
  ...props
}) => {
  const sizeClasses = {
    sm: 'px-3.5 py-1.5 text-xs font-semibold rounded-lg gap-1.5',
    md: 'px-5 py-2.5 text-sm font-semibold rounded-xl gap-2',
    lg: 'px-7 py-3.5 text-base font-semibold rounded-xl gap-2.5',
    xl: 'px-9 py-4 text-lg font-bold rounded-2xl gap-3',
  }[size];

  const variantClasses = {
    gold: 'bg-gradient-to-r from-[#FDE68A] via-[#E5A93C] to-[#C27803] text-black font-bold shadow-lg shadow-[#E5A93C]/20 hover:shadow-[#E5A93C]/40 hover:brightness-110 active:scale-[0.98] border border-[#FDE68A]/40',
    glass: 'bg-[#14141E]/80 backdrop-blur-md text-white border border-white/10 hover:border-[#E5A93C]/50 hover:bg-[#1C1C2A] active:scale-[0.98]',
    outline: 'bg-transparent text-[#E5A93C] border border-[#E5A93C]/60 hover:bg-[#E5A93C]/10 hover:border-[#E5A93C] active:scale-[0.98]',
    ghost: 'bg-transparent text-zinc-300 hover:text-white hover:bg-white/5 active:scale-[0.98]',
    danger: 'bg-rose-600/90 text-white hover:bg-rose-500 active:scale-[0.98] border border-rose-400/30'
  }[variant];

  return (
    <motion.button
      whileHover={disabled || isLoading ? undefined : { scale: 1.02 }}
      whileTap={disabled || isLoading ? undefined : { scale: 0.97 }}
      disabled={disabled || isLoading}
      className={`inline-flex items-center justify-center transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 select-none ${sizeClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {isLoading ? (
        <>
          <svg className="animate-spin h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>Processing...</span>
        </>
      ) : (
        <>
          {leftIcon && <span className="shrink-0">{leftIcon}</span>}
          <span>{children}</span>
          {rightIcon && <span className="shrink-0">{rightIcon}</span>}
        </>
      )}
    </motion.button>
  );
};
