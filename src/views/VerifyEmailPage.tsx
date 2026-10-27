import React, { useState } from 'react';
import { Sparkles, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';

export interface VerifyEmailPageProps {
  onNavigate: (route: string) => void;
}

export const VerifyEmailPage: React.FC<VerifyEmailPageProps> = ({
  onNavigate,
}) => {
  const [otp, setOtp] = useState(['8', '4', '2', '9']);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);

    setTimeout(() => {
      setIsVerifying(false);
      setIsSuccess(true);
      setTimeout(() => {
        onNavigate('my-tickets');
      }, 1200);
    }, 900);
  };

  return (
    <div className="pt-32 pb-24 min-h-[85vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#E5A93C]/10 blur-[150px] pointer-events-none rounded-full" />

      <div className="relative z-10 w-full max-w-md">
        
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5A93C]/15 border border-[#E5A93C]/40 text-[#FDE68A] text-xs font-mono uppercase tracking-widest mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-[#E5A93C]" />
            Security & Identity
          </div>
          <h1 className="text-3xl font-black font-serif text-white tracking-tight">
            VERIFY YOUR <span className="text-gold-metallic">ACCOUNT</span>
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            We dispatched a 4-digit secure code to your phone and email.
          </p>
        </div>

        <div className="bg-[#0E0E18]/90 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-center">
          
          {isSuccess ? (
            <div className="space-y-4 py-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto animate-bounce">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white font-serif">Account Verified!</h3>
              <p className="text-xs text-zinc-300">
                Redirecting to your VIP passes dashboard...
              </p>
            </div>
          ) : (
            <form onSubmit={handleVerify} className="space-y-6">
              
              <div className="flex justify-center gap-3">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => {
                      const newOtp = [...otp];
                      newOtp[idx] = e.target.value;
                      setOtp(newOtp);
                    }}
                    className="w-14 h-16 text-center text-2xl font-mono font-bold bg-[#141422] text-white rounded-2xl border border-[#E5A93C]/40 focus:border-[#E5A93C] focus:ring-2 focus:ring-[#E5A93C]/20 shadow-inner"
                  />
                ))}
              </div>

              <p className="text-xs text-zinc-400">
                Didn't receive code?{' '}
                <button type="button" className="text-[#E5A93C] hover:underline font-bold cursor-pointer">
                  Resend in 24s
                </button>
              </p>

              <Button
                id="verify-email-submit-btn"
                size="lg"
                variant="gold"
                type="submit"
                isLoading={isVerifying}
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="w-full font-bold shadow-lg shadow-[#E5A93C]/20"
              >
                Confirm & Access Dashboard
              </Button>
            </form>
          )}

          <div className="text-center text-xs text-zinc-500 font-mono pt-2 border-t border-white/8">
            🔒 Bank-grade OTP session verification
          </div>

        </div>

      </div>

    </div>
  );
};
