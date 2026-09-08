import React, { InputHTMLAttributes, forwardRef } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  className = '',
  id,
  ...props
}, ref) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full flex flex-col gap-1.5 text-left">
      {label && (
        <label htmlFor={inputId} className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {leftIcon && (
          <div className="absolute left-3.5 text-zinc-400 pointer-events-none flex items-center justify-center">
            {leftIcon}
          </div>
        )}
        <input
          id={inputId}
          ref={ref}
          className={`w-full bg-[#101018] text-zinc-100 placeholder:text-zinc-500 rounded-xl border border-white/10 px-4 py-3 text-sm transition-all duration-200 focus:outline-none focus:border-[#E5A93C] focus:ring-2 focus:ring-[#E5A93C]/20 hover:border-white/20 disabled:opacity-50 disabled:cursor-not-allowed ${leftIcon ? 'pl-11' : ''} ${rightIcon ? 'pr-11' : ''} ${error ? 'border-rose-500/80 focus:border-rose-500 focus:ring-rose-500/20' : ''} ${className}`}
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-3.5 text-zinc-400 flex items-center justify-center">
            {rightIcon}
          </div>
        )}
      </div>
      {error && <p className="text-xs text-rose-400 font-medium">{error}</p>}
      {helperText && !error && <p className="text-xs text-zinc-500">{helperText}</p>}
    </div>
  );
});

Input.displayName = 'Input';
