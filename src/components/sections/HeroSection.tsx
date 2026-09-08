import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, Play, Ticket, ShieldCheck, Zap } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

export interface HeroSectionProps {
  onExploreClick: () => void;
  onOrganizerClick: () => void;
  onOpenFeaturedEvent: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreClick,
  onOrganizerClick,
  onOpenFeaturedEvent
}) => {
  return (
    <section className="relative min-h-[90vh] lg:min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-[#070709]">
      
      {/* Cinematic Ambient Background Lights */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Deep gold radial glow */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[650px] sm:w-[900px] h-[500px] bg-linear-to-b from-[#E5A93C]/20 via-[#9E7019]/10 to-transparent blur-[120px] rounded-full" />
        
        {/* Subtle cyan/violet ambient accent */}
        <div className="absolute top-1/3 -left-32 w-[350px] h-[350px] bg-indigo-600/10 blur-[100px] rounded-full" />
        <div className="absolute top-1/2 -right-32 w-[350px] h-[350px] bg-amber-500/10 blur-[100px] rounded-full" />

        {/* High-res Atmospheric Stage Silhouette Overlay */}
        <div 
          className="absolute inset-0 opacity-20 mix-blend-screen bg-cover bg-center pointer-events-none"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1800&auto=format&fit=crop')",
          }}
        />

        {/* Dark Vignette Gradients */}
        <div className="absolute inset-0 bg-linear-to-t from-[#070709] via-transparent to-[#070709]/80" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 text-center flex flex-col items-center">
        
        {/* Top Pill / Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mb-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-[#E5A93C]/40 backdrop-blur-md shadow-lg shadow-[#E5A93C]/10">
            <span className="w-2 h-2 rounded-full bg-[#E5A93C] animate-ping" />
            <span className="text-xs sm:text-sm font-semibold tracking-wide text-zinc-200">
              Detty December & Campus Soundclash 2026 Passes Live
            </span>
            <Sparkles className="w-3.5 h-3.5 text-[#E5A93C]" />
          </div>
        </motion.div>

        {/* Massive Apple-Style Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-serif tracking-tight text-white max-w-5xl leading-[1.05] sm:leading-[1.02]"
        >
          WE ELEVATE <br className="hidden sm:inline" />
          <span className="text-gold-metallic">EXPERIENCES.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          className="mt-6 text-base sm:text-lg md:text-xl text-zinc-300 max-w-2xl font-light leading-relaxed"
        >
          The premier ecosystem for authentic nightlife, underground soundclashes, stadium concerts, and campus festivals across Nigeria. Fast QR ticketing with zero fraud.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
          className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <Button
            id="hero-explore-cta"
            size="xl"
            variant="gold"
            onClick={onExploreClick}
            leftIcon={<Ticket className="w-5 h-5" />}
            rightIcon={<ArrowRight className="w-5 h-5" />}
            className="w-full sm:w-auto text-base sm:text-lg"
          >
            Explore Curated Events
          </Button>

          <Button
            id="hero-organizers-cta"
            size="xl"
            variant="glass"
            onClick={onOrganizerClick}
            leftIcon={<Zap className="w-5 h-5 text-[#E5A93C]" />}
            className="w-full sm:w-auto text-base sm:text-lg"
          >
            Host An Event
          </Button>
        </motion.div>

        {/* Floating Quick Trust Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mt-12 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl w-full"
        >
          {[
            { label: 'Instant Gate Pass', desc: 'Apple & Google Wallet Ready', icon: '🎟️' },
            { label: '100% Anti-Fraud', desc: 'Dynamic encrypted QR', icon: '🔒' },
            { label: 'Direct Settlement', desc: 'Instant bank payout', icon: '⚡' },
            { label: '60+ Campuses', desc: 'UNILAG, UI, OAU, Covenant', icon: '🎓' },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 sm:p-4 rounded-xl bg-[#0E0E16]/80 backdrop-blur-md border border-white/8 flex flex-col items-center sm:items-start text-center sm:text-left transition-all hover:border-[#E5A93C]/40 group"
            >
              <span className="text-xl mb-1">{item.icon}</span>
              <span className="text-xs sm:text-sm font-bold text-white group-hover:text-gold-bright transition-colors">{item.label}</span>
              <span className="text-[11px] text-zinc-400 mt-0.5">{item.desc}</span>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};
