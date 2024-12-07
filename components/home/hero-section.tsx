'use client';

import Link from 'next/link';
import Icons from '@/config/icon';

export function HeroSection() {
  return (
    <section className="max-w-3xl mx-auto text-center px-4 py-16">
      <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-800">
        Win a Cybertruck
      </h1>
      <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
        Refer friends to earn points and get a chance to win a Tesla Cybertruck
      </p>
      
      <div className="flex justify-center items-center gap-[20px]">
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
    </section>
  );
}