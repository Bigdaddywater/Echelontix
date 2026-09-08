import React, { useState } from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  TrendingUp, 
  Users, 
  GraduationCap, 
  AlertTriangle, 
  Sparkles,
  Building2,
  Calendar,
  Ticket,
  Lock,
  KeyRound,
  Radio,
  Sliders,
  Volume2,
  Tv,
  Clock,
  ArrowRight,
  LogOut,
  UserCheck,
  Zap,
  Activity,
  ChevronRight,
  QrCode
} from 'lucide-react';
import { EventItem, UserProfile } from '../types';
import { formatNaira, formatUSD, formatDate } from '../utils/formatters';
import { Button } from '../components/ui/Button';

export interface AdminDashboardPageProps {
  events: EventItem[];
  currency: 'NGN' | 'USD';
  currentUser?: UserProfile | null;
  onApproveEvent?: (id: string) => void;
  onAuthenticateAdmin?: (user: UserProfile) => void;
  onNavigate?: (route: string) => void;
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({
  events,
  currency,
  currentUser,
  onApproveEvent,
  onAuthenticateAdmin,
  onNavigate,
}) => {
  // Local authorization override state for fast in-page unlocking
  const [isLocallyAuthorized, setIsLocallyAuthorized] = useState(false);
  const [authorizedRole, setAuthorizedRole] = useState<'admin' | 'stage_manager'>('admin');
  const [stageKeyInput, setStageKeyInput] = useState('');
  const [adminEmailInput, setAdminEmailInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  // Active admin tab
  const [activeTab, setActiveTab] = useState<'stage' | 'supervision' | 'approvals' | 'campus'>('stage');

  // Check if current user is authorized via global state or local state
  const isAuthorized = 
    isLocallyAuthorized || 
    currentUser?.role === 'admin' || 
    currentUser?.role === 'stage_manager';

  const currentActiveRole = isLocallyAuthorized 
    ? authorizedRole 
    : (currentUser?.role === 'stage_manager' ? 'stage_manager' : 'admin');

  // Approval queue data
  const [pendingApprovals, setPendingApprovals] = useState([
    {
      id: 'appr-1',
      title: 'Palmwine Music Fest 2026',
      organizer: 'Show Dem Camp Ltd',
      venue: 'Muri Okunola Park, VI',
      date: '2026-12-24',
      estRevenue: 65000000,
      bankVerified: true,
      status: 'pending'
    },
    {
      id: 'appr-2',
      title: 'UNILAG Hall Week Grand Finale',
      organizer: 'Jaja Hall Executive',
      venue: 'UNILAG Sports Complex',
      date: '2026-11-18',
      estRevenue: 12000000,
      bankVerified: true,
      status: 'pending'
    },
    {
      id: 'appr-3',
      title: 'Alté Sound Warehouse Party',
      organizer: 'Lagos Underground Collective',
      venue: 'The Vibe Loft, Lekki Phase 1',
      date: '2026-12-05',
      estRevenue: 28000000,
      bankVerified: true,
      status: 'pending'
    }
  ]);

  // Live Stage Run of Show cues
  const [stageCues, setStageCues] = useState([
    { id: 'cue-1', time: '08:00 PM', act: 'Opening DJ & Ambient Lighting', stage: 'Main Stage Alpha', status: 'completed', engineer: 'Femi Audio' },
    { id: 'cue-2', time: '09:30 PM', act: 'Special Guest Vocalist Warmup', stage: 'Main Stage Alpha', status: 'live', engineer: 'Tunde Visuals' },
    { id: 'cue-3', time: '11:00 PM', act: 'Headline Artist & Pyrotechnics Drop', stage: 'Main Stage Alpha', status: 'standing-by', engineer: 'Emeka FX' },
    { id: 'cue-4', time: '01:00 AM', act: 'Midnight B2B Rave Set', stage: 'Boiler Stage Bravo', status: 'standing-by', engineer: 'Lola Sound' },
  ]);

  // Stage System Clearances
  const [systemChecks, setSystemChecks] = useState([
    { label: 'Line Array PA & Sound Check (120dB)', status: 'Cleared', ok: true },
    { label: 'Moving Head Lasers & Stage Rigging', status: 'Cleared', ok: true },
    { label: 'Artist Green Room Hospitality & Riders', status: 'Delivered', ok: true },
    { label: 'Pyrotechnic CO2 Jet Pressure Check', status: 'Armed & Safe', ok: true },
    { label: 'Backstage RFID Turnstile Wristbands', status: '142 Active', ok: true },
    { label: 'Police & Private K9 Marquee Patrol', status: 'Stationed', ok: true },
  ]);

  const handleApprove = (id: string) => {
    setPendingApprovals(pendingApprovals.map(a => a.id === id ? { ...a, status: 'approved' } : a));
    if (onApproveEvent) onApproveEvent(id);
  };

  const handleReject = (id: string) => {
    setPendingApprovals(pendingApprovals.filter(a => a.id !== id));
  };

  // Direct 1-Click Quick Demo Login
  const handleQuickAuthorize = (role: 'admin' | 'stage_manager') => {
    setIsVerifying(true);
    setAuthError('');

    setTimeout(() => {
      setIsVerifying(false);
      setIsLocallyAuthorized(true);
      setAuthorizedRole(role);

      const staffUser: UserProfile = {
        id: `staff_${Date.now()}`,
        name: role === 'admin' ? 'Platform Super Admin' : 'Stage Production Director',
        email: role === 'admin' ? 'admin@echelontix.ng' : 'stage.director@echelontix.ng',
        role: role,
        avatar: role === 'admin' 
          ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop'
          : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
        savedEventIds: [],
        tickets: []
      };

      if (onAuthenticateAdmin) {
        onAuthenticateAdmin(staffUser);
      }
    }, 600);
  };

  // Custom credentials login
  const handleFormAuthorize = (e: React.FormEvent) => {
    e.preventDefault();
    if (!stageKeyInput) {
      setAuthError('Please enter a valid Stage Passkey or Admin Security Token.');
      return;
    }

    setIsVerifying(true);
    setAuthError('');

    setTimeout(() => {
      setIsVerifying(false);
      const isStage = stageKeyInput.toLowerCase().includes('stage') || stageKeyInput.toLowerCase().includes('sound');
      const assignedRole = isStage ? 'stage_manager' : 'admin';
      
      setIsLocallyAuthorized(true);
      setAuthorizedRole(assignedRole);

      const staffUser: UserProfile = {
        id: `staff_${Date.now()}`,
        name: adminEmailInput ? adminEmailInput.split('@')[0] : (isStage ? 'Stage Manager Lead' : 'Platform Operations Admin'),
        email: adminEmailInput || (isStage ? 'stage@echelontix.ng' : 'admin@echelontix.ng'),
        role: assignedRole,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
        savedEventIds: [],
        tickets: []
      };

      if (onAuthenticateAdmin) {
        onAuthenticateAdmin(staffUser);
      }
    }, 700);
  };

  const handleLockSession = () => {
    setIsLocallyAuthorized(false);
    if (onNavigate) {
      onNavigate('home');
    }
  };

  const campusRankings = [
    { rank: 1, name: 'University of Lagos (UNILAG)', attendees: 8420, revenue: 124000000, color: 'text-[#FDE68A]' },
    { rank: 2, name: 'Covenant University (CU)', attendees: 4890, revenue: 86500000, color: 'text-zinc-300' },
    { rank: 3, name: 'University of Ibadan (UI)', attendees: 3240, revenue: 45000000, color: 'text-amber-600' },
    { rank: 4, name: 'Obafemi Awolowo Univ (OAU)', attendees: 2980, revenue: 38200000, color: 'text-zinc-400' },
    { rank: 5, name: 'Univ of Benin (UNIBEN)', attendees: 1850, revenue: 24000000, color: 'text-zinc-400' },
  ];

  // -------------------------------------------------------------
  // RESTRICTED ACCESS GATEKEEPER SCREEN (If user is not admin/stage)
  // -------------------------------------------------------------
  if (!isAuthorized) {
    return (
      <div className="pt-32 pb-24 min-h-[85vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Ambient background aura */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-rose-500/10 blur-[140px] pointer-events-none rounded-full" />

        <div className="relative z-10 w-full max-w-lg">
          
          <div className="bg-[#0E0E16]/95 backdrop-blur-2xl rounded-3xl border border-rose-500/30 p-6 sm:p-10 shadow-2xl shadow-black/80 space-y-6">
            
            {/* Security Shield Icon */}
            <div className="flex items-center justify-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1C1117] to-[#0A0A0E] border border-rose-500/50 p-3.5 flex items-center justify-center shadow-lg shadow-rose-500/20 text-rose-400">
                <Lock className="w-8 h-8 animate-pulse" />
              </div>
            </div>

            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-300 text-[11px] font-mono font-bold uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Restricted Access Control</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black font-serif text-white tracking-tight">
                ADMIN & STAGE <span className="text-rose-400">PORTAL</span>
              </h2>
              <p className="text-xs sm:text-sm text-zinc-300 max-w-md mx-auto">
                This command console is strictly restricted to <span className="text-white font-bold">Platform Administrators</span> and <span className="text-[#FDE68A] font-bold">Stage Production Directors</span>.
              </p>
            </div>

            {/* Error Message */}
            {authError && (
              <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-mono text-center">
                {authError}
              </div>
            )}

            {/* 1-Click Quick Demo Authorization for Instant Testing */}
            <div className="space-y-2.5 pt-2">
              <span className="text-[11px] font-mono uppercase text-zinc-400 block text-center">
                Authorized Personnel Fast-Track:
              </span>

              <button
                type="button"
                onClick={() => handleQuickAuthorize('admin')}
                disabled={isVerifying}
                className="w-full p-3.5 rounded-2xl bg-gradient-to-r from-[#181828] to-[#12121C] border border-[#E5A93C]/40 hover:border-[#E5A93C] text-left flex items-center justify-between group transition-all cursor-pointer shadow-lg hover:shadow-[#E5A93C]/10"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#E5A93C]/20 border border-[#E5A93C]/40 text-[#FDE68A] flex items-center justify-center flex-shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white group-hover:text-[#FDE68A] block">
                      Authorize as Platform Super Admin
                    </span>
                    <span className="text-[10px] text-zinc-400 font-mono">
                      Full platform GMV, KYC approvals, and security audit logs
                    </span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </button>

              <button
                type="button"
                onClick={() => handleQuickAuthorize('stage_manager')}
                disabled={isVerifying}
                className="w-full p-3.5 rounded-2xl bg-gradient-to-r from-[#161622] to-[#101018] border border-indigo-500/40 hover:border-indigo-400 text-left flex items-center justify-between group transition-all cursor-pointer shadow-lg hover:shadow-indigo-500/10"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 flex items-center justify-center flex-shrink-0">
                    <Radio className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white group-hover:text-indigo-300 block">
                      Authorize as Stage Production Director
                    </span>
                    <span className="text-[10px] text-zinc-400 font-mono">
                      Live cue schedule, lighting & audio clearance, backstage gate ops
                    </span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </button>
            </div>

            {/* Custom Token Entry Form */}
            <form onSubmit={handleFormAuthorize} className="pt-2 border-t border-white/8 space-y-3">
              <span className="text-[11px] font-mono uppercase text-zinc-400 block text-center">
                Or Enter Official Stage Security Passkey:
              </span>

              <div className="relative">
                <KeyRound className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={stageKeyInput}
                  onChange={(e) => setStageKeyInput(e.target.value)}
                  placeholder="Enter Passkey (e.g. STAGE-PASS-2026)"
                  className="w-full pl-10 pr-4 py-2.5 bg-black/50 border border-white/15 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#E5A93C] font-mono"
                />
              </div>

              <Button
                type="submit"
                size="md"
                variant="gold"
                isLoading={isVerifying}
                className="w-full text-xs font-bold"
              >
                Verify & Unlock Command Console
              </Button>
            </form>

            {/* Return back button */}
            <div className="text-center pt-1">
              <button
                type="button"
                onClick={() => onNavigate && onNavigate('explore')}
                className="text-xs text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                ← Return to Public Event Discovery
              </button>
            </div>

          </div>

        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // AUTHORIZED ADMIN & STAGE OPERATIONS DASHBOARD
  // -------------------------------------------------------------
  return (
    <div className="pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Top Header with Active Security Badge & Lock Session */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#E5A93C] tracking-widest mb-1.5">
            <ShieldCheck className="w-4 h-4" />
            <span>Authorized Operations Command Center</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black font-serif text-white tracking-tight">
            PLATFORM & STAGE <span className="text-gold-metallic">OPERATIONS</span>
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">
            Live stage cue manager, campus rankings, promoter KYC approvals, and turnstile gate logs.
          </p>
        </div>

        {/* Security Session Badge & Lock Button */}
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-[#12121E] border border-emerald-500/30 flex items-center gap-2.5 text-xs">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <div>
              <span className="font-mono font-bold text-white block text-[11px]">
                {currentActiveRole === 'stage_manager' ? 'STAGE DIRECTOR AUTH' : 'SUPER ADMIN LEVEL 1'}
              </span>
              <span className="text-[10px] text-zinc-400 font-mono">
                {currentUser?.email || (currentActiveRole === 'stage_manager' ? 'stage.director@echelontix.ng' : 'admin@echelontix.ng')}
              </span>
            </div>
          </div>

          <Button
            size="sm"
            variant="glass"
            onClick={handleLockSession}
            leftIcon={<LogOut className="w-3.5 h-3.5 text-rose-400" />}
            className="text-xs border-rose-500/30 hover:bg-rose-500/10 text-rose-300"
          >
            Lock / Exit
          </Button>
        </div>
      </div>

      {/* 4 Super Metrics Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#0E0E16] border border-white/10">
          <span className="text-xs text-zinc-400 font-mono block mb-1">TOTAL PLATFORM GMV</span>
          <span className="text-2xl font-black font-mono text-[#FDE68A]">
            {currency === 'NGN' ? '₦1,450,800,000' : '$1,036,000'}
          </span>
          <span className="text-[11px] text-emerald-400 font-mono block mt-2">↑ 41.2% this quarter</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#0E0E16] border border-white/10">
          <span className="text-xs text-zinc-400 font-mono block mb-1">STAGE CUES COMPLETED</span>
          <span className="text-2xl font-black font-mono text-white">12 / 14 Acts</span>
          <span className="text-[11px] text-emerald-400 font-mono block mt-2">0s Stage Delay</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#0E0E16] border border-white/10">
          <span className="text-xs text-zinc-400 font-mono block mb-1">ANTI-FRAUD RATIO</span>
          <span className="text-2xl font-black font-mono text-emerald-400">99.98%</span>
          <span className="text-[11px] text-zinc-400 font-mono block mt-2">0 Counterfeit Passes</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#0E0E16] border border-white/10">
          <span className="text-xs text-zinc-400 font-mono block mb-1">PAYMENT GATEWAYS</span>
          <span className="text-2xl font-black font-mono text-white">99.9% Uptime</span>
          <span className="text-[11px] text-emerald-400 font-mono block mt-2">Paystack & Flutterwave Live</span>
        </div>
      </div>

      {/* Navigation Tabs for Admin & Stage Controls */}
      <div className="flex items-center gap-2 bg-[#12121D] p-1.5 rounded-2xl border border-white/8 overflow-x-auto custom-scrollbar">
        <button
          onClick={() => setActiveTab('stage')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
            activeTab === 'stage'
              ? 'bg-[#E5A93C] text-black shadow-md'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <Radio className="w-4 h-4" />
          <span>Stage Run of Show & Cues</span>
        </button>

        <button
          onClick={() => setActiveTab('supervision')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
            activeTab === 'supervision'
              ? 'bg-[#E5A93C] text-black shadow-md'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Platform Supervision & GMV</span>
        </button>

        <button
          onClick={() => setActiveTab('approvals')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
            activeTab === 'approvals'
              ? 'bg-[#E5A93C] text-black shadow-md'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Promoter Event Approvals ({pendingApprovals.filter(p => p.status === 'pending').length})</span>
        </button>

        <button
          onClick={() => setActiveTab('campus')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
            activeTab === 'campus'
              ? 'bg-[#E5A93C] text-black shadow-md'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>Campus League Table</span>
        </button>
      </div>

      {/* TAB 1: Stage Operations & Run of Show */}
      {activeTab === 'stage' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Stage Cues (7 cols) */}
          <div className="lg:col-span-7 bg-[#0E0E16] rounded-3xl border border-white/10 p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/8">
              <div>
                <h3 className="text-base font-bold text-white font-serif">Live Stage Run of Show (Active Cues)</h3>
                <p className="text-xs text-zinc-400 font-mono">Synchronized with Main Marquee & FOH Sound Board</p>
              </div>
              <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                Live Broadcast
              </span>
            </div>

            <div className="space-y-3">
              {stageCues.map((cue) => (
                <div 
                  key={cue.id}
                  className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    cue.status === 'live'
                      ? 'bg-[#181828] border-[#E5A93C] shadow-lg shadow-[#E5A93C]/10 ring-1 ring-[#E5A93C]'
                      : 'bg-[#12121E] border-white/8'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-[#FDE68A]">{cue.time}</span>
                      <h4 className="text-sm font-bold text-white">{cue.act}</h4>
                    </div>
                    <p className="text-xs text-zinc-400 mt-0.5">
                      {cue.stage} • Engineer: <span className="text-zinc-200">{cue.engineer}</span>
                    </p>
                  </div>

                  <div>
                    {cue.status === 'completed' && (
                      <span className="text-[11px] font-mono font-bold text-zinc-400 bg-white/5 px-2.5 py-1 rounded-lg border border-white/10">
                        ✓ Completed
                      </span>
                    )}
                    {cue.status === 'live' && (
                      <span className="text-[11px] font-mono font-bold text-emerald-300 bg-emerald-500/20 px-2.5 py-1 rounded-lg border border-emerald-500/30 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> ON STAGE NOW
                      </span>
                    )}
                    {cue.status === 'standing-by' && (
                      <span className="text-[11px] font-mono font-bold text-[#FDE68A] bg-[#E5A93C]/15 px-2.5 py-1 rounded-lg border border-[#E5A93C]/30">
                        ⏳ Standing By
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stage Safety & Production Clearances (5 cols) */}
          <div className="lg:col-span-5 bg-[#0E0E16] rounded-3xl border border-white/10 p-6 shadow-xl space-y-4">
            <div className="pb-3 border-b border-white/8">
              <h3 className="text-base font-bold text-white font-serif">Stage Safety & Rigging Checklist</h3>
              <p className="text-xs text-zinc-400 font-mono">Stage Manager direct verification logs</p>
            </div>

            <div className="space-y-2.5">
              {systemChecks.map((item, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between text-xs">
                  <span className="text-zinc-200 font-medium">{item.label}</span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    <CheckCircle2 className="w-3 h-3" /> {item.status}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <button 
                onClick={() => alert('Stage Production Comm channel connected to FOH.')}
                className="w-full py-2.5 rounded-xl bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-500/30 text-xs font-mono font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <Radio className="w-4 h-4" /> Open Production Radio Comm Channel
              </button>
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: Platform Supervision & GMV */}
      {activeTab === 'supervision' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-7 bg-[#0E0E16] rounded-3xl border border-white/10 p-6 shadow-xl space-y-4">
            <div className="pb-3 border-b border-white/8">
              <h3 className="text-base font-bold text-white font-serif">Platform Security & Gateway Telemetry</h3>
              <p className="text-xs text-zinc-400">Direct payment pipeline verification</p>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-4 rounded-2xl bg-[#12121E] border border-white/8 space-y-1">
                <div className="flex items-center justify-between font-bold text-white">
                  <span>Paystack Direct Settlement Gateway</span>
                  <span className="text-emerald-400 font-mono">100% HEALTHY</span>
                </div>
                <p className="text-zinc-400 text-[11px]">Avg webhook confirmation speed: 180ms • 0 pending retries</p>
              </div>

              <div className="p-4 rounded-2xl bg-[#12121E] border border-white/8 space-y-1">
                <div className="flex items-center justify-between font-bold text-white">
                  <span>Flutterwave Direct Settlement Gateway</span>
                  <span className="text-emerald-400 font-mono">100% HEALTHY</span>
                </div>
                <p className="text-zinc-400 text-[11px]">Avg webhook confirmation speed: 210ms • Zero dropped packets</p>
              </div>

              <div className="p-4 rounded-2xl bg-[#12121E] border border-white/8 space-y-1">
                <div className="flex items-center justify-between font-bold text-white">
                  <span>Anti-Scalping Dynamic QR Engine</span>
                  <span className="text-[#FDE68A] font-mono">ENCRYPTED ACTIVE</span>
                </div>
                <p className="text-zinc-400 text-[11px]">60-second rotating HMAC-SHA256 signatures preventing pass duplication</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#0E0E16] rounded-3xl border border-white/10 p-6 shadow-xl space-y-4">
            <div className="pb-3 border-b border-white/8">
              <h3 className="text-base font-bold text-white font-serif">Campus League Summary</h3>
              <p className="text-xs text-zinc-400">Top university promoter distribution</p>
            </div>

            <div className="space-y-2.5">
              {campusRankings.slice(0, 4).map((c) => (
                <div key={c.rank} className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between text-xs">
                  <span className="font-bold text-white">{c.name}</span>
                  <span className="font-mono text-[#FDE68A]">{c.attendees.toLocaleString()} passes</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* TAB 3: Event Approvals Queue */}
      {activeTab === 'approvals' && (
        <div className="bg-[#0E0E16] rounded-3xl border border-white/10 p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/8">
            <h3 className="text-base font-bold text-white font-serif">Promoter Event Approval Queue</h3>
            <span className="text-xs font-mono text-[#FDE68A]">{pendingApprovals.filter(p => p.status === 'pending').length} Pending</span>
          </div>

          <div className="space-y-3">
            {pendingApprovals.map((appr) => (
              <div
                key={appr.id}
                className="p-4 rounded-2xl bg-[#12121E] border border-white/8 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-white font-serif">{appr.title}</h4>
                    {appr.status === 'approved' && (
                      <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono font-bold">
                        Approved
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-zinc-400">
                    Host: <span className="text-zinc-200">{appr.organizer}</span> • {formatDate(appr.date)}
                  </p>
                  <p className="text-[11px] text-zinc-500 font-mono mt-1">
                    📍 {appr.venue} • Est. Gross: {currency === 'NGN' ? formatNaira(appr.estRevenue) : formatUSD(appr.estRevenue)}
                  </p>
                </div>

                {appr.status === 'pending' ? (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleApprove(appr.id)}
                      className="p-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 text-xs font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4" /> Approve
                    </button>
                    <button
                      onClick={() => handleReject(appr.id)}
                      className="p-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 text-xs font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <XCircle className="w-4 h-4" /> Reject
                    </button>
                  </div>
                ) : (
                  <span className="text-xs text-emerald-400 font-mono font-bold">✓ Live On Marketplace</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: Campus League Table */}
      {activeTab === 'campus' && (
        <div className="bg-[#0E0E16] rounded-3xl border border-white/10 p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-white/8">
            <div>
              <h3 className="text-lg font-bold text-white font-serif">Nigerian Campus League Ranking</h3>
              <p className="text-xs text-zinc-400">Total event attendance and ticketing volume by tertiary institution.</p>
            </div>
            <span className="text-xs text-[#FDE68A] font-mono">Q4 2026 Academic Season</span>
          </div>

          <div className="space-y-3">
            {campusRankings.map((c) => (
              <div key={c.rank} className="p-4 rounded-2xl bg-[#12121E] border border-white/6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className={`text-lg font-black font-mono ${c.color}`}>#{c.rank}</span>
                  <div>
                    <h4 className="text-sm font-bold text-white">{c.name}</h4>
                    <span className="text-xs text-zinc-400 font-mono">{c.attendees.toLocaleString()} verified student passholders</span>
                  </div>
                </div>
                <span className="text-sm font-mono font-bold text-[#FDE68A]">
                  {currency === 'NGN' ? formatNaira(c.revenue) : formatUSD(c.revenue)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
