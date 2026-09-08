import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Calendar, 
  Clock, 
  MapPin, 
  Star, 
  ShieldCheck, 
  Users, 
  Heart, 
  Share2, 
  Ticket, 
  Sparkles, 
  ChevronRight, 
  Info,
  Check,
  Compass,
  ArrowRight
} from 'lucide-react';
import { EventItem, TicketTier } from '../../types';
import { formatNaira, formatUSD, formatDate, getTimeRemaining } from '../../utils/formatters';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { EventLocationMap } from '../map/EventLocationMap';

export interface EventDetailsModalProps {
  event: EventItem | null;
  isOpen: boolean;
  onClose: () => void;
  currency: 'NGN' | 'USD';
  isSaved: boolean;
  onToggleSave: (eventId: string) => void;
  onBuyTickets: (event: EventItem, tierId?: string) => void;
  onSelectRelatedEvent: (event: EventItem) => void;
  allEvents: EventItem[];
}

export const EventDetailsModal: React.FC<EventDetailsModalProps> = ({
  event,
  isOpen,
  onClose,
  currency,
  isSaved,
  onToggleSave,
  onBuyTickets,
  onSelectRelatedEvent,
  allEvents,
}) => {
  if (!event || !isOpen) return null;

  const [selectedImage, setSelectedImage] = useState(event.image);
  const [selectedTier, setSelectedTier] = useState<TicketTier>(event.ticketTiers[0]);
  const [copiedLink, setCopiedLink] = useState(false);
  const [countdown, setCountdown] = useState(getTimeRemaining(event.date));

  useEffect(() => {
    setSelectedImage(event.image);
    setSelectedTier(event.ticketTiers[0]);
  }, [event]);

  // Live countdown interval
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(getTimeRemaining(event.date));
    }, 1000);
    return () => clearInterval(timer);
  }, [event.date]);

  const relatedEvents = allEvents
    .filter((e) => e.id !== event.id && (e.category === event.category || e.location.city === event.location.city))
    .slice(0, 3);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const formattedStartingPrice = currency === 'NGN' ? formatNaira(event.startingPrice) : formatUSD(event.startingPrice);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-xl custom-scrollbar flex items-center justify-center p-0 sm:p-4 md:p-6">
      
      {/* Container Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 20 }}
        className="relative w-full max-w-5xl bg-[#09090F] border border-white/12 sm:rounded-3xl shadow-2xl overflow-hidden min-h-screen sm:min-h-0"
      >
        {/* Floating Top Controls (Close & Save & Share) */}
        <div className="absolute top-4 right-4 z-30 flex items-center gap-2">
          <button
            onClick={handleShare}
            aria-label="Share event link"
            className="p-2.5 rounded-full bg-black/70 hover:bg-black/90 text-white backdrop-blur-md border border-white/15 cursor-pointer transition-transform hover:scale-105"
          >
            {copiedLink ? <Check className="w-5 h-5 text-emerald-400" /> : <Share2 className="w-5 h-5" />}
          </button>

          <button
            onClick={() => onToggleSave(event.id)}
            aria-label="Save event"
            className={`p-2.5 rounded-full backdrop-blur-md border transition-transform hover:scale-105 cursor-pointer ${
              isSaved
                ? 'bg-[#E5A93C] text-black border-[#E5A93C]'
                : 'bg-black/70 hover:bg-black/90 text-white border-white/15'
            }`}
          >
            <Heart className={`w-5 h-5 ${isSaved ? 'fill-black' : ''}`} />
          </button>

          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-2.5 rounded-full bg-black/70 hover:bg-black/90 text-white backdrop-blur-md border border-white/15 cursor-pointer transition-transform hover:scale-105"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Large Hero Banner */}
        <div className="relative h-72 sm:h-96 w-full overflow-hidden">
          <img
            src={selectedImage}
            alt={event.title}
            className="w-full h-full object-cover brightness-90 transition-all duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#09090F] via-[#09090F]/50 to-transparent" />

          {/* Banner Overlays */}
          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="max-w-2xl">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <Badge variant="gold" size="sm">
                  {event.category}
                </Badge>
                {event.isVIPExclusive && <Badge variant="vip" size="sm">VIP Exclusive</Badge>}
                {event.isDettyDecember && <Badge variant="neon" size="sm">Detty December</Badge>}
                {event.ageRestriction && (
                  <Badge variant="dark" size="sm">{event.ageRestriction}</Badge>
                )}
              </div>

              <h1 className="text-2xl sm:text-4xl md:text-5xl font-black font-serif text-white tracking-tight leading-tight drop-shadow-md">
                {event.title}
              </h1>

              <p className="text-xs sm:text-sm text-zinc-300 mt-1 line-clamp-1">
                {event.tagline}
              </p>
            </div>

            {/* Price Badge in Banner */}
            <div className="bg-[#0A0A10]/90 backdrop-blur-md border border-[#E5A93C]/40 px-4 py-2.5 rounded-2xl text-right">
              <span className="text-[10px] uppercase tracking-wider text-zinc-400 font-mono block">From</span>
              <span className="text-xl sm:text-2xl font-black text-[#FDE68A] font-mono">{formattedStartingPrice}</span>
            </div>
          </div>
        </div>

        {/* Live Countdown Timer Strip */}
        <div className="bg-[#12121E] border-y border-white/8 px-6 py-3.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#E5A93C]">
            <Clock className="w-4 h-4" />
            <span>EVENT COUNTDOWN:</span>
          </div>

          <div className="flex items-center gap-3 text-xs sm:text-sm font-mono font-bold text-white">
            <div className="flex items-baseline gap-1 bg-black/40 px-2.5 py-1 rounded-lg border border-white/10">
              <span className="text-[#FDE68A] text-base">{countdown.days}</span>
              <span className="text-[10px] text-zinc-400">DAYS</span>
            </div>
            <span>:</span>
            <div className="flex items-baseline gap-1 bg-black/40 px-2.5 py-1 rounded-lg border border-white/10">
              <span className="text-[#FDE68A] text-base">{countdown.hours.toString().padStart(2, '0')}</span>
              <span className="text-[10px] text-zinc-400">HRS</span>
            </div>
            <span>:</span>
            <div className="flex items-baseline gap-1 bg-black/40 px-2.5 py-1 rounded-lg border border-white/10">
              <span className="text-[#FDE68A] text-base">{countdown.minutes.toString().padStart(2, '0')}</span>
              <span className="text-[10px] text-zinc-400">MINS</span>
            </div>
            <span>:</span>
            <div className="flex items-baseline gap-1 bg-black/40 px-2.5 py-1 rounded-lg border border-white/10">
              <span className="text-[#FDE68A] text-base">{countdown.seconds.toString().padStart(2, '0')}</span>
              <span className="text-[10px] text-zinc-400">SECS</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-zinc-400">
            <Users className="w-3.5 h-3.5 text-emerald-400" />
            <span>{event.attendeesCount} passes booked</span>
          </div>
        </div>

        {/* Main Content & Sidebar Grid */}
        <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Event Specs & Gallery (8 cols) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Quick Metadata Pill Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-[#12121A] border border-white/8 flex items-start gap-3">
                <Calendar className="w-5 h-5 text-[#E5A93C] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] uppercase font-mono text-zinc-500 block">Date & Time</span>
                  <p className="text-xs font-bold text-white">{formatDate(event.date)}</p>
                  <p className="text-[11px] text-zinc-400">{event.time} (Doors: {event.doorsOpen || 'Early'})</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#12121A] border border-white/8 flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#E5A93C] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] uppercase font-mono text-zinc-500 block">Venue & Location</span>
                  <p className="text-xs font-bold text-white">{event.location.venue}</p>
                  <p className="text-[11px] text-zinc-400">{event.location.address}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-bold text-white font-serif mb-3">About This Experience</h3>
              <p className="text-sm text-zinc-300 leading-relaxed whitespace-pre-line">
                {event.description}
              </p>
              {event.dressCode && (
                <div className="mt-4 p-3 rounded-xl bg-white/5 border border-white/8 flex items-center gap-2 text-xs text-zinc-300">
                  <span className="font-bold text-[#FDE68A]">Dress Code:</span>
                  <span>{event.dressCode}</span>
                </div>
              )}
            </div>

            {/* Photo Gallery Thumbnails */}
            {event.galleryImages.length > 0 && (
              <div>
                <h3 className="text-sm font-bold text-white font-serif mb-3">Event Atmosphere & Highlights</h3>
                <div className="flex gap-2.5 overflow-x-auto pb-2 custom-scrollbar">
                  <img
                    src={event.image}
                    alt="Main"
                    onClick={() => setSelectedImage(event.image)}
                    className={`w-24 h-18 rounded-xl object-cover cursor-pointer border-2 transition-all ${
                      selectedImage === event.image ? 'border-[#E5A93C]' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  />
                  {event.galleryImages.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`Gallery ${idx}`}
                      onClick={() => setSelectedImage(img)}
                      className={`w-24 h-18 rounded-xl object-cover cursor-pointer border-2 transition-all flex-shrink-0 ${
                        selectedImage === img ? 'border-[#E5A93C]' : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Host Profile */}
            <div className="p-4 rounded-2xl bg-[#12121A] border border-white/8 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={event.organizer.avatar}
                  alt={event.organizer.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#E5A93C]/50"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-sm font-bold text-white">{event.organizer.name}</h4>
                    {event.organizer.verified && (
                      <ShieldCheck className="w-4 h-4 text-[#E5A93C]" title="Verified Organizer" />
                    )}
                  </div>
                  <p className="text-xs text-zinc-400">
                    {event.organizer.eventsHosted} Events Hosted • {event.organizer.followersCount.toLocaleString()} Followers
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 bg-black/40 px-2.5 py-1 rounded-xl border border-white/10 text-xs font-mono text-[#FDE68A]">
                <Star className="w-3.5 h-3.5 fill-[#E5A93C] text-[#E5A93C]" />
                <span className="font-bold">{event.organizer.rating}</span>
              </div>
            </div>

            {/* Google Map Location & Directions */}
            <div>
              <h3 className="text-sm font-bold text-white font-serif mb-2">Location & Turn-by-Turn GPS</h3>
              <EventLocationMap event={event} height="220px" compact={true} />
            </div>

          </div>

          {/* Right Column: Ticket Tiers & Sticky Checkout (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="sticky top-6 p-6 rounded-3xl bg-[#101018] border border-white/12 shadow-2xl space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-white/8">
                <h3 className="text-base font-bold text-white font-serif">Available Ticket Tiers</h3>
                <span className="text-xs text-zinc-400 font-mono">Select a pass</span>
              </div>

              {/* Tiers List */}
              <div className="space-y-3">
                {event.ticketTiers.map((tier) => {
                  const isSelected = selectedTier.id === tier.id;
                  const priceStr = currency === 'NGN' ? formatNaira(tier.price) : formatUSD(tier.price);
                  return (
                    <div
                      key={tier.id}
                      onClick={() => setSelectedTier(tier)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-[#181828] border-[#E5A93C] shadow-lg shadow-[#E5A93C]/15 ring-1 ring-[#E5A93C]'
                          : 'bg-[#14141E] border-white/8 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-white">{tier.name}</span>
                          {tier.isPopular && (
                            <Badge variant="gold" size="sm">Popular</Badge>
                          )}
                        </div>
                        <span className="text-base font-mono font-extrabold text-[#FDE68A]">{priceStr}</span>
                      </div>

                      <p className="text-xs text-zinc-400 leading-relaxed mb-2.5">
                        {tier.description}
                      </p>

                      {/* Tier Perks */}
                      <ul className="space-y-1 text-[11px] text-zinc-300">
                        {tier.perks.map((perk, pIdx) => (
                          <li key={pIdx} className="flex items-center gap-1.5">
                            <Sparkles className="w-3 h-3 text-[#E5A93C] flex-shrink-0" />
                            <span>{perk}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>

              {/* Action Button */}
              <div className="pt-3 border-t border-white/8">
                <Button
                  id="modal-buy-ticket-btn"
                  size="lg"
                  variant="gold"
                  onClick={() => onBuyTickets(event, selectedTier.id)}
                  leftIcon={<Ticket className="w-5 h-5" />}
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                  className="w-full text-base font-bold shadow-xl shadow-[#E5A93C]/25"
                >
                  Buy {selectedTier.name} ({currency === 'NGN' ? formatNaira(selectedTier.price) : formatUSD(selectedTier.price)})
                </Button>
                <div className="mt-2 text-center text-[10px] text-zinc-500 font-mono">
                  🔒 Instant encrypted delivery to SMS, WhatsApp & Apple Wallet
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Related Events Section */}
        {relatedEvents.length > 0 && (
          <div className="bg-[#06060A] border-t border-white/8 p-6 sm:p-8">
            <h3 className="text-base font-bold text-white font-serif mb-4">You May Also Like</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedEvents.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => onSelectRelatedEvent(rel)}
                  className="p-3 rounded-2xl bg-[#0E0E16] border border-white/8 hover:border-[#E5A93C]/50 transition-all cursor-pointer group flex items-center gap-3"
                >
                  <img
                    src={rel.image}
                    alt={rel.title}
                    className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-white group-hover:text-gold-bright transition-colors truncate">
                      {rel.title}
                    </h4>
                    <p className="text-[11px] text-zinc-400 truncate">📍 {rel.location.city}</p>
                    <p className="text-xs font-mono font-bold text-[#E5A93C] mt-0.5">
                      {currency === 'NGN' ? formatNaira(rel.startingPrice) : formatUSD(rel.startingPrice)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </motion.div>
    </div>
  );
};
