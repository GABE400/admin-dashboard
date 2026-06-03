import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function PricingLoading() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <Skeleton className="h-8 w-44" />
          <Skeleton className="h-4 w-80" />
        </div>
      </div>

      {/* Interval Toggler */}
      <div className="flex justify-center py-4">
        <Skeleton className="h-10 w-48 rounded-full" />
      </div>

      {/* Grid of pricing cards */}
      <div className="grid gap-6 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i} className="flex flex-col min-h-[450px]">
            <CardContent className="p-6 flex-1 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Skeleton className="h-5 w-20" />
                  <Skeleton className="h-4 w-36" />
                </div>
                <div className="flex items-baseline gap-1">
                  <Skeleton className="h-8 w-20" />
                  <Skeleton className="h-3 w-10" />
                </div>
                <hr className="border-border/60" />
                <div className="space-y-3">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <Skeleton className="h-4 w-4 rounded-full" />
                      <Skeleton className="h-4 w-36" />
                    </div>
                  ))}
                </div>
              </div>
              <Skeleton className="h-10 w-full rounded-lg" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
