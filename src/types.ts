export enum UserRole {
  DEVELOPER = 'developer',
  SPONSOR = 'sponsor',
  CLIENT = 'client',
}

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
  isVouched: boolean;
  rating: number;
  vouchCount: number;
  totalEarnings: number;
  createdAt: number;
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
}

export interface Vouch {
  id: string;
  fromSponsorId: string;
  toDeveloperId: string;
  comment: string;
  rating: number; // 1-5
  createdAt: number;
}

export interface Transaction {
  id: string;
  userId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
  method: 'Hawal' | 'Bank' | 'Crypto';
  reference?: string;
  createdAt: number;
}
