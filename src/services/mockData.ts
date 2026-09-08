import { EventItem, ReviewItem, UserProfile } from '../types';

export const INITIAL_EVENTS: EventItem[] = [
  {
    id: 'flow-detat-2026',
    slug: 'flow-detat-lagos',
    title: "FLOW D'ÉTAT : The Sovereign Rave",
    tagline: 'Lagos most exclusive underground electronic & Afrobeats crossover experience.',
    description: `FLOW D'ÉTAT returns to Lagos for its flagship annual edition. An electrifying night where pulsating Afro-house rhythms meet cyber-noir stage design, state-of-the-art Void acoustics, and an unmatched crowd of cultural tastemakers. 
    
Featuring international guest DJs alongside Africa's finest beat-makers, immersive lighting installations, premium mixology bars, and VIP mezzanine lounges overlooking the Lagos Lagoon.`,
    category: 'Nightlife',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1200&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=800&auto=format&fit=crop'
    ],
    date: '2026-11-28',
    time: '09:00 PM WAT',
    doorsOpen: '08:30 PM',
    location: {
      venue: 'The Monarch Dome & Lagoon Deck',
      city: 'Lagos',
      state: 'Lagos State',
      country: 'Nigeria',
      address: 'Lekki Phase 1, Off Admiralty Way, Lagos',
      isCampus: false,
      coordinates: { lat: 6.4474, lng: 3.4723 }
    },
    startingPrice: 15000,
    ticketTiers: [
      {
        id: 'tier-eb-flow',
        name: 'Early Bird Regular',
        price: 15000,
        description: 'Standard access to main dance deck and open cocktail bars.',
        available: 8,
        total: 150,
        perks: ['Main stage access', 'Complimentary welcome shot', 'Express digital check-in'],
        isPopular: false
      },
      {
        id: 'tier-vip-flow',
        name: 'VIP Golden Circle',
        price: 35000,
        description: 'Elevated mezzanine platform, separate fast-track entrance and private bar.',
        available: 24,
        total: 80,
        perks: ['Fast-track priority entry', 'Access to VIP Lagoon Mezzanine', 'Private restrooms', '2 Drink tokens included'],
        isPopular: true
      },
      {
        id: 'tier-tbl-flow',
        name: 'Echelon Table for 6',
        price: 350000,
        description: 'Reserved luxury sofa booth with dedicated bottle service host and top-shelf spirits.',
        available: 2,
        total: 10,
        perks: ['VIP entry for 6 guests', '2 Premium Champagne Bottles', '1 Cognac / Tequila', 'Dedicated security & bottle hostess'],
        isPopular: false
      }
    ],
    organizer: {
      id: 'org-echelon-productions',
      name: 'Echelon Nightlife Collective',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
      verified: true,
      rating: 4.9,
      followersCount: 14200,
      eventsHosted: 28,
      bio: 'Pioneering premium sonic experiences and upscale festivals in Lagos, Accra, and London.'
    },
    rating: 4.95,
    reviewsCount: 342,
    attendeesCount: 1850,
    maxCapacity: 2000,
    isFeatured: true,
    isTrending: true,
    isDettyDecember: false,
    isVIPExclusive: false,
    tags: ['AfroHouse', 'Nightlife', 'Lekki', 'Electronic', 'Cocktails'],
    dressCode: 'High-Fashion Cyber Glam / All-Black Chic',
    ageRestriction: '18+'
  },
  {
    id: 'native-sound-detty-dec',
    slug: 'native-sound-detty-december',
    title: 'NATIVE SOUND: Detty December Mega Festival',
    tagline: 'The undisputed heartbeat of Lagos December festival season.',
    description: `Detty December reaches its pinnacle. 3 massive stages, 40+ surprise headline artists, art pop-ups, streetwear runway showcases, and non-stop energy till sunrise on the coast of Victoria Island.`,
    category: 'Music',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1200&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=800&auto=format&fit=crop'
    ],
    date: '2026-12-22',
    time: '04:00 PM WAT',
    doorsOpen: '03:00 PM',
    location: {
      venue: 'Eko Atlantic City Arena',
      city: 'Lagos',
      state: 'Lagos State',
      country: 'Nigeria',
      address: 'Eko Atlantic Blvd, Victoria Island, Lagos',
      isCampus: false,
      coordinates: { lat: 6.4172, lng: 3.4116 }
    },
    startingPrice: 25000,
    ticketTiers: [
      {
        id: 'tier-gen-native',
        name: 'General Admission',
        price: 25000,
        description: 'Full festival grounds access to Main Stage and Soundclash Tent.',
        available: 240,
        total: 1200,
        perks: ['Festival wristband', 'Access to food village', 'Standard concert area'],
        isPopular: true
      },
      {
        id: 'tier-vip-native',
        name: 'VIP Front Row Pit',
        price: 60000,
        description: 'Direct proximity to the main artists stage with elevated sightlines.',
        available: 35,
        total: 250,
        perks: ['Stage pit access', 'Fast-track gate', 'Exclusive VIP merchandise pack', 'VIP restroom trailers'],
        isPopular: false
      }
    ],
    organizer: {
      id: 'org-native-mag',
      name: 'NATIVE Live Events',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
      verified: true,
      rating: 4.88,
      followersCount: 38900,
      eventsHosted: 42
    },
    rating: 4.88,
    reviewsCount: 512,
    attendeesCount: 4500,
    maxCapacity: 5000,
    isFeatured: true,
    isTrending: true,
    isDettyDecember: true,
    tags: ['Afrobeats', 'Festival', 'DettyDecember', 'Concert', 'Lagos'],
    dressCode: 'Streetwear & Festival Ready',
    ageRestriction: 'All Ages (Kids under 10 free with adult)'
  },
  {
    id: 'unilag-neon-rave',
    slug: 'unilag-fresher-soundclash',
    title: "UNILAG Neon Soundclash & Hall Fest",
    tagline: 'The biggest inter-faculty music, dance, and DJ competition in Nigeria.',
    description: `Represent your hall! The annual University of Lagos Neon Soundclash unites students across Akoka and beyond for an adrenaline-fueled showcase of campus DJs, emerging rap royalty, glow-in-the-dark paint stations, and gaming lounges.`,
    category: 'Campus',
    image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=1200&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop'
    ],
    date: '2026-09-18',
    time: '05:00 PM WAT',
    doorsOpen: '04:30 PM',
    location: {
      venue: 'UNILAG Indoor Sports Centre & Multipurpose Hall',
      city: 'Akoka, Lagos',
      state: 'Lagos State',
      country: 'Nigeria',
      address: 'University of Lagos, Akoka, Yaba, Lagos',
      isCampus: true,
      campusName: 'University of Lagos (UNILAG)',
      coordinates: { lat: 6.5160, lng: 3.3870 }
    },
    startingPrice: 3500,
    ticketTiers: [
      {
        id: 'tier-stud-unilag',
        name: 'Student Pass (Valid ID Req.)',
        price: 3500,
        description: 'Subsidized entry with student matriculation badge.',
        available: 310,
        total: 1000,
        perks: ['Campus ID entry', 'Free neon glow stick pack', 'Voting rights for Hall DJ clash'],
        isPopular: true
      },
      {
        id: 'tier-vip-unilag',
        name: 'Student VIP + Merch',
        price: 8000,
        description: 'Front stage pit access + limited edition custom oversized campus tee.',
        available: 45,
        total: 150,
        perks: ['Priority entry', 'Custom Neon Soundclash T-Shirt', 'Energy drink can', 'Green room photo ops'],
        isPopular: false
      }
    ],
    organizer: {
      id: 'org-unilag-sug',
      name: 'UNILAG Entertainment Council',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200&auto=format&fit=crop',
      verified: true,
      rating: 4.79,
      followersCount: 8900,
      eventsHosted: 15
    },
    rating: 4.82,
    reviewsCount: 189,
    attendeesCount: 1420,
    maxCapacity: 1600,
    isFeatured: true,
    isTrending: false,
    tags: ['Campus', 'UNILAG', 'Students', 'Soundclash', 'DJ Battle'],
    ageRestriction: 'All Campuses Welcome'
  },
  {
    id: 'silicon-lagoon-summit',
    slug: 'silicon-lagoon-tech-summit-2026',
    title: 'Silicon Lagoon: Africa Founders & VC Summit',
    tagline: 'Where the next generation of African unicorns, venture capital, and AI pioneers converge.',
    description: `Join 2,000+ top tech founders, angel investors, CTOs, and global product designers in Victoria Island. High-impact keynotes on fintech, frontier AI, cross-border payments, alongside closed-door deal rooms and speed-pitch competitions.`,
    category: 'Tech',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=800&auto=format&fit=crop'
    ],
    date: '2026-10-14',
    time: '09:00 AM WAT',
    doorsOpen: '08:00 AM',
    location: {
      venue: 'Landmark Centre Hall 1 & 2',
      city: 'Victoria Island, Lagos',
      state: 'Lagos State',
      country: 'Nigeria',
      address: 'Water Corporation Drive, Oniru, Victoria Island, Lagos',
      isCampus: false,
      coordinates: { lat: 6.4281, lng: 3.4357 }
    },
    startingPrice: 20000,
    ticketTiers: [
      {
        id: 'tier-builder-tech',
        name: 'Builder / Developer Pass',
        price: 20000,
        description: 'Full access to stages, hack-lounge, and developer workshops.',
        available: 110,
        total: 500,
        perks: ['Keynotes & breakout sessions', 'Tech exhibition floor', 'Lunch buffet & coffee stations', 'Digital networking app pass'],
        isPopular: true
      },
      {
        id: 'tier-exec-tech',
        name: 'Executive & Investor VIP',
        price: 85000,
        description: 'Exclusive access to closed VIP Investor Lounge, private dinners, and matchmaking suite.',
        available: 18,
        total: 100,
        perks: ['All Builder perks', 'VIP Deal Room access', 'Founders & Investors Gala Dinner', 'Fast-track concierge'],
        isPopular: false
      }
    ],
    organizer: {
      id: 'org-lagoon-ventures',
      name: 'Silicon Lagoon Network',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
      verified: true,
      rating: 4.96,
      followersCount: 19800,
      eventsHosted: 19
    },
    rating: 4.94,
    reviewsCount: 278,
    attendeesCount: 1650,
    maxCapacity: 2000,
    isFeatured: true,
    isTrending: false,
    tags: ['Tech', 'Founders', 'VentureCapital', 'AI', 'LagosTech'],
    dressCode: 'Smart Casual / Business Modern'
  },
  {
    id: 'abuja-laugh-gala',
    slug: 'abuja-royal-comedy-gala',
    title: 'The Grand Comedy & Jazz Gala: Abuja',
    tagline: 'An evening of regal humor, saxophone melodies, and 5-course gourmet dining.',
    description: `Abuja's premier black-tie comedy spectacle returns to the Congress Hall of Transcorp Hilton. Featuring the country's most celebrated headliners alongside live 12-piece jazz orchestration.`,
    category: 'Comedy',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop'
    ],
    date: '2026-11-06',
    time: '07:00 PM WAT',
    doorsOpen: '06:00 PM',
    location: {
      venue: 'Congress Hall, Transcorp Hilton',
      city: 'Abuja',
      state: 'FCT',
      country: 'Nigeria',
      address: '1 Aguiyi Ironsi St, Maitama, Abuja',
      isCampus: false,
      coordinates: { lat: 9.0765, lng: 7.4985 }
    },
    startingPrice: 18000,
    ticketTiers: [
      {
        id: 'tier-prem-laugh',
        name: 'Premium Theatre Seat',
        price: 18000,
        description: 'Reserved auditorium seating with complimentary champagne glass.',
        available: 64,
        total: 300,
        perks: ['Reserved auditorium seating', 'Red carpet welcome cocktail'],
        isPopular: false
      },
      {
        id: 'tier-vip-laugh',
        name: 'VIP Banquet Dinner Table Seat',
        price: 50000,
        description: 'Seat at 5-course seated banquet table with vintage wines and close stage view.',
        available: 12,
        total: 120,
        perks: ['5-course gourmet dinner', 'Vintage wine pairing', 'Red carpet photo feature', 'VIP parking valet'],
        isPopular: true
      }
    ],
    organizer: {
      id: 'org-capital-entertainment',
      name: 'Capital Elite Arts',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop',
      verified: true,
      rating: 4.87,
      followersCount: 9400,
      eventsHosted: 11
    },
    rating: 4.9,
    reviewsCount: 145,
    attendeesCount: 680,
    maxCapacity: 750,
    isFeatured: false,
    isTrending: true,
    tags: ['Comedy', 'Abuja', 'BlackTie', 'Jazz', 'Maitama'],
    dressCode: 'Black Tie / Evening Glamour'
  },
  {
    id: 'covenant-vibes-fest',
    slug: 'covenant-creative-soundfest',
    title: 'Echelon Campus Tour: Ota & Covenant Live',
    tagline: 'Gospel, Afrobeats fusion, creative art showcases, and youth entrepreneurship pop-up.',
    description: `A weekend festival of uplifting sounds, design hackathons, student brand pop-up markets, and inspirational creator keynotes welcoming students across Ogun State campuses.`,
    category: 'Campus',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200&auto=format&fit=crop',
    galleryImages: [],
    date: '2026-10-03',
    time: '04:00 PM WAT',
    doorsOpen: '03:30 PM',
    location: {
      venue: 'The Grand Marquee Centre',
      city: 'Ota',
      state: 'Ogun State',
      country: 'Nigeria',
      address: 'Km 10 Idiroko Road, Canaanland, Ota',
      isCampus: true,
      campusName: 'Covenant University / Bells / Crawford',
      coordinates: { lat: 6.6745, lng: 3.1616 }
    },
    startingPrice: 4500,
    ticketTiers: [
      {
        id: 'tier-stud-covenant',
        name: 'Student All-Access',
        price: 4500,
        description: 'Complete weekend admission to market, performances, and talks.',
        available: 120,
        total: 500,
        perks: ['Concert access', 'Student discount book with 20+ vendors', 'Souvenir badge'],
        isPopular: true
      }
    ],
    organizer: {
      id: 'org-echelon-campus',
      name: 'Echelon Youth Network',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=200&auto=format&fit=crop',
      verified: true,
      rating: 4.89,
      followersCount: 16400,
      eventsHosted: 22
    },
    rating: 4.86,
    reviewsCount: 92,
    attendeesCount: 780,
    maxCapacity: 900,
    isFeatured: false,
    isTrending: false,
    tags: ['Campus', 'Youth', 'Music', 'Ota', 'Creatives']
  },
  {
    id: 'aura-midnight-rooftop',
    slug: 'aura-midnight-rooftop-lagos',
    title: 'AURA: High-Altitude Sunset & Midnight Groove',
    tagline: 'Panoramic skyline views, deep melodic afro-house, and premium culinary pairing.',
    description: `Perched 16 stories above Victoria Island with 360-degree views of the Atlantic Ocean and glowing Lagos skyline. A strictly curated crowd enjoying bespoke champagne cocktails, live sax accompaniment, and world-class selectors.`,
    category: 'VIP & Luxury',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1200&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=800&auto=format&fit=crop'
    ],
    date: '2026-11-20',
    time: '05:30 PM WAT',
    doorsOpen: '05:00 PM',
    location: {
      venue: 'The Sky Deck at Wings Tower',
      city: 'Victoria Island, Lagos',
      state: 'Lagos State',
      country: 'Nigeria',
      address: 'Ozumba Mbadiwe Ave, Victoria Island, Lagos',
      isCampus: false,
      coordinates: { lat: 6.4344, lng: 3.4218 }
    },
    startingPrice: 35000,
    ticketTiers: [
      {
        id: 'tier-sunset-pass',
        name: 'Sunset Guest Pass',
        price: 35000,
        description: 'Single admission with signature cocktails and sunset hors doeuvres.',
        available: 15,
        total: 75,
        perks: ['Sky Deck access', '2 Signature cocktails', 'Gourmet canapés by Chef Tolu', 'Valet parking'],
        isPopular: true
      },
      {
        id: 'tier-sky-cabana',
        name: 'VIP Sky Cabana (8 Guests)',
        price: 600000,
        description: 'Private glass-walled cabana overlooking the ocean with Dom Pérignon and dedicated sommelier.',
        available: 1,
        total: 4,
        perks: ['Private cabana for 8', '2 Dom Pérignon Vintage Bottles', 'Chef private tasting platter', 'Dedicated butler'],
        isPopular: false
      }
    ],
    organizer: {
      id: 'org-echelon-productions',
      name: 'Echelon Nightlife Collective',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
      verified: true,
      rating: 4.95,
      followersCount: 14200,
      eventsHosted: 28
    },
    rating: 4.98,
    reviewsCount: 110,
    attendeesCount: 220,
    maxCapacity: 250,
    isFeatured: true,
    isTrending: true,
    isVIPExclusive: true,
    tags: ['Luxury', 'Rooftop', 'Sunset', 'LagosSkyline', 'VIP'],
    dressCode: 'Resort Glam / Sophisticated Allure'
  },
  {
    id: 'ph-garden-groove',
    slug: 'port-harcourt-garden-sound-groove',
    title: 'Port Harcourt Garden City Sound & Grill',
    tagline: 'Live Highlife, Afrobeats, artisanal bole & fish BBQ, and open-air lawn vibes.',
    description: `The best of Garden City culture! Savor mouthwatering Port Harcourt bole with pepper sauce, cold palmwine cocktails, and live bands performing from sunset into the starry night.`,
    category: 'Music',
    image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=1200&auto=format&fit=crop',
    galleryImages: [],
    date: '2026-10-31',
    time: '03:00 PM WAT',
    doorsOpen: '02:30 PM',
    location: {
      venue: 'Port Harcourt Polo Club Grounds',
      city: 'Port Harcourt',
      state: 'Rivers State',
      country: 'Nigeria',
      address: 'Tombia Street, GRA Phase 2, Port Harcourt',
      isCampus: false,
      coordinates: { lat: 4.8217, lng: 7.0028 }
    },
    startingPrice: 8000,
    ticketTiers: [
      {
        id: 'tier-ph-regular',
        name: 'Regular Lawn Pass',
        price: 8000,
        description: 'Lawn admission + complimentary bole tasting platter.',
        available: 80,
        total: 400,
        perks: ['Open lawn festival access', 'Free BBQ tasting voucher'],
        isPopular: true
      }
    ],
    organizer: {
      id: 'org-ph-grooves',
      name: 'South-South Sounds',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop',
      verified: true,
      rating: 4.81,
      followersCount: 7200,
      eventsHosted: 9
    },
    rating: 4.84,
    reviewsCount: 68,
    attendeesCount: 520,
    maxCapacity: 600,
    isFeatured: false,
    isTrending: false,
    tags: ['PortHarcourt', 'LiveMusic', 'FoodFest', 'Grill', 'Bole']
  }
];

export const TESTIMONIALS_DATA: ReviewItem[] = [
  {
    id: 't-1',
    authorName: 'Damilola Adeleke',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop',
    role: 'Student & Creator',
    universityOrCity: 'UNILAG (Mass Comm)',
    rating: 5,
    comment: 'Getting tickets in Lagos used to be stressful with shady links and failed payments. With Echelontix, I had my Apple Wallet QR code ready in 15 seconds. Entry at the gate was instantaneous.',
    eventAttended: "FLOW D'ÉTAT Lagos",
    verified: true,
    date: '2 days ago'
  },
  {
    id: 't-2',
    authorName: 'Chima Obi',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop',
    role: 'Festival Lead Organizer',
    universityOrCity: 'NATIVE Live Events',
    rating: 5,
    comment: 'As an event promoter handling over 4,500 people, the real-time check-in scanner and instant bank settlement dashboard changed our entire operation. Zero ticket counterfeits.',
    eventAttended: 'Detty December Mega Festival',
    verified: true,
    date: '1 week ago'
  },
  {
    id: 't-3',
    authorName: 'Zainab Al-Hassan',
    authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop',
    role: 'Product Designer',
    universityOrCity: 'Maitama, Abuja',
    rating: 5,
    comment: 'The interface is truly world-class. It feels like an Apple keynote experience tailored right for Nigeria. Finally, a luxury event platform that respects our taste and security.',
    eventAttended: 'The Grand Comedy & Jazz Gala',
    verified: true,
    date: '2 weeks ago'
  },
  {
    id: 't-4',
    authorName: 'Femi Balogun',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop',
    role: 'Campus Ambassador Lead',
    universityOrCity: 'Covenant University',
    rating: 5,
    comment: 'Our student community organized 3 sold-out raves on Echelontix. The referral links and automated student ID verification saved us weeks of manual headache.',
    eventAttended: 'Campus Creative Tour',
    verified: true,
    date: '3 weeks ago'
  }
];

export const PLATFORM_STATS = {
  attendeesCount: 15400,
  eventsHosted: 720,
  campusesCount: 64,
  satisfactionRate: 98.4,
  payoutVolumeNGN: '₦1.45B+'
};

export const SAMPLE_EVENTS: EventItem[] = INITIAL_EVENTS;

export const SAMPLE_USER: UserProfile = {
  id: 'user-sample-01',
  name: 'Chukwuebuka Stephen',
  email: 'chukwuebuka@echelontix.com',
  phone: '+234 812 345 6789',
  role: 'attendee',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
  savedEventIds: ['flow-detat-2026', 'native-sound-detty-dec'],
  tickets: [],
  campus: 'University of Lagos (UNILAG)',
  organizationName: 'Echelon Nightlife VIP'
};

