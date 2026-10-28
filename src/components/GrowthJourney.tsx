import React, { useState } from 'react';
import { 
  Sparkles, 
  Users, 
  BarChart3, 
  ArrowRight, 
  CheckCircle2, 
  ChevronRight,
  TrendingUp,
  Award,
  Zap,
  Target,
  ShieldCheck,
  Share2
} from 'lucide-react';

interface GrowthJourneyProps {
  onNavigate: (tab: 'hub' | 'passport' | 'squad' | 'tower') => void;
}

export const GrowthJourney: React.FC<GrowthJourneyProps> = ({ onNavigate }) => {
  const [activeStage, setActiveStage] = useState<1 | 2 | 3>(1);

  const stages = [
    {
      step: 1,
      id: 'passport',
      tab: 'passport' as const,
      title: '1. Discover an AI Project',
      subtitle: 'Personalized Hook & Instant Value',
      color: 'blue',
      metricLabel: 'Student Conversion Rate',
      metricValue: '44.2%',
      metricSub: '+16% over generic landing pages',
      badge: 'Acquisition Engine',
      summary: 'Final-year students care about upcoming placement interviews. Instead of a generic workshop form, students input their branch and experience level to generate a custom AI Project Passport with STAR resume bullets.',
      keyMechanics: [
        'Immediate value before asking for commitment',
        'Direct alignment with placement drive requirements',
        'Zero-friction personalization powered by Gemini 3.8 Flash',
        'Personalized GitHub capstone project blueprint'
      ],
      actionText: 'Explore Project Passport Studio',
    },
    {
      step: 2,
      id: 'squad',
      tab: 'squad' as const,
      title: '2. Invite Your Squad',
      subtitle: 'Viral Peer Multiplier (K-Factor 1.34)',
      color: 'violet',
      metricLabel: 'Viral K-Factor',
      metricValue: '1.34',
      metricSub: '104 squads formed across 28 colleges',
      badge: 'Viral Referral Loop',
      summary: 'Engineering projects require teams of 3–4 students. ProjectSpark leverages this academic reality by incentivizing students to invite their capstone teammates to unlock private mentor breakout rooms and shared starter code.',
      keyMechanics: [
        'Natural group dynamics of final-year capstones',
        'VIP breakout room perk unlocks at 3 squad members',
        'Pre-formatted WhatsApp messages for branch groups',
        '₹100 Swiggy gift vouchers for college Class Reps'
      ],
      actionText: 'Enter Build Squad Challenge',
    },
    {
      step: 3,
      id: 'tower',
      tab: 'tower' as const,
      title: '3. Track Campaign Growth',
      subtitle: 'Data-Driven Analytics & ₹2.97 CAC',
      color: 'emerald',
      metricLabel: 'Blended Acquisition Cost',
      metricValue: '₹2.97',
      metricSub: '84% below edtech benchmark (₹18-25)',
      badge: 'Growth Intelligence',
      summary: 'The Growth Control Tower monitors real-time channel velocity, budget burn, and registration conversion. Growth interns test hypotheses, monitor organic vs. paid seed traffic, and dynamically reallocate budget to the highest-yield channels.',
      keyMechanics: [
        'Real-time pacing against the 500-student sprint goal',
        '₹1,140 spent of ₹2,000 maximum budget (₹860 reserve)',
        'Actionable budget reallocation: +65 signups at ₹0 net cost',
        'Full attribution across 4 distinct campus channels'
      ],
      actionText: 'Launch Growth Control Tower',
    },
  ];

  const current = stages[activeStage - 1];

  return (
    <section className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>The Signature Experience</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[#0f172a]">
            The ProjectSpark Growth Engine
          </h2>
          <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
            How a strategic student journey turns a ₹2,000 budget into 500 verified final-year registrations in 7 days. Click each stage to inspect the growth mechanics.
          </p>
        </div>

        <div className="text-xs font-semibold text-slate-500 hidden sm:block">
          Interactive Strategy Model
        </div>
      </div>

      {/* Connected Interactive Stepper Header */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/90 shadow-2xs">
        {stages.map((stage) => {
          const isActive = activeStage === stage.step;
          return (
            <button
              key={stage.step}
              onClick={() => setActiveStage(stage.step as 1 | 2 | 3)}
              className={`p-3.5 rounded-xl text-left transition-all cursor-pointer relative overflow-hidden flex items-center justify-between gap-3 ${
                isActive
                  ? 'bg-white shadow-md border-2 border-indigo-200'
                  : 'hover:bg-white/60 text-slate-600'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs shrink-0 transition-colors ${
                  isActive
                    ? 'bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-xs'
                    : 'bg-slate-200 text-slate-600'
                }`}>
                  0{stage.step}
                </div>
                <div className="truncate">
                  <div className={`text-xs font-bold truncate ${isActive ? 'text-slate-900' : 'text-slate-700'}`}>
                    {stage.title.split('. ')[1]}
                  </div>
                  <div className="text-[11px] text-slate-500 truncate font-medium">
                    {stage.badge}
                  </div>
                </div>
              </div>

              {isActive && (
                <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      {/* Interactive Detail Box for Active Stage */}
      <div className="bg-gradient-to-br from-white via-indigo-50/20 to-blue-50/30 rounded-3xl border-2 border-indigo-100 p-6 sm:p-9 shadow-[0_8px_30px_rgba(30,58,138,0.06)] space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-gradient-to-br from-indigo-400/10 to-blue-400/10 blur-2xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Stage narrative and mechanics (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-indigo-100 text-indigo-800 border border-indigo-200">
                Stage 0{current.step} &bull; {current.badge}
              </span>
              <span className="text-xs font-bold text-slate-500">
                {current.subtitle}
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl sm:text-3xl font-black text-[#0f172a] leading-tight">
                {current.title}
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                {current.summary}
              </p>
            </div>

            {/* Core Strategic Mechanics Checklist */}
            <div className="space-y-2.5 pt-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                Growth Mechanics & Strategic Levers:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                {current.keyMechanics.map((item, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-white/90 border border-indigo-100 text-slate-800 flex items-start gap-2 shadow-2xs font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="leading-snug">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Launch Tab Button */}
            <div className="pt-2">
              <button
                onClick={() => onNavigate(current.tab)}
                className="px-6 py-3 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all flex items-center gap-2 shadow-md shadow-blue-500/25 cursor-pointer active:scale-95"
              >
                <span>{current.actionText}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right: Key Metric Card & Visual Artifact Preview (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Prominent Impact Metric Card */}
            <div className="p-6 rounded-2xl bg-white border-2 border-indigo-200/80 shadow-md shadow-indigo-500/5 space-y-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                Primary Strategy Metric
              </span>

              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 tabular-nums">
                  {current.metricValue}
                </span>
                <span className="text-xs font-bold text-slate-700">
                  {current.metricLabel}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-indigo-50/70 border border-indigo-100 text-xs text-indigo-950 font-medium">
                {current.metricSub}
              </div>
            </div>

            {/* Stage Quick Navigator Indicator */}
            <div className="p-4 rounded-2xl bg-white/70 border border-slate-200/90 text-xs flex items-center justify-between text-slate-600">
              <span className="font-semibold">Explore next in sequence:</span>
              <div className="flex items-center gap-1.5 font-bold">
                <button
                  onClick={() => setActiveStage(1)}
                  className={`px-2 py-0.5 rounded ${activeStage === 1 ? 'bg-blue-600 text-white' : 'hover:bg-slate-100'}`}
                >
                  Stage 1
                </button>
                <span>&rarr;</span>
                <button
                  onClick={() => setActiveStage(2)}
                  className={`px-2 py-0.5 rounded ${activeStage === 2 ? 'bg-violet-600 text-white' : 'hover:bg-slate-100'}`}
                >
                  Stage 2
                </button>
                <span>&rarr;</span>
                <button
                  onClick={() => setActiveStage(3)}
                  className={`px-2 py-0.5 rounded ${activeStage === 3 ? 'bg-emerald-600 text-white' : 'hover:bg-slate-100'}`}
                >
                  Stage 3
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
