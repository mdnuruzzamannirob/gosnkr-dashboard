import type { InputHTMLAttributes } from 'react'

import { cn } from '@/lib/utils'

type FormFieldProps = {
  label: string
  error?: string
  hint?: string
} & InputHTMLAttributes<HTMLInputElement>

export function FormField({
  label,
  error,
  hint,
  id,
  className,
  ...props
}: FormFieldProps) {
  const inputId = id ?? props.name
  const messageId = inputId ? `${inputId}-message` : undefined

  return (
    <div className="space-y-1.5">
      <label htmlFor={inputId} className="text-sm font-medium text-foreground">
        {label}
      </label>

      <input
        id={inputId}
        aria-invalid={Boolean(error)}
        aria-describedby={messageId}
        className={cn(
          'h-10 w-full rounded-md border bg-background px-3 text-sm text-foreground outline-none transition-colors',
          'placeholder:text-muted-foreground focus:border-primary',
          'disabled:cursor-not-allowed disabled:opacity-60',
          error
            ? 'border-destructive focus:border-destructive'
            : 'border-border',
          className,
        )}
        {...props}
      />

      {(error || hint) && (
        <p
          id={messageId}
          className={cn(
            'text-xs leading-5',
            error ? 'text-destructive' : 'text-muted-foreground',
          )}
        >
          {error ?? hint}
        </p>
      )}
    </div>
  )
}
