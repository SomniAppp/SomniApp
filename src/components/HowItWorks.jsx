const STEPS = [
  {
    number: '1',
    title: 'Registrá',
    description: 'Anotá las siestas, las tomas y los despertares en segundos, directo desde el celular.',
  },
  {
    number: '2',
    title: 'Recibí la predicción',
    description: 'Somni aprende el ritmo de tu bebé y te avisa la próxima ventana de sueño ideal.',
  },
  {
    number: '3',
    title: 'Preguntá lo que quieras',
    description: 'Chateá con una IA que conoce el historial de tu bebé y responde tus dudas al instante.',
  },
]

function HowItWorks() {
  return (
    <section id="como-funciona" className="mx-auto max-w-6xl px-6 pt-12 pb-8 md:pt-24 md:pb-16">
      <h2 className="text-center font-display text-2xl font-bold md:text-3xl">Cómo funciona</h2>

      <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-3">
        {STEPS.map((step) => (
          <div key={step.number} className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-gradient font-display text-lg font-bold text-white">
              {step.number}
            </div>
            <h3 className="mt-4 font-display text-lg font-bold">{step.title}</h3>
            <p className="mt-2 font-body text-sm text-textSecondary">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default HowItWorks
