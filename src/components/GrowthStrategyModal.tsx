import React from 'react';
import { X, Lightbulb, Target, Zap } from 'lucide-react';

interface GrowthStrategyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GrowthStrategyModal: React.FC<GrowthStrategyModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-3xl rounded-3xl bg-white border border-slate-200 p-6 sm:p-10 shadow-xl space-y-7 my-8 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-1.5 border-b border-slate-100 pb-5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold">
            <Lightbulb className="w-3.5 h-3.5 text-blue-600" />
            <span>NxtWave Growth Intern Strategic Memo</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            500 Registrations &bull; 7 Days &bull; ₹2,000 Budget
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            A comprehensive growth thesis based on viral squad dynamics, campus placement psychology, and unit economics.
          </p>
        </div>

        {/* The Fundamental Math Problem */}
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-2 text-xs">
          <div className="font-bold text-rose-900 flex items-center gap-1.5">
            <Target className="w-4 h-4 text-rose-700" />
            <span>The Traditional Paid Ads Failure Trap</span>
          </div>
          <p className="text-rose-950 leading-relaxed">
            In the Indian student market, standard Meta/Google ads convert at a customer acquisition cost (CAC) of <strong>₹45 to ₹80 per registration</strong>. Spending the entire ₹2,000 budget on paid ads yields only <strong>25 to 44 registrations</strong>—falling short of the 500 target by ~92%.
          </p>
          <p className="text-emerald-900 font-semibold pt-0.5">
            &rarr; Growth Strategy: Deploy the ₹2,000 as early-stage "Seed Ignition Capital" and let the Build Squad peer referral loop drive 76.5%+ of all signups at ₹0 CAC.
          </p>
        </div>

        {/* 4-Step Viral Loop */}
        <div className="space-y-3.5">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Zap className="w-4 h-4 text-blue-600" />
            <span>The 4-Step ProjectSpark Growth Flywheel</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* Step 1 */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
              <span className="text-[10px] font-bold text-blue-700 uppercase">1. Attract via Immediate Value</span>
              <h4 className="font-bold text-slate-900 text-sm">AI Project Passport</h4>
              <p className="text-slate-600 leading-relaxed">
                Students do not want generic lectures. The Passport delivers instant, personalized utility before the workshop starts—offering verified STAR resume bullet points and capstone viva readiness.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
              <span className="text-[10px] font-bold text-emerald-700 uppercase">2. Built-in Academic Alignment</span>
              <h4 className="font-bold text-slate-900 text-sm">3-Student Capstone Squads</h4>
              <p className="text-slate-600 leading-relaxed">
                Final-year engineering projects in Indian colleges require groups of 3–4 students. By incentivizing a "VIP Senior Mentor Breakout Room" for full 3-person squads, students naturally onboard their teammates.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
              <span className="text-[10px] font-bold text-amber-700 uppercase">3. High-Leverage Seed Budget</span>
              <h4 className="font-bold text-slate-900 text-sm">₹2,000 Budget Allocation</h4>
              <ul className="text-slate-600 space-y-1 list-disc pl-3">
                <li><strong>₹940 (Days 1–2):</strong> Instagram Story ads targeting engineering colleges (&rarr; 52 seed students).</li>
                <li><strong>₹200 (Days 3–4):</strong> WhatsApp Class Rep micro-bounties (&rarr; 94 signups).</li>
                <li><strong>₹860 (Days 5–7):</strong> Reserve buffer for squad conversion nudges.</li>
              </ul>
            </div>

            {/* Step 4 */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
              <span className="text-[10px] font-bold text-purple-700 uppercase">4. Non-Linear Viral Multiplier</span>
              <h4 className="font-bold text-slate-900 text-sm">Viral K-Factor = 1.34</h4>
              <p className="text-slate-600 leading-relaxed">
                Because each seed student brings an average of 1.34 teammates to unlock group perks, growth transitions from linear to exponential, successfully reaching 500+ registrations at a blended CAC of under ₹3.
              </p>
            </div>
          </div>
        </div>

        {/* Unit Economics Snapshot */}
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
          <div className="font-bold text-slate-900 flex items-center justify-between">
            <span>Unit Economics Snapshot</span>
            <span className="text-emerald-800 font-bold bg-emerald-100 px-2 py-0.5 rounded">Blended CAC: ₹2.97</span>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3 rounded-xl bg-white border border-slate-200">
              <div className="text-slate-500 text-[10px]">Total Registrations</div>
              <div className="text-lg font-bold text-slate-900 mt-0.5">384 &rarr; 585</div>
            </div>
            <div className="p-3 rounded-xl bg-white border border-slate-200">
              <div className="text-slate-500 text-[10px]">Total Spend</div>
              <div className="text-lg font-bold text-amber-700 mt-0.5">₹1,140 / ₹2,000</div>
            </div>
            <div className="p-3 rounded-xl bg-white border border-slate-200">
              <div className="text-slate-500 text-[10px]">Cost Efficiency</div>
              <div className="text-lg font-bold text-emerald-700 mt-0.5">94% Below Market</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end pt-2 border-t border-slate-100">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors shadow-2xs"
          >
            Close Strategic Memo
          </button>
        </div>
      </div>
    </div>
  );
};
