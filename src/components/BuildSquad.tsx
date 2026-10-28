import React, { useState } from 'react';
import { 
  Users, 
  Copy, 
  Check, 
  Share2, 
  Edit3, 
  Send, 
  CheckCircle2, 
  Lightbulb, 
  MessageCircle, 
  Instagram, 
  Globe, 
  Plus,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ReferralMember } from '../types';

interface BuildSquadProps {
  referralCode?: string;
  studentName?: string;
  onSquadMemberAdded?: (member: ReferralMember) => void;
}

interface ActivityRow {
  student: string;
  channel: string;
  channelIcon: 'whatsapp' | 'instagram' | 'direct' | 'telegram';
  status: 'Registered' | 'Clicked';
  date: string;
}

export const BuildSquad: React.FC<BuildSquadProps> = ({
  referralCode = 'KC123',
  studentName = 'Candidate',
  onSquadMemberAdded,
}) => {
  const referralLink = `https://projectspark.in/?ref=${referralCode}`;

  const defaultInvitation = `Hey! I'm joining the 'Build Your First AI Project in 60 Minutes' workshop. It's free and perfect for anyone interested in AI. Join using my link! 🚀`;

  const [message, setMessage] = useState(defaultInvitation);
  const [isEditingMessage, setIsEditingMessage] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [shareToast, setShareToast] = useState<string | null>(null);

  // Summary counts matching reference
  const [invitationsSent, setInvitationsSent] = useState(53);
  const [referralActivity, setReferralActivity] = useState(26);
  const [completedRegistrations, setCompletedRegistrations] = useState(12);

  // Recent activity table matching reference
  const [activityList, setActivityList] = useState<ActivityRow[]>([
    {
      student: 'Student A',
      channel: 'WhatsApp',
      channelIcon: 'whatsapp',
      status: 'Registered',
      date: 'Oct 31, 2026',
    },
    {
      student: 'Student B',
      channel: 'Instagram',
      channelIcon: 'instagram',
      status: 'Clicked',
      date: 'Oct 30, 2026',
    },
    {
      student: 'Student C',
      channel: 'Direct Link',
      channelIcon: 'direct',
      status: 'Registered',
      date: 'Oct 29, 2026',
    },
    {
      student: 'Student D',
      channel: 'Telegram',
      channelIcon: 'telegram',
      status: 'Clicked',
      date: 'Oct 28, 2026',
    },
  ]);

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleShare = () => {
    const fullText = `${message}\n\n${referralLink}`;
    if (navigator.share) {
      navigator.share({
        title: 'Build Your First AI Project in 60 Minutes',
        text: fullText,
        url: referralLink,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(fullText);
      setShareToast('Invitation and link copied to clipboard!');
      setTimeout(() => setShareToast(null), 3000);
    }
  };

  // Simulate new peer registration
  const handleSimulateSignup = () => {
    const newLetters = ['E', 'F', 'G', 'H', 'I'];
    const nextLetter = newLetters[(activityList.length - 4) % newLetters.length] || 'E';
    const newRow: ActivityRow = {
      student: `Student ${nextLetter}`,
      channel: 'WhatsApp',
      channelIcon: 'whatsapp',
      status: 'Registered',
      date: 'Just now',
    };

    setActivityList([newRow, ...activityList]);
    setReferralActivity(prev => prev + 1);
    setCompletedRegistrations(prev => prev + 1);

    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#10b981', '#2563eb', '#8b5cf6'],
    });

    if (onSquadMemberAdded) {
      onSquadMemberAdded({
        id: `s-${Date.now()}`,
        name: `Student ${nextLetter}`,
        college: 'Engineering College',
        branch: 'AI & Data Science',
        timestamp: 'Just now',
        isSimulated: true,
        channel: 'WhatsApp',
        status: 'Registered & Confirmed',
      });
    }
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
      {/* Page Heading */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">Build Squad Challenge</h1>
        <p className="text-sm text-gray-500 mt-1">
          Invite your friends, grow the student community, and help us reach 500 registrations.
        </p>
      </div>

      {/* Two Column Layout matching reference Panel 4 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Your Invitation (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-xl p-6 border border-gray-200/80 shadow-sm flex flex-col justify-between">
          <div>
            {/* Header: Pink Avatar Icon & Title + Edit Pencil */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-pink-50 flex items-center justify-center text-pink-500">
                  <Users className="w-4 h-4" />
                </div>
                <h2 className="text-base font-semibold text-gray-900">Your Invitation</h2>
              </div>
              <button 
                type="button"
                onClick={() => setIsEditingMessage(!isEditingMessage)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                title="Edit invitation message"
              >
                <Edit3 className="w-4 h-4" />
              </button>
            </div>

            {/* Editable or Static Message Box */}
            <div className="mt-4">
              {isEditingMessage ? (
                <div>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-3.5 bg-gray-50/80 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-800 leading-relaxed outline-none focus:border-blue-500 focus:bg-white transition-all resize-none"
                  />
                  <div className="flex justify-end mt-2">
                    <button
                      type="button"
                      onClick={() => setIsEditingMessage(false)}
                      className="px-3 py-1 bg-blue-600 text-white rounded-md text-xs font-semibold"
                    >
                      Done Editing
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-gray-50/80 border border-gray-100 rounded-xl">
                  <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                    {message}
                  </p>
                </div>
              )}
            </div>

            {/* Your Referral Link Section */}
            <div className="mt-6">
              <label className="block text-xs font-semibold text-gray-900 mb-2">
                Your Referral Link
              </label>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                {/* Link input */}
                <div className="flex-1 relative flex items-center">
                  <input
                    type="text"
                    readOnly
                    value={referralLink}
                    className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-lg text-xs text-gray-600 font-mono focus:outline-none pr-8 select-all"
                  />
                  <button 
                    type="button"
                    onClick={handleCopy}
                    className="absolute right-2.5 text-gray-400 hover:text-gray-600"
                    title="Copy"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Copy Button */}
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                >
                  {copiedLink ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-white" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>

                {/* Share Button */}
                <button
                  type="button"
                  onClick={handleShare}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-white border border-blue-600 hover:bg-blue-50 text-blue-600 rounded-lg text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share</span>
                </button>
              </div>

              {shareToast && (
                <p className="text-xs text-emerald-600 font-medium mt-2">{shareToast}</p>
              )}
            </div>
          </div>

          {/* Quick Simulation Trigger */}
          <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
            <span>Simulate friend referral:</span>
            <button
              type="button"
              onClick={handleSimulateSignup}
              className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Simulate Peer Sign Up</span>
            </button>
          </div>
        </div>

        {/* Right Column: Referral Summary & Recent Activity (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-xl p-6 border border-gray-200/80 shadow-sm flex flex-col justify-between">
          <div>
            {/* Header: Lightbulb Icon & Title */}
            <div className="flex items-center gap-2 pb-4 border-b border-gray-100">
              <div className="w-7 h-7 rounded-full bg-amber-50 flex items-center justify-center text-amber-500">
                <Lightbulb className="w-4 h-4" />
              </div>
              <h2 className="text-base font-semibold text-gray-900">Referral Summary</h2>
            </div>

            {/* 3 Metric Cards Row matching reference */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mt-4">
              {/* Metric 1: Invitations Sent */}
              <div className="p-4 rounded-xl bg-blue-50/40 border border-blue-100/70 flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
                  <Send className="w-5 h-5 -rotate-12 translate-x-0.5" />
                </div>
                <div>
                  <span className="text-2xl font-bold text-gray-900 block leading-tight">{invitationsSent}</span>
                  <span className="text-[11px] font-medium text-gray-500">Invitations Sent</span>
                </div>
              </div>

              {/* Metric 2: Referral Activity */}
              <div className="p-4 rounded-xl bg-emerald-50/40 border border-emerald-100/70 flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 flex-shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-2xl font-bold text-gray-900 block leading-tight">{referralActivity}</span>
                  <span className="text-[11px] font-medium text-gray-500">Referral Activity</span>
                </div>
              </div>

              {/* Metric 3: Completed Registrations */}
              <div className="p-4 rounded-xl bg-purple-50/40 border border-purple-100/70 flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600 flex-shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-2xl font-bold text-gray-900 block leading-tight">{completedRegistrations}</span>
                  <span className="text-[11px] font-medium text-gray-500">Completed Registrations</span>
                </div>
              </div>
            </div>

            {/* Recent Activity Table matching reference */}
            <div className="mt-6">
              <h3 className="text-xs font-semibold text-gray-900 mb-2.5">Recent Activity</h3>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-gray-100 text-gray-500 font-medium">
                      <th className="py-2.5 font-medium">Referred Student</th>
                      <th className="py-2.5 font-medium">Channel</th>
                      <th className="py-2.5 font-medium">Status</th>
                      <th className="py-2.5 font-medium text-right">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 text-gray-800">
                    {activityList.map((row, idx) => (
                      <tr key={idx} className="hover:bg-gray-50/60 transition-colors">
                        <td className="py-3 font-semibold text-gray-900">{row.student}</td>
                        <td className="py-3">
                          <div className="flex items-center gap-1.5 text-gray-600">
                            {row.channelIcon === 'whatsapp' && (
                              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                            )}
                            {row.channelIcon === 'instagram' && (
                              <span className="w-2 h-2 rounded-full bg-pink-500 inline-block" />
                            )}
                            {row.channelIcon === 'direct' && (
                              <span className="w-2 h-2 rounded-full bg-blue-500 inline-block" />
                            )}
                            {row.channelIcon === 'telegram' && (
                              <span className="w-2 h-2 rounded-full bg-sky-500 inline-block" />
                            )}
                            <span>{row.channel}</span>
                          </div>
                        </td>
                        <td className="py-3">
                          {row.status === 'Registered' ? (
                            <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                              Registered
                            </span>
                          ) : (
                            <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-amber-50 text-amber-700 border border-amber-200">
                              Clicked
                            </span>
                          )}
                        </td>
                        <td className="py-3 text-right text-gray-500">{row.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
