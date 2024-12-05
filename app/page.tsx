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

export default function Home() {
  return (
    <main className="Homepage mx-auto min-h-screen flex items-center justify-center px-[40px]">
      <div className="max-w-3xl mx-auto text-center">
        <div className="flex items-center justify-center">
          <Image src={logo_img} alt={'logo'} width={231} height={9999} />
        </div>

        <p className="font-roboto text-[16px] text-[#ffffffbf] font-[300] leading-[normal] tracking-[normal] mt-[20px] mx-[auto] max-w-[540px]">
          Create AI-powered Twitter bots with unique personalities and watch
          them engage with your audience
        </p>

        <div
          className="grid mt-[40px]"
          style={{ gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }}
        >
          <div className="img-wrap">
            <Image src={home_img} alt={'home_img'} width={999} height={250} />
          </div>

          <div className="text-wrap flex flex-col justify-center bg-[#101010] px-[40px] py-[30px] gap-[15px]">
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
              <div className="inner px-[20px] min-w-[140px]">
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
