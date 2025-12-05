import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowSquareOut, AmazonLogo, Cloud, BookOpen, PencilSimple, Trash, Plus, Exam } from '@phosphor-icons/react'
import { Certification } from '../types'
import { motion } from 'framer-motion'

interface CertificationCardProps {
  certification: Certification
  index: number
  onEdit: (certification: Certification) => void
  onDelete: (certification: Certification) => void
  onAddPracticeExam: (certification: Certification) => void
  practiceExamCount?: number
}

export function CertificationCard({ certification, index, onEdit, onDelete, onAddPracticeExam, practiceExamCount = 0 }: CertificationCardProps) {
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Foundational':
        return 'bg-[oklch(0.93_0.08_160)] text-[oklch(0.35_0.15_160)] border-[oklch(0.85_0.10_160)]'
      case 'Associate':
        return 'bg-[oklch(0.93_0.08_240)] text-[oklch(0.40_0.15_240)] border-[oklch(0.85_0.10_240)]'
      case 'Professional':
        return 'bg-[oklch(0.93_0.08_240)] text-[oklch(0.40_0.15_240)] border-[oklch(0.85_0.10_240)]'
      case 'Expert':
        return 'bg-[oklch(0.93_0.10_300)] text-[oklch(0.40_0.18_300)] border-[oklch(0.85_0.12_300)]'
      case 'Specialty':
        return 'bg-[oklch(0.93_0.08_60)] text-[oklch(0.40_0.15_60)] border-[oklch(0.85_0.10_60)]'
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200'
    }
  }

  const getProviderIcon = (provider: string) => {
    if (provider === 'AWS') {
      return <Cloud size={22} weight="duotone" className="text-[oklch(0.60_0.18_40)]" />
    }
    return <Cloud size={22} weight="duotone" className="text-[oklch(0.55_0.18_240)]" />
  }

  const getProviderColor = (provider: string) => {
    if (provider === 'AWS') {
      return 'text-[oklch(0.60_0.18_40)]'
    }
    return 'text-[oklch(0.55_0.18_240)]'
  }

  const getProviderLabel = (provider: string) => {
    if (provider === 'Microsoft') {
      return 'Azure'
    }
    return provider
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Card className="bg-white p-6 h-full flex flex-col border border-[oklch(0.90_0.005_240)] hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            {getProviderIcon(certification.provider)}
            <span className={`font-semibold text-sm ${getProviderColor(certification.provider)}`}>
              {getProviderLabel(certification.provider)}
            </span>
          </div>
          <Badge
            variant="outline"
            className={`${getLevelColor(certification.level)} text-xs font-medium px-2.5 py-0.5`}
          >
            {certification.level}
          </Badge>
        </div>

        <div className="mb-3">
          <p className="text-xs text-muted-foreground font-medium mb-1">{certification.id}</p>
          <h3 className="text-lg font-bold leading-tight text-foreground">
            {certification.name}
          </h3>
        </div>

        <div className="flex-1 mb-6">
          <p className="text-sm text-muted-foreground leading-relaxed">
            {certification.description}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-5 pb-5 border-b border-[oklch(0.93_0.005_240)]">
          <div className="text-center">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">
              Duration
            </p>
            <p className="text-base font-bold text-foreground">
              {certification.duration ? `${certification.duration} min` : '-'}
            </p>
          </div>
          <div className="text-center">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">
              Questions
            </p>
            <p className="text-base font-bold text-foreground">
              {certification.questions || '-'}
            </p>
          </div>
          <div className="text-center">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">
              Pass Score
            </p>
            <p className="text-base font-bold text-foreground">
              {certification.passScore || '-'}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-2 text-[oklch(0.50_0.15_240)] hover:text-[oklch(0.40_0.15_240)] hover:bg-[oklch(0.95_0.05_240)] h-9 w-full border-[oklch(0.90_0.005_240)]"
            onClick={() => onAddPracticeExam(certification)}
          >
            <Plus size={16} weight="bold" />
            Add Practice Exam
            {practiceExamCount > 0 && (
              <Badge variant="secondary" className="ml-auto">
                {practiceExamCount}
              </Badge>
            )}
          </Button>
          
          <div className="flex items-center justify-between gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="gap-2 text-[oklch(0.50_0.15_240)] hover:text-[oklch(0.40_0.15_240)] hover:bg-[oklch(0.95_0.05_240)] px-3 h-9 flex-1 font-medium"
              onClick={() => window.open(certification.studyGuideUrl, '_blank')}
            >
              <BookOpen size={16} weight="regular" />
              Exam Guide
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 text-muted-foreground hover:text-foreground"
              onClick={() => window.open(certification.studyGuideUrl, '_blank')}
            >
              <ArrowSquareOut size={16} weight="regular" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 text-muted-foreground hover:text-[oklch(0.50_0.15_240)] hover:bg-[oklch(0.95_0.05_240)]"
              onClick={() => onEdit(certification)}
            >
              <PencilSimple size={16} weight="bold" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 text-muted-foreground hover:text-destructive hover:bg-red-50"
              onClick={() => onDelete(certification)}
            >
              <Trash size={16} weight="bold" />
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
