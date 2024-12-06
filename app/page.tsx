'use client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { LandingHero } from '@/components/landing-hero';
import { LandingNavbar } from '@/components/landing-navbar';
import Image from 'next/image';
import logo_img from '@/assets/images/logo.svg';
import home_img from '@/assets/images/home_img.png';
import Icons from '@/config/icon';
import useUtilBreakpoint from '@/utils/useUtilBreakpoint';

export default function Home() {
  const { XS, SM, MD, LG, XL, XXL } = useUtilBreakpoint();

  return (
    <main className="Homepage mx-auto min-h-screen flex justify-center items-center md:px-[40px] px-[20px] py-[60px]">
      <div className="max-w-3xl mx-auto text-center">
        <div className="flex items-center justify-center">
          <Image src={logo_img} alt={'logo'} width={231} height={9999} />
        </div>

        <p className="font-roboto text-[16px] text-[#ffffffbf] font-[300] leading-[normal] tracking-[normal] mt-[20px] mx-[auto] max-w-[540px]">
          Create AI-powered Twitter bots with unique personalities and watch
          them engage with your audience
        </p>

        <div
          className="grid mt-[40px] mx-auto"
          style={{
            gridTemplateColumns: `repeat(${MD ? 2 : 1}, minmax(0, 1fr))`,
            maxWidth: `${MD ? '100%' : '500px'}`,
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
                Create Own Agents
              </h3>
              <p className="text-[12px] font-roboto text-[#ffffff99] font-[300] leading-[normal] tracking-[normal] text-start">
                Be the first to deploy AI Agents, gaining visibility and setting
                the gold standard for innovation.
              </p>
            </div>
            <div className="row-item flex flex-col gap-[5px]">
              <h3 className="text-[14px] text-[#ffffff] font-[600] leading-[normal] tracking-[normal] text-start">
                Create Own Agents
              </h3>
              <p className="text-[12px] font-roboto text-[#ffffff99] font-[300] leading-[normal] tracking-[normal] text-start">
                Be the first to deploy AI Agents, gaining visibility and setting
                the gold standard for innovation.
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
    </main>
  );
}
