'use client'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { useMemo, useState } from 'react'

type City = { name: string; value: number }
type Brand = { name: string; value: number }
type StoreItem = { name: string; orders: number; revenue: string }
type Reseller = { name: string; deals: number; revenue: string }

const activeCities: City[] = [
  { name: 'Los Angeles', value: 3248 },
  { name: 'New York', value: 2088 },
  { name: 'Chicago', value: 2158 },
  { name: 'Miami', value: 1988 },
  { name: 'San Francisco', value: 1748 },
  { name: 'Seattle', value: 1628 },
]

const topBrands: Brand[] = [
  { name: 'Nike', value: 8420 },
  { name: 'Adidas', value: 6230 },
  { name: 'Jordan', value: 5120 },
  { name: 'Yeezy', value: 4150 },
  { name: 'New Balance', value: 3820 },
  { name: 'Puma', value: 2640 },
]

const topStores: StoreItem[] = [
  { name: 'Nike Downtown LA', orders: 187, revenue: '$24,580' },
  { name: 'Sneaker Palace NYC', orders: 165, revenue: '$22,180' },
  { name: 'Kicks Heaven', orders: 142, revenue: '$19,880' },
  { name: 'Street Elite', orders: 138, revenue: '$18,280' },
  { name: 'Urban Sole', orders: 120, revenue: '$17,080' },
]

const topResellers: Reseller[] = [
  { name: 'Alex Turner', deals: 42, revenue: '$12,400' },
  { name: 'Rachel Green', deals: 38, revenue: '$10,800' },
  { name: 'Mike Johnson', deals: 35, revenue: '$9,600' },
  { name: 'Sarah Davis', deals: 31, revenue: '$8,900' },
  { name: 'Tom Harris', deals: 26, revenue: '$7,200' },
]

const revenuePoints = [110000, 125000, 119000, 122000, 140000, 150000, 170000]

function LineChart({ points }: { points: number[] }) {
  const d = useMemo(() => {
    const max = Math.max(...points)
    const min = Math.min(...points)
    const len = points.length
    return points
      .map((p, i) => {
        const x = (i / (len - 1)) * 100
        const y = ((max - p) / (max - min || 1)) * 100
        return `${x},${y}`
      })
      .join(' L ')
  }, [points])

  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="w-full h-44"
    >
      <defs>
        <linearGradient id="g" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#D1FAE5" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#D1FAE5" stopOpacity="0" />
        </linearGradient>
      </defs>

      <polyline
        points={d}
        fill="none"
        stroke="#10B981"
        strokeWidth={0.9}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="translate-y-1"
      />

      <polyline
        points={d}
        fill="url(#g)"
        stroke="none"
        className="opacity-60"
      />
    </svg>
  )
}

export default function AnalyticsPage() {
  const [range] = useState('30d')
  const [activeTab, setActiveTab] = useState<
    'platform' | 'promotions' | 'push' | 'settings'
  >('platform')

  return (
    <div className="space-y-6">
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-foreground">
              Analytics
            </h1>
          </div>
        </div>
        <div>
          <nav className="mt-4 flex items-center gap-4 border-b border-border/60 pb-3">
            <button
              onClick={() => setActiveTab('platform')}
              className={`pb-3 text-sm ${activeTab === 'platform' ? 'border-b-2 border-emerald-500 text-foreground' : 'text-muted-foreground'}`}
            >
              Platform Analytics
            </button>

            <button
              onClick={() => setActiveTab('promotions')}
              className={`pb-3 text-sm ${activeTab === 'promotions' ? 'border-b-2 border-emerald-500 text-foreground' : 'text-muted-foreground'}`}
            >
              Promotions Manager
            </button>

            <button
              onClick={() => setActiveTab('push')}
              className={`pb-3 text-sm ${activeTab === 'push' ? 'border-b-2 border-emerald-500 text-foreground' : 'text-muted-foreground'}`}
            >
              Push Notifications
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`pb-3 text-sm ${activeTab === 'settings' ? 'border-b-2 border-emerald-500 text-foreground' : 'text-muted-foreground'}`}
            >
              Platform Settings
            </button>
          </nav>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2 rounded-md bg-muted p-1">
            <button
              className={`px-3 py-1 text-sm ${range === '7d' ? 'bg-emerald-50 text-emerald-700 rounded' : 'text-muted-foreground'}`}
            >
              7D
            </button>
            <button
              className={`px-3 py-1 text-sm ${range === '30d' ? 'bg-emerald-50 text-emerald-700 rounded' : 'text-muted-foreground'}`}
            >
              30D
            </button>
            <button
              className={`px-3 py-1 text-sm ${range === '90d' ? 'bg-emerald-50 text-emerald-700 rounded' : 'text-muted-foreground'}`}
            >
              90D
            </button>
            <button className="px-3 py-1 text-sm text-muted-foreground">
              1Y
            </button>
            <button className="px-3 py-1 text-sm text-muted-foreground">
              Custom
            </button>
          </div>
          <Button variant="outline" size="sm">
            Export Full Report
          </Button>
        </div>

        {activeTab === 'platform' ? (
          <>
            <Card>
              <CardHeader className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Revenue Overview
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button className="rounded-md bg-emerald-50 px-3 py-1 text-sm text-emerald-700">
                    GMV
                  </button>
                  <button className="rounded-md bg-muted px-3 py-1 text-sm text-muted-foreground">
                    Platform Fees
                  </button>
                  <button className="rounded-md bg-muted px-3 py-1 text-sm text-muted-foreground">
                    Payouts
                  </button>
                </div>
              </CardHeader>

              <CardContent>
                <LineChart points={revenuePoints} />
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <p className="text-sm font-medium">Most Active Cities</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {activeCities.map((c, i) => {
                      const max = activeCities[0].value
                      const width = Math.round((c.value / max) * 100)
                      return (
                        <li
                          key={c.name}
                          className="flex items-center justify-between gap-4"
                        >
                          <div>
                            <p className="font-medium">{c.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {c.value.toLocaleString()}
                            </p>
                          </div>
                          <div className="w-36">
                            <div className="h-2 w-full rounded-full bg-muted">
                              <div
                                className="h-2 rounded-full bg-emerald-500"
                                style={{ width: `${width}%` }}
                              />
                            </div>
                          </div>
                        </li>
                      )
                    })}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <p className="text-sm font-medium">Top Brands by Search</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {topBrands.map((b) => {
                      const max = topBrands[0].value
                      const width = Math.round((b.value / max) * 100)
                      return (
                        <li
                          key={b.name}
                          className="flex items-center justify-between gap-4"
                        >
                          <div>
                            <p className="font-medium">{b.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {b.value.toLocaleString()}
                            </p>
                          </div>
                          <div className="w-36">
                            <div className="h-2 w-full rounded-full bg-muted">
                              <div
                                className="h-2 rounded-full bg-sky-500"
                                style={{ width: `${width}%` }}
                              />
                            </div>
                          </div>
                        </li>
                      )
                    })}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <p className="text-sm font-medium">Conversion Funnel</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-center justify-between">
                      <div>
                        <p className="text-sm">Views</p>
                        <p className="text-xs text-muted-foreground">125,000</p>
                      </div>
                      <div className="w-36">
                        <div className="h-2 w-full rounded-full bg-muted">
                          <div
                            className="h-2 rounded-full bg-violet-500"
                            style={{ width: `100%` }}
                          />
                        </div>
                      </div>
                    </li>

                    <li className="flex items-center justify-between">
                      <div>
                        <p className="text-sm">Search</p>
                        <p className="text-xs text-muted-foreground">
                          62,560 (50%)
                        </p>
                      </div>
                      <div className="w-36">
                        <div className="h-2 w-full rounded-full bg-muted">
                          <div
                            className="h-2 rounded-full bg-violet-400"
                            style={{ width: `50%` }}
                          />
                        </div>
                      </div>
                    </li>

                    <li className="flex items-center justify-between">
                      <div>
                        <p className="text-sm">Product View</p>
                        <p className="text-xs text-muted-foreground">
                          31,250 (25%)
                        </p>
                      </div>
                      <div className="w-36">
                        <div className="h-2 w-full rounded-full bg-muted">
                          <div
                            className="h-2 rounded-full bg-violet-300"
                            style={{ width: `25%` }}
                          />
                        </div>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <p className="text-sm font-medium">Top Stores</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {topStores.map((s, i) => (
                      <li
                        key={s.name}
                        className="flex items-center justify-between gap-3"
                      >
                        <div className="flex items-center gap-3">
                          <Avatar size="sm">
                            <AvatarFallback>{String(i + 1)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{s.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {s.orders} orders • ★ 4.9
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{s.revenue}</p>
                          <p className="text-xs text-emerald-600">+12%</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <p className="text-sm font-medium">Top Resellers</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {topResellers.map((r, i) => (
                      <li
                        key={r.name}
                        className="flex items-center justify-between gap-3"
                      >
                        <div className="flex items-center gap-3">
                          <Avatar size="sm">
                            <AvatarFallback>{String(i + 1)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{r.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {r.deals} deals • Trust 98/100
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{r.revenue}</p>
                          <p className="text-xs text-emerald-600">+8%</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 sm:grid-cols-4">
              <Card className="p-4">
                <p className="text-sm text-muted-foreground">DAU</p>
                <p className="mt-2 text-2xl font-semibold">
                  4,821 <span className="text-emerald-600 text-sm">+8.2%</span>
                </p>
              </Card>

              <Card className="p-4">
                <p className="text-sm text-muted-foreground">MAU</p>
                <p className="mt-2 text-2xl font-semibold">
                  12,847{' '}
                  <span className="text-emerald-600 text-sm">+12.4%</span>
                </p>
              </Card>

              <Card className="p-4">
                <p className="text-sm text-muted-foreground">Avg Session</p>
                <p className="mt-2 text-2xl font-semibold">
                  8m 32s <span className="text-emerald-600 text-sm">+2.1%</span>
                </p>
              </Card>

              <Card className="p-4">
                <p className="text-sm text-muted-foreground">
                  Restock Alerts/Day
                </p>
                <p className="mt-2 text-2xl font-semibold">
                  1,204 <span className="text-emerald-600 text-sm">+15.7%</span>
                </p>
              </Card>
            </div>
          </>
        ) : activeTab === 'promotions' ? (
          <Card>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Promotions Manager (placeholder)
              </p>
            </CardContent>
          </Card>
        ) : activeTab === 'push' ? (
          <Card>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Push Notifications (placeholder)
              </p>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Platform Settings (placeholder)
              </p>
            </CardContent>
          </Card>
        )}
      </section>
    </div>
  )
}
