import { createContext, useContext, useEffect, useState } from 'react'

const SubscriptionContext = createContext(null)

// TODO: reemplazar por persistencia real en Supabase cuando el backend esté
// integrado. Por ahora el localStorage sobrevive a reloads/logins.
//
// isPremium default true asume que todo usuario que llega al registro ya
// tiene una suscripción activa vía Hotmart. Cuando la integración real de
// pago entre acá, este default debería reflejar el estado real de la
// suscripción (activa/cancelada/vencida).
const STORAGE_KEY = 'somni-subscription'

function loadStoredIsPremium() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw === null) return true
    return JSON.parse(raw)
  } catch {
    return true
  }
}

export function SubscriptionProvider({ children }) {
  const [isPremium, setIsPremium] = useState(loadStoredIsPremium)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(isPremium))
  }, [isPremium])

  async function togglePremium(value) {
    setIsPremium(value)
  }

  return (
    <SubscriptionContext.Provider value={{ isPremium, togglePremium }}>
      {children}
    </SubscriptionContext.Provider>
  )
}

export function useSubscription() {
  const context = useContext(SubscriptionContext)
  if (!context) {
    throw new Error('useSubscription debe usarse dentro de un SubscriptionProvider')
  }
  return context
}
