import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export function InvoiceListSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <Card key={i} className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-3 flex-1">
              <div className="flex items-center gap-4">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-5 w-16 rounded-full" />
              </div>
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-4 w-32" />
            </div>
            <div className="space-y-3 text-right">
              <Skeleton className="h-7 w-24 ml-auto" />
              <Skeleton className="h-4 w-20 ml-auto" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
