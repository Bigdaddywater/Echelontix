import React, { useState, useEffect } from 'react';
import { 
  Eye, 
  Users, 
  TrendingUp, 
  Globe, 
  Smartphone, 
  Compass, 
  Share2, 
  Clock, 
  Sparkles,
  ArrowUpRight,
  Activity,
  Zap,
  Filter
} from 'lucide-react';
import { EventItem } from '../../types';
import { formatNaira, formatUSD } from '../../utils/formatters';

interface LiveTrafficAnalyticsProps {
  event: EventItem;
  currency: 'NGN' | 'USD';
}

export const LiveTrafficAnalytics: React.FC<LiveTrafficAnalyticsProps> = ({ event, currency }) => {
  // Simulated real-time fluctuating active visitor counter
  const [activeConcurrentVisitors, setActiveConcurrentVisitors] = useState(148);
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d'>('24h');
  const [recentTrafficPings, setRecentTrafficPings] = useState<number[]>([120, 134, 142, 138, 145, 150, 148]);

  useEffect(() => {
    const interval = setInterval(() => {
      const delta = Math.floor(Math.random() * 9) - 4; // -4 to +4
      setActiveConcurrentVisitors((prev) => {
        const next = Math.max(85, Math.min(260, prev + delta));
        setRecentTrafficPings((pings) => [...pings.slice(1), next]);
        return next;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const totalPageImpressions = 48250;
  const uniqueVisitors = 31400;
  const avgSessionDuration = '2m 45s';
  const bounceRate = '24.2%';

  // 24h Hourly Traffic Distribution
  const hourlyData = [
    { hour: '12 AM', views: 420, sales: 8 },
    { hour: '02 AM', views: 180, sales: 2 },
    { hour: '04 AM', views: 95, sales: 0 },
    { hour: '06 AM', views: 240, sales: 4 },
    { hour: '08 AM', views: 890, sales: 22 },
    { hour: '10 AM', views: 1640, sales: 54 },
    { hour: '12 PM', views: 2850, sales: 112 },
    { hour: '02 PM', views: 3420, sales: 145 },
    { hour: '04 PM', views: 4100, sales: 180 },
    { hour: '06 PM', views: 5600, sales: 260 },
    { hour: '08 PM', views: 7800, sales: 410 },
    { hour: '10 PM', views: 6200, sales: 310 },
  ];

  const maxViews = Math.max(...hourlyData.map((d) => d.views));

  // Conversion Funnel Data
  const funnelSteps = [
    { label: 'Event Page Views', count: 48250, percent: 100, color: 'bg-zinc-600', sub: 'Unique browsing sessions' },
    { label: 'Pass Tier Selected', count: 12400, percent: 25.7, color: 'bg-amber-700', sub: 'Clicked VIP / Regular tiers' },
    { label: 'Checkout Form Filled', count: 3950, percent: 8.2, color: 'bg-[#E5A93C]', sub: 'Entered attendee details' },
    { label: 'Pass Issued & Paid', count: 1850, percent: 3.83, color: 'bg-emerald-500', sub: 'Instant bank / gateway settlement' },
  ];

  // Referral Traffic Channels
  const trafficChannels = [
    { name: 'Instagram & Influencer Links', percentage: 44, visits: '21,230', salesRevenueNGN: 10934000, icon: '📸' },
    { name: 'WhatsApp Campus Groups & Status', percentage: 28, visits: '13,510', salesRevenueNGN: 6958000, icon: '💬' },
    { name: 'Direct URL & Search Discovery', percentage: 16, visits: '7,720', salesRevenueNGN: 3976000, icon: '🔍' },
    { name: 'Twitter / X Trending Mentions', percentage: 12, visits: '5,790', salesRevenueNGN: 2982000, icon: '🐦' },
  ];

  // Geolocation Breakdown
  const geoBreakdown = [
    { region: 'Lagos Island (VI, Lekki, Ikoyi)', share: '54%', badge: 'Primary Hub' },
    { region: 'Lagos Mainland (Ikeja, Yaba, Surulere)', share: '28%', badge: 'Campus Hotspot' },
    { region: 'Abuja FCT (Maitama, Wuse)', share: '11%', badge: 'High AOV' },
    { region: 'Ibadan, Port Harcourt & Diaspora', share: '7%', badge: 'Emerging' },
  ];

  return (
    <div className="space-y-6">
      
      {/* Live Visitor Banner Card */}
      <div className="p-6 rounded-3xl bg-linear-to-r from-[#121222] via-[#0E0E18] to-[#141420] border border-[#E5A93C]/30 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#E5A93C]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-xs font-mono uppercase font-bold text-emerald-400 tracking-wider">
                LIVE TRAFFIC PULSE • REAL-TIME
              </span>
            </div>
            <div className="flex items-baseline gap-3">
              <span className="text-4xl sm:text-5xl font-black font-mono text-white tracking-tight">
                {activeConcurrentVisitors}
              </span>
              <span className="text-sm font-medium text-zinc-300">
                active visitors browsing <span className="text-[#FDE68A] font-bold">"{event.title}"</span> right now
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-2 font-mono">
              Avg. 24 checkout sessions initiated every 10 minutes • 0ms latency
            </p>
          </div>

          {/* Sparkline Visual of Concurrent Visitors */}
          <div className="bg-black/40 border border-white/10 p-4 rounded-2xl flex flex-col items-end gap-2 shrink-0">
            <span className="text-[10px] font-mono uppercase text-zinc-400">Live 60-Sec Telemetry</span>
            <div className="flex items-end gap-1.5 h-12">
              {recentTrafficPings.map((val, idx) => (
                <div
                  key={idx}
                  className="w-4 bg-linear-to-t from-[#E5A93C] to-[#FDE68A] rounded-t transition-all duration-500"
                  style={{ height: `${Math.round((val / 260) * 100)}%` }}
                  title={`${val} active users`}
                />
              ))}
            </div>
            <span className="text-[10px] font-mono text-[#E5A93C]">Peak Today: 254 active</span>
          </div>
        </div>
      </div>

      {/* 4 Core Traffic Telemetry Tiles */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-[#0E0E16] border border-white/8">
          <div className="flex items-center justify-between text-xs text-zinc-400 font-mono mb-1">
            <span>TOTAL PAGEVIEWS</span>
            <Eye className="w-3.5 h-3.5 text-[#E5A93C]" />
          </div>
          <span className="text-xl sm:text-2xl font-mono font-black text-white block">
            {totalPageImpressions.toLocaleString()}
          </span>
          <span className="text-[10px] text-emerald-400 font-mono">+34.2% vs previous run</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#0E0E16] border border-white/8">
          <div className="flex items-center justify-between text-xs text-zinc-400 font-mono mb-1">
            <span>UNIQUE AUDIENCE</span>
            <Users className="w-3.5 h-3.5 text-indigo-400" />
          </div>
          <span className="text-xl sm:text-2xl font-mono font-black text-white block">
            {uniqueVisitors.toLocaleString()}
          </span>
          <span className="text-[10px] text-zinc-400 font-mono">65.1% net unique ratio</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#0E0E16] border border-white/8">
          <div className="flex items-center justify-between text-xs text-zinc-400 font-mono mb-1">
            <span>TIME ON EVENT PAGE</span>
            <Clock className="w-3.5 h-3.5 text-[#FDE68A]" />
          </div>
          <span className="text-xl sm:text-2xl font-mono font-black text-white block">
            {avgSessionDuration}
          </span>
          <span className="text-[10px] text-emerald-400 font-mono">High intent engagement</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#0E0E16] border border-white/8">
          <div className="flex items-center justify-between text-xs text-zinc-400 font-mono mb-1">
            <span>CONVERSION RATE</span>
            <Zap className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <span className="text-xl sm:text-2xl font-mono font-black text-white block">
            3.83%
          </span>
          <span className="text-[10px] text-emerald-400 font-mono">1,850 completed passes</span>
        </div>
      </div>

      {/* Main Analysis Grid: Hourly Traffic Chart + Conversion Funnel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Hourly Traffic & Sales Velocity Histogram (7 cols) */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-[#0E0E16] border border-white/10 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/8">
            <div>
              <h3 className="text-base font-bold text-white font-serif">Hourly Traffic & Ticket Sales Velocity</h3>
              <p className="text-xs text-zinc-400">Peak visitor influx corresponds with 08:00 PM evening drops</p>
            </div>
            <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded-xl border border-white/10 text-[11px] font-mono">
              <button 
                onClick={() => setTimeRange('24h')}
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${timeRange === '24h' ? 'bg-[#E5A93C] text-black font-bold' : 'text-zinc-400 hover:text-white'}`}
              >
                24H
              </button>
              <button 
                onClick={() => setTimeRange('7d')}
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${timeRange === '7d' ? 'bg-[#E5A93C] text-black font-bold' : 'text-zinc-400 hover:text-white'}`}
              >
                7D
              </button>
            </div>
          </div>

          {/* Histogram Chart */}
          <div className="pt-4">
            <div className="flex items-end justify-between gap-1.5 sm:gap-2 h-48 pb-2 border-b border-white/10">
              {hourlyData.map((bar, idx) => {
                const heightPercent = Math.round((bar.views / maxViews) * 100);
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 group relative">
                    {/* Hover Tooltip */}
                    <div className="absolute -top-12 bg-[#1C1C2C] text-white text-[10px] font-mono p-1.5 rounded-lg border border-white/15 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20 shadow-xl">
                      <p className="font-bold text-[#FDE68A]">{bar.views.toLocaleString()} views</p>
                      <p className="text-emerald-400">{bar.sales} tickets sold</p>
                    </div>

                    <div className="w-full bg-white/5 rounded-t-md flex flex-col justify-end overflow-hidden h-40">
                      <div
                        className="w-full bg-linear-to-t from-[#E5A93C]/80 to-[#FDE68A] group-hover:brightness-125 transition-all rounded-t-md"
                        style={{ height: `${heightPercent}%` }}
                      />
                    </div>
                    <span className="text-[9px] font-mono text-zinc-500 truncate w-full text-center">
                      {bar.hour}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 pt-3">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-linear-to-t from-[#E5A93C] to-[#FDE68A]" />
                <span>Live Pageviews</span>
              </div>
              <span className="text-zinc-500">Auto-refreshed via WebSocket ping</span>
            </div>
          </div>
        </div>

        {/* 4-Stage Conversion Funnel (5 cols) */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-[#0E0E16] border border-white/10 shadow-xl space-y-4">
          <div className="pb-3 border-b border-white/8">
            <h3 className="text-base font-bold text-white font-serif">Purchase Conversion Funnel</h3>
            <p className="text-xs text-zinc-400">Step-by-step visitor progression to paid pass</p>
          </div>

          <div className="space-y-3 pt-1">
            {funnelSteps.map((step, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-[#12121D] border border-white/8 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white">{step.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[#FDE68A] font-bold">{step.count.toLocaleString()}</span>
                    <span className="text-[10px] font-mono text-zinc-400">({step.percent}%)</span>
                  </div>
                </div>

                <div className="w-full bg-black/40 h-2 rounded-full overflow-hidden">
                  <div 
                    className={`${step.color} h-full rounded-full transition-all duration-1000`} 
                    style={{ width: `${step.percent}%` }}
                  />
                </div>

                <p className="text-[10px] text-zinc-400 font-mono">{step.sub}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Traffic Referral Channels & Geolocation Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Referral Channels (7 cols) */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-[#0E0E16] border border-white/10 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/8">
            <div>
              <h3 className="text-base font-bold text-white font-serif">Traffic Channels & Campaign Referrals</h3>
              <p className="text-xs text-zinc-400">Where your ticket buyers are coming from</p>
            </div>
            <span className="text-[11px] font-mono text-[#E5A93C] tracking-wide">UTM Tagged</span>
          </div>

          <div className="space-y-3">
            {trafficChannels.map((chan, idx) => {
              const formattedRevenue = currency === 'NGN' ? formatNaira(chan.salesRevenueNGN) : formatUSD(chan.salesRevenueNGN);
              return (
                <div key={idx} className="p-3.5 rounded-2xl bg-[#12121E] border border-white/6 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{chan.icon}</span>
                    <div>
                      <h4 className="text-xs font-bold text-white">{chan.name}</h4>
                      <span className="text-[10px] text-zinc-400 font-mono">{chan.visits} visitors • {chan.percentage}% share</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-mono font-bold text-[#FDE68A] block">{formattedRevenue}</span>
                    <span className="text-[10px] text-emerald-400 font-mono">Direct sales</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Geolocation & Campus Clusters (5 cols) */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-[#0E0E16] border border-white/10 shadow-xl space-y-4">
          <div className="pb-3 border-b border-white/8">
            <h3 className="text-base font-bold text-white font-serif">Audience Geolocation Clusters</h3>
            <p className="text-xs text-zinc-400">Visitor locations detected across Nigeria</p>
          </div>

          <div className="space-y-3">
            {geoBreakdown.map((geo, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-[#12121E] border border-white/6 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-white block">{geo.region}</span>
                  <span className="text-[10px] text-zinc-400 font-mono">{geo.badge}</span>
                </div>
                <span className="text-sm font-mono font-black text-[#FDE68A]">{geo.share}</span>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-2xl bg-white/5 border border-white/8 flex items-center gap-2.5 text-xs text-zinc-300">
            <Globe className="w-4 h-4 text-[#E5A93C] shrink-0" />
            <span>94% Mobile Browsing (iOS Apple Safari & Android Chrome)</span>
          </div>
        </div>

      </div>

    </div>
  );
};
