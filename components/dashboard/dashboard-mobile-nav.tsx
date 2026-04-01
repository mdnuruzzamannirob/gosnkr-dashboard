/**
 * Dashboard Mobile Navigation Component
 * Slide-out navigation for mobile devices
 */

'use client'

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { DashboardNavList } from './dashboard-sidebar'

interface DashboardMobileNavProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function DashboardMobileNav({
  open,
  onOpenChange,
}: DashboardMobileNavProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-80 bg-neutral-950 text-white">
        <SheetHeader className="border-b border-white/10 px-5 py-5">
          <SheetTitle className="flex items-center gap-2 text-white">
            <span className="text-[15px] font-semibold tracking-tight">
              GOSNKR
            </span>
            <span className="size-1.5 rounded-full bg-primary" aria-hidden />
          </SheetTitle>
        </SheetHeader>

        <div className="flex h-full flex-col gap-6 px-4 py-5">
          <DashboardNavList onNavigate={() => onOpenChange(false)} />
        </div>
      </SheetContent>
    </Sheet>
  )
}
