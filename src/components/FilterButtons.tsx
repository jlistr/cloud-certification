import { Button } from '@/components/ui/button'
import { CertificationProvider } from '@/lib/types'

interface FilterButtonsProps {
  activeFilter: CertificationProvider | 'All'
  onFilterChange: (filter: CertificationProvider | 'All') => void
  counts: {
    all: number
    microsoft: number
    aws: number
  }
}

export function FilterButtons({ activeFilter, onFilterChange, counts }: FilterButtonsProps) {
  const filters: Array<{ value: CertificationProvider | 'All'; label: string; count: number }> = [
    { value: 'All', label: 'All Certifications', count: counts.all },
    { value: 'Microsoft', label: 'Microsoft', count: counts.microsoft },
    { value: 'AWS', label: 'AWS', count: counts.aws },
  ]

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {filters.map((filter) => (
        <Button
          key={filter.value}
          variant={activeFilter === filter.value ? 'default' : 'outline'}
          onClick={() => onFilterChange(filter.value)}
          className="transition-all duration-200 active:scale-95"
        >
          {filter.label}
          <span className="ml-2 text-xs opacity-80">({filter.count})</span>
        </Button>
      ))}
    </div>
  )
}
