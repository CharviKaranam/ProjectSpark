import React, { useState } from 'react';
import { 
  Users, 
  Target, 
  Wallet, 
  TrendingUp, 
  Calendar,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { GrowthStats } from '../types';
import { INITIAL_GROWTH_STATS } from '../data/mockData';

interface GrowthTowerProps {
  stats?: GrowthStats;
  liveRegistrationCount: number;
}

export const GrowthTower: React.FC<GrowthTowerProps> = ({
  stats = INITIAL_GROWTH_STATS,
  liveRegistrationCount,
}) => {
  const [appliedRecommendations, setAppliedRecommendations] = useState<Record<string, boolean>>({
    'rec-1': false,
    'rec-2': false,
    'rec-3': false,
  });

  const [hoveredDayIndex, setHoveredDayIndex] = useState<number | null>(3); // Day 4 (Today)
  const [hoveredChannelId, setHoveredChannelId] = useState<string | null>(null);

  // Dynamic calculations
  const baseCompleted = Math.max(stats.campaign.currentRegistrations, liveRegistrationCount);
  
  let bonus = 0;
  if (appliedRecommendations['rec-1']) bonus += 65;
  if (appliedRecommendations['rec-2']) bonus += 40;
  if (appliedRecommendations['rec-3']) bonus += 30;

  const completedRegistrations = baseCompleted + bonus;
  const targetRegistrations = stats.campaign.targetRegistrations; // 500
  const remainingRegistrations = Math.max(0, targetRegistrations - completedRegistrations);
  const maxBudget = stats.campaign.totalBudgetInr; // ₹2,000
  const usedBudget = stats.campaign.spentBudgetInr; // ₹1,140
  const remainingBudget = stats.campaign.remainingBudgetInr; // ₹860
  const costPerRegistration = (usedBudget / completedRegistrations).toFixed(2); // ₹2.97

  const toggleRecommendation = (id: string) => {
    setAppliedRecommendations(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Channels data
  const channelColors = [
    { id: 'squad-referrals', color: '#2563eb', shortName: 'Build Squad Referrals' },
    { id: 'class-rep-outreach', color: '#10b981', shortName: 'WhatsApp Class Reps' },
    { id: 'targeted-meta-ads', color: '#8b5cf6', shortName: 'Instagram Story Ads' },
    { id: 'linkedin-alumni', color: '#f97316', shortName: 'LinkedIn Student Posts' },
  ];

  const channelsData = stats.channels.map((ch, idx) => {
    const col = channelColors[idx] || channelColors[0];
    const sharePct = Math.round((ch.registrations / stats.campaign.currentRegistrations) * 1000) / 10;
    return {
      ...ch,
      sharePct,
      ...col,
    };
  });

  // Daily timeline calculations
  const dailyData = [
    { day: 'Day 1', label: 'Mon', daily: 42, cum: 42, isActual: true },
    { day: 'Day 2', label: 'Tue', daily: 68, cum: 110, isActual: true },
    { day: 'Day 3', label: 'Wed', daily: 125, cum: 235, isActual: true },
    { day: 'Day 4', label: 'Thu (Today)', daily: 149, cum: 384, isActual: true },
    { day: 'Day 5', label: 'Fri (Proj)', daily: 76, cum: 460, isActual: false },
    { day: 'Day 6', label: 'Sat (Proj)', daily: 65, cum: 525, isActual: false },
    { day: 'Day 7', label: 'Sun (Live)', daily: 60, cum: 585, isActual: false },
  ];

  // SVG Chart Geometry
  const chartW = 540;
  const chartH = 210;
  const padLeft = 40;
  const padRight = 25;
  const padTop = 25;
  const padBottom = 30;
  const innerW = chartW - padLeft - padRight;
  const innerH = chartH - padTop - padBottom;
  const maxCum = 650;
  const maxDaily = 180;
  const xStep = innerW / (dailyData.length - 1);

  const linePoints = dailyData.map((d, i) => {
    const x = padLeft + i * xStep;
    const y = padTop + innerH - (d.cum / maxCum) * innerH;
    return { x, y, ...d };
  });

  const linePathD = linePoints.reduce(
    (acc, pt, i) => (i === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`),
    ''
  );

  // Doughnut Chart Geometry
  const doughnutSize = 180;
  const strokeWidth = 28;
  const radius = (doughnutSize - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  
  let accumulatedAngle = 0;
  const doughnutSlices = channelsData.map((ch) => {
    const fraction = ch.registrations / stats.campaign.currentRegistrations;
    const strokeDasharray = `${fraction * circumference} ${circumference}`;
    const strokeDashoffset = -accumulatedAngle;
    accumulatedAngle += fraction * circumference;
    return {
      ...ch,
      strokeDasharray,
      strokeDashoffset,
    };
  });

  return (
    <div className="space-y-6 py-6 sm:py-8">
      {/* =========================================================================
          ROW 1 — HEADER
          Page title on the left. Date range and a small “Demo Data” label on the right.
          ========================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            Growth Control Tower
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            Real-time analytics for the 7-day sprint to 500 engineering student registrations on a ₹2,000 budget.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium">
            <Calendar className="w-3.5 h-3.5 text-blue-600" />
            <span>Oct 28 – Nov 3 (Day 4 of 7)</span>
          </div>
          <span className="text-[11px] font-bold px-2 py-1 rounded bg-amber-100 text-amber-800 border border-amber-200">
            Demo Data
          </span>
        </div>
      </div>

      {/* =========================================================================
          ROW 2 — FOUR KPI CARDS (EQUAL WIDTH IN ONE ROW)
          1. Completed Registrations (Blue)
          2. Remaining Registrations (Violet)
          3. Campaign Budget (Coral/Amber)
          4. Cost per Registration (Emerald)
          ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Completed Registrations */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50/80 to-white border border-blue-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-blue-900">Completed Registrations</span>
            <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center">
              <Users className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-black text-slate-900 tabular-nums">{completedRegistrations}</span>
            <span className="text-xs text-slate-500 font-medium">/ 500 Goal</span>
          </div>
          <div className="w-full h-1.5 bg-blue-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-600 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(100, (completedRegistrations / 500) * 100)}%` }}
            />
          </div>
          <div className="flex justify-between text-[11px] text-blue-800 font-medium">
            <span>{Math.round((completedRegistrations / 500) * 100)}% achieved</span>
            <span>+28% ahead of pace</span>
          </div>
        </div>

        {/* KPI 2: Remaining Registrations */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-violet-50/80 to-white border border-violet-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-violet-900">Remaining Registrations</span>
            <div className="w-7 h-7 rounded-lg bg-violet-600 text-white flex items-center justify-center">
              <Target className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-black text-slate-900 tabular-nums">{remainingRegistrations}</span>
            <span className="text-xs text-slate-500 font-medium">students left</span>
          </div>
          <div className="w-full h-1.5 bg-violet-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-violet-600 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(100, (remainingRegistrations / 500) * 100)}%` }}
            />
          </div>
          <div className="flex justify-between text-[11px] text-violet-800 font-medium">
            <span>~39 / day run-rate</span>
            <span>3 days remaining</span>
          </div>
        </div>

        {/* KPI 3: Campaign Budget */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-amber-50/80 to-white border border-amber-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-amber-900">Campaign Budget</span>
            <div className="w-7 h-7 rounded-lg bg-amber-500 text-white flex items-center justify-center">
              <Wallet className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-black text-slate-900 tabular-nums">₹{usedBudget}</span>
            <span className="text-xs text-slate-500 font-medium">/ ₹{maxBudget} Cap</span>
          </div>
          <div className="w-full h-1.5 bg-amber-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-amber-500 rounded-full transition-all duration-300"
              style={{ width: `${(usedBudget / maxBudget) * 100}%` }}
            />
          </div>
          <div className="flex justify-between text-[11px] text-amber-800 font-medium">
            <span>57% utilized</span>
            <span>₹{remainingBudget} reserve</span>
          </div>
        </div>

        {/* KPI 4: Cost per Registration */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-50/80 to-white border border-emerald-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-emerald-900">Cost per Registration</span>
            <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
              <TrendingUp className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-black text-emerald-700 tabular-nums">₹{costPerRegistration}</span>
            <span className="text-xs text-slate-500 font-medium">blended CAC</span>
          </div>
          <div className="w-full h-1.5 bg-emerald-100 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full w-full" />
          </div>
          <div className="flex justify-between text-[11px] text-emerald-800 font-medium">
            <span>84% below benchmark</span>
            <span>EdTech avg: ₹18–25</span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          ROW 3 — MAIN VISUALIZATIONS (TWO-COLUMN LAYOUT)
          Left: 7-day registration trend with daily bars and a cumulative line.
          Right: Channel-distribution doughnut chart with matching legend and counts.
          ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* Left: Registration Trend Chart (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-3 flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Registration Trend (Days 1–7)</h2>
              <p className="text-[11px] text-slate-500">Daily signups (blue bars) vs. cumulative trajectory (line).</p>
            </div>
            
            <div className="flex items-center gap-3 text-xs font-medium text-slate-600">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-blue-600" /> Daily Bars
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 bg-sky-500 rounded-full" /> Cumulative Line
              </span>
              <span className="flex items-center gap-1.5 text-rose-600 font-semibold">
                <span className="w-2.5 h-0.5 border-t border-dashed border-rose-500" /> 500 Goal
              </span>
            </div>
          </div>

          {/* SVG Chart Container */}
          <div className="relative w-full">
            <svg viewBox={`0 0 ${chartW} ${chartH}`} className="w-full h-auto select-none overflow-visible">
              {/* Target 500 Horizontal Reference Line */}
              {(() => {
                const targetY = padTop + innerH - (500 / maxCum) * innerH;
                return (
                  <g>
                    <line
                      x1={padLeft}
                      y1={targetY}
                      x2={chartW - padRight}
                      y2={targetY}
                      stroke="#f43f5e"
                      strokeWidth={1.5}
                      strokeDasharray="4 4"
                    />
                    <text x={chartW - padRight - 5} y={targetY - 5} fontSize="9" fill="#e11d48" fontWeight="bold" textAnchor="end">
                      Target 500
                    </text>
                  </g>
                );
              })()}

              {/* Gridlines */}
              {[100, 250, 400, 600].map((val) => {
                const y = padTop + innerH - (val / maxCum) * innerH;
                return (
                  <g key={val}>
                    <line x1={padLeft} y1={y} x2={chartW - padRight} y2={y} stroke="#f1f5f9" strokeWidth={1} />
                    <text x={padLeft - 6} y={y + 3} fontSize="8.5" fill="#94a3b8" textAnchor="end">
                      {val}
                    </text>
                  </g>
                );
              })}

              {/* Daily Bars */}
              {dailyData.map((d, i) => {
                const xCenter = padLeft + i * xStep;
                const barWidth = 24;
                const barH = (d.daily / maxDaily) * (innerH * 0.7);
                const barY = padTop + innerH - barH;
                const isHovered = hoveredDayIndex === i;

                return (
                  <g key={d.day} onMouseEnter={() => setHoveredDayIndex(i)} className="cursor-pointer">
                    {isHovered && (
                      <rect
                        x={xCenter - barWidth / 2 - 4}
                        y={padTop}
                        width={barWidth + 8}
                        height={innerH}
                        fill="#eff6ff"
                        rx="4"
                      />
                    )}
                    <rect
                      x={xCenter - barWidth / 2}
                      y={barY}
                      width={barWidth}
                      height={barH}
                      rx="4"
                      fill={d.isActual ? (isHovered ? '#1d4ed8' : '#2563eb') : '#cbd5e1'}
                    />
                    <text x={xCenter} y={barY - 4} fontSize="9" fill={isHovered ? '#1e3a8a' : '#64748b'} fontWeight="bold" textAnchor="middle">
                      +{d.daily}
                    </text>
                    <text x={xCenter} y={chartH - 10} fontSize="9" fill="#64748b" textAnchor="middle" fontWeight={isHovered ? 'bold' : 'normal'}>
                      {d.label}
                    </text>
                  </g>
                );
              })}

              {/* Cumulative Line */}
              <path d={linePathD} fill="none" stroke="#0284c7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

              {/* Cumulative Points */}
              {linePoints.map((pt, idx) => (
                <circle
                  key={idx}
                  cx={pt.x}
                  cy={pt.y}
                  r={hoveredDayIndex === idx ? 6 : 3.5}
                  fill="#ffffff"
                  stroke="#0284c7"
                  strokeWidth={2}
                  onMouseEnter={() => setHoveredDayIndex(idx)}
                  className="cursor-pointer"
                />
              ))}
            </svg>
          </div>

          {/* Interactive Inspection Strip */}
          {hoveredDayIndex !== null && (
            <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-200 text-xs flex items-center justify-between text-slate-700">
              <span className="font-semibold text-slate-900">
                {dailyData[hoveredDayIndex].day} ({dailyData[hoveredDayIndex].label}):
              </span>
              <div className="flex items-center gap-4">
                <span>Daily: <strong className="text-blue-600">+{dailyData[hoveredDayIndex].daily}</strong></span>
                <span>Cumulative: <strong className="text-slate-900">{dailyData[hoveredDayIndex].cum}</strong> / 500</span>
                <span className={`px-2 py-0.2 rounded text-[10px] font-bold ${dailyData[hoveredDayIndex].isActual ? 'bg-blue-100 text-blue-800' : 'bg-slate-200 text-slate-700'}`}>
                  {dailyData[hoveredDayIndex].isActual ? 'Actual' : 'Projected'}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Right: Channel-Distribution Doughnut Chart (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-3 flex flex-col justify-between">
          <div className="border-b border-slate-100 pb-2.5">
            <h2 className="text-sm font-bold text-slate-900">Channel Distribution</h2>
            <p className="text-[11px] text-slate-500">Registration breakdown across acquisition funnels.</p>
          </div>

          {/* Doughnut SVG */}
          <div className="flex flex-col items-center justify-center my-auto py-1">
            <div className="relative flex items-center justify-center">
              <svg width={doughnutSize} height={doughnutSize} className="transform -rotate-90 select-none">
                <circle cx={doughnutSize / 2} cy={doughnutSize / 2} r={radius} fill="transparent" stroke="#f1f5f9" strokeWidth={strokeWidth} />
                {doughnutSlices.map((slice) => {
                  const isHovered = hoveredChannelId === slice.id;
                  return (
                    <circle
                      key={slice.id}
                      cx={doughnutSize / 2}
                      cy={doughnutSize / 2}
                      r={radius}
                      fill="transparent"
                      stroke={slice.color}
                      strokeWidth={isHovered ? strokeWidth + 4 : strokeWidth}
                      strokeDasharray={slice.strokeDasharray}
                      strokeDashoffset={slice.strokeDashoffset}
                      className="transition-all cursor-pointer"
                      onMouseEnter={() => setHoveredChannelId(slice.id)}
                      onMouseLeave={() => setHoveredChannelId(null)}
                    />
                  );
                })}
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
                <span className="text-2xl font-black text-slate-900 tabular-nums">384</span>
                <span className="text-[10px] font-bold text-slate-500 uppercase">Total Signups</span>
                <span className="text-[10px] text-blue-600 font-bold">76.8% Goal</span>
              </div>
            </div>
          </div>

          {/* Coordinated Legend */}
          <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs">
            {channelsData.map((ch) => (
              <div
                key={ch.id}
                onMouseEnter={() => setHoveredChannelId(ch.id)}
                onMouseLeave={() => setHoveredChannelId(null)}
                className="flex items-center justify-between p-1 rounded hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: ch.color }} />
                  <span className="text-slate-800 font-medium truncate max-w-[170px]">{ch.shortName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 tabular-nums">{ch.registrations}</span>
                  <span className="text-[11px] text-slate-400 w-10 text-right tabular-nums">{ch.sharePct}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* =========================================================================
          ROW 4 — SUPPORTING INFORMATION (TWO COLUMNS)
          Left: Compact channel-performance table.
          Right: Seven-day campaign timeline with four stages (Days 1–2, 3–4, 5–6, 7).
          ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left: Compact Channel-Performance Table (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-3">
          <div className="border-b border-slate-100 pb-2">
            <h2 className="text-sm font-bold text-slate-900">Channel Performance Table</h2>
            <p className="text-[11px] text-slate-500">Unit economics and conversion rates across funnels.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead>
                <tr className="border-b border-slate-100 text-slate-500 font-semibold">
                  <th className="py-2 px-2">Channel</th>
                  <th className="py-2 px-2 text-right">Signups</th>
                  <th className="py-2 px-2 text-right">Conv.</th>
                  <th className="py-2 px-2 text-right">Spend</th>
                  <th className="py-2 px-2 text-right">CAC</th>
                  <th className="py-2 px-2 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {channelsData.map((ch) => (
                  <tr key={ch.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-2.5 px-2 font-medium text-slate-900">{ch.shortName}</td>
                    <td className="py-2.5 px-2 text-right font-bold text-slate-900 tabular-nums">{ch.registrations}</td>
                    <td className="py-2.5 px-2 text-right text-slate-600 tabular-nums">{ch.conversionRate}%</td>
                    <td className="py-2.5 px-2 text-right text-slate-600 tabular-nums">₹{ch.spendInr}</td>
                    <td className="py-2.5 px-2 text-right font-bold text-slate-900 tabular-nums">₹{ch.cacInr.toFixed(2)}</td>
                    <td className="py-2.5 px-2 text-right">
                      <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {ch.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t border-slate-200 font-bold text-slate-900 bg-slate-50/70">
                  <td className="py-2 px-2">Total / Blended</td>
                  <td className="py-2 px-2 text-right tabular-nums">384</td>
                  <td className="py-2 px-2 text-right tabular-nums">32.4%</td>
                  <td className="py-2 px-2 text-right tabular-nums">₹1,140</td>
                  <td className="py-2 px-2 text-right text-emerald-700 tabular-nums">₹2.97</td>
                  <td className="py-2 px-2 text-right text-[10px] text-emerald-700">Optimal Pace</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Right: Seven-Day Campaign Timeline (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-3">
          <div className="border-b border-slate-100 pb-2">
            <h2 className="text-sm font-bold text-slate-900">Seven-Day Campaign Timeline</h2>
            <p className="text-[11px] text-slate-500">Planned growth sprints for the ₹2,000 budget model.</p>
          </div>

          <div className="space-y-3 text-xs">
            {/* Days 1–2 */}
            <div className="p-3 rounded-xl bg-blue-50/50 border border-blue-200/80 space-y-0.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-blue-900">Days 1–2: Seed Acquisition</span>
                <span className="text-[10px] font-semibold text-blue-700 bg-blue-100 px-1.5 py-0.2 rounded">Completed</span>
              </div>
              <p className="text-slate-600 leading-snug">
                Targeted Instagram Story ads seeded initial 52 engineering registrations (₹940 spend).
              </p>
            </div>

            {/* Days 3–4 */}
            <div className="p-3 rounded-xl bg-emerald-50/50 border border-emerald-200/80 space-y-0.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-emerald-900">Days 3–4: Class Rep & Squad Activation</span>
                <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded">Current</span>
              </div>
              <p className="text-slate-600 leading-snug">
                Activated WhatsApp CRs with ₹100 Swiggy vouchers (₹200 spend); unlocked 3-student squad perks.
              </p>
            </div>

            {/* Days 5–6 */}
            <div className="p-3 rounded-xl bg-violet-50/50 border border-violet-200/80 space-y-0.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-violet-900">Days 5–6: Squad Completion Nudges</span>
                <span className="text-[10px] font-semibold text-slate-600 bg-slate-100 px-1.5 py-0.2 rounded">Upcoming</span>
              </div>
              <p className="text-slate-600 leading-snug">
                Automated WhatsApp reminders to 48 two-person squads 1 friend away from group perks.
              </p>
            </div>

            {/* Day 7 */}
            <div className="p-3 rounded-xl bg-pink-50/50 border border-pink-200/80 space-y-0.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-pink-900">Day 7: Workshop Execution & Retention</span>
                <span className="text-[10px] font-semibold text-slate-600 bg-slate-100 px-1.5 py-0.2 rounded">Finale</span>
              </div>
              <p className="text-slate-600 leading-snug">
                Release starter code repo, conduct 60-min live build, and convert attendees into GitHub contributors.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          ROW 5 — RECOMMENDED NEXT ACTIONS
          Three concise recommendation cards side by side.
          Each contains: short action title, one sentence explaining why, action indicator.
          ========================================================================= */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900">Recommended Next Actions</h2>
          <span className="text-xs text-slate-500">Data-backed interventions to exceed 500 registrations</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          {/* Action 1 */}
          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-2.5 flex flex-col justify-between">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                  High Impact
                </span>
                <span className="text-xs font-bold text-emerald-700">+65 Signups</span>
              </div>
              <h3 className="font-bold text-slate-900 text-xs sm:text-sm">
                Reallocate ₹600 to Class Rep Bounties
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Class Rep CAC is ₹2.13 vs. Instagram Ads at ₹18.07, generating 65+ organic registrations at zero net cost change.
              </p>
            </div>

            <button
              onClick={() => toggleRecommendation('rec-1')}
              className={`w-full py-2 rounded-lg font-semibold text-xs cursor-pointer transition-colors ${
                appliedRecommendations['rec-1']
                  ? 'bg-rose-600 text-white'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
              }`}
            >
              {appliedRecommendations['rec-1'] ? 'Applied (Active)' : 'Simulate Action'}
            </button>
          </div>

          {/* Action 2 */}
          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-2.5 flex flex-col justify-between">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Quick Win
                </span>
                <span className="text-xs font-bold text-emerald-700">+40 Signups</span>
              </div>
              <h3 className="font-bold text-slate-900 text-xs sm:text-sm">
                Nudge 48 Incomplete 2-Person Squads
              </h3>
              <p className="text-slate-600 leading-relaxed">
                48 students have 2 teammates registered; automated reminders for the 3-student breakout perk close 40+ signups.
              </p>
            </div>

            <button
              onClick={() => toggleRecommendation('rec-2')}
              className={`w-full py-2 rounded-lg font-semibold text-xs cursor-pointer transition-colors ${
                appliedRecommendations['rec-2']
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
              }`}
            >
              {appliedRecommendations['rec-2'] ? 'Applied (Active)' : 'Simulate Action'}
            </button>
          </div>

          {/* Action 3 */}
          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-2.5 flex flex-col justify-between">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  Conversion
                </span>
                <span className="text-xs font-bold text-emerald-700">+30 Signups</span>
              </div>
              <h3 className="font-bold text-slate-900 text-xs sm:text-sm">
                Highlight Placement Drive Urgency
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Emphasizing verified STAR resume bullets lifts registration conversion from 32.4% to 36% during placement season.
              </p>
            </div>

            <button
              onClick={() => toggleRecommendation('rec-3')}
              className={`w-full py-2 rounded-lg font-semibold text-xs cursor-pointer transition-colors ${
                appliedRecommendations['rec-3']
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
              }`}
            >
              {appliedRecommendations['rec-3'] ? 'Applied (Active)' : 'Simulate Action'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
