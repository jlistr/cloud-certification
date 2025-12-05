export type CertificationProvider = 'Microsoft' | 'AWS'

export type CertificationLevel = 'Foundational' | 'Associate' | 'Expert' | 'Specialty' | 'Professional'

export interface Certification {
  id: string
  name: string
  provider: CertificationProvider
  level: CertificationLevel
  description: string
  studyGuideUrl: string
  duration?: number
  questions?: number
  passScore?: number
}

export type AnswerValue = 'A' | 'B' | 'C' | 'D' | 'E' | 'F'

export interface AnswerOption {
  value: AnswerValue
  text: string
  isCorrectAnswer: boolean
}

export interface Question {
  id: string
  questionText: string
  options: AnswerOption[]
  explanation: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  isMultiSelect: boolean
  domain: string
  service: string
  weightedDifficultyFactor: number
  topic?: string
}

export interface PracticeExam {
  id: string
  certificationId: string
  title: string
  description: string
  questions: Question[]
  passingScore: number
  timeLimit: number
  createdAt: string
  updatedAt: string
}
