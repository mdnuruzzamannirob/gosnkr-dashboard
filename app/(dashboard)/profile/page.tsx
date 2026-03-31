'use client'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

export default function ProfilePage() {
  const [tab, setTab] = useState<'edit' | 'password'>('edit')
  const [name, setName] = useState('Maria')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  return (
    <div className="space-y-6">
      <section className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">
            Profile
          </h1>
        </div>

        <div className="rounded-lg bg-muted p-8">
          <div className="rounded-xl bg-emerald-500 px-8 py-6 text-white flex items-center gap-6">
            <div className="relative">
              <Avatar size="lg">
                <AvatarFallback>SA</AvatarFallback>
              </Avatar>
              <span className="absolute -bottom-1 -right-1 inline-flex h-7 w-7 items-center justify-center rounded-full bg-white text-emerald-600 text-xs">
                📷
              </span>
            </div>

            <div>
              <h2 className="text-2xl font-semibold">Salman</h2>
              <p className="text-sm">Admin</p>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <nav className="flex gap-6">
              <button
                onClick={() => setTab('edit')}
                className={`text-sm ${tab === 'edit' ? 'text-emerald-600 border-b-2 border-emerald-600 pb-3' : 'text-muted-foreground pb-3'}`}
              >
                Edit Profile
              </button>

              <button
                onClick={() => setTab('password')}
                className={`text-sm ${tab === 'password' ? 'text-emerald-600 border-b-2 border-emerald-600 pb-3' : 'text-muted-foreground pb-3'}`}
              >
                Change Password
              </button>
            </nav>
          </div>

          {tab === 'edit' ? (
            <div className="mt-6">
              <h3 className="text-center text-lg font-semibold">
                Edit Your Profile
              </h3>

              <div className="mx-auto mt-6 w-full max-w-md">
                <label className="block text-sm text-muted-foreground">
                  User Name
                </label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-2"
                />

                <div className="mt-6 text-center">
                  <Button className="bg-black text-white">Save & Change</Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-6">
              <h3 className="text-center text-lg font-semibold">
                Change Password
              </h3>

              <div className="mx-auto mt-6 w-full max-w-md space-y-4">
                <div>
                  <label className="block text-sm text-muted-foreground">
                    Current Password
                  </label>
                  <Input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="mt-2"
                  />
                </div>

                <div>
                  <label className="block text-sm text-muted-foreground">
                    New Password
                  </label>
                  <Input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="mt-2"
                  />
                </div>

                <div>
                  <label className="block text-sm text-muted-foreground">
                    Confirm New Password
                  </label>
                  <Input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="mt-2"
                  />
                </div>

                <div className="mt-4 text-center">
                  <Button className="bg-black text-white">Save & Change</Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
