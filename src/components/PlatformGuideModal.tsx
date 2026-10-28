import React from 'react';
import { 
  X, 
  BookOpen, 
  Award, 
  Users, 
  BarChart3, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Target, 
  Wallet,
  Zap
} from 'lucide-react';

interface PlatformGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: 'hub' | 'passport' | 'squad' | 'tower') => void;
}

export const PlatformGuideModal: React.FC<PlatformGuideModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 shadow-2xl space-y-6 my-8 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Close guide"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-1.5 border-b border-slate-100 pb-4 pr-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold">
            <BookOpen className="w-3.5 h-3.5 text-blue-600" />
            <span>Platform Guide & Overview</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            What is ProjectSpark?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            ProjectSpark is an interactive student growth platform built for the free online workshop <strong>“Build Your First AI Project in 60 Minutes.”</strong> It demonstrates how a data-driven strategy achieves <strong>500 final-year registrations in 7 days</strong> on a <strong>₹2,000 budget</strong>.
          </p>
        </div>

        {/* 3 Core Features Explained */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Three Core Features
          </h3>

          <div className="space-y-3 text-xs">
            {/* Feature 1: AI Project Passport */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-50/80 to-white border border-blue-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Award className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-slate-900 text-sm">1. AI Project Passport</h4>
                    <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-blue-100 text-blue-800">Acquisition</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    Students input their discipline and experience to generate an instant, personalized AI project idea with STAR resume bullets powered by Gemini 3.8 Flash. Provides immediate value before asking for sign-up commitment.
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  onNavigate('passport');
                  onClose();
                }}
                className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors shrink-0 flex items-center justify-center gap-1 cursor-pointer"
              >
                <span>Try Passport</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Feature 2: Build Squad Challenge */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-violet-50/80 to-white border border-violet-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-violet-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Users className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-slate-900 text-sm">2. Build Squad Challenge</h4>
                    <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-violet-100 text-violet-800">Viral Referrals</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    Final-year projects require teams of 3–4 students. By inviting 2 teammates with a custom referral code/link, squads unlock the 60-minute VIP Mentor Breakout Room perk (driving a viral 1.34 K-factor).
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  onNavigate('squad');
                  onClose();
                }}
                className="px-3 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-700 text-white font-semibold text-xs transition-colors shrink-0 flex items-center justify-center gap-1 cursor-pointer"
              >
                <span>Try Squad</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Feature 3: Growth Control Tower */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-teal-50/80 to-white border border-teal-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-teal-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-slate-900 text-sm">3. Growth Control Tower</h4>
                    <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-teal-100 text-teal-800">Analytics</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    Real-time executive dashboard monitoring registration velocity, blended CAC (₹2.97 vs. ₹18–25 benchmark), channel economics, budget burn, and actionable growth recommendations.
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  onNavigate('tower');
                  onClose();
                }}
                className="px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs transition-colors shrink-0 flex items-center justify-center gap-1 cursor-pointer"
              >
                <span>Try Tower</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Growth Strategy Snapshot */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
          <div className="flex items-center justify-between font-bold text-slate-900">
            <span className="flex items-center gap-1.5">
              <Target className="w-4 h-4 text-indigo-600" />
              <span>Sprint Campaign Parameters</span>
            </span>
            <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              ₹2.97 Blended CAC
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center pt-1">
            <div className="p-2 rounded-xl bg-white border border-slate-200/80">
              <span className="text-[10px] text-slate-400 block uppercase font-medium">Goal</span>
              <span className="font-bold text-slate-900 text-sm">500 Students</span>
            </div>
            <div className="p-2 rounded-xl bg-white border border-slate-200/80">
              <span className="text-[10px] text-slate-400 block uppercase font-medium">Sprint</span>
              <span className="font-bold text-slate-900 text-sm">7 Days</span>
            </div>
            <div className="p-2 rounded-xl bg-white border border-slate-200/80">
              <span className="text-[10px] text-slate-400 block uppercase font-medium">Max Budget</span>
              <span className="font-bold text-amber-700 text-sm">₹2,000</span>
            </div>
            <div className="p-2 rounded-xl bg-white border border-slate-200/80">
              <span className="text-[10px] text-slate-400 block uppercase font-medium">Pacing</span>
              <span className="font-bold text-blue-700 text-sm">384 (Day 4)</span>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
          <span className="text-slate-500 text-[11px]">Click any section in the navigation bar to start exploring.</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold cursor-pointer transition-colors"
          >
            Got it, Let's Explore
          </button>
        </div>
      </div>
    </div>
  );
};
