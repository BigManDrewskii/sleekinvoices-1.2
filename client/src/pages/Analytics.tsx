import { useAuth } from "@/_core/hooks/useAuth";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";
import { formatCurrency } from "@/lib/utils";
import { 
  TrendingUp, 
  TrendingDown, 
  Download,
  DollarSign,
  Clock,
  AlertTriangle
} from "lucide-react";
import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Navigation } from "@/components/Navigation";
import { AnalyticsPageSkeleton } from "@/components/skeletons";

export default function Analytics() {
  const { loading, isAuthenticated } = useAuth();
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "90d" | "1y">("30d");

  const { data: analytics, isLoading } = trpc.invoices.getAnalytics.useQuery(
    { timeRange },
    { enabled: isAuthenticated }
  );
  
  const { data: agingReport } = trpc.analytics.getAgingReport.useQuery(
    undefined,
    { enabled: isAuthenticated }
  );

  // Export analytics data to CSV
  const exportCSV = () => {
    if (!analytics) return;

    const timeLabels: Record<string, string> = {
      "7d": "Last 7 days",
      "30d": "Last 30 days",
      "90d": "Last 3 months",
      "1y": "Last year",
    };

    const rows: string[][] = [
      ["SleekInvoices Analytics Report"],
      [`Period: ${timeLabels[timeRange]}`],
      [`Generated: ${new Date().toLocaleDateString()}`],
      [],
      ["Metric", "Value"],
      ["Total Revenue", formatCurrency(analytics.totalRevenue || 0)],
      ["Outstanding Amount", formatCurrency(analytics.outstandingAmount || 0)],
      ["Total Invoices", String(analytics.totalInvoices || 0)],
      ["Paid Invoices", String(analytics.paidInvoices || 0)],
      ["Collection Rate", `${analytics.collectionRate || 0}%`],
      ["Avg Days to Pay", `${analytics.dso || 0} days`],
    ];

    const csvContent = rows.map(row => 
      row.map(cell => `"${cell.replace(/"/g, '""')}"`).join(",")
    ).join("\n");
    
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `analytics-${timeRange}-${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (loading || isLoading) {
    return <AnalyticsPageSkeleton />;
  }

  if (!isAuthenticated) {
    window.location.href = getLoginUrl();
    return null;
  }

  const {
    totalRevenue = 0,
    totalInvoices = 0,
    paidInvoices = 0,
    outstandingAmount = 0,
    monthlyRevenue = [],
    revenueChangePercent = 0,
    dso = 0,
    collectionRate = 0,
  } = analytics || {};

  const revenueNum = parseFloat(totalRevenue?.toString() || "0");
  const outstandingNum = parseFloat(outstandingAmount?.toString() || "0");
  
  // Calculate overdue amount from aging report
  const overdueAmount = agingReport 
    ? parseFloat(agingReport.days_0_30?.amount?.toString() || "0") +
      parseFloat(agingReport.days_31_60?.amount?.toString() || "0") +
      parseFloat(agingReport.days_61_90?.amount?.toString() || "0") +
      parseFloat(agingReport.days_90_plus?.amount?.toString() || "0")
    : 0;

  const overdueCount = agingReport
    ? (agingReport.days_0_30?.count || 0) +
      (agingReport.days_31_60?.count || 0) +
      (agingReport.days_61_90?.count || 0) +
      (agingReport.days_90_plus?.count || 0)
    : 0;

  // Format chart data
  const chartData = monthlyRevenue.map((item: { month: string; revenue: string | number }) => ({
    date: new Date(item.month).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    revenue: parseFloat(item.revenue?.toString() || "0"),
  }));

  const timeRangeLabels: Record<string, string> = {
    "7d": "7D",
    "30d": "30D",
    "90d": "3M",
    "1y": "1Y",
  };

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg px-3 py-2 shadow-lg">
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className="text-sm font-semibold text-foreground">
            {formatCurrency(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
            <p className="text-muted-foreground text-sm mt-1">Your financial overview at a glance</p>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Time Range Selector */}
            <div className="flex bg-muted/50 rounded-lg p-1">
              {(["7d", "30d", "90d", "1y"] as const).map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                    timeRange === range
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {timeRangeLabels[range]}
                </button>
              ))}
            </div>
            
            <Button variant="outline" size="sm" onClick={exportCSV} className="gap-1.5">
              <Download className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Export</span>
            </Button>
          </div>
        </div>

        {/* Hero Metrics - 3 Large Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Total Revenue */}
          <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <DollarSign className="h-5 w-5 text-primary" />
                </div>
                <span className="text-sm font-medium text-muted-foreground">Total Revenue</span>
              </div>
              <div className="text-3xl font-bold text-foreground mb-2">
                {formatCurrency(revenueNum)}
              </div>
              <div className="flex items-center gap-1.5">
                {revenueChangePercent >= 0 ? (
                  <TrendingUp className="h-4 w-4 text-green-500" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500" />
                )}
                <span className={`text-sm font-medium ${revenueChangePercent >= 0 ? "text-green-500" : "text-red-500"}`}>
                  {revenueChangePercent >= 0 ? "+" : ""}{revenueChangePercent.toFixed(0)}%
                </span>
                <span className="text-xs text-muted-foreground">vs previous period</span>
              </div>
            </CardContent>
          </Card>

          {/* Outstanding */}
          <Card className="bg-gradient-to-br from-amber-500/5 to-amber-500/10 border-amber-500/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-amber-500/10 rounded-lg">
                  <Clock className="h-5 w-5 text-amber-500" />
                </div>
                <span className="text-sm font-medium text-muted-foreground">Outstanding</span>
              </div>
              <div className="text-3xl font-bold text-foreground mb-2">
                {formatCurrency(outstandingNum)}
              </div>
              <div className="text-sm text-muted-foreground">
                {totalInvoices - paidInvoices} unpaid invoices
              </div>
            </CardContent>
          </Card>

          {/* Overdue */}
          <Card className={`bg-gradient-to-br ${overdueAmount > 0 ? "from-red-500/5 to-red-500/10 border-red-500/20" : "from-green-500/5 to-green-500/10 border-green-500/20"}`}>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className={`p-2 rounded-lg ${overdueAmount > 0 ? "bg-red-500/10" : "bg-green-500/10"}`}>
                  <AlertTriangle className={`h-5 w-5 ${overdueAmount > 0 ? "text-red-500" : "text-green-500"}`} />
                </div>
                <span className="text-sm font-medium text-muted-foreground">Overdue</span>
              </div>
              <div className="text-3xl font-bold text-foreground mb-2">
                {formatCurrency(overdueAmount)}
              </div>
              <div className="text-sm text-muted-foreground">
                {overdueCount > 0 ? `${overdueCount} invoices need attention` : "All invoices on track"}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Revenue Chart */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground">Revenue Trend</h3>
                <p className="text-sm text-muted-foreground">Income over time</p>
              </div>
            </div>
            
            <div className="h-[280px]">
              {chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#6695ff" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="#6695ff" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis 
                      dataKey="date" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#64748b', fontSize: 12 }}
                      dy={10}
                    />
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#64748b', fontSize: 12 }}
                      tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                      dx={-10}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#6695ff"
                      strokeWidth={2}
                      fill="url(#revenueGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-muted-foreground">
                  No revenue data for this period
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Secondary Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground mb-1">Total Invoices</p>
              <p className="text-2xl font-bold text-foreground">{totalInvoices}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground mb-1">Paid Invoices</p>
              <p className="text-2xl font-bold text-green-500">{paidInvoices}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground mb-1">Collection Rate</p>
              <p className="text-2xl font-bold text-foreground">{collectionRate}%</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground mb-1">Avg Days to Pay</p>
              <p className="text-2xl font-bold text-foreground">{dso}</p>
            </CardContent>
          </Card>
        </div>

        {/* Aging Breakdown */}
        {agingReport && (
          <Card>
            <CardContent className="p-6">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-foreground">Receivables Aging</h3>
                <p className="text-sm text-muted-foreground">Outstanding invoices by age</p>
              </div>
              
              <div className="space-y-4">
                {[
                  { label: "Current", amount: agingReport.current?.amount, count: agingReport.current?.count, color: "bg-green-500" },
                  { label: "1-30 Days", amount: agingReport.days_0_30?.amount, count: agingReport.days_0_30?.count, color: "bg-amber-500" },
                  { label: "31-60 Days", amount: agingReport.days_31_60?.amount, count: agingReport.days_31_60?.count, color: "bg-orange-500" },
                  { label: "61-90 Days", amount: agingReport.days_61_90?.amount, count: agingReport.days_61_90?.count, color: "bg-red-400" },
                  { label: "90+ Days", amount: agingReport.days_90_plus?.amount, count: agingReport.days_90_plus?.count, color: "bg-red-600" },
                ].map((bucket) => {
                  const amount = parseFloat(bucket.amount?.toString() || "0");
                  const count = bucket.count || 0;
                  const total = outstandingNum || 1;
                  const percentage = total > 0 ? (amount / total) * 100 : 0;
                  
                  return (
                    <div key={bucket.label} className="flex items-center gap-4">
                      <div className="w-24 text-sm text-muted-foreground">{bucket.label}</div>
                      <div className="flex-1">
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${bucket.color} rounded-full transition-all`}
                            style={{ width: `${Math.max(percentage, amount > 0 ? 2 : 0)}%` }}
                          />
                        </div>
                      </div>
                      <div className="w-28 text-right">
                        <span className="text-sm font-medium text-foreground">{formatCurrency(amount)}</span>
                      </div>
                      <div className="w-20 text-right text-xs text-muted-foreground">
                        {count} inv
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
