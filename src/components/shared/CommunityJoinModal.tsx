import React, { useState } from 'react';
import { Users, MessageSquare, Sparkles, CheckCircle2, ArrowRight, ShieldCheck, ExternalLink } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';

export interface CommunityJoinModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommunityJoinModal: React.FC<CommunityJoinModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [joinedHub, setJoinedHub] = useState<string | null>(null);

  const hubs = [
    {
      id: 'lagos-vip',
      name: 'Lagos Nightlife & Detty Dec Inner Circle',
      members: '4,280 members',
      platform: 'WhatsApp VIP Channel',
      tag: 'Strictly Curated',
      icon: '🍸'
    },
    {
      id: 'unilag-hub',
      name: 'UNILAG & Akoka Campus Soundclash Hub',
      members: '3,850 students',
      platform: 'Telegram & Discord',
      tag: 'Hall Reps & DJs',
      icon: '🎓'
    },
    {
      id: 'covenant-hub',
      name: 'Covenant / Bells / Babcock Creatives',
      members: '2,100 students',
      platform: 'WhatsApp Community',
      tag: 'Ogun Hub',
      icon: '⚡'
    },
    {
      id: 'abuja-gala',
      name: 'Abuja Elite Social & Jazz Society',
      members: '1,420 members',
      platform: 'Private Lounge',
      tag: 'Maitama / Wuse',
      icon: '👑'
    },
    {
      id: 'tech-founders',
      name: 'Silicon Lagoon Founders & VC Circle',
      members: '1,890 builders',
      platform: 'Slack & Inner Circle',
      tag: 'Deal Rooms',
      icon: '💡'
    }
  ];

  const handleJoin = (hubName: string) => {
    setJoinedHub(hubName);
    setTimeout(() => {
      // simulate opening link or toast
    }, 400);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Join Echelon Community Lounges"
      subtitle="Exclusive guest lists, ride-shares, campus ambassadors, and after-party drops"
      maxWidth="lg"
    >
      <div className="space-y-4">
        
        {joinedHub ? (
          <div className="p-6 text-center rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
            <h4 className="text-lg font-bold text-white font-serif">Welcome to {joinedHub}!</h4>
            <p className="text-xs text-zinc-300">
              An invitation link has been dispatched to your WhatsApp and email. You now have early access to secret drops.
            </p>
            <Button size="sm" variant="gold" onClick={() => setJoinedHub(null)}>
              Explore Other Chapters
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {hubs.map((hub) => (
              <div
                key={hub.id}
                className="p-4 rounded-2xl bg-[#12121E] border border-white/8 hover:border-[#E5A93C]/40 transition-all flex items-center justify-between gap-3 group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl p-2 rounded-xl bg-black/40 border border-white/10">
                    {hub.icon}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-gold-bright transition-colors">
                        {hub.name}
                      </h4>
                      <span className="text-[9px] px-1.5 py-0.2 bg-[#E5A93C]/20 text-[#FDE68A] rounded font-mono font-bold">
                        {hub.tag}
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-400">
                      {hub.members} • <span className="text-zinc-300">{hub.platform}</span>
                    </p>
                  </div>
                </div>

                <Button
                  size="sm"
                  variant="gold"
                  onClick={() => handleJoin(hub.name)}
                  rightIcon={<ExternalLink className="w-3.5 h-3.5" />}
                  className="flex-shrink-0 text-xs font-bold"
                >
                  Join
                </Button>
              </div>
            ))}
          </div>
        )}

        <div className="pt-2 text-center text-xs text-zinc-500 font-mono flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#E5A93C]" />
          <span>Moderated by verified Echelontix Campus & Nightlife Leads</span>
        </div>

      </div>
    </Modal>
  );
};
