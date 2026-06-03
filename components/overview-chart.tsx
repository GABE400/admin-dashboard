"use client";

import * as React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as ChartTooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", revenue: 12000, active: 400 },
  { name: "Feb", revenue: 15000, active: 480 },
  { name: "Mar", revenue: 18000, active: 590 },
  { name: "Apr", revenue: 22000, active: 730 },
  { name: "May", revenue: 26000, active: 890 },
  { name: "Jun", revenue: 32000, active: 1040 },
  { name: "Jul", revenue: 38000, active: 1150 },
  { name: "Aug", revenue: 41000, active: 1210 },
  { name: "Sep", revenue: 44000, active: 1240 },
  { name: "Oct", revenue: 48250, active: 1284 },
];

export function OverviewChart() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex h-[350px] w-full items-center justify-center rounded-lg border border-dashed border-border bg-muted/20">
        <span className="text-sm text-muted-foreground animate-pulse">Initializing analytics module...</span>
      </div>
    );
  }

  return (
    <div className="h-[350px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: -10,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.2} />
              <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border) / 0.5)" />
          <XAxis
            dataKey="name"
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            dy={10}
          />
          <YAxis
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${value / 1000}k`}
            dx={-10}
          />
          <ChartTooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="rounded-lg border border-border bg-popover p-3 shadow-md">
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                        Revenue
                      </span>
                      <span className="text-sm font-bold text-foreground">
                        ${payload[0].value?.toLocaleString()}
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
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorRevenue)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
