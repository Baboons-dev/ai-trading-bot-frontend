'use client';

import { Card } from '@/components/ui/card';

interface LeaderboardEntry {
  rank: number;
  username: string;
  points: number;
  referrals: number;
}

const leaderboardData: LeaderboardEntry[] = [
  { rank: 1, username: "CryptoKing", points: 15000, referrals: 150 },
  { rank: 2, username: "BlockchainQueen", points: 12000, referrals: 120 },
  { rank: 3, username: "SatoshiLover", points: 10000, referrals: 100 },
  { rank: 4, username: "CasperWhale", points: 8000, referrals: 80 },
  { rank: 5, username: "CryptoNinja", points: 7000, referrals: 70 },
  { rank: 6, username: "TokenMaster", points: 6000, referrals: 60 },
  { rank: 7, username: "ChainMaker", points: 5000, referrals: 50 },
  { rank: 8, username: "CryptoWizard", points: 4000, referrals: 40 },
  { rank: 9, username: "BlockExplorer", points: 3000, referrals: 30 },
  { rank: 10, username: "HashMaster", points: 2000, referrals: 20 },
];

export function LeaderboardSection() {
  return (
    <section className="py-12 bg-[#0A0A0A]">
      <div className="container px-4 mx-auto max-w-3xl">
        <h2 className="text-3xl font-bold text-center mb-8">Top Referrers</h2>
        <div className="space-y-2">
          {leaderboardData.map((entry) => (
            <Card key={entry.rank} className="p-4 bg-black/50 border-red-900/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-black/30 flex items-center justify-center">
                    <span className="text-lg font-bold">{entry.rank}</span>
                  </div>
                  <div>
                    <h3 className="font-bold">{entry.username}</h3>
                    <p className="text-sm text-gray-400">{entry.referrals} referrals</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold">{entry.points.toLocaleString()}</p>
                  <p className="text-sm text-gray-400">points</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}