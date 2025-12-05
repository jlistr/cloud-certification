import { MagnifyingGlass, X } from '@phosphor-icons/react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { CertificationProvider } from '@/lib/types'
import { useState, useEffect, KeyboardEvent } from 'react'

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
  placeholder = 'Search by name, code, or tier...' 
}: SearchBarProps) {
  const [provider, setProvider] = useState<CertificationProvider | 'All'>('All')
  const [searchError, setSearchError] = useState<string>('')

  const validateSearchTerms = (query: string): boolean => {
    if (!query.trim()) {
      setSearchError('')
      return true
    }

    const hasMinimumLength = query.trim().length >= 2
    
    if (!hasMinimumLength) {
      setSearchError('Search term must be at least 2 characters')
      return false
    }

    setSearchError('')
    return true
  }

  useEffect(() => {
    validateSearchTerms(value)
  }, [value])

  const handleSearch = () => {
    if (validateSearchTerms(value)) {
      onSearch?.(value, provider)
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSearch()
    }
  }

  const handleClear = () => {
    onChange('')
    setSearchError('')
    onSearch?.('', provider)
  }

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <div className="flex gap-2 items-start">
        <Select value={provider} onValueChange={(val) => setProvider(val as CertificationProvider | 'All')}>
          <SelectTrigger className="w-[160px] h-12 bg-background border-input">
            <SelectValue placeholder="All Providers" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Providers</SelectItem>
            <SelectItem value="Microsoft">Microsoft</SelectItem>
            <SelectItem value="AWS">AWS</SelectItem>
          </SelectContent>
        </Select>

        <div className="relative flex-1">
          <Input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="h-12 pl-4 pr-20 text-base border-input"
            id="certification-search"
            aria-label="Search certifications"
            aria-invalid={!!searchError}
            aria-describedby={searchError ? 'search-error' : undefined}
          />
          <div className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-1">
            {value && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClear}
                className="h-9 w-9 p-0 hover:bg-muted"
                aria-label="Clear search"
              >
                <X size={16} />
              </Button>
            )}
            <Button
              variant="default"
              size="sm"
              onClick={handleSearch}
              className="h-9 w-9 p-0"
              aria-label="Search"
              disabled={!!searchError && !!value}
            >
              <MagnifyingGlass size={18} weight="bold" />
            </Button>
          </div>
        </div>
      </div>
      
      {searchError && (
        <p 
          id="search-error" 
          className="text-destructive text-sm mt-2 ml-[168px]"
          role="alert"
        >
          {searchError}
        </p>
      )}
      
      <p className="text-muted-foreground text-xs mt-3 ml-[168px]">
        Search by certification name, code (e.g., AZ-900, AWS-SAA), or tier (Foundational, Associate, Expert)
      </p>
    </div>
  )
}
