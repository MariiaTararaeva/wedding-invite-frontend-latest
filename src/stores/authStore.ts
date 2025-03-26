import { defineStore } from 'pinia'
import { useGuestId } from '~/composables/useGuestId'

interface User {
  id: number
  email: string
}

interface AuthResponse {
  token: string
  user: User
}

const initialToken = import.meta.client ? localStorage.getItem('token') || '' : ''

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    token: initialToken,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    userId: (state) => state.user?.id || null,
  },

  actions: {
    async verifyToken() {
      if (!this.token) return

      try {
        const res = await $fetch<AuthResponse>('/api/auth/verify', {
          headers: { Authorization: `Bearer ${this.token}` },
        })
        this.user = res.user
      } catch {
        this.logout()
      }
    },

    async login(email: string, password: string) {
      const guestId = useGuestId()
      const res = await $fetch<AuthResponse>('/api/auth/login', {
        method: 'POST',
        body: { email, password, guestId },
      })

      this.token = res.token
      this.user = res.user
      localStorage.setItem('token', this.token)
      localStorage.removeItem('guestId')
    },

    async signup(email: string, password: string) {
      const guestId = useGuestId()
      const res = await $fetch<AuthResponse>('/api/auth/signup', {
        method: 'POST',
        body: { email, password, guestId },
      })

      this.token = res.token
      this.user = res.user
      localStorage.setItem('token', this.token)
      localStorage.removeItem('guestId')
    },

    logout() {
      this.token = ''
      this.user = null
      localStorage.removeItem('token')
    },
  },
})
