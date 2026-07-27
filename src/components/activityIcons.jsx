export function MoonIcon({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
    </svg>
  )
}

export function BottleIcon({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 2h6M10 2v3.5L8 8v11a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V8l-2-2.5V2" />
      <path strokeLinecap="round" d="M8 13h8" />
    </svg>
  )
}

export function DiaperIcon({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 5h16v6a8 8 0 0 1-16 0V5Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 5c2 2 14 2 16 0" />
    </svg>
  )
}

export const ACTIVITY_ICONS = {
  Sueño: MoonIcon,
  Toma: BottleIcon,
  Pañal: DiaperIcon,
}

export function ActivityItem({ type, time, onClick, ...entry }) {
  const Icon = ACTIVITY_ICONS[type]
  return (
    <button
      type="button"
      onClick={() => onClick?.({ type, time, ...entry })}
      className="flex w-full items-center gap-3 rounded-card bg-surface p-4 text-left transition-colors hover:bg-textPrimary/[0.04]"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-gradient text-white">
        <Icon />
      </div>
      <div>
        <p className="font-body text-sm font-medium text-textPrimary">{type}</p>
        <p className="font-body text-xs text-textSecondary">{time}</p>
      </div>
    </button>
  )
}
