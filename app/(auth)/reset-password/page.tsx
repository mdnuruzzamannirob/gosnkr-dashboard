'use client'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { AuthPageHeader } from '@/components/auth/auth-page-header'
import { FormField } from '@/components/auth/form-field'
import { Button } from '@/components/ui/button'
import { resetAccountPassword } from '@/lib/auth/mock-auth'
import { AUTH_ROUTES } from '@/lib/constants/auth'
import {
  type ResetPasswordFormValues,
  resetPasswordSchema,
} from '@/lib/schemas/auth'
import { setZodFieldErrors } from '@/lib/utils/zod-errors'

const ResetPasswordPage = () => {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormValues>({
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
    mode: 'onTouched',
  })

  const onSubmit = async (values: ResetPasswordFormValues) => {
    const parsedValues = resetPasswordSchema.safeParse(values)

    if (!parsedValues.success) {
      setZodFieldErrors(parsedValues.error, setError)
      return
    }

    try {
      const response = await resetAccountPassword(parsedValues.data)
      toast.success(response.message)
      router.push(AUTH_ROUTES.login)
    } catch {
      toast.error('Unable to reset password right now. Please try again.')
    }
  }

  return (
    <div className="space-y-6">
      <AuthPageHeader
        title="Reset password"
        description="Create a new password for your account."
      />

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
        <FormField
          label="New password"
          type="password"
          autoComplete="new-password"
          placeholder="Enter a strong password"
          hint="Use at least 8 characters with letters and numbers."
          error={errors.newPassword?.message}
          {...register('newPassword')}
        />

        <FormField
          label="Confirm new password"
          type="password"
          autoComplete="new-password"
          placeholder="Re-enter your new password"
          error={errors.confirmPassword?.message}
          {...register('confirmPassword')}
        />

        <Button type="submit" className="h-10 w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Updating password...' : 'Reset password'}
        </Button>
      </form>


    </div>
  )
}

export default ResetPasswordPage
