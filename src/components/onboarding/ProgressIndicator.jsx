const TOTAL_STEPS = 3

function ProgressIndicator({ step }) {
  return (
    <div className="flex items-center justify-center gap-2">
      {Array.from({ length: TOTAL_STEPS }, (_, index) => index + 1).map((dot) => (
        <span
          key={dot}
          className={`h-1.5 w-8 rounded-full transition-colors ${
            dot <= step ? 'bg-brand-gradient' : 'bg-surface'
          }`}
        />
      ))}
    </div>
  )
}

export default ProgressIndicator
