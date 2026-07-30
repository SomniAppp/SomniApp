function BookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 shrink-0">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5v-15Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 20.5A2.5 2.5 0 0 1 6.5 18H20" />
    </svg>
  )
}

function CredibilityNote() {
  return (
    <p className="mx-auto flex max-w-md items-center justify-center gap-2 px-6 py-6 text-center font-body text-sm text-textSecondary">
      <BookIcon />
      Basado en datos públicos de pediatría sobre ventanas de sueño por edad — no en adivinanzas.
    </p>
  )
}

export default CredibilityNote
