function CryIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
      <circle cx="12" cy="12" r="9" />
      <path strokeLinecap="round" d="M8 15c1.2-1.2 2.8-1.2 4 0M9 9h.01M15 9h.01" />
      <path strokeLinecap="round" d="M7 17l1 2M17 17l-1 2" />
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
      <circle cx="12" cy="12" r="9" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 3" />
    </svg>
  )
}

function WaveIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12c1.5-3 3.5-3 5 0s3.5 3 5 0 3.5-3 5 0 3.5 3 5 0" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 17c1.5-3 3.5-3 5 0s3.5 3 5 0 3.5-3 5 0 3.5 3 5 0" />
    </svg>
  )
}

const PROBLEMS = [
  {
    Icon: CryIcon,
    title: 'Llanto evitable',
    text: 'Cuando un bebé se pasa de cansado, cuesta mucho más dormirlo — y eso se traduce en más llanto para todos.',
  },
  {
    Icon: ClockIcon,
    title: 'Noches más largas',
    text: 'Perderse el momento justo no solo complica la siesta: también afecta cómo duerme esa noche.',
  },
  {
    Icon: WaveIcon,
    title: 'Un patrón que cambia cada semana',
    text: 'Lo que funcionaba el mes pasado ya no sirve. El ritmo de sueño de tu bebé se mueve constantemente.',
  },
]

function ProblemSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-12 md:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-2xl font-bold md:text-3xl">
          ¿Por qué buscás en Google a las 2 AM y seguís sin respuesta?
        </h2>
        <p className="mt-6 font-body text-lg text-textSecondary">
          Las tablas fijas por edad — lo que usan la mayoría de las apps y
          consejos que encontrás — ignoran que el patrón de sueño de cada
          bebé cambia semana a semana. No es que te falte esfuerzo: es que
          la herramienta correcta no existe para la mayoría de los padres.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
        {PROBLEMS.map(({ Icon, title, text }) => (
          <div key={title} className="rounded-card bg-surface p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-gradient text-white">
              <Icon />
            </div>
            <h3 className="mt-4 font-display text-lg font-bold">{title}</h3>
            <p className="mt-2 font-body text-sm text-textSecondary">{text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default ProblemSection
