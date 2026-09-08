import React from 'react';
import { Home, Compass, Search, Heart, Ticket, User, QrCode } from 'lucide-react';
import { UserProfile } from '../../types';

export interface MobileNavProps {
  activeTab: string;
  onTabChange?: (tab: string) => void;
  onNavigate?: (tab: string) => void;
  savedCount?: number;
  ticketsCount?: number;
  currentUser?: UserProfile | null;
  onOpenSearch?: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  activeTab,
  onTabChange,
  onNavigate,
  savedCount = 0,
  ticketsCount = 0,
  currentUser = null,
  onOpenSearch,
}) => {
  const handleNav = (tab: string) => {
    if (onTabChange) onTabChange(tab);
    else if (onNavigate) onNavigate(tab);
  };

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#07070B]/95 backdrop-blur-2xl border-t border-white/10 px-2 py-2 safe-area-pb">
      <div className="flex items-center justify-around">
        {/* Home */}
        <button
          id="mobile-nav-home"
          onClick={() => handleNav('home')}
          className={`flex flex-col items-center justify-center p-1.5 min-w-14 transition-colors cursor-pointer ${
            activeTab === 'home' ? 'text-[#E5A93C]' : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-medium mt-1">Discover</span>
        </button>

        {/* Explore */}
        <button
          id="mobile-nav-explore"
          onClick={() => handleNav('explore')}
          className={`flex flex-col items-center justify-center p-1.5 min-w-14 transition-colors cursor-pointer ${
            activeTab === 'explore' ? 'text-[#E5A93C]' : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <Compass className="w-5 h-5" />
          <span className="text-[10px] font-medium mt-1">Explore</span>
        </button>

        {/* Floating Search Center */}
        <button
          id="mobile-nav-search"
          onClick={() => {
            if (onOpenSearch) onOpenSearch();
            else handleNav('explore');
          }}
          className="flex flex-col items-center justify-center p-1.5 -mt-4 cursor-pointer"
        >
          <div className="w-11 h-11 rounded-full bg-linear-to-tr from-[#E5A93C] to-[#FDE68A] text-black flex items-center justify-center shadow-lg shadow-[#E5A93C]/30 border-2 border-[#07070B]">
            <Search className="w-5 h-5 stroke-[2.5]" />
          </div>
          <span className="text-[10px] font-bold text-[#E5A93C] mt-1">Search</span>
        </button>

        {/* Organizer */}
        <button
          id="mobile-nav-organizer"
          onClick={() => handleNav('organizer')}
          className={`flex flex-col items-center justify-center p-1.5 min-w-14 transition-colors cursor-pointer ${
            activeTab === 'organizer' ? 'text-[#E5A93C]' : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <QrCode className="w-5 h-5" />
          <span className="text-[10px] font-medium mt-1">Host/Scan</span>
        </button>

        {/* Passes / Profile */}
        <button
          id="mobile-nav-tickets"
          onClick={() => handleNav('my-tickets')}
          className={`relative flex flex-col items-center justify-center p-1.5 min-w-14 transition-colors cursor-pointer ${
            activeTab === 'my-tickets' ? 'text-[#E5A93C]' : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <Ticket className="w-5 h-5" />
          {ticketsCount > 0 && (
            <span className="absolute top-1 right-3 w-4 h-4 rounded-full bg-[#E5A93C] text-black text-[9px] font-bold flex items-center justify-center">
              {ticketsCount}
            </span>
          )}
          <span className="text-[10px] font-medium mt-1">My Passes</span>
        </button>
      </div>
    </nav>
  );
};
