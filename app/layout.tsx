import { Toaster } from '@/components/ui/sonner'
import { cn } from '@/lib/utils'
import type { Metadata } from 'next'
import { Geist, Geist_Mono, Roboto } from 'next/font/google'
import './globals.css'

const roboto = Roboto({ subsets: ['latin'], variable: '--font-sans' })

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Admin Dashboard - Gosnkr',
  description:
    'Admin dashboard for Gosnkr, a platform for managing and analyzing data.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={cn(
        'h-full',
        'antialiased',
        geistSans.variable,
        geistMono.variable,
        'font-sans',
        roboto.variable,
      )}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col">
        {children}
        <Toaster
          richColors
          expand
          visibleToasts={3}
          position="top-center"
          swipeDirections={['top', 'bottom', 'left', 'right']}
        />
      </body>
    </html>
  )
}
