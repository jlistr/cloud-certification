import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowSquareOut, Cloud, BookOpen } from '@phosphor-icons/react'
import { Certification } from '@/lib/types'
import { motion } from 'framer-motion'

interface CertificationCardProps {
  certification: Certification
  index: number
}

export function CertificationCard({ certification, index }: CertificationCardProps) {
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

  const getProviderColor = (provider: string) => {
    if (provider === 'Microsoft' || provider === 'Azure') {
      return 'text-[#0078D4]'
    }
    return 'text-[#FF9900]'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Card className="bg-white p-6 h-full flex flex-col transition-all duration-200 hover:shadow-md hover:-translate-y-1 border border-slate-200">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <Cloud size={24} weight="duotone" className={getProviderColor(certification.provider)} />
            <span className={`text-sm font-semibold ${getProviderColor(certification.provider)}`}>
              {certification.provider}
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
          <p className="text-xs text-slate-500 font-medium mb-1">
            {certification.id}
          </p>
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

        <div className="flex items-center justify-between">
          {certification.studyGuideUrl ? (
            <>
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-100 shadow-none font-medium px-3"
                onClick={() => window.open(certification.studyGuideUrl, '_blank')}
              >
                <BookOpen size={16} weight="regular" />
                Exam Guide
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-slate-400 hover:text-slate-600 border border-slate-200"
                onClick={() => window.open(certification.studyGuideUrl, '_blank')}
              >
                <ArrowSquareOut size={16} weight="regular" />
              </Button>
            </>
          ) : (
            <span className="text-xs text-slate-400">Guide coming soon</span>
          )}
        </div>
      </Card>
    </motion.div>
  )
}
