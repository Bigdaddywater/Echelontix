import React, { useState } from 'react';
import { QrCode, CheckCircle2, XCircle, Camera, Volume2, Search, ArrowRight, ShieldCheck } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

export interface QRScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QRScannerModal: React.FC<QRScannerModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [ticketCodeInput, setTicketCodeInput] = useState('');
  const [scanResult, setScanResult] = useState<{
    status: 'success' | 'duplicate' | 'invalid' | null;
    holderName?: string;
    tier?: string;
    event?: string;
    timeCheckedIn?: string;
  }>({ status: null });

  const [isScanning, setIsScanning] = useState(true);

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
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="High-Speed Gate Scanner"
      subtitle="Sub-second cryptographic QR verification for door marshals"
      maxWidth="md"
    >
      <div className="space-y-5 text-center">
        
        {/* Camera Viewfinder Simulation */}
        <div className="relative h-64 rounded-3xl overflow-hidden bg-black border-2 border-[#E5A93C]/40 flex items-center justify-center">
          
          {/* Subtle animated scanline */}
          <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#E5A93C] to-transparent shadow-[0_0_15px_#E5A93C] animate-bounce" style={{ animationDuration: '2.5s' }} />

          {/* Viewfinder Target Reticle */}
          <div className="w-44 h-44 border-2 border-white/40 rounded-2xl relative flex items-center justify-center">
            <div className="absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 border-[#E5A93C] rounded-tl-lg" />
            <div className="absolute -top-1 -right-1 w-6 h-6 border-t-4 border-r-4 border-[#E5A93C] rounded-tr-lg" />
            <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-4 border-l-4 border-[#E5A93C] rounded-bl-lg" />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 border-[#E5A93C] rounded-br-lg" />

            <div className="text-center p-4">
              <Camera className="w-8 h-8 text-[#E5A93C] mx-auto mb-2 opacity-80 animate-pulse" />
              <span className="text-[11px] font-mono text-zinc-300 block">
                Point at attendee's Echelontix QR
              </span>
            </div>
          </div>

          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[10px] text-zinc-400 font-mono">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              GATE CAMERA ACTIVE
            </span>
            <span>60 FPS • 0.12s SCAN</span>
          </div>
        </div>

        {/* Live Scan Results Banner */}
        {scanResult.status === 'success' && (
          <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-left animate-in fade-in zoom-in-95">
            <div className="flex items-center gap-2 mb-1">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span className="font-bold text-sm font-serif text-white">ACCESS GRANTED (VIP PASS)</span>
            </div>
            <p className="text-xs text-white font-semibold">{scanResult.holderName}</p>
            <p className="text-[11px] text-emerald-400 font-mono">{scanResult.tier} • {scanResult.event}</p>
            <span className="text-[10px] text-zinc-400 block mt-1">Checked in at {scanResult.timeCheckedIn}</span>
          </div>
        )}

        {scanResult.status === 'duplicate' && (
          <div className="p-4 rounded-2xl bg-amber-500/15 border border-amber-500/40 text-amber-300 text-left">
            <div className="flex items-center gap-2 mb-1">
              <XCircle className="w-5 h-5 text-amber-400" />
              <span className="font-bold text-sm font-serif text-white">ALREADY SCANNED / DUPLICATE</span>
            </div>
            <p className="text-xs text-white font-semibold">{scanResult.holderName}</p>
            <p className="text-[11px] text-amber-400">{scanResult.timeCheckedIn}</p>
          </div>
        )}

        {scanResult.status === 'invalid' && (
          <div className="p-4 rounded-2xl bg-rose-500/15 border border-rose-500/40 text-rose-300 text-left">
            <div className="flex items-center gap-2 mb-1">
              <XCircle className="w-5 h-5 text-rose-400" />
              <span className="font-bold text-sm font-serif text-white">INVALID / UNRECOGNIZED PASS</span>
            </div>
            <p className="text-xs">Ticket does not match cryptographic signature for this event.</p>
          </div>
        )}

        {/* Quick Simulation Buttons */}
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => simulateScan('ECH-VALID-VIP')}
            className="p-2 text-xs font-semibold rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/25 cursor-pointer"
          >
            Simulate VIP Pass
          </button>
          <button
            onClick={() => simulateScan('ECH-DUP-PASS')}
            className="p-2 text-xs font-semibold rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 hover:bg-amber-500/25 cursor-pointer"
          >
            Simulate Duplicate
          </button>
          <button
            onClick={() => simulateScan('ECH-INVALID')}
            className="p-2 text-xs font-semibold rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 hover:bg-rose-500/25 cursor-pointer"
          >
            Simulate Invalid
          </button>
        </div>

        {/* Manual Lookup */}
        <div className="pt-3 border-t border-white/8">
          <label className="text-[11px] font-mono uppercase text-zinc-400 block mb-1.5 text-left">
            Or Enter 6-digit Pass ID Manually
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
              Verify
            </Button>
          </div>
        </div>

      </div>
    </Modal>
  );
};
