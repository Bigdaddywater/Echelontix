import React from 'react';
import { 
  Instagram, 
  Twitter, 
  Linkedin, 
  Youtube, 
  ArrowUpRight, 
  ShieldCheck, 
  Sparkles,
  MapPin,
  Mail,
  Phone,
  QrCode,
  Lock,
  Ticket
} from 'lucide-react';

export interface FooterProps {
  onNavigate: (tab: string) => void;
  onOpenCreateEvent?: () => void;
  onOpenAuth?: () => void;
  onOpenScanner?: () => void;
  onOpenCommunity?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenCreateEvent = () => onNavigate('create-event'),
  onOpenAuth = () => onNavigate('login'),
  onOpenScanner = () => onNavigate('gate-scanner'),
  onOpenCommunity = () => onNavigate('community'),
}) => {
  return (
    <footer className="bg-[#050508] text-zinc-400 border-t border-white/8 pt-16 pb-24 lg:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/8">
          
          {/* Col 1 & 2: Brand Identity */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-3 text-left group cursor-pointer w-fit"
            >
              <div className="w-10 h-10 rounded-xl bg-linear-to-br from-[#1A1A24] to-[#0A0A0E] border border-[#E5A93C]/50 p-2 flex items-center justify-center shadow-lg shadow-[#E5A93C]/10 group-hover:border-[#E5A93C] transition-all">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <defs>
                    <linearGradient id="goldFoot" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FDE68A" />
                      <stop offset="50%" stopColor="#E5A93C" />
                      <stop offset="100%" stopColor="#9E7019" />
                    </linearGradient>
                  </defs>
                  <path d="M50 16L78 34L50 52L22 34Z" fill="url(#goldFoot)" opacity="0.95" />
                  <path d="M50 38L78 56L50 74L22 56Z" fill="url(#goldFoot)" opacity="0.75" />
                  <path d="M50 60L78 78L50 96L22 78Z" fill="url(#goldFoot)" opacity="0.55" />
                </svg>
              </div>
              <span className="font-serif text-2xl font-extrabold tracking-[0.16em] text-white">
                ECHELON<span className="text-[#E5A93C]">TIX</span>
              </span>
            </button>

            <p className="text-sm text-zinc-400 max-w-sm leading-relaxed">
              We elevate experiences. The premier live entertainment, campus festival, and VIP ticketing ecosystem crafted for Nigeria, Ghana, and the global African diaspora.
            </p>

            {/* Badges / Guarantees */}
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 bg-white/5 border border-white/10 rounded-lg text-zinc-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Anti-Scalp QR Dynamic Token
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 bg-white/5 border border-white/10 rounded-lg text-zinc-300">
                <Sparkles className="w-3.5 h-3.5 text-[#E5A93C]" />
                Direct Settlement Engine
              </span>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-3">
              {[
                { icon: Twitter, href: 'https://twitter.com', label: 'X / Twitter' },
                { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
                { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
                { icon: Youtube, href: 'https://youtube.com', label: 'YouTube' },
              ].map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={item.label}
                  className="w-9 h-9 rounded-xl bg-white/5 hover:bg-[#E5A93C]/20 border border-white/10 hover:border-[#E5A93C]/60 text-zinc-300 hover:text-[#E5A93C] flex items-center justify-center transition-all cursor-pointer"
                >
                  <item.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Col 3: Discover Experiences */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-mono">
              Discover Experiences
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li>
                <button onClick={() => onNavigate('explore')} className="hover:text-[#E5A93C] transition-colors cursor-pointer text-left">
                  Concerts & Live Festivals
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('explore')} className="hover:text-[#E5A93C] transition-colors cursor-pointer text-left">
                  Lagos Nightlife & Beach Raves
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('community')} className="hover:text-[#E5A93C] transition-colors cursor-pointer text-left flex items-center gap-1">
                  <span>Campus Soundclash</span>
                  <span className="text-[10px] px-1.5 py-0.2 bg-[#E5A93C]/20 text-[#FDE68A] rounded font-bold">Unilag/Covenant</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('explore')} className="hover:text-[#E5A93C] transition-colors cursor-pointer text-left">
                  VIP Dining & Rooftops
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('my-tickets')} className="hover:text-[#E5A93C] transition-colors cursor-pointer text-left flex items-center gap-1.5 text-zinc-300">
                  <Ticket className="w-3.5 h-3.5 text-[#E5A93C]" />
                  <span>My Passes & Wishlist</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: For Organizers & Crew */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-mono">
              Organizers & Staff
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li>
                <button onClick={onOpenCreateEvent} className="hover:text-[#E5A93C] transition-colors cursor-pointer text-left flex items-center gap-1 font-semibold text-zinc-200">
                  <span>List An Event</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#E5A93C]" />
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('organizer')} className="hover:text-[#E5A93C] transition-colors cursor-pointer text-left">
                  Organizer Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('gate-scanner')} className="hover:text-[#E5A93C] transition-colors cursor-pointer text-left flex items-center gap-1">
                  <QrCode className="w-3.5 h-3.5 text-blue-400" />
                  <span>Gate Marshal Scanner</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('admin')} className="hover:text-[#E5A93C] transition-colors cursor-pointer text-left flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                  <span>Platform Admin Center</span>
                </button>
              </li>
              <li>
                <button onClick={onOpenAuth} className="hover:text-[#E5A93C] transition-colors cursor-pointer text-left flex items-center gap-1 text-zinc-400">
                  <Lock className="w-3.5 h-3.5" />
                  <span>Promoter Auth Portal</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Hub Locations & Support */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-mono">
              Hubs & Concierge
            </h4>
            <div className="flex flex-col gap-2 text-xs text-zinc-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#E5A93C] shrink-0 mt-0.5" />
                <span>Admiralty Way, Lekki Phase 1, Lagos, Nigeria</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#E5A93C] shrink-0" />
                <span>concierge@echelontix.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#E5A93C] shrink-0" />
                <span>+234 (0) 800 ECHELON</span>
              </div>
            </div>

            <div className="pt-2">
              <span className="text-[11px] text-zinc-500 block mb-1 font-mono uppercase">Operating Hubs:</span>
              <div className="flex flex-wrap gap-1.5">
                {['🇳🇬 Lagos', '🇳🇬 Abuja', '🇳🇬 Port Harcourt', '🇬🇭 Accra', '🇬🇧 London'].map((city, idx) => (
                  <span key={idx} className="text-[11px] px-2 py-0.5 bg-white/5 border border-white/10 rounded-md text-zinc-300">
                    {city}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} Echelontix Inc. All rights reserved. Elevating African live entertainment.</p>
          <div className="flex items-center gap-6">
            <button onClick={() => onNavigate('home')} className="hover:text-zinc-300 transition-colors">Privacy</button>
            <button onClick={() => onNavigate('home')} className="hover:text-zinc-300 transition-colors">Terms</button>
            <button onClick={() => onNavigate('gate-scanner')} className="hover:text-zinc-300 transition-colors">Door Marshal</button>
            <button onClick={() => onNavigate('admin')} className="hover:text-zinc-300 transition-colors">Security</button>
          </div>
        </div>

      </div>
    </footer>
  );
};
