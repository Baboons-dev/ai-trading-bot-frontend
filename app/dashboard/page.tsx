"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Twitter,
  BarChart3,
  MessageCircle,
  Users,
  Repeat2,
  ArrowLeft,
  Settings,
  UserCircle,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Image from "next/image";
import { useAuthStore } from "@/lib/store/use-store";
import { toast, useToast } from "@/components/ui/use-toast";
import { useRouter, useSearchParams } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState, useEffect } from "react";
import { completeTwitterAuth, getBots } from "@/api/apiCalls/bot";
import { Suspense } from "react";
import {
  FetchTwitterStats,
  GetTwitterStats,
  TriggerGenerateTweet,
} from "@/api/apiCalls/user";
import { TwitterStats } from "@/types/user";

function timeAgo(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const secondsAgo = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (secondsAgo < 60) return `${secondsAgo}s ago`;
  const minutesAgo = Math.floor(secondsAgo / 60);
  if (minutesAgo < 60) return `${minutesAgo}m ago`;
  const hoursAgo = Math.floor(minutesAgo / 60);
  if (hoursAgo < 24) return `${hoursAgo}h ago`;
  const daysAgo = Math.floor(hoursAgo / 24);
  if (daysAgo < 30) return `${daysAgo}d ago`;
  const monthsAgo = Math.floor(daysAgo / 30);
  if (monthsAgo < 12) return `${monthsAgo}mo ago`;
  return `${Math.floor(monthsAgo / 12)}y ago`;
}

function TwitterAuthHandler() {
  const { toast } = useToast();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleTwitterCallback = async () => {
      const oauth_verifier = searchParams.get("oauth_verifier");
      const oauth_token = searchParams.get("oauth_token");
      const bot_id = localStorage.getItem("twitter_connect_bot_id");

      if (oauth_verifier && oauth_token && bot_id) {
        try {
          const response = await completeTwitterAuth({
            oauth_verifier,
            oauth_token,
            bot_id,
          });

          if (response.status === "success") {
            toast({
              title: "Success",
              description: "Twitter successfully connected!",
            });
          }
        } catch (error: any) {
          console.error("Twitter connection error:", error);
          toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to connect Twitter account",
          });
        } finally {
          localStorage.removeItem("twitter_connect_bot_id");
        }
      }
    };

    handleTwitterCallback();
  }, [searchParams, toast]);

  return null;
}

export default function Dashboard() {
  const { setToken } = useAuthStore();
  const router = useRouter();
  const [id, setId] = useState<string | null>(null);
  const [twitterStats, setTwitterStats] = useState<TwitterStats | null>(null);

  useEffect(() => {
    const fetchBotId = async () => {
      try {
        const bots = await getBots();
        if (bots.length > 0) {
          const botId = bots[0].id.toString();
          localStorage.setItem("bot_id", botId);
          setId(botId);
        }
      } catch (error) {
        console.error("Failed to fetch bots:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to fetch bot information",
        });
      }
    };

    fetchBotId();
  }, []);

  useEffect(() => {
    const fetchTwitterStats = async () => {
      if (!id) return;

      try {
        await FetchTwitterStats(Number(id));
      } catch (error: any) {
        if (error?.response?.status !== 429) {
          console.error("Failed to fetch latest Twitter stats:", error);
        }
      }

      try {
        const stats = await GetTwitterStats(Number(id));
        setTwitterStats(stats);
      } catch (error) {
        console.error("Failed to fetch stored Twitter stats:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to fetch Twitter stats",
        });
      }
    };

    if (id) {
      fetchTwitterStats();
      const interval = setInterval(fetchTwitterStats, 30 * 60 * 1000);

      return () => clearInterval(interval);
    }
  }, [id]);

  const handleLogout = () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("refresh_token");
      document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
      setToken(null);

      router.push("/login");

      toast({
        title: "Success",
        description: "Logged out successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to logout",
      });
    }
  };

  const handleGenerateTweet = async () => {
    if (!id) return;

    try {
      await TriggerGenerateTweet(Number(id));
      toast({
        title: "Success",
        description: "Tweet generation started",
      });
    } catch (error) {
      console.error("Failed to generate tweet:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate tweet",
      });
    }
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="min-h-screen p-8">
        <TwitterAuthHandler />
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image src={"/logo.svg"} alt={"logo"} width={28} height={28} />
              <h1 className="text-2xl font-bold">TechBot Dashboard</h1>
            </div>
            <div className="flex items-center gap-3">
              <Button
                onClick={handleGenerateTweet}
                variant="outline"
                className="gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                Generate Tweet
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <UserCircle className="w-4 h-4" />
                    Profile
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem
                    onClick={() => router.push(`/bot-settings/${id}`)}
                  >
                    <Twitter className="w-4 h-4 mr-2" />
                    Bot Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-destructive focus:text-destructive"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button variant="outline" className="gap-2">
                <Twitter className="w-4 h-4" />
                View on Twitter
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="p-4 bg-secondary/50 backdrop-blur">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground">
                  Total Tweets
                </span>
              </div>
              <p className="text-2xl font-bold mt-2">
                {twitterStats?.total_tweets || 0}
              </p>
            </Card>

            <Card className="p-4 bg-secondary/50 backdrop-blur">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground">Followers</span>
              </div>
              <p className="text-2xl font-bold mt-2">
                {twitterStats?.total_followers || 0}
              </p>
            </Card>

            <Card className="p-4 bg-secondary/50 backdrop-blur">
              <div className="flex items-center gap-2">
                <Repeat2 className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground">Retweets</span>
              </div>
              <p className="text-2xl font-bold mt-2">
                {twitterStats?.total_retweets || 0}
              </p>
            </Card>

            <Card className="p-4 bg-secondary/50 backdrop-blur">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground">
                  Engagement Rate
                </span>
              </div>
              <p className="text-2xl font-bold mt-2">
                {twitterStats?.engagement_rate || 0}%
              </p>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="col-span-3 p-6 bg-secondary/50 backdrop-blur">
              <h2 className="text-lg font-semibold mb-4">Recent Tweets</h2>
              <div className="space-y-4">
                {twitterStats?.recent_tweets?.map((tweet, index) => (
                  <Card key={index} className="p-4 bg-muted">
                    <p className="text-sm mb-2">{tweet.text}</p>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Likes: {tweet.metrics.like_count}</span>
                      <span>{timeAgo(tweet.created_at)}</span>
                    </div>
                  </Card>
                )) || (
                  <Card className="p-4 bg-muted">
                    <p className="text-sm text-muted-foreground">
                      No tweets available
                    </p>
                  </Card>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Suspense>
  );
}
