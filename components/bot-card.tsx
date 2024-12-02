"use client";

import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Pencil, Trash2, Twitter, Wallet } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { TwitterBot } from "@/types/bot";
import { TwitterConnectButton } from "@/components/twitter-connect-button";
import { ClientOnly } from "@/components/client-only";

interface BotCardProps {
  bot: TwitterBot;
  onToggle: () => void;
  onDelete: () => void;
  onEdit: (bot: TwitterBot) => void;
  onTwitterConnect: (bot: TwitterBot) => void;
}

export function BotCard({ 
  bot, 
  onToggle, 
  onDelete, 
  onEdit,
  onTwitterConnect 
}: BotCardProps) {
  return (
    <ClientOnly>
      <Card className="overflow-hidden transition-all hover:shadow-lg">
        <div className="p-6 space-y-6">
          <div className="flex justify-between items-start">
            <div className="space-y-1.5">
              <h3 className="text-xl font-semibold tracking-tight">
                {bot.name}
              </h3>
              <p className="text-muted-foreground">{bot.description}</p>
            </div>
            <Switch
              checked={bot.is_active}
              onCheckedChange={onToggle}
              className="ml-4"
            />
          </div>

          <div className="space-y-4">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2.5 text-sm bg-primary/5 p-2.5 rounded-lg">
                <Twitter className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">Connected to:</span>
                <span className="font-medium">{bot.twitter_username}</span>
              </div>

              <div className="flex items-center gap-2.5 text-sm bg-primary/5 p-2.5 rounded-lg">
                <Wallet className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">Wallet:</span>
                <span className="font-medium truncate">
                  {bot.wallet_address}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="bg-secondary/50 p-3 rounded-lg">
                <div className="text-sm font-medium">Last Tweet</div>
                <div className="text-sm text-muted-foreground">
                  {/* {formatDistanceToNow(new Date(bot.last_tweet))} ago */}
                  N/A
                </div>
              </div>

              <div className="bg-secondary/50 p-3 rounded-lg">
                <div className="text-sm font-medium">Total Tweets</div>
                <div className="text-sm text-muted-foreground">
                  {/* {bot.tweets_count.toLocaleString()} */}
                  N/A
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex divide-x border-t">
          <Button
            variant="ghost"
            className="flex-1 rounded-none h-12 text-sm font-medium"
            onClick={() => onEdit(bot)}
          >
            <Pencil className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button
            variant="ghost"
            className="flex-1 rounded-none h-12 text-sm font-medium text-destructive hover:text-destructive"
            onClick={onDelete}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>

        {bot?.id && (
          <TwitterConnectButton 
            bot={bot}
            onSuccess={(updatedBot) => onTwitterConnect(updatedBot)}
          />
        )}
  
      </Card>
    </ClientOnly>
  );
}
