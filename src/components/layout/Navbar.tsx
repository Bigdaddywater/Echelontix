import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Menu, 
  X, 
  Ticket, 
  Heart, 
  User, 
  PlusCircle, 
  LogOut, 
  Compass, 
  Users, 
  Sparkles,
  LayoutDashboard,
  ShieldCheck,
  QrCode,
  Lock,
  ChevronDown
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { UserProfile } from '../../types';

export interface NavbarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  currency: 'NGN' | 'USD';
  onCurrencyToggle: () => void;
  currentUser: UserProfile | null;
  savedCount?: number;
  ticketsCount?: number;
  onLoginClick: () => void;
  onSignUpClick: () => void;
  onCreateEventClick: () => void;
  onLogout?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onTabChange,
  currency,
  onCurrencyToggle,
  currentUser,
  savedCount = 2,
  ticketsCount = 1,
  onLoginClick,
  onSignUpClick,
  onCreateEventClick,
  onLogout,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [dashboardMenuOpen, setDashboardMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Discover', icon: Compass },
    { id: 'explore', label: 'Explore Events', icon: Sparkles },
    { id: 'organizer', label: 'Organizer Console', icon: LayoutDashboard },
    { id: 'my-tickets', label: 'My VIP Passes', icon: Ticket, badge: ticketsCount > 0 ? `${ticketsCount}` : undefined },
    { id: 'community', label: 'Campus & Hubs', icon: Users },
  ];

  const handleNavClick = (tabId: string) => {
    onTabChange(tabId);
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
    setDashboardMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#070709]/95 backdrop-blur-xl border-b border-white/8 py-3 shadow-2xl shadow-black/80'
          : 'bg-linear-to-b from-black/90 via-black/50 to-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          
          {/* Brand Logo */}
          <button
            id="brand-logo-btn"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 group text-left cursor-pointer focus:outline-none"
          >
            <div className="relative w-6 h-9 sm:w-10 sm:h-10 rounded-xl bg-linear-br from-[#1A1A24] to-[#0A0A0E] border border-[#E5A93C]/40 p-1.5 flex items-center justify-center shadow-lg shadow-[#E5A93C]/10 group-hover:border-[#E5A93C] transition-all">
              <img
                src="/logo.jpg"
                alt="Echelontix logo"
                className="w-full h-full object-contain"
              />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-serif text-lg sm:text-xl font-extrabold tracking-[0.16em] text-white group-hover:text-gold-bright transition-colors">
                  ECHELON<span className="text-[#E5A93C]">TIX</span>
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#E5A93C] animate-pulse" />
              </div>
            
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  id={`nav-link-${link.id}`}
                  onClick={() => handleNavClick(link.id)}
                  className={`relative px-3 py-2 text-xs font-semibold tracking-wide transition-colors cursor-pointer rounded-lg flex items-center gap-1.5 ${
                    isActive ? 'text-[#E5A93C]' : 'text-zinc-300 hover:text-white'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="text-[10px] px-1.5 py-0.2 bg-[#E5A93C]/20 text-[#FDE68A] border border-[#E5A93C]/40 rounded-full font-bold">
                      {link.badge}
                    </span>
                  )}

                  {isActive && (
                    <motion.div
                      layoutId="activeNavUnderline"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-linear-to-r from-transparent via-[#E5A93C] to-transparent shadow-[0_0_8px_#E5A93C]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}

            {/* Quick Dashboards Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setDashboardMenuOpen(!dashboardMenuOpen)}
                className="px-2.5 py-2 text-xs font-semibold text-zinc-400 hover:text-white flex items-center gap-1 cursor-pointer"
              >
                <span>Pages</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              <AnimatePresence>
                {dashboardMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="absolute left-0 mt-2 w-52 bg-[#0E0E18] border border-white/15 rounded-2xl shadow-2xl p-1.5 z-50 text-left"
                  >
                    <div className="text-[10px] font-mono uppercase text-zinc-500 px-2.5 py-1">
                      Platform Portals
                    </div>
                    <button
                      onClick={() => handleNavClick('explore')}
                      className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs text-zinc-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#E5A93C]" />
                      <span>Explore Events Catalogue</span>
                    </button>
                    <button
                      onClick={() => handleNavClick('my-tickets')}
                      className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs text-zinc-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
                    >
                      <Ticket className="w-3.5 h-3.5 text-[#E5A93C]" />
                      <span>User Passes Dashboard</span>
                    </button>
                    <button
                      onClick={() => handleNavClick('organizer')}
                      className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs text-zinc-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
                    >
                      <LayoutDashboard className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Organizer Console</span>
                    </button>
                    <button
                      onClick={() => handleNavClick('gate-scanner')}
                      className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs text-zinc-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
                    >
                      <QrCode className="w-3.5 h-3.5 text-blue-400" />
                      <span>Door Marshal Scanner</span>
                    </button>
                    <button
                      onClick={() => handleNavClick('admin')}
                      className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs text-zinc-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                      <span>Super Admin Moderation</span>
                    </button>
                    <div className="h-px bg-white/10 my-1" />
                    <div className="text-[10px] font-mono uppercase text-zinc-500 px-2.5 py-1">
                      Onboarding Flow
                    </div>
                    <button
                      onClick={() => handleNavClick('login')}
                      className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs text-zinc-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
                    >
                      <Lock className="w-3.5 h-3.5 text-zinc-400" />
                      <span>Login Portal</span>
                    </button>
                    <button
                      onClick={() => handleNavClick('signup')}
                      className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs text-zinc-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
                    >
                      <User className="w-3.5 h-3.5 text-zinc-400" />
                      <span>Sign Up Onboarding</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            
            {/* Quick Search */}
            <button
              id="navbar-search-btn"
              onClick={() => handleNavClick('explore')}
              aria-label="Search events"
              className="p-2 sm:px-3 sm:py-1.5 text-xs font-medium text-zinc-300 bg-[#14141E]/80 hover:bg-[#1C1C2A] border border-white/10 hover:border-[#E5A93C]/40 rounded-xl flex items-center gap-2 transition-all cursor-pointer"
            >
              <Search className="w-3.5 h-3.5 text-[#E5A93C]" />
              <span className="hidden md:inline text-zinc-400">Search</span>
            </button>

            {/* Currency Switcher */}
            <button
              id="navbar-currency-toggle"
              onClick={onCurrencyToggle}
              title="Toggle currency display"
              className="px-2.5 py-1.5 text-xs font-bold font-mono text-zinc-300 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-colors cursor-pointer"
            >
              {currency === 'NGN' ? '🇳🇬 ₦ NGN' : '🇺🇸 $ USD'}
            </button>

            {/* Create Event CTA */}
            <button
              id="nav-create-event-cta"
              onClick={onCreateEventClick}
              className="hidden md:flex items-center gap-1.5 text-xs font-semibold text-zinc-200 hover:text-white px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5 text-[#E5A93C]" />
              <span>Create Event</span>
            </button>

            {/* User Account / Dropdown */}
            {currentUser ? (
              <div className="relative">
                <button
                  id="nav-user-menu-btn"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1 sm:px-2.5 sm:py-1.5 bg-[#14141E] border border-white/10 hover:border-[#E5A93C]/50 rounded-xl cursor-pointer transition-all"
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-6 h-6 rounded-lg object-cover border border-[#E5A93C]/40"
                  />
                  <div className="hidden sm:flex flex-col text-left">
                    <span className="text-xs font-semibold text-white max-w-21.25 truncate">
                      {currentUser.name.split(' ')[0]}
                    </span>
                  </div>
                  <ChevronDown className="w-3 h-3 text-zinc-400" />
                </button>

                {/* User Dropdown */}
                <AnimatePresence>
                  {userDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-56 bg-[#0E0E16] border border-white/15 rounded-2xl shadow-2xl p-2 z-50 text-left"
                    >
                      <div className="p-2.5 border-b border-white/8">
                        <p className="text-xs font-bold text-white truncate">{currentUser.name}</p>
                        <p className="text-[10px] text-zinc-400 truncate">{currentUser.email}</p>
                        <span className="inline-block mt-1 text-[9px] font-mono uppercase px-2 py-0.5 rounded-full bg-[#E5A93C]/20 text-[#FDE68A] border border-[#E5A93C]/40">
                          {currentUser.role}
                        </span>
                      </div>

                      <div className="py-1">
                        <button
                          onClick={() => handleNavClick('my-tickets')}
                          className="w-full flex items-center gap-2 px-3 py-2 text-xs text-zinc-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
                        >
                          <Ticket className="w-3.5 h-3.5 text-[#E5A93C]" />
                          <span>My VIP Passes & Orders</span>
                        </button>

                        <button
                          onClick={() => handleNavClick('organizer')}
                          className="w-full flex items-center gap-2 px-3 py-2 text-xs text-zinc-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
                        >
                          <LayoutDashboard className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Organizer Dashboard</span>
                        </button>

                        <button
                          onClick={() => handleNavClick('gate-scanner')}
                          className="w-full flex items-center gap-2 px-3 py-2 text-xs text-zinc-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
                        >
                          <QrCode className="w-3.5 h-3.5 text-blue-400" />
                          <span>Gate Scanner Console</span>
                        </button>

                        <button
                          onClick={() => handleNavClick('admin')}
                          className="w-full flex items-center gap-2 px-3 py-2 text-xs text-zinc-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
                        >
                          <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                          <span>Admin Moderation</span>
                        </button>
                      </div>

                      <div className="pt-1 border-t border-white/8">
                        <button
                          onClick={() => {
                            if (onLogout) onLogout();
                            setUserDropdownOpen(false);
                            handleNavClick('login');
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 text-xs text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          <span>Switch Account / Sign Out</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                <button
                  id="nav-login-btn"
                  onClick={onLoginClick}
                  className="px-3 py-1.5 text-xs font-semibold text-zinc-300 hover:text-white transition-colors cursor-pointer"
                >
                  Log In
                </button>
                <Button
                  id="nav-signup-btn"
                  size="sm"
                  variant="gold"
                  onClick={onSignUpClick}
                >
                  Sign Up
                </Button>
              </div>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-zinc-300 hover:text-white rounded-xl hover:bg-white/5 cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#0A0A0F] border-b border-white/10 px-6 py-5 overflow-hidden shadow-2xl"
          >
            <div className="flex flex-col gap-1.5">
              
              <div className="text-[10px] font-mono uppercase text-zinc-500 px-3 py-1">
                Main Discovery
              </div>

              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left text-xs font-semibold transition-colors ${
                    activeTab === link.id ? 'bg-[#E5A93C]/15 text-[#E5A93C] border border-[#E5A93C]/30' : 'text-zinc-300 hover:bg-white/5'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <link.icon className="w-4 h-4 text-[#E5A93C]" />
                    <span>{link.label}</span>
                  </span>
                  {link.badge && (
                    <Badge variant="gold" size="sm">{link.badge}</Badge>
                  )}
                </button>
              ))}

              <div className="text-[10px] font-mono uppercase text-zinc-500 px-3 pt-3 pb-1">
                Dashboards & Tools
              </div>

              <button
                onClick={() => handleNavClick('gate-scanner')}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs text-zinc-300 hover:bg-white/5"
              >
                <QrCode className="w-4 h-4 text-blue-400" />
                <span>Door Marshal Scanner</span>
              </button>

              <button
                onClick={() => handleNavClick('admin')}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs text-zinc-300 hover:bg-white/5"
              >
                <ShieldCheck className="w-4 h-4 text-purple-400" />
                <span>Super Admin Console</span>
              </button>

              <div className="pt-3 mt-2 border-t border-white/10 flex flex-col gap-2">
                <Button
                  variant="gold"
                  size="md"
                  onClick={() => {
                    onCreateEventClick();
                    setMobileMenuOpen(false);
                  }}
                  leftIcon={<PlusCircle className="w-4 h-4" />}
                >
                  Create Event
                </Button>

                <div className="grid grid-cols-2 gap-2 mt-1">
                  <Button
                    variant="glass"
                    size="sm"
                    onClick={() => {
                      onLoginClick();
                      setMobileMenuOpen(false);
                    }}
                  >
                    Log In
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      onSignUpClick();
                      setMobileMenuOpen(false);
                    }}
                  >
                    Sign Up
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
