import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function ProjectsLoading() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <Skeleton className="h-8 w-44" />
          <Skeleton className="h-4 w-72" />
        </div>
      </div>

      {/* Kanban columns (4 columns grid) */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, colIdx) => (
          <div key={colIdx} className="flex flex-col bg-muted/20 border border-border/80 rounded-xl p-4 min-h-[500px] space-y-4">
            {/* Column Header */}
            <div className="flex items-center justify-between pb-2 border-b border-border/40">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-5 w-8 rounded-full" />
            </div>

            {/* Task list cards inside column */}
            <div className="space-y-3 flex-1 overflow-y-auto">
              {Array.from({ length: colIdx === 0 ? 3 : colIdx === 1 ? 2 : 1 }).map((_, cardIdx) => (
                <Card key={cardIdx} className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-5 w-16 rounded-full" />
                    <Skeleton className="h-4 w-12" />
                  </div>
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  
                  <div className="flex items-center justify-between pt-2 border-t border-border/20">
                    <div className="flex -space-x-1.5 overflow-hidden">
                      {Array.from({ length: 3 }).map((_, avatarIdx) => (
                        <Skeleton key={avatarIdx} className="inline-block h-6 w-6 rounded-full ring-2 ring-background shrink-0" />
                      ))}
                    </div>
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-3 w-8" />
                      <Skeleton className="h-3.5 w-10" />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
