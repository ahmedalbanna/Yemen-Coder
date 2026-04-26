export enum UserRole {
  DEVELOPER = 'developer',
  SPONSOR = 'sponsor', // Mentor/Vetter
  CLIENT = 'client',
  ADMIN = 'admin',
}

export type ExperienceLevel = 'junior' | 'mid' | 'senior' | 'expert';

export interface Profile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  bio?: string;
  location?: string;
  skills: string[];
  voiceUrl?: string; // URL to recorded audio portfolio
  githubUrl?: string;
  isVouched: boolean;
  rating: number;
  vouchCount: number;
  totalEarnings: number;
  createdAt: number;
  
  // Matching Engine & Levels
  experienceLevel: ExperienceLevel;
  preferredProjectTypes?: string[];
  assessmentScore?: number;
  
  // Gamification
  points: number;
  badges: string[];
  rank?: number; // Monthly rank
  
  // Client Vetting
  companyRegistrationNumber?: string;
  isVerifiedClient?: boolean;
  vettingStatus?: 'pending' | 'approved' | 'rejected';
  companyWebsite?: string;
}

export interface Job {
  id: string;
  title: string;
  description: string;
  budget: number;
  currency: string;
  companyName: string;
  tags: string[];
  postedAt: number;
  clientId: string;
  status: 'open' | 'in_progress' | 'completed' | 'cancelled';
  
  // Matching Engine
  requiredExperienceLevel?: ExperienceLevel;
  isVettedClient?: boolean;
  teamRequired?: boolean; // If it needs multiple roles
}

export interface Team {
  id: string;
  name: string;
  projectDescription: string;
  members: {
    userId: string;
    role: string; // e.g., 'Lead', 'UI', 'Backend'
  }[];
  jobId: string;
  createdAt: number;
}

export interface Vouch {
  id: string;
  fromSponsorId: string;
  toDeveloperId: string;
  comment: string;
  rating: number; // 1-5
  createdAt: number;
  codeReviewUrl?: string; // Link to review notes
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  pointsReward: number;
  difficulty: 'easy' | 'medium' | 'hard';
  type: 'code' | 'design' | 'voice_pitch';
  deadline: number;
}

export interface Transaction {
  id: string;
  userId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
  method: 'Hawal' | 'Bank' | 'Crypto';
  reference?: string;
  exchangeRate?: number;
  createdAt: number;
}
