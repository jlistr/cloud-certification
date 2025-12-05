import { useState } from 'react'
import { Certificate } from '@phosphor-icons/react'
import { useCertificationsStore } from '../hooks/useCertificationsStore'
import { useCertificationSearch } from '../hooks/useCertificationSearch'

export function CertificationsPage() {
  const { certifications, addCertification, updateCertification, isLoading, refresh } = useCertificationsStore()
  const { results, isLoading: searchLoading, error, search } = useCertificationSearch()
  const [activeFilter, setActiveFilter] = useState<'All' | 'Microsoft' | 'AWS'>('All')

  return (
    <div className="min-h-screen bg-background">
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
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover and explore popular cloud certifications from Microsoft Azure and AWS. Find
            the right certification for your career path.
          </p>
        </header>
      </div>
    </div>
  )
}
