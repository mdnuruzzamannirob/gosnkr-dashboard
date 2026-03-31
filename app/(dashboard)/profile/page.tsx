'use client'

import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRef, useState } from 'react'

export default function ProfilePage() {
  const [tab, setTab] = useState<'edit' | 'password'>('edit')
  const [name, setName] = useState('Maria')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  function handleFileClick() {
    fileInputRef.current?.click()
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      setAvatarUrl(String(reader.result))
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="space-y-6">
      <section className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">
            Profile
          </h1>
        </div>

        <div className="rounded-lg bg-muted p-8">
          <div className="relative">
            <div className="rounded-xl bg-emerald-500 px-8 py-6 text-white">
              <div className="max-w-6xl mx-auto flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-semibold">Salman</h2>
                  <p className="text-sm">Admin</p>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="relative -mt-14">
                <Avatar size="lg" className="ring-4 ring-background">
                  {avatarUrl ? (
                    <AvatarImage src={avatarUrl} alt="avatar" />
                  ) : (
                    <AvatarFallback>SA</AvatarFallback>
                  )}

                  <AvatarBadge
                    onClick={handleFileClick}
                    className="cursor-pointer bg-white text-emerald-600"
                    role="button"
                    tabIndex={0}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 7h4l2-3h6l2 3h4v11a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 11a4 4 0 100 8 4 4 0 000-8z"
                      />
                    </svg>
                  </AvatarBadge>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </Avatar>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
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
