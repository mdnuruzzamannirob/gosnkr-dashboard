/**
 * Error State Component
 * Shows when an error occurs
 */

import { AlertCircle } from 'lucide-react'
import { Button } from './button'

interface ErrorStateProps {
  title?: string
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
}

export function ErrorState({
  title = 'Something went wrong',
  description = 'We encountered an error while loading this content.',
  action,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-destructive/30 bg-destructive/5 py-12 px-4">
      <AlertCircle className="size-12 text-destructive mb-4" />
      <h3 className="font-semibold text-lg text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground mb-4 max-w-sm text-center">
        {description}
      </p>
      {action && (
        <Button onClick={action.onClick} variant="outline" size="sm">
          {action.label}
        </Button>
      )}
    </div>
  )
}
