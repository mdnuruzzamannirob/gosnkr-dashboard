'use client'

import { Search } from 'lucide-react'
import { useMemo, useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const storeData = [
  {
    id: 1,
    avatar: 'SJ',
    name: 'Sarah Johnson',
    handle: '@sarah_kicks',
    email: 'sarah.j@email.com',
    joined: 'Jan 15, 2024',
    orders: 12,
    status: 'Active',
  },
  {
    id: 2,
    avatar: 'MC',
    name: 'Mike Chen',
    handle: '@mike_sneakers',
    email: 'mike.c@email.com',
    joined: 'Feb 20, 2024',
    orders: 8,
    status: 'Active',
  },
  {
    id: 3,
    avatar: 'ED',
    name: 'Emily Davis',
    handle: '@em_style',
    email: 'emily.d@email.com',
    joined: 'Mar 5, 2024',
    orders: 5,
    status: 'Warned',
  },
  {
    id: 4,
    avatar: 'JW',
    name: 'James Wilson',
    handle: '@jw_kicks',
    email: 'james.w@email.com',
    joined: 'Dec 10, 2023',
    orders: 24,
    status: 'Active',
  },
  {
    id: 5,
    avatar: 'LM',
    name: 'Lisa Martinez',
    handle: '@lisa_m',
    email: 'lisa.m@email.com',
    joined: 'Jan 28, 2024',
    orders: 15,
    status: 'Active',
  },
]

const statusBadge = {
  Active: 'bg-emerald-100 text-emerald-700',
  Warned: 'bg-amber-100 text-amber-700',
  Inactive: 'bg-muted/20 text-muted-foreground',
}

export default function StoresPage() {
  const [search, setSearch] = useState('')
  const [tab, setTab] = useState<'Customers' | 'Stores' | 'Resellers'>(
    'Customers',
  )
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [selectedRow, setSelectedRow] = useState<
    (typeof storeData)[number] | null
  >(null)

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase()

    return storeData.filter((item) => {
      if (tab === 'Stores') return true
      if (tab === 'Resellers') return item.handle.includes('reseller')
      return (
        item.name.toLowerCase().includes(query) ||
        item.email.toLowerCase().includes(query)
      )
    })
  }, [search, tab])

  return (
    <div className="space-y-6">
      <section className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-foreground">
              Users & Stores
            </h1>
            <p className="text-sm text-muted-foreground">
              Overview of customers and storefronts
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button variant={'outline'}>Export CSV</Button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => setTab('Customers')}
              className={`text-sm font-medium pb-2 ${
                tab === 'Customers'
                  ? 'text-foreground border-b-2 border-primary'
                  : 'text-muted-foreground'
              }`}
            >
              Customers
              <span className="ml-2 inline-flex items-center rounded-full bg-muted/10 px-2 py-0.5 text-xs text-muted-foreground">
                12,847
              </span>
            </button>

            <button
              type="button"
              onClick={() => setTab('Stores')}
              className={`text-sm font-medium pb-2 ${
                tab === 'Stores'
                  ? 'text-foreground border-b-2 border-primary'
                  : 'text-muted-foreground'
              }`}
            >
              Stores
              <span className="ml-2 inline-flex items-center rounded-full bg-muted/10 px-2 py-0.5 text-xs text-muted-foreground">
                284
              </span>
            </button>

            <button
              type="button"
              onClick={() => setTab('Resellers')}
              className={`text-sm font-medium pb-2 ${
                tab === 'Resellers'
                  ? 'text-foreground border-b-2 border-primary'
                  : 'text-muted-foreground'
              }`}
            >
              Resellers
              <span className="ml-2 inline-flex items-center rounded-full bg-muted/10 px-2 py-0.5 text-xs text-muted-foreground">
                91
              </span>
            </button>
          </div>

          <div className="ml-auto relative flex items-center gap-3 w-full max-w-lg">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email, ID..."
              className="h-9 pl-9 w-full bg-white"
            />
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-border bg-background/80">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Avatar</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filtered.map((row) => (
                <TableRow key={row.id} className="hover:bg-muted/10">
                  <TableCell>
                    <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                      {row.avatar}
                    </div>
                  </TableCell>

                  <TableCell>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {row.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {row.handle}
                      </p>
                    </div>
                  </TableCell>

                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.joined}</TableCell>
                  <TableCell>{row.orders}</TableCell>

                  <TableCell>
                    <Badge
                      className={`rounded-full px-2 py-1 text-xs font-semibold ${statusBadge[row.status as keyof typeof statusBadge]}`}
                    >
                      {row.status}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-primary"
                      onClick={() => {
                        setSelectedRow(row)
                        setIsSheetOpen(true)
                      }}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {filtered.length === 0 && (
          <div className="rounded-xl border border-border bg-muted/10 p-6 text-center text-sm text-muted-foreground">
            No {tab.toLowerCase()} found.
          </div>
        )}

        <Sheet open={isSheetOpen} onOpenChange={(open) => setIsSheetOpen(open)}>
          <SheetContent side="right" className="w-full max-w-sm">
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {selectedRow?.name ?? 'User details'}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedRow?.handle}
                  </p>
                </div>
              </div>

              {selectedRow && (
                <div className="mt-6 flex flex-col items-center gap-4">
                  <div className="h-20 w-20 flex items-center justify-center rounded-full bg-primary/10 text-primary text-xl font-semibold">
                    {selectedRow.avatar}
                  </div>

                  <div className="text-center">
                    <p className="text-sm font-medium text-foreground">
                      {selectedRow.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {selectedRow.handle}
                    </p>
                  </div>

                  <div className="w-full mt-4 space-y-3 px-2">
                    <Button className="w-full rounded-lg border border-amber-200 bg-amber-50 text-amber-700">
                      Warn User
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full rounded-lg border border-rose-200 text-rose-600"
                    >
                      Suspend Account
                    </Button>

                    <Button className="w-full rounded-lg bg-rose-500 text-white">
                      Ban Account
                    </Button>

                    <Button
                      variant="ghost"
                      className="w-full rounded-lg border border-border text-muted-foreground"
                    >
                      Send Notification
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </section>
    </div>
  )
}
