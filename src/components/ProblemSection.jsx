const PROBLEMS = [
  {
    icon: '😢',
    title: 'Llanto que se pudo evitar',
    description: 'Pasar la ventana de sueño hace que el cuerpo libere cortisol, y dormir se vuelve una pelea.',
  },
  {
    icon: '🌙',
    title: 'Noches más largas de lo necesario',
    description: 'Un bebé sobrecansado se despierta más veces y cuesta más volver a dormir.',
  },
  {
    icon: '🤷',
    title: 'Cada día parece distinto',
    description: 'Las horas "típicas" no sirven porque el ritmo de tu bebé cambia semana a semana.',
  },
]

function ProblemSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-12 md:py-24">
      <h2 className="mx-auto max-w-2xl text-center font-display text-2xl font-bold md:text-3xl">
        A las 2 de la mañana, no deberías estar adivinando
      </h2>

      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
        {PROBLEMS.map((problem) => (
          <div
            key={problem.title}
            className="rounded-card border border-textPrimary/[0.08] bg-surface p-8"
          >
            <span className="text-3xl">{problem.icon}</span>
            <h3 className="mt-4 font-display text-lg font-bold">{problem.title}</h3>
            <p className="mt-2 font-body text-sm text-textSecondary">{problem.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default ProblemSection
