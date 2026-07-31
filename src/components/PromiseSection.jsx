const CHART_WIDTH = 520
const CHART_HEIGHT = 180
const FIXED_TABLE_Y = 110
const SOMNI_POINTS = [150, 60, 95, 40, 130, 55, 100]

function pointsToPath(values) {
  const step = CHART_WIDTH / (values.length - 1)
  return values.map((y, i) => `${i === 0 ? 'M' : 'L'} ${i * step} ${y}`).join(' ')
}

function ComparisonChart() {
  const somniPath = pointsToPath(SOMNI_POINTS)
  return (
    <div className="mx-auto mt-10 max-w-2xl rounded-card border border-textPrimary/[0.08] bg-surface p-6 md:p-8">
      <svg viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`} className="w-full" role="img" aria-label="Comparación entre tabla fija por edad y predicción Somni">
        <line
          x1="0"
          y1={FIXED_TABLE_Y}
          x2={CHART_WIDTH}
          y2={FIXED_TABLE_Y}
          stroke="currentColor"
          className="text-textSecondary"
          strokeWidth="2"
          strokeDasharray="6 6"
        />
        <path d={somniPath} fill="none" stroke="url(#somni-line-gradient)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <defs>
          <linearGradient id="somni-line-gradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#4A7FFF" />
            <stop offset="50%" stopColor="#9B6BF2" />
            <stop offset="100%" stopColor="#F5A94E" />
          </linearGradient>
        </defs>
      </svg>
      <div className="mt-4 flex justify-center gap-6 font-body text-xs text-textSecondary">
        <span className="flex items-center gap-2">
          <span className="h-0.5 w-4 bg-textSecondary" style={{ borderTop: '2px dashed currentColor' }} />
          Tabla fija por edad
        </span>
        <span className="flex items-center gap-2">
          <span className="h-1 w-4 rounded-full bg-brand-gradient" />
          Predicción Somni
        </span>
      </div>
    </div>
  )
}

function PromiseSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-12 md:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-2xl font-bold md:text-3xl">
          Predicción, no una tabla genérica.
        </h2>

        <h3 className="mt-10 font-display text-xl font-bold">
          La ciencia detrás del momento justo
        </h3>
        <p className="mt-4 font-body text-base text-textSecondary">
          Mientras tu bebé está despierto, su cerebro acumula adenosina, una
          sustancia que genera la necesidad biológica de dormir — es lo que
          se conoce como presión de sueño. Cuanto más tiempo pasa despierto,
          más se acumula.
        </p>
        <p className="mt-4 font-body text-base text-textSecondary">
          Si se pasa la ventana ideal, el cuerpo entra en alerta y libera
          cortisol — por eso un bebé sobrecansado duerme peor, no mejor.
        </p>
        <p className="mt-4 font-body text-base text-textSecondary">
          Este mecanismo es real. Lo que varía de bebé a bebé es exactamente
          cuándo se cumple esa ventana — por eso Somni no usa una tabla fija:
          usa el patrón real de tu bebé, actualizado semana a semana.
        </p>
        <p className="mt-4 font-body text-xs text-textSecondary">
          Fuente:{' '}
          <a
            href="https://www.sleepfoundation.org/baby-sleep/newborn-wake-windows"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-textPrimary"
          >
            Sleep Foundation
          </a>
        </p>
      </div>

      <ComparisonChart />

      <p className="mx-auto mt-8 max-w-md text-center font-body text-sm text-textSecondary">
        Una tabla te dice lo "normal" para bebés de 4 meses. Somni te dice lo
        normal para tu bebé, esta semana.
      </p>
    </section>
  )
}

export default PromiseSection
