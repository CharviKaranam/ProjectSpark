import React from 'react';
import { 
  ArrowRight, 
  Lightbulb, 
  Users, 
  BarChart3, 
  ChevronRight,
  Sparkles,
  MessageSquare,
  TrendingUp
} from 'lucide-react';

interface WorkshopHubProps {
  onNavigate: (tab: 'hub' | 'passport' | 'squad' | 'tower') => void;
}

export const WorkshopHub: React.FC<WorkshopHubProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-10 py-6 sm:py-8">
      {/* =========================================================================
          1. COMPACT HERO WITH RIGHT-SIDE ILLUSTRATION
          ========================================================================= */}
      <section className="bg-gradient-to-r from-blue-50/70 via-indigo-50/40 to-white border border-slate-200/80 rounded-3xl p-6 sm:p-10 shadow-2xs relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Text & Actions (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Pill: Build • Invite • Track • Grow */}
            <div className="inline-block px-3.5 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-semibold border border-slate-200/80 shadow-2xs">
              Build &bull; Invite &bull; Track &bull; Grow
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Your First{' '}
              <span className="text-purple-600">AI Project</span>
              <br />
              Starts Here.
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl">
              Discover personalized project ideas, invite your friends, and track real growth — all in one place.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => onNavigate('passport')}
                className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-sm shadow-blue-500/20 flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <span>Explore Project Passport</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('tower')}
                className="text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <span>View Growth Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right-side Illustration: Student with laptop and 3 loop-connected cards (5 cols) */}
          <div className="lg:col-span-5 flex items-center justify-center relative">
            <div className="relative w-full max-w-[380px] aspect-[4/3] flex items-center justify-center">
              {/* Soft background glow & circle */}
              <div className="absolute inset-2 bg-gradient-to-tr from-blue-100/60 to-purple-100/60 rounded-full blur-xl pointer-events-none" />
              <div className="absolute w-64 h-64 bg-blue-100/40 rounded-full border border-blue-200/40 pointer-events-none" />

              {/* Connected looping arrows SVG background */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 380 280" fill="none">
                {/* Arrow from Top-Left to Top-Right */}
                <path d="M 130 50 C 180 30, 220 30, 260 55" stroke="#93c5fd" strokeWidth="2" strokeDasharray="4 4" />
                <polygon points="265,58 255,54 260,47" fill="#60a5fa" />
                
                {/* Arrow from Top-Right to Bottom-Right */}
                <path d="M 330 110 C 355 150, 350 180, 330 210" stroke="#c084fc" strokeWidth="2" strokeDasharray="4 4" />
                <polygon points="326,215 334,208 327,203" fill="#a855f7" />

                {/* Arrow from Bottom-Right to Top-Left */}
                <path d="M 280 240 C 200 270, 100 240, 80 140" stroke="#86efac" strokeWidth="2" strokeDasharray="4 4" />
                <polygon points="78,135 84,144 76,145" fill="#4ade80" />
              </svg>

              {/* Student vector character */}
              <div className="relative z-10 flex flex-col items-center">
                {/* SVG Girl character working at laptop matching reference */}
                <svg width="170" height="170" viewBox="0 0 200 200" fill="none">
                  {/* Hair back */}
                  <path d="M 65 80 C 50 110, 45 150, 70 170 C 85 180, 115 180, 130 170 C 155 150, 150 110, 135 80 Z" fill="#1e293b" />
                  {/* Body / Top */}
                  <path d="M 70 150 C 70 130, 85 120, 100 120 C 115 120, 130 130, 130 150 L 140 180 L 60 180 Z" fill="#60a5fa" />
                  {/* Neck */}
                  <rect x="94" y="98" width="12" height="15" rx="3" fill="#fcd34d" />
                  {/* Head */}
                  <ellipse cx="100" cy="80" rx="22" ry="24" fill="#fef08a" />
                  {/* Hair Front */}
                  <path d="M 78 72 C 78 55, 95 48, 112 50 C 124 52, 126 62, 124 75 C 120 68, 110 65, 100 66 C 90 67, 82 72, 78 78 Z" fill="#0f172a" />
                  {/* Face details */}
                  <ellipse cx="93" cy="80" rx="2" ry="2.5" fill="#1e293b" />
                  <ellipse cx="107" cy="80" rx="2" ry="2.5" fill="#1e293b" />
                  <path d="M 98 88 Q 100 91 102 88" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" />
                  {/* Desk surface */}
                  <rect x="30" y="175" width="140" height="8" rx="4" fill="#cbd5e1" />
                  {/* Laptop base */}
                  <rect x="70" y="168" width="60" height="6" rx="2" fill="#3b82f6" />
                  {/* Laptop screen */}
                  <polygon points="76,168 84,136 126,136 124,168" fill="#1e40af" />
                  <polygon points="78,166 85,138 124,138 122,166" fill="#60a5fa" />
                </svg>
              </div>

              {/* Floating Card 1: AI Project Idea (Top-Left) */}
              <div className="absolute top-2 left-0 sm:left-2 bg-white rounded-xl p-2 px-3 shadow-md border border-slate-100 flex items-center gap-2 z-20 animate-in fade-in duration-300">
                <div className="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                  <MessageSquare className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-bold text-slate-800 whitespace-nowrap">AI Project Idea</span>
              </div>

              {/* Floating Card 2: Invite Friends (Top-Right) */}
              <div className="absolute top-4 right-0 sm:right-2 bg-white rounded-xl p-2 px-3 shadow-md border border-slate-100 flex items-center gap-2 z-20 animate-in fade-in duration-300">
                <div className="w-6 h-6 rounded-lg bg-purple-600 text-white flex items-center justify-center">
                  <Users className="w-3.5 h-3.5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-800 whitespace-nowrap">Invite Friends</span>
                  <div className="flex -space-x-1 mt-0.5">
                    <span className="w-3.5 h-3.5 rounded-full bg-blue-400 border border-white" />
                    <span className="w-3.5 h-3.5 rounded-full bg-purple-400 border border-white" />
                    <span className="w-3.5 h-3.5 rounded-full bg-emerald-400 border border-white" />
                  </div>
                </div>
              </div>

              {/* Floating Card 3: Track Growth (Bottom-Right) */}
              <div className="absolute bottom-2 right-4 sm:right-6 bg-white rounded-xl p-2 px-3 shadow-md border border-slate-100 flex items-center gap-2 z-20 animate-in fade-in duration-300">
                <div className="w-6 h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
                  <BarChart3 className="w-3.5 h-3.5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-800 whitespace-nowrap">Track Growth</span>
                  {/* Mini green bars */}
                  <div className="flex items-end gap-0.5 h-2.5 mt-0.5">
                    <span className="w-1 h-1.5 bg-emerald-400 rounded-xs" />
                    <span className="w-1 h-2 bg-emerald-500 rounded-xs" />
                    <span className="w-1 h-2.5 bg-emerald-600 rounded-xs" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. THREE FEATURE CARDS (IN ONE HORIZONTAL ROW)
          Exact reference styling:
          - Blue for AI Project Passport
          - Purple for Build Squad Challenge
          - Green for Growth Control Tower
          Each card: 1 icon, short title, 1-line description, and circular arrow button
          ========================================================================= */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: AI Project Passport (Blue) */}
        <div 
          onClick={() => onNavigate('passport')}
          className="bg-blue-50/70 border border-blue-100 rounded-2xl p-6 flex flex-col justify-between space-y-4 shadow-2xs hover:shadow-xs transition-all cursor-pointer group"
        >
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
              <Lightbulb className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              AI Project Passport
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Get personalized AI project ideas based on your interests.
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={(e) => { e.stopPropagation(); onNavigate('passport'); }}
              className="w-9 h-9 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-xs cursor-pointer group-hover:scale-105 transition-transform"
              aria-label="Open AI Project Passport"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Card 2: Build Squad Challenge (Purple) */}
        <div 
          onClick={() => onNavigate('squad')}
          className="bg-purple-50/70 border border-purple-100 rounded-2xl p-6 flex flex-col justify-between space-y-4 shadow-2xs hover:shadow-xs transition-all cursor-pointer group"
        >
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Build Squad Challenge
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Invite your friends and grow the student community.
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={(e) => { e.stopPropagation(); onNavigate('squad'); }}
              className="w-9 h-9 rounded-full bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center shadow-xs cursor-pointer group-hover:scale-105 transition-transform"
              aria-label="Open Build Squad Challenge"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Card 3: Growth Control Tower (Green) */}
        <div 
          onClick={() => onNavigate('tower')}
          className="bg-emerald-50/70 border border-emerald-100 rounded-2xl p-6 flex flex-col justify-between space-y-4 shadow-2xs hover:shadow-xs transition-all cursor-pointer group"
        >
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <BarChart3 className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Growth Control Tower
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Track registrations, channels and campaign progress.
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={(e) => { e.stopPropagation(); onNavigate('tower'); }}
              className="w-9 h-9 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center shadow-xs cursor-pointer group-hover:scale-105 transition-transform"
              aria-label="Open Growth Control Tower"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. YOUR GROWTH JOURNEY (BOTTOM SECTION OF HOME)
          Title: Your Growth Journey
          Card with 3 connected steps:
          1. Discover (Get your AI project idea)
          → 2. Invite (Bring your friends)
          → 3. Measure (Track growth and impact)
          ========================================================================= */}
      <section className="space-y-3">
        <h2 className="text-lg font-bold text-slate-900">
          Your Growth Journey
        </h2>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-2xs">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4">
            {/* Step 1: Discover */}
            <div 
              onClick={() => onNavigate('passport')}
              className="flex items-center gap-3 w-full md:w-auto cursor-pointer group"
            >
              <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-xs">
                1
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">
                  Discover
                </h4>
                <p className="text-xs text-slate-500">
                  Get your AI project idea
                </p>
              </div>
            </div>

            {/* Arrow 1 */}
            <div className="hidden md:flex items-center text-slate-300">
              <span className="w-12 h-0.5 bg-slate-200" />
              <ArrowRight className="w-4 h-4 text-slate-400 -ml-1" />
            </div>

            {/* Step 2: Invite */}
            <div 
              onClick={() => onNavigate('squad')}
              className="flex items-center gap-3 w-full md:w-auto cursor-pointer group"
            >
              <div className="w-9 h-9 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-xs">
                2
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm group-hover:text-purple-600 transition-colors">
                  Invite
                </h4>
                <p className="text-xs text-slate-500">
                  Bring your friends
                </p>
              </div>
            </div>

            {/* Arrow 2 */}
            <div className="hidden md:flex items-center text-slate-300">
              <span className="w-12 h-0.5 bg-slate-200" />
              <ArrowRight className="w-4 h-4 text-slate-400 -ml-1" />
            </div>

            {/* Step 3: Measure */}
            <div 
              onClick={() => onNavigate('tower')}
              className="flex items-center gap-3 w-full md:w-auto cursor-pointer group"
            >
              <div className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-xs">
                3
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm group-hover:text-emerald-600 transition-colors">
                  Measure
                </h4>
                <p className="text-xs text-slate-500">
                  Track growth and impact
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
