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

    async function loadLogs() {
      const { data, error } = await supabase
        .from('activity_logs')
        .select('*')
        .eq('baby_id', activeBabyId)
        .order('started_at', { ascending: false })

      if (cancelled) return

      if (error) {
        console.error('Error al cargar los registros de actividad:', error)
        setLoading(false)
        return
      }

      setLogs(data ?? [])
      setLoading(false)
    }

    loadLogs()

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

  const activeSleepLog = logs.find((log) => log.type === 'sueño' && !log.ended_at) ?? null
  const activeSleepStart = activeSleepLog?.started_at ?? null

  function startSleepSession() {
    return addLog({ type: 'sueño', started_at: new Date().toISOString(), ended_at: null })
  }

  function endSleepSession() {
    if (!activeSleepLog) return Promise.resolve(null)
    return updateLog(activeSleepLog.id, { ended_at: new Date().toISOString() })
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
    <ActivityContext.Provider
      value={{
        logs,
        loading,
        addLog,
        updateLog,
        deleteLog,
        activeSleepStart,
        startSleepSession,
        endSleepSession,
      }}
    >
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
