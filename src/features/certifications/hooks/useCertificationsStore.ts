import { useState, useCallback, useEffect } from 'react'
import { Certification } from '../types'

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
    id: 'SAP-C02',
    name: 'AWS Certified Solutions Architect - Professional',
    provider: 'AWS',
    level: 'Professional',
    description: 'Validates advanced technical skills and experience in designing distributed applications on AWS.',
    studyGuideUrl: 'https://aws.amazon.com/certification/certified-solutions-architect-professional/'
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

interface UseCertificationsStoreReturn {
  certifications: Certification[]
  isLoading: boolean
  error: string | null
  addCertification: (certification: Certification) => void
  updateCertification: (id: string, updates: Partial<Certification>) => void
  refresh: () => Promise<void>
}

export function useCertificationsStore(): UseCertificationsStoreReturn {
  const [certifications, setCertifications] = useState<Certification[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadCertifications = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    
    try {
      await new Promise((resolve) => setTimeout(resolve, 800))
      setCertifications(MOCK_CERTIFICATIONS)
    } catch (err) {
      setError('Failed to load certifications')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    loadCertifications()
  }, [loadCertifications])

  const addCertification = useCallback((certification: Certification) => {
    setCertifications((current) => [...current, certification])
  }, [])

  const updateCertification = useCallback((id: string, updates: Partial<Certification>) => {
    setCertifications((current) =>
      current.map((cert) => (cert.id === id ? { ...cert, ...updates } : cert))
    )
  }, [])

  const refresh = useCallback(async () => {
    await loadCertifications()
  }, [loadCertifications])

  return {
    certifications,
    isLoading,
    error,
    addCertification,
    updateCertification,
    refresh
  }
}
