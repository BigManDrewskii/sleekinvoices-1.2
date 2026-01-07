import { CheckCircle2, AlertCircle, TrendingUp } from "lucide-react";

interface MonthlyUsageCardProps {
  invoicesCreatedThisMonth: number;
  invoiceLimit?: number;
}

export function MonthlyUsageCard({
  invoicesCreatedThisMonth,
  invoiceLimit,
}: MonthlyUsageCardProps) {
  // If no limit, show compact unlimited message
  if (!invoiceLimit) {
    return (
      <div className="rounded-2xl bg-gradient-to-br from-card to-card/80 border border-border/50 p-5 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10">
              <CheckCircle2 className="h-5 w-5 text-emerald-500" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Unlimited Invoices</p>
              <p className="text-xs text-muted-foreground">
                {invoicesCreatedThisMonth} created this month
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-500">
              Pro
            </span>
          </div>
        </div>
      </div>
    );
  }

  const percentage = Math.round((invoicesCreatedThisMonth / invoiceLimit) * 100);
  const remaining = Math.max(0, invoiceLimit - invoicesCreatedThisMonth);

  // Determine status styling
  let statusColor = "emerald";
  let StatusIcon = CheckCircle2;
  let statusBg = "bg-emerald-500/10";
  let statusText = "text-emerald-500";
  let progressBg = "bg-emerald-500";

  if (percentage >= 90) {
    statusColor = "red";
    StatusIcon = AlertCircle;
    statusBg = "bg-red-500/10";
    statusText = "text-red-500";
    progressBg = "bg-red-500";
  } else if (percentage >= 70) {
    statusColor = "amber";
    StatusIcon = TrendingUp;
    statusBg = "bg-amber-500/10";
    statusText = "text-amber-500";
    progressBg = "bg-amber-500";
  }

  return (
    <div className="rounded-2xl bg-gradient-to-br from-card to-card/80 border border-border/50 p-5 backdrop-blur-sm">
      {/* Header Row */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${statusBg}`}>
            <StatusIcon className={`h-5 w-5 ${statusText}`} />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">Monthly Usage</p>
            <p className="text-xs text-muted-foreground">Invoice creation limit</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold tabular-nums text-foreground">{invoicesCreatedThisMonth}</p>
          <p className="text-xs text-muted-foreground">of {invoiceLimit}</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="h-2 w-full overflow-hidden rounded-full bg-muted/50">
          <div
            className={`h-full rounded-full transition-all duration-500 ease-out ${progressBg}`}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className={`font-medium ${statusText}`}>{percentage}% used</span>
          <span className="text-muted-foreground">{remaining} remaining</span>
        </div>
      </div>
    </div>
  );
}
