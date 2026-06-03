"use client";

import * as React from "react";
import {
  DollarSign,
  Users,
  UserPlus,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDown,
  ArrowUp,
  RefreshCw,
  MoreVertical,
  Activity,
  Server,
  Ticket,
  Percent,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as ChartTooltip,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
  Cell,
} from "recharts";

import {
  kpiMetrics,
  revenue12Months,
  recentTransactions,
  topProducts,
  quickStats,
  activityEvents,
  Transaction,
} from "@/lib/mock-data";

export default function DashboardPage() {
  // States for Transactions table sorting and reloading simulation
  const [transactions, setTransactions] = React.useState<Transaction[]>(recentTransactions);
  const [sortBy, setSortBy] = React.useState<"name" | "amount" | "date">("date");
  const [sortOrder, setSortOrder] = React.useState<"asc" | "desc">("desc");
  const [isLoading, setIsLoading] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Sorting logic
  const handleSort = (field: "name" | "amount" | "date") => {
    const isAsc = sortBy === field && sortOrder === "asc";
    const nextOrder = isAsc ? "desc" : "asc";
    setSortBy(field);
    setSortOrder(nextOrder);

    const sorted = [...transactions].sort((a, b) => {
      if (field === "name") {
        return nextOrder === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      }
      if (field === "amount") {
        return nextOrder === "asc" ? a.amount - b.amount : b.amount - a.amount;
      }
      if (field === "date") {
        return nextOrder === "asc"
          ? new Date(a.date).getTime() - new Date(b.date).getTime()
          : new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      return 0;
    });
    setTransactions(sorted);
  };

  // Reload data with skeleton states
  const handleReload = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      {/* Top dashboard heading */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Operational Overview</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Analyze revenue generation, node uptime, and active client subscriptions.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleReload} disabled={isLoading} className="gap-2">
            <RefreshCw className={cn("h-4 w-4", isLoading && "animate-spin")} />
            Refresh Metrics
          </Button>
        </div>
      </div>

      {/* 1. Stats Row - 4 KPI cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpiMetrics.map((kpi) => {
          const isRevenue = kpi.title === "Total Revenue";
          const isUsers = kpi.title === "Active Users";
          const isSignups = kpi.title === "New Signups";
          const isChurn = kpi.title === "Churn Rate";

          return (
            <Card key={kpi.title} className="hover:border-primary/30 group">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {kpi.title}
                </span>
                <div className="rounded-lg bg-secondary/80 p-2 text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                  {isRevenue && <DollarSign className="h-4 w-4" />}
                  {isUsers && <Users className="h-4 w-4" />}
                  {isSignups && <UserPlus className="h-4 w-4" />}
                  {isChurn && <TrendingDown className="h-4 w-4" />}
                </div>
              </CardHeader>
              <CardContent className="space-y-1">
                <div className="text-2xl font-bold text-foreground">{kpi.value}</div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={cn(
                        "text-xs font-bold flex items-center",
                        kpi.isPositive
                          ? "text-emerald-600 dark:text-emerald-500"
                          : "text-red-600 dark:text-red-500"
                      )}
                    >
                      {kpi.isPositive ? <ArrowUp className="h-3 w-3 mr-0.5" /> : <ArrowDown className="h-3 w-3 mr-0.5" />}
                      {kpi.change}
                    </span>
                    <span className="text-[10px] text-muted-foreground">vs last month</span>
                  </div>

                  {/* Lightweight Sparkline Render using custom SVG */}
                  <svg className="h-6 w-16 overflow-visible" viewBox="0 0 100 30">
                    <polyline
                      fill="none"
                      stroke="hsl(var(--primary))"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      points={kpi.sparklineData
                        .map((pt, i) => `${(i / (kpi.sparklineData.length - 1)) * 100},${30 - (pt.value / 160) * 25}`)
                        .join(" ")}
                      className="group-hover:stroke-indigo-500 transition-colors"
                    />
                  </svg>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Grid: Split 2/3 (Left) and 1/3 (Right) */}
      <div className="grid gap-6 xl:grid-cols-3">
        {/* Left Side Column: Area Chart & Transactions Table (2/3 width) */}
        <div className="xl:col-span-2 space-y-6">
          
          {/* 2. Revenue Area Chart (Recharts) */}
          <Card>
            <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4">
              <div>
                <CardTitle className="text-lg font-bold">Revenue Evolution</CardTitle>
                <CardDescription>
                  12-month comparison tracking monthly recurring revenue (MRR) against target.
                </CardDescription>
              </div>
              <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-primary" /> Active Revenue
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-xs border-2 border-dashed border-muted-foreground/50" /> Goal Target
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[350px] w-full">
                {!mounted ? (
                  <Skeleton className="h-full w-full rounded-lg animate-pulse bg-muted/60" />
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={revenue12Months}
                      margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.2} />
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border) / 0.5)" />
                      <XAxis
                        dataKey="month"
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={11}
                        tickLine={false}
                        axisLine={false}
                        dy={10}
                      />
                      <YAxis
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={11}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(v) => `$${v / 1000}k`}
                        dx={-10}
                      />
                      <ChartTooltip
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="rounded-lg border border-border bg-popover p-3 shadow-md space-y-1.5">
                                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                                  {payload[0].payload.month} 2026
                                </p>
                                <div className="flex flex-col gap-1 text-xs">
                                  <span className="flex items-center gap-1.5 font-semibold text-foreground">
                                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                                    Revenue: ${payload[0].value?.toLocaleString()}
                                  </span>
                                  <span className="flex items-center gap-1.5 text-muted-foreground">
                                    <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/60" />
                                    Target: ${payload[1].value?.toLocaleString()}
                                  </span>
                                </div>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="revenue"
                        name="Active Revenue"
                        stroke="hsl(var(--primary))"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorRevenue)"
                      />
                      <Area
                        type="monotone"
                        dataKey="target"
                        name="Goal Target"
                        stroke="hsl(var(--muted-foreground) / 0.6)"
                        strokeWidth={2}
                        strokeDasharray="4 4"
                        fill="transparent"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                )}
              </div>
            </CardContent>
          </Card>

          {/* 3. Recent Transactions Table */}
          <Card>
            <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4">
              <div>
                <CardTitle className="text-lg font-bold">Recent Billing Logs</CardTitle>
                <CardDescription>
                  List of the last 10 SaaS invoices processed across server clusters.
                </CardDescription>
              </div>
              <Badge variant="outline" className="h-5 text-[10px]">
                Invoicing Module
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="relative w-full overflow-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border/80 text-left text-muted-foreground font-semibold">
                      <th
                        className="p-3 pl-0 cursor-pointer hover:text-foreground transition-colors"
                        onClick={() => handleSort("name")}
                      >
                        <span className="flex items-center gap-1">
                          User {sortBy === "name" && (sortOrder === "asc" ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />)}
                        </span>
                      </th>
                      <th
                        className="p-3 cursor-pointer hover:text-foreground transition-colors"
                        onClick={() => handleSort("amount")}
                      >
                        <span className="flex items-center gap-1">
                          Amount {sortBy === "amount" && (sortOrder === "asc" ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />)}
                        </span>
                      </th>
                      <th className="p-3">Status</th>
                      <th
                        className="p-3 cursor-pointer hover:text-foreground transition-colors"
                        onClick={() => handleSort("date")}
                      >
                        <span className="flex items-center gap-1">
                          Date {sortBy === "date" && (sortOrder === "asc" ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />)}
                        </span>
                      </th>
                      <th className="p-3 pr-0 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/40">
                    {isLoading ? (
                      // Render loading skeletons
                      Array.from({ length: 5 }).map((_, idx) => (
                        <tr key={idx}>
                          <td className="p-3 pl-0">
                            <div className="flex items-center gap-3">
                              <Skeleton className="h-8 w-8 rounded-full" />
                              <div className="space-y-1">
                                <Skeleton className="h-3.5 w-24" />
                                <Skeleton className="h-3 w-32" />
                              </div>
                            </div>
                          </td>
                          <td className="p-3">
                            <Skeleton className="h-4 w-12" />
                          </td>
                          <td className="p-3">
                            <Skeleton className="h-4.5 w-14 rounded-full" />
                          </td>
                          <td className="p-3">
                            <Skeleton className="h-3.5 w-20" />
                          </td>
                          <td className="p-3 pr-0 text-right">
                            <Skeleton className="h-8 w-8 rounded-md ml-auto" />
                          </td>
                        </tr>
                      ))
                    ) : (
                      // Render transactions
                      transactions.map((tx) => (
                        <tr key={tx.id} className="hover:bg-muted/10 transition-colors">
                          <td className="p-3 pl-0">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={tx.avatar} alt={tx.name} />
                                <AvatarFallback>{tx.name.substring(0, 2)}</AvatarFallback>
                              </Avatar>
                              <div className="flex flex-col">
                                <span className="font-semibold text-foreground leading-none">
                                  {tx.name}
                                </span>
                                <span className="text-[10px] text-muted-foreground mt-0.5">
                                  {tx.email}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="p-3 font-semibold text-foreground">
                            ${tx.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </td>
                          <td className="p-3">
                            <Badge
                              variant={
                                tx.status === "paid"
                                  ? "success"
                                  : tx.status === "pending"
                                  ? "secondary"
                                  : "destructive"
                              }
                              className="text-[9px] py-0 px-2"
                            >
                              {tx.status}
                            </Badge>
                          </td>
                          <td className="p-3 text-xs text-muted-foreground">
                            {new Date(tx.date).toLocaleDateString(undefined, {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </td>
                          <td className="p-3 pr-0 text-right">
                            <Tooltip delayDuration={300}>
                              <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent side="left" className="font-medium">
                                Invoice Action Menu
                              </TooltipContent>
                            </Tooltip>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Side Column: Products, Circular Stats, Timeline Feed (1/3 width) */}
        <div className="space-y-6">
          
          {/* 4. Top Products Widget (Horizontal Bar Chart) */}
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Modules</CardTitle>
              <CardDescription>Top 5 SaaS products ranked by revenue contribution.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[220px] w-full">
                {!mounted ? (
                  <div className="space-y-3 pt-2">
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-5/6" />
                    <Skeleton className="h-6 w-4/5" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-6 w-2/3" />
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={topProducts}
                      layout="vertical"
                      margin={{ top: 0, right: 10, left: -25, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="hsl(var(--border) / 0.5)" />
                      <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={10} tickLine={false} axisLine={false} />
                      <YAxis
                        dataKey="name"
                        type="category"
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={10}
                        tickLine={false}
                        axisLine={false}
                        width={100}
                      />
                      <ChartTooltip
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="rounded-lg border border-border bg-popover p-2.5 shadow-md">
                                <span className="text-[10px] font-bold text-foreground">
                                  {payload[0].payload.name}
                                </span>
                                <div className="text-xs text-muted-foreground mt-1">
                                  Revenue: <span className="font-semibold text-foreground">${payload[0].value?.toLocaleString()}</span>
                                </div>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]}>
                        {topProducts.map((entry, index) => {
                          // Vary opacity of accent color slightly for premium gradient effect
                          const opacities = [1, 0.85, 0.7, 0.55, 0.4];
                          return (
                            <Cell
                              key={`cell-${index}`}
                              fill={`hsl(var(--primary) / ${opacities[index]})`}
                            />
                          );
                        })}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>
            </CardContent>
          </Card>

          {/* 5. Quick Stats Row (Circular SVGs) */}
          <Card>
            <CardHeader>
              <CardTitle>Health Metrics</CardTitle>
              <CardDescription>System core status, tickets, and conversions.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-2">
                {quickStats.map((stat) => {
                  // Custom radial circle offsets
                  const radius = 24;
                  const strokeDasharray = 2 * Math.PI * radius; // ~150.8
                  const strokeDashoffset = strokeDasharray - (strokeDasharray * stat.percentage) / 100;
                  const isUptime = stat.label.includes("Uptime");
                  const isTickets = stat.label.includes("Tickets");

                  return (
                    <div key={stat.label} className="flex flex-col items-center text-center space-y-2">
                      <div className="relative flex items-center justify-center">
                        <svg className="h-16 w-16 -rotate-90">
                          {/* Track */}
                          <circle
                            className="stroke-muted/40"
                            strokeWidth="3.5"
                            fill="transparent"
                            r={radius}
                            cx="32"
                            cy="32"
                          />
                          {/* Radial indicator */}
                          <circle
                            className={cn(stat.colorClass, "transition-all duration-500")}
                            strokeWidth="3.5"
                            strokeDasharray={strokeDasharray}
                            strokeDashoffset={strokeDashoffset}
                            strokeLinecap="round"
                            fill="transparent"
                            r={radius}
                            cx="32"
                            cy="32"
                          />
                        </svg>
                        {/* Inline icon overlay */}
                        <div className="absolute text-muted-foreground">
                          {isUptime && <Server className="h-4.5 w-4.5 text-emerald-500" />}
                          {isTickets && <Ticket className="h-4.5 w-4.5 text-indigo-500" />}
                          {!isUptime && !isTickets && <Percent className="h-4 w-4 text-violet-500" />}
                        </div>
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider block">
                          {stat.label}
                        </span>
                        <span className="text-xs font-bold text-foreground block">
                          {stat.value}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* 6. Recent Activity Feed (Timeline list) */}
          <Card>
            <CardHeader>
              <CardTitle>Security Logs</CardTitle>
              <CardDescription>Timeline feed of system operational triggers.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative pl-4 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[1px] before:bg-border/60">
                {activityEvents.map((event) => (
                  <div key={event.id} className="relative flex items-start gap-3">
                    {/* Timeline Node Point */}
                    <div className="absolute -left-[18px] top-1 h-2.5 w-2.5 rounded-full bg-primary border-2 border-background z-10" />

                    <Avatar className="h-7 w-7 mt-0.5 shrink-0">
                      <AvatarImage src={event.userAvatar} alt={event.userName} />
                      <AvatarFallback>{event.userName.substring(0, 2)}</AvatarFallback>
                    </Avatar>

                    <div className="flex-1 space-y-0.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-bold text-foreground">
                          {event.userName}
                        </span>
                        <span className="text-[9px] text-muted-foreground whitespace-nowrap">
                          {event.time}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground leading-normal">
                        {event.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Utility class name merge helper copy for clean builds
function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}
