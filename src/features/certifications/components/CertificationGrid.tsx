import { Certification } from '../types'
import { CertificationCard } from './CertificationCard'

interface CertificationGridProps {
  certifications: Certification[]
  onEdit?: (cert: Certification) => void
  onAddExam?: (cert: Certification) => void
}

export function CertificationGrid({
  certifications,
  onEdit,
  onAddExam,
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
        />
      ))}
    </div>
  )
}
