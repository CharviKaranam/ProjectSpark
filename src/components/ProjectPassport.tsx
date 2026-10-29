import React, { useState } from 'react';
import { 
  Sparkles, 
  Copy, 
  Check, 
  Share2, 
  RefreshCw, 
  AlertCircle,
  Award,
  CheckCircle2,
  FileText
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PassportData } from '../types';
import { INITIAL_PASSPORT } from '../data/mockData';

interface ProjectPassportProps {
  onRegisterWithPassport?: (passport: PassportData) => void;
  registeredStudentName?: string;
}

const INTERESTS = [
  'Computer Science & Software Systems',
  'Electronics & Embedded IoT',
  'Mechanical & Robotics Automation',
  'Civil & Infrastructure Systems',
  'Electrical & Renewable Energy',
  'Biotechnology & Healthcare Tech',
];

const EXPERIENCE_LEVELS = [
  { id: 'Beginner', label: 'Beginner', desc: 'Basic programming syntax' },
  { id: 'Intermediate', label: 'Intermediate', desc: 'Built simple apps or APIs' },
  { id: 'Advanced', label: 'Advanced', desc: 'Full-stack & Git proficient' },
];

const DOMAINS = [
  'LLM Agents & Tool Use',
  'RAG & Document Intelligence',
  'Edge AI & Embedded Sensors',
  'Computer Vision & Video AI',
  'Voice & Speech Interactive AI',
  'Predictive Data Analytics & ML',
];

export const ProjectPassport: React.FC<ProjectPassportProps> = ({
  onRegisterWithPassport,
  registeredStudentName = 'Aarav Sharma',
}) => {
  const [studentName, setStudentName] = useState(registeredStudentName);
  const [interest, setInterest] = useState(INTERESTS[0]);
  const [experienceLevel, setExperienceLevel] = useState('Intermediate');
  const [domain, setDomain] = useState(DOMAINS[0]);

  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [passport, setPassport] = useState<PassportData | null>(INITIAL_PASSPORT);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim()) {
      setGenerationError('Please enter your candidate name.');
      return;
    }

    setGenerationError(null);
    setIsGenerating(true);

    try {
      const response = await fetch('/api/passport/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentName: studentName.trim(),
          branch: interest,
          experienceLevel,
          domain,
          placementTarget: 'Tier-1 Product Company',
          customIdea: '',
        }),
      });

      if (!response.ok) {
        throw new Error(`Generation failed with status ${response.status}`);
      }

      const data = await response.json();
      if (data.success && data.passport) {
        setPassport(data.passport);
        try {
          confetti({ particleCount: 30, spread: 45, origin: { y: 0.6 } });
        } catch {}
      } else {
        throw new Error('Invalid response structure');
      }
    } catch (err: any) {
      console.warn('Generation error, using verified blueprint fallback:', err);
      setGenerationError('Live Gemini connection issue. A verified blueprint has been prepared below.');
      setPassport({
        ...INITIAL_PASSPORT,
        studentName: studentName.trim(),
        branch: interest,
        experienceLevel,
        domain,
        passportId: `PSP-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
        generatedAt: new Date().toISOString(),
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    if (!passport) return;
    const text = `${passport.title}\n\nProblem Statement: ${passport.problemStatement}\n\nDescription: ${passport.shortDescription}\n\nFeatures:\n${passport.suggestedFeatures.map((f, i) => `${i + 1}. ${f}`).join('\n')}\n\nSTAR Resume Bullet:\n${passport.resumeBullets.join('\n')}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (!passport) return;
    const text = `Check out my personalized AI Project Idea for the "Build Your First AI Project in 60 Minutes" workshop: "${passport.title}"!`;
    const url = window.location.origin;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 py-6 sm:py-8">
      {/* 1. Page Title and One-Line Description */}
      <div className="text-center space-y-1.5">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
          AI Project Passport
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
          Personalized AI project idea generator aligned with your academic discipline and campus placement goals.
        </p>
      </div>

      {/* 2. Compact, Well-Aligned Form */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs">
        <form onSubmit={handleGenerate} className="space-y-4 text-xs">
          {/* Candidate Name */}
          <div className="space-y-1">
            <label className="font-semibold text-slate-700 block">Candidate Name</label>
            <input
              type="text"
              required
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="e.g. Aarav Sharma"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            />
          </div>

          {/* Interest Selection */}
          <div className="space-y-1">
            <label className="font-semibold text-slate-700 block">Discipline / Branch Interest</label>
            <select
              value={interest}
              onChange={(e) => setInterest(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 cursor-pointer"
            >
              {INTERESTS.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </div>

          {/* Experience Level */}
          <div className="space-y-1.5">
            <label className="font-semibold text-slate-700 block">Experience Level</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {EXPERIENCE_LEVELS.map((lvl) => {
                const isSelected = experienceLevel === lvl.id;
                return (
                  <button
                    type="button"
                    key={lvl.id}
                    onClick={() => setExperienceLevel(lvl.id)}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/70 text-blue-900 font-semibold shadow-2xs'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <div className="text-xs font-bold">{lvl.label}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{lvl.desc}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Preferred Domain */}
          <div className="space-y-1">
            <label className="font-semibold text-slate-700 block">Preferred AI Domain</label>
            <select
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 cursor-pointer"
            >
              {DOMAINS.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          {/* 3. One Prominent "Generate My Project" Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isGenerating}
              className="w-full py-3 px-4 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs text-sm"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Generating Project Blueprint...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate My Project</span>
                </>
              )}
            </button>
          </div>

          {/* Loading & Error States */}
          {isGenerating && (
            <div className="p-2.5 rounded-lg bg-blue-50 border border-blue-200 text-xs text-blue-800 text-center animate-pulse font-medium">
              Generating placement-ready blueprint with Gemini 3.8 Flash...
            </div>
          )}

          {generationError && (
            <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{generationError}</span>
            </div>
          )}
        </form>
      </div>

      {/* 4. Project Result in a Separate, Visually Appealing Card */}
      {passport && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-xs space-y-5">
          {/* Header row */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 text-xs">
            <div className="flex items-center gap-2 font-medium text-slate-600">
              <span className="font-bold text-slate-900">{passport.studentName}</span>
              <span>&bull;</span>
              <span>{passport.branch}</span>
              <span>&bull;</span>
              <span className="text-blue-600 font-semibold">{passport.experienceLevel}</span>
            </div>
            <span className="font-mono text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
              {passport.passportId}
            </span>
          </div>

          {/* Title & Overview */}
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block">
              Personalized Project Idea
            </span>
            <h2 className="text-xl font-bold tracking-tight text-slate-900 leading-snug">
              {passport.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
              {passport.shortDescription}
            </p>
          </div>

          {/* Problem Statement */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1 text-xs">
            <span className="font-semibold text-slate-700 block">Problem Statement:</span>
            <p className="text-slate-600 leading-relaxed">{passport.problemStatement}</p>
          </div>

          {/* Suggested Features */}
          {passport.suggestedFeatures && passport.suggestedFeatures.length > 0 && (
            <div className="space-y-2">
              <span className="text-xs font-semibold text-slate-700 block">Core Features:</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {passport.suggestedFeatures.map((feat, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-blue-50/50 border border-blue-100 text-slate-700 flex items-start gap-2">
                    <span className="font-mono font-bold text-blue-600 shrink-0">{idx + 1}.</span>
                    <span className="leading-relaxed">{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STAR Placement Bullet */}
          {passport.resumeBullets && passport.resumeBullets.length > 0 && (
            <div className="p-3.5 rounded-xl bg-indigo-50/60 border border-indigo-100 space-y-1.5 text-xs">
              <span className="font-bold text-indigo-900 block">STAR Placement Resume Bullet:</span>
              <p className="text-slate-700 leading-relaxed font-medium">
                &bull; {passport.resumeBullets[0]}
              </p>
            </div>
          )}

          {/* 5. Copy and Share Actions at Bottom of Result Card */}
          <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy Project Idea'}</span>
              </button>

              <button
                onClick={handleShare}
                className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share Idea</span>
              </button>
            </div>

            {onRegisterWithPassport && (
              <button
                onClick={() => onRegisterWithPassport(passport)}
                className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors cursor-pointer"
              >
                Build in Workshop &rarr;
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
