import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, Flame, Trophy, Compass, Ticket, Music, Globe, ChevronRight } from 'lucide-react';
import { EventItem } from '../../types';
import { EventCard } from '../cards/EventCard';
import { Button } from '../ui/Button';

export interface FeaturedEventsProps {
  events: EventItem[];
  currency: 'NGN' | 'USD';
  savedEventIds: string[];
  onToggleSave: (eventId: string) => void;
  onSelectEvent: (event: EventItem) => void;
  onQuickBuy: (event: EventItem) => void;
  onViewAllClick: () => void;
}

export const FeaturedEvents: React.FC<FeaturedEventsProps> = ({
  events,
  currency,
  savedEventIds,
  onToggleSave,
  onSelectEvent,
  onQuickBuy,
  onViewAllClick,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'detty' | 'campus' | 'vip' | 'nightlife'>('all');
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    return typeof window !== 'undefined' ? window.innerWidth < 768 : false;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const filterTabs = [
    { id: 'all', label: '🔥 All Curated' },
    { id: 'detty', label: '🎄 Detty December' },
    { id: 'campus', label: '🎓 Campus Soundclash' },
    { id: 'vip', label: '👑 VIP & Luxury' },
    { id: 'nightlife', label: '🍸 Lagos Nightlife' },
  ] as const;

  const filteredEvents = events.filter((ev) => {
    if (activeTab === 'detty') return ev.isDettyDecember || ev.tags.includes('DettyDecember');
    if (activeTab === 'campus') return ev.category === 'Campus' || ev.location.isCampus;
    if (activeTab === 'vip') return ev.isVIPExclusive || ev.category === 'VIP & Luxury' || ev.startingPrice >= 30000;
    if (activeTab === 'nightlife') return ev.category === 'Nightlife';
    return true;
  });

  // Mobile View: 2 columns x 2 rows = 4 cards
  // Desktop View: 3 columns x 3 rows = up to 9 cards
  const displayedEvents = filteredEvents.slice(0, isMobile ? 4 : 9);

  return (
    <section className="py-14 sm:py-20 md:py-24 bg-[#09090F] relative">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Section Top Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-10">
          <div>
            <div className="flex items-center gap-2 text-[10px] sm:text-xs font-mono uppercase text-[#E5A93C] tracking-widest mb-1.5 sm:mb-2">
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Live Curated Showcase</span>
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black font-serif text-white tracking-tight">
              FEATURED <span className="text-gold-metallic">EXPERIENCES</span>
            </h2>
            <p className="text-zinc-400 text-xs sm:text-base mt-1.5 sm:mt-2 max-w-xl">
              Hand-picked concerts, underground beach raves, and exclusive galas with guaranteed authentic tickets.
            </p>
          </div>

          {/* View All / Explore Events Header CTA */}
          <Button
            id="featured-explore-all-header-btn"
            variant="outline"
            size="md"
            onClick={onViewAllClick}
            rightIcon={<ArrowRight className="w-4 h-4 text-[#E5A93C]" />}
            className="self-start md:self-auto text-xs sm:text-sm font-bold border-[#E5A93C]/40 hover:border-[#E5A93C]"
          >
            Explore All Events ({events.length})
          </Button>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar pb-3 mb-6 sm:mb-8">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-[#E5A93C] to-[#C27803] text-black font-bold shadow-lg shadow-[#E5A93C]/20 border border-[#FDE68A]/50'
                  : 'bg-[#14141E] text-zinc-300 hover:text-white border border-white/8 hover:border-white/20'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Event Cards Grid: 2 columns on Mobile (2 rows = 4 cards), 3 columns on Desktop (3 rows = 9 cards) */}
        <motion.div 
          layout
          className="grid grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-6"
        >
          <AnimatePresence mode="popLayout">
            {displayedEvents.map((event) => (
              <motion.div
                layout
                key={event.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
              >
                <EventCard
                  event={event}
                  currency={currency}
                  isSaved={savedEventIds.includes(event.id)}
                  onToggleSave={onToggleSave}
                  onSelectEvent={onSelectEvent}
                  onQuickBuy={onQuickBuy}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredEvents.length === 0 && (
          <div className="py-12 sm:py-16 text-center bg-[#0E0E16] rounded-2xl sm:rounded-3xl border border-white/10 p-6 sm:p-8">
            <Compass className="w-10 h-10 sm:w-12 sm:h-12 text-[#E5A93C] mx-auto mb-3 opacity-60" />
            <h3 className="text-base sm:text-lg font-bold text-white mb-1">No events in this category yet</h3>
            <p className="text-xs text-zinc-400 max-w-sm mx-auto mb-4">
              Switch filters or explore our full calendar for more dates.
            </p>
            <Button size="sm" variant="gold" onClick={() => setActiveTab('all')}>
              Show All Events
            </Button>
          </div>
        )}

        {/* Dedicated "Explore Events" Banner linking to the Explore Page */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-8 sm:mt-12 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#141422] via-[#10101C] to-[#181510] border border-[#E5A93C]/30 p-5 sm:p-8 relative overflow-hidden shadow-2xl"
        >
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#E5A93C]/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E5A93C]/15 border border-[#E5A93C]/30 text-[#FDE68A] text-[10px] sm:text-xs font-mono font-semibold uppercase tracking-wider mb-2 sm:mb-3">
                <Globe className="w-3.5 h-3.5" />
                <span>All Nigerian & African Events</span>
              </div>
              <h3 className="text-lg sm:text-2xl md:text-3xl font-black font-serif text-white tracking-tight">
                Looking for more experiences across Nigeria?
              </h3>
              <p className="text-zinc-400 text-xs sm:text-sm mt-1.5 leading-relaxed">
                Filter through verified campus soundclashes, VIP galas, music festivals, tech conventions, and Detty December raves in Lagos, Abuja, Port Harcourt, and Ibadan.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto flex-shrink-0">
              <Button
                id="explore-page-hub-btn"
                variant="gold"
                size="lg"
                onClick={onViewAllClick}
                leftIcon={<Ticket className="w-4 h-4" />}
                rightIcon={<ChevronRight className="w-4 h-4" />}
                className="w-full sm:w-auto text-xs sm:text-sm font-bold shadow-lg shadow-[#E5A93C]/25"
              >
                Explore All Events Catalogue
              </Button>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
