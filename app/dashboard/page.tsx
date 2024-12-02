"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DashboardHeader } from "@/components/dashboard-header";
import { CreateBotDialog } from "@/components/create-bot-dialog";
import { BotCard } from "@/components/bot-card";
import { TwitterBot } from "@/types/bot";
import {
  createBot,
  getBots,
  deleteBot,
  toggleBotActive,
  updateBot,
  completeTwitterAuth,
} from "@/api/apiCalls/bot";
import { useToast } from "@/components/ui/use-toast";

function DashboardContent() {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [bots, setBots] = useState<TwitterBot[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editBot, setEditBot] = useState<TwitterBot | undefined>();

  const fetchBots = async () => {
    try {
      setLoading(true);
      const botsData = await getBots();
      console.log("Fetched bots:", botsData);
      setBots(Array.isArray(botsData) ? botsData : []);
    } catch (error) {
      console.error("Error fetching bots:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch bots",
      });
      setBots([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBots();
  }, []);

  useEffect(() => {
    const handleTwitterCallback = async () => {
      const oauth_verifier = searchParams.get('oauth_verifier');
      const oauth_token = searchParams.get('oauth_token');
      const bot_id = localStorage.getItem('twitter_connect_bot_id');
      
      if (oauth_verifier && oauth_token && bot_id) {
        try {
          const response = await completeTwitterAuth({
            oauth_verifier,
            oauth_token,
            bot_id
          });
          
          console.log(response);
          if (response.status === 'success') {
            setBots(prevBots => 
              prevBots.map(b => 
                b.id === parseInt(bot_id) ? response.bot : b
              )
            );
            
            await fetchBots();
            
            toast({
              title: "Success",
              description: "Twitter successfully connected!"
            });
          }
        } catch (error: any) {
          console.error('Twitter connection error:', error);
          toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to connect Twitter account"
          });
        } finally {
          localStorage.removeItem('twitter_connect_bot_id');
          router.replace('/dashboard');
        }
      }
    };

    handleTwitterCallback();
  }, [searchParams, router, toast, fetchBots]);

  const handleCreateBot = async (data: {
    name: string;
    description: string;
    walletAddress: string;
  }) => {
    try {
      const response = await createBot({
        name: data.name,
        description: data.description,
        wallet_address: data.walletAddress,
      });
      
      if (response) {
        // First close the dialog
        setDialogOpen(false);
        // Then fetch fresh data
        await fetchBots();
        
        // Finally show success message
        toast({
          title: "Success",
          description: "Bot created successfully",
        });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.response?.data?.message || "Failed to create bot",
      });
    }
  };

  const handleDeleteBot = async (bot: TwitterBot) => {
    try {
      await deleteBot(bot.id);
      setBots(bots.filter((b) => b.id !== bot.id));
      toast({
        title: "Success",
        description: "Bot deleted successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete bot",
      });
    }
  };

  const handleToggleBot = async (bot: TwitterBot) => {
    try {
      if (!bot.is_active && !bot.twitter_username) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Please connect Twitter before activating the bot",
        });
        return;
      }

      const response = await toggleBotActive(bot.id);
      setBots(bots.map((b) => (b.id === bot.id ? response.data : b)));

      toast({
        title: "Success",
        description: `Bot ${
          response.data.is_active ? "activated" : "deactivated"
        } successfully`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to toggle bot status",
      });
    }
  };

  const handleUpdateBot = async (data: {
    name: string;
    description: string;
    walletAddress: string;
  }) => {
    if (!editBot?.id) {
      console.error("No bot selected for editing");
      toast({
        variant: "destructive",
        title: "Error",
        description: "No bot selected for editing",
      });
      return;
    }

    try {
      const updatedBot = await updateBot(editBot.id, {
        name: data.name,
        description: data.description,
        wallet_address: data.walletAddress,
      });

      setBots((prevBots) =>
        prevBots.map((b) => (b.id === editBot.id ? updatedBot : b))
      );
      setDialogOpen(false);
      setEditBot(undefined);

      toast({
        title: "Success",
        description: "Bot updated successfully",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.response?.data?.message || "Failed to update bot",
      });
    }
  };

  const handleCreateOrUpdateBot = (data: {
    name: string;
    description: string;
    walletAddress: string;
  }) => {
    if (editBot) {
      handleUpdateBot(data);
    } else {
      handleCreateBot(data);
    }
  };

  const handleTwitterConnect = (updatedBot: TwitterBot) => {
    setBots((prevBots) =>
      prevBots.map((b) => (b.id === updatedBot.id ? updatedBot : b))
    );
  };

  return (
    <>
      <div className="min-h-screen bg-background">
        <DashboardHeader />
        <main className="container mx-auto p-4 pt-24">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Your Bots</h1>
            <Button onClick={() => setDialogOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Create Bot
            </Button>
          </div>

          {loading ? (
            <div>Loading...</div>
          ) : !bots || bots.length === 0 ? (
            <div className="text-center text-muted-foreground">
              No bots yet. Create one to get started!
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {bots.map((bot) => (
                <BotCard
                  key={bot.id}
                  bot={bot}
                  onToggle={() => handleToggleBot(bot)}
                  onDelete={() => handleDeleteBot(bot)}
                  onEdit={(bot) => {
                    setEditBot(bot);
                    setDialogOpen(true);
                  }}
                  onTwitterConnect={handleTwitterConnect}
                />
              ))}
            </div>
          )}

          <CreateBotDialog
            open={dialogOpen}
            onOpenChange={(open) => {
              setDialogOpen(open);
              if (!open) setEditBot(undefined);
            }}
            onCreate={handleCreateOrUpdateBot}
            editBot={editBot}
          />
        </main>
      </div>
    </>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
