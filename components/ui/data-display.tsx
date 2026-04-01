/**
 * Data Display Component
 * Handles loading, error, empty, and success states for data display
 * Simplifies data fetching patterns across the app
 */

import { LucideIcon } from 'lucide-react'
import { ReactNode } from 'react'
import { EmptyState } from './empty-state'
import { ErrorState } from './error-state'
import { LoadingState } from './loading-state'

export type DataDisplayState = 'loading' | 'error' | 'empty' | 'success'

interface DataDisplayProps<T> {
  state: DataDisplayState
  data?: T
  children?: ReactNode
  loading?: {
    message?: string
  }
  error?: {
    title?: string
    description?: string
    action?: {
      label: string
      onClick: () => void
    }
  }
  empty?: {
    icon?: LucideIcon
    title: string
    description?: string
    action?: {
      label: string
      onClick: () => void
    }
  }
}

export function DataDisplay<T>({
  state,
  data,
  children,
  loading = {},
  error = {},
  empty = { title: 'No data' },
}: DataDisplayProps<T>) {
  switch (state) {
    case 'loading':
      return <LoadingState message={loading.message} />

    case 'error':
      return <ErrorState {...error} />

    case 'empty':
      return <EmptyState {...empty} />

    case 'success':
      return children || (data ? JSON.stringify(data) : null)

    default:
      return null
  }
}

// Hook version for easier usage
import { useAsync } from '@/hooks/useAsync'

interface UseDataDisplayProps<T> {
  asyncFn: () => Promise<T>
  immediate?: boolean
}

export function useDataDisplay<T>({
  asyncFn,
  immediate = true,
}: UseDataDisplayProps<T>) {
  const { data, loading, error, execute } = useAsync(asyncFn, immediate)

  const state: DataDisplayState = loading
    ? 'loading'
    : error
      ? 'error'
      : !data
        ? 'empty'
        : 'success'

  return {
    state,
    data,
    error,
    loading,
    execute,
  }
}
