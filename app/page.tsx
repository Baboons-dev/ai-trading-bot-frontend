'use client';

import { HeroSection } from '@/components/home/hero-section';
import { LeaderboardSection } from '@/components/home/leaderboard-section';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icons from '@/config/icon';
import useUtilBreakpoint from '@/utils/useUtilBreakpoint';
import Image from 'next/image';
import Link from 'next/link';
import logo_img from '@/assets/images/logo.svg';
import home_img from '@/assets/images/home_img.png';

export default function Home() {
  const { XS, SM, MD, LG, XL, XXL } = useUtilBreakpoint();

  return (
    <main className="Homepage min-h-screen">
      {/* Logo Section */}
      <div className="flex items-center justify-center pt-8">
        <Image src={logo_img} alt={'logo'} width={231} height={9999} />
      </div>

      {/* Hero Section */}
      <HeroSection />

      {/* Features Section - Commented out
      <div className="container mx-auto px-4 py-20">
        <div
          className="grid mx-auto"
          style={{
            gridTemplateColumns: `repeat(${MD ? 2 : 1}, minmax(0, 1fr))`,
            maxWidth: `${MD ? '100%' : '500px'}`,
            gap: '2rem',
          }}
        >
          <div className="img-wrap">
            <Image src={home_img} alt={'home_img'} width={999} height={250} />
          </div>

          <div className="text-wrap flex flex-col justify-center bg-[#101010] md:px-[40px] px-[30px] py-[30px] gap-[15px]">
            <div className="row-item flex flex-col gap-[5px]">
              <h3 className="text-[14px] text-[#ffffff] font-[600] leading-[normal] tracking-[normal] text-start">
                Create Own Agents
              </h3>
              <p className="text-[12px] font-roboto text-[#ffffff99] font-[300] leading-[normal] tracking-[normal] text-start">
                Be the first to deploy AI Agents, gaining visibility and setting
                the gold standard for innovation.
              </p>
            </div>
            <div className="row-item flex flex-col gap-[5px]">
              <h3 className="text-[14px] text-[#ffffff] font-[600] leading-[normal] tracking-[normal] text-start">
                Win Rewards
              </h3>
              <p className="text-[12px] font-roboto text-[#ffffff99] font-[300] leading-[normal] tracking-[normal] text-start">
                Refer friends and earn points to win amazing prizes including a Tesla Cybertruck.
              </p>
            </div>
            <div className="row-item flex flex-col gap-[5px]">
              <h3 className="text-[14px] text-[#ffffff] font-[600] leading-[normal] tracking-[normal] text-start">
                Join Community
              </h3>
              <p className="text-[12px] font-roboto text-[#ffffff99] font-[300] leading-[normal] tracking-[normal] text-start">
                Be part of an exclusive community of innovators and early adopters.
              </p>
            </div>
          </div>
        </div>

        <div className="btn-wrap flex justify-center items-start mt-[40px] gap-[20px]">
          <Link className="action-btn" href="/signup">
            <button>
              <Icons name="btnL" />
              <div className="inner px-[20px] sm:min-w-[140px] min-w-[40px]">
                <p className="font-tektur text-[14px] text-[#ffffff] font-[400] leading-[normal] tracking-[normal]">
                  Sign up
                </p>
              </div>
              <Icons name="btnR" />
            </button>
          </Link>

          <Link className="action-btn px-[40px]" href="/login">
            <button>
              <p className="font-tektur text-[14px] text-[#ffffff] font-[400] leading-[normal] tracking-[normal]">
                Login
              </p>
            </button>
          </Link>
        </div>
      </div>
      */}

      {/* Leaderboard Section */}
      <LeaderboardSection />
    </main>
  );
}