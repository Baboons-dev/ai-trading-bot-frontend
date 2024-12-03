import axios from "../axios";
import { TwitterBot, TwitterConnectResponse, TwitterCallbackResponse } from "@/types/bot";

export const createBot = async (
  data: Pick<TwitterBot, "name" | "description">
): Promise<TwitterBot> => {
  const response = await axios.post<TwitterBot>("/api/bot/", data);
  return response.data;
};

export const getBots = async (): Promise<TwitterBot[]> => {
  const response = await axios.get<TwitterBot[]>("/api/bot/");
  return response.data;
};

export const updateBot = async (
  id: number,
  data: Partial<TwitterBot>
): Promise<TwitterBot> => {
  const response = await axios.patch<TwitterBot>(`/api/bot/${id}/`, data);
  return response.data;
};

export const deleteBot = async (id: number): Promise<void> => {
  await axios.delete(`/api/bot/${id}/`);
};

export const toggleBotActive = async (
  id: number
): Promise<TwitterBot> => {
  const response = await axios.post<TwitterBot>(
    `/api/bot/${id}/toggle_active/`
  );
  return response.data;
};

export const connectTwitter = async (
  id: number
): Promise<TwitterConnectResponse> => {
  const response = await axios.post<TwitterConnectResponse>(
    `/api/bot/${id}/connect_twitter/`
  );
  return response.data;
};

export const checkBotStatus = async (
  botId: number
): Promise<TwitterBot> => {
  const response = await axios.get<TwitterBot>(
    `/api/bot/${botId}/`
  );
  return response.data;
};

export const completeTwitterAuth = async (
  data: {
    oauth_token: string;
    oauth_verifier: string;
    bot_id: string;
  }
): Promise<TwitterCallbackResponse> => {
  const response = await axios.post<TwitterCallbackResponse>(
    `/api/bot/complete_twitter_auth/`,
    data
  );
  return response.data;
};
