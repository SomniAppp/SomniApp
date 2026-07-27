import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from './AuthContext'

const SubscriptionContext = createContext(null)

export function SubscriptionProvider({ children }) {
  const { user } = useAuth()
  const [isPremium, setIsPremium] = useState(false)

  useEffect(() => {
    if (!user) {
      setIsPremium(false)
      return
    }

    let cancelled = false

    supabase
      .from('profiles')
      .select('is_premium')
      .eq('id', user.id)
      .single()
      .then(({ data, error }) => {
        if (cancelled) return
        if (error) throw error
        setIsPremium(data?.is_premium ?? false)
      })

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
