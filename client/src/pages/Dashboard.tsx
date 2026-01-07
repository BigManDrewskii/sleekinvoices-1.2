import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";
import { DollarSign, FileText, TrendingUp, TrendingDown, AlertCircle, Plus, ArrowUpRight, ArrowDownRight, Sparkles, ChevronDown } from "lucide-react";
import { Link } from "wouter";
import { Navigation } from "@/components/Navigation";
import { UpgradePromoBanner } from "@/components/UpgradePromoBanner";
import { MagicInput } from "@/components/MagicInput";
import { useLocation } from "wouter";
import { MonthlyUsageCard } from "@/components/dashboard/MonthlyUsageCard";
import { StatsGridSkeleton, RecentInvoicesSkeleton } from "@/components/dashboard/DashboardSkeleton";
import { formatCurrency } from "@/lib/utils";

export default function Dashboard() {
  const { user, loading, isAuthenticated } = useAuth();
  const { data: stats, isLoading: statsLoading } = trpc.analytics.getStats.useQuery(undefined, {
    enabled: isAuthenticated,
  });
  const { data: invoices, isLoading: invoicesLoading } = trpc.invoices.list.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    window.location.href = getLoginUrl();
    return null;
  }

  const recentInvoices = invoices?.slice(0, 5) || [];

  // Calculate invoices created this month
  const invoicesThisMonth = invoices?.filter((inv) => {
    const invoiceDate = new Date(inv.issueDate);
    const now = new Date();
    return invoiceDate.getMonth() === now.getMonth() &&
           invoiceDate.getFullYear() === now.getFullYear();
  }).length || 0;

  return (
    <div className="page-wrapper">
      <Navigation />

      {/* Main Content */}
      <div className="page-content page-transition">
        <div className="section-stack">
          {/* Header */}
          <div className="page-header">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h1 className="page-header-title">Dashboard</h1>
                <p className="page-header-subtitle">Welcome back, {user?.name || "there"}!</p>
              </div>
              <div className="flex gap-2">
                <Button asChild variant="outline" className="touch-target gap-2 border-purple-500/30 hover:border-purple-500/50 hover:bg-purple-500/5">
                  <Link href="/invoices/guided" className="flex items-center gap-2 justify-center">
                    <Sparkles className="h-4 w-4 text-purple-500" />
                    <span className="hidden sm:inline">Guided</span>
                  </Link>
                </Button>
                <Button asChild className="touch-target">
                  <Link href="/invoices/create" className="flex items-center gap-2 justify-center">
                    <Plus className="h-4 w-4" />
                    <span className="hidden sm:inline">New Invoice</span>
                    <span className="sm:hidden">New</span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Magic Invoice - AI-powered quick creation */}
          <MagicInvoiceSection />

          {/* Upgrade Promo Banner */}
          <UpgradePromoBanner />

          {/* Monthly Usage Card */}
          <MonthlyUsageCard
            invoicesCreatedThisMonth={invoicesThisMonth}
            invoiceLimit={undefined}
          />

          {/* Stats Grid - tweakcn style */}
          {statsLoading ? (
            <StatsGridSkeleton />
          ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Total Revenue */}
            <div className="rounded-2xl bg-gradient-to-br from-card to-card/80 border border-border/50 p-5 backdrop-blur-sm transition-all duration-200 hover:border-border hover:shadow-lg hover:shadow-primary/5">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-500 font-medium">
                  <ArrowUpRight className="h-3 w-3" />
                  +{stats?.revenueChangePercent?.toFixed(1) || 12.5}%
                </span>
              </div>
              <p className="text-2xl font-bold tracking-tight text-foreground">
                {formatCurrency(stats?.totalRevenue || 0)}
              </p>
              <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1.5">
                <TrendingUp className="h-3 w-3 text-emerald-500" />
                Trending up this month
              </p>
            </div>

            {/* Outstanding */}
            <div className="rounded-2xl bg-gradient-to-br from-card to-card/80 border border-border/50 p-5 backdrop-blur-sm transition-all duration-200 hover:border-border hover:shadow-lg hover:shadow-amber/5">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-medium text-muted-foreground">Outstanding</p>
                {(stats?.outstandingBalance || 0) > 0 && (
                  <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-500 font-medium">
                    <AlertCircle className="h-3 w-3" />
                    Pending
                  </span>
                )}
              </div>
              <p className="text-2xl font-bold tracking-tight text-foreground">
                {formatCurrency(stats?.outstandingBalance || 0)}
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Awaiting payment
              </p>
            </div>

            {/* Total Invoices */}
            <div className="rounded-2xl bg-gradient-to-br from-card to-card/80 border border-border/50 p-5 backdrop-blur-sm transition-all duration-200 hover:border-border hover:shadow-lg">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-medium text-muted-foreground">Total Invoices</p>
              </div>
              <p className="text-2xl font-bold tracking-tight text-foreground">
                {stats?.totalInvoices || 0}
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                All time invoices created
              </p>
            </div>

            {/* Paid Invoices */}
            <div className="rounded-2xl bg-gradient-to-br from-card to-card/80 border border-border/50 p-5 backdrop-blur-sm transition-all duration-200 hover:border-border hover:shadow-lg hover:shadow-emerald/5">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-medium text-muted-foreground">Paid Invoices</p>
                <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-500 font-medium">
                  <TrendingUp className="h-3 w-3" />
                  Paid
                </span>
              </div>
              <p className="text-2xl font-bold tracking-tight text-foreground">
                {stats?.paidInvoices || 0}
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Successfully collected
              </p>
            </div>
          </div>
          )}

          {/* Recent Invoices */}
          <div className="rounded-2xl bg-gradient-to-br from-card to-card/80 border border-border/50 backdrop-blur-sm overflow-hidden">
            <div className="flex items-center justify-between p-5 pb-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground">Recent Invoices</h3>
                <p className="text-sm text-muted-foreground">Your latest invoices and their status</p>
              </div>
              <Button variant="outline" size="sm" asChild className="rounded-xl border-border/50 hover:border-border hover:bg-accent/50">
                <Link href="/invoices">View All</Link>
              </Button>
            </div>
            <div className="px-5 pb-5">
              {invoicesLoading ? (
                <div className="space-y-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-lg border border-border">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-accent animate-pulse" />
                        <div className="space-y-2">
                          <div className="h-4 w-24 bg-accent animate-pulse rounded" />
                          <div className="h-3 w-20 bg-accent animate-pulse rounded" />
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="h-5 w-16 bg-accent animate-pulse rounded-full" />
                        <div className="h-5 w-20 bg-accent animate-pulse rounded" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : recentInvoices.length === 0 ? (
                <div className="text-center py-12">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">No invoices yet</h3>
                  <p className="text-muted-foreground mb-4">Create your first invoice to get started</p>
                  <Button asChild>
                    <Link href="/invoices/create">Create Invoice</Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  {recentInvoices.map((invoice) => (
                    <Link 
                      key={invoice.id} 
                      href={`/invoices/${invoice.id}`}
                      className="group flex items-center justify-between p-4 rounded-xl border border-border/50 hover:border-border hover:bg-accent/30 transition-all duration-200"
                    >
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
                          <FileText className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{invoice.invoiceNumber}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(invoice.issueDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <StatusBadge status={invoice.status} />
                        <span className="font-semibold text-foreground min-w-[80px] text-right tabular-nums">
                          {formatCurrency(Number(invoice.total))}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MagicInvoiceSection() {
  const [, setLocation] = useLocation();
  
  const handleExtract = (data: {
    clientName?: string;
    clientEmail?: string;
    lineItems: Array<{ description: string; quantity: number; rate: number }>;
    dueDate?: string;
    notes?: string;
    currency?: string;
  }) => {
    // Navigate to create invoice with pre-filled data
    const params = new URLSearchParams();
    if (data.clientName) params.set('clientName', data.clientName);
    if (data.clientEmail) params.set('clientEmail', data.clientEmail);
    if (data.dueDate) params.set('dueDate', data.dueDate);
    if (data.notes) params.set('notes', data.notes);
    if (data.currency) params.set('currency', data.currency);
    if (data.lineItems.length > 0) {
      params.set('lineItems', JSON.stringify(data.lineItems));
    }
    setLocation(`/invoices/create?${params.toString()}`);
  };

  return (
    <div className="rounded-2xl bg-gradient-to-br from-primary/5 via-card to-card/80 border border-primary/20 backdrop-blur-sm overflow-hidden">
      <div className="p-5">
        <MagicInput onExtract={handleExtract} className="w-full" />
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const statusConfig: Record<string, { bg: string; text: string; label: string }> = {
    draft: { bg: "bg-gray-500/10", text: "text-gray-400", label: "Draft" },
    sent: { bg: "bg-blue-500/10", text: "text-blue-400", label: "Sent" },
    paid: { bg: "bg-green-500/10", text: "text-green-400", label: "Paid" },
    overdue: { bg: "bg-red-500/10", text: "text-red-400", label: "Overdue" },
    canceled: { bg: "bg-gray-500/10", text: "text-gray-500", label: "Canceled" },
  };

  const config = statusConfig[status] || statusConfig.draft;

  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
      {config.label}
    </span>
  );
}
