import React from 'react';
import { motion } from 'motion/react';
import { Zap, Clock, ShieldCheck, TrendingUp, ArrowRight, Sparkles, QrCode } from 'lucide-react';
import { Button } from '../ui/Button';

export interface OrganizerCTAProps {
  onStartSellingClick: () => void;
  onOpenScannerDemo?: () => void;
}

export const OrganizerCTA: React.FC<OrganizerCTAProps> = ({
  onStartSellingClick,
  onOpenScannerDemo,
}) => {
  return (
    <section className="py-20 sm:py-28 bg-[#09090F] relative overflow-hidden">
      
      {/* Decorative Glow */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#E5A93C]/10 blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="relative rounded-3xl overflow-hidden border border-[#E5A93C]/30 bg-gradient-to-br from-[#161624] via-[#0E0E18] to-[#08080C] shadow-2xl p-8 sm:p-12 lg:p-14">
          
          {/* Top Gold Border Accent */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#E5A93C] to-transparent opacity-80" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E5A93C]/15 border border-[#E5A93C]/40 text-[#FDE68A] text-xs font-mono font-bold uppercase tracking-widest mb-4">
                <Sparkles className="w-3.5 h-3.5 text-[#E5A93C]" />
                Event Creators & Promoters
              </div>

              <h2 className="text-3xl sm:text-5xl font-black font-serif text-white tracking-tight leading-tight">
                ARE YOU AN ORGANIZER? <br />
                <span className="text-gold-metallic">CREATE YOUR EVENT IN 5 MINS.</span>
              </h2>

              <p className="mt-4 text-zinc-300 text-sm sm:text-base leading-relaxed">
                From campus club parties to 10,000-person stadium festivals. Launch custom branded tickets, assign tiered pricing, scan guest QR passes in milliseconds, and receive automated same-day bank settlements.
              </p>

              {/* 3 Quick Bullets */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="flex items-center gap-2.5 text-xs text-zinc-300 bg-white/5 p-2.5 rounded-xl border border-white/8">
                  <Clock className="w-4 h-4 text-[#E5A93C] flex-shrink-0" />
                  <span>5-minute instant publish</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-zinc-300 bg-white/5 p-2.5 rounded-xl border border-white/8">
                  <TrendingUp className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Direct Bank Payouts</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-zinc-300 bg-white/5 p-2.5 rounded-xl border border-white/8">
                  <QrCode className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                  <span>High-speed Gate App</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
                <Button
                  id="organizer-start-selling-btn"
                  size="xl"
                  variant="gold"
                  onClick={onStartSellingClick}
                  leftIcon={<Zap className="w-5 h-5 text-black" />}
                  rightIcon={<ArrowRight className="w-5 h-5 text-black" />}
                  className="w-full sm:w-auto text-base font-bold shadow-xl shadow-[#E5A93C]/30"
                >
                  Start Selling Tickets
                </Button>

                {onOpenScannerDemo && (
                  <Button
                    size="xl"
                    variant="glass"
                    onClick={onOpenScannerDemo}
                    leftIcon={<QrCode className="w-5 h-5 text-[#E5A93C]" />}
                    className="w-full sm:w-auto text-base font-semibold"
                  >
                    Test Gate Scanner
                  </Button>
                )}
              </div>
            </div>

            {/* Right Interactive Telemetry Preview Mockup */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl bg-[#0B0B12] border border-white/12 p-5 shadow-2xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/8">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">Live Event Telemetry</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 bg-[#E5A93C]/20 text-[#FDE68A] rounded font-mono font-bold">FLOW D'ÉTAT</span>
                </div>

                {/* Metric 1 */}
                <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-zinc-400 uppercase font-mono">Gross Ticket Sales</span>
                    <p className="text-xl font-extrabold text-white font-mono">₦24,850,000</p>
                  </div>
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-500/15 px-2 py-1 rounded-md font-mono">+142% vs target</span>
                </div>

                {/* Metric 2 */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-[10px] text-zinc-400 uppercase font-mono">Check-in Rate</span>
                    <p className="text-lg font-bold text-white font-mono">1,820 / 2,000</p>
                    <div className="w-full bg-white/10 h-1.5 rounded-full mt-2 overflow-hidden">
                      <div className="bg-[#E5A93C] h-full rounded-full" style={{ width: '91%' }} />
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-[10px] text-zinc-400 uppercase font-mono">Next Payout</span>
                    <p className="text-lg font-bold text-[#FDE68A] font-mono">Instant (T+0)</p>
                    <span className="text-[10px] text-zinc-400 mt-1 block font-mono">Access Bank ••••4920</span>
                  </div>
                </div>

                <div className="text-[11px] text-zinc-400 text-center pt-1 font-mono">
                  ✨ Zero upfront listing fees • Pay only 2.5% on sold tickets
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
