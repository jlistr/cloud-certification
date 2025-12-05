import { useCallback, useEffect } from 'react'
import { useKV } from '@github/spark/hooks'
import { Certification } from '../types'

const DEFAULT_CERTIFICATIONS: Certification[] = [
  {
    id: 'CLF-C02',
    name: 'AWS Certified Cloud Practitioner',
    provider: 'AWS',
    level: 'Foundational',
    description: 'Validates overall understanding of the AWS Cloud platform and basic security concepts.',
    studyGuideUrl: 'https://aws.amazon.com/certification/certified-cloud-practitioner/',
    duration: 90,
    questions: 65,
    passScore: 700
  },
  {
    id: 'SAA-C03',
    name: 'AWS Certified Solutions Architect - Associate',
    provider: 'AWS',
    level: 'Associate',
    description: 'Validates knowledge of designing distributed systems on AWS with scalability and reliability.',
    studyGuideUrl: 'https://aws.amazon.com/certification/certified-solutions-architect-associate/',
    duration: 130,
    questions: 65,
    passScore: 720
  },
  {
    id: 'DVA-C02',
    name: 'AWS Certified Developer - Associate',
    provider: 'AWS',
    level: 'Associate',
    description: 'Validates expertise in developing and maintaining AWS applications.',
    studyGuideUrl: 'https://aws.amazon.com/certification/certified-developer-associate/',
    duration: 130,
    questions: 65,
    passScore: 720
  },
  {
    id: 'AZ-900',
    name: 'Microsoft Certified: Azure Fundamentals',
    provider: 'Microsoft',
    level: 'Foundational',
    description: 'Demonstrate foundational knowledge of cloud concepts and Azure services.',
    studyGuideUrl: 'https://learn.microsoft.com/certifications/azure-fundamentals/',
    duration: 45,
    questions: 40,
    passScore: 700
  },
  {
    id: 'AZ-104',
    name: 'Microsoft Certified: Azure Administrator Associate',
    provider: 'Microsoft',
    level: 'Associate',
    description: 'Manage cloud services that span storage, security, networking, and compute cloud capabilities.',
    studyGuideUrl: 'https://learn.microsoft.com/certifications/azure-administrator/',
    duration: 100,
    questions: 60,
    passScore: 700
  }
]

interface UseCertificationsStoreReturn {
  certifications: Certification[]
  isLoading: boolean
  error: string | null
  addCertification: (certification: Certification) => void
  updateCertification: (id: string, updates: Partial<Certification>) => void
  deleteCertification: (id: string) => void
  refresh: () => Promise<void>
}

export function useCertificationsStore(): UseCertificationsStoreReturn {
  const [certifications, setCertifications, deleteCertificationsKey] = useKV<Certification[]>(
    'certifications-data',
    DEFAULT_CERTIFICATIONS
  )

  const addCertification = useCallback((certification: Certification) => {
    setCertifications((current) => [...(current || []), certification])
  }, [setCertifications])

  const updateCertification = useCallback((id: string, updates: Partial<Certification>) => {
    setCertifications((current) =>
      (current || []).map((cert) => (cert.id === id ? { ...cert, ...updates } : cert))
    )
  }, [setCertifications])

  const deleteCertification = useCallback((id: string) => {
    setCertifications((current) => (current || []).filter((cert) => cert.id !== id))
  }, [setCertifications])

  const refresh = useCallback(async () => {
    setCertifications(DEFAULT_CERTIFICATIONS)
  }, [setCertifications])

  return {
    certifications: certifications || [],
    isLoading: false,
    error: null,
    addCertification,
    updateCertification,
    deleteCertification,
    refresh
  }
}
