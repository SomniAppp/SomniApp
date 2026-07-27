import { useState } from 'react'
import { ActivityItem, MoonIcon } from '../components/activityIcons'
import QuickLogModal from '../components/QuickLogModal'

// TODO: reemplazar por el historial real desde persistencia (backend / estado global)
const HISTORY_GROUPS = [
  {
    label: 'Hoy',
    events: [
      { id: 1, type: 'Sueño', time: '12:00 a 13:30' },
      { id: 2, type: 'Toma', time: '10:15' },
      { id: 3, type: 'Pañal', time: '09:40' },
      { id: 4, type: 'Sueño', time: '07:00 a 08:15' },
    ],
  },
  {
    label: 'Ayer',
    events: [
      { id: 5, type: 'Pañal', time: '21:10' },
      { id: 6, type: 'Toma', time: '19:45' },
      { id: 7, type: 'Sueño', time: '17:30 a 19:00' },
      { id: 8, type: 'Toma', time: '13:20' },
      { id: 9, type: 'Pañal', time: '11:05' },
    ],
  },
]

// TODO: reemplazar por la detección real de si el usuario ya tiene registros (backend / estado global)
const hasEntries = true

const DAY_LABELS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']

// TODO: reemplazar por las horas de sueño reales agregadas por día (backend / estado global)
const SLEEP_TREND = [10.5, 9, 11, 8.5, 10, 9.5, 10]

const CHART_HEIGHT = 160 // px, altura del área de trazado
const MAX_HOURS = 12

function typeToModalType(type) {
  return { Sueño: 'sueño', Toma: 'toma', Pañal: 'pañal' }[type]
}

function SleepTrendChart() {
  const todayIndex = SLEEP_TREND.length - 1

  return (
    <div className="rounded-card bg-surface p-6">
      <h2 className="font-display text-lg font-bold text-textPrimary">Tendencia de sueño</h2>
      <p className="mt-1 font-body text-sm text-textSecondary">Horas de sueño en los últimos 7 días</p>

      <div className="mt-6 flex items-end gap-2" style={{ height: CHART_HEIGHT }}>
        {SLEEP_TREND.map((hours, index) => {
          const isToday = index === todayIndex
          const barHeight = Math.max((hours / MAX_HOURS) * CHART_HEIGHT, 4)

          return (
            <div key={DAY_LABELS[index]} className="flex flex-1 flex-col items-center justify-end gap-1">
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
        {DAY_LABELS.map((label, index) => (
          <div key={label} className="flex-1 text-center">
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

  function openEditModal(entry) {
    setActiveModal({ type: typeToModalType(entry.type), existingEntry: entry })
  }

  return (
    <div className="px-4 pb-24 pt-8">
      <h1 className="font-display text-2xl font-bold">Historial</h1>

      <div className="mt-6">
        <SleepTrendChart />
      </div>

      {hasEntries ? (
        <div className="mt-6 flex flex-col gap-8">
          {HISTORY_GROUPS.map((group) => (
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
