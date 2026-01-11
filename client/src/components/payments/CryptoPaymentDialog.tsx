import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogBody, DialogActions } from "@/components/shared/DialogPatterns";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { formatCurrency } from "@/lib/utils";
import { Loader2, ExternalLink, Bitcoin, Copy, Check, Coins } from "lucide-react";
import { toast } from "sonner";

interface CryptoPaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  invoiceId: number;
  amount: number;
  currency: string;
  onPaymentCreated?: () => void;
}

export function CryptoPaymentDialog({
  open,
  onOpenChange,
  invoiceId,
  amount,
  currency,
  onPaymentCreated,
}: CryptoPaymentDialogProps) {
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Create payment mutation - no crypto currency specified, customer chooses on NOWPayments
  const createPayment = trpc.crypto.createPayment.useMutation({
    onSuccess: (data) => {
      setPaymentUrl(data.invoiceUrl);
      toast.success("Payment link created! Choose your preferred cryptocurrency on the checkout page.");
      onPaymentCreated?.();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create crypto payment");
    },
  });

  // Reset state when dialog closes
  useEffect(() => {
    if (!open) {
      setPaymentUrl(null);
      setCopied(false);
    }
  }, [open]);

  const handleCreatePayment = () => {
    // Don't pass cryptoCurrency - let customer choose on NOWPayments checkout
    createPayment.mutate({
      invoiceId,
    });
  };

  const handleCopyLink = () => {
    if (paymentUrl) {
      navigator.clipboard.writeText(paymentUrl);
      setCopied(true);
      toast.success("Payment link copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleOpenPayment = () => {
    if (paymentUrl) {
      window.open(paymentUrl, "_blank");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2.5">
            <div className="flex size-8 items-center justify-center rounded-lg bg-[#f7931a]/10">
              <Bitcoin className="size-4 text-[#f7931a]" />
            </div>
            Pay with Cryptocurrency
          </DialogTitle>
          <DialogDescription>
            Pay {formatCurrency(amount)} {currency} using your preferred cryptocurrency
          </DialogDescription>
        </DialogHeader>

        <DialogBody spacing="relaxed">
          {!paymentUrl ? (
            <>
              {/* Info about crypto payment */}
              <div className="rounded-lg bg-[#f7931a]/5 border border-[#f7931a]/20 p-4 space-y-3">
                <div className="flex items-center gap-2 text-[#f7931a]">
                  <Coins className="h-5 w-5" />
                  <span className="font-medium">300+ Cryptocurrencies Supported</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Click the button below to create a payment link. You'll be able to choose from Bitcoin, Ethereum, USDT, USDC, and 300+ other cryptocurrencies on the secure checkout page.
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-background text-xs font-medium">
                    <span className="text-[#f7931a]">₿</span> BTC
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-background text-xs font-medium">
                    <span className="text-[#627eea]">Ξ</span> ETH
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-background text-xs font-medium">
                    <span className="text-[#26a17b]">₮</span> USDT
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-background text-xs font-medium">
                    <span className="text-[#2775ca]">$</span> USDC
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-background text-xs font-medium text-muted-foreground">
                    +300 more
                  </span>
                </div>
              </div>

              {/* Amount Display */}
              <div className="rounded-lg border p-4 space-y-1">
                <div className="text-sm text-muted-foreground">Amount to Pay</div>
                <div className="text-2xl font-bold">
                  {formatCurrency(amount)} {currency}
                </div>
              </div>

              {/* Create Payment Button */}
              <Button
                variant="crypto"
                size="lg"
                className="w-full"
                onClick={handleCreatePayment}
                disabled={createPayment.isPending}
              >
                {createPayment.isPending ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Creating Payment Link...
                  </>
                ) : (
                  <>
                    <Bitcoin className="size-4" />
                    Create Crypto Payment
                  </>
                )}
              </Button>
            </>
          ) : (
            <>
              {/* Payment Created - Show Link */}
              <div className="rounded-lg bg-green-500/10 border border-green-500/20 p-4 space-y-3">
                <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                  <Check className="h-5 w-5" />
                  <span className="font-medium">Payment Link Created!</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Click the button below to choose your preferred cryptocurrency and complete your payment on the NOWPayments secure checkout page.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2">
                <Button variant="crypto" size="lg" onClick={handleOpenPayment} className="w-full">
                  <ExternalLink className="size-4" />
                  Choose Crypto & Pay
                </Button>
                <Button variant="outline" onClick={handleCopyLink} className="w-full">
                  {copied ? (
                    <>
                      <Check className="size-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="size-4" />
                      Copy Payment Link
                    </>
                  )}
                </Button>
              </div>

              {/* Payment Info */}
              <div className="text-xs text-muted-foreground text-center space-y-1">
                <p>Payment is processed by NOWPayments</p>
                <p>You'll be redirected back after payment</p>
              </div>
            </>
          )}
        </DialogBody>

        <DialogActions
          onClose={() => onOpenChange(false)}
          cancelText={paymentUrl ? "Close" : "Cancel"}
        />
      </DialogContent>
    </Dialog>
  );
}
