import { useState } from 'react'
import { useCertificationsStore } from '../hooks/useCertificationsStore'
import { useCertificationSearch } from '../hooks/useCertificationSearch'

export function CertificationsPage() {
  const { certifications, addCertification, updateCertification, isLoading, refresh } = useCertificationsStore()
  const { results, isLoading: searchLoading, error, search } = useCertificationSearch()
  const [activeFilter, setActiveFilter] = useState<'All' | 'Microsoft' | 'AWS'>('All')

  return <div>CertificationsPage</div>
}
