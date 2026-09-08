import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  MapPin, 
  Calendar, 
  Filter, 
  Sparkles, 
  Grid, 
  List, 
  SlidersHorizontal, 
  RotateCcw,
  ArrowUpDown,
  Compass
} from 'lucide-react';
import { EventItem } from '../types';
import { EventCard } from '../components/cards/EventCard';
import { Button } from '../components/ui/Button';
import { formatNaira, formatUSD } from '../utils/formatters';

export interface ExplorePageProps {
  events: EventItem[];
  currency: 'NGN' | 'USD';
  savedEventIds: string[];
  searchQuery: string;
  selectedLocation: string;
  selectedCategory: string;
  selectedDate: string;
  onSearchChange: (q: string) => void;
  onLocationChange: (loc: string) => void;
  onCategoryChange: (cat: string) => void;
  onDateChange: (date: string) => void;
  onSelectEvent: (event: EventItem) => void;
  onQuickBuy: (event: EventItem) => void;
  onToggleSave: (id: string) => void;
}

export const ExplorePage: React.FC<ExplorePageProps> = ({
  events,
  currency,
  savedEventIds,
  searchQuery,
  selectedLocation,
  selectedCategory,
  selectedDate,
  onSearchChange,
  onLocationChange,
  onCategoryChange,
  onDateChange,
  onSelectEvent,
  onQuickBuy,
  onToggleSave,
}) => {
  const [sortBy, setSortBy] = useState<'trending' | 'date' | 'price_asc' | 'price_desc' | 'rating'>('trending');
  const [maxPrice, setMaxPrice] = useState<number>(100000);
  const [onlyCampus, setOnlyCampus] = useState(false);

  const categories = [
    'All Categories',
    'Music',
    'Nightlife',
    'Campus',
    'Tech',
    'Comedy',
    'VIP & Luxury',
    'Gaming',
    'Masterclass'
  ];

  const locations = [
    'All Locations',
    'Lagos',
    'Abuja',
    'Port Harcourt',
    'Ibadan',
    'Akoka',
    'Ota'
  ];

  // Filtering Logic
  const filteredEvents = events.filter((event) => {
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = event.title.toLowerCase().includes(q);
      const matchDesc = event.description.toLowerCase().includes(q);
      const matchCat = event.category.toLowerCase().includes(q);
      const matchLoc = event.location.city.toLowerCase().includes(q) || event.location.venue.toLowerCase().includes(q);
      const matchTag = event.tags.some(t => t.toLowerCase().includes(q));
      if (!matchTitle && !matchDesc && !matchCat && !matchLoc && !matchTag) return false;
    }

    // Category
    if (selectedCategory && selectedCategory !== 'All Categories' && selectedCategory !== 'All') {
      if (!event.category.toLowerCase().includes(selectedCategory.toLowerCase())) return false;
    }

    // Location
    if (selectedLocation && selectedLocation !== 'All Locations' && selectedLocation !== 'All') {
      const locClean = selectedLocation.split(' ')[0].toLowerCase();
      if (!event.location.city.toLowerCase().includes(locClean) && !event.location.venue.toLowerCase().includes(locClean)) {
        return false;
      }
    }

    // Campus only filter
    if (onlyCampus && !event.location.isCampus && event.category !== 'Campus') {
      return false;
    }

    // Price
    if (event.startingPrice > maxPrice) {
      return false;
    }

    return true;
  });

  // Sorting Logic
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    if (sortBy === 'price_asc') return a.startingPrice - b.startingPrice;
    if (sortBy === 'price_desc') return b.startingPrice - a.startingPrice;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'date') return new Date(a.date).getTime() - new Date(b.date).getTime();
    // Default trending / popular
    return b.attendeesCount - a.attendeesCount;
  });

  const handleResetFilters = () => {
    onSearchChange('');
    onLocationChange('All Locations');
    onCategoryChange('All Categories');
    onDateChange('all');
    setMaxPrice(100000);
    setOnlyCampus(false);
  };

  return (
    <div className="pt-24 sm:pt-28 pb-24 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
      
      {/* Top Header Banner */}
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center gap-2 text-[10px] sm:text-xs font-mono uppercase text-[#E5A93C] tracking-widest mb-1.5 sm:mb-2">
          <Compass className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>Curated Event Directory</span>
        </div>
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-black font-serif text-white tracking-tight">
          EXPLORE <span className="text-gold-metallic">LIVE EXPERIENCES</span>
        </h1>
        <p className="text-zinc-400 text-xs sm:text-base mt-1">
          Showing {sortedEvents.length} verified events across Nigeria and West African campuses.
        </p>
      </div>

      {/* Main Search and Fast Filter Strip */}
      <div className="bg-[#0E0E16] rounded-xl sm:rounded-2xl border border-white/10 p-3 sm:p-4 mb-6 sm:mb-8 shadow-xl space-y-3 sm:space-y-4">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-2.5 sm:gap-3">
          {/* Keyword search input */}
          <div className="md:col-span-5 flex items-center bg-[#151522] rounded-xl border border-white/8 px-3.5 py-2.5">
            <Search className="w-4 h-4 text-[#E5A93C] mr-2.5" />
            <input
              type="text"
              placeholder="Search by artist, venue, rave name..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-transparent text-white text-xs sm:text-sm focus:outline-none"
            />
          </div>

          {/* Location Select */}
          <div className="md:col-span-3 flex items-center bg-[#151522] rounded-xl border border-white/8 px-3 py-2.5">
            <MapPin className="w-4 h-4 text-[#E5A93C] mr-2" />
            <select
              value={selectedLocation}
              onChange={(e) => onLocationChange(e.target.value)}
              className="w-full bg-transparent text-white text-xs focus:outline-none cursor-pointer"
            >
              {locations.map((l, idx) => (
                <option key={idx} value={l} className="bg-[#0E0E16] text-white">
                  {l}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By Select */}
          <div className="md:col-span-4 flex items-center bg-[#151522] rounded-xl border border-white/8 px-3 py-2.5">
            <ArrowUpDown className="w-4 h-4 text-[#E5A93C] mr-2" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'trending' | 'date' | 'price_asc' | 'price_desc' | 'rating')}
              className="w-full bg-transparent text-white text-xs focus:outline-none cursor-pointer"
            >
              <option value="trending" className="bg-[#0E0E16]">🔥 Most Popular / Trending</option>
              <option value="date" className="bg-[#0E0E16]">📅 Date: Soonest First</option>
              <option value="price_asc" className="bg-[#0E0E16]">💰 Price: Low to High</option>
              <option value="price_desc" className="bg-[#0E0E16]">👑 Price: High to Low (VIP)</option>
              <option value="rating" className="bg-[#0E0E16]">⭐ Highest Rated (5.0)</option>
            </select>
          </div>
        </div>

        {/* Category Horizontal Chips */}
        <div className="flex items-center justify-between gap-2 pt-2 border-t border-white/6 overflow-x-auto custom-scrollbar">
          <div className="flex items-center gap-1.5 flex-nowrap">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => onCategoryChange(cat)}
                className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[11px] sm:text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  (selectedCategory === cat || (cat === 'All Categories' && (!selectedCategory || selectedCategory === 'All')))
                    ? 'bg-[#E5A93C] text-black font-bold'
                    : 'bg-white/5 text-zinc-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Reset Filters button */}
          <button
            onClick={handleResetFilters}
            className="flex items-center gap-1 text-[11px] sm:text-xs text-zinc-400 hover:text-[#E5A93C] whitespace-nowrap px-2 py-1 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">Reset Filters</span>
          </button>
        </div>

      </div>

      {/* Grid of Events: 2 columns on mobile, 3 on md, 4 on xl */}
      <motion.div 
        layout
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-6"
      >
        <AnimatePresence mode="popLayout">
          {sortedEvents.map((event) => (
            <motion.div
              layout
              key={event.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <EventCard
                event={event}
                currency={currency}
                isSaved={savedEventIds.includes(event.id)}
                onToggleSave={onToggleSave}
                onSelectEvent={onSelectEvent}
                onQuickBuy={onQuickBuy}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {sortedEvents.length === 0 && (
        <div className="py-20 text-center bg-[#0E0E16] rounded-3xl border border-white/10 p-8 max-w-lg mx-auto">
          <Filter className="w-12 h-12 text-[#E5A93C] mx-auto mb-3 opacity-70" />
          <h3 className="text-xl font-bold text-white font-serif mb-2">No Matching Events Found</h3>
          <p className="text-xs text-zinc-400 mb-6 leading-relaxed">
            We couldn't find any events matching your selected search criteria. Try clearing some filters or searching for other cities.
          </p>
          <Button variant="gold" size="md" onClick={handleResetFilters}>
            Clear All Filters
          </Button>
        </div>
      )}

    </div>
  );
};
