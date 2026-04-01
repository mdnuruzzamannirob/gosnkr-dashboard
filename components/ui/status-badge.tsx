import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

export type StatusType =
  | 'active'
  | 'inactive'
  | 'warned'
  | 'suspended'
  | 'pending'
  | 'approved'
  | 'rejected'

const statusConfig: Record<
  StatusType,
  { bg: string; text: string; label: string }
> = {
  active: { bg: 'bg-emerald-50', text: 'text-emerald-700', label: 'Active' },
  inactive: { bg: 'bg-gray-50', text: 'text-gray-700', label: 'Inactive' },
  warned: { bg: 'bg-amber-50', text: 'text-amber-700', label: 'Warned' },
  suspended: {
    bg: 'bg-orange-50',
    text: 'text-orange-700',
    label: 'Suspended',
  },
  pending: { bg: 'bg-blue-50', text: 'text-blue-700', label: 'Pending' },
  approved: {
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
    label: 'Approved',
  },
  rejected: { bg: 'bg-red-50', text: 'text-red-700', label: 'Rejected' },
}

interface StatusBadgeProps {
  status: StatusType
  children?: React.ReactNode
  className?: string
}

export function StatusBadge({ status, children, className }: StatusBadgeProps) {
  const config = statusConfig[status]

  return (
    <Badge
      className={cn(
        'rounded-full px-2.5 py-1 text-xs font-semibold border-0',
        config.bg,
        config.text,
        className,
      )}
    >
      {children || config.label}
    </Badge>
  )
}
