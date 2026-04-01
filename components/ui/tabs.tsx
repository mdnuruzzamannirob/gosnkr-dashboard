'use client'

import { cn } from '@/lib/utils'
import React, { createContext, useContext, useState } from 'react'

interface TabsContextType {
  activeTab: string
  setActiveTab: (tab: string) => void
}

const TabsContext = createContext<TabsContextType | undefined>(undefined)

interface TabsProps {
  children: React.ReactNode
  defaultValue: string
  className?: string
  onValueChange?: (value: string) => void
}

export function Tabs({
  children,
  defaultValue,
  className,
  onValueChange,
}: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultValue)

  const handleSetActiveTab = (tab: string) => {
    setActiveTab(tab)
    onValueChange?.(tab)
  }

  return (
    <TabsContext.Provider
      value={{ activeTab, setActiveTab: handleSetActiveTab }}
    >
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  )
}

interface TabsListProps {
  children: React.ReactNode
  className?: string
}

export function TabsList({ children, className }: TabsListProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-0 border-b border-border',
        className,
      )}
    >
      {children}
    </div>
  )
}

interface TabsTriggerProps {
  children: React.ReactNode
  value: string
  className?: string
  count?: number
}

export function TabsTrigger({
  children,
  value,
  className,
  count,
}: TabsTriggerProps) {
  const context = useContext(TabsContext)
  if (!context) throw new Error('TabsTrigger must be used inside Tabs')

  const isActive = context.activeTab === value

  return (
    <button
      onClick={() => context.setActiveTab(value)}
      className={cn(
        'px-4 py-3 text-sm font-medium transition-colors relative whitespace-nowrap',
        isActive
          ? 'text-foreground'
          : 'text-muted-foreground hover:text-foreground',
        'after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5',
        isActive ? 'after:bg-primary' : 'after:bg-transparent',
        className,
      )}
    >
      <span className="flex items-center gap-2">
        {children}
        {count !== undefined && (
          <span className="ml-1 inline-flex items-center rounded-full bg-muted/20 px-2 py-0.5 text-xs text-muted-foreground">
            {count.toLocaleString()}
          </span>
        )}
      </span>
    </button>
  )
}

interface TabsContentProps {
  children: React.ReactNode
  value: string
  className?: string
}

export function TabsContent({ children, value, className }: TabsContentProps) {
  const context = useContext(TabsContext)
  if (!context) throw new Error('TabsContent must be used inside Tabs')

  if (context.activeTab !== value) return null

  return <div className={className}>{children}</div>
}
