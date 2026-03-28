'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { AuthPageHeader } from '@/components/auth/auth-page-header'
import { FormField } from '@/components/auth/form-field'
import { Button } from '@/components/ui/button'
import { requestPasswordResetOtp } from '@/lib/auth/mock-auth'
import { AUTH_ROUTES } from '@/lib/constants/auth'
import {
  type ForgotPasswordFormValues,
  forgotPasswordSchema,
} from '@/lib/schemas/auth'
import { setZodFieldErrors } from '@/lib/utils/zod-errors'

const ForgotPasswordPage = () => {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormValues>({
    defaultValues: {
      email: '',
    },
    mode: 'onTouched',
  })

  const onSubmit = async (values: ForgotPasswordFormValues) => {
    const parsedValues = forgotPasswordSchema.safeParse(values)

    if (!parsedValues.success) {
      setZodFieldErrors(parsedValues.error, setError)
      return
    }

    try {
      const response = await requestPasswordResetOtp(parsedValues.data)
      toast.success(response.message)
      router.push(AUTH_ROUTES.verifyOtp)
    } catch {
      toast.error('Unable to send OTP at the moment. Please try again.')
    }
  }

  return (
    <div className="space-y-6">
      <AuthPageHeader
        title="Forgot password"
        description="Enter your account email and we will send a one-time OTP for password reset."
      />

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
        <FormField
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="admin@gosnkr.com"
          hint="Use the same email used in your admin login."
          error={errors.email?.message}
          {...register('email')}
        />

        <Button type="submit" className="h-10 w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Sending OTP...' : 'Send OTP'}
        </Button>
      </form>

      <div className="space-y-3">
        <p className="text-center text-sm text-muted-foreground">
          Remembered your password?{' '}
          <Link
            href={AUTH_ROUTES.login}
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            Back to login
          </Link>
        </p>
      </div>
    </div>
  )
}

export default ForgotPasswordPage
