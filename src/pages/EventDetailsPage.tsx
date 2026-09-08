import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
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
  ArrowLeft,
  Check,
  Building2,
  Lock,
  Plus,
  Minus,
  Download,
  CreditCard,
  Zap,
  CheckCircle2,
  Navigation,
  ExternalLink,
  Smartphone,
  QrCode,
  User,
  Mail,
  Phone
} from 'lucide-react';
import { EventItem, TicketTier, PurchasedTicket, UserProfile } from '../types';
import { formatNaira, formatUSD, formatDate, getTimeRemaining } from '../utils/formatters';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { EventLocationMap } from '../components/map/EventLocationMap';
import { EventCard } from '../components/cards/EventCard';

export interface EventDetailsPageProps {
  event: EventItem | null;
  initialTierId?: string;
  currency: 'NGN' | 'USD';
  currentUser?: UserProfile | null;
  isSaved: boolean;
  onToggleSave: (eventId: string) => void;
  onTicketPurchased: (ticket: PurchasedTicket, optionalAccountCreated?: { name: string; email: string; phone: string }) => void;
  onViewMyTickets: () => void;
  onSelectRelatedEvent: (event: EventItem) => void;
  onBack: () => void;
  allEvents: EventItem[];
}

export const EventDetailsPage: React.FC<EventDetailsPageProps> = ({
  event,
  initialTierId,
  currency,
  currentUser,
  isSaved,
  onToggleSave,
  onTicketPurchased,
  onViewMyTickets,
  onSelectRelatedEvent,
  onBack,
  allEvents,
}) => {
  if (!event) {
    return (
      <div className="pt-32 pb-24 text-center">
        <h2 className="text-xl font-bold text-white">Event not found</h2>
        <Button size="md" variant="gold" onClick={onBack} className="mt-4">
          Back to Explore
        </Button>
      </div>
    );
  }

  const [selectedImage, setSelectedImage] = useState(event.image);
  const [selectedTier, setSelectedTier] = useState<TicketTier>(() => {
    if (initialTierId) {
      const found = event.ticketTiers.find((t) => t.id === initialTierId);
      if (found) return found;
    }
    return event.ticketTiers[0];
  });

  const [quantity, setQuantity] = useState(1);
  const [checkoutStep, setCheckoutStep] = useState<'tier' | 'form' | 'success'>('tier');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentProvider, setPaymentProvider] = useState<'paystack' | 'flutterwave' | 'card' | 'transfer'>('paystack');
  const [issuedTicket, setIssuedTicket] = useState<PurchasedTicket | null>(null);

  const [formData, setFormData] = useState({
    fullName: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    campusMatric: '',
  });

  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedPassId, setCopiedPassId] = useState(false);
  const [countdown, setCountdown] = useState(getTimeRemaining(event.date));

  // Sync event changes
  useEffect(() => {
    setSelectedImage(event.image);
    if (initialTierId) {
      const found = event.ticketTiers.find((t) => t.id === initialTierId);
      if (found) setSelectedTier(found);
    } else {
      setSelectedTier(event.ticketTiers[0]);
    }
    setCheckoutStep('tier');
    setIssuedTicket(null);
  }, [event, initialTierId]);

  // Sync user info if logged in
  useEffect(() => {
    if (currentUser) {
      setFormData((prev) => ({
        ...prev,
        fullName: prev.fullName || currentUser.name,
        email: prev.email || currentUser.email,
        phone: prev.phone || currentUser.phone || '',
      }));
    }
  }, [currentUser]);

  // Countdown loop
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
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const subtotal = selectedTier.price * quantity;
  const serviceFee = 0; // 0% promotional fee
  const total = subtotal + serviceFee;

  const formattedStartingPrice = currency === 'NGN' ? formatNaira(event.startingPrice) : formatUSD(event.startingPrice);
  const formattedTotal = currency === 'NGN' ? formatNaira(total) : formatUSD(total);

  const handleQuickAutofill = () => {
    setFormData({
      fullName: 'john Doe',
      email: 'john@doe.com',
      phone: '+234 000 000 0000',
      campusMatric: 'UNILAG/2022/CS/084',
    });
  };

  const handleCompletePurchase = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const buyerName = formData.fullName.trim() || 'Guest Passholder';
      const buyerEmail = formData.email.trim() || 'guest@echelontix.com';
      const buyerPhone = formData.phone.trim() || '+234 800 000 0000';

      const newTicket: PurchasedTicket = {
        ticketId: `ECH-${Math.floor(100000 + Math.random() * 900000)}`,
        orderId: `ORD-${Date.now()}`,
        eventId: event.id,
        eventTitle: event.title,
        eventImage: event.image,
        eventDate: event.date,
        eventTime: event.time,
        venue: event.location.venue,
        city: event.location.city,
        tierName: selectedTier.name,
        pricePaid: total,
        quantity: quantity,
        holderName: buyerName,
        holderEmail: buyerEmail,
        holderPhone: buyerPhone,
        qrCodeValue: `https://echelontix.ng/verify?ticket=ECH-${Math.random().toString(36).substring(2, 9).toUpperCase()}&event=${event.id}`,
        purchaseDate: new Date().toISOString(),
        status: 'valid',
      };

      setIssuedTicket(newTicket);
      setCheckoutStep('success');

      // Trigger Confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#E5A93C', '#FDE68A', '#FFFFFF', '#10B981'],
        });
      } catch (err) {
        // ignore if not supported
      }

      onTicketPurchased(newTicket, {
        name: buyerName,
        email: buyerEmail,
        phone: buyerPhone,
      });
    }, 1200);
  };

  const handleDownloadPass = () => {
    if (!issuedTicket) return;
    const passText = `
========================================
ECHELON TIX - OFFICIAL DIGITAL ACCESS PASS
========================================
PASS ID: ${issuedTicket.ticketId}
ORDER ID: ${issuedTicket.orderId}
STATUS: CONFIRMED / VALID

EVENT: ${issuedTicket.eventTitle}
DATE: ${formatDate(issuedTicket.eventDate)}
TIME: ${issuedTicket.eventTime}
VENUE: ${issuedTicket.venue}, ${issuedTicket.city}

HOLDER: ${issuedTicket.holderName}
EMAIL: ${issuedTicket.holderEmail}
PHONE: ${issuedTicket.holderPhone}

TIER: ${issuedTicket.tierName} (Qty: ${issuedTicket.quantity})
TOTAL PAID: ${currency === 'NGN' ? formatNaira(issuedTicket.pricePaid) : formatUSD(issuedTicket.pricePaid)}
PAYMENT: ${paymentProvider.toUpperCase()} (0% Processing Fee)

SECURITY INSTRUCTIONS:
- Present dynamic QR at turnstile Gate 01/02
- Keep screen brightness above 80%
- Screenshot passes are validated with anti-screenshot checksum
========================================
    `.trim();

    const blob = new Blob([passText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `EchelonPass-${issuedTicket.ticketId}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="pt-24 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Top Header Strip with Navigation & Actions */}
      <div className="flex items-center justify-between py-4 mb-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-mono font-bold text-zinc-400 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-[#E5A93C]" />
          <span>BACK TO EXPLORE</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 transition-colors cursor-pointer flex items-center gap-1.5 text-xs"
          >
            {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            <span>{copiedLink ? 'Link Copied' : 'Share'}</span>
          </button>

          <button
            onClick={() => onToggleSave(event.id)}
            className={`p-2.5 rounded-xl border transition-colors cursor-pointer flex items-center gap-1.5 text-xs ${
              isSaved
                ? 'bg-[#E5A93C] text-black border-[#E5A93C] font-bold'
                : 'bg-white/5 hover:bg-white/10 text-white border-white/10'
            }`}
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-black' : ''}`} />
            <span>{isSaved ? 'Saved' : 'Save'}</span>
          </button>
        </div>
      </div>

      {/* Hero Banner Container */}
      <div className="relative rounded-3xl overflow-hidden border border-white/12 shadow-2xl h-80 sm:h-120 mb-8">
        <img
          src={selectedImage}
          alt={event.title}
          className="w-full h-full object-cover brightness-90"
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#070709] via-[#070709]/40 to-transparent" />

        <div className="absolute bottom-6 sm:bottom-10 left-6 sm:left-10 right-6 sm:right-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <Badge variant="gold" size="sm">{event.category}</Badge>
              {event.isVIPExclusive && <Badge variant="vip" size="sm">VIP Exclusive</Badge>}
              {event.isDettyDecember && <Badge variant="neon" size="sm">Detty December</Badge>}
              {event.ageRestriction && <Badge variant="dark" size="sm">{event.ageRestriction}</Badge>}
            </div>

            <h1 className="text-3xl sm:text-5xl font-black font-serif text-white tracking-tight leading-tight drop-shadow-lg">
              {event.title}
            </h1>
            <p className="text-zinc-300 text-sm sm:text-base mt-2">{event.tagline}</p>
          </div>

          <div className="bg-[#0A0A10]/95 backdrop-blur-md border border-[#E5A93C]/40 px-5 py-3 rounded-2xl text-right shrink-0">
            <span className="text-[10px] uppercase tracking-wider text-zinc-400 font-mono block">From</span>
            <span className="text-2xl sm:text-3xl font-black text-[#FDE68A] font-mono">{formattedStartingPrice}</span>
          </div>
        </div>
      </div>

      {/* Countdown Timer Strip */}
      <div className="bg-[#0E0E18] border border-white/10 rounded-2xl p-4 sm:p-5 mb-10 flex flex-wrap items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#E5A93C]">
          <Clock className="w-4 h-4" />
          <span>EVENT COUNTDOWN:</span>
        </div>

        <div className="flex items-center gap-3 text-xs sm:text-sm font-mono font-bold text-white">
          <div className="flex items-baseline gap-1 bg-black/40 px-3 py-1.5 rounded-xl border border-white/10">
            <span className="text-[#FDE68A] text-lg">{countdown.days}</span>
            <span className="text-[10px] text-zinc-400">DAYS</span>
          </div>
          <span>:</span>
          <div className="flex items-baseline gap-1 bg-black/40 px-3 py-1.5 rounded-xl border border-white/10">
            <span className="text-[#FDE68A] text-lg">{countdown.hours.toString().padStart(2, '0')}</span>
            <span className="text-[10px] text-zinc-400">HRS</span>
          </div>
          <span>:</span>
          <div className="flex items-baseline gap-1 bg-black/40 px-3 py-1.5 rounded-xl border border-white/10">
            <span className="text-[#FDE68A] text-lg">{countdown.minutes.toString().padStart(2, '0')}</span>
            <span className="text-[10px] text-zinc-400">MINS</span>
          </div>
          <span>:</span>
          <div className="flex items-baseline gap-1 bg-black/40 px-3 py-1.5 rounded-xl border border-white/10">
            <span className="text-[#FDE68A] text-lg">{countdown.seconds.toString().padStart(2, '0')}</span>
            <span className="text-[10px] text-zinc-400">SECS</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-zinc-400">
          <Users className="w-4 h-4 text-emerald-400" />
          <span>{event.attendeesCount} verified attendees registered</span>
        </div>
      </div>

      {/* Main Grid: Left Event Details + Right On-Page Ticket Pass Checkout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column (7 cols): Details, Map, Gallery, Host */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Quick Date / Venue cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-2xl bg-[#0E0E16] border border-white/8 flex items-start gap-3">
              <Calendar className="w-5 h-5 text-[#E5A93C] shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] uppercase font-mono text-zinc-500 block">Date & Time</span>
                <p className="text-sm font-bold text-white">{formatDate(event.date)}</p>
                <p className="text-xs text-zinc-400">{event.time} (Doors: {event.doorsOpen || '08:00 PM'})</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#0E0E16] border border-white/8 flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#E5A93C] shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] uppercase font-mono text-zinc-500 block">Venue & Location</span>
                <p className="text-sm font-bold text-white">{event.location.venue}</p>
                <p className="text-xs text-zinc-400">{event.location.address}</p>
              </div>
            </div>
          </div>

          {/* Description & Dress Code */}
          <div>
            <h3 className="text-xl font-bold text-white font-serif mb-3">About This Experience</h3>
            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed whitespace-pre-line">
              {event.description}
            </p>
            {event.dressCode && (
              <div className="mt-4 p-3.5 rounded-xl bg-white/5 border border-white/8 flex items-center gap-2 text-xs text-zinc-300">
                <span className="font-bold text-[#FDE68A]">Dress Code:</span>
                <span>{event.dressCode}</span>
              </div>
            )}
          </div>

          {/* Venue Google Maps & Turn-by-Turn GPS Directions */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xl font-bold text-white font-serif flex items-center gap-2">
                <span>Venue & Location Navigation</span>
              </h3>
              <span className="text-[10px] font-mono uppercase text-[#E5A93C] tracking-widest">
                ● Live Google Maps
              </span>
            </div>
            <EventLocationMap event={event} height="320px" />
          </div>

          {/* Photo Atmosphere Gallery */}
          {event.galleryImages && event.galleryImages.length > 0 && (
            <div>
              <h3 className="text-base font-bold text-white font-serif mb-3">Event Atmosphere</h3>
              <div className="flex gap-3 overflow-x-auto pb-2 custom-scrollbar">
                <img
                  src={event.image}
                  alt="Main"
                  onClick={() => setSelectedImage(event.image)}
                  className={`w-28 h-20 rounded-xl object-cover cursor-pointer border-2 transition-all shrink-0 ${
                    selectedImage === event.image ? 'border-[#E5A93C]' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                />
                {event.galleryImages.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`Gallery ${idx}`}
                    onClick={() => setSelectedImage(img)}
                    className={`w-28 h-20 rounded-xl object-cover cursor-pointer border-2 transition-all shrink-0 ${
                      selectedImage === img ? 'border-[#E5A93C]' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Host Profile */}
          <div className="p-5 rounded-2xl bg-[#0E0E16] border border-white/8 flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <img
                src={event.organizer.avatar}
                alt={event.organizer.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-[#E5A93C]/50"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="text-base font-bold text-white">{event.organizer.name}</h4>
                  {event.organizer.verified && (
                    <ShieldCheck className="w-4 h-4 text-[#E5A93C]" aria-label="Verified Organizer" />
                  )}
                </div>
                <p className="text-xs text-zinc-400">
                  {event.organizer.eventsHosted} Events Hosted • {event.organizer.followersCount.toLocaleString()} Followers
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 bg-black/40 px-3 py-1.5 rounded-xl border border-white/10 text-xs font-mono text-[#FDE68A]">
              <Star className="w-4 h-4 fill-[#E5A93C] text-[#E5A93C]" />
              <span className="font-bold">{event.organizer.rating}</span>
            </div>
          </div>

        </div>

        {/* Right Column (5 cols): Integrated On-Page Ticket Checkout System */}
        <div className="lg:col-span-5" id="ticket-checkout-section">
          <div className="sticky top-28 p-6 rounded-3xl bg-[#0E0E18] border border-white/12 shadow-2xl space-y-5">
            
            {/* STEP 1: Select Ticket Tier & Quantity */}
            {checkoutStep === 'tier' && (
              <>
                <div className="flex items-center justify-between pb-3 border-b border-white/8">
                  <div>
                    <h3 className="text-base font-bold text-white font-serif">Select Access Pass</h3>
                    <p className="text-[11px] text-zinc-400">Instant encrypted dynamic QR pass delivery</p>
                  </div>
                  <Badge variant="gold" size="sm">0% Fee</Badge>
                </div>

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
                            : 'bg-[#12121A] border-white/8 hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-white">{tier.name}</span>
                            {tier.isPopular && <Badge variant="gold" size="sm">Popular</Badge>}
                          </div>
                          <span className="text-base font-mono font-extrabold text-[#FDE68A]">{priceStr}</span>
                        </div>

                        <p className="text-xs text-zinc-400 leading-relaxed mb-2.5">{tier.description}</p>

                        <ul className="space-y-1 text-[11px] text-zinc-300">
                          {tier.perks.map((perk, pIdx) => (
                            <li key={pIdx} className="flex items-center gap-1.5">
                              <Sparkles className="w-3 h-3 text-[#E5A93C] shrink-0" />
                              <span>{perk}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>

                {/* Quantity Controls */}
                <div className="p-3.5 rounded-2xl bg-[#12121D] border border-white/8 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-white block">Pass Quantity</span>
                    <span className="text-[10px] text-zinc-400">Max 10 passes per checkout</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      disabled={quantity <= 1}
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-white transition-colors cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="font-mono text-base font-bold text-white w-6 text-center">{quantity}</span>
                    <button
                      type="button"
                      disabled={quantity >= 10}
                      onClick={() => setQuantity(Math.min(10, quantity + 1))}
                      className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-white transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Summary & Proceed CTA */}
                <div className="pt-3 border-t border-white/8 space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-zinc-400">Total Due ({quantity} pass{quantity > 1 ? 'es' : ''})</span>
                    <span className="text-xl font-mono font-black text-[#FDE68A]">{formattedTotal}</span>
                  </div>

                  <Button
                    id="page-proceed-to-checkout-btn"
                    size="lg"
                    variant="gold"
                    onClick={() => setCheckoutStep('form')}
                    rightIcon={<ChevronRight className="w-5 h-5" />}
                    className="w-full text-base font-bold shadow-xl shadow-[#E5A93C]/25 cursor-pointer"
                  >
                    Proceed with {selectedTier.name}
                  </Button>
                  <div className="text-center text-[10px] text-zinc-500 font-mono">
                    🔒 Instant delivery to SMS, WhatsApp & Apple Wallet • 0% Fees
                  </div>
                </div>
              </>
            )}

            {/* STEP 2: On-Page Attendee Registration & Payment Gateway */}
            {checkoutStep === 'form' && (
              <form onSubmit={handleCompletePurchase} className="space-y-4">
                
                {/* Header with back to tier selection */}
                <div className="flex items-center justify-between pb-3 border-b border-white/8">
                  <button
                    type="button"
                    onClick={() => setCheckoutStep('tier')}
                    className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors cursor-pointer font-mono"
                  >
                    <ArrowLeft className="w-3.5 h-3.5 text-[#E5A93C]" />
                    <span>Change Tier</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleQuickAutofill}
                    className="text-[11px] font-mono text-[#E5A93C] hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <Zap className="w-3 h-3" />
                    <span>1-Click Autofill</span>
                  </button>
                </div>

                {/* Selected Tier Pill */}
                <div className="p-3 rounded-xl bg-[#141424] border border-[#E5A93C]/30 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-white block">{selectedTier.name} × {quantity}</span>
                    <span className="text-[10px] text-zinc-400">{event.location.venue}</span>
                  </div>
                  <span className="font-mono text-sm font-bold text-[#FDE68A]">{formattedTotal}</span>
                </div>

                {/* Attendee Form Fields */}
                <div className="space-y-3">
                  <div>
                    <label className="text-[11px] font-mono uppercase text-zinc-400 block mb-1">
                      Full Legal Name (For Gate ID Verification)
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. John Doe"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-xs placeholder:text-zinc-600 focus:outline-none focus:border-[#E5A93C]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-mono uppercase text-zinc-400 block mb-1">
                      Email Address (Instant QR Pass Delivery)
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        placeholder="e.g. yourname@gmail.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-xs placeholder:text-zinc-600 focus:outline-none focus:border-[#E5A93C]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-mono uppercase text-zinc-400 block mb-1">
                      Phone Number / WhatsApp (SMS Pass)
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        required
                        placeholder="+234 814 000 0000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-xs placeholder:text-zinc-600 focus:outline-none focus:border-[#E5A93C]"
                      />
                    </div>
                  </div>

                  {event.location.isCampus && (
                    <div>
                      <label className="text-[11px] font-mono uppercase text-[#FDE68A] block mb-1">
                        Campus Matriculation / Student ID No.
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. UNILAG/2023/SCI/0492"
                        value={formData.campusMatric}
                        onChange={(e) => setFormData({ ...formData, campusMatric: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl bg-black/50 border border-[#E5A93C]/40 text-white text-xs placeholder:text-zinc-600 focus:outline-none focus:border-[#E5A93C]"
                      />
                    </div>
                  )}
                </div>

                {/* Payment Gateway Options */}
                <div>
                  <label className="text-[11px] font-mono uppercase text-zinc-400 block mb-1.5">
                    Select Payment Gateway
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'paystack', name: 'Paystack', desc: 'Cards, USSD, Apple Pay' },
                      { id: 'flutterwave', name: 'Flutterwave', desc: 'Bank & Mobile Money' },
                      { id: 'card', name: 'Instant Card', desc: 'Visa / MasterCard / Verve' },
                      { id: 'transfer', name: 'Bank Transfer', desc: 'Instant Dynamic Account' },
                    ].map((p) => (
                      <button
                        type="button"
                        key={p.id}
                        onClick={() => setPaymentProvider(p.id as 'paystack' | 'flutterwave' | 'card' | 'transfer')}
                        className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                          paymentProvider === p.id
                            ? 'bg-[#E5A93C]/15 border-[#E5A93C] text-white shadow-sm'
                            : 'bg-black/30 border-white/10 text-zinc-400 hover:border-white/20'
                        }`}
                      >
                        <span className="text-xs font-bold block text-white">{p.name}</span>
                        <span className="text-[9px] text-zinc-400 truncate block">{p.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Final Submit CTA */}
                <div className="pt-3 border-t border-white/8 space-y-2">
                  <Button
                    type="submit"
                    id="page-complete-payment-btn"
                    size="lg"
                    variant="gold"
                    isLoading={isProcessing}
                    leftIcon={<Lock className="w-4 h-4" />}
                    className="w-full text-sm font-bold shadow-xl shadow-[#E5A93C]/25 cursor-pointer"
                  >
                    {isProcessing ? 'Processing Secure Pass...' : `Pay ${formattedTotal} & Generate Pass`}
                  </Button>
                  <div className="flex items-center justify-center gap-1.5 text-[10px] text-zinc-400 font-mono">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>256-bit SSL • 100% Anti-Fraud Guarantee</span>
                  </div>
                </div>

              </form>
            )}

            {/* STEP 3: Pass Issued Confirmation On-Page */}
            {checkoutStep === 'success' && issuedTicket && (
              <div className="space-y-4 text-center">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white font-serif">Pass Confirmed & Issued!</h3>
                  <p className="text-xs text-zinc-300 mt-1">
                    Your digital pass has been issued and sent to <span className="text-[#FDE68A] font-bold">{issuedTicket.holderEmail}</span>.
                  </p>
                </div>

                {/* Digital Encrypted QR Pass Card */}
                <div className="p-4 rounded-2xl bg-linear-to-b from-[#181828] to-[#0D0D14] border border-[#E5A93C]/40 text-left space-y-3 shadow-2xl relative overflow-hidden">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <div>
                      <span className="text-[10px] uppercase font-mono text-zinc-400 block">Pass ID</span>
                      <span className="text-xs font-mono font-bold text-[#FDE68A]">{issuedTicket.ticketId}</span>
                    </div>
                    <Badge variant="gold" size="sm">{issuedTicket.tierName}</Badge>
                  </div>

                  <div className="flex items-center gap-3">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(issuedTicket.qrCodeValue)}&bgcolor=0E0E16&color=E5A93C`}
                      alt="Encrypted Gate QR"
                      className="w-20 h-20 rounded-xl bg-black p-1 border border-[#E5A93C]/40 shrink-0"
                    />
                    <div className="space-y-1 text-xs min-w-0">
                      <p className="font-bold text-white truncate">{issuedTicket.holderName}</p>
                      <p className="text-zinc-400 text-[11px] truncate">{issuedTicket.venue}</p>
                      <p className="text-zinc-400 text-[11px] font-mono">{formatDate(issuedTicket.eventDate)} • {issuedTicket.eventTime}</p>
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400">
                        <Check className="w-3 h-3" /> Gate Scan Active
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quick Pass Actions */}
                <div className="space-y-2 pt-2">
                  <Button
                    size="sm"
                    variant="gold"
                    onClick={onViewMyTickets}
                    leftIcon={<Ticket className="w-4 h-4" />}
                    className="w-full font-bold cursor-pointer"
                  >
                    View in My Passes Dashboard
                  </Button>

                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      size="sm"
                      variant="glass"
                      onClick={handleDownloadPass}
                      leftIcon={<Download className="w-3.5 h-3.5" />}
                      className="text-xs cursor-pointer"
                    >
                      Download Pass
                    </Button>
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                        `${event.location.venue}, ${event.location.address}, ${event.location.city}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Navigation className="w-3.5 h-3.5 text-[#E5A93C]" />
                      <span>GPS Route</span>
                    </a>
                  </div>

                  <button
                    onClick={() => {
                      setCheckoutStep('tier');
                      setIssuedTicket(null);
                    }}
                    className="text-xs font-mono text-zinc-400 hover:text-white pt-2 inline-block cursor-pointer"
                  >
                    + Purchase Additional Tickets
                  </button>
                </div>

              </div>
            )}

          </div>
        </div>

      </div>

      {/* Event Tags */}
      {event.tags && event.tags.length > 0 && (
        <div className="mt-12 pt-6 border-t border-white/8">
          <span className="text-xs font-mono uppercase text-zinc-400 block mb-2.5">Related Tags:</span>
          <div className="flex flex-wrap gap-2">
            {event.tags.map((tag, idx) => (
              <span 
                key={idx} 
                className="text-xs font-mono px-3 py-1 rounded-lg bg-[#141420] text-zinc-300 border border-white/8 hover:border-[#E5A93C]/40 transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Related / More Curated Experiences */}
      {relatedEvents.length > 0 && (
        <div className="mt-16 pt-10 border-t border-white/10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-[10px] sm:text-xs font-mono uppercase text-[#E5A93C] tracking-widest block mb-1">
                More in {event.category} & {event.location.city}
              </span>
              <h3 className="text-xl sm:text-2xl font-black font-serif text-white">
                You Might Also Like
              </h3>
            </div>
            <button
              onClick={onBack}
              className="text-xs font-mono text-[#E5A93C] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>View All Events</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedEvents.map((relEvent) => (
              <EventCard
                key={relEvent.id}
                event={relEvent}
                currency={currency}
                isSaved={false}
                onToggleSave={onToggleSave}
                onSelectEvent={onSelectRelatedEvent}
                onQuickBuy={(ev) => onSelectRelatedEvent(ev)}
              />
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
