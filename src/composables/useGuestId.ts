import { useCookie } from '#app'

export const useGuestId = () => {
  const guestId = useCookie<string>('guestId')

  // Create a random guest ID if it doesn't exist
  if (!guestId.value) {
    guestId.value = crypto.randomUUID()
  }

  return { guestId }
}
