import { BaseModel } from './base';

export interface TwitterBot extends BaseModel {
  id: number;
  user: number;
  name: string;
  description: string;
  twitter_account_id?: string;
  twitter_username?: string;
  access_token?: string;
  access_token_secret?: string;
  is_active: boolean;
}

export interface TwitterConnectResponse {
  redirect_url: string;
}

export interface TwitterCallbackResponse {
  status: 'success';
  bot: TwitterBot;
}