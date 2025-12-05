export type CertificationProvider = 'Microsoft' | 'AWS'

export type CertificationLevel = 'Foundational' | 'Associate' | 'Expert' | 'Specialty' | 'Professional'

export interface Certification {
  id: string
  name: string
  provider: CertificationProvider
  level: CertificationLevel
  description: string
  studyGuideUrl: string
}
