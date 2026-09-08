import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  TrendingUp, 
  Ticket, 
  Users, 
  Eye, 
  QrCode, 
  PlusCircle, 
  Download, 
  CheckCircle2, 
  Clock, 
  ArrowUpRight, 
  Calendar, 
  Building2,
  Sparkles,
  Search,
  Activity,
  Zap,
  Globe,
  Radio,
  CreditCard,
  ChevronRight
} from 'lucide-react';
import { EventItem, UserProfile } from '../types';
import { formatNaira, formatUSD, formatDate } from '../utils/formatters';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { EventCalendarView } from '../components/calendar/EventCalendarView';
import { LiveTrafficAnalytics } from '../components/dashboard/LiveTrafficAnalytics';

export interface OrganizerDashboardPageProps {
  currentUser: UserProfile | null;
  events: EventItem[];
  currency: 'NGN' | 'USD';
  onOpenCreateEvent: () => void;
  onOpenScanner: () => void;
  onSelectEvent: (event: EventItem) => void;
}

export const OrganizerDashboardPage: React.FC<OrganizerDashboardPageProps> = ({
  currentUser,
  events,
  currency,
  onOpenCreateEvent,
  onOpenScanner,
  onSelectEvent,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'traffic' | 'calendar' | 'attendees'>('overview');
  const [selectedEventId, setSelectedEventId] = useState<string>(events[0]?.id || '');
  const activeEvent = events.find((e) => e.id === selectedEventId) || events[0];

  // Calculated Real-time Metrics
  const grossSalesNGN = 24850000;
  const totalPageViews = 48250;
  const activeConcurrentLive = 148;
  const totalTicketsSold = 1850;
  const totalCapacity = 2000;
  const checkinRate = 91.2;
  const avgOrderValueNGN = 13432;

  // Real-time incoming ticket sales stream
  const liveSalesFeed = [
    { id: 'ORD-9921', name: 'Chukwuebuka S.', tier: 'VIP Golden Circle', qty: 2, amount: 70000, time: '38s ago', channel: 'Instagram Link' },
    { id: 'ORD-9920', name: 'Damilola A.', tier: 'Early Bird Regular', qty: 1, amount: 15000, time: '2m ago', channel: 'WhatsApp Group' },
    { id: 'ORD-9919', name: 'Tunde B.', tier: 'VIP Table for 6', qty: 1, amount: 350000, time: '5m ago', channel: 'Direct Search' },
    { id: 'ORD-9918', name: 'Zainab A.', tier: 'Regular Lawn Pass', qty: 3, amount: 24000, time: '9m ago', channel: 'Twitter / X' },
    { id: 'ORD-9917', name: 'Femi B.', tier: 'Student All-Access', qty: 2, amount: 9000, time: '14m ago', channel: 'UNILAG Broadcast' },
  ];

  const handleExportAttendees = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "PassID,HolderName,Tier,Price,Status,CheckInTime\n"
      + "ECH-849201,Chukwuebuka Stephen,VIP Golden Circle,₦35000,Valid,2026-11-28 20:45\n"
      + "ECH-194022,Damilola Adeleke,Early Bird Regular,₦15000,Checked-In,2026-11-28 21:02\n"
      + "ECH-774019,Tunde Bakare,VIP Table for 6,₦350000,Checked-In,2026-11-28 21:15";
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `attendees-${activeEvent?.slug || 'echelon'}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Dashboard Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#E5A93C] tracking-widest mb-1.5">
            <Sparkles className="w-4 h-4" />
            <span>Promoter & Organizer Suite</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black font-serif text-white tracking-tight">
            ORGANIZER <span className="text-gold-metallic">CONSOLE</span>
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">
            Real-time sales telemetry, live event traffic analytics, and turnstile gate controls.
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex items-center gap-2.5">
          <Button
            size="md"
            variant="glass"
            onClick={onOpenScanner}
            leftIcon={<QrCode className="w-4 h-4 text-[#E5A93C]" />}
          >
            Launch Gate Scanner
          </Button>

          <Button
            size="md"
            variant="gold"
            onClick={onOpenCreateEvent}
            leftIcon={<PlusCircle className="w-4 h-4" />}
          >
            Create New Event
          </Button>
        </div>
      </div>

      {/* Direct Settlement Notice Banner */}
      <div className="mb-8 p-3.5 sm:p-4 rounded-2xl bg-linear-to-r from-[#141424] to-[#0D0D14] border border-[#E5A93C]/25 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#E5A93C]/15 border border-[#E5A93C]/30 text-[#E5A93C] flex items-center justify-center shrink-0">
            <Building2 className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-white block">
              Direct Settlement Model Active (Zero In-App Custodial Hold)
            </span>
            <span className="text-zinc-400 text-[11px]">
              100% of ticket sales are settled immediately into your linked GTBank account (<span className="font-mono text-[#FDE68A]">0123456789</span>) via Paystack & Flutterwave.
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 font-mono text-[11px]">
          <span className="inline-flex items-center gap-1 text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
            <CheckCircle2 className="w-3.5 h-3.5" /> Direct Bank Payouts Active
          </span>
        </div>
      </div>

      {/* 4 Metric Telemetry Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        
        {/* Metric 1: Total Gross Revenue Generated */}
        <div className="p-5 rounded-2xl bg-[#0E0E16] border border-white/10 relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-zinc-400 font-mono mb-2">
            <span>GROSS SALES BALANCE</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <span className="text-2xl sm:text-3xl font-mono font-black text-white block">
            {currency === 'NGN' ? formatNaira(grossSalesNGN) : formatUSD(grossSalesNGN)}
          </span>
          <div className="flex items-center gap-1 text-[11px] text-emerald-400 mt-2 font-mono">
            <span>+28.4% vs previous event</span>
          </div>
        </div>

        {/* Metric 2: Live Concurrent Traffic */}
        <div className="p-5 rounded-2xl bg-[#0E0E16] border border-white/10 relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-zinc-400 font-mono mb-2">
            <span>LIVE CONCURRENT TRAFFIC</span>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <Activity className="w-4 h-4 text-emerald-400" />
            </div>
          </div>
          <span className="text-2xl sm:text-3xl font-mono font-black text-[#FDE68A] block">
            {activeConcurrentLive} <span className="text-xs text-zinc-400 font-normal">active visitors</span>
          </span>
          <div className="flex items-center gap-1 text-[11px] text-zinc-400 mt-2 font-mono">
            <span>{totalPageViews.toLocaleString()} total impressions</span>
          </div>
        </div>

        {/* Metric 3: Tickets Sold & Depletion Velocity */}
        <div className="p-5 rounded-2xl bg-[#0E0E16] border border-white/10 relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-zinc-400 font-mono mb-2">
            <span>TICKETS ISSUED</span>
            <Ticket className="w-4 h-4 text-[#E5A93C]" />
          </div>
          <span className="text-2xl sm:text-3xl font-mono font-black text-white block">
            {totalTicketsSold} <span className="text-xs text-zinc-500 font-normal">/ {totalCapacity}</span>
          </span>
          <div className="w-full bg-white/10 h-1.5 rounded-full mt-3 overflow-hidden">
            <div className="bg-gralinear-to-r from-[#E5A93C] to-[#FDE68A] h-full rounded-full" style={{ width: '92.5%' }} />
          </div>
        </div>

        {/* Metric 4: Gate Check-in Rate */}
        <div className="p-5 rounded-2xl bg-[#0E0E16] border border-white/10 relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-zinc-400 font-mono mb-2">
            <span>GATE CHECK-IN RATE</span>
            <QrCode className="w-4 h-4 text-indigo-400" />
          </div>
          <span className="text-2xl sm:text-3xl font-mono font-black text-white block">
            {checkinRate}%
          </span>
          <div className="flex items-center gap-1.5 text-[11px] text-zinc-400 mt-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>4 Gate Scanners Synchronized</span>
          </div>
        </div>

      </div>

      {/* Organizer Console Navigation Tabs */}
      <div className="flex items-center gap-2 bg-[#12121D] p-1.5 rounded-2xl border border-white/8 mb-8 overflow-x-auto custom-scrollbar">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
            activeTab === 'overview'
              ? 'bg-[#E5A93C] text-black shadow-md'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Sales & Telemetry Overview ({events.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('traffic')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
            activeTab === 'traffic'
              ? 'bg-[#E5A93C] text-black shadow-md'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <Eye className="w-4 h-4" />
          <span>Live Traffic & Audience Analytics</span>
        </button>

        <button
          onClick={() => setActiveTab('calendar')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
            activeTab === 'calendar'
              ? 'bg-[#E5A93C] text-black shadow-md'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Production Calendar & Run of Show</span>
        </button>

        <button
          onClick={() => setActiveTab('attendees')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
            activeTab === 'attendees'
              ? 'bg-[#E5A93C] text-black shadow-md'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Live Gate Check-in Stream</span>
        </button>
      </div>

      {/* Tab: Live Traffic & Audience Analytics */}
      {activeTab === 'traffic' && activeEvent && (
        <LiveTrafficAnalytics event={activeEvent} currency={currency} />
      )}

      {/* Tab: Production Calendar */}
      {activeTab === 'calendar' && (
        <EventCalendarView
          mode="organizer"
          allEvents={events}
          organizerEvents={events}
          currency={currency}
          onSelectEvent={onSelectEvent}
          onOpenCreateEvent={onOpenCreateEvent}
          onOpenScanner={onOpenScanner}
        />
      )}

      {/* Tab: Overview (Sales Telemetry + Event Manager + Live Transactions) */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Col (8 cols): Event Selector & Ticket Tier Performance */}
        <div className="lg:col-span-8 space-y-6">
          
          <div className="bg-[#0E0E16] rounded-2xl border border-white/10 p-5 shadow-xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/8">
              <div>
                <h3 className="text-base font-bold text-white font-serif">Your Hosted Events ({events.length})</h3>
                <span className="text-xs text-zinc-400 font-mono">Select an event to inspect sales & traffic</span>
              </div>
              <button
                onClick={() => setActiveTab('traffic')}
                className="text-xs font-mono text-[#E5A93C] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>View Traffic Telemetry</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3 mt-4">
              {events.slice(0, 4).map((ev) => {
                const isSelected = ev.id === activeEvent?.id;
                return (
                  <div
                    key={ev.id}
                    onClick={() => setSelectedEventId(ev.id)}
                    className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-[#161624] border-[#E5A93C] shadow-md shadow-[#E5A93C]/10 ring-1 ring-[#E5A93C]'
                        : 'bg-[#11111A] border-white/8 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={ev.image}
                        alt={ev.title}
                        className="w-14 h-14 rounded-lg object-cover shrink-0"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-white line-clamp-1">{ev.title}</h4>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono font-bold">
                            Active
                          </span>
                        </div>
                        <p className="text-xs text-zinc-400">
                          {formatDate(ev.date)} • 📍 {ev.location.venue}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-right">
                      <div>
                        <span className="text-[10px] text-zinc-500 font-mono uppercase block">Sales Gross</span>
                        <span className="text-sm font-mono font-bold text-[#FDE68A]">
                          {currency === 'NGN' ? formatNaira(ev.startingPrice * (ev.attendeesCount || 100)) : formatUSD(ev.startingPrice * 100)}
                        </span>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectEvent(ev);
                        }}
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white"
                        title="View Public Page"
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Ticket Tier Breakdown for Active Event */}
          {activeEvent && (
            <div className="bg-[#0E0E16] rounded-2xl border border-white/10 p-5 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-white font-serif">
                  Ticket Tier Performance: {activeEvent.title}
                </h3>
                <span className="text-[11px] font-mono text-[#FDE68A]">
                  Avg. Order: {currency === 'NGN' ? formatNaira(avgOrderValueNGN) : formatUSD(avgOrderValueNGN)}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {activeEvent.ticketTiers.map((tier) => (
                  <div key={tier.id} className="p-4 rounded-xl bg-[#12121D] border border-white/8">
                    <span className="text-xs font-bold text-white block mb-1">{tier.name}</span>
                    <span className="text-base font-mono font-extrabold text-[#FDE68A] block">
                      {currency === 'NGN' ? formatNaira(tier.price) : formatUSD(tier.price)}
                    </span>
                    <p className="text-[11px] text-zinc-400 mt-2 font-mono">
                      {tier.total - tier.available} sold / {tier.total} total
                    </p>
                    <div className="w-full bg-white/10 h-1.5 rounded-full mt-1.5 overflow-hidden">
                      <div
                        className="bg-[#E5A93C] h-full rounded-full"
                        style={{ width: `${Math.round(((tier.total - tier.available) / tier.total) * 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Right Col (4 cols): Live Sales Stream & Recent Check-ins */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Live Sales Transactions Stream */}
          <div className="bg-[#0E0E16] rounded-2xl border border-white/10 p-5 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/8 mb-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <h3 className="text-sm font-bold text-white font-serif">Live Sales Stream</h3>
              </div>
              <span className="text-[10px] font-mono text-emerald-400">Direct Settled</span>
            </div>

            <div className="space-y-2.5">
              {liveSalesFeed.map((sale) => (
                <div key={sale.id} className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-white block">{sale.name}</span>
                    <span className="text-[10px] text-zinc-400 font-mono">{sale.tier} (×{sale.qty}) • {sale.channel}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono font-bold text-[#FDE68A] block">
                      {currency === 'NGN' ? formatNaira(sale.amount) : formatUSD(sale.amount)}
                    </span>
                    <span className="text-[9px] text-zinc-500 font-mono">{sale.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Gate Check-ins Stream */}
          <div className="bg-[#0E0E16] rounded-2xl border border-white/10 p-5 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/8 mb-3">
              <div>
                <h3 className="text-sm font-bold text-white font-serif">Recent Check-ins</h3>
                <span className="text-[11px] text-zinc-400 font-mono">Live turnstile stream</span>
              </div>

              <Button
                size="sm"
                variant="glass"
                onClick={handleExportAttendees}
                leftIcon={<Download className="w-3.5 h-3.5" />}
                className="text-xs"
              >
                CSV
              </Button>
            </div>

            {/* Live stream list */}
            <div className="space-y-2.5">
              {[
                { name: 'Chukwuebuka Stephen', tier: 'VIP Circle', time: '1 min ago', status: 'Gate 01' },
                { name: 'Damilola Adeleke', tier: 'Regular', time: '3 mins ago', status: 'Gate 02' },
                { name: 'Zainab Al-Hassan', tier: 'VIP Table 04', time: '6 mins ago', status: 'VIP Concierge' },
                { name: 'Femi Balogun', tier: 'Student Pass', time: '9 mins ago', status: 'Campus Gate' },
              ].map((att, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-white block">{att.name}</span>
                    <span className="text-[10px] text-[#FDE68A] font-mono">{att.tier}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-emerald-400 font-mono block">{att.status}</span>
                    <span className="text-[9px] text-zinc-500 font-mono">{att.time}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-white/8 text-center">
              <Button
                size="sm"
                variant="outline"
                onClick={onOpenScanner}
                leftIcon={<QrCode className="w-3.5 h-3.5" />}
                className="w-full text-xs"
              >
                Open Camera Scanner
              </Button>
            </div>
          </div>

        </div>

      </div>
      )}

      {/* Tab: Attendee Gate Check-ins Full View */}
      {activeTab === 'attendees' && (
        <div className="bg-[#0E0E16] rounded-3xl border border-white/10 p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/8">
            <div>
              <h3 className="text-lg font-bold text-white font-serif">Live Attendee Check-In Manifest</h3>
              <p className="text-xs text-zinc-400">Synchronized across all handheld Android/iOS and QR gate turnstiles.</p>
            </div>

            <div className="flex items-center gap-2.5">
              <Button
                size="sm"
                variant="glass"
                onClick={handleExportAttendees}
                leftIcon={<Download className="w-3.5 h-3.5" />}
              >
                Export CSV Manifest
              </Button>
              <Button
                size="sm"
                variant="gold"
                onClick={onOpenScanner}
                leftIcon={<QrCode className="w-3.5 h-3.5" />}
              >
                Open Camera Scanner
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/8 text-zinc-400 font-mono text-[11px] uppercase">
                  <th className="pb-3 pr-4">Pass ID</th>
                  <th className="pb-3 px-4">Holder Name</th>
                  <th className="pb-3 px-4">Ticket Tier</th>
                  <th className="pb-3 px-4">Amount</th>
                  <th className="pb-3 px-4">Gate & Status</th>
                  <th className="pb-3 pl-4 text-right">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[
                  { id: 'ECH-849201', name: 'Chukwuebuka Stephen', tier: 'VIP Golden Circle', amount: 35000, status: 'Checked-In (Gate 01)', time: '1 min ago' },
                  { id: 'ECH-194022', name: 'Damilola Adeleke', tier: 'Early Bird Regular', amount: 15000, status: 'Checked-In (Gate 02)', time: '3 mins ago' },
                  { id: 'ECH-774019', name: 'Tunde Bakare', tier: 'VIP Table for 6', amount: 350000, status: 'Checked-In (VIP Concierge)', time: '6 mins ago' },
                  { id: 'ECH-339102', name: 'Zainab Al-Hassan', tier: 'Regular Lawn Pass', amount: 8000, status: 'Checked-In (Gate 03)', time: '8 mins ago' },
                  { id: 'ECH-552910', name: 'Femi Balogun', tier: 'Student All-Access', amount: 4500, status: 'Checked-In (Campus Gate)', time: '12 mins ago' },
                  { id: 'ECH-904128', name: 'Ngozi Eze', tier: 'Sunset Guest Pass', amount: 35000, status: 'Checked-In (Sky Gate)', time: '15 mins ago' },
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/5 transition-colors">
                    <td className="py-3 pr-4 font-mono font-bold text-[#FDE68A]">{row.id}</td>
                    <td className="py-3 px-4 font-bold text-white">{row.name}</td>
                    <td className="py-3 px-4 text-zinc-300">{row.tier}</td>
                    <td className="py-3 px-4 font-mono text-zinc-300">
                      {currency === 'NGN' ? formatNaira(row.amount) : formatUSD(row.amount)}
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <CheckCircle2 className="w-3 h-3" /> {row.status}
                      </span>
                    </td>
                    <td className="py-3 pl-4 text-right font-mono text-zinc-500">{row.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};
