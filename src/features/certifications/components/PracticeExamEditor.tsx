import { useState, useEffect } from 'react'
import { PracticeExam } from '../types'
import { practiceExamSchema } from '../schemas'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { CheckCircle, X, WarningCircle } from '@phosphor-icons/react'
import { ZodError } from 'zod'

interface PracticeExamEditorProps {
  isOpen: boolean
  onClose: () => void
  certificationId: string
  existingExam?: PracticeExam
  onSave: (exam: PracticeExam) => void
}

export function PracticeExamEditor({
  isOpen,
  onClose,
  certificationId,
  existingExam,
  onSave
}: PracticeExamEditorProps) {
  const [jsonText, setJsonText] = useState('')
  const [validationErrors, setValidationErrors] = useState<string[]>([])
  const [isValidated, setIsValidated] = useState(false)
  const [validatedExam, setValidatedExam] = useState<PracticeExam | null>(null)

  useEffect(() => {
    if (isOpen) {
      if (existingExam) {
        setJsonText(JSON.stringify(existingExam, null, 2))
      } else {
        const template: Partial<PracticeExam> = {
          id: `exam-${Date.now()}`,
          certificationId,
          title: '',
          description: '',
          questions: [
            {
              id: 'q1',
              questionText: '',
              isMultiSelect: false,
              domain: '',
              service: '',
              weightedDifficultyFactor: 5,
              topic: '',
              options: [
                { value: 'A', text: '', isCorrectAnswer: false },
                { value: 'B', text: '', isCorrectAnswer: false },
                { value: 'C', text: '', isCorrectAnswer: true },
                { value: 'D', text: '', isCorrectAnswer: false }
              ],
              explanation: '',
              difficulty: 'Medium'
            }
          ],
          passingScore: 70,
          timeLimit: 60,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
        setJsonText(JSON.stringify(template, null, 2))
      }
      setValidationErrors([])
      setIsValidated(false)
      setValidatedExam(null)
    }
  }, [isOpen, existingExam, certificationId])

  const handleValidate = () => {
    setValidationErrors([])
    setIsValidated(false)
    setValidatedExam(null)

    try {
      const parsed = JSON.parse(jsonText)
      
      const result = practiceExamSchema.safeParse(parsed)
      
      if (result.success) {
        setIsValidated(true)
        setValidatedExam(result.data)
        setValidationErrors([])
      } else {
        const errors = result.error.errors.map((err) => {
          const path = err.path.join('.')
          return path ? `${path}: ${err.message}` : err.message
        })
        setValidationErrors(errors)
      }
    } catch (err) {
      if (err instanceof SyntaxError) {
        setValidationErrors([`JSON Syntax Error: ${err.message}`])
      } else if (err instanceof ZodError) {
        setValidationErrors(err.errors.map((e) => `${e.path.join('.')}: ${e.message}`))
      } else {
        setValidationErrors(['An unexpected error occurred during validation'])
      }
    }
  }

  const handleSave = () => {
    if (validatedExam) {
      onSave(validatedExam)
      onClose()
    }
  }

  const handleClose = () => {
    setJsonText('')
    setValidationErrors([])
    setIsValidated(false)
    setValidatedExam(null)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>{existingExam ? 'Edit Practice Exam' : 'Create Practice Exam'}</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              className="h-6 w-6"
            >
              <X />
            </Button>
          </DialogTitle>
          <DialogDescription>
            {existingExam
              ? 'Edit the practice exam JSON below. Click Validate to check for errors, then Save.'
              : 'Create a new practice exam by editing the JSON template below. Click Validate to check for errors, then Save.'}
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 flex flex-col gap-4 overflow-hidden">
          <div className="flex-1 flex flex-col gap-2 overflow-hidden">
            <label htmlFor="json-editor" className="text-sm font-medium">
              Practice Exam JSON
            </label>
            <Textarea
              id="json-editor"
              value={jsonText}
              onChange={(e) => {
                setJsonText(e.target.value)
                setIsValidated(false)
                setValidatedExam(null)
              }}
              className="flex-1 font-mono text-sm resize-none"
              placeholder="Enter practice exam JSON..."
              spellCheck={false}
            />
          </div>

          {validationErrors.length > 0 && (
            <Alert variant="destructive" className="overflow-auto max-h-48">
              <WarningCircle className="h-4 w-4" />
              <AlertDescription>
                <div className="font-semibold mb-2">Validation Errors:</div>
                <ul className="list-disc list-inside space-y-1">
                  {validationErrors.map((error, index) => (
                    <li key={index} className="text-sm">
                      {error}
                    </li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}

          {isValidated && validationErrors.length === 0 && (
            <Alert className="bg-green-50 text-green-900 border-green-200">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                Validation successful! The practice exam JSON is valid and ready to save.
              </AlertDescription>
            </Alert>
          )}

          <div className="flex gap-3 justify-end pt-2 border-t">
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="secondary" onClick={handleValidate}>
              Validate
            </Button>
            <Button
              onClick={handleSave}
              disabled={!isValidated || !validatedExam}
            >
              Save
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
