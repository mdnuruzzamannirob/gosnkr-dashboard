import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import { DashboardShell } from '@/components/dashboard/dashboard-shell'

export const metadata: Metadata = {
  title: 'Dashboard - GoSNKR',
  description: 'Responsive dashboard for GoSNKR operations and analytics.',
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return <DashboardShell>{children}</DashboardShell>
}
