import React, { useState } from 'react';
import { 
  Sparkles, 
  Copy, 
  Check, 
  Share2, 
  Bookmark, 
  ChevronDown, 
  User, 
  X,
  Scan,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PassportData } from '../types';
import { INITIAL_PASSPORT } from '../data/mockData';

// Generated split-face image asset
import splitFaceImg from '../assets/images/deepfake_split_face_1793179133550.jpg';

interface ProjectPassportProps {
  onRegisterWithPassport?: (passport: PassportData) => void;
  registeredStudentName?: string;
}

const POPULAR_INTERESTS = [
  'Machine Learning',
  'Natural Language Processing',
  'Computer Vision',
  'Web Development',
  'Autonomous Agents',
  'Cloud Architecture'
];

const EXPERIENCE_OPTIONS = ['Beginner', 'Intermediate', 'Advanced'];

const DOMAIN_OPTIONS = [
  'Web Development',
  'AI / Machine Learning',
  'Mobile Development',
  'Cloud Computing & DevOps',
  'Cybersecurity & Forensics'
];

export const ProjectPassport: React.FC<ProjectPassportProps> = ({
  onRegisterWithPassport,
  registeredStudentName = 'Candidate',
}) => {
  // Form states matching reference
  const [selectedInterests, setSelectedInterests] = useState<string[]>(['Machine Learning']);
  const [showInterestsDropdown, setShowInterestsDropdown] = useState(false);
  const [experienceLevel, setExperienceLevel] = useState('Intermediate');
  const [preferredDomain, setPreferredDomain] = useState('Web Development');

  // Generation states
  const [isGenerating, setIsGenerating] = useState(false);
  const [passport, setPassport] = useState<PassportData>(INITIAL_PASSPORT);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shareToast, setShareToast] = useState<string | null>(null);

  const removeInterest = (item: string) => {
    setSelectedInterests(prev => prev.filter(i => i !== item));
  };

  const addInterest = (item: string) => {
    if (!selectedInterests.includes(item)) {
      setSelectedInterests(prev => [...prev, item]);
    }
    setShowInterestsDropdown(false);
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    try {
      const response = await fetch('/api/passport/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentName: registeredStudentName,
          branch: selectedInterests[0] || 'Machine Learning',
          experienceLevel,
          domain: preferredDomain,
          placementTarget: 'Top Tech Firm',
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setPassport({
          ...data.passport,
          studentName: registeredStudentName,
          branch: selectedInterests[0] || 'Machine Learning',
          experienceLevel,
          domain: preferredDomain,
        });
      } else {
        // Fallback with user selections
        setPassport(prev => ({
          ...prev,
          branch: selectedInterests[0] || 'Machine Learning',
          experienceLevel,
          domain: preferredDomain,
        }));
      }

      confetti({
        particleCount: 45,
        spread: 60,
        origin: { y: 0.65 },
        colors: ['#2563eb', '#38bdf8', '#8b5cf6', '#10b981'],
      });
    } catch {
      // Graceful fallback
      setPassport(prev => ({
        ...prev,
        branch: selectedInterests[0] || 'Machine Learning',
        experienceLevel,
        domain: preferredDomain,
      }));
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    const textToCopy = `${passport.title}\n\nProblem Statement:\n${passport.problemStatement}\n\nKey Features:\n${passport.suggestedFeatures.map(f => `• ${f}`).join('\n')}\n\nTechnologies: ${selectedInterests.join(', ')} | ${preferredDomain} | ${experienceLevel}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    const shareText = `Check out my personalized AI project idea for the ProjectSpark workshop: "${passport.title}"! Join me at https://projectspark.in/?ref=KC123`;
    if (navigator.share) {
      navigator.share({
        title: passport.title,
        text: shareText,
        url: 'https://projectspark.in',
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(shareText);
      setShareToast('Share link copied to clipboard!');
      setTimeout(() => setShareToast(null), 3000);
    }
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
      {/* Page Heading */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">AI Project Passport</h1>
        <p className="text-sm text-gray-500 mt-1">
          Get a personalized AI project idea based on your interests and experience.
        </p>
      </div>

      {/* Two Column Layout matching reference Panel 3 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Input Form (4 cols on lg) */}
        <div className="lg:col-span-5 bg-white rounded-xl p-6 border border-gray-200/80 shadow-sm">
          <h2 className="text-base font-semibold text-gray-900 mb-5">Tell us about yourself</h2>

          <form onSubmit={handleGenerate} className="space-y-5">
            {/* Field 1: Your Interests */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1.5">
                Your Interests
              </label>
              <div className="relative">
                <div 
                  onClick={() => setShowInterestsDropdown(!showInterestsDropdown)}
                  className="min-h-[42px] w-full px-3 py-1.5 bg-white border border-gray-200 rounded-lg flex items-center justify-between cursor-pointer hover:border-gray-300 transition-colors"
                >
                  <div className="flex flex-wrap gap-1.5 items-center">
                    {selectedInterests.map((interest, i) => (
                      <span 
                        key={i}
                        className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeInterest(interest);
                        }}
                      >
                        {interest}
                        <X className="w-3 h-3 hover:text-blue-900 cursor-pointer" />
                      </span>
                    ))}
                    {selectedInterests.length === 0 && (
                      <span className="text-xs text-gray-400">Select interests...</span>
                    )}
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
                </div>

                {/* Dropdown Options */}
                {showInterestsDropdown && (
                  <div className="absolute z-20 left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 max-h-48 overflow-y-auto">
                    {POPULAR_INTERESTS.map((item, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => addInterest(item)}
                        className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-gray-50 ${
                          selectedInterests.includes(item) ? 'text-blue-600 font-medium bg-blue-50/50' : 'text-gray-700'
                        }`}
                      >
                        <span>{item}</span>
                        {selectedInterests.includes(item) && <Check className="w-3.5 h-3.5" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Field 2: Experience Level */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1.5">
                Experience Level
              </label>
              <div className="relative">
                <select
                  value={experienceLevel}
                  onChange={(e) => setExperienceLevel(e.target.value)}
                  className="w-full appearance-none px-3.5 py-2.5 bg-white border border-gray-200 rounded-lg text-xs sm:text-sm text-gray-800 font-medium outline-none hover:border-gray-300 focus:border-blue-500 transition-colors pr-9 cursor-pointer"
                >
                  {EXPERIENCE_OPTIONS.map((lvl) => (
                    <option key={lvl} value={lvl}>{lvl}</option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Field 3: Preferred Domain */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1.5">
                Preferred Domain
              </label>
              <div className="relative">
                <select
                  value={preferredDomain}
                  onChange={(e) => setPreferredDomain(e.target.value)}
                  className="w-full appearance-none px-3.5 py-2.5 bg-white border border-gray-200 rounded-lg text-xs sm:text-sm text-gray-800 font-medium outline-none hover:border-gray-300 focus:border-blue-500 transition-colors pr-9 cursor-pointer"
                >
                  {DOMAIN_OPTIONS.map((dm) => (
                    <option key={dm} value={dm}>{dm}</option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isGenerating}
              className="w-full mt-2 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs sm:text-sm font-semibold shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
            >
              {isGenerating ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin text-white" />
                  <span>Synthesizing Architecture...</span>
                </>
              ) : (
                <>
                  <span>Generate My Project</span>
                  <span className="text-yellow-300">✨</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Column: Generated Project Card (7 cols on lg) */}
        <div className="lg:col-span-7 bg-white rounded-xl p-6 border border-gray-200/80 shadow-sm flex flex-col justify-between">
          <div>
            {/* Card Top: Avatar / Title & Bookmark */}
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                  <User className="w-4 h-4" />
                </div>
                <span className="text-xs font-semibold text-gray-700">Your Personalized AI Project</span>
              </div>
              <button 
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`p-1.5 rounded-md hover:bg-gray-100 transition-colors ${
                  isBookmarked ? 'text-blue-600 fill-blue-600' : 'text-gray-400'
                }`}
                title={isBookmarked ? 'Bookmarked' : 'Bookmark this project'}
              >
                <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-blue-600' : ''}`} />
              </button>
            </div>

            {/* Project Title */}
            <div className="mt-4">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight">
                {passport.title || 'TrueLens – Deepfake Image Detector'}
              </h3>

              {/* Tags Row */}
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-sky-50 text-sky-700 border border-sky-100">
                  {selectedInterests[0] || 'Machine Learning'}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-sky-50 text-sky-700 border border-sky-100">
                  {preferredDomain}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-purple-50 text-purple-700 border border-purple-100">
                  {experienceLevel}
                </span>
              </div>
            </div>

            {/* Problem Statement */}
            <div className="mt-4">
              <h4 className="text-xs font-semibold text-gray-900 mb-1">Problem Statement</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                {passport.problemStatement || 'Detect whether an image is real or AI-generated to help reduce misinformation.'}
              </p>
            </div>

            {/* Key Features & Visual Preview Section */}
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
              {/* Features list (7 cols) */}
              <div className="sm:col-span-7">
                <h4 className="text-xs font-semibold text-gray-900 mb-2.5">Key Features</h4>
                <ul className="space-y-2 text-xs text-gray-600">
                  {(passport.suggestedFeatures || [
                    'Upload an image for analysis',
                    'AI model to detect real vs deepfake',
                    'Confidence score with visual explanation',
                    'Clean and user-friendly web interface'
                  ]).map((feat, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold text-base leading-none">•</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Visual Preview Graphic: Split Face (5 cols) */}
              <div className="sm:col-span-5 flex justify-center sm:justify-end">
                <div className="relative w-44 h-44 rounded-xl overflow-hidden border border-gray-200/90 shadow-xs bg-slate-900 group">
                  {/* Photo background */}
                  <img 
                    src={splitFaceImg} 
                    alt="Real vs AI Deepfake Detection Scanner"
                    className="w-full h-full object-cover" 
                  />

                  {/* Center Divider Line */}
                  <div className="absolute inset-y-0 left-1/2 w-0.5 bg-sky-400/80 shadow-[0_0_8px_rgba(56,189,248,0.8)]" />

                  {/* Corner Scanner Reticles */}
                  <div className="absolute inset-2 pointer-events-none border border-sky-400/40 rounded-sm">
                    <div className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-sky-400" />
                    <div className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-pink-400" />
                    <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-sky-400" />
                    <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-pink-400" />
                  </div>

                  {/* REAL Badge on left */}
                  <div className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded-full bg-emerald-500/90 text-white font-mono text-[9px] font-bold tracking-wider shadow-sm flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    REAL
                  </div>

                  {/* AI Badge on right */}
                  <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-full bg-pink-500/90 text-white font-mono text-[9px] font-bold tracking-wider shadow-sm flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                    AI
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons Row matching reference */}
          <div className="mt-8 pt-4 border-t border-gray-100 flex flex-wrap items-center justify-end gap-3">
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-lg text-xs font-semibold shadow-sm transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-gray-500" />
                  <span>Copy Project Idea</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>
          </div>

          {shareToast && (
            <div className="mt-2 text-right">
              <span className="text-xs text-blue-600 font-medium">{shareToast}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
