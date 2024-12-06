import { Button } from '@/components/ui/button';
import { Wallet } from 'lucide-react';

interface WalletButtonProps {
  onClick?: () => void;
  loading?: boolean;
  disabled: boolean;
}

export function WalletButton({
  onClick,
  loading,
  disabled,
}: WalletButtonProps) {
  return (
    <>
      <button
        className="flex justify-center items-center gap-[10px] w-full h-[45px] min-h-[45px] bg-[#101010]"
        style={{
          border: '1px solid #222223',
        }}
        type="button"
        onClick={onClick}
        disabled={loading || disabled}
      >
        <Wallet className="h-4 w-4" />
        {loading ? (
          <p className="font-tektur text-[14px] text-[#ffffff] font-[400] leading-[normal] tracking-[normal]">
            Connecting...
          </p>
        ) : (
          <p className="font-tektur text-[14px] text-[#ffffff] font-[400] leading-[normal] tracking-[normal]">
            Connect Wallet
          </p>
        )}
      </button>
    </>
  );
}
