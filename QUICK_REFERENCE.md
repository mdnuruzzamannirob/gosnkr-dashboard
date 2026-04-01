# 🚀 Quick Reference Guide

Quick examples for using the new patterns in your code.

## Hooks Quick Reference

### Load Data from Service

```typescript
import { useAsync } from '@/hooks'
import { storeService } from '@/lib/services'

const {
  data: stores,
  loading,
  error,
} = useAsync(() => storeService.getAllStores())
```

### Search with Debounce

```typescript
import { useDebounce } from '@/hooks'
import { useState } from 'react'

const [search, setSearch] = useState('')
const debouncedSearch = useDebounce(search, 300)

// Use debouncedSearch in your effect
```

### Manage Filters

```typescript
import { useFilter } from '@/hooks'

const { filters, addFilter, removeFilter, resetFilters } = useFilter()

// Usage
addFilter('status', 'Pending')
removeFilter('status')
```

### Pagination

```typescript
import { usePagination } from '@/hooks'

const { page, pageSize, nextPage, prevPage, goToPage } = usePagination(10)
```

### Persistent State

```typescript
import { useLocalStorage } from '@/hooks'

const [theme, setTheme, isLoaded] = useLocalStorage('theme', 'light')
```

---

## UI Components Quick Reference

### Show Loading

```typescript
import { Skeleton, SkeletonText, SkeletonTable } from '@/components/ui/skeleton'

<Skeleton className="h-10 w-full" />
<SkeletonText lines={3} />
<SkeletonTable rows={5} cols={4} />
```

### Show Empty State

```typescript
import { EmptyState } from '@/components/ui/empty-state'
import { Package } from 'lucide-react'

<EmptyState
  icon={Package}
  title="No stores found"
  description="Create your first store to get started"
  action={{ label: 'Create', onClick: () => {} }}
/>
```

### Show Error

```typescript
import { ErrorState } from '@/components/ui/error-state'

<ErrorState
  title="Failed to load"
  action={{ label: 'Retry', onClick: () => {} }}
/>
```

### Loading Spinner

```typescript
import { LoadingState } from '@/components/ui/loading-state'

<LoadingState message="Loading..." />
<LoadingState message="Loading..." fullScreen={true} />
```

### Combined State Handler

```typescript
import { DataDisplay } from '@/components/ui/data-display'

const { state, data } = useDataDisplay({
  asyncFn: () => storeService.getAllStores()
})

<DataDisplay
  state={state}
  data={data}
  empty={{ title: 'No stores' }}
  error={{ title: 'Error loading stores' }}
>
  {/* Your component here */}
</DataDisplay>
```

### Error Boundary

```typescript
import { ErrorBoundary } from '@/components/ui/error-boundary'

<ErrorBoundary>
  <YourRiskyComponent />
</ErrorBoundary>
```

---

## Service Layer Quick Reference

### Getting Data

```typescript
import { storeService, dashboardService } from '@/lib/services'

// Stores
const stores = await storeService.getAllStores()
const store = await storeService.getStore(id)

// Dashboard
const metrics = await dashboardService.getMetrics()
const health = await dashboardService.getPlatformHealth()
```

---

## Complete Page Example

```typescript
'use client'

import { useAsync, useFilter, useDebounce } from '@/hooks'
import { storeService } from '@/lib/services'
import { DataDisplay } from '@/components/ui/data-display'
import { useState } from 'react'

export default function StoresPage() {
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 300)
  const { filters, addFilter } = useFilter()

  // Load stores
  const { data: stores, loading, error, execute } = useAsync(
    () => storeService.getAllStores(),
    true
  )

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Stores</h1>

      {/* Search Bar */}
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search stores..."
      />

      {/* Status Filter */}
      <select onChange={(e) => addFilter('status', e.target.value)}>
        <option>All</option>
        <option>Pending</option>
        <option>Approved</option>
      </select>

      {/* Data Display with States */}
      <DataDisplay
        state={loading ? 'loading' : error ? 'error' : 'success'}
        data={stores}
        empty={{ title: 'No stores found' }}
        error={{ action: { label: 'Retry', onClick: execute } }}
      >
        <div className="grid gap-4">
          {stores?.map((store) => (
            <div key={store.id} className="p-4 border rounded">
              {store.name}
            </div>
          ))}
        </div>
      </DataDisplay>
    </div>
  )
}
```

---

## Common Patterns

### Pattern 1: List Page with Filters & Search

See complete example above ☝️

### Pattern 2: Detail Page

```typescript
const { data: store } = useAsync(() => storeService.getStore(id), true, [id])
```

### Pattern 3: Form with API Call

```typescript
const { execute: submitForm, loading } = useAsync(
  () => storeService.createStore(formData),
  false, // Don't run on mount
)

const onSubmit = async (data) => {
  await submitForm()
}
```

### Pattern 4: Soft Delete/Archive

```typescript
const { execute: deleteStore, loading } = useAsync(
  () => storeService.deleteStore(id),
  false,
)
```

---

## Environment Variables

Set in `.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_ENABLE_ANALYTICS=false
NEXT_PUBLIC_ENABLE_DARK_MODE=true
NEXT_PUBLIC_SESSION_TIMEOUT=3600000
```

---

## Tips & Tricks

✅ Always use `useAsync` instead of `useEffect` + `useState` for API calls
✅ Use `DataDisplay` component for consistent loading/error states
✅ Combine `useDebounce` with `useAsync` for search
✅ Services are the single source of truth for API endpoints
✅ Types in `types/` folder keep your data structures consistent
✅ Error boundaries catch unexpected React errors

---

## Common Mistakes to Avoid

❌ Using `useState` for API loading state (use `useAsync` instead)
❌ Putting loading/error UI logic in components (use `DataDisplay` instead)
❌ Making API calls directly in components (create a service instead)
❌ Forgetting to handle errors (always provide error state)
❌ Not providing loading experience (use Skeleton components)

---

## Need More Help?

📖 Read the full guide: See `IMPROVEMENTS.md`
💡 Check hook files for detailed JSDoc comments
🔍 Look at existing service files for API patterns
