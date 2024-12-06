'use client';
import useUtilBreakpoint from '@/utils/useUtilBreakpoint';
import Icons from '@/config/icon';
import { ArrowLeft, Twitter } from 'lucide-react';
import Image from 'next/image';
import { useAuthStore } from '@/lib/store/use-store';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useState, useEffect } from 'react';
import { completeTwitterAuth, getBots } from '@/api/apiCalls/bot';
import { Suspense } from 'react';
import {
  FetchTwitterStats,
  GetTwitterStats,
  TriggerGenerateTweet,
} from '@/api/apiCalls/user';
import { TwitterStats } from '@/types/user';
import logo_img from '@/assets/images/logo.svg';
import { showError, showSuccess } from '@/hooks/useToastMessages';

function timeAgo(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const secondsAgo = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (secondsAgo < 60) return `${secondsAgo}s ago`;
  const minutesAgo = Math.floor(secondsAgo / 60);
  if (minutesAgo < 60) return `${minutesAgo}m ago`;
  const hoursAgo = Math.floor(minutesAgo / 60);
  if (hoursAgo < 24) return `${hoursAgo}h ago`;
  const daysAgo = Math.floor(hoursAgo / 24);
  if (daysAgo < 30) return `${daysAgo}d ago`;
  const monthsAgo = Math.floor(daysAgo / 30);
  if (monthsAgo < 12) return `${monthsAgo}mo ago`;
  return `${Math.floor(monthsAgo / 12)}y ago`;
}

function TwitterAuthHandler() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleTwitterCallback = async () => {
      const oauth_verifier = searchParams.get('oauth_verifier');
      const oauth_token = searchParams.get('oauth_token');
      const bot_id = localStorage.getItem('twitter_connect_bot_id');

      if (oauth_verifier && oauth_token && bot_id) {
        try {
          const response = await completeTwitterAuth({
            oauth_verifier,
            oauth_token,
            bot_id,
          });

          if (response.status === 'success') {
            showSuccess('Twitter successfully connected!');
          }
        } catch (error: any) {
          console.error('Twitter connection error:', error);
          showError('Failed to connect Twitter account');
        } finally {
          localStorage.removeItem('twitter_connect_bot_id');
        }
      }
    };

    handleTwitterCallback();
  }, [searchParams]);

  return null;
}

export default function Dashboard() {
  const { setToken } = useAuthStore();
  const router = useRouter();
  const [id, setId] = useState<string | null>(null);
  const [twitterStats, setTwitterStats] = useState<TwitterStats | null>(null);

  useEffect(() => {
    const fetchBotId = async () => {
      try {
        const bots = await getBots();
        if (bots.length > 0) {
          const botId = bots[0].id.toString();
          localStorage.setItem('bot_id', botId);
          setId(botId);
        }
      } catch (error) {
        console.error('Failed to fetch bots:', error);
        showError('Failed to fetch bot information');
      }
    };

    fetchBotId();
  }, []);

  useEffect(() => {
    const fetchTwitterStats = async () => {
      if (!id) return;

      try {
        await FetchTwitterStats(Number(id));
      } catch (error: any) {
        if (error?.response?.status !== 429) {
          console.error('Failed to fetch latest Twitter stats:', error);
        }
      }

      try {
        const stats = await GetTwitterStats(Number(id));
        setTwitterStats(stats);
      } catch (error) {
        console.error('Failed to fetch stored Twitter stats:', error);
        showError('Failed to fetch Twitter stats');
      }
    };

    if (id) {
      fetchTwitterStats();
      const interval = setInterval(fetchTwitterStats, 30 * 60 * 1000);

      return () => clearInterval(interval);
    }
  }, [id]);

  const handleLogout = () => {
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('bot_id');
      localStorage.removeItem('twitter_connect_bot_id');
      document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
      setToken(null);

      router.push('/login');

      showSuccess('Logged out successfully');
    } catch (error) {
      showError('Failed to logout');
    }
  };

  const handleGenerateTweet = async () => {
    if (!id) return;

    try {
      await TriggerGenerateTweet(Number(id));
      showSuccess('Tweet generation started');
    } catch (error) {
      console.error('Failed to generate tweet:', error);
      showError('Failed to generate tweet');
    }
  };

  const { XS, SM, MD, LG, XL, XXL } = useUtilBreakpoint();
  const [IsExpanded, setIsExpanded] = useState(false);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="DashboardPage min-h-screen md:px-[60px] px-[20px] max-w-[1920px] mx-[auto]">
        <TwitterAuthHandler />

        <div className="Header flex items-center justify-between min-h-[70px]">
          <div className="flex items-center gap-[10px]">
            <Image src={logo_img} alt={'logo'} width={153} height={9999} />
            <h2 className="font-roboto text-[28px] text-[#F20823] font-[300] leading-[normal] tracking-[normal] sm:flex hidden">
              Dashboard
            </h2>
          </div>

          {MD && (
            <div className="flex items-center gap-[20px]">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="action-btn">
                    <button className="px-[40px] opacity-[0.5]">
                      <p className="font-tektur text-[14px] text-[#ffffff] font-[400] leading-[normal] tracking-[normal]">
                        Profile
                      </p>
                    </button>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem
                    onClick={() => router.push(`/bot-settings/${id}`)}
                  >
                    <Twitter className="w-4 h-4 mr-2" />
                    Bot Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-destructive focus:text-destructive"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <div className="action-btn">
                <button className="px-[40px] gap-[10px] opacity-[0.5]">
                  <Icons name="x_icon" />
                  <p className="font-tektur text-[14px] text-[#ffffff] font-[400] leading-[normal] tracking-[normal]">
                    View on Twitter
                  </p>
                </button>
              </div>

              <div className="action-btn">
                <button onClick={handleGenerateTweet}>
                  <Icons name="btnL" />
                  <div className="inner px-[20px] min-w-[140px]">
                    <p className="font-tektur text-[14px] text-[#ffffff] font-[400] leading-[normal] tracking-[normal]">
                      Generate Tweet
                    </p>
                  </div>
                  <Icons name="btnR" />
                </button>
              </div>
            </div>
          )}

          {!MD && (
            <>
              <div
                className="mobile-wrap cursor-pointer"
                onClick={() => setIsExpanded(!IsExpanded)}
              >
                <Icons name="mobile-menu" />
              </div>

              <div
                className="menu-open absolute top-[70px] left-0 w-[100%] bg-[#0A0A0A]"
                style={{
                  transition: 'all 0.25s 0s ease-out',
                  opacity: IsExpanded ? 1 : 0,
                  transform: IsExpanded ? 'translateY(0)' : 'translateY(-13px)',
                }}
              >
                <div className="flex items-center flex-col gap-[20px] py-[40px]">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <div className="action-btn">
                        <button className="px-[40px] opacity-[0.5]">
                          <p className="font-tektur text-[14px] text-[#ffffff] font-[400] leading-[normal] tracking-[normal]">
                            Profile
                          </p>
                        </button>
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem
                        onClick={() => router.push(`/bot-settings/${id}`)}
                      >
                        <Twitter className="w-4 h-4 mr-2" />
                        Bot Settings
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={handleLogout}
                        className="text-destructive focus:text-destructive"
                      >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <div className="action-btn">
                    <button className="px-[40px] gap-[10px] opacity-[0.5]">
                      <Icons name="x_icon" />
                      <p className="font-tektur text-[14px] text-[#ffffff] font-[400] leading-[normal] tracking-[normal]">
                        View on Twitter
                      </p>
                    </button>
                  </div>

                  <div className="action-btn">
                    <button
                      onClick={() => {
                        handleGenerateTweet();
                        setIsExpanded(!IsExpanded);
                      }}
                    >
                      <Icons name="btnL" />
                      <div className="inner px-[20px] min-w-[140px]">
                        <p className="font-tektur text-[14px] text-[#ffffff] font-[400] leading-[normal] tracking-[normal]">
                          Generate Tweet
                        </p>
                      </div>
                      <Icons name="btnR" />
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="page-inner-wrap flex flex-col mt-[40px] max-w-[1280px] mx-[auto]">
          <div className="user-stat-wrap grid grid-cols-1 md:grid-cols-4 gap-[20px]">
            <div
              className="user-stat-item flex flex-col gap-[10px] px-[20px] py-[15px] bg-[#000]"
              style={{
                boxShadow: '0px 0px 30px 0px rgba(0, 0, 0, 0.75)',
                border: '1px solid #222223',
              }}
            >
              <h3 className="font-roboto text-[12px] text-[#ffffff66] font-[300] leading-[normal] tracking-[normal]">
                Total Tweets
              </h3>
              <p className="font-tektur text-[24px] text-[#ffffff] font-[600] leading-[normal] tracking-[normal]">
                {twitterStats?.total_tweets || 0}
              </p>
            </div>

            <div
              className="user-stat-item flex flex-col gap-[10px] px-[20px] py-[15px] bg-[#000]"
              style={{
                boxShadow: '0px 0px 30px 0px rgba(0, 0, 0, 0.75)',
                border: '1px solid #222223',
              }}
            >
              <h3 className="font-roboto text-[12px] text-[#ffffff66] font-[300] leading-[normal] tracking-[normal]">
                Followers
              </h3>
              <p className="font-tektur text-[24px] text-[#ffffff] font-[600] leading-[normal] tracking-[normal]">
                {twitterStats?.total_followers || 0}
              </p>
            </div>

            <div
              className="user-stat-item flex flex-col gap-[10px] px-[20px] py-[15px] bg-[#000]"
              style={{
                boxShadow: '0px 0px 30px 0px rgba(0, 0, 0, 0.75)',
                border: '1px solid #222223',
              }}
            >
              <h3 className="font-roboto text-[12px] text-[#ffffff66] font-[300] leading-[normal] tracking-[normal]">
                Retweets
              </h3>
              <p className="font-tektur text-[24px] text-[#ffffff] font-[600] leading-[normal] tracking-[normal]">
                {twitterStats?.total_retweets || 0}
              </p>
            </div>

            <div
              className="user-stat-item flex flex-col gap-[10px] px-[20px] py-[15px] bg-[#000]"
              style={{
                boxShadow: '0px 0px 30px 0px rgba(0, 0, 0, 0.75)',
                border: '1px solid #222223',
              }}
            >
              <h3 className="font-roboto text-[12px] text-[#ffffff66] font-[300] leading-[normal] tracking-[normal]">
                Engagement Rate
              </h3>
              <p className="font-tektur text-[24px] text-[#ffffff] font-[600] leading-[normal] tracking-[normal]">
                {twitterStats?.engagement_rate || 0}%
              </p>
            </div>
          </div>

          <div className="recent-tweets-wrap grid grid-cols-1 lg:grid-cols-3 gap-8 mt-[40px]">
            <div
              className="item-wrap col-span-3 sm:p-[40px] p-[20px] bg-[#000]"
              style={{
                boxShadow: '0px 0px 30px 0px rgba(0, 0, 0, 0.75)',
                border: '1px solid #222223',
              }}
            >
              <h2 className="font-tektur text-[24px] text-[#ffffff] font-[400] leading-[normal] tracking-[normal]">
                Recent Tweets
              </h2>

              <div className="tweet-container flex flex-col mt-[40px] gap-[10px]">
                {twitterStats?.recent_tweets?.map((tweet, index) => (
                  <div
                    key={index}
                    className="card-item flex flex-col gap-[15px] py-[15px] px-[20px] bg-[#000]"
                    style={{
                      boxShadow: '0px 0px 30px 0px rgba(0, 0, 0, 0.75)',
                      border: '1px solid #222223',
                    }}
                  >
                    <p className="font-roboto text-[16px] text-[#ffffff] font-[300] leading-[normal] tracking-[normal]">
                      {tweet.text}
                    </p>

                    <div className="text-wrap flex justify-between sm:flex-row flex-col gap-[4px]">
                      <h4 className="font-roboto text-[16px] text-[#ffffff66] font-[300] leading-[normal] tracking-[normal]">
                        Likes: {tweet.metrics.like_count}
                      </h4>
                      <h4 className="font-roboto text-[16px] text-[#ffffff66] font-[300] leading-[normal] tracking-[normal]">
                        {timeAgo(tweet.created_at)}
                      </h4>
                    </div>
                  </div>
                )) || (
                  <div
                    className="card-item py-[15px] px-[20px] bg-[#000]"
                    style={{
                      boxShadow: '0px 0px 30px 0px rgba(0, 0, 0, 0.75)',
                      border: '1px solid #222223',
                    }}
                  >
                    <p className="font-roboto text-[16px] text-[#ffffff] font-[300] leading-[normal] tracking-[normal]">
                      No tweets available
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
}
