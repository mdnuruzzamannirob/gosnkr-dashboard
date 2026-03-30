'use client'

import {
  BarChart3,
  Bell,
  Flag,
  LayoutDashboard,
  LogOut,
  Menu,
  PackageCheck,
  Search,
  Settings2,
  ShieldAlert,
  Store,
  Users,
  Wallet,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

type NavItem = {
  href: string
  label: string
  icon: typeof LayoutDashboard
}

const navItems: NavItem[] = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/stores', label: 'Users & Stores', icon: Store },
  { href: '/approvals', label: 'Store Approval', icon: Store },
  { href: '/reseller', label: 'Reseller Hub', icon: Users },
  { href: '/risk', label: 'Fraud Hub', icon: ShieldAlert },
  { href: '/payments', label: 'Payments & Payouts', icon: Wallet },
  { href: '/disputes', label: 'Disputes', icon: Flag },
  { href: '/drops', label: 'Drop Management', icon: PackageCheck },
  { href: '/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/settings', label: 'Platform Settings', icon: Settings2 },
]

function DashboardNavList({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname() || '/dashboard'

  return (
    <nav className="space-y-1">
      {navItems.map((item) => {
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

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const router = useRouter()

  return (
    <div className="min-h-dvh bg-background lg:grid lg:grid-cols-[14.5rem_minmax(0,1fr)]">
      <aside className="sticky top-0 hidden h-screen border-r border-white/10 bg-neutral-950 px-4 py-4 text-white lg:flex lg:flex-col">
        <div className="flex h-full flex-col rounded-2xl bg-neutral-950 px-1 py-1">
          <div className="flex items-center gap-2 px-3 pb-4 pt-2">
            <p className="text-[15px] font-semibold tracking-tight text-white">
              GOSNKR
            </p>
            <span
              className="size-1.5 rounded-full bg-emerald-400"
              aria-hidden
            />
          </div>

          <nav className="space-y-1 px-1">
            <DashboardNavList />
          </nav>

          <div className="mt-auto px-1 pt-4">
            <Button
              variant="ghost"
              className="mt-1 w-full justify-start gap-3 rounded-lg px-3 text-white/70 hover:bg-white/10 hover:text-white"
            >
              <LogOut className="size-4" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-col">
        <header className="sticky top-0 z-30 border-b border-border/60 text-foreground bg-background backdrop-blur">
          <div className="flex h-14 items-center px-4 sm:px-6 lg:px-8">
            <Button
              type="button"
              variant="outline"
              size="icon-sm"
              className="lg:hidden"
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="size-4 " />
            </Button>

            <div className="hidden lg:flex items-center gap-3">
              <h2 className="text-lg font-semibold tracking-tight text-foreground">
                Dashboard
              </h2>
            </div>

            <div className="ml-auto flex items-center gap-3">
              <div className="hidden sm:block relative">
                <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search users, stores, orders..."
                  className="px-9 text-sm w-80"
                />
              </div>

              <Button
                variant="outline"
                size="icon-sm"
                className="relative rounded-full"
              >
                <Bell className="size-4" />
                <span className="absolute top-0 right-0 size-2 rounded-full bg-destructive" />
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar>
                    <AvatarFallback className="bg-primary/5 text-primary">
                      SA
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-56 mt-1">
                  <div className="p-3">
                    <div className="flex items-center gap-3">
                      <Avatar size="lg">
                        <AvatarFallback className="bg-primary/5 text-primary">
                          SA
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          Super Admin
                        </p>
                        <p className="text-xs text-muted-foreground">
                          admin@gosnkr.com
                        </p>
                      </div>
                    </div>
                  </div>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    onSelect={() => {
                      router.push('/dashboard/profile')
                    }}
                  >
                    Profile
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onSelect={() => {
                      toast('Logged out')
                      router.push('/login')
                    }}
                    className="text-destructive"
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        <main className="flex-1 px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
          {children}
        </main>
      </div>

      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
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
            <DashboardNavList onNavigate={() => setMobileOpen(false)} />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
