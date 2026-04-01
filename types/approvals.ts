/**
 * Approval related type definitions
 */

export type StoreStatus = 'Pending' | 'Under Review' | 'Approved' | 'Rejected'

export interface Store {
  id: string
  name: string
  location: string
  status: StoreStatus
  submitted: string
}

export interface StoreListProps {
  stores: Store[]
  selectedId?: string
  onSelect: (id: string) => void
}

export interface StoreDetailProps {
  store: Store | null
}
