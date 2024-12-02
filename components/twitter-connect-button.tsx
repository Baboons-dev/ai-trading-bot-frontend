'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Twitter } from "lucide-react";
import { TwitterBot } from "@/types/bot";
import { toast } from "sonner";
import { connectTwitter } from "@/api/apiCalls/bot";

interface TwitterConnectButtonProps {
  bot: TwitterBot;
  onSuccess: (bot: TwitterBot) => void;
}

export function TwitterConnectButton({
  bot,
  onSuccess,
}: TwitterConnectButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleConnect = async () => {
    try {
      setLoading(true);
      localStorage.setItem('twitter_connect_bot_id', bot.id.toString());
      
      const { redirect_url } = await connectTwitter(bot.id);
      if (redirect_url) {
        window.location.href = redirect_url;
      }
    } catch (error) {
      console.error("Error connecting Twitter:", error);
      toast.error("Failed to connect Twitter");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button
      variant="outline"
      className={`w-full ${bot.twitter_username ? 'text-green-600 hover:text-green-600 border-green-600' : ''}`}
      onClick={handleConnect}
      disabled={bot.twitter_username ? true : false}
    >
      <Twitter className="h-4 w-4 mr-2" />
      {loading ? "Connecting..." : bot.twitter_username ? `Connected: @${bot.twitter_username}` : "Connect Twitter"}
    </Button>
  );
}
