import React, { useState } from 'react';
import { QrCode, CheckCircle2, XCircle, Camera, ArrowLeft, Volume2, ShieldCheck } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export interface GateScannerPageProps {
  onBack: () => void;
}

export const GateScannerPage: React.FC<GateScannerPageProps> = ({ onBack }) => {
  const [ticketCodeInput, setTicketCodeInput] = useState('');
  const [scanResult, setScanResult] = useState<{
    status: 'success' | 'duplicate' | 'invalid' | null;
    holderName?: string;
    tier?: string;
    event?: string;
    timeCheckedIn?: string;
  }>({ status: null });

  const simulateScan = (codeToTest?: string) => {
    const code = codeToTest || ticketCodeInput || 'ECH-849201';
    
    if (code.includes('INVALID')) {
      setScanResult({ status: 'invalid' });
    } else if (code.includes('DUP')) {
      setScanResult({
        status: 'duplicate',
        holderName: 'Amina Bello',
        tier: 'Regular Admission',
        event: "FLOW D'ÉTAT Lagos",
        timeCheckedIn: 'Already scanned at 08:42 PM by Marshal 02'
      });
    } else {
      setScanResult({
        status: 'success',
        holderName: 'Chukwuebuka Stephen',
        tier: 'VIP Golden Circle',
        event: "FLOW D'ÉTAT Lagos",
        timeCheckedIn: new Date().toLocaleTimeString()
      });
    }
  };

  return (
    <div className="pt-28 pb-24 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Back button */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-xs font-mono font-bold text-zinc-400 hover:text-white transition-colors cursor-pointer mb-6"
      >
        <ArrowLeft className="w-4 h-4 text-[#E5A93C]" />
        <span>BACK TO CONSOLE</span>
      </button>

      <div className="bg-[#0E0E18] rounded-3xl border border-white/10 p-6 sm:p-10 shadow-2xl space-y-6 text-center">
        
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5A93C]/15 border border-[#E5A93C]/40 text-[#FDE68A] text-xs font-mono uppercase tracking-widest mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-[#E5A93C]" />
            Door Marshal & Gate Security
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-serif text-white tracking-tight">
            SUB-SECOND <span className="text-gold-metallic">GATE SCANNER</span>
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Real-time optical QR validation and biometric counter-tamper verification
          </p>
        </div>

        {/* Viewfinder box */}
        <div className="relative h-72 rounded-3xl overflow-hidden bg-black border-2 border-[#E5A93C]/40 flex items-center justify-center max-w-lg mx-auto">
          <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#E5A93C] to-transparent shadow-[0_0_15px_#E5A93C] animate-bounce" style={{ animationDuration: '2s' }} />

          <div className="w-48 h-48 border-2 border-white/30 rounded-2xl relative flex items-center justify-center">
            <div className="absolute -top-1 -left-1 w-7 h-7 border-t-4 border-l-4 border-[#E5A93C] rounded-tl-lg" />
            <div className="absolute -top-1 -right-1 w-7 h-7 border-t-4 border-r-4 border-[#E5A93C] rounded-tr-lg" />
            <div className="absolute -bottom-1 -left-1 w-7 h-7 border-b-4 border-l-4 border-[#E5A93C] rounded-bl-lg" />
            <div className="absolute -bottom-1 -right-1 w-7 h-7 border-b-4 border-r-4 border-[#E5A93C] rounded-br-lg" />

            <div className="text-center p-4">
              <Camera className="w-10 h-10 text-[#E5A93C] mx-auto mb-2 opacity-80 animate-pulse" />
              <span className="text-xs font-mono text-zinc-300 block">
                Point at attendee's Echelontix Pass
              </span>
            </div>
          </div>

          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[10px] text-zinc-400 font-mono">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              CAMERA SENSOR 01 ACTIVE
            </span>
            <span>AES-256 SIGNATURE VALIDATION</span>
          </div>
        </div>

        {/* Results Banner */}
        {scanResult.status === 'success' && (
          <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-left max-w-lg mx-auto animate-in fade-in zoom-in-95">
            <div className="flex items-center gap-2 mb-1">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span className="font-bold text-sm font-serif text-white">ACCESS GRANTED (VIP PASS)</span>
            </div>
            <p className="text-sm text-white font-semibold">{scanResult.holderName}</p>
            <p className="text-xs text-emerald-400 font-mono">{scanResult.tier} • {scanResult.event}</p>
            <span className="text-[10px] text-zinc-400 block mt-1">Checked in at {scanResult.timeCheckedIn}</span>
          </div>
        )}

        {scanResult.status === 'duplicate' && (
          <div className="p-4 rounded-2xl bg-amber-500/15 border border-amber-500/40 text-amber-300 text-left max-w-lg mx-auto">
            <div className="flex items-center gap-2 mb-1">
              <XCircle className="w-5 h-5 text-amber-400" />
              <span className="font-bold text-sm font-serif text-white">ALREADY SCANNED / DUPLICATE</span>
            </div>
            <p className="text-xs text-white font-semibold">{scanResult.holderName}</p>
            <p className="text-[11px] text-amber-400">{scanResult.timeCheckedIn}</p>
          </div>
        )}

        {scanResult.status === 'invalid' && (
          <div className="p-4 rounded-2xl bg-rose-500/15 border border-rose-500/40 text-rose-300 text-left max-w-lg mx-auto">
            <div className="flex items-center gap-2 mb-1">
              <XCircle className="w-5 h-5 text-rose-400" />
              <span className="font-bold text-sm font-serif text-white">INVALID / UNRECOGNIZED PASS</span>
            </div>
            <p className="text-xs">Ticket does not match cryptographic signature for this event.</p>
          </div>
        )}

        {/* Quick Simulation Buttons */}
        <div className="grid grid-cols-3 gap-2 max-w-lg mx-auto">
          <button
            onClick={() => simulateScan('ECH-VALID-VIP')}
            className="p-2.5 text-xs font-semibold rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/25 cursor-pointer"
          >
            Simulate VIP Pass
          </button>
          <button
            onClick={() => simulateScan('ECH-DUP-PASS')}
            className="p-2.5 text-xs font-semibold rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 hover:bg-amber-500/25 cursor-pointer"
          >
            Simulate Duplicate
          </button>
          <button
            onClick={() => simulateScan('ECH-INVALID')}
            className="p-2.5 text-xs font-semibold rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 hover:bg-rose-500/25 cursor-pointer"
          >
            Simulate Invalid
          </button>
        </div>

        {/* Manual Lookup */}
        <div className="pt-4 border-t border-white/8 max-w-lg mx-auto">
          <label className="text-[11px] font-mono uppercase text-zinc-400 block mb-1.5 text-left">
            Or Lookup 6-digit Ticket ID Manually
          </label>
          <div className="flex gap-2">
            <Input
              placeholder="e.g. ECH-849201"
              value={ticketCodeInput}
              onChange={(e) => setTicketCodeInput(e.target.value)}
              className="font-mono uppercase"
            />
            <Button
              size="md"
              variant="gold"
              onClick={() => simulateScan()}
            >
              Check In
            </Button>
          </div>
        </div>

      </div>

    </div>
  );
};
