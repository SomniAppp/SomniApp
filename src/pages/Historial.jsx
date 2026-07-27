import { useMemo, useState } from 'react'
import { ActivityItem, MoonIcon, logToActivityItem } from '../components/activityIcons'
import QuickLogModal from '../components/QuickLogModal'
import { useActivity } from '../context/ActivityContext'

const DAY_LABELS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']
const CHART_HEIGHT = 160 // px, altura del área de trazado
const MAX_HOURS = 12

function typeToModalType(type) {
  return { Sueño: 'sueño', Toma: 'toma', Pañal: 'pañal' }[type]
}

function startOfDay(date) {
  const copy = new Date(date)
  copy.setHours(0, 0, 0, 0)
  return copy
}

function groupLabel(date, today) {
  const diffDays = Math.round((startOfDay(today) - startOfDay(date)) / (1000 * 60 * 60 * 24))
  if (diffDays === 0) return 'Hoy'
  if (diffDays === 1) return 'Ayer'
  return date.toLocaleDateString('es-AR', { day: 'numeric', month: 'long' })
}

function useHistoryGroups(logs) {
  return useMemo(() => {
    const groups = new Map()

    for (const log of logs) {
      const date = new Date(log.started_at)
      const label = groupLabel(date, new Date())
      if (!groups.has(label)) groups.set(label, [])
      groups.get(label).push(logToActivityItem(log))
    }

    return Array.from(groups.entries()).map(([label, events]) => ({ label, events }))
  }, [logs])
}

function useSleepTrend(logs) {
  return useMemo(() => {
    const today = startOfDay(new Date())
    const days = Array.from({ length: 7 }, (_, index) => {
      const date = new Date(today)
      date.setDate(date.getDate() - (6 - index))
      return date
    })

    return days.map((date) => {
      const hours = logs
        .filter((log) => log.type === 'sueño' && log.ended_at && startOfDay(log.started_at).getTime() === date.getTime())
        .reduce((sum, log) => sum + (new Date(log.ended_at) - new Date(log.started_at)) / (1000 * 60 * 60), 0)

      return { label: DAY_LABELS[(date.getDay() + 6) % 7], hours: Math.round(hours * 10) / 10 }
    })
  }, [logs])
}

function SleepTrendChart({ trend }) {
  const todayIndex = trend.length - 1

  return (
    <div className="rounded-card bg-surface p-6">
      <h2 className="font-display text-lg font-bold text-textPrimary">Tendencia de sueño</h2>
      <p className="mt-1 font-body text-sm text-textSecondary">Horas de sueño en los últimos 7 días</p>

      <div className="mt-6 flex items-end gap-2" style={{ height: CHART_HEIGHT }}>
        {trend.map(({ label, hours }, index) => {
          const isToday = index === todayIndex
          const barHeight = Math.max((hours / MAX_HOURS) * CHART_HEIGHT, 4)

          return (
            <div key={`${label}-${index}`} className="flex flex-1 flex-col items-center justify-end gap-1">
              <span className="font-body text-xs font-medium text-textPrimary">{hours}h</span>
              <div
                className={`w-full max-w-[28px] rounded-t-md bg-brand-gradient ${
                  isToday ? 'shadow-[0_0_12px_2px_rgba(155,107,242,0.5)] ring-1 ring-white/40' : ''
                }`}
                style={{ height: barHeight }}
              />
            </div>
          )
        })}
      </div>

      <div className="mt-2 flex gap-2">
        {trend.map(({ label }, index) => (
          <div key={`${label}-${index}`} className="flex-1 text-center">
            <span
              className={`font-body text-xs ${
                index === todayIndex ? 'font-semibold text-textPrimary' : 'text-textSecondary'
              }`}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function Historial() {
  const [activeModal, setActiveModal] = useState(null)
  const { logs } = useActivity()
  const historyGroups = useHistoryGroups(logs)
  const sleepTrend = useSleepTrend(logs)
  const hasEntries = logs.length > 0

  function openEditModal(entry) {
    setActiveModal({ type: typeToModalType(entry.type), existingEntry: entry })
  }

  return (
    <div className="px-4 pb-24 pt-8">
      <h1 className="font-display text-2xl font-bold">Historial</h1>

      <div className="mt-6">
        <SleepTrendChart trend={sleepTrend} />
      </div>

      {hasEntries ? (
        <div className="mt-6 flex flex-col gap-8">
          {historyGroups.map((group) => (
            <div key={group.label}>
              <h2 className="font-display text-lg font-bold text-textSecondary">{group.label}</h2>
              <div className="mt-4 flex flex-col gap-3">
                {group.events.map((event) => (
                  <ActivityItem key={event.id} {...event} onClick={openEditModal} />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <MoonIcon className="h-16 w-16 text-textSecondary" />
          <p className="mt-4 max-w-xs font-display text-lg font-bold text-textPrimary">
            Tu historial va a aparecer acá
          </p>
          <p className="mt-1 max-w-xs font-body text-sm text-textSecondary">
            Cada sueño, toma y pañal que registres va a quedar guardado acá
          </p>
        </div>
      )}

      {activeModal && (
        <QuickLogModal
          type={activeModal.type}
          existingEntry={activeModal.existingEntry}
          onClose={() => setActiveModal(null)}
        />
      )}
    </div>
  )
}

export default Historial
