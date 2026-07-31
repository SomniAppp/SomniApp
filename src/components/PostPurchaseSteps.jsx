function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-10 w-10 text-white">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
    </svg>
  )
}

function PostPurchaseSteps() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-12 text-center md:py-16">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-gradient">
        <ShieldIcon />
      </div>
      <h2 className="mt-6 font-display text-2xl font-bold md:text-3xl">
        Pruébalo sin riesgo
      </h2>
      <p className="mt-2 font-body text-lg font-medium text-textPrimary">
        Garantía de devolución de 7 días
      </p>
      <p className="mx-auto mt-4 max-w-xl font-body text-base text-textSecondary">
        Queremos que pruebes Somni con total tranquilidad. Si durante los
        primeros 7 días sientes que la aplicación no es para ti, solo
        contáctanos y te devolveremos el 100% de tu dinero.
      </p>
      <p className="mt-4 font-body text-base text-textSecondary">
        Sin preguntas complicadas. Sin riesgos. Solo queremos que descubras
        cómo se siente dormir con más tranquilidad.
      </p>
    </section>
  )
}

export default PostPurchaseSteps
