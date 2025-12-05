import { useState, useMemo } from 'react'
import { SquaresFour, List, BookOpen } from '@phosphor-icons/react'
import { useCertificationsStore } from '../hooks/useCertificationsStore'
import { usePracticeExamsStore } from '../hooks/usePracticeExamsStore'
import { CertificationGrid } from './CertificationGrid'
import { SearchBar } from './SearchBar'
import { CertificationSkeleton } from '../../../components/CertificationSkeleton'
import { EditCertificationDialog } from './EditCertificationDialog'
import { DeleteCertificationDialog } from './DeleteCertificationDialog'
import { AddPracticeExamDialog } from './AddPracticeExamDialog'
import { PracticeExamEditor } from './PracticeExamEditor'
import { Toaster } from '@/components/ui/sonner'
import { Certification, PracticeExam } from '../types'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

export function CertificationsPage() {
  const { certifications, isLoading, updateCertification, deleteCertification } = useCertificationsStore()
  const { 
    practiceExams, 
    addPracticeExam, 
    getPracticeExamsByCertificationId, 
    hasPracticeExams 
  } = usePracticeExamsStore()
  
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [editingCertification, setEditingCertification] = useState<Certification | null>(null)
  const [deletingCertification, setDeletingCertification] = useState<Certification | null>(null)
  const [addingPracticeExamToCert, setAddingPracticeExamToCert] = useState<Certification | null>(null)
  const [editingExamCertId, setEditingExamCertId] = useState<string | null>(null)

  const filteredCertifications = useMemo(() => {
    let filtered = certifications

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(cert => {
        const nameMatch = cert.name.toLowerCase().includes(query)
        const providerMatch = cert.provider.toLowerCase().includes(query)
        const levelMatch = cert.level.toLowerCase().includes(query)
        const descriptionMatch = cert.description.toLowerCase().includes(query)
        const codeMatch = cert.id.toLowerCase().includes(query)
        
        return nameMatch || providerMatch || levelMatch || descriptionMatch || codeMatch
      })
    }

    return filtered
  }, [certifications, searchQuery])

  const getPracticeExamCount = (certId: string) => {
    return getPracticeExamsByCertificationId(certId).length
  }

  const handleEdit = (cert: Certification) => {
    setEditingCertification(cert)
  }

  const handleSaveEdit = (updatedCert: Certification) => {
    updateCertification(updatedCert.id, updatedCert)
  }

  const handleDelete = (cert: Certification) => {
    setDeletingCertification(cert)
  }

  const handleConfirmDelete = () => {
    if (deletingCertification) {
      if (hasPracticeExams(deletingCertification.id)) {
        toast.error('Cannot delete certification with associated practice exams')
        return
      }
      deleteCertification(deletingCertification.id)
      toast.success('Certification deleted successfully')
      setDeletingCertification(null)
    }
  }

  const handleAddPracticeExam = (cert: Certification) => {
    setAddingPracticeExamToCert(cert)
  }

  const handleStartPracticeExamEditor = (certificationId: string) => {
    setEditingExamCertId(certificationId)
    setAddingPracticeExamToCert(null)
  }

  const handleSavePracticeExam = (exam: PracticeExam) => {
    addPracticeExam(exam)
    toast.success('Practice exam added successfully')
    setEditingExamCertId(null)
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Toaster />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <header className="mb-8 text-center">
          <div className="flex justify-center mb-3">
            <BookOpen size={36} weight="duotone" className="text-blue-500" />
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 mb-2">
            Cloud Certification Hub
          </h1>
          <p className="text-slate-500 text-base max-w-3xl mx-auto">
            Discover and explore popular cloud certifications from Microsoft Azure and AWS. Find the right certification for your career path.
          </p>
        </header>

        <Card className="p-6 mb-8 bg-white border border-slate-200 shadow-sm">
          <div className="mb-4">
            <SearchBar 
              value={searchQuery} 
              onChange={setSearchQuery}
              placeholder="Search certifications (e.g. SAA-C03, Azure)..."
            />
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <p className="text-sm text-slate-500">
              Showing {filteredCertifications.length} of {certifications.length} certifications
            </p>
            
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className={viewMode === 'grid' ? 'bg-slate-900 text-white hover:bg-slate-800 gap-2' : 'text-slate-600 hover:bg-slate-100 gap-2'}
              >
                <SquaresFour size={18} weight="bold" />
                Grid
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
                className={viewMode === 'list' ? 'bg-slate-900 text-white hover:bg-slate-800 gap-2' : 'text-slate-600 hover:bg-slate-100 gap-2'}
              >
                <List size={18} weight="bold" />
                List
              </Button>
            </div>
          </div>
        </Card>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <CertificationSkeleton key={i} />
            ))}
          </div>
        ) : (
          <>
            <CertificationGrid 
              certifications={filteredCertifications} 
              onEdit={handleEdit}
              onDelete={handleDelete}
              onAddPracticeExam={handleAddPracticeExam}
              getPracticeExamCount={getPracticeExamCount}
            />
            {filteredCertifications.length === 0 && searchQuery && (
              <div className="text-center py-12">
                <p className="text-slate-500 text-lg">
                  No certifications found matching "{searchQuery}"
                </p>
              </div>
            )}
          </>
        )}

        <EditCertificationDialog
          certification={editingCertification}
          open={editingCertification !== null}
          onOpenChange={(open) => !open && setEditingCertification(null)}
          onSave={handleSaveEdit}
        />

        <DeleteCertificationDialog
          certification={deletingCertification}
          open={deletingCertification !== null}
          onOpenChange={(open) => !open && setDeletingCertification(null)}
          onConfirm={handleConfirmDelete}
          hasPracticeExams={deletingCertification ? hasPracticeExams(deletingCertification.id) : false}
          practiceExamCount={deletingCertification ? getPracticeExamCount(deletingCertification.id) : 0}
        />

        <AddPracticeExamDialog
          certification={addingPracticeExamToCert}
          open={addingPracticeExamToCert !== null}
          onOpenChange={(open) => !open && setAddingPracticeExamToCert(null)}
          onAddExam={handleStartPracticeExamEditor}
        />

        {editingExamCertId && (
          <PracticeExamEditor
            isOpen={true}
            onClose={() => setEditingExamCertId(null)}
            certificationId={editingExamCertId}
            onSave={handleSavePracticeExam}
          />
        )}
      </div>
    </div>
  )
}
