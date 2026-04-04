'use client'

import { useState } from 'react'

import { DashboardHeader } from './dashboard-header'
import { DashboardMobileNav } from './dashboard-mobile-nav'
import { DashboardSidebar } from './dashboard-sidebar'

/**
 * Dashboard Shell Layout Component
 * Provides the main layout structure for dashboard pages
 * Includes sidebar, header, and main content area
 */
export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-dvh bg-background lg:grid lg:grid-cols-[16rem_minmax(0,1fr)]">
      {/* Sidebar */}
      <DashboardSidebar />

      {/* Main Content */}
      <div className="flex min-w-0 flex-col">
        {/* Header */}
        <DashboardHeader onMobileMenuClick={() => setMobileMenuOpen(true)} />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto [scrollbar-gutter:stable] px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
          {children}
        </main>
      </div>

      {/* Mobile Navigation */}
      <DashboardMobileNav
        open={mobileMenuOpen}
        onOpenChange={setMobileMenuOpen}
      />
    </div>
  )
}
