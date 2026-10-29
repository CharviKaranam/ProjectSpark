import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { WorkshopHub } from './components/WorkshopHub';
import { ProjectPassport } from './components/ProjectPassport';
import { BuildSquad } from './components/BuildSquad';
import { GrowthTower } from './components/GrowthTower';
import { PassportData, ReferralMember } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<'hub' | 'passport' | 'squad' | 'tower'>('hub');
  const [currentRegistrations, setCurrentRegistrations] = useState(384);
  const [referralCode, setReferralCode] = useState('SPARK-CS-892');
  const [studentName, setStudentName] = useState('Aarav Sharma');

  // Detect referral parameter in URL (?ref=...)
  useEffect(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const refParam = urlParams.get('ref');
      if (refParam) {
        setReferralCode(refParam.toUpperCase());
      }
    } catch {
      // ignore
    }
  }, []);

  const handleSquadMemberAdded = (member: ReferralMember) => {
    setCurrentRegistrations((prev) => prev + 1);
  };

  const handleRegisterWithPassport = (passport: PassportData) => {
    setStudentName(passport.studentName);
    setActiveTab('squad');
  };

  return (
    <div className="min-h-screen bg-slate-50/70 text-slate-900 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* 1. Compact Top Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        {activeTab === 'hub' && (
          <WorkshopHub
            onNavigate={(tab) => setActiveTab(tab)}
          />
        )}

        {activeTab === 'passport' && (
          <ProjectPassport
            onRegisterWithPassport={handleRegisterWithPassport}
            registeredStudentName={studentName}
          />
        )}

        {activeTab === 'squad' && (
          <BuildSquad
            referralCode={referralCode}
            studentName={studentName}
            onSquadMemberAdded={handleSquadMemberAdded}
          />
        )}

        {activeTab === 'tower' && (
          <GrowthTower
            liveRegistrationCount={currentRegistrations}
          />
        )}
      </main>

      {/* 4. Minimal Footer with Product Name and Essential Navigation Links */}
      <footer className="border-t border-slate-200 bg-white py-5 text-xs text-slate-500 mt-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900">ProjectSpark</span>
            <span className="text-slate-400">&bull;</span>
            <span className="text-slate-500">Build Your First AI Project in 60 Minutes</span>
          </div>

          <div className="flex flex-wrap items-center gap-5 font-medium text-slate-600">
            <button onClick={() => setActiveTab('hub')} className="hover:text-blue-600 cursor-pointer">Home</button>
            <button onClick={() => setActiveTab('passport')} className="hover:text-blue-600 cursor-pointer">AI Project Passport</button>
            <button onClick={() => setActiveTab('squad')} className="hover:text-blue-600 cursor-pointer">Build Squad</button>
            <button onClick={() => setActiveTab('tower')} className="hover:text-blue-600 cursor-pointer">Growth Tower</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
