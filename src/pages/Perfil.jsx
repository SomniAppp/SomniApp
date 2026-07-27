import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'
import { useAuth } from '../context/AuthContext'
import { useBabies } from '../context/BabyContext'
import { useSubscription } from '../context/SubscriptionContext'
import PaywallModal from '../components/PaywallModal'

function getAgeLabel(birthdate) {
  const birth = new Date(birthdate)
  const today = new Date()
  const days = Math.floor((today - birth) / (1000 * 60 * 60 * 24))

  if (days < 60) {
    const weeks = Math.floor(days / 7)
    return `${weeks} semana${weeks === 1 ? '' : 's'}`
  }

  const months = Math.floor(days / 30)
  return `${months} mes${months === 1 ? '' : 'es'}`
}

// TODO: reemplazar por los datos reales del bebé desde el estado/backend, usado como fallback si no hay bebés cargados
const FALLBACK_BABY = { name: 'Sofía', age: '4 meses' }

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

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="#9B6BF2" strokeWidth="2.5" className="h-5 w-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  )
}

function LogoutIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 17l5-5-5-5M21 12H9" />
    </svg>
  )
}

function Perfil() {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const { signOut } = useAuth()
  const { babies } = useBabies()
  const { isPremium } = useSubscription()
  const [showPaywall, setShowPaywall] = useState(false)

  async function handleLogout() {
    await signOut()
    navigate('/auth')
  }

  return (
    <div className="px-4 pb-24 pt-8">
      <h1 className="font-display text-2xl font-bold">Perfil</h1>

      {babies.length > 0 ? (
        <div className="mt-6 flex flex-col gap-3">
          {babies.map((baby) => (
            <div key={baby.id} className="rounded-card bg-surface p-6">
              <p className="font-display text-xl font-bold">{baby.name}</p>
              <p className="mt-1 font-body text-sm text-textSecondary">{getAgeLabel(baby.birthdate)}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-card bg-surface p-6">
          <p className="font-display text-xl font-bold">{FALLBACK_BABY.name}</p>
          <p className="mt-1 font-body text-sm text-textSecondary">{FALLBACK_BABY.age}</p>
        </div>
      )}

      <div className="mt-6 rounded-card bg-surface p-4">
        {isPremium ? (
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 font-body text-sm font-medium text-textPrimary">
              Plan: Premium
              <CheckIcon />
            </span>
            <button className="font-body text-sm text-textSecondary hover:text-textPrimary">
              Gestionar suscripción
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <span className="font-body text-sm font-medium text-textPrimary">Plan: Gratis</span>
            <button
              onClick={() => setShowPaywall(true)}
              className="rounded-button bg-brand-gradient px-4 py-2 font-body text-sm font-medium text-white transition-[filter] hover:brightness-110"
            >
              Actualizar a Premium
            </button>
          </div>
        )}
      </div>

      <div className="mt-6 flex flex-col gap-3">
        <button
          onClick={toggleTheme}
          className="flex items-center justify-between rounded-card bg-surface p-4 text-left"
        >
          <span className="font-body text-sm font-medium text-textPrimary">Tema</span>
          <span className="flex items-center gap-2 font-body text-sm text-textSecondary">
            {theme === 'dark' ? 'Oscuro' : 'Claro'}
            {theme === 'dark' ? <MoonIcon /> : <SunIcon />}
          </span>
        </button>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 rounded-card bg-surface p-4 text-left text-textSecondary hover:text-textPrimary"
        >
          <LogoutIcon />
          <span className="font-body text-sm font-medium">Cerrar sesión</span>
        </button>
      </div>

      {showPaywall && <PaywallModal onClose={() => setShowPaywall(false)} />}
    </div>
  )
}

export default Perfil
