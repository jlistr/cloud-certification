import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { WarningCircle } from '@phosphor-icons/react'
import { Certification } from '../types'

interface DeleteCertificationDialogProps {
  certification: Certification | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
  hasPracticeExams: boolean
  practiceExamCount: number
}

export function DeleteCertificationDialog({
  certification,
  open,
  onOpenChange,
  onConfirm,
  hasPracticeExams,
  practiceExamCount,
}: DeleteCertificationDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Certification</AlertDialogTitle>
          <AlertDialogDescription>
            {hasPracticeExams ? (
              <>
                Cannot delete{' '}
                <span className="font-semibold text-foreground">
                  {certification?.name}
                </span>{' '}
                because it has associated practice exams.
              </>
            ) : (
              <>
                Are you sure you want to delete{' '}
                <span className="font-semibold text-foreground">
                  {certification?.name}
                </span>
                ? This action cannot be undone.
              </>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        {hasPracticeExams && (
          <Alert variant="destructive">
            <WarningCircle className="h-4 w-4" />
            <AlertDescription>
              This certification has {practiceExamCount} practice exam{practiceExamCount > 1 ? 's' : ''}.
              Please delete all associated practice exams before deleting this certification.
            </AlertDescription>
          </Alert>
        )}
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          {!hasPracticeExams && (
            <AlertDialogAction
              onClick={onConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
