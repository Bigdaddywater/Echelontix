import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Ticket, 
  CreditCard, 
  ShieldCheck, 
  CheckCircle2, 
  Plus, 
  Minus, 
  QrCode, 
  Download, 
  Calendar, 
  MapPin, 
  Sparkles,
  ArrowRight,
  User,
  Mail,
  Phone,
  Lock,
  Zap,
  Check,
  Navigation,
  ExternalLink
} from 'lucide-react';
import { EventItem, TicketTier, PurchasedTicket } from '../../types';
import { formatNaira, formatUSD, formatDate } from '../../utils/formatters';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Badge } from '../ui/Badge';

export interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: EventItem | null;
  selectedTierId?: string;
  currency: 'NGN' | 'USD';
  onTicketPurchased: (ticket: PurchasedTicket, optionalAccountCreated?: { name: string; email: string; phone: string }) => void;
  onViewMyTickets: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  event,
  selectedTierId,
  currency,
  onTicketPurchased,
  onViewMyTickets,
}) => {
  if (!event) return null;

  const defaultTier = event.ticketTiers.find((t) => t.id === selectedTierId) || event.ticketTiers[0];
  const [selectedTier, setSelectedTier] = useState<TicketTier>(defaultTier);
  const [quantity, setQuantity] = useState(1);
  const [step, setStep] = useState<'details' | 'payment' | 'success'>('details');
  const [isProcessing, setIsProcessing] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    campusMatric: '',
  });

  // Optional account creation
  const [createAccountOptional, setCreateAccountOptional] = useState(false);
  const [optionalPassword, setOptionalPassword] = useState('');

  const [paymentProvider, setPaymentProvider] = useState<'paystack' | 'flutterwave' | 'card' | 'transfer'>('paystack');
  const [createdTicket, setCreatedTicket] = useState<PurchasedTicket | null>(null);

  // Sync selected tier if prop changes
  React.useEffect(() => {
    if (selectedTierId) {
      const found = event.ticketTiers.find((t) => t.id === selectedTierId);
      if (found) setSelectedTier(found);
    } else {
      setSelectedTier(event.ticketTiers[0]);
    }
    setStep('details');
  }, [selectedTierId, event]);

  const subtotal = selectedTier.price * quantity;
  const serviceFee = 0; // 0% fee promotion
  const total = subtotal + serviceFee;

  const formattedTotal = currency === 'NGN' ? formatNaira(total) : formatUSD(total);

  const handlePay = () => {
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const buyerName = formData.fullName.trim() || 'Guest Passholder';
      const buyerEmail = formData.email.trim() || 'guest@echelontix.com';
      const buyerPhone = formData.phone.trim() || '+234 800 000 0000';

      const newTicket: PurchasedTicket = {
        ticketId: `ECH-${Math.floor(100000 + Math.random() * 900000)}`,
        orderId: `ORD-${Date.now().toString().slice(-6)}`,
        eventId: event.id,
        eventTitle: event.title,
        eventImage: event.image,
        eventDate: event.date,
        eventTime: event.time,
        venue: event.location.venue,
        city: event.location.city,
        tierName: selectedTier.name,
        pricePaid: total,
        quantity,
        holderName: buyerName,
        holderEmail: buyerEmail,
        holderPhone: buyerPhone,
        qrCodeValue: `ECHELON-PASS:${event.id}:${selectedTier.id}:${Date.now()}`,
        purchaseDate: new Date().toISOString(),
        status: 'valid',
        seatNumber: selectedTier.name.includes('Table') ? 'Table VIP-04' : undefined
      };

      setCreatedTicket(newTicket);
      
      const optionalAccount = createAccountOptional && optionalPassword.length >= 6 ? {
        name: buyerName,
        email: buyerEmail,
        phone: buyerPhone
      } : undefined;

      onTicketPurchased(newTicket, optionalAccount);
      setStep('success');

      // Trigger Celebration Confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#E5A93C', '#FDE68A', '#FFFFFF', '#9E7019']
        });
      } catch {
        // Safe fallback
      }
    }, 1200);
  };

  const isFormValid = formData.fullName.trim().length > 1 && formData.email.includes('@');

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={step === 'success' ? 'VIP Pass Issued' : 'Instant Guest Checkout'}
      subtitle={step === 'success' ? 'Your ticket is live and verified' : event.title}
      maxWidth="2xl"
    >
      {step === 'details' && (
        <div className="space-y-6">
          
          {/* Guest Checkout Assurance Banner */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-[#E5A93C]/10 border border-[#E5A93C]/30 text-xs">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#E5A93C] shrink-0 fill-[#E5A93C]" />
              <span className="text-zinc-200">
                <strong className="text-[#FDE68A]">No login required.</strong> Complete your purchase as a guest in under 60 seconds.
              </span>
            </div>
            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-md bg-[#E5A93C]/20 text-[#FDE68A] font-bold hidden sm:inline-block">
              Guest Mode
            </span>
          </div>

          {/* Ticket Tier Selector */}
          <div>
            <label className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 block mb-3">
              1. Select Ticket Category
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {event.ticketTiers.map((tier) => {
                const isSelected = selectedTier.id === tier.id;
                const formattedPrice = currency === 'NGN' ? formatNaira(tier.price) : formatUSD(tier.price);
                return (
                  <div
                    key={tier.id}
                    onClick={() => setSelectedTier(tier)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-[#181826] border-[#E5A93C] shadow-md shadow-[#E5A93C]/10 ring-1 ring-[#E5A93C]'
                        : 'bg-[#101018] border-white/8 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-bold text-white font-serif">{tier.name}</span>
                      <span className="text-xs font-mono font-extrabold text-[#FDE68A]">{formattedPrice}</span>
                    </div>
                    <p className="text-[11px] text-zinc-400 line-clamp-2 leading-relaxed mb-2">
                      {tier.description}
                    </p>
                    <div className="text-[10px] text-zinc-500 font-mono flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      {tier.available} passes left
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-[#101018] border border-white/8">
            <div>
              <span className="text-xs font-bold text-white block">Number of Tickets</span>
              <span className="text-[11px] text-zinc-400">Max 6 tickets per order</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white disabled:opacity-30 cursor-pointer"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-base font-mono font-bold text-white min-w-5 text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(Math.min(6, quantity + 1))}
                disabled={quantity >= 6}
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white disabled:opacity-30 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Contact Details for Ticket Delivery */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 block">
                2. Ticket Delivery Details
              </label>
              <span className="text-[11px] text-zinc-500 font-mono">
                Passes sent instantly via Email & SMS
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                label="Full Name"
                placeholder="e.g. Chukwuebuka Stephen"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                leftIcon={<User className="w-4 h-4" />}
                required
              />
              <Input
                label="Email (For Digital Pass & Apple Wallet)"
                type="email"
                placeholder="youremail@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                leftIcon={<Mail className="w-4 h-4" />}
                required
              />
              <Input
                label="Phone / WhatsApp Number (For SMS Pass)"
                placeholder="+234 812 345 6789"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                leftIcon={<Phone className="w-4 h-4" />}
              />
              {event.category === 'Campus' ? (
                <Input
                  label="Student Matric / ID (Optional)"
                  placeholder="e.g. 190404022"
                  value={formData.campusMatric}
                  onChange={(e) => setFormData({ ...formData, campusMatric: e.target.value })}
                />
              ) : (
                <div className="flex items-center p-3 rounded-xl bg-white/5 border border-white/8 text-xs text-zinc-400">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mr-2" />
                  <span>Encrypted Anti-Scalp QR token generated automatically upon payment.</span>
                </div>
              )}
            </div>
          </div>

          {/* Optional Account Creation Box */}
          <div className="p-4 rounded-2xl bg-[#10101A] border border-white/10 space-y-3">
            <div 
              onClick={() => setCreateAccountOptional(!createAccountOptional)}
              className="flex items-start gap-3 cursor-pointer select-none"
            >
              <div className={`w-5 h-5 rounded-md mt-0.5 flex items-center justify-center border transition-all ${
                createAccountOptional 
                  ? 'bg-[#E5A93C] border-[#E5A93C] text-black' 
                  : 'bg-white/5 border-white/20 hover:border-white/40'
              }`}>
                {createAccountOptional && <Check className="w-3.5 h-3.5 stroke-3" />}
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold text-white flex items-center gap-1.5">
                  <span>Create an optional account with this email</span>
                  <span className="text-[10px] text-zinc-400 font-normal">(100% Optional)</span>
                </p>
                <p className="text-[11px] text-zinc-400 mt-0.5">
                  Allows you to manage refunds, access passes across multiple phones, and receive backstage notifications.
                </p>
              </div>
            </div>

            {createAccountOptional && (
              <div className="pt-2">
                <Input
                  label="Set Account Password"
                  type="password"
                  placeholder="Minimum 6 characters"
                  value={optionalPassword}
                  onChange={(e) => setOptionalPassword(e.target.value)}
                  leftIcon={<Lock className="w-4 h-4" />}
                />
              </div>
            )}
          </div>

          {/* Continue to Payment Button */}
          <div className="pt-4 border-t border-white/8 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-zinc-400 uppercase font-mono block">Total</span>
              <span className="text-xl font-extrabold text-white font-mono">{formattedTotal}</span>
            </div>

            <Button
              id="checkout-proceed-to-pay-btn"
              size="lg"
              variant="gold"
              disabled={!isFormValid}
              onClick={() => setStep('payment')}
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="font-bold px-8 disabled:opacity-40"
            >
              Continue to Payment
            </Button>
          </div>

        </div>
      )}

      {step === 'payment' && (
        <div className="space-y-6">
          {/* Order Summary Recap */}
          <div className="p-4 rounded-2xl bg-[#101018] border border-white/8 space-y-2 text-xs">
            <div className="flex items-center justify-between text-zinc-300">
              <span>{event.title} ({quantity}x {selectedTier.name})</span>
              <span className="font-mono font-bold text-white">{formattedTotal}</span>
            </div>
            <div className="flex items-center justify-between text-emerald-400">
              <span>Guest Checkout Service Fee</span>
              <span className="font-mono font-bold">₦0 (Waived)</span>
            </div>
            <div className="pt-2 border-t border-white/8 flex items-center justify-between text-sm font-bold text-white">
              <span>Total Payable</span>
              <span className="text-[#FDE68A] font-mono text-base">{formattedTotal}</span>
            </div>
          </div>

          {/* Payment Gateways Selection (Tailored for Nigerian ecosystem) */}
          <div>
            <label className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 block mb-3">
              Select Payment Method
            </label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: 'paystack', name: 'Paystack', desc: 'Card, USSD, Bank Transfer, Apple Pay', tag: 'Fastest ⚡' },
                { id: 'flutterwave', name: 'Flutterwave', desc: 'OPay, Barter, Kuda, Cards', tag: 'Multi-Currency' },
                { id: 'card', name: 'Mastercard / Visa / Verve', desc: 'Direct 3D-Secure 2.0', tag: 'Instant' },
                { id: 'transfer', name: 'Instant Bank Transfer', desc: 'Direct Dynamic Account', tag: 'Auto-verify' },
              ].map((provider) => (
                <div
                  key={provider.id}
                  onClick={() => setPaymentProvider(provider.id as any)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    paymentProvider === provider.id
                      ? 'bg-[#181826] border-[#E5A93C] ring-1 ring-[#E5A93C]'
                      : 'bg-[#101018] border-white/8 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-white">{provider.name}</span>
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#E5A93C]/20 text-[#FDE68A] font-mono font-bold">
                      {provider.tag}
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-400 leading-tight">{provider.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Anti-fraud banner */}
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>Encrypted guest transaction. Passes are guaranteed valid and backed by escrow.</span>
          </div>

          {/* Action Row */}
          <div className="pt-4 border-t border-white/8 flex items-center justify-between">
            <Button
              size="md"
              variant="ghost"
              onClick={() => setStep('details')}
            >
              Back
            </Button>

            <Button
              id="checkout-confirm-pay-btn"
              size="lg"
              variant="gold"
              isLoading={isProcessing}
              onClick={handlePay}
              className="font-bold px-8"
            >
              Pay {formattedTotal}
            </Button>
          </div>
        </div>
      )}

      {step === 'success' && createdTicket && (
        <div className="space-y-6 text-center">
          
          {/* Success Indicator */}
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20 animate-bounce">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div>
            <h3 className="text-2xl font-bold font-serif text-white">
              You're Going To {event.title}!
            </h3>
            <p className="text-xs text-zinc-400 mt-1">
              Order #{createdTicket.orderId} • Sent to <span className="text-white font-semibold">{createdTicket.holderEmail}</span>
            </p>
          </div>

          {/* Luxury Apple-Wallet Style Digital Pass Preview */}
          <div className="relative max-w-sm mx-auto bg-linear-to-b from-[#161622] via-[#0F0F17] to-[#0A0A0F] rounded-3xl border border-[#E5A93C]/40 p-6 shadow-2xl text-left overflow-hidden">
            
            {/* Top gold bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gold-metallic" />

            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="font-serif font-black tracking-widest text-xs text-white">ECHELONTIX</span>
                <span className="text-[10px] px-2 py-0.5 bg-[#E5A93C]/20 text-[#FDE68A] rounded-full font-mono">PASS</span>
              </div>
              <span className="text-xs font-mono font-bold text-zinc-400">{createdTicket.ticketId}</span>
            </div>

            <div className="my-4">
              <span className="text-[10px] text-zinc-500 uppercase font-mono tracking-wider">Event</span>
              <h4 className="text-base font-bold text-white font-serif line-clamp-1">{event.title}</h4>
              <p className="text-xs text-zinc-400 mt-0.5">📍 {event.location.venue}, {event.location.city}</p>
            </div>

            <div className="grid grid-cols-2 gap-2 my-3 text-xs bg-white/5 p-3 rounded-xl">
              <div>
                <span className="text-[10px] text-zinc-500 uppercase font-mono">Date & Time</span>
                <p className="font-semibold text-white">{formatDate(event.date)}</p>
                <p className="text-zinc-400">{event.time}</p>
              </div>
              <div>
                <span className="text-[10px] text-zinc-500 uppercase font-mono">Tier & Quantity</span>
                <p className="font-semibold text-[#FDE68A]">{createdTicket.quantity}x {createdTicket.tierName}</p>
                <p className="text-zinc-400">{createdTicket.holderName}</p>
              </div>
            </div>

            {/* Encrypted Simulated QR Code */}
            <div className="pt-3 border-t border-dashed border-white/20 flex flex-col items-center justify-center">
              <div className="bg-white p-3 rounded-2xl shadow-lg inline-block">
                <svg viewBox="0 0 100 100" className="w-24 h-24">
                  {/* Luxury Mock QR Code Pattern */}
                  <rect width="100" height="100" fill="white" />
                  <rect x="10" y="10" width="25" height="25" fill="black" />
                  <rect x="15" y="15" width="15" height="15" fill="white" />
                  <rect x="18" y="18" width="9" height="9" fill="black" />

                  <rect x="65" y="10" width="25" height="25" fill="black" />
                  <rect x="70" y="15" width="15" height="15" fill="white" />
                  <rect x="73" y="18" width="9" height="9" fill="black" />

                  <rect x="10" y="65" width="25" height="25" fill="black" />
                  <rect x="15" y="70" width="15" height="15" fill="white" />
                  <rect x="18" y="73" width="9" height="9" fill="black" />

                  {/* QR random data dots */}
                  <rect x="42" y="12" width="6" height="6" fill="black" />
                  <rect x="52" y="18" width="6" height="6" fill="black" />
                  <rect x="42" y="30" width="6" height="6" fill="black" />
                  <rect x="25" y="42" width="6" height="6" fill="black" />
                  <rect x="35" y="48" width="6" height="6" fill="black" />
                  <rect x="48" y="45" width="8" height="8" fill="#E5A93C" />
                  <rect x="62" y="42" width="6" height="6" fill="black" />
                  <rect x="72" y="48" width="6" height="6" fill="black" />
                  <rect x="42" y="65" width="6" height="6" fill="black" />
                  <rect x="55" y="72" width="6" height="6" fill="black" />
                  <rect x="68" y="68" width="6" height="6" fill="black" />
                  <rect x="78" y="80" width="6" height="6" fill="black" />
                </svg>
              </div>
              <span className="text-[10px] text-zinc-500 font-mono mt-2 tracking-widest uppercase">
                Dynamic Encrypted Gate Pass
              </span>
            </div>

            {/* Google Maps Directions Action Box */}
            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between gap-2 bg-black/40 p-2.5 rounded-xl">
              <div className="flex items-center gap-2 text-left">
                <MapPin className="w-4 h-4 text-[#E5A93C] shrink-0" />
                <span className="text-[11px] text-zinc-300 truncate max-w-40 sm:max-w-xs">{event.location.venue}</span>
              </div>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                  `${event.location.venue}, ${event.location.address}, ${event.location.city}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 rounded-lg bg-[#E5A93C]/20 hover:bg-[#E5A93C]/30 text-[#FDE68A] border border-[#E5A93C]/40 text-[11px] font-mono font-bold flex items-center gap-1 transition-colors shrink-0 cursor-pointer"
              >
                <Navigation className="w-3 h-3" />
                <span>Directions</span>
                <ExternalLink className="w-2.5 h-2.5 opacity-70" />
              </a>
            </div>

          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Button
              id="view-in-wallet-btn"
              size="md"
              variant="gold"
              onClick={() => {
                onClose();
                onViewMyTickets();
              }}
              leftIcon={<Ticket className="w-4 h-4" />}
            >
              View In "My Passes"
            </Button>

            <Button
              size="md"
              variant="glass"
              onClick={onClose}
            >
              Done / Continue Exploring
            </Button>
          </div>

        </div>
      )}
    </Modal>
  );
};

