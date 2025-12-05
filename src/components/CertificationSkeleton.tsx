import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function CertificationSkeleton() {
  return (
    <Card className="p-6 h-full bg-white border border-slate-200 shadow-sm">
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-col gap-2 flex-1">
            <Skeleton className="h-5 w-24 bg-slate-200" />
            <Skeleton className="h-6 w-full bg-slate-200" />
          </div>
        </div>

        <div className="space-y-2">
          <Skeleton className="h-4 w-full bg-slate-200" />
          <Skeleton className="h-4 w-full bg-slate-200" />
          <Skeleton className="h-4 w-3/4 bg-slate-200" />
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <Skeleton className="h-4 w-20 bg-slate-200" />
          <Skeleton className="h-8 w-28 bg-slate-200" />
        </div>
      </div>
    </Card>
  )
}
