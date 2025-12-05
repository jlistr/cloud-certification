import { MagnifyingGlass, Info } from '@phosphor-icons/react'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { CertificationProvider } from '@/lib/types'
import { useState, KeyboardEvent } from 'react'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  onSearch?: (query: string, provider: CertificationProvider | 'All') => void
  placeholder?: string
}

export function SearchBar({ 
  value, 
  onChange, 
  onSearch,
  placeholder = 'Search certifications (e.g. SAA-C03, Azure)...' 
}: SearchBarProps) {
  const [provider, setProvider] = useState<CertificationProvider | 'All'>('All')

  const handleSearch = () => {
    onSearch?.(value, provider)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSearch()
    }
  }

  return (
    <div className="flex gap-3 items-center w-full">
      <div className="relative flex-1">
        <MagnifyingGlass 
          size={20} 
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        <Input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="pl-10 pr-4 h-11 bg-background"
          id="certification-search"
        />
      </div>

      <Select value={provider} onValueChange={(val) => setProvider(val as CertificationProvider | 'All')}>
        <SelectTrigger className="w-[160px] h-11 bg-background">
          <SelectValue placeholder="All Providers" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="All">All Providers</SelectItem>
          <SelectItem value="Microsoft">Microsoft</SelectItem>
          <SelectItem value="AWS">AWS</SelectItem>
        </SelectContent>
      </Select>

      <button
        className="h-11 w-11 flex items-center justify-center rounded-full bg-muted hover:bg-muted/80 transition-colors"
        aria-label="Search info"
      >
        <Info size={20} className="text-muted-foreground" />
      </button>
    </div>
  )
}
