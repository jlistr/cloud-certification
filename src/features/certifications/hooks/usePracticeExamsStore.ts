import { useCallback } from 'react'
import { useKV } from '@github/spark/hooks'
import { PracticeExam } from '../types'

interface UsePracticeExamsStoreReturn {
  practiceExams: PracticeExam[]
  addPracticeExam: (exam: PracticeExam) => void
  updatePracticeExam: (id: string, updates: Partial<PracticeExam>) => void
  deletePracticeExam: (id: string) => void
  getPracticeExamsByCertificationId: (certificationId: string) => PracticeExam[]
  hasPracticeExams: (certificationId: string) => boolean
}

export function usePracticeExamsStore(): UsePracticeExamsStoreReturn {
  const [practiceExams, setPracticeExams] = useKV<PracticeExam[]>('practice-exams', [])

  const addPracticeExam = useCallback(
    (exam: PracticeExam) => {
      setPracticeExams((current) => [...(current || []), exam])
    },
    [setPracticeExams]
  )

  const updatePracticeExam = useCallback(
    (id: string, updates: Partial<PracticeExam>) => {
      setPracticeExams((current) =>
        (current || []).map((exam) =>
          exam.id === id ? { ...exam, ...updates, updatedAt: new Date().toISOString() } : exam
        )
      )
    },
    [setPracticeExams]
  )

  const deletePracticeExam = useCallback(
    (id: string) => {
      setPracticeExams((current) => (current || []).filter((exam) => exam.id !== id))
    },
    [setPracticeExams]
  )

  const getPracticeExamsByCertificationId = useCallback(
    (certificationId: string): PracticeExam[] => {
      return (practiceExams || []).filter((exam) => exam.certificationId === certificationId)
    },
    [practiceExams]
  )

  const hasPracticeExams = useCallback(
    (certificationId: string): boolean => {
      return (practiceExams || []).some((exam) => exam.certificationId === certificationId)
    },
    [practiceExams]
  )

  return {
    practiceExams: practiceExams || [],
    addPracticeExam,
    updatePracticeExam,
    deletePracticeExam,
    getPracticeExamsByCertificationId,
    hasPracticeExams
  }
}
