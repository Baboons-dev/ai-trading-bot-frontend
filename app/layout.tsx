import './globals.css';
import type { Metadata } from 'next';
import { Roboto, Tektur } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import ContextComp from '@/context/ContextComp';
import CasperProvider from '@/context/CasperProvider';

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
  // metadataBase: new URL('https://app.baboons.tech/'),
  title: 'Casper AI',
  description:
    'Create AI-powered Twitter bots with unique personalities and watch them engage with your audience.',
  openGraph: {
    type: 'website',
    // url: 'https://app.baboons.tech/',
    title: 'Casper AI',
    description:
      'Create AI-powered Twitter bots with unique personalities and watch them engage with your audience.',
    // images: [
    //   {
    //     url: 'https://url.jpg',
    //     width: 1200,
    //     height: 628,
    //     alt: 'CoverImg',
    //   },
    // ],
  },
  twitter: {
    card: 'summary_large_image',
    // site: 'https://app.baboons.tech/',
    title: 'Casper AI',
    description:
      'Create AI-powered Twitter bots with unique personalities and watch them engage with your audience.',
    // images: [
    //   {
    //     url: 'https://url.jpg',
    //     width: 1200,
    //     height: 628,
    //     alt: 'CoverImg',
    //   },
    // ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${roboto.variable} ${tektur.variable} font-roboto bg-[#0A0A0A]`}
      >
        <div className={`Layout min-h-screen font-tektur`} id="root">
          <ContextComp>
            <CasperProvider>{children}</CasperProvider>
          </ContextComp>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
