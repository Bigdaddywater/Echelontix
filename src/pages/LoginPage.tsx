import React, { useState } from 'react';
import { Mail, Lock, Sparkles, ArrowRight, ShieldCheck, CheckCircle2, Building2 } from 'lucide-react';
import { UserProfile } from '../types';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export interface LoginPageProps {
  initialEmail?: string;
  initialRole?: string;
  onLoginSuccess: (user: UserProfile) => void;
  onNavigate: (route: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  initialEmail = '',
  initialRole,
  onLoginSuccess,
  onNavigate,
}) => {
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const isOrganizerIntended = initialRole === 'organizer' || email.toLowerCase().includes('organizer') || email.toLowerCase().includes('host');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setErrorMsg('Please enter your email address');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');

    setTimeout(() => {
      setIsLoading(false);
      const isOrganizer = isOrganizerIntended || email.toLowerCase().includes('organizer') || email.toLowerCase().includes('host');
      
      const user: UserProfile = {
        id: `user-${Date.now()}`,
        name: email.split('@')[0].replace('.', ' ') || 'Promoter Lead',
        email: email,
        phone: '+234 812 345 6789',
        role: isOrganizer ? 'organizer' : 'attendee',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
        savedEventIds: ['flow-detat-2026', 'native-sound-detty-dec'],
        tickets: [],
        campus: 'University of Lagos (UNILAG)',
        organizationName: isOrganizer ? 'Echelon Live Productions' : undefined
      };

      onLoginSuccess(user);
      onNavigate(isOrganizer ? 'organizer' : 'my-tickets');
    }, 800);
  };

  const handleSocialLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const user: UserProfile = {
        id: `google-user-${Date.now()}`,
        name: 'Chukwuebuka Stephen',
        email: 'chukwuebuka.s@gmail.com',
        phone: '+234 802 888 1234',
        role: 'attendee',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
        savedEventIds: ['flow-detat-2026'],
        tickets: [],
        campus: 'UNILAG'
      };
      onLoginSuccess(user);
      onNavigate('my-tickets');
    }, 700);
  };

  return (
    <div className="pt-32 pb-24 min-h-[85vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-[#E5A93C]/10 blur-[150px] pointer-events-none rounded-full" />

      <div className="relative z-10 w-full max-w-md">
        
        {/* Card Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5A93C]/15 border border-[#E5A93C]/40 text-[#FDE68A] text-xs font-mono uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#E5A93C]" />
            Echelontix Portal
          </div>
          <h1 className="text-3xl font-black font-serif text-white tracking-tight">
            SIGN IN TO <span className="text-gold-metallic">ECHELON</span>
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Access your Apple Wallet VIP passes, order receipts, and promoter console
          </p>
        </div>

        {/* Login Form Container */}
        <div className="bg-[#0E0E18]/90 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5">
          
          {isOrganizerIntended && (
            <div className="p-3.5 rounded-2xl bg-[#E5A93C]/15 border border-[#E5A93C]/40 text-[#FDE68A] text-xs flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#E5A93C] flex-shrink-0" />
                <span className="font-semibold">Organizer & Promoter Sign In</span>
              </div>
              <button 
                type="button" 
                onClick={() => {
                  setEmail('organizer@echelontix.com');
                  setPassword('promoter123');
                }}
                className="text-[10px] bg-[#E5A93C] text-black px-2.5 py-1 rounded-lg font-mono font-bold hover:bg-[#FDE68A] cursor-pointer transition-colors shadow"
              >
                Auto-Fill Demo
              </button>
            </div>
          )}

          {/* Google Fast Sign-in */}
          <button
            type="button"
            onClick={handleSocialLogin}
            className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white transition-colors cursor-pointer"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            <span>Continue with Google</span>
          </button>

          <div className="flex items-center gap-3 text-[11px] text-zinc-500 font-mono">
            <div className="h-px bg-white/10 flex-1" />
            <span>OR WITH EMAIL</span>
            <div className="h-px bg-white/10 flex-1" />
          </div>

          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email Address"
              type="email"
              placeholder="you@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<Mail className="w-4 h-4" />}
              required
            />

            <div>
              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                leftIcon={<Lock className="w-4 h-4" />}
                required
              />
              <div className="text-right mt-1.5">
                <button
                  type="button"
                  onClick={() => onNavigate('forgot-password')}
                  className="text-xs text-[#E5A93C] hover:underline cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>
            </div>

            <Button
              id="login-page-submit-btn"
              size="lg"
              variant="gold"
              type="submit"
              isLoading={isLoading}
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="w-full font-bold shadow-lg shadow-[#E5A93C]/20"
            >
              Sign In
            </Button>
          </form>

          {/* Quick Promoter Hint */}
          <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-[11px] text-zinc-400">
            💡 <span className="text-[#FDE68A] font-semibold">Tip:</span> Log in with any email containing <code className="text-white bg-black/40 px-1 py-0.5 rounded font-mono">organizer</code> to access the live promoter telemetry console.
          </div>

          {/* Bottom Switch */}
          <div className="text-center text-xs text-zinc-400 pt-3 border-t border-white/8">
            Don't have an account?{' '}
            <button
              onClick={() => onNavigate('signup')}
              className="text-[#E5A93C] font-bold hover:underline cursor-pointer"
            >
              Create Account
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
