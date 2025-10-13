'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { useAuthStore } from '@/stores/auth'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const token = useAuthStore((s) => s.accessToken)

  useEffect(() => {
    if (!token) router.replace('/login')
  }, [token, router])

  if (!token) return null // 等待跳转，避免闪烁

  return <div className="container mx-auto px-4 py-8">{children}</div>
}
 