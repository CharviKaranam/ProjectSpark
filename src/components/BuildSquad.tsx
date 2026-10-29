import React, { useState } from 'react';
import { 
  Users, 
  Copy, 
  Check, 
  Share2, 
  MessageCircle, 
  PlusCircle, 
  Edit3, 
  RotateCcw,
  Info
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ReferralMember } from '../types';
import { INITIAL_SQUAD_MEMBERS } from '../data/mockData';

interface BuildSquadProps {
  referralCode?: string;
  studentName?: string;
  onSquadMemberAdded?: (member: ReferralMember) => void;
}

const SAMPLE_NAMES = [
  { name: 'Siddharth Nair', college: 'VIT Vellore', branch: 'ECE' },
  { name: 'Karthik Rao', college: 'DTU Delhi', branch: 'Software Engineering' },
  { name: 'Meera Kulkarni', college: 'PICT Pune', branch: 'IT' },
  { name: 'Tanmay Gupta', college: 'BMS College of Engineering', branch: 'AI & Data Science' },
  { name: 'Divya Nambiar', college: 'NIT Surathkal', branch: 'ECE' },
];

export const BuildSquad: React.FC<BuildSquadProps> = ({
  referralCode = 'SPARK-CS-892',
  studentName = 'Aarav Sharma',
  onSquadMemberAdded,
}) => {
  const referralLink = `${window.location.origin}?ref=${referralCode}`;

  const defaultMessage = `Hey! Check out this free hands-on workshop: "Build Your First AI Project in 60 Minutes" (Live code with Gemini 3.8 Flash). We build a live deployed app for our GitHub and placement portfolios.\n\nJoin our squad with my invite code: ${referralCode} (${referralLink})`;

  const [invitationMessage, setInvitationMessage] = useState(defaultMessage);
  const [isEditing, setIsEditing] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);
  const [records, setRecords] = useState<ReferralMember[]>(INITIAL_SQUAD_MEMBERS);

  // Summary Metrics
  const totalInvitationsGenerated = 14;
  const totalReferralActivity = records.length + 8;
  const totalCompletedRegistrations = records.filter(r => r.status === 'Registered & Confirmed').length;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(invitationMessage);
    setCopiedMessage(true);
    setTimeout(() => setCopiedMessage(false), 2000);
  };

  const handleShareWhatsApp = () => {
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(invitationMessage)}`, '_blank');
  };

  const handleSimulateNewActivity = () => {
    const randomPick = SAMPLE_NAMES[Math.floor(Math.random() * SAMPLE_NAMES.length)];
    const channels: ('WhatsApp' | 'LinkedIn' | 'Discord')[] = ['WhatsApp', 'WhatsApp', 'LinkedIn'];
    const chosenChannel = channels[Math.floor(Math.random() * channels.length)];

    const newMember: ReferralMember = {
      id: `sim-${Date.now()}`,
      name: randomPick.name,
      college: randomPick.college,
      branch: randomPick.branch,
      timestamp: 'Just now',
      isSimulated: true,
      channel: chosenChannel,
      status: 'Registered & Confirmed',
    };

    const updated = [newMember, ...records];
    setRecords(updated);
    if (onSquadMemberAdded) {
      onSquadMemberAdded(newMember);
    }

    try {
      confetti({ particleCount: 30, spread: 45, origin: { y: 0.6 } });
    } catch {}
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 py-6 sm:py-8">
      {/* 1. Page Title and One-Line Description */}
      <div className="text-center space-y-1.5">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
          Build Squad Challenge
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
          Invite final-year capstone peers to unlock VIP breakout rooms and track peer registrations.
        </p>
      </div>

      {/* 2. Prominent Invitation Card with Editable Message and Referral Code/Link */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="space-y-0.5">
            <h2 className="text-sm font-bold text-slate-900">Custom Invitation Message</h2>
            <p className="text-xs text-slate-500">Edit message, copy, or share with classmates.</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-2.5 py-1 text-xs font-semibold border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer flex items-center gap-1"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{isEditing ? 'Done' : 'Edit'}</span>
            </button>
            <button
              onClick={() => setInvitationMessage(defaultMessage)}
              className="p-1 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
              title="Reset message"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {isEditing ? (
          <textarea
            rows={4}
            value={invitationMessage}
            onChange={(e) => setInvitationMessage(e.target.value)}
            className="w-full p-3 text-xs rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 font-sans"
          />
        ) : (
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 leading-relaxed font-sans whitespace-pre-line">
            {invitationMessage}
          </div>
        )}

        {/* Squad Code & Referral Link Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
          <div className="p-3 rounded-xl bg-blue-50/60 border border-blue-200/80 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-blue-700 font-semibold block uppercase">Squad Code</span>
              <span className="font-mono font-bold text-slate-900 text-sm">{referralCode}</span>
            </div>
            <button
              onClick={handleCopyCode}
              className="px-2.5 py-1 text-xs font-semibold text-blue-700 bg-white border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer flex items-center gap-1 shadow-2xs"
            >
              {copiedCode ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
              <span>{copiedCode ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          <div className="p-3 rounded-xl bg-violet-50/60 border border-violet-200/80 flex items-center justify-between gap-2">
            <div className="min-w-0">
              <span className="text-[10px] text-violet-700 font-semibold block uppercase">Referral Link</span>
              <span className="font-mono text-xs text-slate-700 truncate block">{referralLink}</span>
            </div>
            <button
              onClick={handleCopyLink}
              className="px-2.5 py-1 text-xs font-semibold text-violet-700 bg-white border border-violet-200 rounded-lg hover:bg-violet-50 transition-colors cursor-pointer shrink-0 flex items-center gap-1 shadow-2xs"
            >
              {copiedLink ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
              <span>{copiedLink ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>

        {/* 3. Copy and Share Buttons Placed Beside Invitation Actions */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 text-xs">
          <button
            onClick={handleCopyMessage}
            className="px-3.5 py-2 font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            {copiedMessage ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedMessage ? 'Copied Message' : 'Copy Message'}</span>
          </button>

          <button
            onClick={handleShareWhatsApp}
            className="px-3.5 py-2 font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Share to WhatsApp</span>
          </button>
        </div>
      </div>

      {/* 4. Compact Row of Three Summary Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1">
          <div className="text-xs text-slate-500 font-medium">Invitations Generated</div>
          <div className="text-2xl font-bold text-slate-900 tabular-nums">{totalInvitationsGenerated}</div>
          <p className="text-[11px] text-slate-400">Total invite links crafted</p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1">
          <div className="text-xs text-slate-500 font-medium">Referral Activity</div>
          <div className="text-2xl font-bold text-slate-900 tabular-nums">{totalReferralActivity}</div>
          <p className="text-[11px] text-slate-400">Clicks and engagements</p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1">
          <div className="text-xs text-slate-500 font-medium">Completed Registrations</div>
          <div className="text-2xl font-bold text-emerald-600 tabular-nums">{totalCompletedRegistrations}</div>
          <p className="text-[11px] text-slate-400">Confirmed student seats</p>
        </div>
      </div>

      {/* 5. Optional Compact Activity Table Below Metrics */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
          <div className="space-y-0.5">
            <h3 className="text-sm font-bold text-slate-900">Referral Activity Log</h3>
            <p className="text-xs text-slate-500">Source tracking and activity status.</p>
          </div>

          <button
            onClick={handleSimulateNewActivity}
            className="px-2.5 py-1 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-1 cursor-pointer shadow-2xs"
          >
            <PlusCircle className="w-3.5 h-3.5 text-blue-600" />
            <span>Simulate Peer (+1)</span>
          </button>
        </div>

        <div className="p-2.5 rounded-lg bg-amber-50/70 border border-amber-200 text-[11px] text-amber-800 flex items-center gap-2">
          <Info className="w-3.5 h-3.5 text-amber-600 shrink-0" />
          <span>Notice: Activity records below are simulated for demonstration. No external messages sent.</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-medium pb-1.5">
                <th className="py-2 px-2.5">Student</th>
                <th className="py-2 px-2.5">Institution</th>
                <th className="py-2 px-2.5">Channel</th>
                <th className="py-2 px-2.5">Status</th>
                <th className="py-2 px-2.5 text-right">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {records.map((member) => (
                <tr key={member.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-2.5 px-2.5 font-semibold text-slate-900">{member.name}</td>
                  <td className="py-2.5 px-2.5 text-slate-500">{member.college}</td>
                  <td className="py-2.5 px-2.5 text-slate-600">{member.channel}</td>
                  <td className="py-2.5 px-2.5 text-emerald-600 font-medium">{member.status}</td>
                  <td className="py-2.5 px-2.5 text-right text-slate-400">{member.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
