import { BaseModel } from "./base";

export interface User extends BaseModel {
  id: number;
  email: string;
  full_name?: string;
  wallet_address?: string | null;
  username?: string;
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

export interface SignupCredentials {
  email: string;
  full_name: string;
  password: string;
}

export interface AuthResponse {
  status: "success" | "error";
  data: {
    user_id: number;
    wallet_address: string | null;
    email: string;
    exp: number;
    access_token: string;
    refresh_token: string;
  };
}
