/**
 * Central type definitions for the application
 */

export * from './approvals'

export interface NavItem {
  href: string
  label: string
  icon: React.ComponentType<{ className?: string }>
}

export interface MetricCard {
  title: string
  value: string
  change: string
  trend: 'up' | 'down'
}

// API Response Types for easy future integration
export interface ApiListResponse<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
}

export interface ApiPaginationParams {
  page?: number
  pageSize?: number
  search?: string
  filters?: Record<string, unknown>
}

// Common error type
export interface ApiErrorResponse {
  message: string
  code?: string
  details?: Record<string, unknown>
}
