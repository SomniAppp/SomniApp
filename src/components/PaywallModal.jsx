import { useEffect, useState } from 'react'
import { useSubscription } from '../context/SubscriptionContext'

const FEATURES = [
  'Predicción de la próxima ventana de sueño',
  'Chat con IA sobre el historial de tu bebé',
  'Recordatorios personalizados',
]

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="h-6 w-6">
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-0.5 h-5 w-5 shrink-0 text-textSecondary">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  )
}

function PaywallModal({ onClose }) {
  const { togglePremium } = useSubscription()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const frame = requestAnimationFrame(() => setVisible(true))
    return () => cancelAnimationFrame(frame)
  }, [])

  function handleClose() {
    setVisible(false)
    setTimeout(onClose, 200)
  }

  function handleGetLifetimeAccess() {
    // TODO: reemplazar por la integración real de pago único (Stripe, etc.) cuando exista
    togglePremium(true)
    handleClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center md:items-center">
      <div
        className={`absolute inset-0 bg-black/50 transition-opacity duration-200 ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={handleClose}
      />

      <div
        className={`relative w-full max-w-md rounded-t-card bg-surface p-6 pb-8 text-center transition-transform duration-200 md:rounded-card md:pb-6 ${
          visible ? 'translate-y-0' : 'translate-y-full md:translate-y-0 md:opacity-0'
        }`}
      >
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-gradient">
          <LockIcon />
        </div>

        <h2 className="mt-4 font-display text-xl font-bold text-textPrimary">
          Desbloqueá Somni Premium
        </h2>

        <ul className="mt-6 space-y-3 text-left">
          {FEATURES.map((feature) => (
            <li key={feature} className="flex items-start gap-3 font-body text-sm text-textPrimary">
              <CheckIcon />
              {feature}
            </li>
          ))}
        </ul>

        <p className="mt-6 font-display text-3xl font-bold text-textPrimary">$9.90</p>
        <p className="mt-1 font-body text-sm text-textSecondary">Pago único, acceso de por vida</p>

        <button
          onClick={handleGetLifetimeAccess}
          className="mt-6 w-full rounded-button bg-brand-gradient px-6 py-3 font-body text-base font-medium text-white transition-[filter] hover:brightness-110"
        >
          Obtener acceso de por vida
        </button>

        <button
          onClick={handleClose}
          className="mt-4 w-full font-body text-sm text-textSecondary hover:text-textPrimary"
        >
          Ahora no
        </button>
      </div>
    </div>
  )
}

export default PaywallModal
