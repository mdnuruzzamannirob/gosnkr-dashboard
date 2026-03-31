'use client'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { useState } from 'react'

type Dispute = {
  id: string
  code: string
  issue: string
  customer: string
  store: string
  amount: string
  status: 'Open' | 'Under Review' | 'Resolved' | 'Escalated'
  time: string
}

const mockDisputes: Dispute[] = [
  {
    id: '1',
    code: '#GS-D-2241',
    issue: 'Product Quality',
    customer: 'Sarah K.',
    store: 'Nike Downtown LA',
    amount: '$185',
    status: 'Open',
    time: '3h ago',
  },
  {
    id: '2',
    code: '#GS-D-2240',
    issue: 'Wrong Item',
    customer: 'Mike C.',
    store: 'Sneaker Palace',
    amount: '$240',
    status: 'Open',
    time: '8h ago',
  },
  {
    id: '3',
    code: '#GS-D-2239',
    issue: 'Not Received',
    customer: 'Emily D.',
    store: 'Kicks Heaven',
    amount: '$195',
    status: 'Under Review',
    time: '1d ago',
  },
]

export default function DisputesPage() {
  const [tab, setTab] = useState<'open' | 'b2b' | 'resolved' | 'escalated'>(
    'open',
  )
  const [disputes] = useState<Dispute[]>(mockDisputes)
  const [selectedId, setSelectedId] = useState(disputes[0].id)

  const selected = disputes.find((d) => d.id === selectedId) ?? disputes[0]

  return (
    <div className="space-y-6">
      <section className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">
            Dispute Resolution
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            6 Open · 3 B2B · 2 Escalated
          </p>
        </div>

        <div className="mt-4">
          <nav className="flex items-center gap-4 border-b border-border/60 pb-3">
            <button
              onClick={() => setTab('open')}
              className={`pb-3 text-sm ${tab === 'open' ? 'border-b-2 border-emerald-500 text-foreground' : 'text-muted-foreground'}`}
            >
              Open Disputes
            </button>

            <button
              onClick={() => setTab('b2b')}
              className={`pb-3 text-sm ${tab === 'b2b' ? 'border-b-2 border-emerald-500 text-foreground' : 'text-muted-foreground'}`}
            >
              B2B Disputes
            </button>

            <button
              onClick={() => setTab('resolved')}
              className={`pb-3 text-sm ${tab === 'resolved' ? 'border-b-2 border-emerald-500 text-foreground' : 'text-muted-foreground'}`}
            >
              Resolved
            </button>

            <button
              onClick={() => setTab('escalated')}
              className={`pb-3 text-sm ${tab === 'escalated' ? 'border-b-2 border-emerald-500 text-foreground' : 'text-muted-foreground'}`}
            >
              Escalated
            </button>
          </nav>
        </div>

        <div className="mt-4 grid gap-6 lg:grid-cols-[360px_minmax(0,1fr)]">
          <aside>
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">Open Disputes</h3>
                  <span className="text-xs text-muted-foreground">6 open</span>
                </div>
              </CardHeader>

              <CardContent className="p-0">
                <ul className="divide-y [&>li]:px-4 [&>li]:py-4">
                  {disputes.map((d) => {
                    const active = d.id === selectedId
                    return (
                      <li
                        key={d.id}
                        onClick={() => setSelectedId(d.id)}
                        className={`cursor-pointer ${active ? 'bg-emerald-50 border-l-4 border-emerald-300' : ''}`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3">
                            <Avatar size="sm">
                              <AvatarFallback>
                                {d.customer.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="text-sm font-medium">
                                {d.customer} vs {d.store}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {d.issue} · {d.time}
                              </div>
                              <div className="mt-2 text-sm">
                                {d.amount} in dispute
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge
                              variant={
                                d.status === 'Open'
                                  ? 'default'
                                  : d.status === 'Under Review'
                                    ? 'outline'
                                    : 'ghost'
                              }
                            >
                              {d.status}
                            </Badge>
                          </div>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              </CardContent>
            </Card>
          </aside>

          <div>
            <Card>
              <CardHeader className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold">{selected.code}</h2>
                  <div className="mt-2 flex items-center gap-2">
                    <Badge variant="outline">{selected.issue}</Badge>
                    <Badge variant="default">{selected.status}</Badge>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-amber-300 text-amber-700"
                  >
                    Mark as Urgent
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-violet-300 text-violet-700"
                  >
                    Escalate
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium mb-3">Evidence Review</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-md border p-4 bg-muted/30">
                      <div className="flex items-center gap-3">
                        <Avatar size="sm">
                          <AvatarFallback>SK</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">Sarah K.</div>
                          <div className="text-xs text-muted-foreground">
                            Filed this dispute
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 rounded-md bg-muted p-3 text-sm">
                        The product I received does not match the description.
                        The sneakers have visible wear and damage that was not
                        disclosed.
                      </div>
                    </div>

                    <div className="rounded-md border p-4 bg-muted/30">
                      <div className="flex items-center gap-3">
                        <Avatar size="sm">
                          <AvatarFallback>N</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">Nike Downtown LA</div>
                          <div className="text-xs text-muted-foreground">
                            Store response
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 rounded-md bg-muted p-3 text-sm">
                        All items are thoroughly inspected before shipping. The
                        product was in excellent condition as stated. We have
                        photos from before shipment.
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-3">Order Details</h3>
                  <div className="rounded-md border p-4 grid gap-4 md:grid-cols-2">
                    <div>
                      <p className="text-xs text-muted-foreground">Order ID</p>
                      <p className="mt-1 font-medium">ORD-2024-8821</p>

                      <p className="text-xs text-muted-foreground mt-4">
                        Amount
                      </p>
                      <p className="mt-1 font-medium">{selected.amount}</p>
                    </div>

                    <div>
                      <p className="text-xs text-muted-foreground">Product</p>
                      <p className="mt-1 font-medium">Nike Air Jordan 1 High</p>

                      <p className="text-xs text-muted-foreground mt-4">
                        Order Date
                      </p>
                      <p className="mt-1 font-medium">Mar 18, 2024</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-3">
                    Select Resolution
                  </h3>
                  <div className="flex flex-wrap items-center gap-3">
                    <Button size="sm" className="bg-emerald-600">
                      Full Refund to Customer
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-amber-300 text-amber-700"
                    >
                      Partial Refund
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-sky-300 text-sky-700"
                    >
                      Favor Store — No Refund
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-violet-300 text-violet-700"
                    >
                      Escalate to Senior
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
