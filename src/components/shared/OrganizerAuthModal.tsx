import React from 'react';
import { motion } from 'motion/react';
import { 
  Building2, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  LogIn, 
  UserPlus, 
  ShieldCheck, 
  TrendingUp, 
  QrCode,
  Zap
} from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';

export interface OrganizerAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSignIn: () => void;
  onSelectSignUp: () => void;
}

export const OrganizerAuthModal: React.FC<OrganizerAuthModalProps> = ({
  isOpen,
  onClose,
  onSelectSignIn,
  onSelectSignUp,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Promoter & Organizer Portal"
      subtitle="Start creating events and selling tickets in minutes"
      maxWidth="lg"
    >
      <div className="space-y-6">
        
        {/* Banner */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-[#1E190E] to-[#12121C] border border-[#E5A93C]/40 flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-[#E5A93C]/20 border border-[#E5A93C]/50 flex items-center justify-center flex-shrink-0 text-[#FDE68A]">
            <Building2 className="w-5 h-5 text-[#E5A93C]" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <span>Are You An Event Organizer?</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#E5A93C] text-black font-mono font-bold">
                Host Portal
              </span>
            </h4>
            <p className="text-xs text-zinc-300 mt-1 leading-relaxed">
              To create events, manage ticket tiers, and view real-time gate telemetry, please sign in or register your organizer account.
            </p>
          </div>
        </div>

        {/* Choice Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Card 1: Existing Organizer (Sign In) */}
          <div 
            onClick={() => {
              onClose();
              onSelectSignIn();
            }}
            className="p-5 rounded-2xl bg-[#12121C] hover:bg-[#181826] border border-white/10 hover:border-[#E5A93C]/60 transition-all cursor-pointer group flex flex-col justify-between shadow-lg"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-white/5 group-hover:bg-[#E5A93C]/20 border border-white/10 group-hover:border-[#E5A93C]/40 flex items-center justify-center text-zinc-300 group-hover:text-[#E5A93C] transition-colors mb-3">
                <LogIn className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white group-hover:text-[#FDE68A] transition-colors">
                I Have An Account
              </h3>
              <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed">
                Log in to access your active events, view live sales revenue, and manage door marshals.
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-white/8 flex items-center justify-between text-xs font-semibold text-[#E5A93C]">
              <span>Sign In as Organizer</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: New Organizer (Sign Up) */}
          <div 
            onClick={() => {
              onClose();
              onSelectSignUp();
            }}
            className="p-5 rounded-2xl bg-gradient-to-b from-[#1C160B] to-[#12121C] hover:from-[#241C0E] hover:to-[#171724] border border-[#E5A93C]/40 hover:border-[#E5A93C] transition-all cursor-pointer group flex flex-col justify-between shadow-xl ring-1 ring-[#E5A93C]/20"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#E5A93C]/20 border border-[#E5A93C]/40 flex items-center justify-center text-[#E5A93C] mb-3">
                <UserPlus className="w-5 h-5" />
              </div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white group-hover:text-[#FDE68A] transition-colors">
                  I'm A New Organizer
                </h3>
                <span className="text-[9px] px-1.5 py-0.2 bg-[#E5A93C] text-black font-bold rounded">
                  Free
                </span>
              </div>
              <p className="text-xs text-zinc-300 mt-1.5 leading-relaxed">
                Register your brand or promoter identity in under 2 minutes with zero upfront listing fees.
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-white/8 flex items-center justify-between text-xs font-semibold text-[#FDE68A]">
              <span>Create Organizer Account</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

        </div>

        {/* Benefits Row */}
        <div className="p-4 rounded-xl bg-white/5 border border-white/5">
          <span className="text-[11px] font-mono uppercase text-zinc-400 font-bold block mb-2">
            Organizer Perks on Echelontix
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-zinc-300">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
              <span>Same-Day Bank Settlement</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#E5A93C] flex-shrink-0" />
              <span>Free Gate Scanner App</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0" />
              <span>Multi-tier Ticketing</span>
            </div>
          </div>
        </div>

      </div>
    </Modal>
  );
};
