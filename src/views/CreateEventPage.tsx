import React, { useState } from 'react';
import { 
  Sparkles, 
  Plus, 
  Trash2, 
  UploadCloud, 
  Building2, 
  ArrowRight, 
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2
} from 'lucide-react';
import { EventCategory, EventItem, TicketTier } from '../types';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export interface CreateEventPageProps {
  onEventCreated: (newEvent: EventItem) => void;
  onNavigate: (route: string) => void;
}

export const CreateEventPage: React.FC<CreateEventPageProps> = ({
  onEventCreated,
  onNavigate,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    organizerName: 'Echelon Live Productions',
    bankName: 'Guaranty Trust Bank (GTBank)',
    accountNumber: '0123456789',
    accountName: 'ECHELON ENTERTAINMENT LTD',
  });

  const [tiers, setTiers] = useState<TicketTier[]>([
    {
      id: 'tier-reg',
      name: 'Regular Admission',
      price: 10000,
      description: 'Standard access to dance deck and open cocktail bars.',
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
  ];

  const handleAddTier = () => {
    const newTier: TicketTier = {
      id: `tier-${Date.now()}`,
      name: 'VIP Table for 6',
      price: 180000,
      description: 'Reserved couch with private host & champagne.',
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
        id: `event-${Date.now()}`,
        slug: (formData.title || 'event').toLowerCase().replace(/[^\w\s]/gi, '').replace(/\s+/g, '-'),
        title: formData.title || "The Midnight Frequency: Lagos",
        tagline: formData.tagline || 'Experience the pinnacle of live rhythm and luxury.',
        description: formData.description || 'An exclusive gathering of sound, culture, and high vibrations in Nigeria.',
        category: formData.category,
        image: formData.image,
        galleryImages: [],
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
          followersCount: 200,
          eventsHosted: 1
        },
        rating: 5.0,
        reviewsCount: 0,
        attendeesCount: 0,
        maxCapacity: tiers.reduce((acc, t) => acc + t.total, 0),
        isFeatured: true,
        isTrending: true,
        tags: ['New', formData.category, formData.city],
      };

      onEventCreated(createdEvent);
      onNavigate('organizer');
    }, 1000);
  };

  return (
    <div className="pt-28 pb-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="mb-8 text-center sm:text-left">
        <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-mono uppercase text-[#E5A93C] tracking-widest mb-1.5">
          <Sparkles className="w-4 h-4" />
          <span>Promoter Launchpad</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black font-serif text-white tracking-tight">
          CREATE YOUR EVENT <span className="text-gold-metallic">IN 5 MINUTES</span>
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 mt-1">
          Set up ticket tiers, zero setup fees, and instant bank settlements via Paystack/Flutterwave
        </p>
      </div>

      {/* Step Indicators */}
      <div className="grid grid-cols-4 gap-2 mb-8">
        {[
          { num: 1, label: 'Event Details' },
          { num: 2, label: 'Media & Cover' },
          { num: 3, label: 'Ticket Tiers' },
          { num: 4, label: 'Bank Payout' },
        ].map((s) => (
          <div
            key={s.num}
            className={`p-3 rounded-2xl text-center border transition-all ${
              step === s.num
                ? 'bg-[#E5A93C]/15 border-[#E5A93C] text-[#FDE68A] shadow-md shadow-[#E5A93C]/10'
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

      {/* Step Content Container */}
      <div className="bg-[#0E0E18] rounded-3xl border border-white/10 p-6 sm:p-10 shadow-2xl space-y-6">
        
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
                  className="w-full bg-[#161622] text-white rounded-xl border border-white/10 p-3 text-xs focus:border-[#E5A93C] focus:outline-none"
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
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block mb-2">
                Event Cover Image Preview
              </label>
              <div className="relative h-56 rounded-2xl overflow-hidden border border-white/15 mb-4">
                <img
                  src={formData.image}
                  alt="Cover Preview"
                  className="w-full h-full object-cover"
                />
              </div>

              <Input
                label="Custom Image URL"
                placeholder="https://images.unsplash.com/..."
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                leftIcon={<UploadCloud className="w-4 h-4" />}
              />
            </div>

            <div>
              <label className="text-xs font-mono uppercase text-zinc-400 block mb-2">
                Or Select A High-Resolution Luxury Preset
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
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

            <div className="space-y-3">
              {tiers.map((tier, idx) => (
                <div key={tier.id} className="p-4 rounded-2xl bg-[#141422] border border-white/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#E5A93C]">Tier #{idx + 1}</span>
                    {tiers.length > 1 && (
                      <button onClick={() => handleRemoveTier(idx)} className="text-zinc-500 hover:text-rose-400 p-1">
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
                  className="w-full bg-[#161622] text-white rounded-xl border border-white/10 p-3 text-xs focus:border-[#E5A93C] focus:outline-none"
                >
                  <option value="Guaranty Trust Bank (GTBank)">Guaranty Trust Bank (GTBank)</option>
                  <option value="Access Bank">Access Bank</option>
                  <option value="Zenith Bank">Zenith Bank</option>
                  <option value="Kuda Microfinance Bank">Kuda Microfinance Bank</option>
                  <option value="Moniepoint MFB">Moniepoint MFB</option>
                  <option value="OPay">OPay Digital Services</option>
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

        {/* Action Buttons */}
        <div className="pt-6 border-t border-white/8 flex items-center justify-between">
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
              Continue
            </Button>
          ) : (
            <Button
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

    </div>
  );
};
