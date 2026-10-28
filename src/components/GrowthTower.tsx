import React, { useState } from 'react';
import { 
  Users, 
  Target, 
  Wallet, 
  TrendingUp, 
  Calendar, 
  ChevronDown, 
  AlertCircle,
  BarChart3,
  PieChart,
  Lightbulb,
  ChevronRight,
  CheckCircle2
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
  const [channelFilter, setChannelFilter] = useState<'Registrations' | 'Spend' | 'CAC'>('Registrations');
  const [activeActionModal, setActiveActionModal] = useState<string | null>(null);

  // Dynamic calculations based on live registrations if added
  const extraRegistrations = Math.max(0, liveRegistrationCount - stats.campaign.currentRegistrations);
  const completedRegistrations = stats.campaign.currentRegistrations + extraRegistrations;
  const targetRegistrations = 500;
  const remainingRegistrations = Math.max(0, targetRegistrations - completedRegistrations);
  const totalBudget = 2000;
  const usedBudget = stats.campaign.spentBudgetInr;
  const remainingBudget = totalBudget - usedBudget;
  const budgetUsedPct = Math.round((usedBudget / totalBudget) * 100);
  const registrationPct = Math.round((completedRegistrations / targetRegistrations) * 100);
  const costPerReg = (usedBudget / completedRegistrations).toFixed(2);

  // Channel details matching reference
  const channels = [
    {
      name: 'College Communities',
      color: '#2563eb', // Blue
      registrations: 74 + (extraRegistrations > 0 ? Math.floor(extraRegistrations * 0.35) : 0),
      share: 35,
      conversionRate: '-',
      amountSpent: 300,
      costPerReg: '4.05'
    },
    {
      name: 'Peer Referrals (Build Squad)',
      color: '#10b981', // Green
      registrations: 53 + (extraRegistrations > 0 ? Math.ceil(extraRegistrations * 0.65) : 0),
      share: 25,
      conversionRate: '-',
      amountSpent: 120,
      costPerReg: '2.26'
    },
    {
      name: 'Social Media (Instagram, LinkedIn)',
      color: '#8b5cf6', // Purple
      registrations: 38,
      share: 18,
      conversionRate: '-',
      amountSpent: 250,
      costPerReg: '6.58'
    },
    {
      name: 'WhatsApp & Telegram',
      color: '#f59e0b', // Amber/Orange
      registrations: 26,
      share: 12,
      conversionRate: '-',
      amountSpent: 150,
      costPerReg: '5.77'
    },
    {
      name: 'Other',
      color: '#ec4899', // Pink
      registrations: 21,
      share: 10,
      conversionRate: '-',
      amountSpent: 40,
      costPerReg: '1.90'
    }
  ];

  // Daily timeline matching reference
  const dailyData = [
    { date: 'Oct 25', daily: 12, cum: 12 },
    { date: 'Oct 26', daily: 28, cum: 40 },
    { date: 'Oct 27', daily: 35, cum: 75 },
    { date: 'Oct 28', daily: 40, cum: 115 },
    { date: 'Oct 29', daily: 48, cum: 163 },
    { date: 'Oct 30', daily: 30, cum: 193 },
    { date: 'Oct 31', daily: 59 + extraRegistrations, cum: 212 + extraRegistrations }
  ];

  // Donut SVG calculations
  const totalShare = 100;
  let accumulatedAngle = 0;
  const donutRadius = 68;
  const donutCircumference = 2 * Math.PI * donutRadius; // ~427.25

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">Growth Control Tower</h1>
          <p className="text-sm text-gray-500 mt-1">
            Track registrations, analyze channel performance and manage your campaign.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button className="inline-flex items-center gap-2 px-3.5 py-2 bg-white border border-gray-200 rounded-lg text-xs sm:text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition-colors">
            <Calendar className="w-4 h-4 text-gray-500" />
            <span>Oct 25, 2026 - Oct 31, 2026</span>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
          </button>

          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-lg text-xs font-medium text-amber-800">
            <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
            <span>Demo Data (Simulated)</span>
          </div>
        </div>
      </div>

      {/* Row 1: 4 Key Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Completed Registrations */}
        <div className="bg-white rounded-xl p-5 border border-gray-200/80 shadow-sm flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500">Completed Registrations</p>
              <div className="flex items-baseline gap-1 mt-2">
                <span className="text-2xl font-bold text-gray-900">{completedRegistrations}</span>
                <span className="text-base font-semibold text-gray-400">/ {targetRegistrations}</span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-3">
            <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-blue-600 h-full rounded-full transition-all duration-500" 
                style={{ width: `${Math.min(100, registrationPct)}%` }}
              />
            </div>
            <span className="text-xs font-semibold text-gray-500">{registrationPct}%</span>
          </div>
        </div>

        {/* Card 2: Remaining Registrations */}
        <div className="bg-white rounded-xl p-5 border border-gray-200/80 shadow-sm flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500">Remaining Registrations</p>
              <div className="mt-2">
                <span className="text-2xl font-bold text-gray-900">{remainingRegistrations}</span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
              <Target className="w-5 h-5" />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-4">to reach the target of {targetRegistrations}</p>
        </div>

        {/* Card 3: Campaign Budget */}
        <div className="bg-white rounded-xl p-5 border border-gray-200/80 shadow-sm flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500">Campaign Budget</p>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-2xl font-bold text-gray-900">₹ {totalBudget.toLocaleString()}</span>
                <span className="text-xs font-medium text-gray-500">₹ {usedBudget} used</span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
              <Wallet className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-purple-600 h-full rounded-full transition-all duration-500" 
                  style={{ width: `${budgetUsedPct}%` }}
                />
              </div>
              <span className="text-xs font-semibold text-gray-500">{budgetUsedPct}%</span>
            </div>
            <p className="text-xs text-gray-500 mt-1.5">₹ {remainingBudget.toLocaleString()} remaining</p>
          </div>
        </div>

        {/* Card 4: Cost per Registration */}
        <div className="bg-white rounded-xl p-5 border border-gray-200/80 shadow-sm flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500">Cost per Registration</p>
              <div className="mt-2">
                <span className="text-2xl font-bold text-gray-900">₹ {costPerReg}</span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center text-rose-500">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-4">Based on current spend and registrations</p>
        </div>
      </div>

      {/* Row 2: Charts Row (2 columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Chart: Registration Trend */}
        <div className="lg:col-span-7 bg-white rounded-xl p-5 border border-gray-200/80 shadow-sm flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4 gap-2 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-blue-600" />
              <h2 className="text-sm font-semibold text-gray-900">Registration Trend (Last 7 Days)</h2>
            </div>
            <div className="flex items-center gap-4 text-xs text-gray-600">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block" />
                <span>Daily Registrations</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 bg-sky-400 inline-block" />
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400 -ml-2 inline-block" />
                <span className="ml-1">Cumulative Registrations</span>
              </div>
            </div>
          </div>

          {/* SVG Trend Chart */}
          <div className="pt-6 pb-2">
            <div className="relative h-64 w-full">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 540 220" preserveAspectRatio="none">
                {/* Y-axis grid lines & labels */}
                {[
                  { y: 20, val: 100 },
                  { y: 55, val: 80 },
                  { y: 90, val: 60 },
                  { y: 125, val: 40 },
                  { y: 160, val: 20 },
                  { y: 195, val: 0 },
                ].map((grid, i) => (
                  <g key={i}>
                    <line 
                      x1="45" 
                      y1={grid.y} 
                      x2="520" 
                      y2={grid.y} 
                      stroke="#f1f5f9" 
                      strokeWidth="1" 
                    />
                    <text 
                      x="38" 
                      y={grid.y + 4} 
                      textAnchor="end" 
                      className="text-[10px] fill-gray-400 font-mono"
                    >
                      {grid.val}
                    </text>
                  </g>
                ))}

                {/* Y-axis Title */}
                <text 
                  x="-110" 
                  y="14" 
                  transform="rotate(-90)" 
                  textAnchor="middle" 
                  className="text-[10px] fill-gray-400 tracking-wider"
                >
                  Registrations
                </text>

                {/* Bars & Labels */}
                {dailyData.map((d, i) => {
                  const x = 70 + i * 65;
                  // Daily bar height (relative to 100 max for bar)
                  const barH = (d.daily / 100) * 175;
                  const barY = 195 - barH;

                  return (
                    <g key={i} className="group cursor-pointer">
                      {/* Bar */}
                      <rect
                        x={x - 11}
                        y={barY}
                        width="22"
                        height={barH}
                        rx="3"
                        className="fill-blue-500 hover:fill-blue-600 transition-colors"
                      />
                      {/* Bar Value above bar */}
                      <text
                        x={x}
                        y={barY - 5}
                        textAnchor="middle"
                        className="text-[10px] font-semibold fill-gray-600"
                      >
                        {d.daily}
                      </text>
                      {/* X-axis date label */}
                      <text
                        x={x}
                        y="212"
                        textAnchor="middle"
                        className="text-[10px] fill-gray-500 font-medium"
                      >
                        {d.date}
                      </text>
                    </g>
                  );
                })}

                {/* Cumulative Line (normalized to 240 max height mapped to y: 195 to 25) */}
                {(() => {
                  const maxCum = 240;
                  const points = dailyData.map((d, i) => {
                    const x = 70 + i * 65;
                    const y = 195 - (d.cum / maxCum) * 170;
                    return { x, y, cum: d.cum };
                  });

                  const pathD = points.reduce((acc, p, i) => (
                    i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`
                  ), '');

                  return (
                    <g>
                      {/* Line */}
                      <path
                        d={pathD}
                        fill="none"
                        stroke="#38bdf8"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      {/* Cumulative Dots & Text */}
                      {points.map((p, i) => (
                        <g key={i}>
                          <circle
                            cx={p.x}
                            cy={p.y}
                            r="3.5"
                            className="fill-white stroke-sky-400 stroke-2"
                          />
                          <text
                            x={p.x}
                            y={p.y - 7}
                            textAnchor="middle"
                            className="text-[10px] font-bold fill-sky-700"
                          >
                            {p.cum}
                          </text>
                        </g>
                      ))}
                    </g>
                  );
                })()}
              </svg>
            </div>
          </div>
        </div>

        {/* Right Chart: Channel Doughnut */}
        <div className="lg:col-span-5 bg-white rounded-xl p-5 border border-gray-200/80 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <PieChart className="w-4 h-4 text-blue-600" />
              <h2 className="text-sm font-semibold text-gray-900">Registrations by Channel</h2>
            </div>
            <div className="relative">
              <select 
                value={channelFilter}
                onChange={(e) => setChannelFilter(e.target.value as any)}
                className="text-xs bg-gray-50 border border-gray-200 rounded-md px-2.5 py-1 text-gray-700 font-medium outline-none cursor-pointer hover:bg-gray-100"
              >
                <option value="Registrations">Registrations</option>
                <option value="Spend">Spend</option>
                <option value="CAC">Cost per Reg</option>
              </select>
            </div>
          </div>

          <div className="py-4 flex flex-col sm:flex-row items-center justify-center gap-6">
            {/* Doughnut SVG */}
            <div className="relative w-44 h-44 flex-shrink-0 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 160 160">
                {channels.map((ch, idx) => {
                  const strokeDasharray = `${(ch.share / 100) * donutCircumference} ${donutCircumference}`;
                  const strokeDashoffset = -((accumulatedAngle / 100) * donutCircumference);
                  accumulatedAngle += ch.share;

                  return (
                    <circle
                      key={idx}
                      cx="80"
                      cy="80"
                      r={donutRadius}
                      fill="transparent"
                      stroke={ch.color}
                      strokeWidth="24"
                      strokeDasharray={strokeDasharray}
                      strokeDashoffset={strokeDashoffset}
                      className="transition-all duration-300 hover:opacity-90 cursor-pointer"
                    />
                  );
                })}
              </svg>

              {/* Center count */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-bold text-gray-900">{completedRegistrations}</span>
                <span className="text-[11px] font-medium text-gray-500">Registrations</span>
              </div>
            </div>

            {/* Legend with percentages and numbers */}
            <div className="flex-1 space-y-2 w-full">
              {channels.map((ch, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs py-0.5">
                  <div className="flex items-center gap-2 min-w-0">
                    <span 
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: ch.color }}
                    />
                    <span className="text-gray-700 font-medium truncate">{ch.name}</span>
                  </div>
                  <div className="flex items-center gap-2 pl-2">
                    <span className="text-gray-400 text-[11px]">({ch.share}%)</span>
                    <span className="font-semibold text-gray-900">{ch.registrations}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Row 3: Channel Performance Table & 7-Day Campaign Plan */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Channel Performance Table */}
        <div className="lg:col-span-7 bg-white rounded-xl p-5 border border-gray-200/80 shadow-sm flex flex-col justify-between">
          <div className="flex items-center gap-2 pb-4 border-b border-gray-100">
            <BarChart3 className="w-4 h-4 text-blue-600" />
            <h2 className="text-sm font-semibold text-gray-900">Channel Performance</h2>
          </div>

          <div className="overflow-x-auto mt-2">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-gray-100 text-gray-500 font-medium">
                  <th className="py-2.5 font-medium">Channel</th>
                  <th className="py-2.5 font-medium text-right">Registrations ↓</th>
                  <th className="py-2.5 font-medium text-center">Conversion Rate ⇅</th>
                  <th className="py-2.5 font-medium text-right">Amount Spent (₹)</th>
                  <th className="py-2.5 font-medium text-right">Cost per Registration (₹)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-gray-800">
                {channels.map((ch, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/70 transition-colors">
                    <td className="py-3 flex items-center gap-2 font-medium">
                      <span 
                        className="w-2 h-2 rounded-full flex-shrink-0" 
                        style={{ backgroundColor: ch.color }} 
                      />
                      <span>{ch.name}</span>
                    </td>
                    <td className="py-3 text-right font-semibold text-gray-900">{ch.registrations}</td>
                    <td className="py-3 text-center text-gray-400 font-medium">{ch.conversionRate}</td>
                    <td className="py-3 text-right text-gray-600">{ch.amountSpent}</td>
                    <td className="py-3 text-right font-semibold text-gray-900">{ch.costPerReg}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: 7-Day Campaign Plan */}
        <div className="lg:col-span-5 bg-white rounded-xl p-5 border border-gray-200/80 shadow-sm flex flex-col justify-between">
          <div className="flex items-center gap-2 pb-4 border-b border-gray-100">
            <Calendar className="w-4 h-4 text-blue-600" />
            <h2 className="text-sm font-semibold text-gray-900">7-Day Campaign Plan</h2>
          </div>

          {/* 4 Colored Stage Columns matching reference */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-3">
            {/* Stage 1: Days 1 - 2 */}
            <div className="bg-sky-50/70 rounded-lg p-3 border border-sky-100 flex flex-col">
              <span className="text-[11px] font-bold text-sky-800 uppercase tracking-wider mb-2">
                Days 1 – 2
              </span>
              <ul className="space-y-1.5 text-[11px] text-gray-700 leading-tight">
                <li className="flex items-start gap-1">
                  <span className="text-sky-500 font-bold">•</span>
                  <span>Launch campaign</span>
                </li>
                <li className="flex items-start gap-1">
                  <span className="text-sky-500 font-bold">•</span>
                  <span>Post in college communities</span>
                </li>
                <li className="flex items-start gap-1">
                  <span className="text-sky-500 font-bold">•</span>
                  <span>Share referral link</span>
                </li>
                <li className="flex items-start gap-1">
                  <span className="text-sky-500 font-bold">•</span>
                  <span>Initial outreach</span>
                </li>
              </ul>
            </div>

            {/* Stage 2: Days 3 - 4 */}
            <div className="bg-emerald-50/70 rounded-lg p-3 border border-emerald-100 flex flex-col">
              <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider mb-2">
                Days 3 – 4
              </span>
              <ul className="space-y-1.5 text-[11px] text-gray-700 leading-tight">
                <li className="flex items-start gap-1">
                  <span className="text-emerald-500 font-bold">•</span>
                  <span>Increase social engagement</span>
                </li>
                <li className="flex items-start gap-1">
                  <span className="text-emerald-500 font-bold">•</span>
                  <span>Collaborate with student groups</span>
                </li>
                <li className="flex items-start gap-1">
                  <span className="text-emerald-500 font-bold">•</span>
                  <span>Answer student queries</span>
                </li>
                <li className="flex items-start gap-1">
                  <span className="text-emerald-500 font-bold">•</span>
                  <span>Run interactive posts</span>
                </li>
              </ul>
            </div>

            {/* Stage 3: Days 5 - 6 */}
            <div className="bg-purple-50/70 rounded-lg p-3 border border-purple-100 flex flex-col">
              <span className="text-[11px] font-bold text-purple-800 uppercase tracking-wider mb-2">
                Days 5 – 6
              </span>
              <ul className="space-y-1.5 text-[11px] text-gray-700 leading-tight">
                <li className="flex items-start gap-1">
                  <span className="text-purple-500 font-bold">•</span>
                  <span>Focus on peer referrals</span>
                </li>
                <li className="flex items-start gap-1">
                  <span className="text-purple-500 font-bold">•</span>
                  <span>Share success stories</span>
                </li>
                <li className="flex items-start gap-1">
                  <span className="text-purple-500 font-bold">•</span>
                  <span>Remind about deadline</span>
                </li>
              </ul>
            </div>

            {/* Stage 4: Day 7 */}
            <div className="bg-rose-50/70 rounded-lg p-3 border border-rose-100 flex flex-col">
              <span className="text-[11px] font-bold text-rose-800 uppercase tracking-wider mb-2">
                Day 7
              </span>
              <ul className="space-y-1.5 text-[11px] text-gray-700 leading-tight">
                <li className="flex items-start gap-1">
                  <span className="text-rose-500 font-bold">•</span>
                  <span>Final push</span>
                </li>
                <li className="flex items-start gap-1">
                  <span className="text-rose-500 font-bold">•</span>
                  <span>Urgency messaging</span>
                </li>
                <li className="flex items-start gap-1">
                  <span className="text-rose-500 font-bold">•</span>
                  <span>Boost top-performing channels</span>
                </li>
                <li className="flex items-start gap-1">
                  <span className="text-rose-500 font-bold">•</span>
                  <span>Close with key updates</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Row 4: Recommended Next Actions */}
      <div className="bg-white rounded-xl p-5 border border-gray-200/80 shadow-sm">
        <div className="flex items-center gap-2 pb-4 border-b border-gray-100">
          <div className="w-6 h-6 rounded-full bg-amber-50 flex items-center justify-center text-amber-500">
            <Lightbulb className="w-3.5 h-3.5" />
          </div>
          <h2 className="text-sm font-semibold text-gray-900">Recommended Next Actions</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {/* Action 1 */}
          <div 
            onClick={() => setActiveActionModal('1')}
            className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/20 transition-all cursor-pointer group"
          >
            <div className="flex items-start gap-3.5">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                1
              </span>
              <div>
                <h3 className="text-xs font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  Increase Peer Referrals
                </h3>
                <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">
                  Peer referrals are performing well (₹ 2.26 per registration). Encourage more students to share links.
                </p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all flex-shrink-0 ml-2" />
          </div>

          {/* Action 2 */}
          <div 
            onClick={() => setActiveActionModal('2')}
            className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-emerald-200 hover:bg-emerald-50/20 transition-all cursor-pointer group"
          >
            <div className="flex items-start gap-3.5">
              <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                2
              </span>
              <div>
                <h3 className="text-xs font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors">
                  Boost Social Media Engagement
                </h3>
                <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">
                  Social media has good potential. Increase posting frequency to attract more students.
                </p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all flex-shrink-0 ml-2" />
          </div>

          {/* Action 3 */}
          <div 
            onClick={() => setActiveActionModal('3')}
            className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-purple-200 hover:bg-purple-50/20 transition-all cursor-pointer group"
          >
            <div className="flex items-start gap-3.5">
              <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-700 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                3
              </span>
              <div>
                <h3 className="text-xs font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                  Optimize Budget Allocation
                </h3>
                <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">
                  Allocate more budget to college communities and peer referrals, which are performing better.
                </p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-purple-600 group-hover:translate-x-0.5 transition-all flex-shrink-0 ml-2" />
          </div>
        </div>
      </div>

      {/* Interactive Modal for Action Details */}
      {activeActionModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-gray-100 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center">
                  {activeActionModal}
                </span>
                <h4 className="text-base font-bold text-gray-900">
                  {activeActionModal === '1' && 'Increase Peer Referrals Strategy'}
                  {activeActionModal === '2' && 'Social Media Engagement Optimization'}
                  {activeActionModal === '3' && 'Budget Reallocation Plan'}
                </h4>
              </div>
              <button 
                onClick={() => setActiveActionModal(null)}
                className="text-gray-400 hover:text-gray-600 text-lg leading-none p-1"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              {activeActionModal === '1' && 
                'Peer referrals deliver our lowest CAC at ₹ 2.26 vs the ₹ 4.00 benchmark. Launch a "Squad Leader" leaderboard with digital badges to incentivize students to invite at least 3 batchmates.'}
              {activeActionModal === '2' && 
                'Social CAC is currently ₹ 6.58. Transition ad spend from broad Instagram feed ads to story teasers with student testimonials and project showcase clips to lower CAC below ₹ 5.00.'}
              {activeActionModal === '3' && 
                'Shift ₹ 300 from high-CAC paid social media directly into College Placement and Coding Club sponsorships to gain 60+ guaranteed registrations.'}
            </p>
            <div className="flex justify-end pt-2">
              <button 
                onClick={() => setActiveActionModal(null)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold"
              >
                Apply Recommendation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
