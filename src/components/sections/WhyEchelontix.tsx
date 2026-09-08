import React from 'react';
import { motion } from 'motion/react';
import { 
  Ticket, 
  Users, 
  ShieldCheck, 
  TrendingUp, 
  Crown, 
  ArrowUpRight, 
  Sparkles 
} from 'lucide-react';
import { GlowCard } from '../ui/GlowCard';

export interface WhyEchelontixProps {
  onLearnMore?: () => void;
}

export const WhyEchelontix: React.FC<WhyEchelontixProps> = () => {
  const cards = [
    {
      icon: Ticket,
      title: 'Seamless Instant Ticketing',
      desc: 'Instant QR generation compatible with Apple & Google Wallet. One-tap SMS & WhatsApp ticket delivery with zero paper needed.',
      highlight: 'Sub-second check-in',
      tag: 'Experience',
    },
    {
      icon: Users,
      title: 'Vibrant Event Communities',
      desc: 'Connect with fellow party-goers, find ride-shares to festival venues, and join exclusive campus afterparty channels.',
      highlight: '60+ Campus Hubs',
      tag: 'Culture',
    },
    {
      icon: ShieldCheck,
      title: '100% Anti-Fraud & Verified',
      desc: 'Every ticket is backed by cryptographic single-use QR barcodes. Zero scalpers, fake gate stubs, or duplicate passes.',
      highlight: 'Military Grade',
      tag: 'Security',
    },
    {
      icon: TrendingUp,
      title: 'Supercharged Organizer Tools',
      desc: 'Real-time sales telemetry, dynamic ticket tiers, instant bank payouts, and high-speed scanner apps for gate marshals.',
      highlight: 'Zero Upfront Cost',
      tag: 'Organizers',
    },
    {
      icon: Crown,
      title: 'Curated VIP & Backstage Perks',
      desc: 'Dedicated concierge, express lane VIP red carpets, bespoke bottle service reservations, and private rooftop access.',
      highlight: 'Exclusive Tier',
      tag: 'Luxury',
    },
  ];

  return (
    <section className="py-20 sm:py-28 relative bg-[#070709] overflow-hidden">
      
      {/* Background Decorative Ambient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-[#E5A93C]/5 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-[#E5A93C]/30 text-[#FDE68A] text-xs font-mono uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#E5A93C]" />
            The Echelon Standard
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-serif text-white tracking-tight">
            WHY THE DIASPORA & CAMPUSES <br />
            <span className="text-gold-metallic">CHOOSE ECHELONTIX</span>
          </h2>
          
          <p className="mt-4 text-zinc-400 text-sm sm:text-base leading-relaxed">
            Engineered from the ground up to solve African ticketing chaos. Premium design, unbreachable gate security, and instant gratification.
          </p>
        </div>

        {/* 5 Premium Cards Grid (3 top, 2 wide bottom) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            const isWide = idx >= 3;
            return (
              <GlowCard
                key={idx}
                glowColor="gold"
                className={`p-7 sm:p-8 flex flex-col justify-between group ${
                  isWide ? 'lg:col-span-1 md:col-span-1' : ''
                }`}
              >
                <div>
                  {/* Top Bar inside Card */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-[#1A1A28] to-[#0D0D14] border border-[#E5A93C]/30 p-3 flex items-center justify-center text-[#E5A93C] group-hover:border-[#E5A93C] group-hover:scale-110 transition-all duration-300 shadow-md">
                      <Icon className="w-6 h-6" />
                    </div>

                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 bg-white/5 text-zinc-300 rounded-lg border border-white/8">
                      {card.tag}
                    </span>
                  </div>

                  {/* Title & Desc */}
                  <h3 className="text-xl font-bold text-white group-hover:text-gold-bright transition-colors mb-3 font-serif">
                    {card.title}
                  </h3>

                  <p className="text-sm text-zinc-400 leading-relaxed">
                    {card.desc}
                  </p>
                </div>

                {/* Bottom Highlight */}
                <div className="pt-6 mt-6 border-t border-white/6 flex items-center justify-between text-xs">
                  <span className="text-[#E5A93C] font-semibold font-mono flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E5A93C]" />
                    {card.highlight}
                  </span>
                  
                  <span className="text-zinc-500 group-hover:text-white transition-colors flex items-center gap-1 font-mono">
                    Details <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                </div>
              </GlowCard>
            );
          })}
        </div>

      </div>
    </section>
  );
};
