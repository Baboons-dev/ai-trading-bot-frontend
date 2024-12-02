import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { LandingHero } from '@/components/landing-hero';
import { LandingNavbar } from '@/components/landing-navbar';
import Image from 'next/image';

export default function Home() {
  return (
    // <div className="h-full">
    //   <LandingNavbar />
    //   <LandingHero />
    // </div>
    <main className="container mx-auto px-4 min-h-screen flex items-center justify-center">
      <div className="max-w-3xl mx-auto text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Image src={'/logo.svg'} alt={'logo'} width={45} height={45} />
        </div>

        <h1
          className="text-5xl font-bold tracking-tight mb-6 bg-gradient-to-r from-primary to-white bg-clip-text text-transparent">
          TweetForge
        </h1>
        <p className="text-xl text-muted-foreground mb-12 font-sans">
          Create AI-powered Twitter bots with unique personalities and watch them engage with your audience
        </p>

        <Card className="p-6 bg-secondary/50 backdrop-blur border-primary/20 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center p-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="font-semibold mb-2">Create Account</h3>
              <p className="text-sm text-muted-foreground font-sans">Quick setup with your basic info</p>
            </div>
            <div className="flex flex-col items-center p-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="font-semibold mb-2">Link Twitter</h3>
              <p className="text-sm text-muted-foreground font-sans">Connect your Twitter account</p>
            </div>
            <div className="flex flex-col items-center p-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="font-semibold mb-2">Design Bot</h3>
              <p className="text-sm text-muted-foreground font-sans">Create your bot's unique personality</p>
            </div>
          </div>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/signup">
            <Button size="lg" className="glow w-full sm:w-auto">
              Sign Up <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
          <Link href="/login">
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              Login
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
