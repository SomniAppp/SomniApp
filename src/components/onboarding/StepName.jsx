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

function StepName({ isTwins, onToggleTwins, names, onChangeName, parentName, onChangeParentName, onNext }) {
  const canContinue = isTwins
    ? parentName.trim() && names[0].trim() && names[1].trim()
    : parentName.trim() && names[0].trim()

  return (
    <div>
      <h1 className="font-display text-2xl font-bold md:text-3xl">Antes que nada, ¿cómo te llamás?</h1>

      <input
        type="text"
        value={parentName}
        onChange={(event) => onChangeParentName(event.target.value)}
        placeholder="Tu nombre"
        className="mt-6 w-full rounded-button border border-textPrimary/[0.08] bg-surface px-4 py-3 font-body text-base text-textPrimary outline-none placeholder:text-textSecondary focus:border-[#9B6BF2]"
      />

      <div className="mt-8 border-t border-textPrimary/[0.08] pt-8">
        <div className="flex gap-3">
          <ToggleButton active={!isTwins} onClick={() => onToggleTwins(false)}>
            Bebé único
          </ToggleButton>
          <ToggleButton active={isTwins} onClick={() => onToggleTwins(true)}>
            Mellizos o gemelos
          </ToggleButton>
        </div>

        <h2 className="mt-6 font-display text-xl font-bold md:text-2xl">
          {isTwins ? '¿Y tus mellizos?' : '¿Y tu bebé?'}
        </h2>
        <p className="mt-2 font-body text-sm text-textSecondary">
          Así vamos a personalizar todo para tu bebé.
        </p>
      </div>

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
