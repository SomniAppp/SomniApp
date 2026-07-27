function ToggleButton({ active, children, ...props }) {
  return (
    <button
      type="button"
      className={`flex-1 rounded-button border px-4 py-3 font-body text-sm font-medium transition-colors ${
        active
          ? 'border-transparent bg-brand-gradient text-white'
          : 'border-textPrimary/[0.08] bg-surface text-textSecondary hover:text-textPrimary'
      }`}
      {...props}
    >
      {children}
    </button>
  )
}

function StepName({ isTwins, onToggleTwins, names, onChangeName, onNext }) {
  const canContinue = isTwins
    ? names[0].trim() && names[1].trim()
    : names[0].trim()

  return (
    <div>
      <div className="flex gap-3">
        <ToggleButton active={!isTwins} onClick={() => onToggleTwins(false)}>
          Bebé único
        </ToggleButton>
        <ToggleButton active={isTwins} onClick={() => onToggleTwins(true)}>
          Mellizos o gemelos
        </ToggleButton>
      </div>

      <h1 className="mt-6 font-display text-2xl font-bold md:text-3xl">
        {isTwins ? '¿Cómo se llaman tus mellizos?' : '¿Cómo se llama tu bebé?'}
      </h1>
      <p className="mt-2 font-body text-sm text-textSecondary">
        Así vamos a personalizar todo para tu bebé.
      </p>

      <input
        type="text"
        value={names[0]}
        onChange={(event) => onChangeName(0, event.target.value)}
        placeholder={isTwins ? 'Nombre del primer bebé' : 'Nombre del bebé'}
        className="mt-8 w-full rounded-button border border-textPrimary/[0.08] bg-surface px-4 py-3 font-body text-base text-textPrimary outline-none placeholder:text-textSecondary focus:border-[#9B6BF2]"
      />

      {isTwins && (
        <input
          type="text"
          value={names[1]}
          onChange={(event) => onChangeName(1, event.target.value)}
          placeholder="Nombre del segundo bebé"
          className="mt-4 w-full rounded-button border border-textPrimary/[0.08] bg-surface px-4 py-3 font-body text-base text-textPrimary outline-none placeholder:text-textSecondary focus:border-[#9B6BF2]"
        />
      )}

      <button
        onClick={onNext}
        disabled={!canContinue}
        className="mt-6 w-full rounded-button bg-brand-gradient px-6 py-3 font-body text-base font-medium text-white transition-[filter] hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:brightness-100"
      >
        Continuar
      </button>
    </div>
  )
}

export default StepName
