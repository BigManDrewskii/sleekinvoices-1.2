import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";
import { formatCurrency } from "@/lib/utils";
import {
  FileText,
  TrendingUp,
  DollarSign,
  AlertCircle,
  Download,
  RefreshCw,
  TrendingDown,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
  ScatterChart,
  Scatter,
} from "recharts";
import { Navigation } from "@/components/Navigation";
import { AnalyticsMetricCard } from "@/components/analytics/AnalyticsMetricCard";
import { AnalyticsDateRangeFilter } from "@/components/analytics/AnalyticsDateRangeFilter";

const STATUS_COLORS = {
  draft: "#8b5cf6",
  sent: "#06b6d4",
  paid: "#10b981",
  overdue: "#ef4444",
  canceled: "#6b7280",
};

const GRADIENT_COLORS = {
  primary: "#6366f1",
  success: "#10b981",
  warning: "#f59e0b",
  danger: "#ef4444",
  info: "#06b6d4",
};

// Custom tooltip for charts
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
        <p className="text-sm font-medium text-foreground">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{ color: entry.color }} className="text-sm">
            {entry.name}: {typeof entry.value === 'number' ? formatCurrency(entry.value) : entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function AnalyticsRedesigned() {
  const { user, loading, isAuthenticated } = useAuth();
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "90d" | "1y">("30d");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const { data: analytics, isLoading, refetch } = trpc.invoices.getAnalytics.useQuery(
    { timeRange },
    { enabled: isAuthenticated }
  );

  const { data: agingReport } = trpc.analytics.getAgingReport.useQuery(
    undefined,
    { enabled: isAuthenticated }
  );

  const { data: clientProfitability } = trpc.analytics.getClientProfitability.useQuery(
    undefined,
    { enabled: isAuthenticated }
  );

  const { data: cashFlowProjection } = trpc.analytics.getCashFlowProjection.useQuery(
    { months: 6 },
    { enabled: isAuthenticated }
  );

  const { data: revenueVsExpenses } = trpc.analytics.getRevenueVsExpenses.useQuery(
    { year: new Date().getFullYear() },
    { enabled: isAuthenticated }
  );

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  };

  if (loading || isLoading) {
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

  const {
    totalRevenue,
    totalInvoices,
    paidInvoices,
    outstandingAmount,
    averageInvoiceValue,
    monthlyRevenue,
    statusBreakdown,
  } = analytics || {
    totalRevenue: 0,
    totalInvoices: 0,
    paidInvoices: 0,
    outstandingAmount: 0,
    averageInvoiceValue: 0,
    monthlyRevenue: [],
    statusBreakdown: [],
  };

  // Format data for charts
  const revenueChartData = monthlyRevenue.map((item: any) => ({
    month: new Date(item.month).toLocaleDateString("en-US", { month: "short" }),
    revenue: parseFloat(item.revenue),
    invoices: item.count,
  }));

  const statusChartData = statusBreakdown.map((item: any) => ({
    name: item.status.charAt(0).toUpperCase() + item.status.slice(1),
    value: item.count,
    amount: parseFloat(item.totalAmount),
  }));

  const paidPercentage = totalInvoices > 0 ? (paidInvoices / totalInvoices) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/95">
      <Navigation />

      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-12">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Analytics Dashboard
              </h1>
              <p className="text-muted-foreground mt-2">
                Real-time insights into your business performance
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="gap-2"
              >
                <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
                Refresh
              </Button>
              <AnalyticsDateRangeFilter value={timeRange} onChange={setTimeRange} />
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <AnalyticsMetricCard
              title="Total Revenue"
              value={formatCurrency(totalRevenue)}
              icon={<DollarSign className="h-5 w-5" />}
              subtitle={`From ${paidInvoices} paid invoices`}
              trend={{
                value: 12.5,
                isPositive: true,
                label: "vs last period",
              }}
            />

            <AnalyticsMetricCard
              title="Outstanding"
              value={formatCurrency(outstandingAmount)}
              icon={<AlertCircle className="h-5 w-5" />}
              subtitle={`${totalInvoices - paidInvoices} unpaid invoices`}
              trend={{
                value: 8.2,
                isPositive: false,
                label: "vs last period",
              }}
              valueClassName="text-orange-600 dark:text-orange-400"
            />

            <AnalyticsMetricCard
              title="Total Invoices"
              value={totalInvoices}
              icon={<FileText className="h-5 w-5" />}
              subtitle={`${Math.round(paidPercentage)}% paid`}
              trend={{
                value: 5.3,
                isPositive: true,
                label: "vs last period",
              }}
            />

            <AnalyticsMetricCard
              title="Average Value"
              value={formatCurrency(averageInvoiceValue)}
              icon={<TrendingUp className="h-5 w-5" />}
              subtitle="Per invoice"
              trend={{
                value: 3.1,
                isPositive: true,
                label: "vs last period",
              }}
            />
          </div>

          {/* Main Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Revenue Trend - Large */}
            <Card className="lg:col-span-2 overflow-hidden border-0 shadow-lg bg-gradient-to-br from-card to-card/50">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">Revenue Trend</CardTitle>
                    <CardDescription>Monthly performance over time</CardDescription>
                  </div>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {revenueChartData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={350}>
                    <AreaChart data={revenueChartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={GRADIENT_COLORS.primary} stopOpacity={0.4} />
                          <stop offset="95%" stopColor={GRADIENT_COLORS.primary} stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                      <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" style={{ fontSize: "12px" }} />
                      <YAxis stroke="hsl(var(--muted-foreground))" style={{ fontSize: "12px" }} />
                      <Tooltip content={<CustomTooltip />} />
                      <Area
                        type="monotone"
                        dataKey="revenue"
                        stroke={GRADIENT_COLORS.primary}
                        fillOpacity={1}
                        fill="url(#colorRevenue)"
                        strokeWidth={3}
                        isAnimationActive={true}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-[350px] flex items-center justify-center text-muted-foreground">
                    No data available
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Invoice Status - Pie */}
            <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-br from-card to-card/50">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl">Invoice Status</CardTitle>
                <CardDescription>Distribution by status</CardDescription>
              </CardHeader>
              <CardContent>
                {statusChartData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={350}>
                    <PieChart>
                      <Pie
                        data={statusChartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ${value}`}
                        outerRadius={100}
                        fill={GRADIENT_COLORS.primary}
                        dataKey="value"
                        animationBegin={0}
                        animationDuration={800}
                      >
                        {statusChartData.map((entry: any, index: number) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={
                              STATUS_COLORS[
                                entry.name.toLowerCase() as keyof typeof STATUS_COLORS
                              ] || "#94a3b8"
                            }
                          />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-[350px] flex items-center justify-center text-muted-foreground">
                    No data available
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Secondary Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Invoice Volume */}
            <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-br from-card to-card/50">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl">Invoice Volume</CardTitle>
                <CardDescription>Invoices created per month</CardDescription>
              </CardHeader>
              <CardContent>
                {revenueChartData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={revenueChartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorBar" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={GRADIENT_COLORS.info} stopOpacity={1} />
                          <stop offset="100%" stopColor={GRADIENT_COLORS.info} stopOpacity={0.6} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                      <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" style={{ fontSize: "12px" }} />
                      <YAxis stroke="hsl(var(--muted-foreground))" style={{ fontSize: "12px" }} />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar
                        dataKey="invoices"
                        fill="url(#colorBar)"
                        radius={[8, 8, 0, 0]}
                        animationDuration={800}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                    No data available
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Cash Flow */}
            <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-br from-card to-card/50">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl">Cash Flow Projection</CardTitle>
                <CardDescription>Next 6 months forecast</CardDescription>
              </CardHeader>
              <CardContent>
                {cashFlowProjection && cashFlowProjection.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={cashFlowProjection} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                      <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" style={{ fontSize: "12px" }} />
                      <YAxis stroke="hsl(var(--muted-foreground))" style={{ fontSize: "12px" }} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="expectedIncome"
                        stroke={GRADIENT_COLORS.success}
                        strokeWidth={3}
                        dot={{ fill: GRADIENT_COLORS.success, r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="expectedExpenses"
                        stroke={GRADIENT_COLORS.danger}
                        strokeWidth={3}
                        dot={{ fill: GRADIENT_COLORS.danger, r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="netCashFlow"
                        stroke={GRADIENT_COLORS.info}
                        strokeWidth={3}
                        dot={{ fill: GRADIENT_COLORS.info, r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                    No data available
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Aging Report */}
          {agingReport && (
            <Card className="mb-8 overflow-hidden border-0 shadow-lg bg-gradient-to-br from-card to-card/50">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl">Accounts Receivable Aging</CardTitle>
                <CardDescription>Outstanding invoices by days overdue</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {[
                    { label: "Current", data: agingReport.current, color: "from-green-500 to-emerald-600", textColor: "text-green-600 dark:text-green-400" },
                    { label: "0-30 Days", data: agingReport.days_0_30, color: "from-blue-500 to-cyan-600", textColor: "text-blue-600 dark:text-blue-400" },
                    { label: "31-60 Days", data: agingReport.days_31_60, color: "from-yellow-500 to-amber-600", textColor: "text-yellow-600 dark:text-yellow-400" },
                    { label: "61-90 Days", data: agingReport.days_61_90, color: "from-orange-500 to-red-600", textColor: "text-orange-600 dark:text-orange-400" },
                    { label: "90+ Days", data: agingReport.days_90_plus, color: "from-red-600 to-rose-700", textColor: "text-red-600 dark:text-red-400" },
                  ].map((category) => (
                    <div
                      key={category.label}
                      className={`p-4 rounded-xl bg-gradient-to-br ${category.color} bg-opacity-10 border border-current border-opacity-20 backdrop-blur-sm`}
                    >
                      <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
                        {category.label}
                      </p>
                      <p className={`text-3xl font-bold ${category.textColor} mb-2`}>
                        {category.data.count}
                      </p>
                      <p className={`text-sm font-medium ${category.textColor}`}>
                        {formatCurrency(category.data.amount)}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Profit & Loss */}
          {revenueVsExpenses && revenueVsExpenses.length > 0 && (
            <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-br from-card to-card/50">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl">Monthly Profit & Loss</CardTitle>
                <CardDescription>Revenue vs expenses for {new Date().getFullYear()}</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={revenueVsExpenses} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={GRADIENT_COLORS.success} stopOpacity={1} />
                        <stop offset="100%" stopColor={GRADIENT_COLORS.success} stopOpacity={0.6} />
                      </linearGradient>
                      <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={GRADIENT_COLORS.danger} stopOpacity={1} />
                        <stop offset="100%" stopColor={GRADIENT_COLORS.danger} stopOpacity={0.6} />
                      </linearGradient>
                      <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={GRADIENT_COLORS.info} stopOpacity={1} />
                        <stop offset="100%" stopColor={GRADIENT_COLORS.info} stopOpacity={0.6} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" style={{ fontSize: "12px" }} />
                    <YAxis stroke="hsl(var(--muted-foreground))" style={{ fontSize: "12px" }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar dataKey="revenue" fill="url(#colorRevenue)" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="expenses" fill="url(#colorExpenses)" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="netProfit" fill="url(#colorProfit)" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          )}

          {/* Client Profitability Table */}
          {clientProfitability && clientProfitability.length > 0 && (
            <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-br from-card to-card/50">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl">Top Clients by Profitability</CardTitle>
                <CardDescription>Revenue and profit breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border/50">
                        <th className="text-left p-4 font-semibold text-muted-foreground">Client</th>
                        <th className="text-right p-4 font-semibold text-muted-foreground">Revenue</th>
                        <th className="text-right p-4 font-semibold text-muted-foreground">Expenses</th>
                        <th className="text-right p-4 font-semibold text-muted-foreground">Profit</th>
                        <th className="text-right p-4 font-semibold text-muted-foreground">Margin</th>
                      </tr>
                    </thead>
                    <tbody>
                      {clientProfitability.slice(0, 10).map((client: any, index: number) => (
                        <tr
                          key={client.clientId}
                          className={`border-b border-border/30 transition-colors ${
                            index % 2 === 0 ? "bg-muted/30" : ""
                          } hover:bg-muted/50`}
                        >
                          <td className="p-4 font-medium">{client.clientName}</td>
                          <td className="text-right p-4 text-green-600 dark:text-green-400 font-semibold">
                            {formatCurrency(client.revenue)}
                          </td>
                          <td className="text-right p-4 text-red-600 dark:text-red-400">
                            {formatCurrency(client.expenses)}
                          </td>
                          <td className={`text-right p-4 font-bold ${client.profit >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
                            {formatCurrency(client.profit)}
                          </td>
                          <td className={`text-right p-4 font-semibold ${client.margin >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
                            {client.margin.toFixed(1)}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
