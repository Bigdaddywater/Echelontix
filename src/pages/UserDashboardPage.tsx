import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Ticket, 
  Heart, 
  Clock, 
  Calendar, 
  MapPin, 
  QrCode, 
  Download, 
  CreditCard, 
  User, 
  Sparkles, 
  Share2,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { EventItem, PurchasedTicket, UserProfile } from '../types';
import { formatNaira, formatUSD, formatDate } from '../utils/formatters';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { EventCard } from '../components/cards/EventCard';
import { EventCalendarView } from '../components/calendar/EventCalendarView';

export interface UserDashboardPageProps {
  currentUser: UserProfile | null;
  purchasedTickets: PurchasedTicket[];
  savedEvents: EventItem[];
  allEvents?: EventItem[];
  currency: 'NGN' | 'USD';
  onSelectEvent: (event: EventItem) => void;
  onQuickBuy: (event: EventItem) => void;
  onToggleSave: (id: string) => void;
  onOpenScanner: () => void;
}

export const UserDashboardPage: React.FC<UserDashboardPageProps> = ({
  currentUser,
  purchasedTickets,
  savedEvents,
  allEvents = [],
  currency,
  onSelectEvent,
  onQuickBuy,
  onToggleSave,
  onOpenScanner,
}) => {
  const [activeTab, setActiveTab] = useState<'tickets' | 'calendar' | 'saved' | 'history'>('tickets');
  const [selectedTicket, setSelectedTicket] = useState<PurchasedTicket | null>(
    purchasedTickets[0] || null
  );

  return (
    <div className="pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Profile Header Bar */}
      <div className="bg-[#0E0E16] rounded-3xl border border-white/10 p-6 sm:p-8 mb-8 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={currentUser?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop'}
              alt="User"
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-[#E5A93C]/60"
            />
            {!currentUser && (
              <span className="absolute -bottom-1 -right-1 text-[9px] px-1.5 py-0.5 bg-[#E5A93C] text-black font-mono font-bold rounded-md shadow">
                GUEST
              </span>
            )}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold font-serif text-white">
                {currentUser?.name || (purchasedTickets[0]?.holderName ? `${purchasedTickets[0].holderName}` : 'Guest Explorer')}
              </h1>
              <ShieldCheck className="w-4 h-4 text-[#E5A93C]" title="Verified VIP Passholder" />
            </div>
            <p className="text-xs text-zinc-400">
              {currentUser?.email || (purchasedTickets[0]?.holderEmail ? `${purchasedTickets[0].holderEmail} • Device Passes` : 'Temporary Device Session (No login required)')}
            </p>
            {currentUser?.campus ? (
              <span className="inline-block text-[11px] px-2.5 py-0.5 rounded-md bg-[#E5A93C]/15 text-[#FDE68A] font-mono mt-2">
                🎓 {currentUser.campus}
              </span>
            ) : !currentUser ? (
              <div className="flex items-center gap-2 mt-2">
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                  ● Passes saved to this browser
                </span>
              </div>
            ) : null}
          </div>
        </div>

        {/* Quick Tabs */}
        <div className="flex items-center gap-1.5 sm:gap-2 bg-[#141420] p-1.5 rounded-2xl border border-white/8 w-full sm:w-auto overflow-x-auto custom-scrollbar">
          <button
            onClick={() => setActiveTab('tickets')}
            className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'tickets'
                ? 'bg-[#E5A93C] text-black shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            🎟️ My Passes ({purchasedTickets.length})
          </button>
          <button
            onClick={() => setActiveTab('calendar')}
            className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'calendar'
                ? 'bg-[#E5A93C] text-black shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Event Calendar</span>
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'saved'
                ? 'bg-[#E5A93C] text-black shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            ❤️ Saved ({savedEvents.length})
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'history'
                ? 'bg-[#E5A93C] text-black shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            📜 Receipts
          </button>
        </div>
      </div>

      {/* Tab 1: My Passes / Tickets */}
      {activeTab === 'tickets' && (
        <div>
          {purchasedTickets.length === 0 ? (
            <div className="py-20 text-center bg-[#0E0E16] rounded-3xl border border-white/10 p-8 max-w-md mx-auto">
              <Ticket className="w-12 h-12 text-[#E5A93C] mx-auto mb-3 opacity-60" />
              <h3 className="text-lg font-bold text-white font-serif mb-1">No Active Tickets Yet</h3>
              <p className="text-xs text-zinc-400 mb-6">
                You haven't purchased any tickets yet. Explore curated events and secure your VIP access.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column: List of purchased passes (7 cols) */}
              <div className="lg:col-span-7 space-y-4">
                <h3 className="text-sm font-bold  font-serif uppercase tracking-wider text-zinc-400">
                  Select A Pass To Present At The Gate
                </h3>

                {purchasedTickets.map((ticket) => {
                  const isSelected = selectedTicket?.ticketId === ticket.ticketId;
                  return (
                    <div
                      key={ticket.ticketId}
                      onClick={() => setSelectedTicket(ticket)}
                      className={`p-5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between gap-4 ${
                        isSelected
                          ? 'bg-[#181828] border-[#E5A93C] shadow-lg shadow-[#E5A93C]/10 ring-1 ring-[#E5A93C]'
                          : 'bg-[#0E0E16] border-white/8 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <img
                          src={ticket.eventImage}
                          alt={ticket.eventTitle}
                          className="w-16 h-16 rounded-xl object-cover shrink-0 border border-white/10"
                        />
                        <div>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-[#E5A93C]/20 text-[#FDE68A] font-mono font-bold">
                            {ticket.tierName}
                          </span>
                          <h4 className="text-sm sm:text-base font-bold text-white font-serif line-clamp-1 mt-1">
                            {ticket.eventTitle}
                          </h4>
                          <p className="text-xs text-zinc-400">
                            {formatDate(ticket.eventDate)} • {ticket.eventTime}
                          </p>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-xs font-mono font-bold text-zinc-400 block">{ticket.ticketId}</span>
                        <span className="text-[10px] text-emerald-400 font-mono font-bold uppercase">
                          ● Valid Pass
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Right Column: Apple-Wallet Style Flip View (5 cols) */}
              <div className="lg:col-span-5">
                {selectedTicket && (
                  <div className="sticky top-28 bg-linear-to-b from-[#181826] via-[#101018] to-[#0A0A0F] rounded-3xl border border-[#E5A93C]/40 p-6 shadow-2xl space-y-4">
                    
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <div className="flex items-center gap-2">
                        <span className="font-serif font-black tracking-widest text-xs text-white">ECHELONTIX PASS</span>
                        <span className="text-[9px] px-2 py-0.5 bg-[#E5A93C]/20 text-[#FDE68A] rounded-full font-mono">
                          VIP ACCESS
                        </span>
                      </div>
                      <span className="text-xs font-mono font-bold text-zinc-400">{selectedTicket.ticketId}</span>
                    </div>

                    <div className="rounded-2xl overflow-hidden relative h-36">
                      <img
                        src={selectedTicket.eventImage}
                        alt="Event"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent flex items-end p-3">
                        <h4 className="text-base font-bold text-white font-serif">{selectedTicket.eventTitle}</h4>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs bg-white/5 p-3.5 rounded-xl">
                      <div>
                        <span className="text-[10px] text-zinc-500 uppercase font-mono">Date</span>
                        <p className="font-semibold text-white">{formatDate(selectedTicket.eventDate)}</p>
                      </div>
                      <div>
                        <span className="text-[10px] text-zinc-500 uppercase font-mono">Location</span>
                        <p className="font-semibold text-white line-clamp-1">{selectedTicket.venue}</p>
                      </div>
                      <div>
                        <span className="text-[10px] text-zinc-500 uppercase font-mono">Passholder</span>
                        <p className="font-semibold text-zinc-200">{selectedTicket.holderName}</p>
                      </div>
                      <div>
                        <span className="text-[10px] text-zinc-500 uppercase font-mono">Admission Tier</span>
                        <p className="font-semibold text-[#FDE68A]">{selectedTicket.tierName}</p>
                      </div>
                    </div>

                    {/* QR Code Presentation */}
                    <div className="pt-2 flex flex-col items-center justify-center text-center">
                      <div className="bg-white p-3.5 rounded-2xl shadow-xl inline-block">
                        <svg viewBox="0 0 100 100" className="w-32 h-32">
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

                          <rect x="45" y="45" width="10" height="10" fill="#E5A93C" />
                          <rect x="42" y="15" width="6" height="6" fill="black" />
                          <rect x="55" y="25" width="6" height="6" fill="black" />
                          <rect x="70" y="65" width="6" height="6" fill="black" />
                          <rect x="52" y="75" width="6" height="6" fill="black" />
                        </svg>
                      </div>
                      <span className="text-[10px] text-zinc-400 font-mono mt-2 uppercase tracking-widest">
                        Hold this screen at the gate scanner
                      </span>
                    </div>

                    {/* Download & Save Buttons */}
                    <div className="flex gap-2 pt-2">
                      <Button
                        size="sm"
                        variant="glass"
                        onClick={() => alert(`Downloaded PDF for ticket ${selectedTicket.ticketId}`)}
                        leftIcon={<Download className="w-3.5 h-3.5" />}
                        className="flex-1 text-xs"
                      >
                        Save PDF
                      </Button>
                      <Button
                        size="sm"
                        variant="gold"
                        onClick={() => alert('Pass synchronized with Apple Wallet / Google Pay.')}
                        leftIcon={<Ticket className="w-3.5 h-3.5" />}
                        className="flex-1 text-xs font-bold"
                      >
                        Apple Wallet
                      </Button>
                    </div>

                  </div>
                )}
              </div>

            </div>
          )}
        </div>
      )}

      {/* Tab 2: Event Calendar Schedule */}
      {activeTab === 'calendar' && (
        <EventCalendarView
          mode="user"
          allEvents={allEvents}
          userTickets={purchasedTickets}
          savedEvents={savedEvents}
          currency={currency}
          onSelectEvent={onSelectEvent}
          onOpenScanner={onOpenScanner}
        />
      )}

      {/* Tab 3: Saved Wishlist */}
      {activeTab === 'saved' && (
        <div>
          {savedEvents.length === 0 ? (
            <div className="py-20 text-center bg-[#0E0E16] rounded-3xl border border-white/10 p-8 max-w-md mx-auto">
              <Heart className="w-12 h-12 text-[#E5A93C] mx-auto mb-3 opacity-60" />
              <h3 className="text-lg font-bold text-white font-serif mb-1">No Saved Events</h3>
              <p className="text-xs text-zinc-400">
                Click the heart icon on any event card to save it for later.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedEvents.map((ev) => (
                <EventCard
                  key={ev.id}
                  event={ev}
                  currency={currency}
                  isSaved={true}
                  onToggleSave={onToggleSave}
                  onSelectEvent={onSelectEvent}
                  onQuickBuy={onQuickBuy}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Receipts & Payment History */}
      {activeTab === 'history' && (
        <div className="bg-[#0E0E16] rounded-3xl border border-white/10 p-6 shadow-xl space-y-4">
          <h3 className="text-base font-bold text-white font-serif mb-2">Order Receipts & Invoices</h3>
          
          <div className="space-y-3">
            {[
              { id: 'ORD-892104', date: '2026-11-20', title: "FLOW D'ÉTAT Lagos 2026", amount: 35000, method: 'Paystack Card ••••4920' },
              { id: 'ORD-441092', date: '2026-10-15', title: 'NativeSound System Detty Dec', amount: 20000, method: 'Apple Pay' },
            ].map((rc, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-white/5 border border-white/8 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-[#FDE68A]">{rc.id}</span>
                    <span className="text-[10px] text-zinc-400 font-mono">{rc.date}</span>
                  </div>
                  <h4 className="text-sm font-bold text-white mt-0.5">{rc.title}</h4>
                  <p className="text-xs text-zinc-400">{rc.method}</p>
                </div>

                <div className="text-right flex items-center gap-3">
                  <span className="text-base font-mono font-bold text-white">
                    {currency === 'NGN' ? formatNaira(rc.amount) : formatUSD(rc.amount)}
                  </span>
                  <Button
                    size="sm"
                    variant="glass"
                    onClick={() => alert(`Receipt #${rc.id} sent to your email`)}
                    className="text-xs"
                  >
                    View Invoice
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
