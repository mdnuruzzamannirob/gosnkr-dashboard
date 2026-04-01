'use client'

import {
  BadgeAlert,
  CircleDollarSign,
  Flag,
  PackageCheck,
  ShieldAlert,
  TrendingUp,
  Users,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { StatusBadge } from '@/components/ui/status-badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

interface MetricCard {
  title: string
  value: string
  delta: string
  icon: typeof CircleDollarSign
  bars: number[]
  accent: string
}

const metricCards: MetricCard[] = [
  {
    title: 'Total Revenue',
    value: '$184,920',
    delta: '+12.4% vs last month',
    icon: CircleDollarSign,
    bars: [28, 40, 35, 52, 44, 66, 60],
    accent: 'text-primary',
  },
  {
    title: 'Active Users',
    value: '12,847',
    delta: '+847 new this week',
    icon: Users,
    bars: [18, 22, 30, 44, 38, 54, 62],
    accent: 'text-blue-600',
  },
  {
    title: 'Platform Uptime',
    value: '$2.1M',
    delta: '+12 h last month',
    icon: TrendingUp,
    bars: [70, 72, 68, 76, 80, 84, 90],
    accent: 'text-amber-600',
  },
  {
    title: 'Pending Actions',
    value: '23',
    delta: '8 reseller approvals',
    icon: BadgeAlert,
    bars: [16, 20, 18, 22, 26, 31, 28],
    accent: 'text-rose-600',
  },
]

const revenueData = [
  { month: 'Jan', revenue: 72000 },
  { month: 'Feb', revenue: 92000 },
  { month: 'Mar', revenue: 108000 },
  { month: 'Apr', revenue: 116000 },
  { month: 'May', revenue: 139000 },
  { month: 'Jun', revenue: 184920 },
]

const platformHealth = [
  { label: 'API Server', value: 99, status: '99.9% uptime' },
  { label: 'Inventory Sync', value: 92, status: '98.3% uptime' },
  { label: 'Payment Gateway', value: 100, status: '100% uptime' },
  { label: 'Push Notifications', value: 88, status: '97.4% uptime' },
  { label: 'Map Services', value: 95, status: '99.1% uptime' },
  { label: 'Manage Services', value: 96, status: '98.8% uptime' },
]

const storeRows = [
  {
    rank: 1,
    name: 'Nike Downtown LA',
    location: 'Los Angeles, CA',
    revenue: '$24,500',
    orders: '200 orders',
    rating: '4.9',
  },
  {
    rank: 2,
    name: 'Sneaker Palace NYC',
    location: 'New York, NY',
    revenue: '$22,180',
    orders: '165 orders',
    rating: '4.8',
  },
  {
    rank: 3,
    name: 'Kicks Heaven',
    location: 'Miami, FL',
    revenue: '$19,800',
    orders: '142 orders',
    rating: '4.7',
  },
  {
    rank: 4,
    name: 'Street Elite',
    location: 'Chicago, IL',
    revenue: '$18,200',
    orders: '138 orders',
    rating: '4.6',
  },
  {
    rank: 5,
    name: 'Urban Sole',
    location: 'San Francisco, CA',
    revenue: '$17,800',
    orders: '126 orders',
    rating: '4.6',
  },
]

const actionRows = [
  { label: 'Store approvals', count: 8, icon: PackageCheck },
  { label: 'Reseller approvals', count: 6, icon: Users },
  { label: 'Open disputes', count: 4, icon: ShieldAlert },
  { label: 'Fraud alerts', count: 3, icon: Flag },
  { label: 'Drop approvals', count: 2, icon: BadgeAlert },
  { label: 'Flagged content', count: 1, icon: BadgeAlert },
]

const activityRows = [
  {
    time: '10:32 AM',
    action: 'Approved',
    target: 'Nike Downtown LA',
    admin: 'admin@gosnkr.com',
    note: 'Store verified + Premium tier',
  },
  {
    time: '10:18 AM',
    action: 'Escalated',
    target: 'Sneaker Palace NYC',
    admin: 'admin@gosnkr.com',
    note: 'Fraud review flagged',
  },
  {
    time: '09:55 AM',
    action: 'Refunded',
    target: 'Dispute #GS-2241',
    admin: 'admin@gosnkr.com',
    note: 'Full refund to customer',
  },
  {
    time: '09:12 AM',
    action: 'Approved',
    target: 'Reseller @sole_pae',
    admin: 'admin@gosnkr.com',
    note: 'Trusted badge assigned',
  },
  {
    time: '08:45 AM',
    action: 'Flagged',
    target: 'Review #REV-882',
    admin: 'system',
    note: 'AI: 87% fake review',
  },
]

function MetricCardItem({ card }: { card: MetricCard }) {
  const Icon = card.icon

  return (
    <Card className="border-border/70 bg-background/95">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between gap-3">
          <CardTitle className="text-sm text-muted-foreground">
            {card.title}
          </CardTitle>
          <div className={card.accent}>
            <Icon className="size-5" />
          </div>
        </div>
        <CardDescription className="pt-1 text-2xl font-semibold text-foreground">
          {card.value}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-primary">{card.delta}</p>
        <div className="grid h-12 grid-cols-7 items-end gap-1">
          {card.bars.map((height, index) => (
            <span
              key={`${card.title}-${index}`}
              className="rounded-md bg-primary"
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false)
  const [period, setPeriod] = useState<'30D' | '90D' | '1Y'>('30D')

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setMounted(true)
    })

    return () => window.cancelAnimationFrame(frame)
  }, [])

  return (
    <div className="space-y-6 scroll-smooth">
      <section className="space-y-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-foreground">
              Dashboard
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Tuesday, March 24, 2026
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button variant="outline" className="hidden sm:inline-flex">
              Export Report
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {metricCards.map((card) => (
            <MetricCardItem key={card.title} card={card} />
          ))}
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[minmax(0,1.55fr)_minmax(0,0.95fr)]">
        <Card className="border-border/70 bg-background/95">
          <CardHeader className="flex flex-row items-start justify-between gap-4">
            <div>
              <CardTitle>Revenue Overview</CardTitle>
              <CardDescription>
                Revenue growth over the last 6 months.
              </CardDescription>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <button
                onClick={() => setPeriod('30D')}
                className={`rounded-full px-2 py-1 transition-colors ${
                  period === '30D'
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                30D
              </button>
              <button
                onClick={() => setPeriod('90D')}
                className={`rounded-full px-2 py-1 transition-colors ${
                  period === '90D'
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                90D
              </button>
              <button
                onClick={() => setPeriod('1Y')}
                className={`rounded-full px-2 py-1 transition-colors ${
                  period === '1Y'
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                1Y
              </button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-88 w-full md:h-104">
              {mounted ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={revenueData}
                    margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="var(--border)"
                    />
                    <XAxis
                      dataKey="month"
                      tickLine={false}
                      axisLine={false}
                      dy={10}
                    />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `$${Number(value) / 1000}k`}
                      width={55}
                    />
                    <Tooltip
                      formatter={(value) => [
                        `$${Number(value).toLocaleString()}`,
                        'Revenue',
                      ]}
                      contentStyle={{
                        borderRadius: '12px',
                        border: '1px solid var(--border)',
                        background: 'var(--popover)',
                        color: 'var(--popover-foreground)',
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="var(--color-chart-1)"
                      strokeWidth={3}
                      dot={false}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex h-full items-center justify-center rounded-2xl border border-dashed border-border bg-muted/20 text-sm text-muted-foreground">
                  Loading chart...
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/70 bg-background/95">
          <CardHeader>
            <CardTitle>Platform Health</CardTitle>
            <CardDescription>
              Core services and uptime tracking.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            {platformHealth.map((service) => (
              <div key={service.label} className="space-y-2">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {service.label}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {service.status}
                    </p>
                  </div>
                  <StatusBadge status="active">Live</StatusBadge>
                </div>
                <Progress value={service.value} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 xl:grid-cols-[minmax(0,1.25fr)_minmax(0,0.85fr)]">
        <Card className="border-border/70 bg-background/95">
          <CardHeader>
            <CardTitle>Top 5 Stores This Month</CardTitle>
            <CardDescription>
              Stores with the strongest revenue performance.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">#</TableHead>
                    <TableHead>Store</TableHead>
                    <TableHead className="text-right">Revenue</TableHead>
                    <TableHead className="text-right">Orders</TableHead>
                    <TableHead className="text-right">Rating</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {storeRows.map((store) => (
                    <TableRow key={store.rank}>
                      <TableCell className="font-medium text-muted-foreground">
                        {store.rank}
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium text-foreground">
                            {store.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {store.location}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {store.revenue}
                      </TableCell>
                      <TableCell className="text-right text-muted-foreground">
                        {store.orders}
                      </TableCell>
                      <TableCell className="text-right">
                        <span className="inline-flex rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                          {store.rating}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Card id="risk" className="border-rose-200 bg-rose-50/40">
          <CardHeader>
            <CardTitle className="text-rose-600">Pending Actions</CardTitle>
            <CardDescription>
              Prioritized items needing admin attention.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {actionRows.map((action) => {
              const Icon = action.icon

              return (
                <div
                  key={action.label}
                  className="flex items-center gap-3 rounded-xl border border-rose-100 bg-background/80 px-3 py-2"
                >
                  <div className="flex size-9 items-center justify-center rounded-full bg-rose-100 text-rose-600">
                    <Icon className="size-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-foreground">
                      {action.label}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {action.count} items waiting
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="shrink-0 border-rose-200 text-rose-600 hover:bg-rose-100 hover:text-rose-700"
                  >
                    Review
                  </Button>
                </div>
              )
            })}
          </CardContent>
        </Card>
      </section>

      <section id="activity">
        <Card className="border-border/70 bg-background/95">
          <CardHeader className="flex flex-row items-center justify-between gap-4">
            <div>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Latest moderation and operations updates.
              </CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              View all
            </Button>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Time</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Target</TableHead>
                    <TableHead>Admin</TableHead>
                    <TableHead>Result / Note</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activityRows.map((row) => (
                    <TableRow key={`${row.time}-${row.target}`}>
                      <TableCell className="text-muted-foreground">
                        {row.time}
                      </TableCell>
                      <TableCell>
                        <span className="inline-flex rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                          {row.action}
                        </span>
                      </TableCell>
                      <TableCell className="font-medium text-foreground">
                        {row.target}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {row.admin}
                      </TableCell>
                      <TableCell className="max-w-[18rem] text-muted-foreground">
                        {row.note}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
