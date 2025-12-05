import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { FileText, Upload } from '@phosphor-icons/react'
import { Certification } from '../types'
import { PracticeExamEditor } from './PracticeExamEditor'

interface AddPracticeExamDialogProps {
  certification: Certification | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddExam: (certificationId: string) => void
}

export function AddPracticeExamDialog({
  certification,
  open,
  onOpenChange,
  onAddExam,
}: AddPracticeExamDialogProps) {
  const [showEditor, setShowEditor] = useState(false)

  const handleManualCreate = () => {
    if (certification) {
      onAddExam(certification.id)
      onOpenChange(false)
    }
  }

  return (
    <>
      <Dialog open={open && !showEditor} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Practice Exam</DialogTitle>
            <DialogDescription>
              Choose how you want to add a practice exam to{' '}
              <span className="font-semibold text-foreground">
                {certification?.name}
              </span>
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-3 py-4">
            <Button
              variant="outline"
              className="h-auto flex-col gap-3 p-6"
              onClick={handleManualCreate}
            >
              <div className="flex items-center gap-2">
                <FileText size={24} weight="duotone" className="text-blue-600" />
                <span className="font-semibold">Create from Template</span>
              </div>
              <p className="text-sm text-muted-foreground text-center">
                Start with a blank template and add questions manually
              </p>
            </Button>
            
            <Button
              variant="outline"
              className="h-auto flex-col gap-3 p-6"
              disabled
            >
              <div className="flex items-center gap-2">
                <Upload size={24} weight="duotone" className="text-muted-foreground" />
                <span className="font-semibold">Import from JSON</span>
              </div>
              <p className="text-sm text-muted-foreground text-center">
                Upload an existing practice exam JSON file (Coming soon)
              </p>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
