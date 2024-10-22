import AdminGuard from '@/app/components/AdminGuard'
import React from 'react'

function page() {
  return (
    <AdminGuard>

    <div>page</div>
    </AdminGuard>
  )
}

export default page