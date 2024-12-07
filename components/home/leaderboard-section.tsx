'use client';

import { Card } from '@/components/ui/card';

export function LeaderboardSection({ users }: { users: [] }) {
  return (
    <section className="py-12 bg-[#0A0A0A]">
      <div className="container px-4 mx-auto max-w-3xl">
        <h2 className="text-3xl font-bold text-center mb-8">Top Referrers</h2>
        <div className="space-y-2">
          {users &&
            users.map((entry, idx: number) => (
              <Card key={idx} className="p-4 bg-black/50 border-red-900/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-black/30 flex items-center justify-center">
                      <span className="text-lg font-bold">{idx + 1}</span>
                    </div>
                    <div>
                      <h3 className="font-bold">{entry.full_name}</h3>
                      <p className="text-sm text-gray-400">
                        {entry.refer_count} referrals
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{entry.point}</p>
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
