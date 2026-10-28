export interface PassportData {
  passportId: string;
  studentName: string;
  branch: string;
  experienceLevel: string;
  domain: string;
  placementTarget: string;
  title: string;
  problemStatement: string;
  shortDescription: string;
  suggestedFeatures: string[];
  relevanceExplanation: string;
  workshopBuildPart: string;
  techStack: string[];
  resumeBullets: string[];
  difficulty: string;
  viabilityScore: number;
  estimatedHours: string;
  generatedAt: string;
  note?: string;
  generationLatencyMs?: number;
}

export interface ChannelMetric {
  id: string;
  name: string;
  type: 'Organic Viral' | 'Guerilla Outreach' | 'Paid Seed' | 'Organic Placement';
  registrations: number;
  spendInr: number;
  cacInr: number;
  conversionRate: number;
  kFactor: number;
  status: string;
  trend: string;
}

export interface DayProgress {
  day: string;
  dateLabel: string;
  target: number;
  actual?: number;
  cum?: number;
  projected?: number;
  spentInr?: number;
  squadSignups?: number;
  directSignups?: number;
}

export interface Recommendation {
  id: string;
  title: string;
  priority: 'High Impact' | 'Quick Win' | 'Conversion Booster' | 'Attendance & Retention';
  rationale: string;
  expectedGain: string;
  costImpact: string;
  actionLabel: string;
  applied?: boolean;
}

export interface GrowthStats {
  campaign: {
    name: string;
    targetRegistrations: number;
    currentRegistrations: number;
    targetDays: number;
    currentDay: number;
    totalBudgetInr: number;
    spentBudgetInr: number;
    remainingBudgetInr: number;
    blendedCacInr: number;
    organicSharePct: number;
    viralKFactor: number;
    targetCompletionPct: number;
    totalVisitors: number;
    overallConversionRate: number;
  };
  channels: ChannelMetric[];
  dailyTimeline: DayProgress[];
  squadMetrics: {
    totalSquadsFormed: number;
    averageSquadSize: number;
    topReferringColleges: { college: string; signups: number; location: string }[];
    sourcesBreakdown: { channel: string; percentage: number; count: number }[];
  };
  recommendations: Recommendation[];
}

export interface ReferralMember {
  id: string;
  name: string;
  college: string;
  branch: string;
  timestamp: string;
  isSimulated: boolean;
  channel: 'WhatsApp' | 'LinkedIn' | 'Discord' | 'Direct QR' | 'College Portal';
  status: 'Registered & Confirmed' | 'Invite Link Clicked' | 'Passport Created';
}

export interface RegistrationFormData {
  fullName: string;
  email: string;
  college: string;
  branch: string;
  gradYear: string;
  referralCode?: string;
}
