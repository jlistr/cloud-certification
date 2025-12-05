import { Certificate } from '@phosphor-icons/react'
import { useCertificationsStore } from '../hooks/useCertificationsStore'
import { CertificationGrid } from './CertificationGrid'
import { Toaster } from '@/components/ui/sonner'
import { CertificationSkeleton } from '@/components/CertificationSkeleton'

export function CertificationsPage() {
  const { certifications, isLoading } = useCertificationsStore()

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
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover and explore popular cloud certifications from Microsoft Azure and AWS. Find
            the right certification for your career path.
          </p>
        </header>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <CertificationSkeleton key={i} />
            ))}
          </div>
        ) : (
          <CertificationGrid certifications={certifications} />
        )}
      </div>
    </div>
  )
}
