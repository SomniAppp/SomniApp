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

function StepConfirmation({ isTwins, names, birthdate, onFinish }) {
  const ageLabel = getAgeLabel(birthdate)

  return (
    <div className="text-center">
      <h1 className="font-display text-2xl font-bold md:text-3xl">¡Todo listo!</h1>
      <p className="mt-2 font-body text-sm text-textSecondary">
        Ya podemos empezar a calcular las ventanas de sueño de tu bebé.
      </p>

      <div className="mx-auto mt-8 flex h-16 w-16 items-center justify-center rounded-full bg-brand-gradient">
        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="h-8 w-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>

      {isTwins ? (
        <div className="mt-8 flex gap-3">
          {names.map((name) => (
            <div key={name} className="flex-1 rounded-card border border-textPrimary/[0.08] bg-surface p-6">
              <p className="font-display text-xl font-bold">{name}</p>
              <p className="mt-1 font-body text-sm text-textSecondary">{ageLabel}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-card border border-textPrimary/[0.08] bg-surface p-6">
          <p className="font-display text-xl font-bold">{names[0]}</p>
          <p className="mt-1 font-body text-sm text-textSecondary">{ageLabel}</p>
        </div>
      )}

      <button
        onClick={onFinish}
        className="mt-8 w-full rounded-button bg-brand-gradient px-6 py-3 font-body text-base font-medium text-white transition-[filter] hover:brightness-110"
      >
        Empezar a registrar
      </button>
    </div>
  )
}

export default StepConfirmation
