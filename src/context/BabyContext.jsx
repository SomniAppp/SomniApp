import { createContext, useContext, useState } from 'react'

const BabyContext = createContext(null)

// TODO: persistir los bebés y el bebé activo en backend / almacenamiento real; hoy vive solo en memoria y se pierde al recargar
export function BabyProvider({ children }) {
  const [babies, setBabies] = useState([])
  const [activeBabyId, setActiveBabyId] = useState(null)

  return (
    <BabyContext.Provider value={{ babies, setBabies, activeBabyId, setActiveBabyId }}>
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
