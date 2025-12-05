import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowSquareOut } from '@phosphor-icons/react'
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
        return 'bg-emerald-100 text-emerald-800 border-emerald-200'
      case 'Associate':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'Professional':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'Expert':
        return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'Specialty':
        return 'bg-amber-100 text-amber-800 border-amber-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getProviderGradient = (provider: string) => {
    if (provider === 'Microsoft') {
      return 'bg-gradient-to-br from-blue-50 to-white'
    }
    return 'bg-gradient-to-br from-orange-50 to-white'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Card
        className={`${getProviderGradient(
          certification.provider
        )} p-6 h-full flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border`}
      >
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex flex-col gap-2 flex-1">
            <Badge
              variant="outline"
              className={`${getLevelColor(certification.level)} w-fit text-xs font-semibold tracking-wide`}
            >
              {certification.level}
            </Badge>
            <h3
              className="text-lg font-semibold leading-tight tracking-tight"
              style={{ fontFamily: 'var(--font-space)' }}
            >
              {certification.name}
            </h3>
          </div>
        </div>

        <div className="flex-1 mb-4">
          <p className="text-sm text-muted-foreground leading-relaxed">
            {certification.description}
          </p>
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <span className="text-xs font-semibold text-primary tracking-wide">
            {certification.provider}
          </span>
          {certification.studyGuideUrl ? (
            <Button
              variant="ghost"
              size="sm"
              className="gap-2 hover:bg-primary/10"
              onClick={() => window.open(certification.studyGuideUrl, '_blank')}
            >
              Study Guide
              <ArrowSquareOut weight="bold" size={16} />
            </Button>
          ) : (
            <span className="text-xs text-muted-foreground">Guide coming soon</span>
          )}
        </div>
      </Card>
    </motion.div>
  )
}
