# Project Improvements & Refactoring Guide

## 📋 Overview

This document outlines all improvements made to the gosnkr dashboard project. The focus has been on:

- ✅ Code reusability and maintainability
- ✅ Future-proof API integration
- ✅ Better component structure
- ✅ Proper loading/error state handling
- ✅ Type safety and consistency
- ✅ Best practices implementation

---

## 🎣 Custom Hooks (`/hooks/`)

### 1. **useAsync.ts** - Data Fetching Hook

Used for loading remote data with proper state management.

```typescript
import { useAsync } from '@/hooks'

const { data, loading, error, execute } = useAsync(() =>
  apiClient.get('/stores'),
)
```

**Features:**

- Handles loading, error, and success states
- Executes on mount (configurable)
- Provides manual `execute` function for refetching
- Safe with component unmounting

---

### 2. **useDebounce.ts** - Debounced Value Hook

Perfect for search inputs and real-time filters.

```typescript
const searchTerm = useDebounce(value, 500)
// Use searchTerm in API call after delay
```

**Features:**

- Customizable delay
- Prevents excessive API calls
- Clean and simple API

---

### 3. **usePagination.ts** - Pagination State

Manage pagination state easily.

```typescript
const { page, pageSize, goToPage, nextPage, prevPage, changePageSize } =
  usePagination(10)
```

**Features:**

- Page and page size management
- Helper functions for navigation
- Useful for list views

---

### 4. **useLocalStorage.ts** - Persistent Storage

Type-safe localStorage with SSR support.

```typescript
const [value, setValue, isLoaded] = useLocalStorage('key', defaultValue)
```

**Features:**

- Type-safe operations
- SSR safe (checks for window)
- Syncs with localStorage automatically

---

### 5. **useFilter.ts** - Multi-Filter State

Manage multiple filter states.

```typescript
const { filters, addFilter, removeFilter, resetFilters, updateFilters } =
  useFilter()
```

**Features:**

- Add/remove individual filters
- Update multiple filters at once
- Reset all filters

---

## 🔌 API Service Layer (`/lib/services/` & `/lib/api-client.ts`)

### Architecture Overview

```
services/
├── index.ts (exports all services)
├── store.service.ts (store operations)
├── dashboard.service.ts (dashboard data)
└── ... (add more services as needed)
```

### API Client (`lib/api-client.ts`)

Centralized fetch wrapper for all API calls:

```typescript
import { apiClient } from '@/lib/api-client'

// Get request
const response = await apiClient.get<T>(endpoint)

// Post request
const response = await apiClient.post<T>(endpoint, body)

// Put/Delete also available
```

**Features:**

- Centralized error handling
- Type-safe responses
- Easy to swap between mock and real APIs
- Automatic JSON handling

### Services Example (`store.service.ts`)

```typescript
import { storeService } from '@/lib/services'

// All operations currently have mock data
const stores = await storeService.getAllStores()
const store = await storeService.getStore(id)

// TODO comments show where to integrate real API later
```

**Easy Migration Path:**

```typescript
// Replace mock with real API (just uncomment and modify):
async getAllStores(): Promise<Store[]> {
  const response = await apiClient.get<Store[]>('/stores')
  if (response.error) throw new Error(response.error)
  return response.data || []
}
```

---

## 🏗️ Component Improvements

### Dashboard Shell Refactoring

**Before:** One large component (200+ lines)
**After:** Modular components:

```
dashboard-shell.tsx (main orchestrator - 30 lines)
├── dashboard-sidebar.tsx (navigation)
├── dashboard-header.tsx (search, notifications, user menu)
└── dashboard-mobile-nav.tsx (mobile navigation)
```

**Benefits:**

- Each component has single responsibility
- Easier to test and maintain
- Easy to reuse in other layouts
- Clean and simple main shell

---

## 📊 UI State Components

### New Components for State Management

#### 1. **Skeleton.tsx** - Loading States

```typescript
<Skeleton className="h-10 w-full" />
<SkeletonText lines={3} />
<SkeletonTable rows={5} cols={4} />
```

#### 2. **EmptyState.tsx** - Empty Data

```typescript
<EmptyState
  title="No stores found"
  description="Create your first store to get started"
  action={{ label: 'Create', onClick: handleCreate }}
/>
```

#### 3. **ErrorState.tsx** - Error Handling

```typescript
<ErrorState
  title="Failed to load stores"
  action={{ label: 'Retry', onClick: handleRetry }}
/>
```

#### 4. **LoadingState.tsx** - Spinner

```typescript
<LoadingState message="Loading stores..." />
```

#### 5. **ErrorBoundary.tsx** - React Error Catching

```typescript
<ErrorBoundary>
  <YourComponent />
</ErrorBoundary>
```

#### 6. **DataDisplay.tsx** - Combined State Handler

```typescript
const { state, data } = useDataDisplay({
  asyncFn: () => storeService.getAllStores()
})

return (
  <DataDisplay
    state={state}
    data={data}
    empty={{ title: 'No stores' }}
    error={{ title: 'Error loading stores' }}
  >
    {/* Your content here */}
  </DataDisplay>
)
```

---

## 📝 Extended Type System

### New Types in `/types/index.ts`

```typescript
// For paginated API responses
export interface ApiListResponse<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
}

// For pagination parameters
export interface ApiPaginationParams {
  page?: number
  pageSize?: number
  search?: string
  filters?: Record<string, unknown>
}

// For error responses
export interface ApiErrorResponse {
  message: string
  code?: string
  details?: Record<string, unknown>
}
```

---

## 🚀 Usage Examples

### Example 1: Loading Stores with Proper States

```typescript
'use client'

import { useAsync } from '@/hooks'
import { storeService } from '@/lib/services'
import { DataDisplay } from '@/components/ui/data-display'

export default function StoresPage() {
  const { data, loading, error } = useAsync(() =>
    storeService.getAllStores()
  )

  return (
    <DataDisplay
      state={loading ? 'loading' : error ? 'error' : 'success'}
      data={data}
      empty={{ title: 'No stores found' }}
    >
      {/* Your component here */}
    </DataDisplay>
  )
}
```

### Example 2: Search with Debounce

```typescript
'use client'

import { useAsync, useDebounce } from '@/hooks'
import { useState } from 'react'

export default function SearchStores() {
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 300)

  const { data: results } = useAsync(
    () => storeService.searchStores(debouncedSearch),
    false // Don't run immediately
  )

  return (
    <>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search stores..."
      />
      {/* Display results */}
    </>
  )
}
```

### Example 3: Pagination

```typescript
'use client'

import { usePagination, useAsync } from '@/hooks'
import { storeService } from '@/lib/services'

export default function StoresWithPagination() {
  const { page, pageSize, nextPage, prevPage } = usePagination(10)

  const { data: stores } = useAsync(
    () => storeService.getAllStores(), // Add pagination params when API ready
    true,
    [page, pageSize]
  )

  return (
    <>
      {/* Display stores for current page */}
      <button onClick={prevPage}>Previous</button>
      <button onClick={nextPage}>Next</button>
    </>
  )
}
```

---

## 🔄 API Integration Checklist

When backend is ready, follow these steps:

- [ ] Update `NEXT_PUBLIC_API_URL` in `.env.local`
- [ ] Uncomment API calls in service files (see `TODO` comments)
- [ ] Replace mock data with real API responses
- [ ] Update response types if needed
- [ ] Test all features with real backend
- [ ] Remove mock data

Example service update:

```typescript
// Before (mock)
async getAllStores(): Promise<Store[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockStores), 300)
  })
}

// After (real API)
async getAllStores(): Promise<Store[]> {
  const response = await apiClient.get<Store[]>('/stores')
  if (response.error) throw new Error(response.error)
  return response.data || []
}
```

---

## 📚 File Structure Summary

```
app/
├── (auth)/ ... (unchanged)
└── (dashboard)/
    ├── constants already using services
    └── pages ready for data integration

components/
├── dashboard/
│   ├── dashboard-shell.tsx (refactored - cleaner)
│   ├── dashboard-sidebar.tsx (extracted)
│   ├── dashboard-header.tsx (extracted)
│   ├── dashboard-mobile-nav.tsx (extracted)
│   └── ... (other components)
├── ui/
│   ├── ... (existing components)
│   ├── skeleton.tsx (new)
│   ├── error-boundary.tsx (new)
│   ├── empty-state.tsx (new)
│   ├── error-state.tsx (new)
│   ├── loading-state.tsx (new)
│   └── data-display.tsx (new)
└── ... (other components)

hooks/
├── useAsync.ts (new)
├── useDebounce.ts (new)
├── useFilter.ts (new)
├── useLocalStorage.ts (new)
├── usePagination.ts (new)
└── index.ts (new)

lib/
├── api-client.ts (new)
├── services/
│   ├── store.service.ts (new)
│   ├── dashboard.service.ts (new)
│   └── index.ts (new)
├── auth/
├── constants/
├── schemas/
├── utils/
├── env.ts
└── utils.ts

types/
├── index.ts (expanded)
└── approvals.ts
```

---

## 🎯 Best Practices Applied

✅ **Separation of Concerns** - Each component/hook has one job
✅ **DRY Principle** - Reusable hooks and components
✅ **Type Safety** - Full TypeScript coverage
✅ **Error Handling** - Proper error states and boundaries
✅ **Loading States** - Better UX with loading indicators
✅ **Component Composition** - Smaller, composable components
✅ **Service Layer** - Centralized data operations
✅ **Future-Proof** - Easy API integration path

---

## 📖 Next Steps

1. **Use new hooks in pages** - Replace inline state with custom hooks
2. **Integrate with API** - Follow the checklist above
3. **Add more services** - Create services for each feature
4. **Test thoroughly** - Test loading/error states
5. **Monitor performance** - Track component render times

---

## 🤝 Support

For questions about these improvements or the new patterns, refer to:

- Hook examples in each hook file
- Service examples in `lib/services/`
- Component examples in `/components/ui/`
- This guide's usage examples section
