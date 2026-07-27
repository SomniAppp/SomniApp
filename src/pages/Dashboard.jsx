import { useState } from 'react'
import QuickLogModal from '../components/QuickLogModal'
import PaywallModal from '../components/PaywallModal'
import { MoonIcon, BottleIcon, DiaperIcon, ActivityItem } from '../components/activityIcons'
import { useTheme } from '../hooks/useTheme'
import { useBabies } from '../context/BabyContext'
import { useSubscription } from '../context/SubscriptionContext'

// TODO: reemplazar por la predicción real del motor de ventanas de sueño, por bebé
const NEXT_WINDOW = {
  start: '14:30',
  end: '15:00',
  idealStart: '14:10',
  idealEnd: '14:40',
  progress: 60,
  status: 'Momento ideal en 45 min',
}

// TODO: reemplazar por la actividad real registrada, por bebé
const RECENT_ACTIVITY = [
  { id: 1, type: 'Sueño', time: '12:00 a 13:30' },
  { id: 2, type: 'Toma', time: '10:15' },
  { id: 3, type: 'Pañal', time: '09:40' },
]

// TODO: reemplazar por la detección real de si el usuario ya tiene registros (backend / estado global)
const hasEntries = true

// TODO: reemplazar por las estadísticas reales del día, por bebé
const TODAY_STATS = {
  napsCount: 3,
  totalSleep: '10h 45m',
  // TODO: definir la lógica real de cálculo de "calidad" del sueño (hoy es un valor mockado)
  quality: '92%',
}

const QUICK_LOG_BUTTONS = [
  { type: 'sueño', label: 'Sueño', Icon: MoonIcon },
  { type: 'toma', label: 'Toma', Icon: BottleIcon },
  { type: 'pañal', label: 'Pañal', Icon: DiaperIcon },
]

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
      <circle cx="12" cy="12" r="4" />
      <path
        strokeLinecap="round"
        d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
      />
    </svg>
  )
}

function ThemeMoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
    </svg>
  )
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5 text-textPrimary">
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  )
}

function typeToModalType(type) {
  return { Sueño: 'sueño', Toma: 'toma', Pañal: 'pañal' }[type]
}

function Dashboard() {
  const [activeModal, setActiveModal] = useState(null)
  const [showPaywall, setShowPaywall] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const { babies, activeBabyId, setActiveBabyId } = useBabies()
  const { isPremium } = useSubscription()

  const activeBaby = babies.find((baby) => baby.id === activeBabyId)
  // TODO: reemplazar por un fallback real (ej. redirigir a onboarding) si no hay bebés cargados
  const babyName = activeBaby?.name ?? 'Sofía'

  function openEditModal(entry) {
    setActiveModal({ type: typeToModalType(entry.type), existingEntry: entry })
  }

  return (
    <div className="px-4 pb-24 pt-8">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold">Hola, {babyName}</h1>
        <button
          onClick={toggleTheme}
          aria-label="Cambiar tema"
          className="flex h-9 w-9 items-center justify-center rounded-button border border-textPrimary/[0.08] bg-surface text-textPrimary transition-colors hover:bg-textPrimary/[0.04]"
        >
          {theme === 'dark' ? <SunIcon /> : <ThemeMoonIcon />}
        </button>
      </div>

      {babies.length > 1 && (
        <div className="mt-4 flex gap-2">
          {babies.map((baby) => (
            <button
              key={baby.id}
              onClick={() => setActiveBabyId(baby.id)}
              className={`rounded-button px-4 py-2 font-body text-sm font-medium transition-colors ${
                baby.id === activeBabyId
                  ? 'bg-brand-gradient text-white'
                  : 'border border-textPrimary/[0.08] bg-surface text-textSecondary hover:text-textPrimary'
              }`}
            >
              {baby.name}
            </button>
          ))}
        </div>
      )}

      <div className="relative mt-6 overflow-hidden rounded-card border border-textPrimary/[0.08] bg-surface p-6">
        {hasEntries ? (
          <>
            <p className="font-body text-xs font-medium uppercase tracking-wider text-textSecondary">
              Próxima siesta
            </p>

            <div className={isPremium ? '' : 'blur-sm'}>
              <div className="mt-2 flex items-start justify-between gap-4">
                <p className="font-display text-4xl font-bold text-textPrimary sm:text-5xl">
                  {NEXT_WINDOW.start} - {NEXT_WINDOW.end}
                </p>
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-gradient text-white">
                  <MoonIcon />
                </div>
              </div>

              <p className="mt-2 font-body text-sm text-textSecondary">
                Ventana ideal {NEXT_WINDOW.idealStart} - {NEXT_WINDOW.idealEnd}
              </p>

              <div className="relative mt-4 h-2 rounded-full bg-background">
                <div
                  className="h-2 rounded-full bg-brand-gradient"
                  style={{ width: `${NEXT_WINDOW.progress}%` }}
                />
              </div>

              <p className="mt-3 font-body text-sm font-medium text-textSecondary">{NEXT_WINDOW.status}</p>
            </div>

            {!isPremium && (
              <button
                onClick={() => setShowPaywall(true)}
                className="absolute inset-0 top-9 flex flex-col items-center justify-center gap-2 bg-surface/60"
              >
                <LockIcon />
                <span className="font-body text-sm font-medium text-textPrimary">Desbloqueá la predicción</span>
              </button>
            )}
          </>
        ) : (
          <p className="font-body text-base font-medium text-textPrimary">
            Registrá el primer sueño para que Somni empiece a aprender el ritmo de {babyName}
          </p>
        )}
      </div>

      <div className="mt-6">
        <p className="font-body text-xs font-medium uppercase tracking-wider text-textSecondary">
          Estado de hoy
        </p>
        <div className="mt-2 grid grid-cols-3 divide-x divide-textPrimary/[0.08] rounded-card border border-textPrimary/[0.08] bg-surface p-6">
          <div className="flex flex-col items-center text-center">
            <p className="font-display text-2xl font-bold text-textPrimary">{TODAY_STATS.napsCount}</p>
            <p className="mt-1 font-body text-xs text-textSecondary">Siestas realizadas</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <p className="font-display text-2xl font-bold text-textPrimary">{TODAY_STATS.totalSleep}</p>
            <p className="mt-1 font-body text-xs text-textSecondary">Sueño total</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <p className="font-display text-2xl font-bold text-textPrimary">{TODAY_STATS.quality}</p>
            <p className="mt-1 font-body text-xs text-textSecondary">Calidad</p>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3">
        {QUICK_LOG_BUTTONS.map(({ type, label, Icon }) => (
          <button
            key={type}
            onClick={() => setActiveModal({ type })}
            className="flex flex-col items-center gap-2 rounded-card bg-surface px-2 py-4 transition-colors hover:bg-textPrimary/[0.04]"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-gradient text-white">
              <Icon />
            </div>
            <span className="font-body text-sm font-medium text-textPrimary">{label}</span>
          </button>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="font-display text-lg font-bold">Actividad reciente</h2>
        {hasEntries ? (
          <div className="mt-4 flex flex-col gap-3">
            {RECENT_ACTIVITY.map((item) => (
              <ActivityItem key={item.id} {...item} onClick={openEditModal} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <MoonIcon className="h-16 w-16 text-textSecondary" />
            <p className="mt-4 max-w-xs font-body text-base text-textSecondary">
              Todavía no registraste nada
            </p>
            <p className="mt-1 max-w-xs font-body text-sm text-textSecondary">
              Usá los botones de arriba para registrar sueño, tomas o pañales
            </p>
          </div>
        )}
      </div>

      {activeModal && (
        <QuickLogModal
          type={activeModal.type}
          existingEntry={activeModal.existingEntry}
          onClose={() => setActiveModal(null)}
        />
      )}

      {showPaywall && <PaywallModal onClose={() => setShowPaywall(false)} />}
    </div>
  )
}

export default Dashboard
