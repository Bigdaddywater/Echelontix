import React from 'react';
import { EventItem } from '../types';
import { HeroSection } from '../components/sections/HeroSection';
import { SmartSearch } from '../components/sections/SmartSearch';
import { WhyEchelontix } from '../components/sections/WhyEchelontix';
import { FeaturedEvents } from '../components/sections/FeaturedEvents';
import { CategoriesSection } from '../components/sections/CategoriesSection';
import { CommunitySection } from '../components/sections/CommunitySection';
import { OrganizerCTA } from '../components/sections/OrganizerCTA';
import { TestimonialsSection } from '../components/sections/TestimonialsSection';
import { StatisticsSection } from '../components/sections/StatisticsSection';
import { NewsletterSection } from '../components/sections/NewsletterSection';

export interface HomePageProps {
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
  onNavigate: (tab: string) => void;
  onOpenCreateEvent: () => void;
  onStartSellingClick?: () => void;
  onOpenJoinCommunity: () => void;
  onOpenScannerDemo: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
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
  onNavigate,
  onOpenCreateEvent,
  onStartSellingClick,
  onOpenJoinCommunity,
  onOpenScannerDemo,
}) => {
  const handleHostClick = onStartSellingClick || onOpenCreateEvent;

  return (
    <div className="w-full">
      {/* Component 2: Hero Section */}
      <HeroSection
        onExploreClick={() => onNavigate('explore')}
        onOrganizerClick={handleHostClick}
        onOpenFeaturedEvent={() => onSelectEvent(events[0])}
      />

      {/* Component 3: Smart Search */}
      <SmartSearch
        events={events}
        searchQuery={searchQuery}
        selectedLocation={selectedLocation}
        selectedCategory={selectedCategory}
        selectedDate={selectedDate}
        onSearchChange={onSearchChange}
        onLocationChange={onLocationChange}
        onCategoryChange={onCategoryChange}
        onDateChange={onDateChange}
        onSelectEvent={onSelectEvent}
        onExecuteSearch={() => onNavigate('explore')}
      />

      {/* Component 5: Featured Events (Netflix-inspired) */}
      <FeaturedEvents
        events={events}
        currency={currency}
        savedEventIds={savedEventIds}
        onToggleSave={onToggleSave}
        onSelectEvent={onSelectEvent}
        onQuickBuy={onQuickBuy}
        onViewAllClick={() => onNavigate('explore')}
      />

      {/* Component 4: Why Echelontix */}
      <WhyEchelontix />

      {/* Component 6: Categories Bento Grid */}
      <CategoriesSection
        onSelectCategory={(cat) => {
          onCategoryChange(cat);
          onNavigate('explore');
        }}
      />

      {/* Component 7: Community */}
      <CommunitySection
        onJoinCommunityClick={onOpenJoinCommunity}
      />

      {/* Component 8: Organizer CTA */}
      <OrganizerCTA
        onStartSellingClick={handleHostClick}
        onOpenScannerDemo={onOpenScannerDemo}
      />

      {/* Component 10: Statistics */}
      <StatisticsSection />

      {/* Component 9: Testimonials */}
      <TestimonialsSection />

      {/* Component 11: Newsletter */}
      <NewsletterSection />
    </div>
  );
};
