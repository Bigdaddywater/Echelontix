import React, { useState } from 'react';
import { 
  Sparkles, 
  Calendar, 
  Clock, 
  MapPin, 
  Ticket, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  UploadCloud, 
  Building2,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import { EventCategory, EventItem, TicketTier } from '../../types';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { formatNaira } from '../../utils/formatters';

export interface CreateEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEventCreated: (newEvent: EventItem) => void;
}

export const CreateEventModal: React.FC<CreateEventModalProps> = ({
  isOpen,
  onClose,
  onEventCreated,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    tagline: '',
    description: '',
    category: 'Nightlife' as EventCategory,
    date: '2026-12-19',
    time: '08:00 PM WAT',
    venue: '',
    city: 'Lagos',
    state: 'Lagos State',
    address: '',
    isCampus: false,
    campusName: '',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1200&auto=format&fit=crop',
    organizerName: 'Echelon Live',
    bankName: 'Guaranty Trust Bank (GTBank)',
    accountNumber: '0123456789',
    accountName: 'ECHELON ENTERTAINMENT LTD',
  });

  const [tiers, setTiers] = useState<TicketTier[]>([
    {
      id: 'tier-reg',
      name: 'Regular Admission',
      price: 10000,
      description: 'Standard access to dance deck and open bar.',
      available: 300,
      total: 300,
      perks: ['Fast-track digital QR entry', 'General access'],
      isPopular: true
    },
    {
      id: 'tier-vip',
      name: 'VIP Golden Circle',
      price: 25000,
      description: 'Elevated mezzanine lounge with private bar.',
      available: 50,
      total: 50,
      perks: ['VIP mezzanine', '2 Drink vouchers', 'Valet parking'],
      isPopular: false
    }
  ]);

  const presetImages = [
    { label: 'Rave & Lights', url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1200&auto=format&fit=crop' },
    { label: 'Stadium Concert', url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1200&auto=format&fit=crop' },
    { label: 'Campus Rave', url: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=1200&auto=format&fit=crop' },
    { label: 'VIP Rooftop', url: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1200&auto=format&fit=crop' },
    { label: 'Tech Summit', url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200&auto=format&fit=crop' },
  ];

  const handleAddTier = () => {
    const newTier: TicketTier = {
      id: `tier-${Date.now()}`,
      name: 'Table for 6',
      price: 150000,
      description: 'Exclusive sofa lounge with bottle service.',
      available: 10,
      total: 10,
      perks: ['Table service', '1 Premium Champagne', 'Express VIP line']
    };
    setTiers([...tiers, newTier]);
  };

  const handleRemoveTier = (idx: number) => {
    setTiers(tiers.filter((_, i) => i !== idx));
  };

  const handleFinalSubmit = () => {
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);

      const minPrice = tiers.length > 0 ? Math.min(...tiers.map(t => t.price)) : 5000;

      const createdEvent: EventItem = {
        id: `custom-event-${Date.now()}`,
        slug: formData.title.toLowerCase().replace(/[^\w\s]/gi, '').replace(/\s+/g, '-'),
        title: formData.title || "The Midnight Frequency: Lagos",
        tagline: formData.tagline || 'Experience the pinnacle of live rhythm and luxury.',
        description: formData.description || 'An exclusive gathering of sound, culture, and high vibrations in the heart of Nigeria.',
        category: formData.category,
        image: formData.image,
        galleryImages: [
          'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop'
        ],
        date: formData.date,
        time: formData.time,
        doorsOpen: '07:30 PM',
        location: {
          venue: formData.venue || 'The Grand Marquee, Victoria Island',
          city: formData.city,
          state: formData.state,
          country: 'Nigeria',
          address: formData.address || 'Victoria Island, Lagos',
          isCampus: formData.isCampus,
          campusName: formData.isCampus ? formData.campusName : undefined,
        },
        startingPrice: minPrice,
        ticketTiers: tiers,
        organizer: {
          id: `org-${Date.now()}`,
          name: formData.organizerName,
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
          verified: true,
          rating: 5.0,
          followersCount: 120,
          eventsHosted: 1
        },
        rating: 5.0,
        reviewsCount: 0,
        attendeesCount: 0,
        maxCapacity: tiers.reduce((acc, t) => acc + t.total, 0),
        isFeatured: true,
        isTrending: true,
        tags: ['NewEvent', formData.category, formData.city],
      };

      onEventCreated(createdEvent);
      onClose();
    }, 1200);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create An Event"
      subtitle={`Step ${step} of 4 • Launch in under 5 minutes`}
      maxWidth="3xl"
    >
      <div className="space-y-6">
        
        {/* Step Indicator Bar */}
        <div className="grid grid-cols-4 gap-2">
          {[
            { num: 1, label: 'Basics' },
            { num: 2, label: 'Media' },
            { num: 3, label: 'Tickets' },
            { num: 4, label: 'Payout' },
          ].map((s) => (
            <div
              key={s.num}
              className={`p-2 rounded-xl text-center border transition-all ${
                step === s.num
                  ? 'bg-[#E5A93C]/15 border-[#E5A93C] text-[#FDE68A]'
                  : step > s.num
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                  : 'bg-white/5 border-white/8 text-zinc-500'
              }`}
            >
              <span className="text-[10px] font-mono block">STEP 0{s.num}</span>
              <span className="text-xs font-bold">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Step 1: Basics */}
        {step === 1 && (
          <div className="space-y-4">
            <Input
              label="Event Title"
              placeholder="e.g. FLOW D'ÉTAT : The Sovereign Rave"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />

            <Input
              label="Tagline / Short Hook"
              placeholder="e.g. Lagos most exclusive electronic Afro-house experience."
              value={formData.tagline}
              onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block mb-1.5">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as EventCategory })}
                  className="w-full bg-[#101018] text-white rounded-xl border border-white/10 p-3 text-sm focus:border-[#E5A93C] focus:outline-none"
                >
                  <option value="Nightlife">Nightlife & Raves</option>
                  <option value="Music">Music & Concerts</option>
                  <option value="Campus">Campus Life</option>
                  <option value="Tech">Tech & Summits</option>
                  <option value="Comedy">Comedy & Gala</option>
                  <option value="VIP & Luxury">VIP & Luxury</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block mb-1.5">
                  Host Organization
                </label>
                <Input
                  placeholder="e.g. Echelon Nightlife Collective"
                  value={formData.organizerName}
                  onChange={(e) => setFormData({ ...formData, organizerName: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                label="Event Date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
              <Input
                label="Doors Open / Time"
                placeholder="08:00 PM WAT"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                label="Venue Name"
                placeholder="e.g. The Monarch Dome"
                value={formData.venue}
                onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                leftIcon={<Building2 className="w-4 h-4" />}
              />
              <Input
                label="City / State"
                placeholder="e.g. Victoria Island, Lagos"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                leftIcon={<MapPin className="w-4 h-4" />}
              />
            </div>

            {/* Campus checkbox */}
            <div className="flex items-center gap-2 p-3 bg-white/5 rounded-xl border border-white/8">
              <input
                type="checkbox"
                id="isCampusToggle"
                checked={formData.isCampus}
                onChange={(e) => setFormData({ ...formData, isCampus: e.target.checked })}
                className="w-4 h-4 accent-[#E5A93C]"
              />
              <label htmlFor="isCampusToggle" className="text-xs text-zinc-300 cursor-pointer">
                Is this an official campus / student festival? (UNILAG, Covenant, UI, OAU, etc.)
              </label>
            </div>
          </div>
        )}

        {/* Step 2: Media */}
        {step === 2 && (
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block mb-2">
                Event Cover Image
              </label>
              <div className="relative h-48 rounded-2xl overflow-hidden border border-white/15 mb-4">
                <img
                  src={formData.image}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                  <span className="text-xs font-mono text-[#FDE68A]">Current Poster Preview</span>
                </div>
              </div>

              <Input
                label="Or Paste Custom Image URL"
                placeholder="https://images.unsplash.com/..."
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                leftIcon={<UploadCloud className="w-4 h-4" />}
              />
            </div>

            <div>
              <label className="text-xs font-mono uppercase text-zinc-400 block mb-2">
                Choose High-Res Luxury Presets
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {presetImages.map((p, idx) => (
                  <div
                    key={idx}
                    onClick={() => setFormData({ ...formData, image: p.url })}
                    className={`relative h-20 rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${
                      formData.image === p.url ? 'border-[#E5A93C] scale-105 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={p.url} alt={p.label} className="w-full h-full object-cover" />
                    <span className="absolute bottom-1 left-1 right-1 text-[9px] text-white font-mono bg-black/70 px-1 py-0.5 rounded text-center truncate">
                      {p.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Tickets */}
        {step === 3 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-white">Ticket Categories & Pricing</h4>
                <p className="text-xs text-zinc-400">Set multiple admission tiers for your guests</p>
              </div>

              <Button
                size="sm"
                variant="outline"
                onClick={handleAddTier}
                leftIcon={<Plus className="w-3.5 h-3.5" />}
              >
                Add Tier
              </Button>
            </div>

            <div className="space-y-3 max-h-80 overflow-y-auto custom-scrollbar pr-1">
              {tiers.map((tier, idx) => (
                <div key={tier.id} className="p-4 rounded-2xl bg-[#12121D] border border-white/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#E5A93C]">Tier #{idx + 1}</span>
                    {tiers.length > 1 && (
                      <button
                        onClick={() => handleRemoveTier(idx)}
                        className="text-zinc-500 hover:text-rose-400 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <Input
                      label="Tier Name"
                      value={tier.name}
                      onChange={(e) => {
                        const updated = [...tiers];
                        updated[idx].name = e.target.value;
                        setTiers(updated);
                      }}
                    />
                    <Input
                      label="Price (₦ NGN)"
                      type="number"
                      value={tier.price}
                      onChange={(e) => {
                        const updated = [...tiers];
                        updated[idx].price = Number(e.target.value);
                        setTiers(updated);
                      }}
                    />
                    <Input
                      label="Quantity Available"
                      type="number"
                      value={tier.available}
                      onChange={(e) => {
                        const updated = [...tiers];
                        updated[idx].available = Number(e.target.value);
                        updated[idx].total = Number(e.target.value);
                        setTiers(updated);
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Settlement Payout Details */}
        {step === 4 && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs">
              <span className="font-bold block text-emerald-200">⚡ Direct Bank Settlement Guarantee</span>
              Ticket revenue is deposited into your registered Nigerian bank account immediately as sales occur.
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block mb-1.5">
                  Select Settlement Bank
                </label>
                <select
                  value={formData.bankName}
                  onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                  className="w-full bg-[#101018] text-white rounded-xl border border-white/10 p-3 text-sm focus:border-[#E5A93C] focus:outline-none"
                >
                  <option value="Guaranty Trust Bank (GTBank)">Guaranty Trust Bank (GTBank)</option>
                  <option value="Access Bank">Access Bank</option>
                  <option value="Zenith Bank">Zenith Bank</option>
                  <option value="Kuda Microfinance Bank">Kuda Microfinance Bank</option>
                  <option value="Moniepoint MFB">Moniepoint MFB</option>
                  <option value="OPay">OPay Digital Services</option>
                  <option value="United Bank for Africa (UBA)">United Bank for Africa (UBA)</option>
                  <option value="First Bank of Nigeria">First Bank of Nigeria</option>
                </select>
              </div>

              <Input
                label="NUBAN Account Number (10 Digits)"
                placeholder="0123456789"
                maxLength={10}
                value={formData.accountNumber}
                onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
              />

              <Input
                label="Account Beneficiary Name"
                value={formData.accountName}
                onChange={(e) => setFormData({ ...formData, accountName: e.target.value })}
              />
            </div>
          </div>
        )}

        {/* Navigation Actions */}
        <div className="pt-4 border-t border-white/8 flex items-center justify-between">
          {step > 1 ? (
            <Button
              size="md"
              variant="ghost"
              onClick={() => setStep((step - 1) as 1 | 2 | 3 | 4)}
              leftIcon={<ArrowLeft className="w-4 h-4" />}
            >
              Previous
            </Button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <Button
              size="md"
              variant="gold"
              onClick={() => setStep((step + 1) as 1 | 2 | 3 | 4)}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Next Step
            </Button>
          ) : (
            <Button
              id="publish-event-btn"
              size="lg"
              variant="gold"
              isLoading={isSubmitting}
              onClick={handleFinalSubmit}
              leftIcon={<Sparkles className="w-4 h-4" />}
              className="font-bold px-8 shadow-xl shadow-[#E5A93C]/30"
            >
              Publish Event Live
            </Button>
          )}
        </div>

      </div>
    </Modal>
  );
};
