"use client";

import * as React from "react";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/app/utils";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function CalendarError({ error, reset }: ErrorProps) {
  return (
    <div className="flex min-h-[70vh] items-center justify-center p-4">
      <Card className="max-w-md w-full border-destructive/20 shadow-md">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 text-destructive mb-3">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <CardTitle className="text-xl font-bold">Calendar Load Error</CardTitle>
          <CardDescription>
            Failed to parse user events timeline schedules.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <div className="rounded-lg bg-muted/50 p-3 text-xs font-mono text-muted-foreground break-all max-h-32 overflow-y-auto border border-border/50">
            {error.message || "Event schedules database synchronization timeout"}
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-center gap-3 border-t border-border/50 pt-4">
          <Button onClick={() => reset()} className="gap-2">
            <RotateCcw className="h-4 w-4" />
            Reload Calendar
          </Button>
          <Link href="/" className={cn(buttonVariants({ variant: "outline" }), "gap-2")}>
              <Home className="h-4 w-4" />
              Return Home
            </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
