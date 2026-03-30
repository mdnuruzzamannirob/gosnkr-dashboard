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

type Drop = {
  id: string
  store: string
  title: string
  type: 'Raffle' | 'FCFS' | 'VIP'
  dateTime: string
  inventory: number
  status: 'Pending' | 'Under Review' | 'Live' | 'Completed'
}

const mockDrops: Drop[] = [
  {
    id: 'drop-1',
    store: 'Nike Downtown LA',
    title: 'Air Jordan 1 Retro High',
    type: 'Raffle',
    dateTime: 'Mar 30, 2024 10:00 AM',
    inventory: 50,
    status: 'Pending',
  },
  {
    id: 'drop-2',
    store: 'Sneaker Palace NYC',
    title: 'Yeezy Boost 350 V2',
    type: 'FCFS',
    dateTime: 'Mar 28, 2024 12:00 PM',
    inventory: 80,
    status: 'Pending',
  },
  {
    id: 'drop-3',
    store: 'Kicks Heaven',
    title: 'Nike Dunk Low',
    type: 'VIP',
    dateTime: 'Apr 2, 2024 9:00 AM',
    inventory: 30,
    status: 'Under Review',
  },
]

export default function DropsPage() {
  const [drops] = useState<Drop[]>(mockDrops)
  const [activeTab, setActiveTab] = useState<
    'queue' | 'upcoming' | 'live' | 'past' | 'calendar'
  >('queue')

  return (
    <div className="space-y-6">
      <section className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">
            Drop & Release Management
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Approve, monitor, and control all platform drops
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="p-4">
            <p className="text-xs uppercase text-muted-foreground">
              Pending Approval
            </p>
            <p className="mt-2 text-3xl font-semibold text-amber-600">4</p>
          </Card>

          <Card className="p-4">
            <p className="text-xs uppercase text-muted-foreground">
              Upcoming Approved
            </p>
            <p className="mt-2 text-3xl font-semibold text-sky-600">12</p>
          </Card>

          <Card className="p-4">
            <p className="text-xs uppercase text-muted-foreground">
              Live Right Now
            </p>
            <p className="mt-2 text-3xl font-semibold text-emerald-600">
              2{' '}
              <span className="ml-2 inline-block h-2 w-2 rounded-full bg-emerald-600" />
            </p>
          </Card>

          <Card className="p-4">
            <p className="text-xs uppercase text-muted-foreground">Completed</p>
            <p className="mt-2 text-3xl font-semibold">89</p>
          </Card>
        </div>

        <div>
          <nav className="mt-4 flex items-center gap-4 border-b border-border/60 pb-3">
            <button
              onClick={() => setActiveTab('queue')}
              className={`pb-3 text-sm ${activeTab === 'queue' ? 'border-b-2 border-emerald-500 text-foreground' : 'text-muted-foreground'}`}
            >
              Approval Queue{' '}
              <span className="ml-2 rounded-full bg-emerald-50 px-2 py-0.5 text-xs text-emerald-600">
                4
              </span>
            </button>

            <button
              onClick={() => setActiveTab('upcoming')}
              className={`pb-3 text-sm ${activeTab === 'upcoming' ? 'border-b-2 border-emerald-500 text-foreground' : 'text-muted-foreground'}`}
            >
              Upcoming{' '}
              <span className="ml-2 text-sm text-muted-foreground">12</span>
            </button>

            <button
              onClick={() => setActiveTab('live')}
              className={`pb-3 text-sm ${activeTab === 'live' ? 'border-b-2 border-emerald-500 text-foreground' : 'text-muted-foreground'}`}
            >
              Live Now{' '}
              <span className="ml-2 text-sm text-muted-foreground">2</span>
            </button>

            <button
              onClick={() => setActiveTab('past')}
              className={`pb-3 text-sm ${activeTab === 'past' ? 'border-b-2 border-emerald-500 text-foreground' : 'text-muted-foreground'}`}
            >
              Past Drops
            </button>

            <button
              onClick={() => setActiveTab('calendar')}
              className={`pb-3 text-sm ${activeTab === 'calendar' ? 'border-b-2 border-emerald-500 text-foreground' : 'text-muted-foreground'}`}
            >
              Release Calendar
            </button>
          </nav>
        </div>

        <div className="mt-6">
          <Card className="overflow-x-auto p-0">
            <Table className="min-w-180">
              <TableHeader>
                <tr>
                  <TableHead>Store</TableHead>
                  <TableHead>Drop Title</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Date &amp; Time</TableHead>
                  <TableHead>Inventory</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </tr>
              </TableHeader>

              <TableBody>
                {drops.map((d) => (
                  <TableRow key={d.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar size="sm">
                          <AvatarFallback>{d.store.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="font-medium">{d.store}</span>
                          <span className="text-xs text-muted-foreground">
                            {d.store.split(',')[1]?.trim() ?? ''}
                          </span>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="font-medium">{d.title}</div>
                    </TableCell>

                    <TableCell>
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                          d.type === 'Raffle'
                            ? 'bg-violet-50 text-violet-700'
                            : d.type === 'FCFS'
                              ? 'bg-sky-50 text-sky-700'
                              : 'bg-amber-50 text-amber-700'
                        }`}
                      >
                        {d.type}
                      </span>
                    </TableCell>

                    <TableCell>{d.dateTime}</TableCell>

                    <TableCell>
                      <span className="font-mono font-semibold">
                        {d.inventory} units
                      </span>
                    </TableCell>

                    <TableCell>
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${d.status === 'Pending' ? 'bg-amber-100 text-amber-700' : d.status === 'Under Review' ? 'bg-sky-100 text-sky-700' : 'bg-emerald-100 text-emerald-700'}`}
                      >
                        {d.status}
                      </span>
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-3">
                        <a className="text-sm text-muted-foreground">Review</a>
                        <Button size="sm">Approve</Button>
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
