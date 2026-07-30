import { MoonIcon } from '../activityIcons'

// Static clone of the Dashboard prediction card (src/pages/Dashboard.jsx) with
// sample data, for use as a real-UI screenshot on the landing page.
const NEXT_WINDOW = {
  start: '14:30',
  end: '15:00',
  idealStart: '14:10',
  idealEnd: '14:40',
  progress: 60,
  status: 'Momento ideal en 45 min',
}

function PredictionCardDemo({ highlight = false }) {
  return (
    <div className="p-4">
      <p className="font-body text-xs font-medium uppercase tracking-wider text-textSecondary">
        Próxima siesta
      </p>

      <div
        className={
          highlight
            ? 'mt-2 rounded-2xl p-3 shadow-[0_0_40px_-8px_rgba(155,107,242,0.55)] ring-1 ring-[#9B6BF2]/30'
            : 'mt-2'
        }
      >
        <div className="flex items-start justify-between gap-4">
          <p className="font-display text-3xl font-bold text-textPrimary">
            {NEXT_WINDOW.start} - {NEXT_WINDOW.end}
          </p>
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-gradient text-white">
            <MoonIcon className="h-5 w-5" />
          </div>
        </div>

        <p className="mt-2 font-body text-sm text-textSecondary">
          Ventana ideal {NEXT_WINDOW.idealStart} - {NEXT_WINDOW.idealEnd}
        </p>

        <div className="relative mt-4 h-2 rounded-full bg-background">
          <div
            className="h-2 rounded-full bg-brand-gradient"
            style={{ width: `${NEXT_WINDOW.progress}%` }}
          />
        </div>

        <p className="mt-3 font-body text-sm font-medium text-textSecondary">{NEXT_WINDOW.status}</p>
      </div>
    </div>
  )
}

export default PredictionCardDemo
