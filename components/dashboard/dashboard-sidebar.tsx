/**
 * Dashboard Sidebar Navigation Component
 * Extracted from dashboard-shell for reusability
 */

'use client'

import {
  BarChart3,
  Flag,
  LayoutDashboard,
  LogOut,
  PackageCheck,
  ShieldAlert,
  Store,
  Users,
  Wallet,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

type NavItem = {
  href: string
  label: string
  icon: typeof LayoutDashboard
}

const NAV_ITEMS: NavItem[] = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/stores', label: 'Users & Stores', icon: Store },
  { href: '/approvals', label: 'Store Approval', icon: Store },
  { href: '/reseller', label: 'Reseller Hub', icon: Users },
  { href: '/risk', label: 'Fraud Hub', icon: ShieldAlert },
  { href: '/payments', label: 'Payments & Payouts', icon: Wallet },
  { href: '/disputes', label: 'Disputes', icon: Flag },
  { href: '/drops', label: 'Drop Management', icon: PackageCheck },
  { href: '/analytics', label: 'Analytics', icon: BarChart3 },
]

interface DashboardNavListProps {
  onNavigate?: () => void
}

function DashboardNavList({ onNavigate }: DashboardNavListProps) {
  const pathname = usePathname() || '/dashboard'

  return (
    <nav className="space-y-1">
      {NAV_ITEMS.map((item) => {
        const isActive =
          pathname === item.href || pathname.startsWith(`${item.href}/`)

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
              isActive
                ? 'bg-primary text-primary-foreground'
                : 'text-white/70 hover:bg-white/10 hover:text-white',
            )}
          >
            <item.icon className="size-4 shrink-0" />
            <span>{item.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}

interface DashboardSidebarProps {
  onNavigate?: () => void
}

export function DashboardSidebar({ onNavigate }: DashboardSidebarProps) {
  const router = useRouter()

  const handleLogout = () => {
    toast.success('Logged out successfully')
    router.push('/login')
  }

  return (
    <aside className="sticky top-0 hidden h-screen border-r border-white/10 bg-neutral-950 px-4 py-4 text-white lg:flex lg:flex-col">
      <div className="flex h-full flex-col rounded-2xl bg-neutral-950 px-1 py-1">
        {/* Logo / Branding */}
        <div className="flex items-center gap-2 px-3 pb-4 pt-2">
          <p className="text-[15px] font-semibold tracking-tight text-white">
            GOSNKR
          </p>
          <span className="size-1.5 rounded-full bg-primary" aria-hidden />
        </div>

        {/* Navigation */}
        <nav className="space-y-1 px-1">
          <DashboardNavList onNavigate={onNavigate} />
        </nav>

        {/* Logout Button */}
        <div className="mt-auto px-1 pt-4">
          <Button
            onClick={handleLogout}
            variant="ghost"
            className="w-full justify-start gap-3 rounded-lg px-3 text-white/70 hover:bg-white/10 hover:text-white"
          >
            <LogOut className="size-4" />
            Logout
          </Button>
        </div>
      </div>
    </aside>
  )
}

export { DashboardNavList, NAV_ITEMS }
