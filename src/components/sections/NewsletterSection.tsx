import React, { useState } from 'react';
import { Mail, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 800);
  };

  return (
    <section className="py-20 sm:py-24 bg-[#070709] relative overflow-hidden">
      
      {/* Subtle Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#E5A93C]/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#12121B] to-[#0B0B10] border border-white/12 shadow-2xl">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5A93C]/15 border border-[#E5A93C]/40 text-[#FDE68A] text-xs font-mono uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#E5A93C]" />
            VIP Drops & Early Access
          </div>

          <h2 className="text-2xl sm:text-4xl font-black font-serif text-white tracking-tight">
            NEVER MISS A <span className="text-gold-metallic">SECRET DROP</span>
          </h2>

          <p className="mt-3 text-zinc-400 text-xs sm:text-sm max-w-lg mx-auto leading-relaxed">
            Get WhatsApp and email alerts before tickets sell out for Detty December headliners, campus soundclashes, and underground Lagos raves.
          </p>

          {status === 'success' ? (
            <div className="mt-6 p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 max-w-md mx-auto flex items-center justify-center gap-2 text-sm font-semibold">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>You're on the VIP drop list. Welcome to Echelon.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 max-w-md mx-auto flex flex-col sm:flex-row gap-2.5">
              <div className="relative flex-1">
                <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="newsletter-email-input"
                  type="email"
                  required
                  placeholder="Enter your email or phone number"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#161622] text-white text-sm placeholder:text-zinc-500 rounded-xl border border-white/10 pl-10 pr-4 py-3 focus:outline-none focus:border-[#E5A93C] focus:ring-2 focus:ring-[#E5A93C]/20 transition-all"
                />
              </div>

              <Button
                id="newsletter-submit-btn"
                size="md"
                variant="gold"
                type="submit"
                isLoading={status === 'loading'}
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="whitespace-nowrap font-bold"
              >
                Join VIP List
              </Button>
            </form>
          )}

          <div className="mt-4 flex items-center justify-center gap-4 text-[11px] text-zinc-500">
            <span>🔒 Zero Spam</span>
            <span>•</span>
            <span>⚡ Instant Opt-out</span>
            <span>•</span>
            <span>🎟️ ₦2,000 off first ticket</span>
          </div>

        </div>

      </div>
    </section>
  );
};
