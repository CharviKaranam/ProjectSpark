import React from 'react';
import { 
  ArrowRight, 
  Award, 
  Users, 
  BarChart3, 
  Sparkles,
  ChevronRight,
  CheckCircle2,
  Share2,
  TrendingUp
} from 'lucide-react';

interface WorkshopHubProps {
  onNavigate: (tab: 'hub' | 'passport' | 'squad' | 'tower') => void;
}

export const WorkshopHub: React.FC<WorkshopHubProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-10 py-6 sm:py-8">
      {/* =========================================================================
          1. COMPACT HERO
          "Your First AI Project Starts Here", one short supporting sentence,
          primary "Explore Project Passport" button, and secondary "View Growth Dashboard" link.
          Small, attractive product preview beside the text on desktop.
          ========================================================================= */}
      <section className="bg-gradient-to-br from-blue-50/90 via-indigo-50/50 to-purple-50/70 border border-indigo-100 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Text & Actions */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-blue-200 text-blue-800 text-xs font-semibold shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Workshop Growth Strategy & Student Platform</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Your First AI Project <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Starts Here.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-lg">
              A student-focused platform connecting personalized project ideas, peer referrals, and live growth analytics for the free online workshop <em>“Build Your First AI Project in 60 Minutes.”</em>
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={() => onNavigate('passport')}
                className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-sm shadow-blue-500/20 flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <span>Explore Project Passport</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('tower')}
                className="px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 hover:text-indigo-600 hover:bg-white/80 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <span>View Growth Dashboard</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            </div>
          </div>

          {/* Right Product Preview Card */}
          <div className="lg:col-span-5">
            <div className="bg-white border border-indigo-100 rounded-2xl p-5 shadow-xs space-y-3.5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">
                    <Award className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-slate-900">Sample Generated Passport</span>
                </div>
                <span className="text-[10px] font-mono text-slate-400">PSP-89X29A</span>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block">Computer Science &bull; LLM Agents</span>
                <h3 className="text-sm font-bold text-slate-900 leading-snug">
                  DevLens AI: Automated Pull Request & Security Code Reviewer
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  An intelligent developer agent that analyzes GitHub PRs, identifies code anti-patterns, and drafts unit test specifications with Gemini.
                </p>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-600 text-[11px]">Includes STAR Resume Bullets</span>
                <button
                  onClick={() => onNavigate('passport')}
                  className="font-semibold text-blue-600 hover:text-blue-800 text-xs cursor-pointer"
                >
                  Generate Yours &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. THREE FEATURE CARDS
          AI Project Passport, Build Squad Challenge, and Growth Control Tower.
          One evenly spaced horizontal row on desktop.
          Each card: 1 icon, short title, 1-line description, 1 action button.
          ========================================================================= */}
      <section className="space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Core Platform Capabilities
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1: AI Project Passport (Blue) */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50/80 to-white border border-blue-200/90 shadow-2xs flex flex-col justify-between space-y-4 hover:border-blue-400 transition-colors">
            <div className="space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                AI Project Passport
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Generate personalized AI project blueprints matched to your engineering branch and placement goals.
              </p>
            </div>

            <button
              onClick={() => onNavigate('passport')}
              className="w-full py-2.5 px-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
            >
              <span>Generate Project</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 2: Build Squad Challenge (Violet) */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-violet-50/80 to-white border border-violet-200/90 shadow-2xs flex flex-col justify-between space-y-4 hover:border-violet-400 transition-colors">
            <div className="space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-violet-600 text-white flex items-center justify-center shadow-xs">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Build Squad Challenge
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Invite capstone teammates to form a 3-student squad and unlock the VIP Mentor Breakout Room.
              </p>
            </div>

            <button
              onClick={() => onNavigate('squad')}
              className="w-full py-2.5 px-3.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
            >
              <span>Invite Teammates</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 3: Growth Control Tower (Teal / Mint) */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-teal-50/80 to-white border border-teal-200/90 shadow-2xs flex flex-col justify-between space-y-4 hover:border-teal-400 transition-colors">
            <div className="space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center shadow-xs">
                <BarChart3 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Growth Control Tower
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Track registrations, channel CAC (₹2.97 blended), viral K-Factor, and strategic budget allocation.
              </p>
            </div>

            <button
              onClick={() => onNavigate('tower')}
              className="w-full py-2.5 px-3.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
            >
              <span>Open Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. GROWTH JOURNEY
          A compact horizontal flow showing “Discover → Invite → Measure”.
          Three connected steps with short labels. No lengthy explanations.
          ========================================================================= */}
      <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Growth Journey &bull; Discover &rarr; Invite &rarr; Measure
          </h2>
          <span className="text-xs font-semibold text-blue-600">3-Step Acquisition Funnel</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative">
          {/* Step 1: Discover */}
          <div 
            onClick={() => onNavigate('passport')}
            className="p-4 rounded-xl bg-blue-50/60 border border-blue-200/80 hover:border-blue-300 transition-all cursor-pointer space-y-1.5 group"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-blue-700 uppercase">Step 01 &bull; Discover</span>
              <Award className="w-4 h-4 text-blue-600 group-hover:scale-110 transition-transform" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Personalized AI Blueprint</h4>
            <p className="text-xs text-slate-600 leading-snug">
              Instant utility via custom Gemini project blueprint converts 44.2% of visiting students.
            </p>
          </div>

          {/* Step 2: Invite */}
          <div 
            onClick={() => onNavigate('squad')}
            className="p-4 rounded-xl bg-violet-50/60 border border-violet-200/80 hover:border-violet-300 transition-all cursor-pointer space-y-1.5 group"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-violet-700 uppercase">Step 02 &bull; Invite</span>
              <Users className="w-4 h-4 text-violet-600 group-hover:scale-110 transition-transform" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Build Squad Referrals</h4>
            <p className="text-xs text-slate-600 leading-snug">
              3-student squad VIP breakout room perk drives a 1.34 viral K-Factor across campuses.
            </p>
          </div>

          {/* Step 3: Measure */}
          <div 
            onClick={() => onNavigate('tower')}
            className="p-4 rounded-xl bg-teal-50/60 border border-teal-200/80 hover:border-teal-300 transition-all cursor-pointer space-y-1.5 group"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-teal-700 uppercase">Step 03 &bull; Measure</span>
              <BarChart3 className="w-4 h-4 text-teal-600 group-hover:scale-110 transition-transform" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Growth Control Tower</h4>
            <p className="text-xs text-slate-600 leading-snug">
              Live funnel tracking keeps blended CAC at ₹2.97 with ₹860 budget reserve remaining.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
