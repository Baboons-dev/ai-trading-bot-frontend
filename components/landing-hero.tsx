"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function LandingHero() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 text-center">
      <div className="space-y-6 max-w-4xl">
        <h1 className="text-4xl font-bold sm:text-6xl lg:text-7xl">
          Automate Your Twitter with
          <span className="text-primary block">Solana Transactions</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Create custom Twitter bots that automatically post based on your SOL wallet activity.
          Perfect for NFT creators, traders, and crypto enthusiasts.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="gap-2">
            <Link href="/signup">
              Get Started
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/login">
              Sign In
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}