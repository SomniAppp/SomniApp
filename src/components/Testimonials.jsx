function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 text-[#F5A94E]">
      <path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.3 5.9 20.6l1.4-6.8-5.1-4.7 6.9-.8L12 2z" />
    </svg>
  )
}

const TESTIMONIALS = [
  {
    quote:
      'Antes pasábamos casi una hora intentando dormir a mi hijo. Con Somni empezamos a acostarlo antes de que estuviera demasiado cansado y ahora todo es mucho más tranquilo.',
    author: 'María G.',
    location: 'Ciudad de México, México',
  },
  {
    quote:
      'Pensé que era normal que llorara todas las noches. Cuando empecé a seguir las alertas de Somni, entendí que simplemente llegábamos tarde a la hora de dormir.',
    author: 'Laura C.',
    location: 'Medellín, Colombia',
  },
  {
    quote:
      'Lo mejor no es solo que mi bebé duerma mejor. Nosotros también volvimos a descansar. Se nota el cambio en toda la familia.',
    author: 'Camila R.',
    location: 'Santiago, Chile',
  },
]

function Testimonials() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-12 md:py-24">
      <h2 className="mx-auto max-w-2xl text-center font-display text-2xl font-bold md:text-3xl">
        Millones de padres saben que el momento lo cambia todo.
      </h2>
      <p className="mx-auto mt-4 max-w-xl text-center font-body text-lg text-textSecondary">
        Lo que dicen algunas familias que probaron Somni
      </p>

      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
        {TESTIMONIALS.map(({ quote, author, location }) => (
          <div key={author} className="flex flex-col rounded-card bg-surface p-6">
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon key={i} />
              ))}
            </div>
            <p className="mt-4 flex-1 font-body text-sm text-textPrimary">“{quote}”</p>
            <p className="mt-4 font-body text-sm font-medium text-textPrimary">{author}</p>
            <p className="font-body text-xs text-textSecondary">{location}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Testimonials
