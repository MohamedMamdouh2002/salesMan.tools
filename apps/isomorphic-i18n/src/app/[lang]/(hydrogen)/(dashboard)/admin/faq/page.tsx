import AdminGuard from '@/app/components/AdminGuard'
import EnhancedTanTable from '@/app/shared/tan-table/enhanced'
import React from 'react'

const Faq = () => {
  return <>
      <AdminGuard>
        <EnhancedTanTable/>
      </AdminGuard>
  </>
}

export default Faq