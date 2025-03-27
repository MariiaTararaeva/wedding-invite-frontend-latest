
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
        const config = useRuntimeConfig() //use only inside <script setup> or <script> tags not in store top level, so cannot define at top once but every time
        const res = await $fetch<AuthResponse>(`${config.public.API_URL}/api/auth/verify`, {
          headers: { Authorization: `Bearer ${this.token}` },
        })
        this.user = res.user
      } catch {
        this.logout()
      }
    },

    async login(email: string, password: string) {
      const { guestId } = useGuestId() 
    
      try {
        const config = useRuntimeConfig()
        const res = await $fetch<AuthResponse>(`${config.public.API_URL}/api/auth/login`, {
          method: 'POST',
          body: {
            email,
            password,
            guestId: guestId.value, // 
          },
        })
    
        this.token = res.token
        this.user = res.user
        localStorage.setItem('token', this.token)
        localStorage.removeItem('guestId') // clears the cookie since it's linked now
    
        return true
      } catch (error: any) {
        console.error("Login failed:", error)
        throw error
      }
    },
    

    async signup(email: string, password: string, guestId?: string) {
      console.log("Returned from authStore.signup()")

      const config = useRuntimeConfig() 

      try {
        console.log("Sending signup request to backend")
        const res = await $fetch<AuthResponse>(`${config.public.API_URL}/api/auth/signup`, {
          method: 'POST',
          body: { email, password, guestId},
        })

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

    logout() {
      this.token = ''
      this.user = null
      localStorage.removeItem('token')
    },
  },
})
