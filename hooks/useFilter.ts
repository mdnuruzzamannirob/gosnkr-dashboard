import { useCallback, useState } from 'react'

/**
 * Filter hook for managing filter state across multiple filters
 * Handles adding, removing, and resetting filters
 */
export function useFilter<T extends Record<string, unknown>>() {
  const [filters, setFilters] = useState<T>({} as T)

  const addFilter = useCallback((key: keyof T, value: unknown) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }))
  }, [])

  const removeFilter = useCallback((key: keyof T) => {
    setFilters((prev) => {
      const next = { ...prev }
      delete next[key]
      return next
    })
  }, [])

  const resetFilters = useCallback(() => {
    setFilters({} as T)
  }, [])

  const updateFilters = useCallback((newFilters: Partial<T>) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
    }))
  }, [])

  return {
    filters,
    addFilter,
    removeFilter,
    resetFilters,
    updateFilters,
  }
}
