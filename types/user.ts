import { BaseModel } from './base';

export interface User extends BaseModel {
  id: number;
  email: string;
  full_name?: string;
  username?: string;
  telegram_id?: string;
  point?: number;
  refer_count?: number;
  referral_code?: number;
  refer_by?: number;
  is_active?: boolean;
  is_staff?: boolean;
  is_superuser?: boolean;
  last_login?: string;
  date_joined?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginWithWalletCredentials {
  publicKey: string;
  message: string;
  signedMessage: string;
}

export interface SignupCredentials {
  email: string;
  full_name: string;
  password: string;
  ref_code?: string;
}

export interface AuthResponse {
  status: 'success' | 'error';
  data: {
    user_id: number;
    email: string;
    exp: number;
    access_token: string;
    refresh_token: string;
  };
}

export interface TweetMetrics {
  like_count: number;
  quote_count: number;
  reply_count: number;
  retweet_count: number;
}

export interface Tweet {
  text: string;
  metrics: TweetMetrics;
  created_at: string;
}

export interface TwitterStats {
  id: number;
  total_tweets: number;
  total_followers: number;
  total_retweets: number;
  engagement_rate: number;
  recent_tweets: Tweet[];
  created_at: string;
  bot: number;
}
