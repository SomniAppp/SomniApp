function ScienceIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 2h6M10 2v6l-5 9a2 2 0 0 0 1.8 3h10.4a2 2 0 0 0 1.8-3l-5-9V2" />
      <path strokeLinecap="round" d="M8 15h8" />
    </svg>
  )
}

function NoRecurringIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
      <rect x="3" y="6" width="18" height="14" rx="2" />
      <path strokeLinecap="round" d="M3 10h18M7 3v4" />
      <path strokeLinecap="round" d="M8 15l8-4" />
    </svg>
  )
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
      <rect x="4" y="11" width="16" height="9" rx="2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}

const REASONS = [
  {
    Icon: ScienceIcon,
    text: 'Basado en ciencia del sueño infantil — no en adivinanzas',
  },
  {
    Icon: NoRecurringIcon,
    text: 'Sin mensualidades — pagás una vez, accedés para siempre',
  },
  {
    Icon: LockIcon,
    text: 'Tu información es privada — nunca compartimos los datos de tu bebé',
  },
]

function ProofSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-12 md:py-24">
      <h2 className="mx-auto mb-12 max-w-2xl text-center font-display text-2xl font-bold md:text-3xl">
        Por qué confiar en Somni
      </h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {REASONS.map(({ Icon, text }) => (
          <div key={text} className="rounded-card bg-surface p-6 text-center">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-brand-gradient text-white">
              <Icon />
            </div>
            <p className="mt-4 font-body text-sm text-textPrimary">{text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default ProofSection
