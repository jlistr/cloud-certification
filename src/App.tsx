import { useEffect, useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Certificate } from '@phosphor-icons/react'
import { Certification, CertificationProvider } from '@/lib/types'
import { CertificationCard } from '@/components/CertificationCard'
import { FilterButtons } from '@/components/FilterButtons'
import { CertificationSkeleton } from '@/components/CertificationSkeleton'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Toaster } from '@/components/ui/sonner'
import { toast } from 'sonner'

function App() {
  const [certifications, setCertifications] = useKV<Certification[]>('certifications', [])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [activeFilter, setActiveFilter] = useState<CertificationProvider | 'All'>('All')

  const generateCertifications = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const prompt = window.spark.llmPrompt`You are a cloud certification expert. Generate a comprehensive list of popular cloud certifications.

Create exactly 12 certifications total: 6 Microsoft Azure certifications and 6 AWS certifications.

For Microsoft certifications, include a mix of:
- Azure Fundamentals (AZ-900)
- Azure Administrator Associate (AZ-104)
- Azure Solutions Architect Expert (AZ-305)
- Azure Security Engineer Associate (AZ-500)
- Azure Developer Associate (AZ-204)
- Azure Data Engineer Associate (DP-203)

For AWS certifications, include a mix of:
- AWS Certified Cloud Practitioner
- AWS Certified Solutions Architect - Associate
- AWS Certified Developer - Associate
- AWS Certified Solutions Architect - Professional
- AWS Certified Security - Specialty
- AWS Certified Data Analytics - Specialty

For each certification, provide:
- A unique ID (use certification code where applicable)
- Full official name
- Provider (either "Microsoft" or "AWS")
- Level (one of: "Foundational", "Associate", "Professional", "Expert", or "Specialty")
- A detailed 2-3 sentence description explaining what the certification covers and who it's for
- A realistic study guide URL (use official Microsoft Learn or AWS Training URLs)

Return the result as valid JSON with a single property called "certifications" that contains an array of certification objects.

Format:
{
  "certifications": [
    {
      "id": "AZ-900",
      "name": "Microsoft Certified: Azure Fundamentals",
      "provider": "Microsoft",
      "level": "Foundational",
      "description": "Description here",
      "studyGuideUrl": "https://learn.microsoft.com/..."
    }
  ]
}`

      const result = await window.spark.llm(prompt, 'gpt-4o', true)
      const parsed = JSON.parse(result)

      if (parsed.certifications && Array.isArray(parsed.certifications)) {
        setCertifications(parsed.certifications)
        toast.success('Certifications loaded successfully!')
      } else {
        throw new Error('Invalid response format')
      }
    } catch (err) {
      setError('Failed to load certifications. Please try again.')
      toast.error('Failed to load certifications')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (!certifications || certifications.length === 0) {
      generateCertifications()
    }
  }, [])

  const filteredCertifications =
    activeFilter === 'All'
      ? certifications || []
      : (certifications || []).filter((cert) => cert.provider === activeFilter)

  const counts = {
    all: certifications?.length || 0,
    microsoft: (certifications || []).filter((c) => c.provider === 'Microsoft').length,
    aws: (certifications || []).filter((c) => c.provider === 'AWS').length,
  }

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

        {error && (
          <Alert variant="destructive" className="mb-8">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription className="flex items-center justify-between">
              <span>{error}</span>
              <Button variant="outline" size="sm" onClick={generateCertifications}>
                Retry
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {!isLoading && !error && certifications && certifications.length > 0 && (
          <div className="mb-8">
            <FilterButtons
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
              counts={counts}
            />
          </div>
        )}

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <CertificationSkeleton key={i} />
            ))}
          </div>
        ) : filteredCertifications && filteredCertifications.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCertifications.map((cert, index) => (
              <CertificationCard key={cert.id} certification={cert} index={index} />
            ))}
          </div>
        ) : (
          !error && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No certifications found.</p>
            </div>
          )
        )}
      </div>
    </div>
  )
}

export default App