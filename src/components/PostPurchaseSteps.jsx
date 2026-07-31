const STEPS = [
  { number: '1', text: 'Pagás en Hotmart (proceso seguro, 1 minuto)' },
  { number: '2', text: 'Creás tu cuenta con el mismo email de la compra' },
  { number: '3', text: 'Empezás a usar Somni al instante' },
]

function PostPurchaseSteps() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-12 md:py-16">
      <h2 className="text-center font-display text-2xl font-bold md:text-3xl">
        Qué pasa después de comprar
      </h2>

      <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
        {STEPS.map(({ number, text }) => (
          <div key={number} className="text-center">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-brand-gradient font-display text-base font-bold text-white">
              {number}
            </div>
            <p className="mt-4 font-body text-sm text-textPrimary">{text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default PostPurchaseSteps
