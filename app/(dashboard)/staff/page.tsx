'use client'

import { Plus, Search, Trash2, X } from 'lucide-react'
import { useMemo, useState } from 'react'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Sheet, SheetContent, SheetHeader } from '@/components/ui/sheet'
import { StatusBadge } from '@/components/ui/status-badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

// Type definitions
interface Permission {
  _id: string
  name: string
  description: string
}

interface Role {
  _id: string
  name: string
  description: string
}

interface Staff {
  id: number
  avatar: string
  name: string
  email: string
  phone: string
  joinedDate: string
  role: Role
  permissions: Permission[]
  status: 'active' | 'inactive'
}

// Static role data
const rolesData: Role[] = [
  {
    _id: 'role_1',
    name: 'Admin',
    description: 'Full system access',
  },
  {
    _id: 'role_2',
    name: 'Manager',
    description: 'Manage users and staff',
  },
  {
    _id: 'role_3',
    name: 'Support',
    description: 'Handle customer support',
  },
  {
    _id: 'role_4',
    name: 'Moderator',
    description: 'Moderate content',
  },
]

// Static permissions data
const permissionsData: Permission[] = [
  {
    _id: 'perm_1',
    name: 'User Management',
    description: 'Manage users',
  },
  {
    _id: 'perm_2',
    name: 'Staff Management',
    description: 'Manage staff members',
  },
  {
    _id: 'perm_3',
    name: 'Content Moderation',
    description: 'Moderate content',
  },
  {
    _id: 'perm_4',
    name: 'Reports',
    description: 'View reports',
  },
  {
    _id: 'perm_5',
    name: 'Settings',
    description: 'Modify settings',
  },
  {
    _id: 'perm_6',
    name: 'Audit Logs',
    description: 'Access audit logs',
  },
]

// Static staff data
const initialStaffData: Staff[] = [
  {
    id: 1,
    avatar: 'AJ',
    name: 'Alice Johnson',
    email: 'alice@gosnkr.com',
    phone: '(201) 555-0123',
    joinedDate: 'Jan 10, 2024',
    role: rolesData[0],
    permissions: [permissionsData[0], permissionsData[1], permissionsData[2]],
    status: 'active',
  },
  {
    id: 2,
    avatar: 'BM',
    name: 'Bob Martinez',
    email: 'bob@gosnkr.com',
    phone: '(202) 555-0456',
    joinedDate: 'Feb 15, 2024',
    role: rolesData[1],
    permissions: [permissionsData[0], permissionsData[3]],
    status: 'active',
  },
  {
    id: 3,
    avatar: 'CR',
    name: 'Carol Rodriguez',
    email: 'carol@gosnkr.com',
    phone: '(203) 555-0789',
    joinedDate: 'Mar 8, 2024',
    role: rolesData[2],
    permissions: [permissionsData[2], permissionsData[3]],
    status: 'active',
  },
  {
    id: 4,
    avatar: 'DL',
    name: 'David Lee',
    email: 'david@gosnkr.com',
    phone: '(204) 555-1011',
    joinedDate: 'Dec 20, 2023',
    role: rolesData[3],
    permissions: [permissionsData[2]],
    status: 'inactive',
  },
]

interface ModalStaffData extends Omit<Staff, 'id'> {
  id?: number
}

type ModalMode = 'view' | 'add' | 'edit'

export default function StaffPage() {
  const [search, setSearch] = useState('')
  const [staffList, setStaffList] = useState<Staff[]>(initialStaffData)
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [modalMode, setModalMode] = useState<ModalMode>('view')
  const [selectedStaff, setSelectedStaff] = useState<ModalStaffData | null>(
    null,
  )
  const [formData, setFormData] = useState<ModalStaffData>({
    avatar: '',
    name: '',
    email: '',
    phone: '',
    joinedDate: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }),
    role: rolesData[0],
    permissions: [],
    status: 'active',
  })

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase()
    return staffList.filter(
      (staff) =>
        staff.name.toLowerCase().includes(query) ||
        staff.email.toLowerCase().includes(query),
    )
  }, [search, staffList])

  const openAddModal = () => {
    setModalMode('add')
    setFormData({
      avatar: '',
      name: '',
      email: '',
      phone: '',
      joinedDate: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
      role: rolesData[0],
      permissions: [],
      status: 'active',
    })
    setSelectedStaff(null)
    setIsSheetOpen(true)
  }

  const openEditModal = (staff: Staff) => {
    setModalMode('edit')
    setSelectedStaff(staff)
    setFormData({
      avatar: staff.avatar,
      name: staff.name,
      email: staff.email,
      phone: staff.phone,
      joinedDate: staff.joinedDate,
      role: staff.role,
      permissions: staff.permissions,
      status: staff.status,
    })
    setIsSheetOpen(true)
  }

  const openViewModal = (staff: Staff) => {
    setModalMode('view')
    setSelectedStaff(staff)
    setIsSheetOpen(true)
  }

  const handleSave = () => {
    if (!formData.name || !formData.email) {
      alert('Please fill in all required fields')
      return
    }

    if (modalMode === 'add') {
      const newStaff: Staff = {
        id: Math.max(...staffList.map((s) => s.id), 0) + 1,
        ...formData,
      }
      setStaffList([...staffList, newStaff])
    } else if (modalMode === 'edit' && selectedStaff?.id) {
      setStaffList(
        staffList.map((staff) =>
          staff.id === selectedStaff.id
            ? {
                ...staff,
                ...formData,
              }
            : staff,
        ),
      )
    }

    setIsSheetOpen(false)
  }

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this staff member?')) {
      setStaffList(staffList.filter((staff) => staff.id !== id))
    }
  }

  const togglePermission = (permissionId: string) => {
    const isSelected = formData.permissions.some((p) => p._id === permissionId)
    if (isSelected) {
      setFormData({
        ...formData,
        permissions: formData.permissions.filter((p) => p._id !== permissionId),
      })
    } else {
      const permission = permissionsData.find((p) => p._id === permissionId)
      if (permission) {
        setFormData({
          ...formData,
          permissions: [...formData.permissions, permission],
        })
      }
    }
  }

  return (
    <div className="space-y-6">
      <section className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-foreground">
              Staff Management
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Manage staff members, roles, and permissions
            </p>
          </div>
          <Button
            onClick={openAddModal}
            className="gap-2 rounded-lg bg-primary text-white hover:bg-primary/90"
          >
            <Plus className="size-4" />
            Add Staff
          </Button>
        </div>

        <div className="flex items-center gap-4 rounded-lg border border-border bg-white p-4">
          <Search className="size-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border-0 bg-transparent placeholder:text-muted-foreground focus:outline-none focus-visible:ring-0"
          />
        </div>

        <div className="overflow-x-auto rounded-lg border border-border">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-12">Avatar</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((staff) => (
                <TableRow key={staff.id} className="hover:bg-muted/50">
                  <TableCell>
                    <Avatar className="size-8">
                      <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                        {staff.avatar}
                      </AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell className="font-medium">{staff.name}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {staff.email}
                  </TableCell>
                  <TableCell className="text-sm">{staff.phone}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="rounded-full">
                      {staff.role.name}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <StatusBadge
                      status={staff.status === 'active' ? 'active' : 'warned'}
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-primary hover:bg-primary/10"
                        onClick={() => openViewModal(staff)}
                      >
                        View
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-primary hover:bg-primary/10"
                        onClick={() => openEditModal(staff)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:bg-red-50"
                        onClick={() => handleDelete(staff.id)}
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {filtered.length === 0 && (
          <div className="rounded-lg border border-border bg-muted/10 p-8 text-center">
            <p className="text-sm text-muted-foreground">
              No staff members found matching your search.
            </p>
          </div>
        )}
      </section>

      {/* Detail Sheet */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent
          side="right"
          className="w-full max-w-lg p-0 flex flex-col overflow-hidden"
        >
          <SheetHeader className="border-b border-border px-6 py-4 shrink-0">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-foreground">
                  {modalMode === 'add'
                    ? 'Add New Staff'
                    : modalMode === 'edit'
                      ? 'Edit Staff'
                      : (selectedStaff?.name ?? 'Staff Details')}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {modalMode === 'view'
                    ? 'View staff information'
                    : 'Management form'}
                </p>
              </div>
              <button
                onClick={() => setIsSheetOpen(false)}
                className="rounded-md p-1 transition-colors hover:bg-muted shrink-0"
              >
                <X className="size-4 text-muted-foreground" />
              </button>
            </div>
          </SheetHeader>

          <ScrollArea className="flex-1 overflow-hidden">
            <div className="flex flex-col gap-6 p-6">
              {/* Avatar */}
              {modalMode !== 'view' && (
                <div className="flex items-center justify-center">
                  <Avatar className="size-20">
                    <AvatarFallback className="bg-primary/10 text-primary text-2xl font-semibold">
                      {formData.avatar}
                    </AvatarFallback>
                  </Avatar>
                </div>
              )}

              {modalMode === 'view' && selectedStaff && (
                <div className="flex items-center justify-center">
                  <Avatar className="size-20">
                    <AvatarFallback className="bg-primary/10 text-primary text-2xl font-semibold">
                      {selectedStaff.avatar}
                    </AvatarFallback>
                  </Avatar>
                </div>
              )}

              {/* Form Fields */}
              <div className="space-y-4">
                {/* Name */}
                <div>
                  <label className="text-sm font-medium text-foreground">
                    Name *
                  </label>
                  <input
                    type="text"
                    disabled={modalMode === 'view'}
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="mt-2 w-full rounded-lg border border-border bg-white px-3 py-2 text-sm placeholder:text-muted-foreground disabled:bg-muted disabled:text-muted-foreground focus:border-primary focus:outline-none focus-visible:ring-1 focus-visible:ring-primary"
                    placeholder="Enter name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="text-sm font-medium text-foreground">
                    Email *
                  </label>
                  <input
                    type="email"
                    disabled={modalMode === 'view'}
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="mt-2 w-full rounded-lg border border-border bg-white px-3 py-2 text-sm placeholder:text-muted-foreground disabled:bg-muted disabled:text-muted-foreground focus:border-primary focus:outline-none focus-visible:ring-1 focus-visible:ring-primary"
                    placeholder="Enter email"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="text-sm font-medium text-foreground">
                    Phone
                  </label>
                  <input
                    type="tel"
                    disabled={modalMode === 'view'}
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="mt-2 w-full rounded-lg border border-border bg-white px-3 py-2 text-sm placeholder:text-muted-foreground disabled:bg-muted disabled:text-muted-foreground focus:border-primary focus:outline-none focus-visible:ring-1 focus-visible:ring-primary"
                    placeholder="Enter phone number"
                  />
                </div>

                {/* Role */}
                <div>
                  <label className="text-sm font-medium text-foreground">
                    Role
                  </label>
                  <select
                    disabled={modalMode === 'view'}
                    value={formData.role._id}
                    onChange={(e) => {
                      const role = rolesData.find(
                        (r) => r._id === e.target.value,
                      )
                      if (role) setFormData({ ...formData, role })
                    }}
                    className="mt-2 w-full rounded-lg border border-border bg-white px-3 py-2 text-sm disabled:bg-muted disabled:text-muted-foreground focus:border-primary focus:outline-none focus-visible:ring-1 focus-visible:ring-primary"
                  >
                    {rolesData.map((role) => (
                      <option key={role._id} value={role._id}>
                        {role.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Status */}
                <div>
                  <label className="text-sm font-medium text-foreground">
                    Status
                  </label>
                  <select
                    disabled={modalMode === 'view'}
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        status: e.target.value as 'active' | 'inactive',
                      })
                    }
                    className="mt-2 w-full rounded-lg border border-border bg-white px-3 py-2 text-sm disabled:bg-muted disabled:text-muted-foreground focus:border-primary focus:outline-none focus-visible:ring-1 focus-visible:ring-primary"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>

                {/* Permissions */}
                <div>
                  <label className="text-sm font-medium text-foreground">
                    Permissions
                  </label>
                  <div className="mt-3 space-y-2">
                    {permissionsData.map((permission) => (
                      <label
                        key={permission._id}
                        className="flex items-center gap-3 rounded-lg border border-border p-3 hover:bg-muted/50 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          disabled={modalMode === 'view'}
                          checked={formData.permissions.some(
                            (p) => p._id === permission._id,
                          )}
                          onChange={() => togglePermission(permission._id)}
                          className="size-4 rounded border-border"
                        />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-foreground">
                            {permission.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {permission.description}
                          </p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              {modalMode !== 'view' && (
                <div className="flex gap-3 border-t border-border pt-6">
                  <Button
                    variant="outline"
                    className="flex-1 rounded-lg border-border"
                    onClick={() => setIsSheetOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSave}
                    className="flex-1 rounded-lg bg-primary text-white hover:bg-primary/90"
                  >
                    {modalMode === 'add' ? 'Create' : 'Save Changes'}
                  </Button>
                </div>
              )}

              {modalMode === 'view' && (
                <div className="flex gap-3 border-t border-border pt-6">
                  <Button
                    variant="outline"
                    className="flex-1 rounded-lg border-border"
                    onClick={() => setIsSheetOpen(false)}
                  >
                    Close
                  </Button>
                  {selectedStaff && selectedStaff.id && (
                    <Button
                      onClick={() => {
                        const staffMember = staffList.find(
                          (s) => s.id === selectedStaff.id,
                        )
                        if (staffMember) openEditModal(staffMember)
                      }}
                      className="flex-1 rounded-lg bg-primary text-white hover:bg-primary/90"
                    >
                      Edit
                    </Button>
                  )}
                </div>
              )}
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  )
}
