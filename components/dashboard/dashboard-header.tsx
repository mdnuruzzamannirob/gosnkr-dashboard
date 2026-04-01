/**
 * Dashboard Header Component
 * Contains search, notifications, and user menu
 */

'use client'

import { Bell, LogOut, Menu, Search } from 'lucide-react'
import { useRouter } from 'next/navigation'

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
import { toast } from 'sonner'

interface DashboardHeaderProps {
  onMobileMenuClick?: () => void
}

export function DashboardHeader({ onMobileMenuClick }: DashboardHeaderProps) {
  const router = useRouter()

  const handleLogout = () => {
    toast.success('Logged out successfully')
    router.push('/login')
  }

  const handleProfile = () => {
    router.push('/profile')
  }

  return (
    <header className="sticky top-0 z-30 border-b border-border/60 bg-background backdrop-blur">
      <div className="flex h-14 items-center px-4 sm:px-6 lg:px-8">
        {/* Mobile Menu Button */}
        <Button
          type="button"
          variant="outline"
          size="icon-sm"
          className="lg:hidden"
          onClick={onMobileMenuClick}
        >
          <Menu className="size-4" />
        </Button>

        {/* Desktop Title */}
        <div className="hidden lg:flex items-center gap-3">
          <h2 className="text-lg font-semibold tracking-tight text-foreground">
            Dashboard
          </h2>
        </div>

        {/* Right Actions */}
        <div className="ml-auto flex items-center gap-3">
          {/* Search Bar - Hidden on mobile */}
          <div className="hidden sm:block relative">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search users, stores, orders..."
              className="px-9 text-sm w-80"
            />
          </div>

          {/* Notifications Button */}
          <Button
            variant="outline"
            size="icon-sm"
            className="relative rounded-full"
            title="Notifications"
          >
            <Bell className="size-4" />
            <span className="absolute top-0 right-0 size-2 rounded-full bg-destructive" />
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex items-center justify-center rounded-full hover:bg-muted transition-colors p-0">
              <Avatar className="size-8">
                <AvatarFallback className="bg-primary/5 text-primary text-xs">
                  SA
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56 mt-1">
              {/* User Info */}
              <div className="p-3">
                <div className="flex items-center gap-3">
                  <Avatar>
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

              {/* Menu Items */}
              <DropdownMenuItem onClick={handleProfile}>
                Profile
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={handleLogout}
                className="text-destructive cursor-pointer"
              >
                <LogOut className="size-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
