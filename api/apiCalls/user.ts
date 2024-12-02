import { axios } from "..";
import { User, LoginCredentials, SignupCredentials, AuthResponse } from "@/types/user";

export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>("/api/user/login/", credentials);
  return response.data;
};

export const signup = async (credentials: SignupCredentials): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>("/api/user/signup/", credentials);
  return response.data;
};

export const GetUser = async (): Promise<User> => {
  const response = await axios.get<User>("/api/user/current/");
  return response.data;
};