import { useState, useMemo } from 'react'
import { SquaresFour, List, BookOpen } from '@phosphor-icons/react'
import { useCertificationsStore } from '../hooks/useCertificationsStore'
import { CertificationGrid } from './CertificationGrid'
import { SearchBar } from './SearchBar'
import { CertificationSkeleton } from '../../../components/CertificationSkeleton'
import { Toaster } from '@/components/ui/sonner'
import { CertificationProvider } from '@/lib/types'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export function CertificationsPage() {
  const { certifications, isLoading } = useCertificationsStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const filteredCertifications = useMemo(() => {
    let filtered = certifications

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
  }, [certifications, searchQuery])

  return (
    <div className="min-h-screen bg-background">
      <Toaster />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <header className="mb-8 text-center">
          <div className="flex justify-center mb-3">
            <BookOpen size={32} weight="duotone" className="text-[#3b82f6]" />
          </div>
          <h2 className="text-2xl font-semibold text-foreground mb-2">
            Cloud Certification Hub
          </h2>
          <p className="text-muted-foreground text-base max-w-3xl mx-auto">
            Discover and explore popular cloud certifications from Microsoft Azure and AWS. Find the right certification for your career path.
          </p>
        </header>

        <Card className="p-6 mb-6">
          <div className="mb-4">
            <SearchBar 
              value={searchQuery} 
              onChange={setSearchQuery}
              placeholder="Search certifications (e.g. SAA-C03, Azure)..."
            />
          </div>

          <div className="flex items-center justify-between pt-4 border-t">
            <p className="text-sm text-muted-foreground">
              Showing {filteredCertifications.length} of {certifications.length} certifications
            </p>
            
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="gap-2"
              >
                <SquaresFour size={18} weight="bold" />
                Grid
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="gap-2"
              >
                <List size={18} weight="bold" />
                List
              </Button>
            </div>
          </div>
        </Card>

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
