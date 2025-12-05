import { useEffect, useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Certificate } from '@phosphor-icons/react'
import { Certification, CertificationProvider, CertificationCard, FilterButtons, SearchBar } from '@/features/certifications'
import { CertificationSkeleton } from '@/components/CertificationSkeleton'
import { Button } from '@/components/ui/button'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { Toaster } from '@/components/ui/sonner'
import { toast } from 'sonner'

function App() {
  const [certifications, setCertifications] = useKV<Certification[]>('certifications', [])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [activeFilter, setActiveFilter] = useState<CertificationProvider | 'All'>('All')
  const [searchQuery, setSearchQuery] = useState('')

  const generateCertifications = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const prompt = (window.spark.llmPrompt as any)`Generate a JSON list of 12 cloud certifications (6 Microsoft Azure, 6 AWS).

Microsoft: AZ-900, AZ-104, AZ-305, AZ-500, AZ-204, DP-203
AWS: Cloud Practitioner, Solutions Architect Associate, Developer Associate, Solutions Architect Professional, Security Specialty, Data Analytics Specialty

For each certification provide:
- id: certification code
- name: full official name
- provider: "Microsoft" or "AWS"
- level: "Foundational", "Associate", "Professional", "Expert", or "Specialty"
- description: concise 1-2 sentence description (max 150 chars)
- studyGuideUrl: official URL

Return ONLY valid JSON. Keep descriptions brief. No markdown, no extra text.

Format:
{"certifications":[{"id":"AZ-900","name":"Microsoft Certified: Azure Fundamentals","provider":"Microsoft","level":"Foundational","description":"Validates foundational cloud knowledge and Azure services.","studyGuideUrl":"https://learn.microsoft.com/certifications/azure-fundamentals/"}]}`

      const result = await window.spark.llm(prompt, 'gpt-4o', true)
      
      let parsed
      try {
        // Try to parse the JSON directly
        parsed = JSON.parse(result)
      } catch (parseError) {
        console.error('JSON Parse Error:', parseError)
        console.error('Raw LLM Response:', result)
        
        // Attempt to repair truncated JSON by finding the last complete object
        try {
          // Find the last complete certification object
          const lastCompleteIndex = result.lastIndexOf('}')
          if (lastCompleteIndex > 0) {
            // Try to close the JSON array and object
            let repairedJson = result.substring(0, lastCompleteIndex + 1)
            if (!repairedJson.trim().endsWith(']}')) {
              repairedJson += ']}'
            } else if (!repairedJson.trim().endsWith('}')) {
              repairedJson += '}'
            }
            parsed = JSON.parse(repairedJson)
            console.log('Successfully repaired truncated JSON')
          } else {
            throw new Error('Could not repair JSON')
          }
        } catch (repairError) {
          console.error('Failed to repair JSON:', repairError)
          throw new Error('Invalid JSON response from AI')
        }
      }

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

  const searchFilteredCertifications = filteredCertifications.filter((cert) => {
    if (!searchQuery) return true
    const query = searchQuery.toLowerCase()
    return (
      cert.name.toLowerCase().includes(query) ||
      cert.id.toLowerCase().includes(query) ||
      cert.description.toLowerCase().includes(query) ||
      cert.level.toLowerCase().includes(query)
    )
  })

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
          <>
            <div className="mb-8">
              <SearchBar value={searchQuery} onChange={setSearchQuery} />
            </div>
            <div className="mb-8">
              <FilterButtons
                activeFilter={activeFilter}
                onFilterChange={setActiveFilter}
                counts={counts}
              />
            </div>
          </>
        )}

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <CertificationSkeleton key={i} />
            ))}
          </div>
        ) : searchFilteredCertifications && searchFilteredCertifications.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchFilteredCertifications.map((cert, index) => (
              <CertificationCard key={cert.id} certification={cert} index={index} />
            ))}
          </div>
        ) : (
          !error && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                {searchQuery ? 'No certifications match your search.' : 'No certifications found.'}
              </p>
            </div>
          )
        )}
      </div>
    </div>
  )
}

export default App