'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { AuthPageHeader } from '@/components/auth/auth-page-header'
import { FormField } from '@/components/auth/form-field'
import { Button } from '@/components/ui/button'
import { authenticateWithPassword } from '@/lib/auth/mock-auth'
import { AUTH_ROUTES } from '@/lib/constants/auth'
import { type LoginFormValues, loginSchema } from '@/lib/schemas/auth'
import { setZodFieldErrors } from '@/lib/utils/zod-errors'

const LoginPage = () => {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    mode: 'onTouched',
  })

  const onSubmit = async (values: LoginFormValues) => {
    const parsedValues = loginSchema.safeParse(values)

    if (!parsedValues.success) {
      setZodFieldErrors(parsedValues.error, setError)
      return
    }

    try {
      const response = await authenticateWithPassword(parsedValues.data)
      toast.success(response.message)
      router.push(AUTH_ROUTES.dashboard)
    } catch {
      toast.error('Unable to sign in right now. Please try again.')
    }
  }

  return (
    <div className="space-y-6">
      <AuthPageHeader
        title="Sign in to dashboard"
        description="Use your admin credential to access reporting and management tools."
      />

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
        <FormField
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="admin@gosnkr.com"
          error={errors.email?.message}
          {...register('email')}
        />

        <FormField
          label="Password"
          type="password"
          autoComplete="current-password"
          placeholder="Enter your password"
          error={errors.password?.message}
          {...register('password')}
        />

        <div className="flex items-center justify-between">
          <label className="inline-flex cursor-pointer select-none items-center gap-2 text-sm text-muted-foreground">
            <input
              type="checkbox"
              className="size-4 rounded-lg border border-border accent-primary"
              {...register('rememberMe')}
            />
            Remember me
          </label>

          <Link
            href={AUTH_ROUTES.forgotPassword}
            className="text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        <Button type="submit" className="h-10 w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Signing in...' : 'Sign in'}
        </Button>
      </form>
    </div>
  )
}

export default LoginPage
