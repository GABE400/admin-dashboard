import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function ProfileLoading() {
  return (
    <div className="space-y-6">
      {/* Profile Cover + avatar skeleton */}
      <div className="relative rounded-2xl overflow-hidden border border-border/80 bg-muted/20">
        <Skeleton className="h-48 w-full rounded-t-2xl" />
        <div className="px-6 pb-6 pt-16 relative flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="absolute -top-16 left-6 md:left-10 h-28 w-28 rounded-full border-4 border-background overflow-hidden bg-muted">
            <Skeleton className="h-full w-full rounded-full" />
          </div>
          <div className="space-y-1.5 pt-4 md:pt-0">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-32" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-9 w-24" />
            <Skeleton className="h-9 w-28" />
          </div>
        </div>
      </div>

      {/* Stats summary row skeleton */}
      <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-4 text-center space-y-2">
              <Skeleton className="h-7 w-16 mx-auto" />
              <Skeleton className="h-3.5 w-24 mx-auto" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Inner tabs layout skeleton */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Left biography card */}
        <div className="md:col-span-1">
          <Card>
            <CardContent className="p-6 space-y-4">
              <Skeleton className="h-5 w-24" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
              <div className="space-y-3 pt-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex gap-2">
                    <Skeleton className="h-4 w-4 shrink-0" />
                    <Skeleton className="h-4 w-28" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right content logs tab */}
        <div className="md:col-span-2">
          <Card>
            <CardContent className="p-6 space-y-6">
              <div className="flex gap-4 border-b border-border/80 pb-3">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-5 w-24" />
              </div>
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex gap-3 items-start border-l-2 border-primary/20 pl-4 py-1">
                    <div className="space-y-1">
                      <Skeleton className="h-4 w-40" />
                      <Skeleton className="h-3.5 w-64" />
                      <Skeleton className="h-3 w-16" />
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
