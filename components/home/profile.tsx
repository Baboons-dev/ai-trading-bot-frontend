'use client';

import { useAuth } from '@/hooks/use-auth';
import { Card } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Icons from '@/config/icon';
import { useClickRef } from '@make-software/csprclick-ui';
import { showSuccess } from '@/hooks/useToastMessages';
import { GetLeaderboard } from '@/api/apiCalls/user';

// Dummy leaderboard dat
export default function ProfilePage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const clickRef = useClickRef();
  const [rank, setRank] = useState<number>(0);
  const [users, setUsers] = useState<[]>();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);
  useEffect(() => {
    GetLeaderboard().then((res) => {
      setRank(res?.position);
      setUsers(res?.users);
    });
  }, []);
  const handleLogout = async () => {
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('bot_id');
      localStorage.removeItem('twitter_connect_bot_id');
      document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
      clickRef.signOut();
      logout();

      showSuccess('Logged out successfully');
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
      router.push('/');
    }
  };

  if (!user) {
    return null;
  }

  return (
    <main className="min-h-screen py-12 container mx-auto px-4">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Your Profile</h1>
          <p className="text-gray-400">
            Welcome back, {user?.full_name || 'Anonymous'}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - User Stats */}
          <div className="space-y-6">
            <Card className="p-6 bg-black/50 border-red-900/20">
              <h3 className="text-lg font-semibold mb-4">Your Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Your Rank</span>
                  <span className="text-xl font-bold">#{rank}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Total Points</span>
                  <span className="text-xl font-bold">{user?.point}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Referrals</span>
                  <span className="text-xl font-bold">{user?.refer_count}</span>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-black/50 border-red-900/20">
              <h3 className="text-lg font-semibold mb-4">Your Referral Code</h3>
              <div className="space-y-4">
                <div className="bg-black/30 p-4 rounded-lg">
                  <code className="text-xl font-mono">
                    {user?.referral_code}
                  </code>
                </div>
                <p className="text-sm text-gray-400">
                  Share this code with friends to earn points and climb the
                  leaderboard!
                </p>
              </div>
            </Card>
          </div>

          {/* Right Column - Leaderboard */}
          <div>
            <Card className="p-6 bg-black/50 border-red-900/20">
              <h3 className="text-lg font-semibold mb-4">Top Referrers</h3>
              <div className="space-y-3">
                {users &&
                  users.map((entry, idx: number) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-lg ${
                        idx <= 3 ? 'bg-red-900/10' : 'bg-black/30'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-lg font-bold w-6">
                            {idx + 1}
                          </span>
                          <div>
                            <p className="font-semibold">{entry?.full_name}</p>
                            <p className="text-sm text-gray-400">
                              {entry?.refer_count} referrals
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">{entry?.point}</p>
                          <p className="text-sm text-gray-400">points</p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </Card>
          </div>
        </div>

        {/* Logout Button */}
        <div className="flex justify-center mt-8">
          <div className="action-btn">
            <button onClick={() => handleLogout()}>
              <Icons name="btnL" />
              <div className="inner px-[20px] sm:min-w-[140px] min-w-[40px]">
                <p className="font-tektur text-[14px] text-[#ffffff] font-[400] leading-[normal] tracking-[normal]">
                  Logout
                </p>
              </div>
              <Icons name="btnR" />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
