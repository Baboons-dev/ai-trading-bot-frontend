'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Bot, Twitter, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Setup() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      router.push('/dashboard');
    }, 1500);
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
            <div className="flex justify-between items-center">
              <Label>Twitter Account</Label>
              <Button variant="outline" size="sm" className="gap-2">
                <Twitter className="w-4 h-4" />
                Connect Twitter
              </Button>
            </div>
            <Card className="p-4 bg-muted">
              <p className="text-sm text-muted-foreground">Not connected</p>
            </Card>
          </div>

          <div className="space-y-4">
            <Label htmlFor="personality">Bot Personality</Label>
            <Textarea
              id="personality"
              placeholder="Describe your bot's personality and tone..."
              className="h-32"
              required
            />
            <p className="text-sm text-muted-foreground">
              Example: "A witty tech enthusiast who loves making programming puns and shares daily coding tips with a
              dash of humor."
            </p>
          </div>

          <div className="flex items-center justify-between pt-4">
            <Link href="/signup">
              <Button variant="ghost">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
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
