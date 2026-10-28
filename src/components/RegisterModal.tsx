import React, { useState } from 'react';
import { X, CheckCircle2, UserPlus, Sparkles, ArrowRight, ShieldCheck, Copy, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { RegistrationFormData } from '../types';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegistered: (data: RegistrationFormData, newSquadCode: string) => void;
  initialReferralCode?: string;
  onGoToPassport: () => void;
  onGoToSquad: () => void;
}

export const RegisterModal: React.FC<RegisterModalProps> = ({
  isOpen,
  onClose,
  onRegistered,
  initialReferralCode = '',
  onGoToPassport,
  onGoToSquad,
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [college, setCollege] = useState('RV College of Engineering');
  const [branch, setBranch] = useState('Computer Science & IT');
  const [gradYear, setGradYear] = useState('2025 (Final Year)');
  const [referralCode, setReferralCode] = useState(initialReferralCode);
  const [isSuccess, setIsSuccess] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const branchPrefix = branch.includes('Computer') ? 'CS' : branch.includes('Electronics') ? 'ECE' : 'ENG';
    const newCode = `SPARK-${branchPrefix}-${Math.floor(100 + Math.random() * 900)}`;
    setGeneratedCode(newCode);

    onRegistered(
      {
        fullName,
        email,
        college,
        branch,
        gradYear,
        referralCode: referralCode.trim() || undefined,
      },
      newCode
    );

    setIsSuccess(true);
    try {
      confetti({
        particleCount: 70,
        spread: 70,
        origin: { y: 0.5 }
      });
    } catch {
      // ignore
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fade-in">
      <div className="relative w-full max-w-lg rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 shadow-xl overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSuccess ? (
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>100% Free Masterclass &bull; Limited Capacity</span>
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900">
                Reserve Your Free Workshop Seat
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                Join final-year engineering peers on Saturday 6:00 PM IST for “Build Your First AI Project in 60 Minutes”.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-700 block">Full Name</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Priya Venkatesh"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white text-xs transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700 block">Student / College Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. priya.v@rvce.edu.in or personal email"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white text-xs transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 block">College / University</label>
                  <input
                    type="text"
                    required
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                    placeholder="e.g. RVCE Bangalore"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white text-xs transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 block">Graduation Batch</label>
                  <select
                    value={gradYear}
                    onChange={(e) => setGradYear(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white text-xs transition-colors"
                  >
                    <option value="2025 (Final Year)">2025 (Final Year)</option>
                    <option value="2026 (Pre-Final Year)">2026 (Pre-Final Year)</option>
                    <option value="Recent Graduate">Recent Graduate</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 block">Branch / Specialization</label>
                  <select
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white text-xs transition-colors"
                  >
                    <option value="Computer Science & IT">Computer Science & IT</option>
                    <option value="Electronics & IoT">Electronics & IoT</option>
                    <option value="Mechanical & Robotics">Mechanical & Robotics</option>
                    <option value="Civil & Smart Infra">Civil & Smart Infra</option>
                    <option value="Electrical & Power">Electrical & Power</option>
                    <option value="Biotechnology & HealthTech">Biotechnology & HealthTech</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 block">Squad Referral Code (Optional)</label>
                  <input
                    type="text"
                    value={referralCode}
                    onChange={(e) => setReferralCode(e.target.value)}
                    placeholder="e.g. SPARK-CS-892"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-mono placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white text-xs uppercase transition-colors"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 active:scale-98 shadow-sm shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Confirm Free Registration</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Zero spam &bull; Direct Google Meet link emailed 24 hours prior</span>
              </div>
            </form>
          </div>
        ) : (
          /* Registration Success Screen */
          <div className="text-center space-y-6 py-2">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto border border-emerald-200">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <div className="space-y-1.5">
              <h2 className="text-2xl font-extrabold text-slate-900">
                You're Registered!
              </h2>
              <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                Welcome aboard, <strong className="text-slate-900">{fullName}</strong>. Your confirmation details and starter GitHub repository link are on their way.
              </p>
            </div>

            {/* Generated squad code box */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-[11px] font-mono text-blue-700 font-bold uppercase tracking-wider block">
                YOUR UNIQUE SQUAD INVITE CODE
              </span>
              <div className="flex items-center justify-center gap-2">
                <span className="text-2xl font-black text-slate-900 font-mono tracking-widest">
                  {generatedCode}
                </span>
                <button
                  onClick={handleCopyCode}
                  className="p-2 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 transition-colors shadow-2xs"
                  title="Copy Code"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-[11px] text-slate-500">
                Invite 3 classmates to unlock the VIP Senior AI Mentor Breakout Room!
              </p>
            </div>

            {/* Next Steps Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => {
                  onClose();
                  onGoToPassport();
                }}
                className="py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs"
              >
                <span>Generate AI Passport</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => {
                  onClose();
                  onGoToSquad();
                }}
                className="py-3 px-4 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-all border border-slate-300 shadow-2xs"
              >
                <span>Invite Project Squad</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
