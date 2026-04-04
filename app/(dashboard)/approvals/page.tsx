'use client'

import StoreDetail from '@/components/approvals/store-detail'
import StoreList from '@/components/approvals/store-list'
import { Card } from '@/components/ui/card'
import { useState } from 'react'

type Store = {
  id: string
  name: string
  location: string
  status: 'Pending' | 'Under Review' | 'Approved' | 'Rejected'
  submitted: string
}

const mockStores: Store[] = [
  {
    id: 'nike-downtown',
    name: 'Nike Downtown LA',
    location: 'Los Angeles, CA',
    status: 'Pending',
    submitted: '2h ago',
  },
  {
    id: 'sneaker-palace',
    name: 'Sneaker Palace NYC',
    location: 'New York, NY',
    status: 'Under Review',
    submitted: '5h ago',
  },
  {
    id: 'kicks-heaven',
    name: 'Kicks Heaven',
    location: 'Miami, FL',
    status: 'Pending',
    submitted: '1d ago',
  },
  {
    id: 'street-elite',
    name: 'Street Elite',
    location: 'Chicago, IL',
    status: 'Pending',
    submitted: '2d ago',
  },
]

export default function ApprovalsPage() {
  const [stores] = useState(mockStores)
  const [selectedId, setSelectedId] = useState(stores[0].id)

  const selected = stores.find((s) => s.id === selectedId) ?? stores[0]

  return (
    <div className="space-y-6">
      <section className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">
            Store Approval
          </h1>
        </div>

        <div className="mt-2 grid gap-6 lg:grid-cols-[360px_minmax(0,1fr)]">
          <aside className="h-fit">
            <Card className="h-full p-0">
              <StoreList
                stores={stores}
                selectedId={selectedId}
                onSelect={(id) => setSelectedId(id)}
              />
            </Card>
          </aside>

          <div>
            <StoreDetail store={selected} />
          </div>
        </div>
      </section>
    </div>
  )
}
