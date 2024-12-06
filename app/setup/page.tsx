'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import { Suspense } from 'react';
import { showError } from '@/hooks/useToastMessages';
import { useState, useEffect } from 'react';
import { createBot, connectTwitter, getBots } from '@/api/apiCalls/bot';
import { useRouter } from 'next/navigation';

function SetupForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  useEffect(() => {
    const checkExistingBot = async () => {
      try {
        const bots = await getBots();
        if (bots.length > 0) {
          router.replace('/dashboard');
        }
      } catch (error) {}
    };

    checkExistingBot();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const bot = await createBot({
        name: formData.name,
        description: formData.description,
      });

      console.log('Bot creation response:', bot);

      if (!bot || !bot.id) {
        throw new Error('No bot ID received in response');
      }

      localStorage.setItem('twitter_connect_bot_id', bot.id.toString());

      try {
        const twitterResponse = await connectTwitter(bot.id);
        console.log('Twitter connect response:', twitterResponse);

        if (twitterResponse && twitterResponse.redirect_url) {
          window.location.href = twitterResponse.redirect_url;
        } else {
          throw new Error('No redirect URL received from Twitter');
        }
      } catch (twitterError) {
        console.error('Twitter connection error:', twitterError);
        showError('Failed to connect to Twitter');
        setLoading(false);
      }
    } catch (error: any) {
      console.error('Bot creation error:', error);
      showError(
        error.response?.data?.message ||
          error.message ||
          'Failed to create bot',
      );
      setLoading(false);
    }
  };

  return (
    <main className="container mx-auto px-4 min-h-screen py-12">
      <Card className="max-w-2xl mx-auto p-6 bg-secondary/50 backdrop-blur border-primary/20">
        <div className="flex items-center gap-2 mb-6">
          <Image src={'/logo.svg'} alt={'logo'} width={28} height={28} />
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
              required
            />
            <p className="text-sm text-muted-foreground">
              Example: "A witty tech enthusiast who loves making programming
              puns and shares daily coding tips with a dash of humor."
            </p>
          </div>

          <div className="flex items-center justify-end pt-4">
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating Bot...
                </>
              ) : (
                'Create Bot'
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
