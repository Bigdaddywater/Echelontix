import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, MapPin, Calendar, Layers, ArrowRight, Sparkles, X, Clock, Flame } from 'lucide-react';
import { EventItem } from '../../types';
import { Button } from '../ui/Button';

export interface SmartSearchProps {
  events: EventItem[];
  searchQuery: string;
  selectedLocation: string;
  selectedCategory: string;
  selectedDate: string;
  onSearchChange: (query: string) => void;
  onLocationChange: (location: string) => void;
  onCategoryChange: (category: string) => void;
  onDateChange: (date: string) => void;
  onSelectEvent: (event: EventItem) => void;
  onExecuteSearch: () => void;
}

export const SmartSearch: React.FC<SmartSearchProps> = ({
  events,
  searchQuery,
  selectedLocation,
  selectedCategory,
  selectedDate,
  onSearchChange,
  onLocationChange,
  onCategoryChange,
  onDateChange,
  onSelectEvent,
  onExecuteSearch,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([
    'FLOW D\'ÉTAT',
    'Lagos Nightlife',
    'UNILAG Soundclash',
    'Detty December'
  ]);
  const containerRef = useRef<HTMLDivElement>(null);

  const trendingTags = [
    '🔥 Detty December',
    '🌴 Elegushi Beach Rave',
    '🎤 UNILAG Freshers',
    '💡 Silicon Lagoon Tech',
    '🍸 Victoria Island VIP',
    '🏛️ Abuja Comedy Gala'
  ];

  const locations = [
    'All Locations',
    'Lagos (VI / Lekki / Ikeja)',
    'Abuja (Maitama / Wuse)',
    'Port Harcourt (GRA)',
    'Ibadan (Bodija / Ring Rd)',
    'UNILAG Akoka Campus',
    'Covenant University Ota',
    'Online / Virtual'
  ];

  const categories = [
    'All Categories',
    'Music & Concerts',
    'Nightlife & Raves',
    'Campus Life',
    'Tech & Summits',
    'Comedy & Theatre',
    'VIP & Luxury'
  ];

  const dateOptions = [
    { value: 'all', label: 'Any Date' },
    { value: 'today', label: 'Tonight' },
    { value: 'this_weekend', label: 'This Weekend' },
    { value: 'this_month', label: 'This Month' },
    { value: 'detty_december', label: 'Detty December 2026' }
  ];

  // Live matching events for autocomplete
  const filteredSuggestions = searchQuery.trim()
    ? events.filter((ev) =>
        ev.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ev.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ev.location.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ev.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
      ).slice(0, 4)
    : [];

  const handleTagClick = (tag: string) => {
    const cleanTag = tag.replace(/^[^\w\s]+/, '').trim();
    onSearchChange(cleanTag);
    setIsFocused(false);
    onExecuteSearch();
  };

  const handleRecentClick = (text: string) => {
    onSearchChange(text);
    setIsFocused(false);
    onExecuteSearch();
  };

  const removeRecent = (idx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setRecentSearches((prev) => prev.filter((_, i) => i !== idx));
  };

  return (
    <section className="relative -mt-8 sm:-mt-12 z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Search Console Container */}
      <div 
        ref={containerRef}
        className="relative bg-[#0F0F17]/95 backdrop-blur-2xl rounded-2xl sm:rounded-3xl border border-white/12 p-3 sm:p-4 shadow-2xl shadow-black/80 hover:border-[#E5A93C]/40 transition-all duration-300"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-2 sm:gap-3 items-center">
          
          {/* Main Keyword Input */}
          <div className="relative md:col-span-4 flex items-center bg-[#151522] rounded-xl sm:rounded-2xl border border-white/8 px-3.5 py-2.5 sm:py-3 focus-within:border-[#E5A93C] focus-within:ring-2 focus-within:ring-[#E5A93C]/20 transition-all">
            <Search className="w-5 h-5 text-[#E5A93C] mr-3 flex-shrink-0" />
            <input
              id="smart-search-keyword-input"
              type="text"
              placeholder="Search concerts, raves, campus fests..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setIsFocused(false);
                  onExecuteSearch();
                }
              }}
              className="w-full bg-transparent text-white text-sm placeholder:text-zinc-500 focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="text-zinc-500 hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Location Selector */}
          <div className="md:col-span-3 flex items-center bg-[#151522] rounded-xl sm:rounded-2xl border border-white/8 px-3.5 py-2.5 sm:py-3">
            <MapPin className="w-4 h-4 text-[#E5A93C] mr-2.5 flex-shrink-0" />
            <select
              id="smart-search-location-select"
              value={selectedLocation}
              onChange={(e) => onLocationChange(e.target.value)}
              className="w-full bg-transparent text-white text-xs sm:text-sm focus:outline-none cursor-pointer"
            >
              {locations.map((loc, idx) => (
                <option key={idx} value={loc} className="bg-[#0F0F17] text-white py-2">
                  {loc}
                </option>
              ))}
            </select>
          </div>

          {/* Date Selector */}
          <div className="md:col-span-2 flex items-center bg-[#151522] rounded-xl sm:rounded-2xl border border-white/8 px-3.5 py-2.5 sm:py-3">
            <Calendar className="w-4 h-4 text-[#E5A93C] mr-2.5 flex-shrink-0" />
            <select
              id="smart-search-date-select"
              value={selectedDate}
              onChange={(e) => onDateChange(e.target.value)}
              className="w-full bg-transparent text-white text-xs sm:text-sm focus:outline-none cursor-pointer"
            >
              {dateOptions.map((opt) => (
                <option key={opt.value} value={opt.value} className="bg-[#0F0F17] text-white">
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Search Button */}
          <div className="md:col-span-3">
            <Button
              id="smart-search-submit-btn"
              size="md"
              variant="gold"
              onClick={() => {
                setIsFocused(false);
                onExecuteSearch();
              }}
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="w-full h-full py-3 sm:py-3.5 text-sm sm:text-base font-bold shadow-md shadow-[#E5A93C]/25"
            >
              Find Events
            </Button>
          </div>

        </div>

        {/* Trending Searches Row */}
        <div className="mt-3 pt-3 border-t border-white/6 flex items-center gap-2 overflow-x-auto custom-scrollbar text-xs">
          <div className="flex items-center gap-1 text-zinc-500 font-mono flex-shrink-0">
            <Flame className="w-3.5 h-3.5 text-amber-500" />
            <span>Trending:</span>
          </div>
          <div className="flex items-center gap-1.5 flex-nowrap">
            {trendingTags.map((tag, idx) => (
              <button
                key={idx}
                onClick={() => handleTagClick(tag)}
                className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-[#E5A93C]/15 text-zinc-300 hover:text-[#FDE68A] border border-white/8 hover:border-[#E5A93C]/40 transition-colors whitespace-nowrap cursor-pointer text-xs"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Autocomplete Dropdown Popup */}
        <AnimatePresence>
          {isFocused && (searchQuery.trim() !== '' || recentSearches.length > 0) && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute left-0 right-0 top-full mt-2 bg-[#0E0E18] border border-white/15 rounded-2xl p-4 shadow-2xl z-50 text-left"
            >
              {/* Autocomplete Match List */}
              {filteredSuggestions.length > 0 && (
                <div className="mb-3">
                  <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-2 font-mono">
                    Matching Events
                  </span>
                  <div className="flex flex-col gap-2">
                    {filteredSuggestions.map((ev) => (
                      <div
                        key={ev.id}
                        onClick={() => {
                          onSelectEvent(ev);
                          setIsFocused(false);
                        }}
                        className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group"
                      >
                        <img
                          src={ev.image}
                          alt={ev.title}
                          className="w-12 h-12 rounded-lg object-cover flex-shrink-0 border border-white/10"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-bold text-white group-hover:text-gold-bright transition-colors truncate">
                            {ev.title}
                          </h4>
                          <p className="text-xs text-zinc-400 truncate">
                            📍 {ev.location.city} • {ev.category}
                          </p>
                        </div>
                        <span className="text-xs font-mono font-bold text-[#E5A93C]">
                          ₦{ev.startingPrice.toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <div className="pt-2 border-t border-white/8">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider font-mono flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" /> Recent Searches
                    </span>
                    <button
                      onClick={() => setRecentSearches([])}
                      className="text-[10px] text-zinc-500 hover:text-zinc-300"
                    >
                      Clear
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((item, idx) => (
                      <span
                        key={idx}
                        onClick={() => handleRecentClick(item)}
                        className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs text-zinc-300 cursor-pointer transition-colors"
                      >
                        <span>{item}</span>
                        <X
                          className="w-3 h-3 hover:text-rose-400"
                          onClick={(e) => removeRecent(idx, e)}
                        />
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
