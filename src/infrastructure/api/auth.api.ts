interface User {
    id: number
    email: string
  }
  
  interface AuthResponse {
    token: string
    user: User
  }
  
  export async function login(email: string, password: string, guestId: string): Promise<AuthResponse> {
    const config = useRuntimeConfig()
    return await $fetch(`${config.public.API_URL}/api/auth/login`, {
      method: 'POST',
      body: { email, password, guestId }
    })
  }
  
  export async function signup(email: string, password: string, guestId?: string): Promise<AuthResponse> {
    const config = useRuntimeConfig()
    return await $fetch(`${config.public.API_URL}/api/auth/signup`, {
      method: 'POST',
      body: { email, password, guestId }
    })
  }
  
  export async function verifyToken(token: string): Promise<{ user: User }> {
    const config = useRuntimeConfig()
    return await $fetch(`${config.public.API_URL}/api/auth/verify`, {
      headers: { Authorization: `Bearer ${token}` }
    })
  }
  