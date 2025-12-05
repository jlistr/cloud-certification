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
        return 'bg-green-100 text-green-800 border-green-200'
      case 'Associate':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'Professional':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'Expert':
        return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'Specialty':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200'
    }
  }

  const getProviderIcon = (provider: string) => {
    if (provider === 'AWS') {
      return <Cloud size={22} weight="duotone" className="text-[#FF9900]" />
    }
    return <Cloud size={22} weight="duotone" className="text-[#0078D4]" />
  }

  const getProviderColor = (provider: string) => {
    if (provider === 'AWS') {
      return 'text-[#FF9900]'
    }
    return 'text-[#0078D4]'
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
      <Card className="bg-white p-6 h-full flex flex-col border border-slate-200 hover:shadow-md hover:-translate-y-1 transition-all duration-200 rounded-xl shadow-sm">
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
          <p className="text-xs text-slate-500 font-medium mb-1">{certification.id}</p>
          <h3 className="text-lg font-bold leading-tight text-slate-900">
            {certification.name}
          </h3>
        </div>

        <div className="flex-1 mb-6">
          <p className="text-sm text-slate-600 leading-relaxed">
            {certification.description}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-5 pb-5 border-b border-slate-100">
          <div className="text-center">
            <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-1">
              Duration
            </p>
            <p className="text-base font-bold text-slate-900">
              {certification.duration ? `${certification.duration} min` : '-'}
            </p>
          </div>
          <div className="text-center">
            <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-1">
              Questions
            </p>
            <p className="text-base font-bold text-slate-900">
              {certification.questions || '-'}
            </p>
          </div>
          <div className="text-center">
            <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-1">
              Pass Score
            </p>
            <p className="text-base font-bold text-slate-900">
              {certification.passScore || '-'}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-2 text-slate-700 hover:text-slate-900 hover:bg-slate-50 h-9 w-full border-slate-200"
            onClick={() => onAddPracticeExam(certification)}
          >
            <Plus size={16} weight="bold" />
            Add Practice Exam
            {practiceExamCount > 0 && (
              <Badge variant="secondary" className="ml-auto bg-blue-100 text-blue-800">
                {practiceExamCount}
              </Badge>
            )}
          </Button>
          
          <div className="flex items-center justify-between gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="gap-2 bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-100 shadow-none px-3 h-9 flex-1 font-medium"
              onClick={() => window.open(certification.studyGuideUrl, '_blank')}
            >
              <BookOpen size={16} weight="regular" />
              Exam Guide
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 text-slate-400 hover:text-slate-600 border border-slate-200"
              onClick={() => window.open(certification.studyGuideUrl, '_blank')}
            >
              <ArrowSquareOut size={16} weight="regular" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 text-slate-400 hover:text-blue-600 hover:bg-blue-50"
              onClick={() => onEdit(certification)}
            >
              <PencilSimple size={16} weight="bold" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 text-slate-400 hover:text-red-600 hover:bg-red-50"
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
