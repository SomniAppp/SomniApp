import { createContext, useContext, useEffect, useState } from 'react'

const SubscriptionContext = createContext(null)

// TODO: reemplazar por persistencia real en Supabase cuando el backend esté
// integrado. Por ahora el localStorage sobrevive a reloads/logins.
//
// Todo usuário que chega hasta el registro ya compró el acceso en Hotmart —
// no hay más flujo gratuito dentro de la app. isPremium default true refleja
// eso. Si en el futuro se reintroduce un modelo freemium o de suscripción
// recurrente, este default vuelve a ser false y la integración real de pago
// entra acá.
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
