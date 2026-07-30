import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from './AuthContext'

const SubscriptionContext = createContext(null)

// Todo usuário que chega hasta el registro ya compró el acceso en Hotmart —
// no hay más flujo gratuito dentro de la app. isPremium default true refleja
// eso. Si en el futuro se reintroduce un modelo freemium o de suscripción
// recurrente, este default vuelve a ser false y la integración real de pago
// entra acá.
export function SubscriptionProvider({ children }) {
  const { user } = useAuth()
  const [isPremium, setIsPremium] = useState(true)

  useEffect(() => {
    if (!user) {
      setIsPremium(true)
      return
    }

    let cancelled = false

    async function loadProfile() {
      const { data, error } = await supabase
        .from('profiles')
        .select('is_premium')
        .eq('id', user.id)
        .single()

      if (cancelled) return

      if (error) {
        console.error('Error al cargar el perfil:', error)
        return
      }

      setIsPremium(data?.is_premium ?? true)
    }

    loadProfile()

    return () => {
      cancelled = true
    }
  }, [user])

  async function togglePremium(value) {
    const { error } = await supabase
      .from('profiles')
      .update({ is_premium: value })
      .eq('id', user.id)
    if (error) throw error
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
