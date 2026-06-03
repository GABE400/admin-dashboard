"use client";

import * as React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  FileSpreadsheet,
  Download,
  Search,
  Filter,
  CheckCircle,
  Clock,
  TrendingUp,
  RefreshCw,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/app/utils";

// Mock Charts Data
const chartsData = [
  { name: "Jan", traffic: 4000, downloads: 2400 },
  { name: "Feb", traffic: 3000, downloads: 1398 },
  { name: "Mar", traffic: 5000, downloads: 3800 },
  { name: "Apr", traffic: 2780, downloads: 3908 },
  { name: "May", traffic: 1890, downloads: 4800 },
  { name: "Jun", traffic: 6390, downloads: 5800 },
];

interface ReportFile {
  id: string;
  name: string;
  category: "traffic" | "sales" | "security" | "performance";
  generatedDate: string;
  fileSize: string;
  status: "ready" | "generating";
}

const reportFiles: ReportFile[] = [
  { id: "rep-1", name: "Q1 Traffic Sources & User Conversions", category: "traffic", generatedDate: "2026-05-15", fileSize: "1.4 MB", status: "ready" },
  { id: "rep-2", name: "Monthly Sales Revenue Ledger", category: "sales", generatedDate: "2026-05-28", fileSize: "720 KB", status: "ready" },
  { id: "rep-3", name: "SaaS API Security Access Audits", category: "security", generatedDate: "2026-06-01", fileSize: "1.2 MB", status: "ready" },
  { id: "rep-4", name: "AWS Shards Replication Performance Logs", category: "performance", generatedDate: "2026-06-03", fileSize: "18.4 MB", status: "generating" },
  { id: "rep-5", name: "Ad-hoc CRM Contacts Status Logs", category: "sales", generatedDate: "2026-06-02", fileSize: "320 KB", status: "ready" },
];

export default function ReportsPage() {
  const [mounted, setMounted] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [categoryFilter, setCategoryFilter] = React.useState<string>("all");
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1200);
  };

  const filteredReports = React.useMemo(() => {
    return reportFiles.filter((rep) => {
      const matchesSearch = rep.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = categoryFilter === "all" || rep.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, categoryFilter]);

  const categoryBadgeColors = {
    traffic: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/15",
    sales: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/15",
    security: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/15",
    performance: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/15",
  };

  return (
    <div className="space-y-6">
      {/* Header frame banner */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Analytical Reports</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Export system metric ledgers, audit databases, and traffic analytics.
          </p>
        </div>
        <Button variant="outline" className="gap-2 cursor-pointer font-semibold shadow-xs" onClick={handleRefresh} disabled={isRefreshing}>
          <RefreshCw className={cn("h-4 w-4", isRefreshing && "animate-spin")} />
          {isRefreshing ? "Refreshing Logs..." : "Sync Reports"}
        </Button>
      </div>

      {/* 1. Summary Cards row */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* KPI 1 */}
        <Card className="border border-border/80">
          <CardHeader className="pb-2">
            <CardDescription className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Traffic Analysis</CardDescription>
            <CardTitle className="text-2xl font-black text-foreground">24.2K</CardTitle>
          </CardHeader>
          <CardContent className="text-[10px] text-muted-foreground flex items-center gap-1 font-semibold leading-none pt-0">
            <TrendingUp className="h-3 w-3 text-emerald-500" />
            <span className="text-emerald-500">+12%</span> vs last month
          </CardContent>
        </Card>

        {/* KPI 2 */}
        <Card className="border border-border/80">
          <CardHeader className="pb-2">
            <CardDescription className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Billing Ledgers</CardDescription>
            <CardTitle className="text-2xl font-black text-foreground">$12,850</CardTitle>
          </CardHeader>
          <CardContent className="text-[10px] text-muted-foreground flex items-center gap-1 font-semibold leading-none pt-0">
            <TrendingUp className="h-3 w-3 text-emerald-500" />
            <span className="text-emerald-500">+8.4%</span> vs target run
          </CardContent>
        </Card>

        {/* KPI 3 */}
        <Card className="border border-border/80">
          <CardHeader className="pb-2">
            <CardDescription className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Audit Triggers</CardDescription>
            <CardTitle className="text-2xl font-black text-foreground">Active</CardTitle>
          </CardHeader>
          <CardContent className="text-[10px] text-muted-foreground flex items-center gap-1 font-semibold leading-none pt-0">
            <CheckCircle className="h-3 w-3 text-emerald-500" />
            Zero warnings logged
          </CardContent>
        </Card>

        {/* KPI 4 */}
        <Card className="border border-border/80">
          <CardHeader className="pb-2">
            <CardDescription className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Averages CTR</CardDescription>
            <CardTitle className="text-2xl font-black text-foreground">4.82%</CardTitle>
          </CardHeader>
          <CardContent className="text-[10px] text-muted-foreground flex items-center gap-1 font-semibold leading-none pt-0">
            <TrendingUp className="h-3 w-3 text-emerald-500" />
            <span className="text-emerald-500">+0.4%</span> vs baseline
          </CardContent>
        </Card>
      </div>

      {/* 2. Charts Visual section */}
      <Card className="border border-border/80">
        <CardHeader>
          <CardTitle className="text-sm font-bold flex items-center gap-2">
            <FileSpreadsheet className="h-5 w-5 text-primary" /> Quarterly Traffic & Downloads Evolution
          </CardTitle>
          <CardDescription>Visual comparison of total monthly data downloads against portal traffic hits.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80 w-full">
            {mounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-zinc-200 dark:stroke-zinc-800" />
                  <XAxis dataKey="name" fontSize={11} className="fill-muted-foreground font-semibold" />
                  <YAxis fontSize={11} className="fill-muted-foreground font-semibold" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--color-card)",
                      borderColor: "var(--color-border)",
                      borderRadius: "8px",
                      fontSize: "11px",
                      fontWeight: "bold",
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: "11px", fontWeight: "bold" }} />
                  <Bar dataKey="traffic" fill="var(--color-primary)" radius={[4, 4, 0, 0]} name="Portal Traffic Hits" />
                  <Bar dataKey="downloads" fill="#6366f1" radius={[4, 4, 0, 0]} name="Reports Downloads" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full w-full flex flex-col justify-between">
                <Skeleton className="h-full w-full" />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* 3. Exportable Files Table */}
      <div className="space-y-4">
        {/* Filters bar */}
        <Card className="border border-border/80">
          <CardContent className="p-4 flex flex-col sm:flex-row gap-3 select-none">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search audit files by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-9 rounded-lg border border-border bg-background pl-9 pr-4 text-xs focus:outline-hidden focus:ring-1 focus:ring-primary focus:border-primary"
              />
            </div>

            <div className="flex gap-2">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="h-9 rounded-lg border border-border bg-background px-3 py-1.5 text-xs focus:outline-hidden focus:ring-1 focus:ring-primary focus:border-primary cursor-pointer w-full sm:w-40 font-semibold"
              >
                <option value="all">All Categories</option>
                <option value="traffic">Traffic Reports</option>
                <option value="sales">Sales Ledgers</option>
                <option value="security">Security Audits</option>
                <option value="performance">Performance logs</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* List Card */}
        <Card className="border border-border/80">
          <CardContent className="p-0">
            <div className="relative w-full overflow-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/80 bg-muted/20 text-left text-muted-foreground font-semibold">
                    <th className="p-4 pl-6">Report File Details</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Created Date</th>
                    <th className="p-4">File Size</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 pr-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  {filteredReports.map((rep) => (
                    <tr key={rep.id} className="hover:bg-muted/10 transition-colors">
                      <td className="p-4 pl-6">
                        <div className="flex items-center gap-2">
                          <FileSpreadsheet className="h-4.5 w-4.5 text-primary" />
                          <span className="font-bold text-foreground truncate max-w-xs">{rep.name}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge
                          variant="outline"
                          className={cn("capitalize text-[9px] py-0 px-2 font-bold shadow-none", categoryBadgeColors[rep.category])}
                        >
                          {rep.category}
                        </Badge>
                      </td>
                      <td className="p-4 text-xs text-muted-foreground font-medium">
                        {new Date(rep.generatedDate).toLocaleDateString(undefined, {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </td>
                      <td className="p-4 text-xs text-muted-foreground font-semibold">{rep.fileSize}</td>
                      <td className="p-4">
                        {rep.status === "ready" ? (
                          <Badge variant="success" className="text-[9px] py-0 px-1.5 h-4.5 font-bold">
                            Ready
                          </Badge>
                        ) : (
                          <Badge
                            variant="secondary"
                            className="bg-yellow-500/10 border-yellow-500/15 text-yellow-600 dark:text-yellow-400 text-[9px] py-0 px-1.5 h-4.5 font-bold animate-pulse"
                          >
                            Generating
                          </Badge>
                        )}
                      </td>
                      <td className="p-4 pr-6 text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-primary cursor-pointer"
                          disabled={rep.status !== "ready"}
                          onClick={() => alert(`Simulating download of report: ${rep.name}`)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                  {filteredReports.length === 0 && (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-xs text-muted-foreground">
                        No report files match query filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

    </div>
  );
}
