import React, { useState } from 'react';
import { Sparkles, Menu, X, BookOpen } from 'lucide-react';

interface NavbarProps {
  activeTab: 'hub' | 'passport' | 'squad' | 'tower';
  setActiveTab: (tab: 'hub' | 'passport' | 'squad' | 'tower') => void;
  onOpenGuide?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenGuide,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (tab: 'hub' | 'passport' | 'squad' | 'tower') => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-indigo-100/90 shadow-2xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Colored Logo and Product Name */}
          <button
            onClick={() => handleNavClick('hub')}
            className="flex items-center gap-2.5 text-left cursor-pointer group shrink-0"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-md shadow-blue-500/25 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-tight text-[#0f172a] group-hover:text-blue-600 transition-colors">
                Project<span className="text-blue-600">Spark</span>
              </span>
            </div>
          </button>

          {/* Center / Right: 4 Navigation Links with Prominent Blue Active Indicator */}
          <nav className="hidden md:flex items-center gap-2 text-sm font-semibold">
            <button
              onClick={() => handleNavClick('hub')}
              className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
                activeTab === 'hub'
                  ? 'bg-blue-50 text-blue-700 font-bold border-b-2 border-blue-600 shadow-2xs'
                  : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('passport')}
              className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
                activeTab === 'passport'
                  ? 'bg-blue-50 text-blue-700 font-bold border-b-2 border-blue-600 shadow-2xs'
                  : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
              }`}
            >
              AI Project Passport
            </button>
            <button
              onClick={() => handleNavClick('squad')}
              className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
                activeTab === 'squad'
                  ? 'bg-blue-50 text-blue-700 font-bold border-b-2 border-blue-600 shadow-2xs'
                  : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
              }`}
            >
              Build Squad Challenge
            </button>
            <button
              onClick={() => handleNavClick('tower')}
              className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
                activeTab === 'tower'
                  ? 'bg-blue-50 text-blue-700 font-bold border-b-2 border-blue-600 shadow-2xs'
                  : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
              }`}
            >
              Growth Control Tower
            </button>
          </nav>

          {/* Far Right: Platform Guide Action */}
          <div className="hidden sm:flex items-center shrink-0">
            <button
              onClick={onOpenGuide}
              className="px-3.5 py-2 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200/90 rounded-xl transition-all shadow-2xs cursor-pointer flex items-center gap-1.5 active:scale-95"
            >
              <BookOpen className="w-3.5 h-3.5 text-blue-600" />
              <span>Platform Guide</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-blue-600 focus:outline-none cursor-pointer rounded-lg hover:bg-slate-100"
              aria-label="Toggle mobile navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Collapsible Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white/95 backdrop-blur-md px-4 pt-3 pb-4 space-y-2">
          <button
            onClick={() => handleNavClick('hub')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-bold ${
              activeTab === 'hub' ? 'bg-blue-100/70 text-blue-800' : 'text-slate-700'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('passport')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-bold ${
              activeTab === 'passport' ? 'bg-blue-100/70 text-blue-800' : 'text-slate-700'
            }`}
          >
            AI Project Passport
          </button>
          <button
            onClick={() => handleNavClick('squad')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-bold ${
              activeTab === 'squad' ? 'bg-blue-100/70 text-blue-800' : 'text-slate-700'
            }`}
          >
            Build Squad Challenge
          </button>
          <button
            onClick={() => handleNavClick('tower')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-bold ${
              activeTab === 'tower' ? 'bg-blue-100/70 text-blue-800' : 'text-slate-700'
            }`}
          >
            Growth Control Tower
          </button>

          <div className="pt-2">
            <button
              onClick={() => {
                if (onOpenGuide) onOpenGuide();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 px-4 text-center text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200 rounded-xl shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5 text-blue-600" />
              <span>Open Platform Guide</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
