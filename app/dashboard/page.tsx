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
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState, useEffect } from "react";

const data = [
  { name: "Mon", tweets: 4, engagement: 120 },
  { name: "Tue", tweets: 3, engagement: 98 },
  { name: "Wed", tweets: 5, engagement: 260 },
  { name: "Thu", tweets: 4, engagement: 380 },
  { name: "Fri", tweets: 3, engagement: 430 },
  { name: "Sat", tweets: 4, engagement: 520 },
  { name: "Sun", tweets: 5, engagement: 489 },
];

const recentTweets = [
  {
    id: 1,
    content:
      "Just discovered a new JavaScript trick that will blow your mind! 🤯 #CodeTips",
    engagement: 145,
    time: "2h ago",
  },
  {
    id: 2,
    content:
      "Why did the programmer quit his job? Because he didn't get arrays! 😄 #ProgrammingHumor",
    engagement: 89,
    time: "4h ago",
  },
  {
    id: 3,
    content:
      "Here's your daily reminder to commit your code and drink water! 💧 #DeveloperLife",
    engagement: 234,
    time: "6h ago",
  },
];

export default function Dashboard() {
  const { setToken } = useAuthStore();
  const { toast } = useToast();
  const router = useRouter();
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    const botId = localStorage.getItem("twitter_connect_bot_id");
    setId(botId);
  }, []);

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

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src={"/logo.svg"} alt={"logo"} width={28} height={28} />
            <h1 className="text-2xl font-bold">TechBot Dashboard</h1>
          </div>
          <div className="flex items-center gap-3">
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
            <p className="text-2xl font-bold mt-2">284</p>
          </Card>

          <Card className="p-4 bg-secondary/50 backdrop-blur">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">Followers</span>
            </div>
            <p className="text-2xl font-bold mt-2">1,249</p>
          </Card>

          <Card className="p-4 bg-secondary/50 backdrop-blur">
            <div className="flex items-center gap-2">
              <Repeat2 className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">Retweets</span>
            </div>
            <p className="text-2xl font-bold mt-2">892</p>
          </Card>

          <Card className="p-4 bg-secondary/50 backdrop-blur">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">
                Engagement Rate
              </span>
            </div>
            <p className="text-2xl font-bold mt-2">4.8%</p>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="col-span-2 p-6 bg-secondary/50 backdrop-blur">
            <h2 className="text-lg font-semibold mb-4">Engagement Overview</h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="name" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip
                    contentStyle={{
                      background: "rgba(0,0,0,0.8)",
                      border: "1px solid #333",
                      borderRadius: "4px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="engagement"
                    stroke="hsl(0 72.2% 50.6%)"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-6 bg-secondary/50 backdrop-blur">
            <h2 className="text-lg font-semibold mb-4">Recent Tweets</h2>
            <div className="space-y-4">
              {recentTweets.map((tweet) => (
                <Card key={tweet.id} className="p-4 bg-muted">
                  <p className="text-sm mb-2">{tweet.content}</p>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{tweet.engagement} engagements</span>
                    <span>{tweet.time}</span>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
