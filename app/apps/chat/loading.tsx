import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function ChatLoading() {
  return (
    <div className="h-[calc(100vh-10rem)] border border-border/80 rounded-xl overflow-hidden bg-card flex">
      {/* Left side list skeleton (1/4 width) */}
      <div className="w-80 border-r border-border/80 flex flex-col shrink-0">
        <div className="p-4 border-b border-border/80 space-y-3">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-9 w-full" />
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 p-2 rounded-lg">
              <Skeleton className="h-10 w-10 rounded-full shrink-0" />
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex justify-between">
                  <Skeleton className="h-3.5 w-20" />
                  <Skeleton className="h-3 w-8" />
                </div>
                <Skeleton className="h-3 w-32" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main chat window skeleton */}
      <div className="flex-1 flex flex-col">
        {/* Chat header */}
        <div className="p-4 border-b border-border/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-1">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-9 w-9 rounded-lg" />
            <Skeleton className="h-9 w-9 rounded-lg" />
          </div>
        </div>

        {/* Message streams area */}
        <div className="flex-1 p-6 space-y-4 overflow-y-auto bg-zinc-55/10 dark:bg-zinc-950/5">
          <div className="flex items-start gap-3">
            <Skeleton className="h-8 w-8 rounded-full" />
            <div className="space-y-1.5 max-w-sm">
              <Skeleton className="h-14 w-60 rounded-xl" />
              <Skeleton className="h-3 w-10" />
            </div>
          </div>

          <div className="flex items-start justify-end gap-3">
            <div className="space-y-1.5 max-w-sm flex flex-col items-end">
              <Skeleton className="h-10 w-48 rounded-xl" />
              <Skeleton className="h-3 w-10" />
            </div>
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>

          <div className="flex items-start gap-3">
            <Skeleton className="h-8 w-8 rounded-full" />
            <div className="space-y-1.5 max-w-sm">
              <Skeleton className="h-16 w-64 rounded-xl" />
              <Skeleton className="h-3 w-10" />
            </div>
          </div>
        </div>

        {/* Input box */}
        <div className="p-4 border-t border-border/80 flex items-center gap-3">
          <Skeleton className="h-9 w-9 rounded-lg" />
          <Skeleton className="h-9 flex-1 rounded-lg" />
          <Skeleton className="h-9 w-16 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
