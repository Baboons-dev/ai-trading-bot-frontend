import Link from "next/link";
import { Bot } from "lucide-react";
import { Button } from "@/components/ui/button";

export function LandingNavbar() {
  return (
    <div className="fixed top-0 w-full h-16 px-4 border-b shadow-sm bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center justify-between h-full max-w-6xl mx-auto">
        <Link href="/" className="flex items-center gap-2">
          <Bot className="w-8 h-8" />
          <span className="font-bold text-xl">SOL Bot</span>
        </Link>
        <div className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/login">Sign in</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Get Started</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}