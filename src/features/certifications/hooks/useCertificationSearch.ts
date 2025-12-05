import { useState, useCallback } from 'react'
import { Certification } from '../types'

const MOCK_SEARCH_DATABASE: Certification[] = [
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
    id: 'AZ-204',
    name: 'Microsoft Certified: Azure Developer Associate',
    provider: 'Microsoft',
    level: 'Associate',
    description: 'Validates skills in designing, building, testing, and maintaining cloud applications and services.',
    studyGuideUrl: 'https://learn.microsoft.com/certifications/azure-developer/'
  },
  {
    id: 'DP-203',
    name: 'Microsoft Certified: Azure Data Engineer Associate',
    provider: 'Microsoft',
    level: 'Associate',
    description: 'Validates expertise in integrating, transforming, and consolidating data from various sources.',
    studyGuideUrl: 'https://learn.microsoft.com/certifications/azure-data-engineer/'
  },
  {
    id: 'DP-900',
    name: 'Microsoft Certified: Azure Data Fundamentals',
    provider: 'Microsoft',
    level: 'Foundational',
    description: 'Validates foundational knowledge of core data concepts and Microsoft Azure data services.',
    studyGuideUrl: 'https://learn.microsoft.com/certifications/azure-data-fundamentals/'
  },
  {
    id: 'AI-900',
    name: 'Microsoft Certified: Azure AI Fundamentals',
    provider: 'Microsoft',
    level: 'Foundational',
    description: 'Validates foundational knowledge of machine learning and artificial intelligence concepts.',
    studyGuideUrl: 'https://learn.microsoft.com/certifications/azure-ai-fundamentals/'
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
    id: 'DVA-C02',
    name: 'AWS Certified Developer - Associate',
    provider: 'AWS',
    level: 'Associate',
    description: 'Validates proficiency in developing and maintaining AWS-based applications.',
    studyGuideUrl: 'https://aws.amazon.com/certification/certified-developer-associate/'
  },
  {
    id: 'SOA-C02',
    name: 'AWS Certified SysOps Administrator - Associate',
    provider: 'AWS',
    level: 'Associate',
    description: 'Validates ability to deploy, manage, and operate workloads on AWS.',
    studyGuideUrl: 'https://aws.amazon.com/certification/certified-sysops-admin-associate/'
  },
  {
    id: 'SAP-C02',
    name: 'AWS Certified Solutions Architect - Professional',
    provider: 'AWS',
    level: 'Professional',
    description: 'Validates advanced technical skills and experience in designing distributed applications on AWS.',
    studyGuideUrl: 'https://aws.amazon.com/certification/certified-solutions-architect-professional/'
  },
  {
    id: 'DOP-C02',
    name: 'AWS Certified DevOps Engineer - Professional',
    provider: 'AWS',
    level: 'Professional',
    description: 'Validates technical expertise in provisioning, operating, and managing distributed systems on AWS.',
    studyGuideUrl: 'https://aws.amazon.com/certification/certified-devops-engineer-professional/'
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
  },
  {
    id: 'ANS-C01',
    name: 'AWS Certified Advanced Networking - Specialty',
    provider: 'AWS',
    level: 'Specialty',
    description: 'Validates expertise in designing and implementing AWS and hybrid network architectures.',
    studyGuideUrl: 'https://aws.amazon.com/certification/certified-advanced-networking-specialty/'
  },
  {
    id: 'MLS-C01',
    name: 'AWS Certified Machine Learning - Specialty',
    provider: 'AWS',
    level: 'Specialty',
    description: 'Validates expertise in building, training, tuning, and deploying machine learning models on AWS.',
    studyGuideUrl: 'https://aws.amazon.com/certification/certified-machine-learning-specialty/'
  }
]

interface UseCertificationSearchReturn {
  results: Certification[]
  isLoading: boolean
  error: string | null
  search: (query: string) => Promise<void>
  selectResult: (certification: Certification) => void
}

export function useCertificationSearch(): UseCertificationSearchReturn {
  const [results, setResults] = useState<Certification[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const search = useCallback(async (query: string) => {
    if (!query.trim()) {
      setResults([])
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      await new Promise((resolve) => setTimeout(resolve, 300))

      const normalizedQuery = query.toLowerCase().trim()
      const searchResults = MOCK_SEARCH_DATABASE.filter((cert) => {
        return (
          cert.id.toLowerCase().includes(normalizedQuery) ||
          cert.name.toLowerCase().includes(normalizedQuery) ||
          cert.description.toLowerCase().includes(normalizedQuery) ||
          cert.level.toLowerCase().includes(normalizedQuery) ||
          cert.provider.toLowerCase().includes(normalizedQuery)
        )
      })

      setResults(searchResults)
    } catch (err) {
      setError('Search failed. Please try again.')
      console.error(err)
      setResults([])
    } finally {
      setIsLoading(false)
    }
  }, [])

  const selectResult = useCallback((certification: Certification) => {
    console.log('Selected certification:', certification)
  }, [])

  return {
    results,
    isLoading,
    error,
    search,
    selectResult
  }
}
