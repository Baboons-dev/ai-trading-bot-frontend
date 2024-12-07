'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icons from '@/config/icon';
import { Loader2 } from 'lucide-react';

interface ReferralModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (referralCode: string) => void;
  loading?: boolean;
}

export function ReferralModal({ isOpen, onClose, onSubmit, loading }: ReferralModalProps) {
  const [referralCode, setReferralCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(referralCode);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#101010] border-[#222223]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">Enter Referral Code</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="referral_code" className="text-[#ffffff66]">
              Referral Code
            </Label>
            <Input
              id="referral_code"
              placeholder="Enter referral code"
              value={referralCode}
              onChange={(e) => setReferralCode(e.target.value)}
              className="bg-transparent border-[#222223]"
              required
            />
          </div>

          <div className="action-btn min-w-[100%]">
            <button className="w-full" type="submit" disabled={loading}>
              <Icons name="btnL" className="shrink-0" />
              <div className="inner px-[20px] flex-1 justify-center">
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    <p className="font-tektur text-[14px] text-[#ffffff] font-[400]">
                      Connecting...
                    </p>
                  </>
                ) : (
                  <p className="font-tektur text-[14px] text-[#ffffff] font-[400]">
                    Connect Wallet
                  </p>
                )}
              </div>
              <Icons name="btnR" className="shrink-0" />
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}