import { z } from 'zod'

const emailSchema = z
  .string()
  .trim()
  .min(1, 'Email is required.')
  .email('Please enter a valid email address.')

const otpSchema = z
  .string()
  .trim()
  .regex(/^\d{6}$/, 'OTP must be exactly 6 digits.')

const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters.')
  .max(64, 'Password must be within 64 characters.')
  .regex(/[A-Za-z]/, 'Password must contain at least one letter.')
  .regex(/\d/, 'Password must contain at least one number.')

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  rememberMe: z.boolean().optional(),
})

export const forgotPasswordSchema = z.object({
  email: emailSchema,
})

export const verifyOtpSchema = z.object({
  otp: otpSchema,
})

export const resetPasswordSchema = z
  .object({
    newPassword: passwordSchema,
    confirmPassword: z.string().min(1, 'Please confirm your password.'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword'],
  })

export type LoginFormValues = z.infer<typeof loginSchema>
export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>
export type VerifyOtpFormValues = z.infer<typeof verifyOtpSchema>
export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>
