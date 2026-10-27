import React, { useState } from 'react';
import { Mail, Sparkles, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export interface ForgotPasswordPageProps {
  onNavigate: (route: string) => void;
}

export const ForgotPasswordPage: React.FC<ForgotPasswordPageProps> = ({
  onNavigate,
}) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 800);
  };

  return (
    <div className="pt-32 pb-24 min-h-[85vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#E5A93C]/10 blur-[150px] pointer-events-none rounded-full" />

      <div className="relative z-10 w-full max-w-md">
        
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5A93C]/15 border border-[#E5A93C]/40 text-[#FDE68A] text-xs font-mono uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#E5A93C]" />
            Security & Recovery
          </div>
          <h1 className="text-3xl font-black font-serif text-white tracking-tight">
            RECOVER <span className="text-gold-metallic">PASSWORD</span>
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Enter your registered email address to receive password reset instructions
          </p>
        </div>

        <div className="bg-[#0E0E18]/90 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5">
          
          {isSubmitted ? (
            <div className="text-center space-y-4 py-4">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-white font-serif">Recovery Email Dispatched</h3>
              <p className="text-xs text-zinc-300 leading-relaxed">
                We've sent a password reset token and secure verification link to <span className="text-white font-semibold">{email}</span>.
              </p>
              <Button
                size="md"
                variant="gold"
                onClick={() => onNavigate('login')}
                className="w-full font-bold mt-2"
              >
                Back to Sign In
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Registered Email Address"
                type="email"
                placeholder="you@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                leftIcon={<Mail className="w-4 h-4" />}
                required
              />

              <Button
                id="forgot-password-submit-btn"
                size="lg"
                variant="gold"
                type="submit"
                isLoading={isLoading}
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="w-full font-bold shadow-lg shadow-[#E5A93C]/20"
              >
                Send Reset Link
              </Button>
            </form>
          )}

          <div className="text-center pt-2 border-t border-white/8">
            <button
              onClick={() => onNavigate('login')}
              className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Login</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
