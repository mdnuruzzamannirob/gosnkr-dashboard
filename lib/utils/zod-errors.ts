import type { FieldValues, Path, UseFormSetError } from 'react-hook-form'
import type { z } from 'zod'

export function setZodFieldErrors<TFieldValues extends FieldValues>(
  error: z.ZodError<TFieldValues>,
  setError: UseFormSetError<TFieldValues>,
) {
  const fieldErrors = error.flatten().fieldErrors

  for (const [fieldName, messages] of Object.entries(fieldErrors)) {
    const message = messages?.[0]

    if (!message) {
      continue
    }

    setError(fieldName as Path<TFieldValues>, {
      type: 'manual',
      message,
    })
  }
}
