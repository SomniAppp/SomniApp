import { useEffect, useState } from 'react'
import { MoonIcon } from './activityIcons'

function formatElapsed(startIso, now) {
  const totalSeconds = Math.max(0, Math.floor((now - new Date(startIso)) / 1000))
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60
  if (hours > 0) {
    return `${hours}h ${String(minutes).padStart(2, '0')}m`
  }
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

function SleepCycleView({ activeSleepStart, onEndSession, ending }) {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  const startTime = new Date(activeSleepStart)
  const startLabel = `${String(startTime.getHours()).padStart(2, '0')}:${String(startTime.getMinutes()).padStart(2, '0')}`

  return (
    <div className="flex flex-col items-center rounded-card border border-textPrimary/[0.08] bg-surface p-6 text-center">
      <p className="font-body text-xs font-medium uppercase tracking-wider text-textSecondary">
        Durmiendo desde las {startLabel}
      </p>

      <div className="relative mt-6 flex h-40 w-40 items-center justify-center">
        <div className="absolute inset-0 animate-pulse rounded-full bg-brand-gradient opacity-20" />
        <div className="absolute inset-3 rounded-full border-2 border-textPrimary/[0.08]" />
        <div className="flex h-28 w-28 flex-col items-center justify-center rounded-full bg-brand-gradient text-white shadow-[0_8px_30px_-8px_rgba(155,107,242,0.6)]">
          <MoonIcon className="h-6 w-6" />
          <p className="mt-2 font-display text-xl font-bold">{formatElapsed(activeSleepStart, now)}</p>
        </div>
      </div>

      <button
        onClick={onEndSession}
        disabled={ending}
        className="mt-6 w-full rounded-button bg-brand-gradient px-6 py-3 font-body text-base font-medium text-white transition-[filter] hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {ending ? 'Guardando...' : 'Terminar siesta'}
      </button>
    </div>
  )
}

export default SleepCycleView
