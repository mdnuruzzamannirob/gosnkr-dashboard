import { redirect } from 'next/navigation'

import { AUTH_ROUTES } from '@/lib/constants/auth'

const HomePage = () => {
  redirect(AUTH_ROUTES.login)
}

export default HomePage
