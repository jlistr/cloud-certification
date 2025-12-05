import { Certification } from '../types'
import { CertificationCard } from './CertificationCard'

interface CertificationGridProps {
  certifications: Certification[]
  onEdit: (cert: Certification) => void
  onDelete: (cert: Certification) => void
  onAddPracticeExam: (cert: Certification) => void
  getPracticeExamCount: (certId: string) => number
}

export function CertificationGrid({
  certifications,
  onEdit,
  onDelete,
  onAddPracticeExam,
  getPracticeExamCount,
}: CertificationGridProps) {
  if (certifications.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No certifications found.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {certifications.map((cert, index) => (
        <CertificationCard
          key={cert.id}
          certification={cert}
          index={index}
          onEdit={onEdit}
          onDelete={onDelete}
          onAddPracticeExam={onAddPracticeExam}
          practiceExamCount={getPracticeExamCount(cert.id)}
        />
      ))}
    </div>
  )
}
