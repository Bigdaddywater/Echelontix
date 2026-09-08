import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  MapPin, 
  Ticket, 
  Sparkles, 
  Plus, 
  Download, 
  ExternalLink, 
  Filter, 
  CheckCircle2,
  CalendarPlus,
  Compass,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { EventItem, PurchasedTicket } from '../../types';
import { formatDate, formatNaira, formatUSD } from '../../utils/formatters';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

export interface EventCalendarViewProps {
  mode: 'user' | 'organizer';
  allEvents: EventItem[];
  userTickets?: PurchasedTicket[];
  savedEvents?: EventItem[];
  organizerEvents?: EventItem[];
  currency?: 'NGN' | 'USD';
  onSelectEvent?: (event: EventItem) => void;
  onOpenCreateEvent?: () => void;
  onOpenScanner?: () => void;
}

export const EventCalendarView: React.FC<EventCalendarViewProps> = ({
  mode,
  allEvents,
  userTickets = [],
  savedEvents = [],
  organizerEvents = [],
  currency = 'NGN',
  onSelectEvent,
  onOpenCreateEvent,
  onOpenScanner,
}) => {
  // Current viewing month and year
  const [currentDate, setCurrentDate] = useState(() => new Date(2026, 9, 1)); // Oct 2026 default to match mock data
  const [selectedDateStr, setSelectedDateStr] = useState<string>('2026-11-28');
  const [filterType, setFilterType] = useState<'all' | 'booked' | 'saved'>('all');
  const [viewMode, setViewMode] = useState<'month' | 'agenda'>('month');

  // Month navigation
  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date(2026, 10, 1)); // Nov 2026
    setSelectedDateStr('2026-11-28');
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthName = currentDate.toLocaleString('default', { month: 'long' });

  // Compute days in month and padding
  const firstDayOfWeek = new Date(year, month, 1).getDay(); // 0 = Sun, 1 = Mon ...
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Create lookup maps for fast calendar rendering
  const bookedEventIds = useMemo(() => new Set(userTickets.map((t) => t.eventId)), [userTickets]);
  const savedEventIds = useMemo(() => new Set(savedEvents.map((s) => s.id)), [savedEvents]);

  // Aggregate relevant events based on mode
  const relevantEvents = useMemo(() => {
    if (mode === 'organizer') {
      return organizerEvents.length > 0 ? organizerEvents : allEvents.slice(0, 4);
    }
    return allEvents;
  }, [mode, organizerEvents, allEvents]);

  // Map events to date strings (YYYY-MM-DD)
  const eventsByDate = useMemo(() => {
    const map = new Map<string, EventItem[]>();
    
    relevantEvents.forEach((event) => {
      // Normalize date string (assuming 'YYYY-MM-DD' format)
      const dStr = event.date.slice(0, 10);
      const list = map.get(dStr) || [];
      list.push(event);
      map.set(dStr, list);
    });

    return map;
  }, [relevantEvents]);

  // Events on the currently selected date
  const eventsOnSelectedDate = useMemo(() => {
    let list = eventsByDate.get(selectedDateStr) || [];
    if (mode === 'user') {
      if (filterType === 'booked') {
        list = list.filter((e) => bookedEventIds.has(e.id));
      } else if (filterType === 'saved') {
        list = list.filter((e) => savedEventIds.has(e.id));
      }
    }
    return list;
  }, [eventsByDate, selectedDateStr, mode, filterType, bookedEventIds, savedEventIds]);

  // Google Calendar export link helper
  const getGoogleCalendarUrl = (event: EventItem) => {
    const title = encodeURIComponent(event.title);
    const details = encodeURIComponent(`${event.tagline}\n\nVenue: ${event.location.venue}, ${event.location.address}`);
    const location = encodeURIComponent(`${event.location.venue}, ${event.location.address}, ${event.location.city}`);
    
    // Parse date for Google Calendar (assuming standard ISO format)
    const cleanDate = event.date.replace(/-/g, '');
    const startTime = `${cleanDate}T190000Z`;
    const endTime = `${cleanDate}T235900Z`;

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startTime}/${endTime}&details=${details}&location=${location}`;
  };

  // Generate .ics calendar file download
  const handleDownloadICS = (event: EventItem) => {
    const cleanDate = event.date.replace(/-/g, '');
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Echelontix Nigeria//Event Calendar//EN',
      'BEGIN:VEVENT',
      `SUMMARY:${event.title}`,
      `DESCRIPTION:${event.tagline}`,
      `LOCATION:${event.location.venue}, ${event.location.address}, ${event.location.city}`,
      `DTSTART:${cleanDate}T180000Z`,
      `DTEND:${cleanDate}T233000Z`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${event.slug || 'event'}-calendar.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-[#0E0E16] rounded-3xl border border-white/10 p-5 sm:p-7 shadow-2xl space-y-6">
      
      {/* Calendar Top Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/8">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#E5A93C] tracking-widest mb-1">
            <CalendarIcon className="w-4 h-4" />
            <span>{mode === 'organizer' ? 'Organizer Production Schedule' : 'My Live Event Schedule'}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black font-serif text-white tracking-tight">
            {monthName} <span className="text-gold-metallic">{year}</span>
          </h2>
        </div>

        {/* View Switchers & Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          {mode === 'user' && (
            <div className="flex items-center bg-[#151522] rounded-xl p-1 border border-white/8 text-xs">
              <button
                onClick={() => setFilterType('all')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer ${
                  filterType === 'all' ? 'bg-[#E5A93C] text-black shadow' : 'text-zinc-400 hover:text-white'
                }`}
              >
                All Events
              </button>
              <button
                onClick={() => setFilterType('booked')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer flex items-center gap-1 ${
                  filterType === 'booked' ? 'bg-[#E5A93C] text-black shadow' : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Ticket className="w-3 h-3" />
                <span>My Passes ({userTickets.length})</span>
              </button>
              <button
                onClick={() => setFilterType('saved')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer ${
                  filterType === 'saved' ? 'bg-[#E5A93C] text-black shadow' : 'text-zinc-400 hover:text-white'
                }`}
              >
                Saved ({savedEvents.length})
              </button>
            </div>
          )}

          {mode === 'organizer' && onOpenCreateEvent && (
            <Button
              size="sm"
              variant="gold"
              onClick={onOpenCreateEvent}
              leftIcon={<Plus className="w-3.5 h-3.5" />}
            >
              Schedule Event
            </Button>
          )}

          {/* Month Navigation Prev / Next */}
          <div className="flex items-center gap-1 bg-[#151522] rounded-xl p-1 border border-white/8">
            <button
              onClick={prevMonth}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title="Previous Month"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={goToToday}
              className="px-2.5 py-1 text-xs font-mono font-bold text-zinc-300 hover:text-[#E5A93C] transition-colors cursor-pointer"
            >
              Today
            </button>
            <button
              onClick={nextMonth}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title="Next Month"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Calendar Board (Left) & Selected Day Details (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Calendar Month Grid (7 cols) */}
        <div className="lg:col-span-7 bg-[#12121D] rounded-2xl border border-white/8 p-4 sm:p-5">
          
          {/* Day of Week Headers */}
          <div className="grid grid-cols-7 gap-1 text-center mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, idx) => (
              <div key={idx} className="text-[11px] font-mono font-bold text-zinc-500 uppercase tracking-wider py-1">
                {day}
              </div>
            ))}
          </div>

          {/* Day Cells */}
          <div className="grid grid-cols-7 gap-1.5">
            {/* Empty padding cells */}
            {Array.from({ length: firstDayOfWeek }).map((_, idx) => (
              <div key={`empty-${idx}`} className="h-14 sm:h-16 rounded-xl bg-black/20 opacity-30" />
            ))}

            {/* Month Day Cells */}
            {Array.from({ length: daysInMonth }).map((_, idx) => {
              const dayNum = idx + 1;
              const formattedDay = dayNum < 10 ? `0${dayNum}` : `${dayNum}`;
              const formattedMonth = (month + 1) < 10 ? `0${month + 1}` : `${month + 1}`;
              const dateKey = `${year}-${formattedMonth}-${formattedDay}`;

              const dayEvents = eventsByDate.get(dateKey) || [];
              const isSelected = selectedDateStr === dateKey;
              const hasBooked = dayEvents.some((e) => bookedEventIds.has(e.id));
              const hasSaved = dayEvents.some((e) => savedEventIds.has(e.id));

              return (
                <motion.div
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.98 }}
                  key={`day-${dayNum}`}
                  onClick={() => setSelectedDateStr(dateKey)}
                  className={`h-14 sm:h-16 rounded-xl p-1.5 sm:p-2 cursor-pointer transition-all flex flex-col justify-between border ${
                    isSelected
                      ? 'bg-[#1E1C2E] border-[#E5A93C] shadow-lg shadow-[#E5A93C]/20 ring-1 ring-[#E5A93C]'
                      : dayEvents.length > 0
                      ? 'bg-[#171726] border-white/12 hover:border-[#E5A93C]/50'
                      : 'bg-black/30 border-white/5 hover:border-white/15'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-mono font-bold ${isSelected ? 'text-[#FDE68A]' : 'text-zinc-300'}`}>
                      {dayNum}
                    </span>
                    {dayEvents.length > 0 && (
                      <span className="w-4 h-4 rounded-full bg-[#E5A93C] text-black text-[9px] font-mono font-bold flex items-center justify-center">
                        {dayEvents.length}
                      </span>
                    )}
                  </div>

                  {/* Dot status tags */}
                  <div className="flex items-center gap-1 flex-wrap">
                    {hasBooked && (
                      <span className="w-2 h-2 rounded-full bg-emerald-400" title="Pass Booked" />
                    )}
                    {hasSaved && (
                      <span className="w-2 h-2 rounded-full bg-[#E5A93C]" title="Saved Wishlist" />
                    )}
                    {!hasBooked && !hasSaved && dayEvents.length > 0 && (
                      <span className="w-2 h-2 rounded-full bg-blue-400" title="Live Event" />
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Color Legend */}
          <div className="flex items-center gap-4 mt-4 pt-3 border-t border-white/8 text-[11px] text-zinc-400 flex-wrap">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <span>Confirmed Pass</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E5A93C]" />
              <span>Saved Event</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-400" />
              <span>Scheduled Live Event</span>
            </div>
          </div>
        </div>

        {/* Selected Date Schedule & Actions (5 cols) */}
        <div className="lg:col-span-5 bg-[#12121D] rounded-2xl border border-white/8 p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/8">
              <div>
                <span className="text-[10px] font-mono uppercase text-zinc-400 block">Selected Date</span>
                <h3 className="text-base font-bold text-white font-serif">
                  {formatDate(selectedDateStr)}
                </h3>
              </div>
              <span className="text-xs font-mono px-2 py-1 rounded bg-[#E5A93C]/15 text-[#FDE68A] border border-[#E5A93C]/30 font-bold">
                {eventsOnSelectedDate.length} {eventsOnSelectedDate.length === 1 ? 'Event' : 'Events'}
              </span>
            </div>

            {/* Event List on Selected Date */}
            {eventsOnSelectedDate.length > 0 ? (
              <div className="space-y-3 max-h-90 overflow-y-auto custom-scrollbar pr-1">
                {eventsOnSelectedDate.map((event) => {
                  const isBooked = bookedEventIds.has(event.id);
                  const isSaved = savedEventIds.has(event.id);

                  return (
                    <div
                      key={event.id}
                      className="p-3.5 rounded-xl bg-[#181828] border border-white/10 hover:border-[#E5A93C]/60 transition-all space-y-2.5"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-1.5 mb-1">
                            <Badge variant={isBooked ? 'neon' : isSaved ? 'gold' : 'outline'} size="sm">
                              {isBooked ? '🎟️ Pass Confirmed' : isSaved ? '❤️ Saved' : event.category}
                            </Badge>
                            {event.location.isCampus && (
                              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300">
                                Campus
                              </span>
                            )}
                          </div>
                          <h4 
                            onClick={() => onSelectEvent && onSelectEvent(event)}
                            className="text-sm font-bold text-white hover:text-gold-bright transition-colors cursor-pointer"
                          >
                            {event.title}
                          </h4>
                        </div>
                      </div>

                      <div className="space-y-1 text-xs text-zinc-400">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-[#E5A93C]" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                          <span className="truncate">{event.location.venue}, {event.location.city}</span>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center justify-between pt-2 border-t border-white/6 gap-2">
                        <div className="flex items-center gap-1.5">
                          <a
                            href={getGoogleCalendarUrl(event)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 text-[11px] flex items-center gap-1 transition-colors cursor-pointer"
                            title="Add to Google Calendar"
                          >
                            <CalendarPlus className="w-3.5 h-3.5 text-[#E5A93C]" />
                            <span className="hidden sm:inline">Google Cal</span>
                          </a>

                          <button
                            onClick={() => handleDownloadICS(event)}
                            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 text-[11px] flex items-center gap-1 transition-colors cursor-pointer"
                            title="Download iCal (.ics) file for Apple/Outlook"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">.ICS</span>
                          </button>
                        </div>

                        {onSelectEvent && (
                          <Button
                            size="sm"
                            variant="gold"
                            onClick={() => onSelectEvent(event)}
                            rightIcon={<ArrowRight className="w-3 h-3" />}
                            className="text-xs font-bold py-1 px-2.5"
                          >
                            View Event
                          </Button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="py-12 text-center bg-black/20 rounded-xl border border-white/5 p-6">
                <Compass className="w-10 h-10 text-zinc-600 mx-auto mb-2 opacity-60" />
                <h4 className="text-sm font-bold text-white mb-1">No events scheduled</h4>
                <p className="text-xs text-zinc-400 max-w-xs mx-auto mb-4">
                  There are no events on {formatDate(selectedDateStr)}. Pick another day or explore the upcoming catalogue.
                </p>
                {mode === 'organizer' && onOpenCreateEvent && (
                  <Button size="sm" variant="gold" onClick={onOpenCreateEvent}>
                    Create Event for this Date
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* Quick Schedule Sync Box */}
          <div className="mt-4 pt-3 border-t border-white/8 flex items-center justify-between text-xs text-zinc-400">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#E5A93C]" />
              <span>Auto-syncs with your tickets & saved events</span>
            </span>
            <span className="font-mono text-[10px] text-zinc-500">WAT / GMT+1</span>
          </div>
        </div>

      </div>

    </div>
  );
};
