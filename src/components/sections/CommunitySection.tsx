import React from 'react';
import { motion } from 'motion/react';
import { Users, MessageSquare, Sparkles, ArrowRight, ShieldCheck, Heart } from 'lucide-react';
import { Button } from '../ui/Button';

export interface CommunitySectionProps {
  onJoinCommunityClick: () => void;
}

export const CommunitySection: React.FC<CommunitySectionProps> = ({
  onJoinCommunityClick,
}) => {
  return (
    <section className="py-24 sm:py-32 bg-[#060608] relative overflow-hidden">
      
      {/* Glow Backdrops */}
      <div className="absolute -left-40 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-600/10 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute -right-40 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#E5A93C]/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="relative rounded-3xl overflow-hidden border border-white/12 bg-gradient-to-br from-[#12121D] via-[#0E0E16] to-[#07070B] shadow-2xl p-8 sm:p-12 lg:p-16">
          
          {/* Background Atmospheric Imagery with Vignette */}
          <div 
            className="absolute inset-0 opacity-20 mix-blend-luminosity bg-cover bg-center pointer-events-none"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1600&auto=format&fit=crop')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0E0E16] via-[#0E0E16]/80 to-transparent" />

          <div className="relative z-10 max-w-2xl">
            
            {/* Slogan Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E5A93C]/15 border border-[#E5A93C]/40 text-[#FDE68A] text-xs font-mono font-bold uppercase tracking-widest mb-6">
              <Users className="w-3.5 h-3.5 text-[#E5A93C]" />
              The Echelon Collective
            </div>

            {/* Slogan */}
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black font-serif text-white tracking-tight leading-[1.08] mb-6">
              MORE THAN EVENTS. <br />
              <span className="text-gold-metallic">WE BUILD COMMUNITY.</span>
            </h2>

            <p className="text-zinc-300 text-sm sm:text-lg leading-relaxed mb-8">
              Ticketing is just the starting point. Connect with fellow festival goers, join official campus ambassador chat lounges, find after-party convoys, and unlock unreleased secret drop codes.
            </p>

            {/* Stats Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/8 backdrop-blur-md">
                <span className="text-2xl font-mono font-black text-white block">18,500+</span>
                <span className="text-xs text-zinc-400">Community Members</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/8 backdrop-blur-md">
                <span className="text-2xl font-mono font-black text-[#E5A93C] block">64 Campuses</span>
                <span className="text-xs text-zinc-400">Student Chapters</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/8 backdrop-blur-md col-span-2 sm:col-span-1">
                <span className="text-2xl font-mono font-black text-emerald-400 block">100%</span>
                <span className="text-xs text-zinc-400">Vibe Verification</span>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Button
                id="community-join-cta-btn"
                size="lg"
                variant="gold"
                onClick={onJoinCommunityClick}
                leftIcon={<MessageSquare className="w-5 h-5" />}
                rightIcon={<ArrowRight className="w-5 h-5" />}
                className="w-full sm:w-auto text-base font-bold shadow-xl shadow-[#E5A93C]/25"
              >
                Join Community Lounges
              </Button>

              <div className="flex items-center gap-2 text-xs text-zinc-400">
                <ShieldCheck className="w-4 h-4 text-[#E5A93C]" />
                <span>Verified student & creator network</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
