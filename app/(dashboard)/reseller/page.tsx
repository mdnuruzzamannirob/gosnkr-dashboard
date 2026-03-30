'use client'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useState } from 'react'

type Reseller = {
  id: string
  name: string
  handle: string
  applied: string
  listings: number
  trust: number
}

const mockResellers: Reseller[] = [
  {
    id: 'alex-turner',
    name: 'Alex Turner',
    handle: '@sole_plug',
    applied: 'Mar 20, 2024',
    listings: 24,
    trust: 84,
  },
  {
    id: 'rachel-green',
    name: 'Rachel Green',
    handle: '@kicks_queen',
    applied: 'Mar 21, 2024',
    listings: 18,
    trust: 72,
  },
  {
    id: 'tom-harris',
    name: 'Tom Harris',
    handle: '@sneaker_pro',
    applied: 'Mar 22, 2024',
    listings: 12,
    trust: 68,
  },
]

export default function ResellerPage() {
  const [resellers] = useState<Reseller[]>(mockResellers)
  const [activeTab, setActiveTab] = useState<
    'queue' | 'all' | 'trusted' | 'flagged'
  >('queue')

  return (
    <div className="space-y-6">
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">
            Reseller Hub
          </h1>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="p-4">
            <p className="text-xs uppercase text-muted-foreground">
              Total resellers
            </p>
            <p className="mt-2 text-3xl font-semibold">91</p>
          </Card>

          <Card className="p-4">
            <p className="text-xs uppercase text-muted-foreground">
              Pending approval
            </p>
            <p className="mt-2 text-3xl font-semibold text-amber-600">9</p>
          </Card>

          <Card className="p-4">
            <p className="text-xs uppercase text-muted-foreground">Trusted</p>
            <p className="mt-2 text-3xl font-semibold text-emerald-600">34</p>
          </Card>

          <Card className="p-4">
            <p className="text-xs uppercase text-muted-foreground">Flagged</p>
            <p className="mt-2 text-3xl font-semibold text-destructive">3</p>
          </Card>
        </div>

        <div>
          <nav className="mt-4 flex items-center gap-4 border-b border-border/60 pb-3">
            <button
              onClick={() => setActiveTab('queue')}
              className={`pb-3 text-sm ${
                activeTab === 'queue'
                  ? 'border-b-2 border-emerald-500 text-foreground'
                  : 'text-muted-foreground'
              }`}
            >
              Approval Queue{' '}
              <span className="ml-2 rounded-full bg-emerald-50 px-2 py-0.5 text-xs text-emerald-600">
                9
              </span>
            </button>

            <button
              onClick={() => setActiveTab('all')}
              className={`pb-3 text-sm ${
                activeTab === 'all'
                  ? 'border-b-2 border-emerald-500 text-foreground'
                  : 'text-muted-foreground'
              }`}
            >
              All Resellers{' '}
              <span className="ml-2 text-sm text-muted-foreground">91</span>
            </button>

            <button
              onClick={() => setActiveTab('trusted')}
              className={`pb-3 text-sm ${
                activeTab === 'trusted'
                  ? 'border-b-2 border-emerald-500 text-foreground'
                  : 'text-muted-foreground'
              }`}
            >
              Trusted Resellers{' '}
              <span className="ml-2 text-sm text-muted-foreground">34</span>
            </button>

            <button
              onClick={() => setActiveTab('flagged')}
              className={`pb-3 text-sm ${
                activeTab === 'flagged'
                  ? 'border-b-2 border-emerald-500 text-foreground'
                  : 'text-muted-foreground'
              }`}
            >
              Flagged{' '}
              <span className="ml-2 text-sm text-muted-foreground">3</span>
            </button>
          </nav>
        </div>

        <div className="mt-6">
          <Card className="overflow-x-auto p-0">
            <Table className="min-w-180">
              <TableHeader>
                <tr>
                  <TableHead>Avatar</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Applied Date</TableHead>
                  <TableHead>Listings</TableHead>
                  <TableHead>Trust Score</TableHead>
                  <TableHead>Actions</TableHead>
                </tr>
              </TableHeader>

              <TableBody>
                {resellers.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell>
                      <Avatar size="sm">
                        <AvatarFallback>
                          {r.name
                            .split(' ')
                            .map((p) => p[0])
                            .slice(0, 2)
                            .join('')}
                        </AvatarFallback>
                      </Avatar>
                    </TableCell>

                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium">{r.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {r.handle}
                        </span>
                      </div>
                    </TableCell>

                    <TableCell>{r.applied}</TableCell>

                    <TableCell>{r.listings}</TableCell>

                    <TableCell>
                      <span
                        className={`font-medium ${
                          r.trust >= 80
                            ? 'text-emerald-600'
                            : r.trust >= 70
                              ? 'text-amber-600'
                              : 'text-destructive'
                        }`}
                      >
                        {r.trust}/100
                      </span>
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-2">
                        <a className="text-sm text-muted-foreground">View</a>
                        <Button size="sm">Approve</Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border border-destructive text-destructive"
                        >
                          Reject
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>
      </section>
    </div>
  )
}
