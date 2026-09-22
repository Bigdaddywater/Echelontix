import React, { useState, useEffect } from 'react';
import { SAMPLE_EVENTS, SAMPLE_USER } from './services/mockData';
import { EventItem, PurchasedTicket, UserProfile } from './types';

// Layout Components
import { Navbar } from './components/layout/Navbar';
import { MobileNav } from './components/layout/MobileNav';
import { Footer } from './components/layout/Footer';

// Pages
import { HomePage } from './pages/HomePage';
import { ExplorePage } from './pages/ExplorePage';
import { EventDetailsPage } from './pages/EventDetailsPage';
import { LoginPage } from './pages/LoginPage';
import { SignUpPage } from './pages/SignUpPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { VerifyEmailPage } from './pages/VerifyEmailPage';
import { OrganizerDashboardPage } from './pages/OrganizerDashboardPage';
import { UserDashboardPage } from './pages/UserDashboardPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { CreateEventPage } from './pages/CreateEventPage';
import { GateScannerPage } from './pages/GateScannerPage';

// Shared Modals
import { AuthModal } from './components/shared/AuthModal';
import { CreateEventModal } from './components/shared/CreateEventModal';
import { QRScannerModal } from './components/shared/QRScannerModal';
import { CommunityJoinModal } from './components/shared/CommunityJoinModal';
import { OrganizerAuthModal } from './components/shared/OrganizerAuthModal';

export type AppRoute = 
  | 'home' 
  | 'explore' 
  | 'event-details' 
  | 'login' 
  | 'signup' 
  | 'forgot-password' 
  | 'verify-email' 
  | 'organizer' 
  | 'my-tickets' 
  | 'admin' 
  | 'create-event' 
  | 'gate-scanner';

export default function App() {
  // Navigation Route State
  const [currentRoute, setCurrentRoute] = useState<AppRoute>('home');

  // Core Data
  const [events, setEvents] = useState<EventItem[]>(SAMPLE_EVENTS);
  const [currency, setCurrency] = useState<'NGN' | 'USD'>('NGN');
  const [savedEventIds, setSavedEventIds] = useState<string[]>(['flow-detat-2026', 'native-sound-detty-dec']);
  
  // Default to null (Guest explorer) so users can explore and purchase without login
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    if (typeof window === 'undefined') return null;
    const saved = localStorage.getItem('echelontix_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Active Selected Event for Details Page
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(SAMPLE_EVENTS[0]);

  // Tickets stored in state + browser storage for guest accessibility
  const [purchasedTickets, setPurchasedTickets] = useState<PurchasedTicket[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('echelontix_passes');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // fallback
        }
      }
    }
    return [
      {
        ticketId: 'ECH-849201',
        orderId: 'ORD-991204',
        eventId: 'flow-detat-2026',
        eventTitle: "FLOW D'ÉTAT : The Sovereign Rave",
        eventImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1200&auto=format&fit=crop',
        eventDate: '2026-11-28',
        eventTime: '09:00 PM WAT',
        venue: 'The Grand Monarch Marquee',
        city: 'Lagos',
        tierName: 'VIP Golden Circle',
        pricePaid: 35000,
        quantity: 1,
        holderName: 'Guest Passholder',
        holderEmail: 'guest@echelontix.com',
        holderPhone: '+234 812 345 6789',
        qrCodeValue: 'ECHELON-PASS:flow-detat-2026:tier-vip:1764368400000',
        purchaseDate: '2026-11-01T10:00:00Z',
        status: 'valid',
        seatNumber: 'VIP Lounge Deck B'
      }
    ];
  });

  // Save tickets to local storage on update
  useEffect(() => {
    localStorage.setItem('echelontix_passes', JSON.stringify(purchasedTickets));
  }, [purchasedTickets]);

  // Save user profile to local storage on update
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('echelontix_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('echelontix_user');
    }
  }, [currentUser]);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedDate, setSelectedDate] = useState('all');

  // Selected Event Tier for Direct Checkout on EventDetailsPage
  const [selectedTierId, setSelectedTierId] = useState<string | undefined>(undefined);

  // Modals Visibility
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authInitialMode, setAuthInitialMode] = useState<'login' | 'register'>('login');
  const [authInitialRole, setAuthInitialRole] = useState<UserProfile['role']>('attendee');

  const [isOrganizerAuthModalOpen, setIsOrganizerAuthModalOpen] = useState(false);
  const [isCreateEventModalOpen, setIsCreateEventModalOpen] = useState(false);
  const [isScannerModalOpen, setIsScannerModalOpen] = useState(false);
  const [isCommunityModalOpen, setIsCommunityModalOpen] = useState(false);

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleStartSellingTickets = () => {
    if (currentUser?.role === 'organizer') {
      handleNavigate('create-event');
    } else {
      setIsOrganizerAuthModalOpen(true);
    }
  };

  const handleNavigate = (route: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (route === 'community') {
      setIsCommunityModalOpen(true);
      return;
    }

    if (route === 'create-event') {
      setCurrentRoute('create-event');
      return;
    }

    if (route === 'gate-scanner') {
      setCurrentRoute('gate-scanner');
      return;
    }

    if (['home', 'explore', 'event-details', 'login', 'signup', 'forgot-password', 'verify-email', 'organizer', 'my-tickets', 'admin'].includes(route)) {
      setCurrentRoute(route as AppRoute);
    }
  };

  const handleToggleSave = (eventId: string) => {
    if (savedEventIds.includes(eventId)) {
      setSavedEventIds(savedEventIds.filter((id) => id !== eventId));
      showToast('Removed from saved list');
    } else {
      setSavedEventIds([...savedEventIds, eventId]);
      showToast('Saved to wishlist ❤️');
    }
  };

  const handleSelectEvent = (event: EventItem, tierId?: string) => {
    setSelectedEvent(event);
    setSelectedTierId(tierId);
    setCurrentRoute('event-details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuickBuy = (event: EventItem, tierId?: string) => {
    handleSelectEvent(event, tierId);
  };

  const handleTicketPurchased = (
    newTicket: PurchasedTicket,
    optionalAccount?: { name: string; email: string; phone: string }
  ) => {
    setPurchasedTickets([newTicket, ...purchasedTickets]);
    
    if (optionalAccount) {
      const newUser: UserProfile = {
        id: `usr_${Date.now()}`,
        name: optionalAccount.name,
        email: optionalAccount.email,
        phone: optionalAccount.phone,
        role: 'attendee',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
        savedEventIds: savedEventIds,
        tickets: [newTicket, ...purchasedTickets]
      };
      setCurrentUser(newUser);
      showToast(`VIP Pass issued & account created for ${optionalAccount.name}! 🎟️`);
    } else {
      showToast(`VIP Pass issued for ${newTicket.eventTitle}! 🎟️ (No login needed)`);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    showToast('Switched to Guest Session ⚡');
  };

  const handleEventCreated = (newEvent: EventItem) => {
    setEvents([newEvent, ...events]);
    showToast(`Event "${newEvent.title}" published live! ⚡`);
    setCurrentRoute('explore');
  };

  const savedEventsList = events.filter((e) => savedEventIds.includes(e.id));

  return (
    <div className="min-h-screen bg-[#070709] text-white flex flex-col font-sans selection:bg-[#E5A93C]/30 selection:text-[#FDE68A]">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-2xl bg-[#141422] border border-[#E5A93C]/60 text-white text-xs font-mono font-bold shadow-2xl flex items-center gap-2 animate-bounce">
          <span className="w-2 h-2 rounded-full bg-[#E5A93C]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Component 1: Navbar */}
      <Navbar
        activeTab={currentRoute}
        onTabChange={handleNavigate}
        currency={currency}
        onCurrencyToggle={() => setCurrency(currency === 'NGN' ? 'USD' : 'NGN')}
        currentUser={currentUser}
        ticketsCount={purchasedTickets.length}
        savedCount={savedEventIds.length}
        onLoginClick={() => {
          setAuthInitialRole('attendee');
          handleNavigate('login');
        }}
        onSignUpClick={() => {
          setAuthInitialRole('attendee');
          handleNavigate('signup');
        }}
        onCreateEventClick={handleStartSellingTickets}
        onLogout={handleLogout}
      />

      {/* Page Router */}
      <main className="flex-1 w-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {currentRoute === 'home' && (
          <HomePage
            events={events}
            currency={currency}
            savedEventIds={savedEventIds}
            searchQuery={searchQuery}
            selectedLocation={selectedLocation}
            selectedCategory={selectedCategory}
            selectedDate={selectedDate}
            onSearchChange={setSearchQuery}
            onLocationChange={setSelectedLocation}
            onCategoryChange={setSelectedCategory}
            onDateChange={setSelectedDate}
            onSelectEvent={handleSelectEvent}
            onQuickBuy={handleQuickBuy}
            onToggleSave={handleToggleSave}
            onNavigate={handleNavigate}
            onOpenCreateEvent={handleStartSellingTickets}
            onStartSellingClick={handleStartSellingTickets}
            onOpenJoinCommunity={() => setIsCommunityModalOpen(true)}
            onOpenScannerDemo={() => handleNavigate('gate-scanner')}
          />
        )}

        {currentRoute === 'explore' && (
          <ExplorePage
            events={events}
            currency={currency}
            savedEventIds={savedEventIds}
            searchQuery={searchQuery}
            selectedLocation={selectedLocation}
            selectedCategory={selectedCategory}
            selectedDate={selectedDate}
            onSearchChange={setSearchQuery}
            onLocationChange={setSelectedLocation}
            onCategoryChange={setSelectedCategory}
            onDateChange={setSelectedDate}
            onSelectEvent={handleSelectEvent}
            onQuickBuy={handleQuickBuy}
            onToggleSave={handleToggleSave}
          />
        )}

        {currentRoute === 'event-details' && (
          <EventDetailsPage
            event={selectedEvent}
            initialTierId={selectedTierId}
            currency={currency}
            currentUser={currentUser}
            isSaved={selectedEvent ? savedEventIds.includes(selectedEvent.id) : false}
            onToggleSave={handleToggleSave}
            onTicketPurchased={handleTicketPurchased}
            onViewMyTickets={() => handleNavigate('my-tickets')}
            onSelectRelatedEvent={(relEvent) => handleSelectEvent(relEvent)}
            onBack={() => handleNavigate('explore')}
            allEvents={events}
          />
        )}

        {currentRoute === 'login' && (
          <LoginPage
            initialRole={authInitialRole}
            onLoginSuccess={(user) => {
              setCurrentUser(user);
              showToast(`Welcome back, ${user.name}!`);
            }}
            onNavigate={handleNavigate}
          />
        )}

        {currentRoute === 'signup' && (
          <SignUpPage
            initialRole={authInitialRole}
            onSignUpSuccess={(user) => {
              setCurrentUser(user);
              showToast(`Welcome to Echelon, ${user.name}!`);
            }}
            onNavigate={handleNavigate}
          />
        )}

        {currentRoute === 'forgot-password' && (
          <ForgotPasswordPage
            onNavigate={handleNavigate}
          />
        )}

        {currentRoute === 'verify-email' && (
          <VerifyEmailPage
            onNavigate={handleNavigate}
          />
        )}

        {currentRoute === 'organizer' && (
          <OrganizerDashboardPage
            currentUser={currentUser}
            events={events}
            currency={currency}
            onOpenCreateEvent={() => handleNavigate('create-event')}
            onOpenScanner={() => handleNavigate('gate-scanner')}
            onSelectEvent={handleSelectEvent}
          />
        )}

        {currentRoute === 'my-tickets' && (
          <UserDashboardPage
            currentUser={currentUser}
            purchasedTickets={purchasedTickets}
            savedEvents={savedEventsList}
            allEvents={events}
            currency={currency}
            onSelectEvent={handleSelectEvent}
            onQuickBuy={handleQuickBuy}
            onToggleSave={handleToggleSave}
            onOpenScanner={() => handleNavigate('gate-scanner')}
          />
        )}

        {currentRoute === 'admin' && (
          <AdminDashboardPage
            events={events}
            currency={currency}
            currentUser={currentUser}
            onAuthenticateAdmin={(adminUser) => {
              setCurrentUser(adminUser);
              showToast(`Authorized as ${adminUser.name} 🛡️`);
            }}
            onNavigate={handleNavigate}
          />
        )}

        {currentRoute === 'create-event' && (
          <CreateEventPage
            onEventCreated={handleEventCreated}
            onNavigate={handleNavigate}
          />
        )}

        {currentRoute === 'gate-scanner' && (
          <GateScannerPage
            onBack={() => handleNavigate('organizer')}
          />
        )}
        </div>
      </main>

      {/* Component 12: Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenCreateEvent={handleStartSellingTickets}
        onOpenScanner={() => handleNavigate('gate-scanner')}
        onOpenCommunity={() => setIsCommunityModalOpen(true)}
      />

      {/* Floating Bottom Mobile Nav */}
      <MobileNav
        activeTab={currentRoute}
        onTabChange={handleNavigate}
        ticketsCount={purchasedTickets.length}
        savedCount={savedEventIds.length}
      />

      {/* Organizer Sign In / Sign Up Choice Modal */}
      <OrganizerAuthModal
        isOpen={isOrganizerAuthModalOpen}
        onClose={() => setIsOrganizerAuthModalOpen(false)}
        onSelectSignIn={() => {
          setAuthInitialRole('organizer');
          handleNavigate('login');
        }}
        onSelectSignUp={() => {
          setAuthInitialRole('organizer');
          handleNavigate('signup');
        }}
      />

      {/* Community Lounge Join Modal */}
      <CommunityJoinModal
        isOpen={isCommunityModalOpen}
        onClose={() => setIsCommunityModalOpen(false)}
      />

    </div>
  );
}
