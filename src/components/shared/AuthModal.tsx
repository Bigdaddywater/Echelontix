import React, { useState } from 'react';
import { Mail, Lock, User, Phone, Sparkles, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';
import { UserProfile } from '../../types';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

export interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
  onLoginSuccess: (user: UserProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'login',
  onLoginSuccess,
}) => {
  const [mode, setMode] = useState<'login' | 'register' | 'forgot' | 'verify'>(initialMode);
  const [role, setRole] = useState<'attendee' | 'organizer' | 'campus_ambassador'>('attendee');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [campus, setCampus] = useState('');
  const [otpCode, setOtpCode] = useState(['8', '4', '2', '9']);
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    setMode(initialMode);
  }, [initialMode, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);

      if (mode === 'register') {
        setMode('verify');
        return;
      }

      if (mode === 'forgot') {
        setMode('login');
        return;
      }

      // Successful login / verified register
      const authenticatedUser: UserProfile = {
        id: `user-${Date.now()}`,
        name: name || (email ? email.split('@')[0] : 'Chukwuebuka Stephen'),
        email: email || 'chukwuebuka@echelontix.com',
        phone: phone || '+234 812 345 6789',
        role: role === 'campus_ambassador' ? 'campus_ambassador' : role,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
        savedEventIds: ['flow-detat-2026', 'native-sound-detty-dec'],
        tickets: [],
        campus: campus || 'University of Lagos (UNILAG)',
        organizationName: role === 'organizer' ? 'Echelon Media Labs' : undefined
      };

      onLoginSuccess(authenticatedUser);
      onClose();
    }, 900);
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
      onClose();
    }, 700);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        mode === 'login'
          ? 'Welcome Back'
          : mode === 'register'
          ? 'Create Echelon Account'
          : mode === 'verify'
          ? 'Verify Phone / Email'
          : 'Reset Password'
      }
      subtitle={
        mode === 'login'
          ? 'Access your VIP tickets, passes, and orders'
          : mode === 'register'
          ? 'Join the premier live experiences ecosystem in Nigeria'
          : mode === 'verify'
          ? 'Enter the 4-digit code sent to your device'
          : 'Enter your registered email for password recovery'
      }
      maxWidth="md"
    >
      <div className="space-y-5">
        
        {/* Role Toggle for Registration */}
        {mode === 'register' && (
          <div>
            <label className="text-[11px] font-mono uppercase text-zinc-400 block mb-2 font-bold">
              Select Your Role
            </label>
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              {[
                { id: 'attendee', label: '🎟️ Attendee' },
                { id: 'organizer', label: '⚡ Organizer' },
                { id: 'campus_ambassador', label: '🎓 Campus Lead' },
              ].map((r) => (
                <button
                  type="button"
                  key={r.id}
                  onClick={() => setRole(r.id as 'attendee' | 'organizer' | 'campus_ambassador')}
                  className={`p-2.5 rounded-xl border font-semibold transition-all cursor-pointer ${
                    role === r.id
                      ? 'bg-[#1E1E2E] border-[#E5A93C] text-[#FDE68A] shadow-md'
                      : 'bg-white/5 border-white/8 text-zinc-400 hover:text-white'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Social Fast Login */}
        {mode !== 'verify' && (
          <button
            type="button"
            onClick={handleSocialLogin}
            className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white transition-colors cursor-pointer"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>
        )}

        {mode !== 'verify' && (
          <div className="flex items-center gap-3 text-[11px] text-zinc-500 font-mono">
            <div className="h-px bg-white/10 flex-1" />
            <span>OR WITH EMAIL</span>
            <div className="h-px bg-white/10 flex-1" />
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {mode === 'register' && (
            <Input
              label="Full Name"
              placeholder="e.g. Chukwuebuka Stephen"
              value={name}
              onChange={(e) => setName(e.target.value)}
              leftIcon={<User className="w-4 h-4" />}
              required
            />
          )}

          {mode !== 'verify' && (
            <Input
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<Mail className="w-4 h-4" />}
              required
            />
          )}

          {mode === 'register' && (
            <Input
              label="Phone Number"
              placeholder="+234 800 000 0000"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              leftIcon={<Phone className="w-4 h-4" />}
              required
            />
          )}

          {mode === 'register' && role === 'campus_ambassador' && (
            <Input
              label="Campus / Institution"
              placeholder="e.g. University of Lagos (UNILAG)"
              value={campus}
              onChange={(e) => setCampus(e.target.value)}
            />
          )}

          {(mode === 'login' || mode === 'register') && (
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
              {mode === 'login' && (
                <div className="text-right mt-1.5">
                  <button
                    type="button"
                    onClick={() => setMode('forgot')}
                    className="text-xs text-[#E5A93C] hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>
              )}
            </div>
          )}

          {/* OTP Verification Boxes */}
          {mode === 'verify' && (
            <div className="space-y-4 py-2">
              <div className="flex justify-center gap-3">
                {otpCode.map((digit, idx) => (
                  <input
                    key={idx}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => {
                      const newOtp = [...otpCode];
                      newOtp[idx] = e.target.value;
                      setOtpCode(newOtp);
                    }}
                    className="w-12 h-14 text-center text-xl font-mono font-bold bg-[#141420] text-white rounded-xl border border-[#E5A93C]/40 focus:border-[#E5A93C] focus:ring-2 focus:ring-[#E5A93C]/20"
                  />
                ))}
              </div>
              <p className="text-xs text-zinc-400 text-center">
                Didn't receive code? <button type="button" className="text-[#E5A93C] hover:underline font-bold">Resend in 30s</button>
              </p>
            </div>
          )}

          <Button
            id="auth-submit-btn"
            size="lg"
            variant="gold"
            type="submit"
            isLoading={isLoading}
            className="w-full font-bold shadow-lg shadow-[#E5A93C]/20 mt-2"
          >
            {mode === 'login'
              ? 'Log In'
              : mode === 'register'
              ? 'Create Account'
              : mode === 'verify'
              ? 'Verify & Continue'
              : 'Send Reset Link'}
          </Button>
        </form>

        {/* Footer Navigation */}
        <div className="text-center text-xs text-zinc-400 pt-2 border-t border-white/8">
          {mode === 'login' ? (
            <p>
              Don't have an account?{' '}
              <button
                onClick={() => setMode('register')}
                className="text-[#E5A93C] font-bold hover:underline cursor-pointer"
              >
                Sign Up
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <button
                onClick={() => setMode('login')}
                className="text-[#E5A93C] font-bold hover:underline cursor-pointer"
              >
                Log In
              </button>
            </p>
          )}
        </div>

      </div>
    </Modal>
  );
};
