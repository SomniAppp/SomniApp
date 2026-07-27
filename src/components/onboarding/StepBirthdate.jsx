function StepBirthdate({ isTwins, names, birthdate, onChange, onNext, onBack }) {
  const headline = isTwins
    ? `¿Cuándo nacieron ${names[0]} y ${names[1]}?`
    : `¿Cuándo nació ${names[0]}?`

  return (
    <div>
      <h1 className="font-display text-2xl font-bold md:text-3xl">{headline}</h1>
      <p className="mt-2 font-body text-sm text-textSecondary">
        Usamos la edad para calcular las ventanas de sueño correctas.
      </p>

      <input
        type="date"
        value={birthdate}
        onChange={(event) => onChange(event.target.value)}
        max={new Date().toISOString().split('T')[0]}
        className="mt-8 w-full rounded-button border border-textPrimary/[0.08] bg-surface px-4 py-3 font-body text-base text-textPrimary outline-none focus:border-[#9B6BF2]"
      />

      <button
        onClick={onNext}
        disabled={!birthdate}
        className="mt-6 w-full rounded-button bg-brand-gradient px-6 py-3 font-body text-base font-medium text-white transition-[filter] hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:brightness-100"
      >
        Continuar
      </button>

      <button
        onClick={onBack}
        className="mt-4 w-full font-body text-sm text-textSecondary hover:text-textPrimary"
      >
        Atrás
      </button>
    </div>
  )
}

export default StepBirthdate
