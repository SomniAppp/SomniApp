// Provisional visual block. Replace `testimonials` with real testimonial objects
// ({ name, text, photo? }) once available, and swap the JSX below for a
// testimonial-card grid — the section wrapper/heading can stay as-is.
const testimonials = null

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
    <div className="mx-auto mt-10 max-w-2xl rounded-card border border-textPrimary/[0.08] bg-surface p-8">
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

function TestimonialGrid({ items }) {
  return (
    <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
      {items.map((testimonial) => (
        <div
          key={testimonial.name}
          className="rounded-card border border-textPrimary/[0.08] bg-surface p-8"
        >
          {testimonial.photo && (
            <img
              src={testimonial.photo}
              alt={testimonial.name}
              className="h-12 w-12 rounded-full object-cover"
            />
          )}
          <p className="mt-4 font-body text-sm text-textPrimary">"{testimonial.text}"</p>
          <p className="mt-4 font-body text-sm font-medium text-textSecondary">
            {testimonial.name}
          </p>
        </div>
      ))}
    </div>
  )
}

function ProofSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-12 md:py-24">
      <h2 className="mx-auto mb-6 max-w-2xl text-center font-display text-2xl font-bold md:text-3xl">
        ¿Por qué funciona la predicción y no una tabla fija por edad?
      </h2>

      <ComparisonChart />

      <p className="mx-auto mt-8 max-w-md text-center font-body text-sm text-textSecondary">
        Una tabla te dice lo "normal" para bebés de 4 meses. Somni te dice lo
        normal para tu bebé, esta semana.
      </p>

      {testimonials && testimonials.length > 0 && <TestimonialGrid items={testimonials} />}
    </section>
  )
}

export default ProofSection
