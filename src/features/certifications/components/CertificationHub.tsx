import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { MagnifyingGlass, Plus } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from 'sonner'
import { Certification, CertificationProvider } from '../types'
import { FilterButtons } from './FilterButtons'
import { CertificationGrid } from './CertificationGrid'

export function CertificationHub() {
  const [savedCertifications, setSavedCertifications] = useKV<Certification[]>(
    'saved-certifications',
    []
  )
  
  const [searchProvider, setSearchProvider] = useState<CertificationProvider>('Microsoft')
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<Certification[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [activeFilter, setActiveFilter] = useState<CertificationProvider | 'All'>('All')

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      toast.error('Please enter a search term')
      return
    }

    setIsSearching(true)

    try {
      const prompt = window.spark.llmPrompt`Search for ${searchProvider} cloud certifications related to: "${searchQuery}"

Find up to 5 relevant certifications that match this search query. For each certification provide:
- id: certification code (e.g., AZ-900, AWS-SAA)
- name: full official name
- provider: "${searchProvider}"
- level: "Foundational", "Associate", "Professional", "Expert", or "Specialty"
- description: concise 1-2 sentence description (max 150 chars)
- studyGuideUrl: official URL to study guide or certification page

Return ONLY valid JSON. No markdown, no extra text.

Format:
{"certifications":[{"id":"AZ-900","name":"Microsoft Certified: Azure Fundamentals","provider":"${searchProvider}","level":"Foundational","description":"Validates foundational cloud knowledge and Azure services.","studyGuideUrl":"https://learn.microsoft.com/certifications/azure-fundamentals/"}]}`

      const result = await window.spark.llm(prompt, 'gpt-4o', true)
      const parsed = JSON.parse(result)

      if (parsed.certifications && Array.isArray(parsed.certifications)) {
        setSearchResults(parsed.certifications.slice(0, 5))
        toast.success(`Found ${parsed.certifications.length} certification(s)`)
      } else {
        throw new Error('Invalid response format')
      }
    } catch (err) {
      toast.error('Search failed. Please try again.')
      console.error(err)
    } finally {
      setIsSearching(false)
    }
  }

  const handleSelectCertification = (cert: Certification) => {
    setSavedCertifications((current) => {
      const currentList = current || []
      const exists = currentList.some((c) => c.id === cert.id)
      if (exists) {
        toast.info('Certification already saved')
        return currentList
      }
      toast.success(`${cert.name} saved!`)
      return [...currentList, cert]
    })
  }

  const filteredSavedCertifications =
    activeFilter === 'All'
      ? savedCertifications || []
      : (savedCertifications || []).filter((cert) => cert.provider === activeFilter)

  const counts = {
    all: savedCertifications?.length || 0,
    microsoft: (savedCertifications || []).filter((c) => c.provider === 'Microsoft').length,
    aws: (savedCertifications || []).filter((c) => c.provider === 'AWS').length,
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Foundational':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200'
      case 'Associate':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'Professional':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'Expert':
        return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'Specialty':
        return 'bg-amber-100 text-amber-800 border-amber-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  return (
    <div className="space-y-12">
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">Search Certifications</h2>
          <p className="text-muted-foreground">
            Search for cloud certifications by keyword or topic
          </p>
        </div>

        <Card className="p-6 max-w-4xl mx-auto">
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <Select
                value={searchProvider}
                onValueChange={(value) => setSearchProvider(value as CertificationProvider)}
              >
                <SelectTrigger className="w-full sm:w-[180px]" id="provider-select">
                  <SelectValue placeholder="Select provider" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Microsoft">Microsoft</SelectItem>
                  <SelectItem value="AWS">AWS</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex-1 relative">
                <Input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder="e.g., security, networking, databases..."
                  className="pr-10"
                  id="search-input"
                />
              </div>

              <Button
                onClick={handleSearch}
                disabled={isSearching || !searchQuery.trim()}
                className="gap-2"
              >
                {isSearching ? (
                  'Searching...'
                ) : (
                  <>
                    <MagnifyingGlass weight="bold" />
                    Search
                  </>
                )}
              </Button>
            </div>
          </div>
        </Card>
      </section>

      {searchResults.length > 0 && (
        <section className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold tracking-tight">Search Results</h2>
            <p className="text-muted-foreground">
              Select certifications to save to your collection
            </p>
          </div>

          <div className="grid gap-4 max-w-4xl mx-auto">
            {searchResults.map((cert) => (
              <Card key={cert.id} className="p-4 hover:shadow-md transition-shadow">
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge
                        variant="outline"
                        className={`${getLevelColor(cert.level)} text-xs font-semibold`}
                      >
                        {cert.level}
                      </Badge>
                      <span className="text-xs font-semibold text-primary">
                        {cert.provider} · {cert.id}
                      </span>
                    </div>
                    <h3 className="font-semibold text-lg leading-tight">{cert.name}</h3>
                    <p className="text-sm text-muted-foreground">{cert.description}</p>
                  </div>
                  <Button
                    onClick={() => handleSelectCertification(cert)}
                    variant="default"
                    className="gap-2 whitespace-nowrap"
                  >
                    <Plus weight="bold" />
                    Select & Save
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </section>
      )}

      <section className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">Saved Certifications</h2>
          <p className="text-muted-foreground">
            Your collection of cloud certifications ({counts.all})
          </p>
        </div>

        {counts.all > 0 && (
          <div className="flex justify-center">
            <FilterButtons
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
              counts={counts}
            />
          </div>
        )}

        <CertificationGrid certifications={filteredSavedCertifications} />
      </section>
    </div>
  )
}
