import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Users, Calendar, GraduationCap, ThumbsUp, Sparkles } from 'lucide-react';
import { PLATFORM_STATS } from '../../services/mockData';

export const StatisticsSection: React.FC = () => {
  const [counts, setCounts] = useState({
    students: 12000,
    events: 550,
    campuses: 45,
    satisfaction: 92,
  });

  // Animated increment counter simulation on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setCounts({
        students: PLATFORM_STATS.attendeesCount,
        events: PLATFORM_STATS.eventsHosted,
        campuses: PLATFORM_STATS.campusesCount,
        satisfaction: 98,
      });
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    {
      label: 'Students & Attendees',
      value: `${counts.students.toLocaleString()}+`,
      sub: 'Active ticket holders across Nigeria',
      icon: Users,
      color: 'text-amber-400',
    },
    {
      label: 'Curated Events',
      value: `${counts.events.toLocaleString()}+`,
      sub: 'Concerts, raves, and tech summits',
      icon: Calendar,
      color: 'text-[#FDE68A]',
    },
    {
      label: 'Campus Chapters',
      value: `${counts.campuses}+`,
      sub: 'UNILAG, Covenant, UI, OAU, UNIBEN',
      icon: GraduationCap,
      color: 'text-indigo-400',
    },
    {
      label: 'Satisfaction Rate',
      value: `${counts.satisfaction}%`,
      sub: '5-star verified check-in rating',
      icon: ThumbsUp,
      color: 'text-emerald-400',
    },
  ];

  return (
    <section className="py-20 bg-[#09090F] border-y border-white/8 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Headline */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-[#E5A93C]/30 text-[#FDE68A] text-xs font-mono uppercase tracking-widest mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#E5A93C]" />
            Echelon Momentum
          </div>
          <h2 className="text-2xl sm:text-4xl font-black font-serif text-white tracking-tight">
            TRUSTED BY THE <span className="text-gold-metallic">NEXT GENERATION</span>
          </h2>
        </div>

        {/* 4 Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                whileHover={{ y: -4 }}
                className="p-6 sm:p-7 rounded-2xl bg-[#0E0E16] border border-white/10 hover:border-[#E5A93C]/50 transition-all flex flex-col justify-between group shadow-xl"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">
                    {stat.label}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-zinc-400 group-hover:text-[#E5A93C] transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <div className="my-2">
                  <span className="text-3xl sm:text-4xl md:text-5xl font-black font-mono text-white tracking-tight group-hover:text-gold-bright transition-colors">
                    {stat.value}
                  </span>
                </div>

                <p className="text-[11px] sm:text-xs text-zinc-400 mt-2 line-clamp-1 font-mono">
                  {stat.sub}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
