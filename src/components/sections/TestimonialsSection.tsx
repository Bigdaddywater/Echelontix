import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ChevronLeft, ChevronRight, Quote, ShieldCheck, Sparkles } from 'lucide-react';
import { TESTIMONIALS_DATA } from '../../services/mockData';

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const current = TESTIMONIALS_DATA[currentIndex];

  const handlePrev = () => {
    setIsAutoPlay(false);
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS_DATA.length) % TESTIMONIALS_DATA.length);
  };

  const handleNext = () => {
    setIsAutoPlay(false);
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
  };

  return (
    <section className="py-24 bg-[#070709] relative overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#E5A93C]/5 blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-[#E5A93C]/30 text-[#FDE68A] text-xs font-mono uppercase tracking-widest mb-4">
          <Sparkles className="w-3.5 h-3.5 text-[#E5A93C]" />
          Verified Community Voice
        </div>

        <h2 className="text-3xl sm:text-5xl font-black font-serif text-white tracking-tight mb-12">
          LOVED BY ATTENDEES & <br />
          <span className="text-gold-metallic">TOP PROMOTERS</span>
        </h2>

        {/* Testimonial Card Slider */}
        <div className="relative bg-[#0E0E18]/90 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-12 shadow-2xl shadow-black/80">
          
          <Quote className="w-12 h-12 text-[#E5A93C]/20 absolute top-6 left-6 pointer-events-none" />

          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="flex flex-col items-center"
            >
              {/* Star Rating */}
              <div className="flex items-center gap-1.5 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-[#E5A93C] text-[#E5A93C] animate-pulse"
                    style={{ animationDelay: `${i * 150}ms` }}
                  />
                ))}
              </div>

              {/* Quote text */}
              <p className="text-lg sm:text-2xl text-zinc-100 font-serif leading-relaxed max-w-3xl mb-8">
                “{current.comment}”
              </p>

              {/* Author Row */}
              <div className="flex items-center gap-4">
                <img
                  src={current.authorAvatar}
                  alt={current.authorName}
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-[#E5A93C]/60"
                />
                <div className="text-left">
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-base sm:text-lg font-bold text-white">
                      {current.authorName}
                    </h4>
                    {current.verified && (
                      <ShieldCheck className="w-4 h-4 text-[#E5A93C]" title="Verified Ticket Holder" />
                    )}
                  </div>
                  <p className="text-xs text-zinc-400">
                    {current.role} • <span className="text-[#FDE68A]">{current.universityOrCity}</span>
                  </p>
                  <p className="text-[10px] text-zinc-500 font-mono mt-0.5">
                    Attended: {current.eventAttended}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/8">
            <div className="flex items-center gap-2">
              {TESTIMONIALS_DATA.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setIsAutoPlay(false);
                    setCurrentIndex(idx);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentIndex === idx ? 'w-8 bg-[#E5A93C]' : 'w-2 bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 transition-colors cursor-pointer"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 transition-colors cursor-pointer"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
