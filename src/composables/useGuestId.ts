export function useGuestId(): string {
    const idKey = 'guestId'
    const stored = localStorage.getItem(idKey)
  
    if (stored) return stored
  
    const newId = crypto.randomUUID()
    localStorage.setItem(idKey, newId)
    return newId
  }
  