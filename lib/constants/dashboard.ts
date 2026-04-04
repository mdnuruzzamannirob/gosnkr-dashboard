/**
 * Dashboard constants and mock data
 */

import {
  BarChart3,
  Flag,
  LayoutDashboard,
  PackageCheck,
  ShieldAlert,
  Store,
  Users,
  Wallet,
} from 'lucide-react'

// Local type definitions
interface NavItem {
  href: string
  label: string
  icon: React.ComponentType<{ className?: string }>
}

interface MetricCard {
  title: string
  value: string
  change: string
  trend: 'up' | 'down'
}

export const NAV_ITEMS: NavItem[] = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/stores', label: 'Users & Stores', icon: Store },
  { href: '/approvals', label: 'Store Approval', icon: Store },
  { href: '/reseller', label: 'Reseller Hub', icon: Users },
  { href: '/risk', label: 'Fraud Hub', icon: ShieldAlert },
  { href: '/payments', label: 'Payments & Payouts', icon: Wallet },
  { href: '/disputes', label: 'Disputes', icon: Flag },
  { href: '/drops', label: 'Drop Management', icon: PackageCheck },
  { href: '/analytics', label: 'Analytics', icon: BarChart3 },
]

export const DASHBOARD_METRICS: MetricCard[] = [
  {
    title: 'Total Revenue',
    value: '$245,890',
    change: '+12.5%',
    trend: 'up',
  },
  {
    title: 'Active Stores',
    value: '1,234',
    change: '+8.2%',
    trend: 'up',
  },
  {
    title: 'Pending Approvals',
    value: '56',
    change: '-2.4%',
    trend: 'down',
  },
  {
    title: 'Active Orders',
    value: '892',
    change: '+15.3%',
    trend: 'up',
  },
]

export const PLATFORM_HEALTH = [
  { name: 'API Uptime', status: '99.9%', color: 'emerald' },
  { name: 'Response Time', status: '145ms', color: 'emerald' },
  { name: 'Error Rate', status: '0.02%', color: 'emerald' },
]

export const REVENUE_CHART_DATA = [
  { month: 'Jan', revenue: 45000, orders: 234 },
  { month: 'Feb', revenue: 52000, orders: 267 },
  { month: 'Mar', revenue: 48000, orders: 245 },
  { month: 'Apr', revenue: 61000, orders: 312 },
  { month: 'May', revenue: 55000, orders: 289 },
  { month: 'Jun', revenue: 67000, orders: 356 },
]

export const TOP_STORES = [
  { name: 'TechWorld BD', revenue: '$12,450', orders: 234, growth: '+23%' },
  { name: 'Fashion Hub', revenue: '$10,230', orders: 189, growth: '+18%' },
  { name: 'Digital Mart', revenue: '$9,870', orders: 167, growth: '+15%' },
  { name: 'Lifestyle Plus', revenue: '$8,920', orders: 145, growth: '+12%' },
  { name: 'Smart Gadgets', revenue: '$7,650', orders: 128, growth: '+9%' },
]

export const STORE_FILTERS = [
  'All Stores',
  'Pending',
  'Under Review',
  'Approved',
  'Rejected',
] as const

export const STORE_DETAIL_TABS = [
  'business',
  'documents',
  'location',
  'social',
  'notes',
] as const

export type StoreFilter = (typeof STORE_FILTERS)[number]
export type StoreDetailTab = (typeof STORE_DETAIL_TABS)[number]
