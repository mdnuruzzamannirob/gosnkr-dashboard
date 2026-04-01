/**
 * Error Boundary Component
 * Catches React errors and displays a fallback UI
 */

'use client'

import { AlertCircle } from 'lucide-react'
import { Component, type ReactNode } from 'react'
import { Button } from './button'

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: (error: Error, reset: () => void) => ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error) {
    console.error('Error caught by boundary:', error)
  }

  resetError = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      const { fallback } = this.props

      if (fallback && this.state.error) {
        return fallback(this.state.error, this.resetError)
      }

      return (
        <div className="flex flex-col items-center justify-center rounded-lg border border-destructive/30 bg-destructive/5 py-12 px-4">
          <AlertCircle className="size-12 text-destructive mb-4" />
          <h3 className="font-semibold text-lg text-foreground mb-2">
            Oops! Something went wrong
          </h3>
          <p className="text-sm text-muted-foreground mb-4 max-w-sm text-center">
            {this.state.error?.message || 'An unexpected error occurred'}
          </p>
          <Button onClick={this.resetError} variant="outline" size="sm">
            Try Again
          </Button>
        </div>
      )
    }

    return this.props.children
  }
}
