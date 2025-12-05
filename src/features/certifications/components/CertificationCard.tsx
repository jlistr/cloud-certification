import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowSquareOut, AmazonLogo, Cloud, BookOpen } from '@phosphor-icons/react'
import { Certification } from '../types'
import { motion } from 'framer-motion'

interface CertificationCardProps {
  certification: Certification
  index: number
}

export function CertificationCard({ certification, index }: CertificationCardProps) {
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Foundational':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200'
      case 'Associate':
        return 'bg-blue-50 text-blue-700 border-blue-200'
      case 'Professional':
        return 'bg-blue-50 text-blue-700 border-blue-200'
      case 'Expert':
        return 'bg-purple-50 text-purple-700 border-purple-200'
      case 'Specialty':
        return 'bg-amber-50 text-amber-700 border-amber-200'
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200'
    }
  }

  const getProviderIcon = (provider: string) => {
    if (provider === 'AWS') {
      return <AmazonLogo size={20} weight="fill" className="text-orange-500" />
    }
    return <Cloud size={20} weight="fill" className="text-blue-600" />
  }

  const getProviderColor = (provider: string) => {
    if (provider === 'AWS') {
      return 'text-orange-500'
    }
    return 'text-blue-600'
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
      <Card className="bg-white p-6 h-full flex flex-col border border-border hover:shadow-md transition-shadow">
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
          <h3 className="text-base font-semibold leading-tight text-foreground">
            {certification.name}
          </h3>
        </div>

        <div className="flex-1 mb-4">
          <p className="text-sm text-muted-foreground leading-relaxed">
            {certification.description}
          </p>
        </div>

        {(certification.duration || certification.questions || certification.passScore) && (
          <div className="grid grid-cols-3 gap-4 mb-4 pb-4 border-b">
            {certification.duration && (
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Duration</p>
                <p className="text-sm font-semibold text-foreground">{certification.duration} min</p>
              </div>
            )}
            {certification.questions && (
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Questions</p>
                <p className="text-sm font-semibold text-foreground">{certification.questions}</p>
              </div>
            )}
            {certification.passScore && (
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Pass Score</p>
                <p className="text-sm font-semibold text-foreground">{certification.passScore}</p>
              </div>
            )}
          </div>
        )}

        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            className="gap-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-3 h-9"
            onClick={() => window.open(certification.studyGuideUrl, '_blank')}
          >
            <BookOpen size={16} weight="fill" />
            Exam Guide
            <ArrowSquareOut weight="bold" size={14} />
          </Button>
        </div>
      </Card>
    </motion.div>
  )
}
