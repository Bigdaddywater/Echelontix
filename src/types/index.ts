export type EventCategory = 
  | 'Music' 
  | 'Nightlife' 
  | 'Comedy' 
  | 'Campus' 
  | 'Tech' 
  | 'Business' 
  | 'Gaming' 
  | 'Masterclass' 
  | 'VIP & Luxury';

export type TicketTierType = 'Early Bird' | 'Regular' | 'VIP' | 'Backstage Pass' | 'Table for 6' | 'Student Pass';

export interface TicketTier {
  id: string;
  name: TicketTierType | string;
  price: number; // in NGN (Naira)
  description: string;
  available: number;
  total: number;
  perks: string[];
  isSoldOut?: boolean;
  isPopular?: boolean;
}

export interface EventOrganizer {
  id: string;
  name: string;
  avatar: string;
  verified: boolean;
  rating: number;
  followersCount: number;
  eventsHosted: number;
  bio?: string;
}

export interface EventItem {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  category: EventCategory;
  image: string;
  galleryImages: string[];
  date: string; // ISO date or formatted
  time: string;
  doorsOpen?: string;
  location: {
    venue: string;
    city: string;
    state: string;
    country: string;
    address: string;
    coordinates?: { lat: number; lng: number };
    isCampus?: boolean;
    campusName?: string;
  };
  startingPrice: number; // NGN
  ticketTiers: TicketTier[];
  organizer: EventOrganizer;
  rating: number;
  reviewsCount: number;
  attendeesCount: number;
  maxCapacity: number;
  isFeatured?: boolean;
  isTrending?: boolean;
  isDettyDecember?: boolean;
  isVIPExclusive?: boolean;
  tags: string[];
  dressCode?: string;
  ageRestriction?: string;
}

export interface PurchasedTicket {
  ticketId: string;
  orderId: string;
  eventId: string;
  eventTitle: string;
  eventImage: string;
  eventDate: string;
  eventTime: string;
  venue: string;
  city: string;
  tierName: string;
  pricePaid: number;
  quantity: number;
  holderName: string;
  holderEmail: string;
  holderPhone: string;
  qrCodeValue: string;
  purchaseDate: string;
  status: 'valid' | 'used' | 'transferred' | 'cancelled';
  seatNumber?: string;
}

export type UserRole = 'attendee' | 'organizer' | 'admin' | 'stage_manager' | 'campus_ambassador';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  avatar: string;
  savedEventIds: string[];
  tickets: PurchasedTicket[];
  campus?: string;
  organizationName?: string;
}

export interface ReviewItem {
  id: string;
  authorName: string;
  authorAvatar: string;
  role: string;
  universityOrCity: string;
  rating: number;
  comment: string;
  eventAttended: string;
  verified: boolean;
  date: string;
}

export interface SearchFilterState {
  query: string;
  location: string;
  category: string;
  dateRange: 'all' | 'today' | 'this_weekend' | 'this_month' | 'detty_december';
  priceRange: [number, number];
  isCampusOnly: boolean;
}
