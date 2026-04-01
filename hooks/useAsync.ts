import { useCallback, useEffect, useRef, useState } from 'react'

interface UseAsyncState<T> {
  data: T | null
  loading: boolean
  error: Error | null
}

/**
 * Async data fetching hook
 * Handles loading, error, and data states
 * Useful for API calls and async operations
 */
export function useAsync<T>(
  asyncFunction: () => Promise<T>,
  immediate: boolean = true,
) {
  const [state, setState] = useState<UseAsyncState<T>>({
    data: null,
    loading: immediate,
    error: null,
  })

  const mountedRef = useRef(true)

  const execute = useCallback(async () => {
    setState({ data: null, loading: true, error: null })

    try {
      const response = await asyncFunction()
      if (mountedRef.current) {
        setState({ data: response, loading: false, error: null })
      }
    } catch (error) {
      if (mountedRef.current) {
        setState({
          data: null,
          loading: false,
          error: error instanceof Error ? error : new Error('Unknown error'),
        })
      }
    }
  }, [asyncFunction])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (immediate) {
      void execute()
    }

    return () => {
      mountedRef.current = false
    }
  }, [])

  return { ...state, execute }
}
