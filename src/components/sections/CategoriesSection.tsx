import React from 'react';
import { motion } from 'motion/react';
import { 
  Music, 
  Wine, 
  Smile, 
  GraduationCap, 
  Cpu, 
  Briefcase, 
  Gamepad2, 
  Crown,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { EventCategory } from '../../types';

export interface CategoriesSectionProps {
  onSelectCategory: (category: EventCategory | string) => void;
}

export const CategoriesSection: React.FC<CategoriesSectionProps> = ({
  onSelectCategory
}) => {
  const categoryList = [
    {
      name: 'Music',
      title: 'Music & Concerts',
      count: '42+ Live',
      icon: Music,
      image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=600&auto=format&fit=crop',
      color: 'from-amber-600/30 to-black',
      tag: 'Afrobeats / Live'
    },
    {
      name: 'Nightlife',
      title: 'Nightlife & Raves',
      count: '28+ Live',
      icon: Wine,
      image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=600&auto=format&fit=crop',
      color: 'from-purple-600/30 to-black',
      tag: 'After-Hours / VI'
    },
    {
      name: 'Campus',
      title: 'Campus Soundclash',
      count: '19+ Hubs',
      icon: GraduationCap,
      image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=600&auto=format&fit=crop',
      color: 'from-indigo-600/30 to-black',
      tag: 'UNILAG / Covenant / UI'
    },
    {
      name: 'Tech',
      title: 'Tech & Summits',
      count: '15+ Summits',
      icon: Cpu,
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=600&auto=format&fit=crop',
      color: 'from-cyan-600/30 to-black',
      tag: 'AI / VC / Builders'
    },
    {
      name: 'Comedy',
      title: 'Comedy & Theatre',
      count: '12+ Shows',
      icon: Smile,
      image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=600&auto=format&fit=crop',
      color: 'from-rose-600/30 to-black',
      tag: 'Stand-up / Galas'
    },
    {
      name: 'VIP & Luxury',
      title: 'VIP Rooftops & Galas',
      count: '8+ Exclusive',
      icon: Crown,
      image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=600&auto=format&fit=crop',
      color: 'from-yellow-600/30 to-black',
      tag: 'Private Tables / Concierge'
    },
    {
      name: 'Gaming',
      title: 'Sports & Esports',
      count: '9+ Tournaments',
      icon: Gamepad2,
      image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=600&auto=format&fit=crop',
      color: 'from-emerald-600/30 to-black',
      tag: 'LAN / Football Watch'
    },
    {
      name: 'Masterclass',
      title: 'Workshops & Business',
      count: '14+ Masterclasses',
      icon: Briefcase,
      image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=600&auto=format&fit=crop',
      color: 'from-blue-600/30 to-black',
      tag: 'Mastery / Growth'
    }
  ];

  return (
    <section className="py-20 bg-[#070709] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-[#E5A93C]/30 text-[#FDE68A] text-xs font-mono uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#E5A93C]" />
            Genre & Category Explorer
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-serif text-white tracking-tight">
            FIND YOUR <span className="text-gold-metallic">VIBE</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-2">
            Explore diverse subcultures, from high-energy campus soundclashes to private oceanfront rooftop dinners.
          </p>
        </div>

        {/* Categories Bento Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-5">
          {categoryList.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={idx}
                whileHover={{ y: -5, scale: 1.02 }}
                onClick={() => onSelectCategory(cat.name)}
                className="group relative h-36 sm:h-52 md:h-56 rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer border border-white/10 hover:border-[#E5A93C]/60 shadow-xl transition-all duration-300 flex flex-col justify-end p-3 sm:p-5"
              >
                {/* Background Image with Ambient Color Overlay */}
                <img
                  src={cat.image}
                  alt={cat.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 brightness-75 group-hover:brightness-90"
                />
                
                {/* Gradient Wash */}
                <div className={`absolute inset-0 bg-gradient-to-t ${cat.color} via-black/60 to-black/30`} />

                {/* Top Icon Pill */}
                <div className="absolute top-2.5 left-2.5 sm:top-3.5 sm:left-3.5 w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-black/60 backdrop-blur-md border border-white/15 p-1.5 sm:p-2 flex items-center justify-center text-[#E5A93C] group-hover:border-[#E5A93C] transition-colors">
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>

                {/* Live count tag */}
                <div className="absolute top-2.5 right-2.5 sm:top-3.5 sm:right-3.5 text-[8px] sm:text-[10px] font-mono font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-md sm:rounded-lg border border-white/10 text-zinc-300">
                  {cat.count}
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <span className="text-[8px] sm:text-[10px] font-mono text-[#E5A93C] uppercase tracking-wider block mb-0.5">
                    {cat.tag}
                  </span>
                  <h3 className="text-xs sm:text-base md:text-lg font-bold text-white font-serif group-hover:text-gold-bright transition-colors flex items-center justify-between">
                    <span className="truncate">{cat.title}</span>
                    <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/50 group-hover:text-[#E5A93C] group-hover:translate-x-1 transition-all flex-shrink-0 ml-1" />
                  </h3>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
