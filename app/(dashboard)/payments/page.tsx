'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useState } from 'react'

type Transaction = {
  id: string
  date: string
  type: 'Buy' | 'Payout' | 'Hold Deposit' | 'Refund'
  user: string
  amount: string
  platformFee: string
  status: 'Settled' | 'Processing' | 'Held' | 'Completed'
}

const mockTransactions: Transaction[] = [
  {
    id: 'TXN-88291',
    date: 'Mar 23, 2024',
    type: 'Buy',
    user: 'Sarah Johnson',
    amount: '$195.50',
    platformFee: '$8.50',
    status: 'Settled',
  },
  {
    id: 'TXN-88290',
    date: 'Mar 23, 2024',
    type: 'Payout',
    user: 'Nike Downtown LA',
    amount: '$1,240.00',
    platformFee: '$62.00',
    status: 'Processing',
  },
  {
    id: 'TXN-88289',
    date: 'Mar 22, 2024',
    type: 'Hold Deposit',
    user: 'Mike Chen',
    amount: '$17.00',
    platformFee: '$0.85',
    status: 'Held',
  },
  {
    id: 'TXN-88288',
    date: 'Mar 22, 2024',
    type: 'Refund',
    user: 'Emily Davis',
    amount: '$225.00',
    platformFee: '$0.00',
    status: 'Completed',
  },
]

export default function PaymentsPage() {
  const [activeTab, setActiveTab] = useState<
    'all' | 'pending' | 'refunds' | 'subscriptions' | 'fees'
  >('all')

  return (
    <div className="space-y-6">
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">
            Payments & Payouts
          </h1>

          <div className="flex items-center gap-3">
            <Input placeholder="" className="w-64" />
            <Button variant="outline" size="sm">
              Export Report
            </Button>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <Card className="p-4">
            <p className="text-xs uppercase text-muted-foreground">
              Total Revenue
            </p>
            <p className="mt-2 text-3xl font-semibold text-emerald-600">
              $184,920
            </p>
          </Card>

          <Card className="p-4">
            <p className="text-xs uppercase text-muted-foreground">
              Platform Fees
            </p>
            <p className="mt-2 text-3xl font-semibold">$18,492</p>
            <p className="mt-1 text-xs text-muted-foreground">10% of GMV</p>
          </Card>

          <Card className="p-4">
            <p className="text-xs uppercase text-muted-foreground">
              Pending Payouts
            </p>
            <p className="mt-2 text-3xl font-semibold text-amber-600">
              $24,300
            </p>
          </Card>

          <Card className="p-4">
            <p className="text-xs uppercase text-muted-foreground">
              Refunds Issued
            </p>
            <p className="mt-2 text-3xl font-semibold text-destructive">
              $3,840
            </p>
          </Card>

          <Card className="p-4">
            <p className="text-xs uppercase text-muted-foreground">
              Subscription MRR
            </p>
            <p className="mt-2 text-3xl font-semibold text-violet-600">
              $6,200
            </p>
          </Card>
        </div>

        <div>
          <nav className="mt-4 flex items-center gap-4 border-b border-border/60 pb-3">
            <button
              onClick={() => setActiveTab('all')}
              className={`pb-3 text-sm ${
                activeTab === 'all'
                  ? 'border-b-2 border-emerald-500 text-foreground'
                  : 'text-muted-foreground'
              }`}
            >
              All Transactions
            </button>

            <button
              onClick={() => setActiveTab('pending')}
              className={`pb-3 text-sm ${
                activeTab === 'pending'
                  ? 'border-b-2 border-emerald-500 text-foreground'
                  : 'text-muted-foreground'
              }`}
            >
              Pending Payouts
            </button>

            <button
              onClick={() => setActiveTab('refunds')}
              className={`pb-3 text-sm ${
                activeTab === 'refunds'
                  ? 'border-b-2 border-emerald-500 text-foreground'
                  : 'text-muted-foreground'
              }`}
            >
              Refunds
            </button>

            <button
              onClick={() => setActiveTab('subscriptions')}
              className={`pb-3 text-sm ${
                activeTab === 'subscriptions'
                  ? 'border-b-2 border-emerald-500 text-foreground'
                  : 'text-muted-foreground'
              }`}
            >
              Subscriptions
            </button>

            <button
              onClick={() => setActiveTab('fees')}
              className={`pb-3 text-sm ${
                activeTab === 'fees'
                  ? 'border-b-2 border-emerald-500 text-foreground'
                  : 'text-muted-foreground'
              }`}
            >
              Platform Fees
            </button>
          </nav>
        </div>

        <div className="mt-6">
          <Card className="overflow-x-auto p-0">
            <Table className="w-full">
              <TableHeader>
                <tr>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>User/Store</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Platform Fee</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </tr>
              </TableHeader>

              <TableBody>
                {mockTransactions.map((t) => (
                  <TableRow key={t.id}>
                    <TableCell>{t.id}</TableCell>
                    <TableCell>{t.date}</TableCell>

                    <TableCell>
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                          t.type === 'Buy'
                            ? 'bg-emerald-50 text-emerald-700'
                            : t.type === 'Payout'
                              ? 'bg-sky-50 text-sky-700'
                              : t.type === 'Hold Deposit'
                                ? 'bg-amber-50 text-amber-700'
                                : 'bg-destructive-50 text-destructive'
                        }`}
                      >
                        {t.type}
                      </span>
                    </TableCell>

                    <TableCell>{t.user}</TableCell>

                    <TableCell className="font-medium">{t.amount}</TableCell>

                    <TableCell>{t.platformFee}</TableCell>

                    <TableCell>
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                          t.status === 'Settled'
                            ? 'bg-emerald-100 text-emerald-700'
                            : t.status === 'Processing'
                              ? 'bg-amber-100 text-amber-700'
                              : t.status === 'Held'
                                ? 'bg-amber-100 text-amber-700'
                                : 'bg-emerald-100 text-emerald-700'
                        }`}
                      >
                        {t.status}
                      </span>
                    </TableCell>

                    <TableCell>
                      <a className="text-sm text-muted-foreground">View</a>
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
