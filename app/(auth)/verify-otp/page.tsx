'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { ClipboardEvent, FormEvent, KeyboardEvent } from 'react'
import { useEffect, useRef, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { toast } from 'sonner'

import { AuthPageHeader } from '@/components/auth/auth-page-header'
import { Button } from '@/components/ui/button'
import { resendResetOtp, verifyResetOtp } from '@/lib/auth/mock-auth'
import { AUTH_ROUTES } from '@/lib/constants/auth'
import { verifyOtpSchema } from '@/lib/schemas/auth'

const otpFields = ['otp1', 'otp2', 'otp3', 'otp4', 'otp5', 'otp6'] as const
type OtpFieldName = (typeof otpFields)[number]
type OtpFormValues = Record<OtpFieldName, string>

const emptyOtpValues: OtpFormValues = {
  otp1: '',
  otp2: '',
  otp3: '',
  otp4: '',
  otp5: '',
  otp6: '',
}

const VerifyOtpPage = () => {
  const router = useRouter()
  const inputRefs = useRef<Array<HTMLInputElement | null>>([])
  const [cooldown, setCooldown] = useState(0)

  const {
    control,
    register,
    getValues,
    setError,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<OtpFormValues>({
    defaultValues: emptyOtpValues,
    mode: 'onTouched',
  })

  const otpValues =
    (useWatch({ control, name: otpFields }) as string[] | undefined) ?? []
  const combinedOtp = otpValues.join('')

  useEffect(() => {
    if (cooldown <= 0) {
      return undefined
    }

    const timer = window.setTimeout(() => {
      setCooldown((currentCooldown) => currentCooldown - 1)
    }, 1000)

    return () => window.clearTimeout(timer)
  }, [cooldown])

  const focusDigit = (index: number) => {
    const nextInput = inputRefs.current[index]

    if (!nextInput) {
      return
    }

    nextInput.focus()
    nextInput.select()
  }

  // Autofocus the first OTP input when the page mounts
  useEffect(() => {
    if (typeof window === 'undefined') return

    const raf = window.requestAnimationFrame(() => {
      focusDigit(0)
    })

    return () => window.cancelAnimationFrame(raf)
  }, [])

  const handleDigitChange = (
    index: number,
    fieldName: OtpFieldName,
    rawValue: string,
  ) => {
    const digit = rawValue.replace(/\D/g, '').slice(-1)

    setValue(fieldName, digit, {
      shouldDirty: true,
      shouldValidate: true,
    })

    if (digit && index < otpFields.length - 1) {
      focusDigit(index + 1)
    }
  }

  const handleKeyDown = (
    index: number,
    fieldName: OtpFieldName,
    event: KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Backspace' && !event.currentTarget.value && index > 0) {
      event.preventDefault()

      const previousField = otpFields[index - 1]
      setValue(previousField, '', {
        shouldDirty: true,
        shouldValidate: true,
      })
      focusDigit(index - 1)
    }

    if (event.key === 'Delete') {
      setValue(fieldName, '', {
        shouldDirty: true,
        shouldValidate: true,
      })
    }
  }

  const handlePaste = (
    index: number,
    event: ClipboardEvent<HTMLInputElement>,
  ) => {
    const pastedDigits = event.clipboardData
      .getData('text')
      .replace(/\D/g, '')
      .slice(0, otpFields.length - index)

    if (pastedDigits.length === 0) {
      return
    }

    event.preventDefault()

    pastedDigits.split('').forEach((digit, offset) => {
      const currentIndex = index + offset

      setValue(otpFields[currentIndex], digit, {
        shouldDirty: true,
        shouldValidate: true,
      })
    })

    const nextIndex = Math.min(
      index + pastedDigits.length,
      otpFields.length - 1,
    )
    focusDigit(nextIndex)
  }

  const submitOtp = async (values: OtpFormValues) => {
    const otp = otpFields.map((field) => values[field]).join('')
    const parsedValues = verifyOtpSchema.safeParse({ otp })

    if (!parsedValues.success) {
      const message =
        parsedValues.error.issues[0]?.message ?? 'Enter a valid 6-digit OTP.'

      otpFields.forEach((field) => {
        setError(field, { type: 'manual', message })
      })

      toast.error(message)
      focusDigit(0)
      return
    }

    try {
      const response = await verifyResetOtp(parsedValues.data)
      toast.success(response.message)
      router.push(AUTH_ROUTES.resetPassword)
    } catch {
      toast.error(
        'OTP verification failed. Please check the code and try again.',
      )
    }
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    await submitOtp(getValues())
  }

  const handleResend = async () => {
    if (cooldown > 0) {
      return
    }

    try {
      const response = await resendResetOtp()
      toast.success(response.message)

      otpFields.forEach((field) => {
        setValue(field, '', {
          shouldDirty: true,
          shouldValidate: true,
        })
      })

      setCooldown(30)
      focusDigit(0)
    } catch {
      toast.error('Unable to resend OTP right now. Please try again.')
    }
  }

  return (
    <div className="space-y-6">
      <AuthPageHeader
        title="Verify OTP"
        description="Enter the 6-digit code you received to continue password recovery."
      />

      <form className="space-y-4" onSubmit={handleSubmit} noValidate>
        <div className="space-y-2">
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-6 sm:gap-2.5">
            {otpFields.map((fieldName, index) => {
              const registration = register(fieldName)

              return (
                <input
                  key={fieldName}
                  type="text"
                  inputMode="numeric"
                  autoComplete={index === 0 ? 'one-time-code' : 'off'}
                  maxLength={1}
                  aria-label={`OTP digit ${index + 1}`}
                  aria-invalid={Boolean(errors[fieldName])}
                  className="h-12 rounded-md border border-border bg-background text-center text-lg font-semibold tracking-[0.25em] text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
                  {...registration}
                  ref={(node) => {
                    registration.ref(node)
                    inputRefs.current[index] = node
                  }}
                  onChange={(event) => {
                    registration.onChange(event)
                    handleDigitChange(index, fieldName, event.target.value)
                  }}
                  onKeyDown={(event) => {
                    handleKeyDown(index, fieldName, event)
                  }}
                  onPaste={(event) => handlePaste(index, event)}
                />
              )
            })}
          </div>

          <p className="text-xs leading-5 text-muted-foreground">
            Use exactly 6 digits. You can paste the whole code at once.
          </p>
        </div>

        <Button
          type="submit"
          className="h-10 w-full"
          disabled={isSubmitting || combinedOtp.length !== 6}
        >
          {isSubmitting ? 'Verifying...' : 'Verify OTP'}
        </Button>
      </form>

      <div className="space-y-4">
        <div className="flex flex-col gap-3 text-sm sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={handleResend}
            disabled={cooldown > 0}
            className="font-medium text-primary underline-offset-4 transition-opacity hover:underline disabled:cursor-not-allowed disabled:opacity-50"
          >
            {cooldown > 0 ? `Resend OTP in ${cooldown}s` : 'Resend OTP'}
          </button>

          <Link
            href={AUTH_ROUTES.forgotPassword}
            className="font-medium text-muted-foreground underline-offset-4 hover:text-primary hover:underline"
          >
            Go back
          </Link>
        </div>
      </div>
    </div>
  )
}

export default VerifyOtpPage
