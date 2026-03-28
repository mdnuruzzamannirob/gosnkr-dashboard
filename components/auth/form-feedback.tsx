import { cn } from '@/lib/utils'

type FormFeedbackProps = {
  message?: string
  tone?: 'info' | 'success' | 'error'
}

const toneStyles: Record<NonNullable<FormFeedbackProps['tone']>, string> = {
  info: 'border-border bg-muted/30 text-foreground',
  success: 'border-primary/30 bg-primary/5 text-foreground',
  error: 'border-destructive/50 bg-destructive/10 text-destructive',
}

export function FormFeedback({ message, tone = 'info' }: FormFeedbackProps) {
  if (!message) {
    return null
  }

  return (
    <p
      role={tone === 'error' ? 'alert' : 'status'}
      className={cn(
        'rounded-md border px-3 py-2 text-sm leading-5',
        toneStyles[tone],
      )}
    >
      {message}
    </p>
  )
}
