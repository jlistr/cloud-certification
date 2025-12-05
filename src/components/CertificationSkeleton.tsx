import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function CertificationSkeleton() {
  return (
    <Card className="p-6 h-full">
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-col gap-2 flex-1">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-6 w-full" />
          </div>
        </div>

        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-8 w-28" />
        </div>
      </div>
    </Card>
  )
}
