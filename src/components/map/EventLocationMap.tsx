import React, { useState } from 'react';
import { 
  APIProvider, 
  Map, 
  AdvancedMarker, 
  Pin, 
  InfoWindow,
  useAdvancedMarkerRef 
} from '@vis.gl/react-google-maps';
import { 
  MapPin, 
  Navigation, 
  Compass, 
  Car, 
  ShieldCheck, 
  Copy, 
  Check, 
  ExternalLink, 
  Key, 
  Sparkles,
  Info,
  Maximize2
} from 'lucide-react';
import { EventItem } from '../../types';
import { Button } from '../ui/Button';

export interface EventLocationMapProps {
  event: EventItem;
  className?: string;
  height?: string;
  compact?: boolean;
  apiKey?: string;
}

// Note: prefer passing `apiKey` prop from the caller. Otherwise the component
// will read `process.env.NEXT_PUBLIC_GOOGLE_MAPS_PLATFORM_KEY` (Next.js public env).
export function resolveApiKey(propKey?: string) {
  const envKey = typeof process !== 'undefined' ? (process.env.NEXT_PUBLIC_GOOGLE_MAPS_PLATFORM_KEY as string | undefined) : undefined;
  const globalKey = typeof globalThis !== 'undefined' && (globalThis as any).GOOGLE_MAPS_PLATFORM_KEY ? (globalThis as any).GOOGLE_MAPS_PLATFORM_KEY : undefined;
  const key = propKey ?? envKey ?? globalKey ?? '';
  return key;
}

export const EventLocationMap: React.FC<EventLocationMapProps> = ({
  event,
  className = '',
  height = '340px',
  compact = false,
  apiKey,
}) => {
  const [copied, setCopied] = useState(false);
  const [showKeyGuide, setShowKeyGuide] = useState(false);
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [infoOpen, setInfoOpen] = useState(true);

  // Default coordinate fallback for Nigeria if not defined
  const coordinates = event.location.coordinates || { lat: 6.4474, lng: 3.4723 };
  
  const googleMapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    `${event.location.venue}, ${event.location.address}, ${event.location.city}, ${event.location.country}`
  )}`;

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(`${event.location.venue}, ${event.location.address}, ${event.location.city}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const API_KEY = resolveApiKey(apiKey);
  const hasValidKey = Boolean(API_KEY) && API_KEY !== 'YOUR_API_KEY' && API_KEY.trim().length > 0;

  return (
    <div className={`rounded-2xl bg-[#0E0E16] border border-white/10 overflow-hidden shadow-xl ${className}`}>
      {/* Map Header Strip */}
      <div className="p-4 bg-[#141420] border-b border-white/8 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#E5A93C]/15 border border-[#E5A93C]/30 flex items-center justify-center text-[#E5A93C] shrink-0">
            <MapPin className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h4 className="text-sm font-bold text-white font-serif">{event.location.venue}</h4>
              {event.location.isCampus && (
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  Campus Venue
                </span>
              )}
            </div>
            <p className="text-xs text-zinc-400 truncate max-w-sm">{event.location.address}, {event.location.city}</p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleCopyAddress}
            className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Copy address"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>

          <a
            href={googleMapsDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-lg bg-linear-to-r from-[#E5A93C] to-[#C27803] text-black font-bold text-xs flex items-center gap-1.5 hover:brightness-110 transition-all shadow-md cursor-pointer"
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>Get Directions</span>
            <ExternalLink className="w-3 h-3 opacity-70" />
          </a>
        </div>
      </div>

      {/* Interactive Map Area */}
      <div className="relative w-full" style={{ height }}>
        {hasValidKey ? (
          <APIProvider apiKey={API_KEY} version="weekly">
            <Map
              defaultCenter={coordinates}
              defaultZoom={15}
              mapId="ECHELON_EVENT_MAP"
              internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
              style={{ width: '100%', height: '100%' }}
              gestureHandling="cooperative"
            >
              <AdvancedMarker
                ref={markerRef}
                position={coordinates}
                title={event.location.venue}
                onClick={() => setInfoOpen(!infoOpen)}
              >
                <Pin 
                  background="#E5A93C" 
                  borderColor="#78350F" 
                  glyphColor="#000000" 
                  scale={1.15}
                />
              </AdvancedMarker>

              {infoOpen && (
                <InfoWindow 
                  anchor={marker} 
                  onCloseClick={() => setInfoOpen(false)}
                >
                  <div className="p-1 text-black max-w-xs">
                    <strong className="block text-sm font-bold">{event.location.venue}</strong>
                    <p className="text-xs text-zinc-700 mt-0.5">{event.location.address}</p>
                    <a
                      href={googleMapsDirectionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-amber-800 hover:underline"
                    >
                      <span>Open Live GPS Navigation →</span>
                    </a>
                  </div>
                </InfoWindow>
              )}
            </Map>
          </APIProvider>
        ) : (
          /* High-Fidelity Custom Fallback Map Canvas */
          <div className="relative w-full h-full bg-[#0b0c16] flex flex-col items-center justify-center p-6 text-center overflow-hidden">
            {/* Styled Dark Cartographic Grid Background Pattern */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#E5A93C_1px,transparent_1px) bg-size-[16px_16px]" />
            <div className="absolute inset-0 bg-linear-to-t from-[#09090F] via-transparent to-[#09090F]/80 pointer-events-none" />

            {/* Pulsing Pin Indicator */}
            <div className="relative z-10 mb-3 flex flex-col items-center">
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-[#E5A93C]/20 animate-ping absolute inset-0" />
                <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-[#FDE68A] to-[#D97706] text-black flex items-center justify-center shadow-lg shadow-[#E5A93C]/30 relative z-10 border border-[#FFFBEB]">
                  <MapPin className="w-6 h-6 fill-black" />
                </div>
              </div>
              <span className="mt-2 text-xs font-mono font-bold text-[#FDE68A] bg-black/70 px-2.5 py-0.5 rounded-full border border-white/10">
                {coordinates.lat.toFixed(4)}° N, {coordinates.lng.toFixed(4)}° E
              </span>
            </div>

            <div className="relative z-10 max-w-md">
              <h5 className="text-sm font-bold text-white font-serif">{event.location.venue}</h5>
              <p className="text-xs text-zinc-400 mt-0.5">{event.location.address}, {event.location.city}</p>
              
              <div className="mt-3 flex items-center justify-center gap-2">
                <a
                  href={googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#E5A93C] text-black text-xs font-bold shadow-lg shadow-[#E5A93C]/20 hover:brightness-110 transition-all cursor-pointer"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Launch Turn-by-Turn GPS</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <button
                  onClick={() => setShowKeyGuide(!showKeyGuide)}
                  className="inline-flex items-center gap-1 text-[11px] text-zinc-400 hover:text-zinc-200 bg-white/5 hover:bg-white/10 px-2.5 py-1.5 rounded-xl border border-white/10 transition-colors cursor-pointer"
                >
                  <Key className="w-3 h-3 text-[#E5A93C]" />
                  <span>{showKeyGuide ? 'Hide API Setup' : 'API Key Status'}</span>
                </button>
              </div>
            </div>

            {/* API Key Modal / Helper Info Box */}
            {showKeyGuide && (
              <div className="absolute inset-x-4 top-4 bottom-4 z-20 bg-[#10101C]/95 backdrop-blur-md rounded-xl border border-[#E5A93C]/40 p-4 text-left overflow-y-auto custom-scrollbar">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#E5A93C]">
                    <Key className="w-4 h-4" />
                    <span>GOOGLE MAPS PLATFORM KEY REQUIRED</span>
                  </div>
                  <button 
                    onClick={() => setShowKeyGuide(false)}
                    className="text-xs text-zinc-400 hover:text-white px-2 py-0.5 rounded bg-white/10 cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
                <p className="text-xs text-zinc-300 mb-2">
                  To render the live vector Google Map tiles directly inside the applet:
                </p>
                <ol className="text-[11px] text-zinc-300 space-y-1.5 list-decimal pl-4">
                  <li>
                    Get an API key: <a href="https://console.cloud.google.com/google/maps-apis/start?utm_campaign=gmp-code-assist-ais" target="_blank" rel="noopener noreferrer" className="text-[#FDE68A] underline">Google Cloud Console</a>
                  </li>
                  <li>Open <strong>Settings</strong> (⚙️ gear icon, top-right) → <strong>Secrets</strong></li>
                  <li>Add Secret Name: <code className="bg-black/50 px-1 py-0.5 rounded text-[#FDE68A]">GOOGLE_MAPS_PLATFORM_KEY</code></li>
                  <li>Paste your key and press Enter. (App rebuilds automatically).</li>
                </ol>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Transit & Venue Logistics Guide */}
      {!compact && (
        <div className="p-3.5 bg-[#0A0A10] border-t border-white/8 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="flex items-center gap-2 text-zinc-300">
            <Car className="w-4 h-4 text-[#E5A93C] shrink-0" />
            <div>
              <span className="text-[10px] uppercase font-mono text-zinc-500 block">Valet & Parking</span>
              <span>Designated VIP and general bays</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-zinc-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <div>
              <span className="text-[10px] uppercase font-mono text-zinc-500 block">Security Perimeter</span>
              <span>24/7 armed private & state security</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-zinc-300">
            <Compass className="w-4 h-4 text-blue-400 shrink-0" />
            <div>
              <span className="text-[10px] uppercase font-mono text-zinc-500 block">Fast-Track Gates</span>
              <span>Dedicated QR express lanes</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventLocationMap;
