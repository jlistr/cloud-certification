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
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />
        <Input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="pl-10 pr-4 h-10 bg-white border-slate-200"
          id="certification-search"
        />
      </div>

      <Select value={provider} onValueChange={(val) => setProvider(val as CertificationProvider | 'All')}>
        <SelectTrigger className="w-[160px] h-10 bg-white border-none shadow-none hover:bg-slate-50 focus:ring-0">
          <SelectValue placeholder="All Providers" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="All">All Providers</SelectItem>
          <SelectItem value="Microsoft">Microsoft</SelectItem>
          <SelectItem value="AWS">AWS</SelectItem>
        </SelectContent>
      </Select>

      <button
        className="h-10 w-10 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 transition-colors border border-slate-200"
        aria-label="Search info"
      >
        <Info size={20} className="text-slate-400 hover:text-slate-600" />
      </button>
    </div>
  )
}
