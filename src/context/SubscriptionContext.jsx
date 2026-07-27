import { createContext, useContext, useState } from 'react'

const SubscriptionContext = createContext(null)

// TODO: reemplazar por el estado real de suscripción (backend / pasarela de pago); hoy vive solo en memoria y se pierde al recargar
export function SubscriptionProvider({ children }) {
  const [isPremium, setIsPremium] = useState(false)

  function togglePremium(value) {
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
