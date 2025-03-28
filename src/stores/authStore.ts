// This store manages the reactive authentication state.
// It delegates login/signup/verify calls to the service layer,
// and stores user/token info in a centralized Pinia store.

import { defineStore } from 'pinia'
import { useGuestId } from '~/composables/useGuestId'
import { loginUser, signupUser, verifyAuthToken } from '~/application/services/auth.service'

interface User {
  id: number
  email: string
}

const initialToken = import.meta.client ? localStorage.getItem('token') || '' : ''

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    token: initialToken,
  }),

  getters: {
    // Returns true if a token exists
    isAuthenticated: (state) => !!state.token,

    // Returns the logged-in user ID, or null
    userId: (state) => state.user?.id || null,
  },

  actions: {
    // Tries to verify the current token with the backend
    async verifyToken() {
      if (!this.token) return
      try {
        const res = await verifyAuthToken(this.token)
        this.user = res.user
      } catch {
        this.logout()
      }
    },

    // Calls the login service, updates state, and persists token
    async login(email: string, password: string) {
      const { guestId } = useGuestId()
      try {
        const res = await loginUser(email, password, guestId.value)
        this.token = res.token
        this.user = res.user
        localStorage.setItem('token', this.token)
        localStorage.removeItem('guestId')
        return true
      } catch (error: any) {
        console.error("Login failed:", error)
        throw error
      }
    },

    // The same logic as login
    async signup(email: string, password: string, guestId?: string) {
      try {
        const res = await signupUser(email, password, guestId)
        this.token = res.token
        this.user = res.user
        localStorage.setItem('token', this.token)
        localStorage.removeItem('guestId')
        return true
      } catch (err: any) {
        console.error("Signup failed:", err)
        throw err
      }
    },

    // Clears all authentication state and local storage token
    logout() {
      this.token = ''
      this.user = null
      localStorage.removeItem('token')
    },
  },
})


//authStore as "state brain" that manages:
// Reactive state (e.g., user info, token)
// Public access via getters
// Simple coordination between layers (like calling loginUser() from services)
// !Session lifecycle (like logout(), token sync with localStorage)