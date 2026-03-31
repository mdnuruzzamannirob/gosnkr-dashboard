'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useState } from 'react'

type FraudAlert = {
  id: string
  kind: string
  score: number
  risk: 'LOW' | 'MEDIUM' | 'HIGH'
  user: string
  txn: string
  amount: string
  date: string
}

type Report = {
  id: string
  reporter: string
  target: string
  category: string
  date: string
  status: 'Open' | 'Resolved' | 'Under Review'
}

const demoAlerts: FraudAlert[] = [
  {
    id: 'a1',
    kind: 'Payment Fraud',
    score: 91,
    risk: 'HIGH',
    user: '@kicks_hunter',
    txn: 'TXN-88291',
    amount: '$340',
    date: 'Mar 23, 2024',
  },
  {
    id: 'a2',
    kind: 'Chargeback',
    score: 78,
    risk: 'HIGH',
    user: '@sneaker_fan',
    txn: 'TXN-88290',
    amount: '$225',
    date: 'Mar 22, 2024',
  },
  {
    id: 'a3',
    kind: 'Suspicious Activity',
    score: 62,
    risk: 'MEDIUM',
    user: '@shoes_lover',
    txn: 'TXN-88289',
    amount: '$189',
    date: 'Mar 21, 2024',
  },
]

const demoAbuse: Report[] = [
  {
    id: 'r1',
    reporter: 'Sarah Johnson',
    target: '@spam_account',
    category: 'Spam',
    date: 'Mar 23, 2024',
    status: 'Open',
  },
  {
    id: 'r2',
    reporter: 'Mike Chen',
    target: 'Fake Store XYZ',
    category: 'Fake Listing',
    date: 'Mar 22, 2024',
    status: 'Open',
  },
]

const demoCounterfeit: Report[] = [
  {
    id: 'c1',
    reporter: 'Alex Turner',
    target: 'Seller ABC',
    category: 'Counterfeit',
    date: 'Mar 20, 2024',
    status: 'Under Review',
  },
]

const demoReviews: Report[] = [
  {
    id: 'v1',
    reporter: 'Linda G',
    target: 'Product XYZ',
    category: 'Harassment',
    date: 'Mar 18, 2024',
    status: 'Open',
  },
]

export default function RiskPage() {
  const [tab, setTab] = useState<
    'reviews' | 'alerts' | 'abuse' | 'counterfeit' | 'suspensions'
  >('alerts')

  return (
    <div className="space-y-6">
      <section className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">
            Fraud & Moderation
          </h1>
        </div>

        <div className="flex items-center justify-between">
          <nav className="flex items-center gap-4 border-b border-border/60 pb-3">
            <button
              onClick={() => setTab('reviews')}
              className={`pb-3 text-sm ${tab === 'reviews' ? 'border-b-2 border-emerald-500 text-foreground' : 'text-muted-foreground'}`}
            >
              Reviews{' '}
              <span className="ml-2 rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                14
              </span>
            </button>
            <button
              onClick={() => setTab('alerts')}
              className={`pb-3 text-sm ${tab === 'alerts' ? 'border-b-2 border-emerald-500 text-foreground' : 'text-muted-foreground'}`}
            >
              Fraud Alerts{' '}
              <span className="ml-2 rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                {demoAlerts.length}
              </span>
            </button>
            <button
              onClick={() => setTab('abuse')}
              className={`pb-3 text-sm ${tab === 'abuse' ? 'border-b-2 border-emerald-500 text-foreground' : 'text-muted-foreground'}`}
            >
              Abuse Reports{' '}
              <span className="ml-2 rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                {demoAbuse.length}
              </span>
            </button>
            <button
              onClick={() => setTab('counterfeit')}
              className={`pb-3 text-sm ${tab === 'counterfeit' ? 'border-b-2 border-emerald-500 text-foreground' : 'text-muted-foreground'}`}
            >
              Counterfeit{' '}
              <span className="ml-2 rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                {demoCounterfeit.length}
              </span>
            </button>
            <button
              onClick={() => setTab('suspensions')}
              className={`pb-3 text-sm ${tab === 'suspensions' ? 'border-b-2 border-emerald-500 text-foreground' : 'text-muted-foreground'}`}
            >
              Suspensions Log
            </button>
          </nav>

          <div>
            <Button variant="outline" size="sm">
              View Suspensions Log
            </Button>
          </div>
        </div>

        <div>
          {tab === 'alerts' && (
            <div className="space-y-4">
              {demoAlerts.map((a) => (
                <div
                  key={a.id}
                  className={`rounded-lg border p-4 ${a.risk === 'HIGH' ? 'border-destructive/60' : a.risk === 'MEDIUM' ? 'border-amber-300' : 'border-border'}`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-3">
                        <Badge
                          variant={
                            a.risk === 'HIGH'
                              ? 'destructive'
                              : a.risk === 'MEDIUM'
                                ? 'secondary'
                                : 'outline'
                          }
                        >
                          {a.kind}
                        </Badge>
                        <div className="text-sm font-medium">
                          {a.score}/100 {a.risk} RISK
                        </div>
                      </div>

                      <div className="mt-3 text-sm text-muted-foreground">
                        User: {a.user} &nbsp; Transaction: {a.txn} &nbsp;
                        Amount: {a.amount} &nbsp;{' '}
                        <span className="mx-2">·</span> {a.date}
                      </div>
                    </div>

                    <div className="text-sm text-muted-foreground">
                      Investigate →
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === 'abuse' && (
            <Card>
              <CardContent>
                <Table>
                  <TableHeader>
                    <tr>
                      <TableHead>Reporter</TableHead>
                      <TableHead>Reported User/Store</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Report Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </tr>
                  </TableHeader>
                  <TableBody>
                    {demoAbuse.map((r) => (
                      <TableRow key={r.id}>
                        <TableCell>{r.reporter}</TableCell>
                        <TableCell>{r.target}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{r.category}</Badge>
                        </TableCell>
                        <TableCell>{r.date}</TableCell>
                        <TableCell>
                          <Badge variant="default">{r.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <a className="text-sm text-muted-foreground">
                            Review
                          </a>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}

          {tab === 'counterfeit' && (
            <Card>
              <CardContent>
                <Table>
                  <TableHeader>
                    <tr>
                      <TableHead>Reporter</TableHead>
                      <TableHead>Reported Seller</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Report Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </tr>
                  </TableHeader>
                  <TableBody>
                    {demoCounterfeit.map((r) => (
                      <TableRow key={r.id}>
                        <TableCell>{r.reporter}</TableCell>
                        <TableCell>{r.target}</TableCell>
                        <TableCell>
                          <Badge variant="destructive">{r.category}</Badge>
                        </TableCell>
                        <TableCell>{r.date}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{r.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <a className="text-sm text-muted-foreground">
                            Review
                          </a>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}

          {tab === 'reviews' && (
            <Card>
              <CardContent>
                <Table>
                  <TableHeader>
                    <tr>
                      <TableHead>Reviewer</TableHead>
                      <TableHead>Target</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </tr>
                  </TableHeader>
                  <TableBody>
                    {demoReviews.map((r) => (
                      <TableRow key={r.id}>
                        <TableCell>{r.reporter}</TableCell>
                        <TableCell>{r.target}</TableCell>
                        <TableCell>
                          <Badge variant="ghost">{r.category}</Badge>
                        </TableCell>
                        <TableCell>{r.date}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{r.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <a className="text-sm text-muted-foreground">
                            Review
                          </a>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}

          {tab === 'suspensions' && (
            <Card>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Suspensions Log placeholder — integrate with audit log.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </div>
  )
}
