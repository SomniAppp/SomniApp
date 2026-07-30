import { MoonIcon, BottleIcon, DiaperIcon } from '../activityIcons'

// Static clone of QuickLogModal (src/components/QuickLogModal.jsx, type="sueño")
// with fixed sample state, for use as a real-UI screenshot on the landing page.
// Backdrop mimics the Dashboard's quick-log buttons the modal opens over.
function QuickLogDemo() {
  return (
    <div className="flex h-full flex-col justify-end p-2">
      <div className="flex flex-1 items-start justify-center gap-3 pt-10">
        {[MoonIcon, BottleIcon, DiaperIcon].map((Icon, index) => (
          <div
            key={index}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-gradient text-white opacity-40"
          >
            <Icon className="h-5 w-5" />
          </div>
        ))}
      </div>

      <div className="rounded-t-card bg-surface p-5 pb-6">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-bold">Registrar sueño</h2>
          <div className="flex h-7 w-7 items-center justify-center rounded-button text-textSecondary">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
              <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
            </svg>
          </div>
        </div>

        <div className="mt-5 flex gap-2">
          <div className="flex-1 rounded-button border border-transparent bg-brand-gradient px-3 py-2.5 text-center font-body text-sm font-medium text-white">
            Empezó ahora
          </div>
          <div className="flex-1 rounded-button border border-textPrimary/[0.08] bg-background px-3 py-2.5 text-center font-body text-sm font-medium text-textSecondary">
            Manualmente
          </div>
        </div>

        <div className="mt-6 w-full rounded-button bg-brand-gradient px-6 py-2.5 text-center font-body text-sm font-medium text-white">
          Guardar
        </div>
      </div>
    </div>
  )
}

export default QuickLogDemo
