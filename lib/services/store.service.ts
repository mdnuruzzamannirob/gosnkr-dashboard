/**
 * Store Service - Handles store-related API calls
 * Currently using mock data, ready for real API integration
 */

// import { apiClient } from '@/lib/api-client'

type StoreStatus = 'Pending' | 'Under Review' | 'Approved' | 'Rejected'

interface Store {
  id: string
  name: string
  location: string
  status: StoreStatus
  submitted: string
}

// Mock data - will be replaced with real API calls
const mockStores: Store[] = [
  {
    id: '1',
    name: 'Nike Downtown LA',
    location: 'Los Angeles, CA',
    status: 'Pending',
    submitted: '2 days ago',
  },
  {
    id: '2',
    name: 'Sneaker Palace NYC',
    location: 'New York, NY',
    status: 'Under Review',
    submitted: '5 days ago',
  },
  {
    id: '3',
    name: 'Kicks Heaven',
    location: 'Miami, FL',
    status: 'Approved',
    submitted: '1 week ago',
  },
]

export const storeService = {
  /**
   * Get all stores (with optional filters)
   * Will be replaced with: apiClient.get<Store[]>('/stores')
   */
  async getAllStores(): Promise<Store[]> {
    // TODO: Replace with real API call
    // const response = await apiClient.get<Store[]>('/stores')
    // if (response.error) throw new Error(response.error)
    // return response.data || []

    // Mock delay to simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockStores)
      }, 300)
    })
  },

  /**
   * Get single store by ID
   * Will be replaced with: apiClient.get<Store>(`/stores/${id}`)
   */
  async getStore(id: string): Promise<Store | null> {
    // TODO: Replace with real API call
    const response = mockStores.find((s) => s.id === id)
    return response || null
  },

  /**
   * Create new store
   * Will be replaced with: apiClient.post<Store>('/stores', data)
   */
  async createStore(data: Omit<Store, 'id' | 'submitted'>): Promise<Store> {
    // TODO: Replace with real API call
    void data
    throw new Error('Create store API not implemented')
  },

  /**
   * Update store
   * Will be replaced with: apiClient.put<Store>(`/stores/${id}`, data)
   */
  async updateStore(id: string, data: Partial<Store>): Promise<Store> {
    // TODO: Replace with real API call
    void id
    void data
    throw new Error('Update store API not implemented')
  },

  /**
   * Delete store
   * Will be replaced with: apiClient.delete<void>(`/stores/${id}`)
   */
  async deleteStore(id: string): Promise<void> {
    // TODO: Replace with real API call
    void id
    throw new Error('Delete store API not implemented')
  },
}
