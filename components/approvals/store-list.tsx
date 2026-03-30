'use client'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

type Store = {
  id: string
  name: string
  location: string
  status: 'Pending' | 'Under Review' | 'Approved' | 'Rejected'
  submitted: string
}

export default function StoreList({
  stores,
  selectedId,
  onSelect,
}: {
  stores: Store[]
  selectedId?: string
  onSelect: (id: string) => void
}) {
  return (
    <div className="flex h-full flex-col">
      <div className="px-4">
        <div className="flex items-center justify-between py-4">
          <div>
            <h2 className="text-lg font-semibold">Store Approvals</h2>
            <p className="text-sm text-muted-foreground">
              {stores.length} Pending
            </p>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-4">
          <button className="rounded-full bg-emerald-50 px-3 py-1 text-sm text-emerald-700">
            All
          </button>
          <button className="rounded-full bg-emerald-50 px-3 py-1 text-sm text-emerald-700">
            Pending
          </button>
          <button className="rounded-full bg-muted px-3 py-1 text-sm text-muted-foreground">
            Under Review
          </button>
          <button className="rounded-full bg-muted px-3 py-1 text-sm text-muted-foreground">
            Approved
          </button>
          <button className="rounded-full bg-muted px-3 py-1 text-sm text-muted-foreground">
            Rejected
          </button>
        </div>
      </div>

      <div className="mt-2 flex-1 overflow-y-auto px-3 pb-6">
        <ul className="space-y-3">
          {stores.map((s) => {
            const active = selectedId === s.id

            return (
              <li key={s.id}>
                <div
                  onClick={() => onSelect(s.id)}
                  className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition-colors ${
                    active
                      ? 'bg-emerald-50 border-emerald-200'
                      : 'bg-transparent border-border/40 hover:bg-muted/60'
                  }`}
                >
                  <div className="shrink-0">
                    <Avatar size="sm">
                      <AvatarFallback>{s.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </div>

                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium leading-tight">
                          {s.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {s.location}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">
                          Submitted {s.submitted}
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between gap-3">
                      <div>
                        <Badge
                          variant={
                            s.status === 'Pending' ? 'default' : 'outline'
                          }
                        >
                          {s.status}
                        </Badge>
                      </div>

                      <div>
                        {s.status === 'Pending' && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => onSelect(s.id)}
                          >
                            Start Review
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
