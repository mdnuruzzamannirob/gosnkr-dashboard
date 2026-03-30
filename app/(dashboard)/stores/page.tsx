'use client'

import { Search } from 'lucide-react'
import { useMemo, useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
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
            <Button variant="secondary" className="text-foreground">
              Export CSV
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 rounded-xl border border-border bg-background/70 p-2">
          {['Customers', 'Stores', 'Resellers'].map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setTab(item as typeof tab)}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                tab === item
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted/20'
              }`}
            >
              {item}
            </button>
          ))}
          <div className="ml-auto flex items-center gap-2">
            <Search className="size-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email, ID..."
              className="h-9 w-full min-w-45 bg-white"
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
                    <Button variant="ghost" size="sm" className="text-primary">
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
      </section>
    </div>
  )
}
