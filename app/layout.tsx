import './globals.css';
import type { Metadata } from 'next';
import { Roboto, Tektur } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
});

const tektur = Tektur({
  subsets: ['latin'],
  variable: '--font-tektur',
});

export const metadata: Metadata = {
  title: 'TweetForge - AI Twitter Bot Creator',
  description: 'Create and manage your AI-powered Twitter bots',
};

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
    <body className={`${roboto.variable} ${tektur.variable} font-sans`}>
    <div className={`gradient-bg min-h-screen font-tektur`}>
      {children}
    </div>
    <Toaster />
    </body>
    </html>
  );
}
