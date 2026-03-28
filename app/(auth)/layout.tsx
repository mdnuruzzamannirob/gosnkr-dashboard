import type { ReactNode } from 'react'

import { AuthBrand } from '@/components/auth/auth-brand'

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-linear-to-br from-muted/35 via-background to-primary/10 p-4 sm:p-6">
      <section className="w-full max-w-md rounded-2xl border border-border bg-background p-6 sm:p-8">
        <div className="space-y-6">
          <AuthBrand />
          {children}
        </div>
      </section>
    </main>
  )
}
