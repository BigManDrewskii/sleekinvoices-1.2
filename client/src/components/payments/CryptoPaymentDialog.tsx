import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { trpc } from "@/lib/trpc";
import { formatCurrency } from "@/lib/utils";
import { Loader2, ExternalLink, Bitcoin, Copy, Check, RefreshCw } from "lucide-react";
import { toast } from "sonner";

interface CryptoPaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  invoiceId: number;
  amount: number;
  currency: string;
  onPaymentCreated?: () => void;
}

// Currency icons mapping
const currencyIcons: Record<string, string> = {
  btc: "₿",
  eth: "Ξ",
  usdt: "₮",
  usdc: "$",
  ltc: "Ł",
  doge: "Ð",
  sol: "◎",
  xrp: "✕",
  bnb: "B",
  matic: "M",
};

export function CryptoPaymentDialog({
  open,
  onOpenChange,
  invoiceId,
  amount,
  currency,
  onPaymentCreated,
}: CryptoPaymentDialogProps) {
  const [selectedCrypto, setSelectedCrypto] = useState<string>("");
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Fetch available currencies
  const { data: currencies, isLoading: currenciesLoading } = trpc.crypto.getCurrencies.useQuery(
    undefined,
    { enabled: open }
  );

  // Get price estimate when crypto is selected
  const { data: estimate, isLoading: estimateLoading } = trpc.crypto.getEstimate.useQuery(
    {
      amount,
      fiatCurrency: currency.toLowerCase(),
      cryptoCurrency: selectedCrypto,
    },
    { enabled: open && !!selectedCrypto }
  );

  // Create payment mutation
  const createPayment = trpc.crypto.createPayment.useMutation({
    onSuccess: (data) => {
      setPaymentUrl(data.invoiceUrl);
      toast.success("Crypto payment created! Click the link to complete payment.");
      onPaymentCreated?.();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create crypto payment");
    },
  });

  // Reset state when dialog closes
  useEffect(() => {
    if (!open) {
      setSelectedCrypto("");
      setPaymentUrl(null);
      setCopied(false);
    }
  }, [open]);

  const handleCreatePayment = () => {
    if (!selectedCrypto) {
      toast.error("Please select a cryptocurrency");
      return;
    }
    createPayment.mutate({
      invoiceId,
      cryptoCurrency: selectedCrypto,
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
          <DialogTitle className="flex items-center gap-2">
            <Bitcoin className="h-5 w-5" />
            Pay with Cryptocurrency
          </DialogTitle>
          <DialogDescription>
            Pay {formatCurrency(amount)} {currency} using your preferred cryptocurrency
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {!paymentUrl ? (
            <>
              {/* Currency Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Select Cryptocurrency</label>
                <Select value={selectedCrypto} onValueChange={setSelectedCrypto}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a cryptocurrency..." />
                  </SelectTrigger>
                  <SelectContent>
                    {currenciesLoading ? (
                      <div className="flex items-center justify-center p-4">
                        <Loader2 className="h-4 w-4 animate-spin" />
                      </div>
                    ) : (
                      currencies?.popular.map((crypto) => (
                        <SelectItem key={crypto} value={crypto}>
                          <span className="flex items-center gap-2">
                            <span className="font-mono text-lg">
                              {currencyIcons[crypto] || "○"}
                            </span>
                            {crypto.toUpperCase()}
                          </span>
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              </div>

              {/* Price Estimate */}
              {selectedCrypto && (
                <div className="rounded-lg bg-muted p-4 space-y-2">
                  <div className="text-sm text-muted-foreground">Estimated Amount</div>
                  {estimateLoading ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Calculating...</span>
                    </div>
                  ) : estimate ? (
                    <div className="text-2xl font-bold">
                      {parseFloat(estimate.cryptoAmount).toFixed(8)}{" "}
                      {selectedCrypto.toUpperCase()}
                    </div>
                  ) : null}
                  <div className="text-xs text-muted-foreground">
                    Rate is locked when you create the payment
                  </div>
                </div>
              )}

              {/* Create Payment Button */}
              <Button
                className="w-full"
                onClick={handleCreatePayment}
                disabled={!selectedCrypto || createPayment.isPending}
              >
                {createPayment.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Creating Payment...
                  </>
                ) : (
                  <>
                    <Bitcoin className="h-4 w-4 mr-2" />
                    Create Crypto Payment
                  </>
                )}
              </Button>
            </>
          ) : (
            <>
              {/* Payment Created - Show Link */}
              <div className="rounded-lg bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 p-4 space-y-3">
                <div className="flex items-center gap-2 text-green-700 dark:text-green-300">
                  <Check className="h-5 w-5" />
                  <span className="font-medium">Payment Created!</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Click the button below to complete your payment on the NOWPayments secure checkout page.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2">
                <Button onClick={handleOpenPayment} className="w-full">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Open Payment Page
                </Button>
                <Button variant="outline" onClick={handleCopyLink} className="w-full">
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy Payment Link
                    </>
                  )}
                </Button>
              </div>

              {/* Payment Info */}
              <div className="text-xs text-muted-foreground text-center">
                <p>Payment is processed by NOWPayments</p>
                <p>You'll be redirected back after payment</p>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
