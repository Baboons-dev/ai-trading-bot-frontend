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
    <Button
      type="button"
      variant="outline"
      className="w-full flex items-center justify-center gap-2"
      onClick={onClick}
      disabled={loading || disabled}
    >
      <Wallet className="h-4 w-4" />
      {loading ? 'Connecting...' : 'Connect Wallet'}
    </Button>
  );
}
