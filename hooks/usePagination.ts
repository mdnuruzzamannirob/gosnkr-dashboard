import { useCallback, useState } from 'react'

interface PaginationState {
  page: number
  pageSize: number
}

/**
 * Pagination hook for managing page controls
 * Returns current page, page size, and helper functions
 */
export function usePagination(initialPageSize: number = 10) {
  const [pagination, setPagination] = useState<PaginationState>({
    page: 1,
    pageSize: initialPageSize,
  })

  const goToPage = useCallback((page: number) => {
    setPagination((prev) => ({ ...prev, page }))
  }, [])

  const nextPage = useCallback(() => {
    setPagination((prev) => ({ ...prev, page: prev.page + 1 }))
  }, [])

  const prevPage = useCallback(() => {
    setPagination((prev) => ({ ...prev, page: Math.max(1, prev.page - 1) }))
  }, [])

  const changePageSize = useCallback((pageSize: number) => {
    setPagination((prev) => ({ ...prev, pageSize, page: 1 }))
  }, [])

  return {
    page: pagination.page,
    pageSize: pagination.pageSize,
    goToPage,
    nextPage,
    prevPage,
    changePageSize,
  }
}
