import { createContext, useContext, useEffect, useState } from 'react'

const BabyContext = createContext(null)

// TODO: reemplazar por persistencia real en Supabase cuando el backend esté
// integrado. Por ahora, mientras no haya cuentas reales con datos en el
// servidor, el localStorage actúa como la única fuente de verdad para
// sobrevivir a reloads/logins.
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
  const stored = loadStoredData()
  const [babies, setBabies] = useState(stored?.babies ?? [])
  const [activeBabyId, setActiveBabyId] = useState(stored?.activeBabyId ?? null)
  const [parentName, setParentName] = useState(stored?.parentName ?? '')
  const [loading] = useState(false)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ babies, activeBabyId, parentName }))
  }, [babies, activeBabyId, parentName])

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
      value={{ babies, setBabies, activeBabyId, setActiveBabyId, addBaby, loading, parentName, setParentName }}
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
