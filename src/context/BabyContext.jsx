import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from './AuthContext'

const BabyContext = createContext(null)

export function BabyProvider({ children }) {
  const { user } = useAuth()
  const [babies, setBabies] = useState([])
  const [activeBabyId, setActiveBabyId] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      setBabies([])
      setActiveBabyId(null)
      setLoading(false)
      return
    }

    let cancelled = false
    setLoading(true)

    async function loadBabies() {
      const { data, error } = await supabase
        .from('babies')
        .select('*')
        .order('created_at', { ascending: true })

      if (cancelled) return

      if (error) {
        console.error('Error al cargar los bebés:', error)
        setLoading(false)
        return
      }

      setBabies(data ?? [])
      setActiveBabyId(data?.[0]?.id ?? null)
      setLoading(false)
    }

    loadBabies()

    return () => {
      cancelled = true
    }
  }, [user])

  async function addBaby({ name, birthdate }) {
    const { data, error } = await supabase
      .from('babies')
      .insert({ name, birthdate, user_id: user.id })
      .select()
      .single()
    if (error) throw error

    setBabies((prev) => [...prev, data])
    setActiveBabyId((prev) => prev ?? data.id)
    return data
  }

  return (
    <BabyContext.Provider value={{ babies, setBabies, activeBabyId, setActiveBabyId, addBaby, loading }}>
      {children}
    </BabyContext.Provider>
  )
}

export function useBabies() {
  const context = useContext(BabyContext)
  if (!context) {
    throw new Error('useBabies debe usarse dentro de un BabyProvider')
  }
  return context
}
