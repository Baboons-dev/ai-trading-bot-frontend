"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Bot, Twitter, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import {
  createBot,
  connectTwitter,
  completeTwitterAuth,
  getBots,
} from "@/api/apiCalls/bot";
import { useToast } from "@/components/ui/use-toast";
import { Suspense } from "react";
import { TwitterBot } from "@/types/bot";

function SetupForm() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [botCreated, setBotCreated] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [userBots, setUserBots] = useState<TwitterBot[]>([]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const [fieldsDisabled, setFieldsDisabled] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const bot = await createBot({
        name: formData.name,
        description: formData.description,
      });

      console.log("Bot creation response:", bot);

      if (!bot || !bot.id) {
        throw new Error("No bot ID received in response");
      }

      localStorage.setItem("twitter_connect_bot_id", bot.id.toString());

      try {
        const twitterResponse = await connectTwitter(bot.id);
        console.log("Twitter connect response:", twitterResponse);

        if (twitterResponse && twitterResponse.redirect_url) {
          window.location.href = twitterResponse.redirect_url;
        } else {
          throw new Error("No redirect URL received from Twitter");
        }
      } catch (twitterError) {
        console.error("Twitter connection error:", twitterError);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to connect to Twitter",
        });
        setLoading(false);
      }
    } catch (error: any) {
      console.error("Bot creation error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description:
          error.response?.data?.message ||
          error.message ||
          "Failed to create bot",
      });
      setLoading(false);
    }
  };

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
            const bots = await getBots();
            setUserBots(bots);
            setBotCreated(true);
            if (bots.length > 0) {
              const createdBot = bots.find(
                (bot) => bot.id.toString() === bot_id
              );
              if (createdBot) {
                setFormData({
                  name: createdBot.name,
                  description: createdBot.description,
                });
              }
            }
            setFieldsDisabled(true);
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

  return (
    <main className="container mx-auto px-4 min-h-screen py-12">
      <Card className="max-w-2xl mx-auto p-6 bg-secondary/50 backdrop-blur border-primary/20">
        <div className="flex items-center gap-2 mb-6">
          <Image src={"/logo.svg"} alt={"logo"} width={28} height={28} />
          <h1 className="text-2xl font-bold">Bot Setup</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-4">
            <Label htmlFor="name">Bot Name</Label>
            <Textarea
              id="name"
              placeholder="Enter your bot's name..."
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              disabled={fieldsDisabled}
              required
            />
          </div>

          <div className="space-y-4">
            <Label htmlFor="personality">Bot Description</Label>
            <Textarea
              id="personality"
              placeholder="Describe your bot's personality and tone..."
              className="h-32"
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              disabled={fieldsDisabled}
              required
            />
            <p className="text-sm text-muted-foreground">
              Example: "A witty tech enthusiast who loves making programming
              puns and shares daily coding tips with a dash of humor."
            </p>
          </div>

          <div className="flex items-center justify-end pt-4">
            <Button
              type="submit"
              disabled={loading}
              onClick={botCreated ? () => router.push("/dashboard") : undefined}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {botCreated ? "Loading..." : "Creating Bot..."}
                </>
              ) : botCreated ? (
                "Next"
              ) : (
                "Create Bot"
              )}
            </Button>
          </div>
        </form>
      </Card>
    </main>
  );
}

export default function Setup() {
  return (
    <Suspense
      fallback={
        <main className="container mx-auto px-4 min-h-screen py-12">
          <Card className="max-w-2xl mx-auto p-6 bg-secondary/50 backdrop-blur border-primary/20">
            <div className="flex items-center justify-center">
              <Loader2 className="w-8 h-8 animate-spin" />
            </div>
          </Card>
        </main>
      }
    >
      <SetupForm />
    </Suspense>
  );
}
