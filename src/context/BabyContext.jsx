import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from './AuthContext'

const BabyContext = createContext(null)

// El localStorage funciona como caché local (evita pantalla en blanco
// mientras se consulta Supabase), pero Supabase es la fuente de verdad:
// al terminar de cargar, el resultado del backend siempre reemplaza el caché.
const STORAGE_KEY = 'somni-baby-data'

function loadStoredData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export function BabyProvider({ children }) {
  const { user, loading: authLoading } = useAuth()
  const stored = loadStoredData()
  const [babies, setBabies] = useState(stored?.babies ?? [])
  const [activeBabyId, setActiveBabyId] = useState(stored?.activeBabyId ?? null)
  const [parentName, setParentName] = useState(stored?.parentName ?? '')
  const [isLoadingBabies, setIsLoadingBabies] = useState(true)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ babies, activeBabyId, parentName }))
  }, [babies, activeBabyId, parentName])

  useEffect(() => {
    if (authLoading) return

    if (!user) {
      setBabies([])
      setActiveBabyId(null)
      setParentName('')
      setIsLoadingBabies(false)
      return
    }

    let cancelled = false
    setIsLoadingBabies(true)

    async function fetchFromSupabase() {
      const [babiesResult, profileResult] = await Promise.all([
        supabase.from('babies').select('*').eq('user_id', user.id).order('created_at', { ascending: true }),
        supabase.from('profiles').select('parent_name').eq('id', user.id).single(),
      ])

      if (cancelled) return

      const fetchedBabies = babiesResult.data ?? []
      setBabies(fetchedBabies)
      setActiveBabyId((prev) => {
        if (prev && fetchedBabies.some((baby) => baby.id === prev)) return prev
        return fetchedBabies[0]?.id ?? null
      })
      setParentName(profileResult.data?.parent_name ?? '')
      setIsLoadingBabies(false)
    }

    fetchFromSupabase()

    return () => {
      cancelled = true
    }
  }, [user, authLoading])

  async function addBaby({ name, birthdate }) {
    const baby = {
      id: crypto.randomUUID(),
      name,
      birthdate,
      created_at: new Date().toISOString(),
    }
    setBabies((prev) => [...prev, baby])
    setActiveBabyId((prev) => prev ?? baby.id)
    return baby
  }

  return (
    <BabyContext.Provider
      value={{
        babies,
        setBabies,
        activeBabyId,
        setActiveBabyId,
        addBaby,
        isLoadingBabies,
        parentName,
        setParentName,
      }}
    >
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
