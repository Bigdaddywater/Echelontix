import React, { useState } from 'react';
import { Mail, Lock, User, Phone, Sparkles, ArrowRight, ShieldCheck, Building2, GraduationCap } from 'lucide-react';
import { UserProfile, UserRole } from '../types';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export interface SignUpPageProps {
  initialRole?: UserRole;
  onSignUpSuccess: (user: UserProfile) => void;
  onNavigate: (route: string) => void;
}

export const SignUpPage: React.FC<SignUpPageProps> = ({
  initialRole = 'attendee',
  onSignUpSuccess,
  onNavigate,
}) => {
  const [role, setRole] = useState<UserRole>(initialRole);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [organizationName, setOrganizationName] = useState('');
  const [campus, setCampus] = useState('University of Lagos (UNILAG)');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);

      const newUser: UserProfile = {
        id: `user-${Date.now()}`,
        name: name || 'New VIP Member',
        email: email || 'user@johndoe.com',
        phone: phone || '+234 800 000 0000',
        role: role,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
        savedEventIds: [],
        tickets: [],
        campus: role === 'campus_ambassador' || role === 'attendee' ? campus : undefined,
        organizationName: role === 'organizer' ? (organizationName || 'My Event Brand') : undefined,
      };

      onSignUpSuccess(newUser);
      onNavigate('verify-email');
    }, 900);
  };

  return (
    <div className="pt-32 pb-24 min-h-[85vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-100 bg-[#E5A93C]/10 blur-[160px] pointer-events-none rounded-full" />

      <div className="relative z-10 w-full max-w-lg">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5A93C]/15 border border-[#E5A93C]/40 text-[#FDE68A] text-xs font-mono uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#E5A93C]" />
            Join The Echelon Inner Circle
          </div>
          <h1 className="text-3xl font-black font-serif text-white tracking-tight">
            CREATE YOUR <span className="text-gold-metallic">ACCOUNT</span>
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Access VIP events, fast gate passes, student discounts, and organizer tools
          </p>
        </div>

        {/* Card Form */}
        <div className="bg-[#0E0E18]/90 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          
          {/* Role Selection */}
          <div>
            <label className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 block mb-2">
              Select Your Profile Type
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'attendee', label: '🎟️ Attendee', desc: 'Browse & Buy Passes' },
                { id: 'organizer', label: '⚡ Organizer', desc: 'Host & Sell Tickets' },
                { id: 'campus_ambassador', label: '🎓 Campus Lead', desc: 'University Chapter' },
              ].map((r) => (
                <button
                  type="button"
                  key={r.id}
                  onClick={() => setRole(r.id as UserRole)}
                  className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                    role === r.id
                      ? 'bg-[#1A1A28] border-[#E5A93C] text-white ring-1 ring-[#E5A93C] shadow-lg shadow-[#E5A93C]/10'
                      : 'bg-white/5 border-white/8 text-zinc-400 hover:text-white'
                  }`}
                >
                  <span className="text-xs font-bold block">{r.label}</span>
                  <span className="text-[10px] text-zinc-400 block mt-0.5">{r.desc}</span>
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Full Name"
              placeholder="e.g. John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              leftIcon={<User className="w-4 h-4" />}
              required
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                label="Email Address"
                type="email"
                placeholder="you@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                leftIcon={<Mail className="w-4 h-4" />}
                required
              />

              <Input
                label="Phone Number (SMS & WhatsApp Pass)"
                placeholder="+234 800 000 0000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                leftIcon={<Phone className="w-4 h-4" />}
                required
              />
            </div>

            {role === 'organizer' && (
              <Input
                label="Brand / Company Name"
                placeholder="e.g. Echelon Live Productions"
                value={organizationName}
                onChange={(e) => setOrganizationName(e.target.value)}
                leftIcon={<Building2 className="w-4 h-4" />}
                required
              />
            )}

            {(role === 'campus_ambassador' || role === 'attendee') && (
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block mb-1.5">
                  Campus Affiliation
                </label>
                <select
                  value={campus}
                  onChange={(e) => setCampus(e.target.value)}
                  className="w-full bg-[#161622] text-white rounded-xl border border-white/10 p-3 text-xs focus:border-[#E5A93C] focus:outline-none"
                >
                  <option value="University of Lagos (UNILAG)">University of Lagos (UNILAG)</option>
                  <option value="Covenant University (CU)">Covenant University (CU)</option>
                  <option value="University of Ibadan (UI)">University of Ibadan (UI)</option>
                  <option value="Obafemi Awolowo University (OAU)">Obafemi Awolowo University (OAU)</option>
                  <option value="University of Benin (UNIBEN)">University of Benin (UNIBEN)</option>
                  <option value="Babcock / Bells / Crawford">Babcock / Bells / Crawford</option>
                  <option value="Other / Non-Student">Non-Student (General Attendee)</option>
                </select>
              </div>
            )}

            <Input
              label="Create Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              leftIcon={<Lock className="w-4 h-4" />}
              required
            />

            <Button
              id="signup-page-submit-btn"
              size="lg"
              variant="gold"
              type="submit"
              isLoading={isLoading}
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="w-full font-bold shadow-lg shadow-[#E5A93C]/20 mt-2"
            >
              Create Account & Verify
            </Button>
          </form>

          {/* Bottom Switch */}
          <div className="text-center text-xs text-zinc-400 pt-3 border-t border-white/8">
            Already have an account?{' '}
            <button
              onClick={() => onNavigate('login')}
              className="text-[#E5A93C] font-bold hover:underline cursor-pointer"
            >
              Log In
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
