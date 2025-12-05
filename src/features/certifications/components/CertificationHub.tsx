import { useState } from 'react'
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

const MOCK_CERTIFICATIONS: Certification[] = [
  {
    id: 'AZ-900',
    name: 'Microsoft Certified: Azure Fundamentals',
    provider: 'Microsoft',
    level: 'Foundational',
    description: 'Validates foundational knowledge of cloud services and how those services are provided with Microsoft Azure.',
    studyGuideUrl: 'https://learn.microsoft.com/certifications/azure-fundamentals/'
  },
  {
    id: 'AZ-104',
    name: 'Microsoft Certified: Azure Administrator Associate',
    provider: 'Microsoft',
    level: 'Associate',
    description: 'Validates skills in implementing, managing, and monitoring an organization\'s Microsoft Azure environment.',
    studyGuideUrl: 'https://learn.microsoft.com/certifications/azure-administrator/'
  },
  {
    id: 'AZ-305',
    name: 'Microsoft Certified: Azure Solutions Architect Expert',
    provider: 'Microsoft',
    level: 'Expert',
    description: 'Validates expertise in designing cloud and hybrid solutions that run on Microsoft Azure.',
    studyGuideUrl: 'https://learn.microsoft.com/certifications/azure-solutions-architect/'
  },
  {
    id: 'AZ-500',
    name: 'Microsoft Certified: Azure Security Engineer Associate',
    provider: 'Microsoft',
    level: 'Associate',
    description: 'Validates skills in implementing security controls and threat protection on Azure.',
    studyGuideUrl: 'https://learn.microsoft.com/certifications/azure-security-engineer/'
  },
  {
    id: 'CLF-C02',
    name: 'AWS Certified Cloud Practitioner',
    provider: 'AWS',
    level: 'Foundational',
    description: 'Validates overall understanding of the AWS Cloud, independent of specific technical roles.',
    studyGuideUrl: 'https://aws.amazon.com/certification/certified-cloud-practitioner/'
  },
  {
    id: 'SAA-C03',
    name: 'AWS Certified Solutions Architect - Associate',
    provider: 'AWS',
    level: 'Associate',
    description: 'Validates ability to design and implement distributed systems on AWS.',
    studyGuideUrl: 'https://aws.amazon.com/certification/certified-solutions-architect-associate/'
  },
  {
    id: 'SCS-C02',
    name: 'AWS Certified Security - Specialty',
    provider: 'AWS',
    level: 'Specialty',
    description: 'Validates expertise in securing AWS workloads and implementing security controls.',
    studyGuideUrl: 'https://aws.amazon.com/certification/certified-security-specialty/'
  },
  {
    id: 'DAS-C01',
    name: 'AWS Certified Data Analytics - Specialty',
    provider: 'AWS',
    level: 'Specialty',
    description: 'Validates expertise in designing and implementing AWS services to derive value from data.',
    studyGuideUrl: 'https://aws.amazon.com/certification/certified-data-analytics-specialty/'
  }
]

export function CertificationHub() {
  const [savedCertifications, setSavedCertifications] = useState<Certification[]>([])
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
      await new Promise((resolve) => setTimeout(resolve, 500))

      const normalizedQuery = searchQuery.toLowerCase().trim()
      const results = MOCK_CERTIFICATIONS.filter((cert) => {
        if (cert.provider !== searchProvider) return false
        return (
          cert.id.toLowerCase().includes(normalizedQuery) ||
          cert.name.toLowerCase().includes(normalizedQuery) ||
          cert.description.toLowerCase().includes(normalizedQuery) ||
          cert.level.toLowerCase().includes(normalizedQuery)
        )
      })

      setSearchResults(results.slice(0, 5))
      toast.success(`Found ${results.length} certification(s)`)
    } catch (err) {
      toast.error('Search failed. Please try again.')
      console.error(err)
    } finally {
      setIsSearching(false)
    }
  }

  const handleSelectCertification = (cert: Certification) => {
    const exists = savedCertifications.some((c) => c.id === cert.id)
    if (exists) {
      toast.info('Certification already saved')
      return
    }
    setSavedCertifications([...savedCertifications, cert])
    toast.success(`${cert.name} saved!`)
  }

  const filteredSavedCertifications =
    activeFilter === 'All'
      ? savedCertifications
      : savedCertifications.filter((cert) => cert.provider === activeFilter)

  const counts = {
    all: savedCertifications.length,
    microsoft: savedCertifications.filter((c) => c.provider === 'Microsoft').length,
    aws: savedCertifications.filter((c) => c.provider === 'AWS').length,
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
