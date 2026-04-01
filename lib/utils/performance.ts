/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Performance optimization utilities
 */

import { useEffect, useRef } from 'react'

/**
 * Deep comparison hook for dependency arrays
 */
export function useDeepCompareEffect(
  callback: React.EffectCallback,
  dependencies: React.DependencyList,
) {
  const currentDependenciesRef = useRef<React.DependencyList>(null)

  if (!areDeepEqual(currentDependenciesRef.current, dependencies)) {
    currentDependenciesRef.current = dependencies
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(callback, [currentDependenciesRef.current])
}

/**
 * Deep equality comparison
 */
function areDeepEqual(a: any, b: any): boolean {
  if (a === b) return true
  if (a == null || b == null) return false
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false
    return a.every((item, index) => areDeepEqual(item, b[index]))
  }
  if (typeof a === 'object' && typeof b === 'object') {
    const keysA = Object.keys(a)
    const keysB = Object.keys(b)
    if (keysA.length !== keysB.length) return false
    return keysA.every((key) => areDeepEqual(a[key], b[key]))
  }
  return false
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null
      func(...args)
    }

    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(later, wait)
  }
}

/**
 * Throttle function
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number,
): (...args: Parameters<T>) => void {
  let inThrottle: boolean = false

  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => {
        inThrottle = false
      }, limit)
    }
  }
}
