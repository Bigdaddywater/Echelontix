import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Star, Heart, Ticket, Users, ShieldCheck, Sparkles } from 'lucide-react';
import { EventItem } from '../../types';
import { formatNaira, formatUSD, formatShortDate } from '../../utils/formatters';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

export interface EventCardProps {
  event: EventItem;
  currency: 'NGN' | 'USD';
  isSaved: boolean;
  onToggleSave: (eventId: string) => void;
  onSelectEvent: (event: EventItem) => void;
  onQuickBuy: (event: EventItem) => void;
}

export const EventCard: React.FC<EventCardProps> = ({
  event,
  currency,
  isSaved,
  onToggleSave,
  onSelectEvent,
  onQuickBuy,
}) => {
  const shortDate = formatShortDate(event.date);
  const formattedPrice = currency === 'NGN' ? formatNaira(event.startingPrice) : formatUSD(event.startingPrice);
  const capacityPercent = Math.min(100, Math.round((event.attendeesCount / event.maxCapacity) * 100));

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="group relative bg-[#0E0E16] rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 hover:border-[#E5A93C]/50 transition-all duration-300 flex flex-col justify-between shadow-xl shadow-black/40 hover:shadow-[#E5A93C]/15"
    >
      {/* Top Image Container with Zoom Effect */}
      <div 
        onClick={() => onSelectEvent(event)} 
        className="relative h-36 sm:h-52 md:h-60 w-full overflow-hidden cursor-pointer"
      >
        <img
          src={event.image}
          alt={event.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-108 brightness-95 group-hover:brightness-105"
        />

        {/* Gradient Overlay for Netflix/Cinema Vibe */}
        <div className="absolute inset-0 bg-linear-to-t from-[#0E0E16] via-[#0E0E16]/30 to-transparent" />

        {/* Floating Date Badge (Top Left) */}
        <div className="absolute top-2 left-2 sm:top-3.5 sm:left-3.5 flex flex-col items-center bg-[#070709]/90 backdrop-blur-md border border-white/15 px-1.5 py-1 sm:px-2.5 sm:py-1.5 rounded-lg sm:rounded-xl shadow-lg">
          <span className="text-[8px] sm:text-[10px] font-bold text-[#E5A93C] uppercase tracking-wider">{shortDate.month}</span>
          <span className="text-xs sm:text-base font-extrabold text-white font-mono leading-none">{shortDate.day}</span>
        </div>

        {/* Category & VIP Tags (Top Right) */}
        <div className="absolute top-2 right-2 sm:top-3.5 sm:right-3.5 flex items-center gap-1">
          {event.isVIPExclusive && (
            <span className="bg-amber-500/20 text-[#FDE68A] border border-amber-400/40 text-[8px] sm:text-[10px] px-1.5 py-0.5 rounded-full font-bold flex items-center gap-0.5">
              <Sparkles className="w-2.5 h-2.5 text-yellow-300" />
              <span className="hidden xs:inline">VIP</span>
            </span>
          )}
          {event.isDettyDecember && (
            <span className="hidden sm:inline-flex bg-[#E5A93C]/20 text-[#FDE68A] border border-[#E5A93C]/40 text-[10px] px-1.5 py-0.5 rounded-full font-bold">
              Detty Dec
            </span>
          )}
          <span className="bg-black/60 text-zinc-300 text-[8px] sm:text-[10px] px-1.5 py-0.5 rounded-md border border-white/10">
            {event.category}
          </span>
        </div>

        {/* Save/Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleSave(event.id);
          }}
          aria-label={isSaved ? 'Remove from saved' : 'Save event'}
          className={`absolute bottom-2 right-2 sm:bottom-3 sm:right-3 p-1.5 sm:p-2.5 rounded-full backdrop-blur-md border transition-all duration-200 cursor-pointer ${
            isSaved
              ? 'bg-[#E5A93C] text-black border-[#E5A93C] shadow-lg shadow-[#E5A93C]/40'
              : 'bg-black/60 text-white/80 border-white/15 hover:text-white hover:bg-black/90 hover:scale-110'
          }`}
        >
          <Heart className={`w-3 h-3 sm:w-4 sm:h-4 ${isSaved ? 'fill-black' : ''}`} />
        </button>

        {/* Organizer mini pill */}
        <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 hidden xs:flex items-center gap-1 bg-black/70 backdrop-blur-md px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full border border-white/10 text-[9px] sm:text-[11px] text-zinc-300">
          <img
            src={event.organizer.avatar}
            alt={event.organizer.name}
            className="w-3 h-3 sm:w-4 sm:h-4 rounded-full object-cover"
          />
          <span className="max-w-18.75 sm:max-w-30 truncate">{event.organizer.name}</span>
          {event.organizer.verified && (
            <ShieldCheck className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-[#E5A93C]" />
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-2.5 sm:p-4 md:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Location & Rating row */}
          <div className="flex items-center justify-between text-[10px] sm:text-xs text-zinc-400 mb-1 sm:mb-2">
            <div className="flex items-center gap-1 truncate max-w-[65%]">
              <MapPin className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-[#E5A93C] shrink-0" />
              <span className="truncate">{event.location.city}</span>
            </div>

            <div className="flex items-center gap-0.5 sm:gap-1 font-mono text-zinc-200">
              <Star className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 fill-[#E5A93C] text-[#E5A93C]" />
              <span className="font-bold text-[10px] sm:text-xs">{event.rating.toFixed(1)}</span>
            </div>
          </div>

          {/* Title */}
          <h3 
            onClick={() => onSelectEvent(event)}
            className="text-xs sm:text-base md:text-lg font-bold text-white group-hover:text-gold-bright transition-colors cursor-pointer line-clamp-1 mb-1 font-serif"
          >
            {event.title}
          </h3>

          <p className="hidden sm:block text-xs text-zinc-400 line-clamp-2 leading-relaxed mb-2 sm:mb-3">
            {event.tagline || event.description}
          </p>
        </div>

        {/* Capacity / Selling Fast Bar */}
        <div className="pt-1.5 sm:pt-2 mb-2 sm:mb-3 border-t border-white/5">
          <div className="flex items-center justify-between text-[9px] sm:text-[11px] text-zinc-400 mb-1">
            <span className="flex items-center gap-1">
              <Users className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-zinc-500" />
              {capacityPercent >= 85 ? (
                <span className="text-amber-400 font-semibold truncate">Fast ({capacityPercent}%)</span>
              ) : (
                <span className="truncate">{event.attendeesCount} Going</span>
              )}
            </span>
            <span className="hidden sm:inline text-zinc-500 font-mono">{event.time}</span>
          </div>
          <div className="w-full bg-white/5 rounded-full h-1 sm:h-1.5 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                capacityPercent >= 85
                  ? 'bg-linear-to-r from-amber-500 to-rose-500'
                  : 'bg-linear-to-r from-[#E5A93C] to-[#FDE68A]'
              }`}
              style={{ width: `${capacityPercent}%` }}
            />
          </div>
        </div>

        {/* Price & Action Row */}
        <div className="flex items-center justify-between gap-1 sm:gap-3 pt-1 sm:pt-2">
          <div className="min-w-0">
            <span className="text-[8px] sm:text-[10px] text-zinc-500 uppercase tracking-wider block truncate">From</span>
            <span className="text-xs sm:text-base md:text-lg font-extrabold text-white font-mono truncate block">
              {formattedPrice}
            </span>
          </div>

          <Button
            id={`quick-buy-btn-${event.id}`}
            size="sm"
            variant="gold"
            onClick={() => onQuickBuy(event)}
            leftIcon={<Ticket className="w-3 h-3 sm:w-3.5 sm:h-3.5" />}
            className="text-[10px] sm:text-xs font-bold px-2 sm:px-3.5 py-1 sm:py-2 shadow-md shadow-[#E5A93C]/20 shrink-0"
          >
            <span className="hidden xs:inline">Buy</span>
            <span className="xs:hidden">Get</span>
          </Button>
        </div>

      </div>
    </motion.div>
  );
};
