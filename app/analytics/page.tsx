"use client";

import * as React from "react";
import { BarChart3, TrendingUp, Users, Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Analytics Hub</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Real-time traffic metrics, user engagement patterns, and performance indexing.
          </p>
        </div>
        <div>
          <Link href="/">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Overview
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Metric 1 */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Total Pageviews
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">148.2k</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
              <span className="text-emerald-600 dark:text-emerald-500 font-semibold">+18.4%</span> vs. last week
            </p>
          </CardContent>
        </Card>

        {/* Metric 2 */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Unique Visitors
            </CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32,940</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
              <span className="text-emerald-600 dark:text-emerald-500 font-semibold">+12.1%</span> active users
            </p>
          </CardContent>
        </Card>

        {/* Metric 3 */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Avg. Session Duration
            </CardTitle>
            <Clock className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4m 32s</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
              <span className="text-red-500 font-semibold">-3.2%</span> exit rates
            </p>
          </CardContent>
        </Card>

        {/* Metric 4 */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Conversion Index
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.48%</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
              <span className="text-emerald-600 dark:text-emerald-500 font-semibold">+0.6%</span> signup goals
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Data Detail */}
      <Card>
        <CardHeader>
          <CardTitle>Top Referrals & Content</CardTitle>
          <CardDescription>Most visited entry points and domains driving signups.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative w-full overflow-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/80 text-left text-muted-foreground font-semibold">
                  <th className="p-3 pl-0">Source Domain</th>
                  <th className="p-3">Visits</th>
                  <th className="p-3">Conversions</th>
                  <th className="p-3 pr-0 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                <tr>
                  <td className="p-3 pl-0 font-medium">github.com/aether-dashboard</td>
                  <td className="p-3">12,480</td>
                  <td className="p-3">482</td>
                  <td className="p-3 pr-0 text-right">
                    <Badge variant="success">High Traffic</Badge>
                  </td>
                </tr>
                <tr>
                  <td className="p-3 pl-0 font-medium">news.ycombinator.com</td>
                  <td className="p-3">8,290</td>
                  <td className="p-3">124</td>
                  <td className="p-3 pr-0 text-right">
                    <Badge variant="secondary">Direct</Badge>
                  </td>
                </tr>
                <tr>
                  <td className="p-3 pl-0 font-medium">google.com (organic search)</td>
                  <td className="p-3">22,140</td>
                  <td className="p-3">621</td>
                  <td className="p-3 pr-0 text-right">
                    <Badge variant="default">Primary</Badge>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
