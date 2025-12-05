import { useState, useMemo, useCallback } from 'react'
import { Certificate } from '@phosphor-icons/react'
import { useCertificationsStore } from '../hooks/useCertificationsStore'
import { CertificationGrid } from './CertificationGrid'
import { SearchBar } from '../../../components/SearchBar'
import { CertificationSkeleton } from '../../../components/CertificationSkeleton'
import { Toaster } from '@/components/ui/sonner'
import { CertificationProvider } from '@/lib/types'
import { toast } from 'sonner'

export function CertificationsPage() {
  const { certifications, isLoading } = useCertificationsStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [activeProvider, setActiveProvider] = useState<CertificationProvider | 'All'>('All')

  const filteredCertifications = useMemo(() => {
    let filtered = certifications

    if (activeProvider !== 'All') {
      filtered = filtered.filter(cert => cert.provider === activeProvider)
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(cert => {
        const nameMatch = cert.name.toLowerCase().includes(query)
        const providerMatch = cert.provider.toLowerCase().includes(query)
        const levelMatch = cert.level.toLowerCase().includes(query)
        const descriptionMatch = cert.description.toLowerCase().includes(query)
        
        const codeMatch = cert.id.toLowerCase().includes(query)
        
        return nameMatch || providerMatch || levelMatch || descriptionMatch || codeMatch
      })
    }

    return filtered
  }, [certifications, searchQuery, activeProvider])

  const handleSearch = useCallback((query: string, provider: CertificationProvider | 'All') => {
    setSearchQuery(query)
    setActiveProvider(provider)
    
    if (query.trim()) {
      toast.success(`Searching for "${query}" ${provider !== 'All' ? `in ${provider}` : ''}`)
    }
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Toaster />
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Certificate size={40} weight="bold" className="text-primary" />
            <h1
              className="text-4xl font-bold tracking-tight text-foreground"
              style={{ fontFamily: 'var(--font-space)' }}
            >
              Cloud Certification Hub
            </h1>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Discover and explore popular cloud certifications from Microsoft Azure and AWS. Find
            the right certification for your career path.
          </p>
          
          <SearchBar 
            value={searchQuery} 
            onChange={setSearchQuery}
            onSearch={handleSearch}
            placeholder="Search by name, code, or tier..."
          />
        </header>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <CertificationSkeleton key={i} />
            ))}
          </div>
        ) : (
          <>
            <CertificationGrid certifications={filteredCertifications} />
            {filteredCertifications.length === 0 && searchQuery && (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  No certifications found matching "{searchQuery}"
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
