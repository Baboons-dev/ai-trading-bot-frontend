import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";

interface WalletButtonProps {
  onClick?: () => void;
  loading?: boolean;
}

export function WalletButton({ onClick, loading }: WalletButtonProps) {
  return (
    <Button
      type="button"
      variant="outline"
      className="w-full flex items-center justify-center gap-2"
      onClick={onClick}
      disabled={loading}
    >
      <Wallet className="h-4 w-4" />
      {loading ? "Connecting..." : "Connect Wallet"}
    </Button>
  );
}