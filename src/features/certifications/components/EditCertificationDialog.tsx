import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Certification, CertificationLevel, CertificationProvider } from '../types'
import { toast } from 'sonner'

interface EditCertificationDialogProps {
  certification: Certification | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (certification: Certification) => void
}

export function EditCertificationDialog({
  certification,
  open,
  onOpenChange,
  onSave,
}: EditCertificationDialogProps) {
  const [formData, setFormData] = useState<Certification>({
    id: '',
    name: '',
    provider: 'AWS',
    level: 'Associate',
    description: '',
    studyGuideUrl: '',
    duration: undefined,
    questions: undefined,
    passScore: undefined,
  })

  useEffect(() => {
    if (certification) {
      setFormData(certification)
    }
  }, [certification])

  const handleSave = () => {
    if (!formData.id.trim()) {
      toast.error('Certification ID is required')
      return
    }
    if (!formData.name.trim()) {
      toast.error('Certification name is required')
      return
    }
    if (!formData.description.trim()) {
      toast.error('Description is required')
      return
    }
    if (!formData.studyGuideUrl.trim()) {
      toast.error('Study guide URL is required')
      return
    }

    onSave(formData)
    onOpenChange(false)
    toast.success('Certification updated successfully')
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Certification</DialogTitle>
          <DialogDescription>
            Make changes to the certification details below.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="id">Certification ID</Label>
            <Input
              id="id"
              value={formData.id}
              onChange={(e) => setFormData({ ...formData, id: e.target.value })}
              placeholder="e.g., SAA-C03, AZ-104"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="name">Certification Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., AWS Certified Solutions Architect - Associate"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="provider">Provider</Label>
              <Select
                value={formData.provider}
                onValueChange={(value: CertificationProvider) =>
                  setFormData({ ...formData, provider: value })
                }
              >
                <SelectTrigger id="provider">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AWS">AWS</SelectItem>
                  <SelectItem value="Microsoft">Microsoft Azure</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="level">Level</Label>
              <Select
                value={formData.level}
                onValueChange={(value: CertificationLevel) =>
                  setFormData({ ...formData, level: value })
                }
              >
                <SelectTrigger id="level">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Foundational">Foundational</SelectItem>
                  <SelectItem value="Associate">Associate</SelectItem>
                  <SelectItem value="Professional">Professional</SelectItem>
                  <SelectItem value="Expert">Expert</SelectItem>
                  <SelectItem value="Specialty">Specialty</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Brief description of the certification"
              rows={3}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="studyGuideUrl">Study Guide URL</Label>
            <Input
              id="studyGuideUrl"
              type="url"
              value={formData.studyGuideUrl}
              onChange={(e) => setFormData({ ...formData, studyGuideUrl: e.target.value })}
              placeholder="https://..."
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="duration">Duration (min)</Label>
              <Input
                id="duration"
                type="number"
                value={formData.duration || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    duration: e.target.value ? parseInt(e.target.value) : undefined,
                  })
                }
                placeholder="90"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="questions">Questions</Label>
              <Input
                id="questions"
                type="number"
                value={formData.questions || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    questions: e.target.value ? parseInt(e.target.value) : undefined,
                  })
                }
                placeholder="65"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="passScore">Pass Score</Label>
              <Input
                id="passScore"
                type="number"
                value={formData.passScore || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    passScore: e.target.value ? parseInt(e.target.value) : undefined,
                  })
                }
                placeholder="700"
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
