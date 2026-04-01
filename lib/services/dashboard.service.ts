/**
 * Dashboard Service - Handles dashboard-related API calls
 * Currently using mock data, ready for real API integration
 */

interface MetricCard {
  title: string
  value: string
  change: string
  trend: 'up' | 'down'
}

const mockMetrics: MetricCard[] = [
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

export const dashboardService = {
  /**
   * Get dashboard metrics
   * Will be replaced with: apiClient.get<MetricCard[]>('/dashboard/metrics')
   */
  async getMetrics(): Promise<MetricCard[]> {
    // TODO: Replace with real API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockMetrics)
      }, 300)
    })
  },

  /**
   * Get platform health status
   * Will be replaced with: apiClient.get('/dashboard/health')
   */
  async getPlatformHealth(): Promise<Record<string, unknown>[]> {
    // TODO: Replace with real API call
    const mockHealth = [
      { name: 'API Uptime', status: '99.9%', color: 'emerald' },
      { name: 'Response Time', status: '145ms', color: 'emerald' },
      { name: 'Error Rate', status: '0.02%', color: 'emerald' },
    ]

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockHealth)
      }, 300)
    })
  },

  /**
   * Get revenue chart data
   * Will be replaced with: apiClient.get('/dashboard/revenue')
   */
  async getRevenueData(): Promise<Record<string, unknown>[]> {
    // TODO: Replace with real API call
    const mockData = [
      { month: 'Jan', revenue: 45000, orders: 234 },
      { month: 'Feb', revenue: 52000, orders: 267 },
      { month: 'Mar', revenue: 48000, orders: 245 },
      { month: 'Apr', revenue: 61000, orders: 312 },
      { month: 'May', revenue: 55000, orders: 289 },
      { month: 'Jun', revenue: 67000, orders: 356 },
    ]

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockData)
      }, 300)
    })
  },
}
