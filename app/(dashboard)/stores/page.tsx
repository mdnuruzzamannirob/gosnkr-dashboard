'use client'

import { Download, Search, X } from 'lucide-react'
import { useMemo, useState } from 'react'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Sheet, SheetContent, SheetHeader } from '@/components/ui/sheet'
import { StatusBadge } from '@/components/ui/status-badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

// Customers data
const customerData = [
  {
    id: 1,
    avatar: 'SJ',
    name: 'Sarah Johnson',
    handle: '@sarah_kicks',
    email: 'sarah.j@email.com',
    joined: 'Jan 15, 2024',
    orders: 12,
    status: 'active' as const,
  },
  {
    id: 2,
    avatar: 'MC',
    name: 'Mike Chen',
    handle: '@mike_sneakers',
    email: 'mike.c@email.com',
    joined: 'Feb 20, 2024',
    orders: 8,
    status: 'active' as const,
  },
  {
    id: 3,
    avatar: 'ED',
    name: 'Emily Davis',
    handle: '@em_style',
    email: 'emily.d@email.com',
    joined: 'Mar 5, 2024',
    orders: 5,
    status: 'warned' as const,
  },
  {
    id: 4,
    avatar: 'JW',
    name: 'James Wilson',
    handle: '@jw_kicks',
    email: 'james.w@email.com',
    joined: 'Dec 10, 2023',
    orders: 24,
    status: 'active' as const,
  },
  {
    id: 5,
    avatar: 'LM',
    name: 'Lisa Martinez',
    handle: '@lisa_m',
    email: 'lisa.m@email.com',
    joined: 'Jan 28, 2024',
    orders: 15,
    status: 'active' as const,
  },
]

// Stores data
const storesData = [
  {
    id: 1,
    logo: 'N',
    name: 'Nike Downtown LA',
    location: 'Los Angeles, CA',
    owner: 'John Smith',
    products: 234,
    revenue: '$24,500',
    verified: true,
    status: 'active' as const,
  },
  {
    id: 2,
    logo: 'S',
    name: 'Sneaker Palace NYC',
    location: 'New York, NY',
    owner: 'Maria Garcia',
    products: 198,
    revenue: '$22,100',
    verified: true,
    status: 'active' as const,
  },
  {
    id: 3,
    logo: 'K',
    name: 'Kicks Heaven',
    location: 'Miami, FL',
    owner: 'David Lee',
    products: 156,
    revenue: '$19,800',
    verified: false,
    status: 'active' as const,
  },
]

// Resellers data
const resellersData = [
  {
    id: 1,
    avatar: 'AT',
    name: 'Alex Turner',
    handle: '@sole_plug',
    trustScore: 87,
    listings: 24,
    deals: 42,
    badge: 'Trusted' as const,
    status: 'active' as const,
  },
  {
    id: 2,
    avatar: 'RG',
    name: 'Rachel Green',
    handle: '@kicks_queen',
    trustScore: 72,
    listings: 18,
    deals: 31,
    badge: 'Standard' as const,
    status: 'active' as const,
  },
  {
    id: 3,
    avatar: 'TH',
    name: 'Tom Harris',
    handle: '@sneaker_pro',
    trustScore: 45,
    listings: 12,
    deals: 8,
    badge: 'Standard' as const,
    status: 'warned' as const,
  },
]

const tabCounts = {
  Customers: 12847,
  Stores: 284,
  Resellers: 91,
}

function getTrustScoreColor(score: number) {
  if (score >= 80) return 'text-emerald-600'
  if (score >= 60) return 'text-amber-500'
  return 'text-red-500'
}

export default function StoresPage() {
  const [search, setSearch] = useState('')
  const [tab, setTab] = useState<'Customers' | 'Stores' | 'Resellers'>(
    'Customers',
  )
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [selectedRow, setSelectedRow] = useState(null)

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase()

    if (tab === 'Customers') {
      return customerData.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.email.toLowerCase().includes(query),
      )
    } else if (tab === 'Stores') {
      return storesData.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.owner.toLowerCase().includes(query),
      )
    } else {
      return resellersData.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.handle.toLowerCase().includes(query),
      )
    }
  }, [search, tab])

  return (
    <div className="space-y-6">
      <section className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-foreground">
              Users & Stores
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="size-4" />
              Export CSV
            </Button>
          </div>
        </div>

        <Tabs
          defaultValue="Customers"
          onValueChange={(value) =>
            setTab(value as 'Customers' | 'Stores' | 'Resellers')
          }
          className="space-y-4"
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <TabsList>
              <TabsTrigger value="Customers" count={tabCounts.Customers}>
                Customers
              </TabsTrigger>
              <TabsTrigger value="Stores" count={tabCounts.Stores}>
                Stores
              </TabsTrigger>
              <TabsTrigger value="Resellers" count={tabCounts.Resellers}>
                Resellers
              </TabsTrigger>
            </TabsList>

            <div className="relative flex w-full max-w-sm items-center gap-2 md:ml-auto">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, email, ID..."
                className="h-9 pl-9 w-full"
              />
            </div>
          </div>

          {/* Customers Tab */}
          <TabsContent value="Customers" className="space-y-4">
            <div className="rounded-lg border border-border bg-background/80 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12"></TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead className="text-right">Orders</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {(filtered as typeof customerData).map((row) => (
                    <TableRow key={row.id} className="hover:bg-muted/10">
                      <TableCell>
                        <Avatar className="size-8">
                          <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                            {row.avatar}
                          </AvatarFallback>
                        </Avatar>
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

                      <TableCell className="text-sm text-foreground">
                        {row.email}
                      </TableCell>
                      <TableCell className="text-sm text-foreground">
                        {row.joined}
                      </TableCell>
                      <TableCell className="text-right">
                        <span className="text-sm font-medium text-foreground">
                          {row.orders}
                        </span>
                      </TableCell>

                      <TableCell>
                        <StatusBadge status={row.status} />
                      </TableCell>

                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-primary hover:bg-primary/10"
                          onClick={() => {
                            setSelectedRow({ ...row, type: 'customer' })
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
              <div className="rounded-lg border border-border bg-muted/10 p-8 text-center">
                <p className="text-sm text-muted-foreground">
                  No customers found matching your search.
                </p>
              </div>
            )}
          </TabsContent>

          {/* Stores Tab */}
          <TabsContent value="Stores" className="space-y-4">
            <div className="rounded-lg border border-border bg-background/80 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">Logo</TableHead>
                    <TableHead>Store Name</TableHead>
                    <TableHead>Owner</TableHead>
                    <TableHead className="text-center">Products</TableHead>
                    <TableHead className="text-right">Revenue</TableHead>
                    <TableHead className="text-center">Verified</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {(filtered as typeof storesData).map((row) => (
                    <TableRow key={row.id} className="hover:bg-muted/10">
                      <TableCell>
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 font-semibold text-sm">
                          {row.logo}
                        </div>
                      </TableCell>

                      <TableCell>
                        <div>
                          <p className="text-sm font-medium text-foreground">
                            {row.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {row.location}
                          </p>
                        </div>
                      </TableCell>

                      <TableCell className="text-sm text-foreground">
                        {row.owner}
                      </TableCell>

                      <TableCell className="text-center text-sm text-foreground">
                        {row.products}
                      </TableCell>

                      <TableCell className="text-right font-medium text-foreground">
                        {row.revenue}
                      </TableCell>

                      <TableCell className="text-center">
                        {row.verified ? (
                          <span className="text-emerald-600 text-sm font-medium">
                            ✓ Verified
                          </span>
                        ) : (
                          <span className="text-muted-foreground text-sm">
                            Not Verified
                          </span>
                        )}
                      </TableCell>

                      <TableCell>
                        <StatusBadge status={row.status} />
                      </TableCell>

                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-primary hover:bg-primary/10"
                          onClick={() => {
                            setSelectedRow({ ...row, type: 'store' })
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
              <div className="rounded-lg border border-border bg-muted/10 p-8 text-center">
                <p className="text-sm text-muted-foreground">
                  No stores found matching your search.
                </p>
              </div>
            )}
          </TabsContent>

          {/* Resellers Tab */}
          <TabsContent value="Resellers" className="space-y-4">
            <div className="rounded-lg border border-border bg-background/80 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12"></TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead className="text-center">Trust Score</TableHead>
                    <TableHead className="text-center">Listings</TableHead>
                    <TableHead className="text-center">Deals</TableHead>
                    <TableHead>Badge</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {(filtered as typeof resellersData).map((row) => (
                    <TableRow key={row.id} className="hover:bg-muted/10">
                      <TableCell>
                        <Avatar className="size-8">
                          <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                            {row.avatar}
                          </AvatarFallback>
                        </Avatar>
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

                      <TableCell className="text-center">
                        <span
                          className={`text-sm font-bold ${getTrustScoreColor(row.trustScore)}`}
                        >
                          {row.trustScore}/100
                        </span>
                      </TableCell>

                      <TableCell className="text-center text-sm text-foreground">
                        {row.listings}
                      </TableCell>

                      <TableCell className="text-center text-sm text-foreground">
                        {row.deals}
                      </TableCell>

                      <TableCell>
                        <Badge
                          className={`rounded-full px-2.5 py-1 text-xs font-semibold border-0 ${
                            row.badge === 'Trusted'
                              ? 'bg-emerald-50 text-emerald-700'
                              : 'bg-gray-50 text-gray-700'
                          }`}
                        >
                          {row.badge}
                        </Badge>
                      </TableCell>

                      <TableCell>
                        <StatusBadge status={row.status} />
                      </TableCell>

                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-primary hover:bg-primary/10"
                          onClick={() => {
                            setSelectedRow({ ...row, type: 'reseller' })
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
              <div className="rounded-lg border border-border bg-muted/10 p-8 text-center">
                <p className="text-sm text-muted-foreground">
                  No resellers found matching your search.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Detail Sheet */}
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetContent side="right" className="w-full max-w-sm p-0">
            <SheetHeader className="border-b border-border px-6 py-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-foreground">
                    {selectedRow?.name ?? 'Details'}
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    {selectedRow?.handle || selectedRow?.email}
                  </p>
                </div>
                <button
                  onClick={() => setIsSheetOpen(false)}
                  className="rounded-md hover:bg-muted p-1 transition-colors"
                >
                  <X className="size-4 text-muted-foreground" />
                </button>
              </div>
            </SheetHeader>

            {selectedRow && (
              <div className="flex flex-col items-center gap-4 p-6">
                {selectedRow.type === 'store' ? (
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 text-2xl font-semibold">
                    {selectedRow.logo}
                  </div>
                ) : (
                  <Avatar className="size-20">
                    <AvatarFallback className="bg-primary/10 text-primary text-2xl font-semibold">
                      {selectedRow.avatar}
                    </AvatarFallback>
                  </Avatar>
                )}

                <div className="text-center">
                  <p className="text-base font-semibold text-foreground">
                    {selectedRow.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {selectedRow.handle ||
                      selectedRow.location ||
                      selectedRow.owner}
                  </p>
                </div>

                <div className="w-full space-y-3 pt-4 border-t border-border">
                  {selectedRow.type === 'customer' && (
                    <>
                      <Button className="w-full rounded-lg bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100">
                        Warn User
                      </Button>

                      <Button
                        variant="outline"
                        className="w-full rounded-lg border border-orange-200 text-orange-600 hover:bg-orange-50"
                      >
                        Suspend Account
                      </Button>

                      <Button className="w-full rounded-lg bg-red-500 text-white hover:bg-red-600">
                        Ban Account
                      </Button>

                      <Button
                        variant="outline"
                        className="w-full rounded-lg border border-border text-muted-foreground hover:bg-muted"
                      >
                        Send Notification
                      </Button>
                    </>
                  )}

                  {selectedRow.type === 'store' && (
                    <>
                      <Button className="w-full rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100">
                        Approve Store
                      </Button>

                      <Button
                        variant="outline"
                        className="w-full rounded-lg border border-orange-200 text-orange-600 hover:bg-orange-50"
                      >
                        Review Documents
                      </Button>

                      <Button
                        variant="outline"
                        className="w-full rounded-lg border border-border text-muted-foreground hover:bg-muted"
                      >
                        View Analytics
                      </Button>

                      <Button className="w-full rounded-lg bg-red-500 text-white hover:bg-red-600">
                        Suspend Store
                      </Button>
                    </>
                  )}

                  {selectedRow.type === 'reseller' && (
                    <>
                      <Button className="w-full rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100">
                        Verify Reseller
                      </Button>

                      <Button
                        variant="outline"
                        className="w-full rounded-lg border border-border text-muted-foreground hover:bg-muted"
                      >
                        View Inventory
                      </Button>

                      <Button
                        variant="outline"
                        className="w-full rounded-lg border border-orange-200 text-orange-600 hover:bg-orange-50"
                      >
                        Adjust Trust Score
                      </Button>

                      <Button className="w-full rounded-lg bg-red-500 text-white hover:bg-red-600">
                        Deactivate
                      </Button>
                    </>
                  )}
                </div>
              </div>
            )}
          </SheetContent>
        </Sheet>
      </section>
    </div>
  )
}
