import type {
  ForgotPasswordFormValues,
  LoginFormValues,
  ResetPasswordFormValues,
  VerifyOtpFormValues,
} from '@/lib/schemas/auth'

type AuthActionResult = {
  message: string
}

const delay = (duration = 900) =>
  new Promise((resolve) => {
    setTimeout(resolve, duration)
  })

export async function authenticateWithPassword(
  payload: LoginFormValues,
): Promise<AuthActionResult> {
  void payload
  await delay()

  return {
    message: 'Login successful. You can now continue to the dashboard flow.',
  }
}

export async function requestPasswordResetOtp(
  payload: ForgotPasswordFormValues,
): Promise<AuthActionResult> {
  await delay()

  return {
    message: `A 6-digit OTP has been sent to ${payload.email}.`,
  }
}

export async function verifyResetOtp(
  payload: VerifyOtpFormValues,
): Promise<AuthActionResult> {
  await delay()

  return {
    message: `OTP verification successful for ${payload.otp}. You can now set a new password.`,
  }
}

export async function resendResetOtp(): Promise<AuthActionResult> {
  await delay(600)

  return {
    message: 'A new OTP has been sent to your registered email address.',
  }
}

export async function resetAccountPassword(
  payload: ResetPasswordFormValues,
): Promise<AuthActionResult> {
  void payload
  await delay()

  return {
    message:
      'Password reset successful. Please sign in with your new password.',
  }
}
