import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from './AuthContext'
import { useBabies } from './BabyContext'

const ActivityContext = createContext(null)

export function ActivityProvider({ children }) {
  const { user } = useAuth()
  const { activeBabyId } = useBabies()
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user || !activeBabyId) {
      setLogs([])
      setLoading(false)
      return
    }

    let cancelled = false
    setLoading(true)

    supabase
      .from('activity_logs')
      .select('*')
      .eq('baby_id', activeBabyId)
      .order('started_at', { ascending: false })
      .then(({ data, error }) => {
        if (cancelled) return
        if (error) throw error
        setLogs(data ?? [])
        setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [user, activeBabyId])

  async function addLog(entry) {
    const { data, error } = await supabase
      .from('activity_logs')
      .insert({ ...entry, baby_id: activeBabyId, user_id: user.id })
      .select()
      .single()
    if (error) throw error

    setLogs((prev) => [data, ...prev])
    return data
  }

  async function updateLog(id, entry) {
    const { data, error } = await supabase
      .from('activity_logs')
      .update(entry)
      .eq('id', id)
      .select()
      .single()
    if (error) throw error

    setLogs((prev) => prev.map((log) => (log.id === id ? data : log)))
    return data
  }

  async function deleteLog(id) {
    const { error } = await supabase.from('activity_logs').delete().eq('id', id)
    if (error) throw error

    setLogs((prev) => prev.filter((log) => log.id !== id))
  }

  return (
    <ActivityContext.Provider value={{ logs, loading, addLog, updateLog, deleteLog }}>
      {children}
    </ActivityContext.Provider>
  )
}

export function useActivity() {
  const context = useContext(ActivityContext)
  if (!context) {
    throw new Error('useActivity debe usarse dentro de un ActivityProvider')
  }
  return context
}
