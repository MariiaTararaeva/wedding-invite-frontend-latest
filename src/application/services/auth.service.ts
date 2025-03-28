import { login, signup, verifyToken } from '~/infrastructure/api/auth.api'

export async function loginUser(email: string, password: string, guestId: string) {
  return await login(email, password, guestId)
}

export async function signupUser(email: string, password: string, guestId?: string) {
  return await signup(email, password, guestId)
}

export async function verifyAuthToken(token: string) {
  return await verifyToken(token)
}
