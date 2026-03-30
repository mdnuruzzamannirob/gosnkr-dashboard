'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { useState } from 'react'

type Store = {
  id: string
  name: string
  location: string
  status: 'Pending' | 'Under Review' | 'Approved' | 'Rejected'
  submitted: string
}

export default function StoreDetail({ store }: { store: Store }) {
  const [tab, setTab] = useState<
    'business' | 'documents' | 'location' | 'social' | 'notes'
  >('business')

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold">{store.name}</h2>
          <div className="mt-2 flex items-center gap-3">
            <Badge variant={store.status === 'Pending' ? 'default' : 'outline'}>
              {store.status}
            </Badge>
            <p className="text-sm text-muted-foreground">
              Submitted {store.submitted}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="destructive" size="sm">
            Reject
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="bg-amber-50 border-amber-200 text-amber-700"
          >
            Request Info
          </Button>
          <Button size="sm">Approve</Button>
        </div>
      </div>

      <Card>
        <CardHeader className="border-b">
          <div className="flex items-center gap-6">
            <nav className="flex gap-4">
              <button
                onClick={() => setTab('business')}
                className={`pb-3 text-sm ${tab === 'business' ? 'border-b-2 border-emerald-500 text-foreground' : 'text-muted-foreground'}`}
              >
                Business Info
              </button>
              <button
                onClick={() => setTab('documents')}
                className={`pb-3 text-sm ${tab === 'documents' ? 'border-b-2 border-emerald-500 text-foreground' : 'text-muted-foreground'}`}
              >
                Documents
              </button>
              <button
                onClick={() => setTab('location')}
                className={`pb-3 text-sm ${tab === 'location' ? 'border-b-2 border-emerald-500 text-foreground' : 'text-muted-foreground'}`}
              >
                Location
              </button>
              <button
                onClick={() => setTab('social')}
                className={`pb-3 text-sm ${tab === 'social' ? 'border-b-2 border-emerald-500 text-foreground' : 'text-muted-foreground'}`}
              >
                Social/Web
              </button>
              <button
                onClick={() => setTab('notes')}
                className={`pb-3 text-sm ${tab === 'notes' ? 'border-b-2 border-emerald-500 text-foreground' : 'text-muted-foreground'}`}
              >
                Admin Notes
              </button>
            </nav>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          {tab === 'business' && (
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <p className="text-sm text-muted-foreground">Owner Name</p>
                <p className="mt-1">John Smith</p>

                <p className="mt-4 text-sm text-muted-foreground">Phone</p>
                <p className="mt-1">(323) 555-0123</p>

                <p className="mt-4 text-sm text-muted-foreground">Store Type</p>
                <p className="mt-1">Independent</p>

                <p className="mt-4 text-sm text-muted-foreground">
                  Established
                </p>
                <p className="mt-1">January 2019</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="mt-1">john@nikedowntown.com</p>

                <p className="mt-4 text-sm text-muted-foreground">
                  Business Reg #
                </p>
                <p className="mt-1">BIZ-CA-2019-12345</p>

                <p className="mt-4 text-sm text-muted-foreground">Category</p>
                <p className="mt-1">Sneakers / Streetwear</p>

                <p className="mt-4 text-sm text-muted-foreground">Website</p>
                <p className="mt-1 text-primary">nikedowntown.com</p>
              </div>

              <div className="md:col-span-2">
                <p className="text-sm text-muted-foreground">Bio</p>
                <div className="mt-2 rounded-md bg-muted p-4 text-sm">
                  Premium sneaker boutique in downtown Los Angeles. Specializing
                  in exclusive releases and rare finds. Family-owned business
                  with over 5 years of experience in the sneaker community.
                </div>
              </div>
            </div>
          )}

          {tab === 'documents' && (
            <div>
              <p className="mb-4 text-sm font-medium">3 documents required</p>
              <div className="h-2 w-full rounded-full bg-amber-100">
                <div className="h-2 w-2/3 rounded-full bg-amber-500" />
              </div>

              <ul className="mt-6 space-y-4">
                <li className="flex items-center justify-between rounded-md border p-4">
                  <div>
                    <p className="font-medium">Business License</p>
                    <p className="text-sm text-muted-foreground">
                      Uploaded 2 days ago
                    </p>
                  </div>
                  <Badge variant="default">Verified</Badge>
                </li>

                <li className="flex items-center justify-between rounded-md border p-4">
                  <div>
                    <p className="font-medium">ID Verification</p>
                    <p className="text-sm text-muted-foreground">
                      Uploaded 2 days ago
                    </p>
                  </div>
                  <Badge variant="default">Verified</Badge>
                </li>

                <li className="flex items-center justify-between rounded-md border p-4">
                  <div>
                    <p className="font-medium">Store Photos</p>
                    <p className="text-sm text-muted-foreground">
                      Uploaded 2 days ago
                    </p>
                  </div>
                  <Button size="sm" variant="outline">
                    Mark Verified
                  </Button>
                </li>
              </ul>
            </div>
          )}

          {tab === 'location' && (
            <div>
              <div className="h-48 w-full rounded-md bg-muted" />
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <p className="font-medium">
                    123 Main St, Los Angeles, CA 90012
                  </p>
                  <a className="mt-1 inline-block text-sm text-primary">
                    Verify on Google Maps ↗
                  </a>
                </div>
                <div className="text-sm text-muted-foreground">
                  34.0522° N, 118.2437° W
                </div>
              </div>
            </div>
          )}

          {tab === 'social' && (
            <div>
              <ul className="space-y-3">
                <li className="rounded-md border p-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Website</p>
                    <p className="text-sm text-muted-foreground">
                      nikedowntown.com
                    </p>
                  </div>
                  <a className="text-primary">Visit ↗</a>
                </li>

                <li className="rounded-md border p-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Instagram</p>
                    <p className="text-sm text-muted-foreground">
                      @nikedowntown
                    </p>
                  </div>
                  <a className="text-primary">Visit ↗</a>
                </li>

                <li className="rounded-md border p-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Facebook</p>
                    <p className="text-sm text-muted-foreground">
                      NikeDowntownLA
                    </p>
                  </div>
                  <a className="text-primary">Visit ↗</a>
                </li>

                <li className="rounded-md border p-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Twitter/X</p>
                    <p className="text-sm text-muted-foreground">
                      @NikeDowntownLA
                    </p>
                  </div>
                  <a className="text-primary">Visit ↗</a>
                </li>
              </ul>
            </div>
          )}

          {tab === 'notes' && (
            <div>
              <textarea
                placeholder="Add admin notes..."
                className="min-h-40 w-full rounded-md border p-4 text-sm"
              />
              <div className="mt-4">
                <Button size="sm">Save Note</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button size="sm" variant="outline">
            Standard
          </Button>
          <Button size="sm" className="bg-emerald-600">
            Premium
          </Button>
          <Button size="sm" variant="outline">
            Elite
          </Button>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="destructive" size="sm">
            Reject
          </Button>
          <Button variant="outline" size="sm">
            Request More Info
          </Button>
          <Button size="sm">Approve</Button>
        </div>
      </div>
    </div>
  )
}
