function scrollToPricing() {
  document.querySelector('#precios')?.scrollIntoView({ behavior: 'smooth' })
}

function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-12 md:py-32">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="font-display text-3xl font-bold leading-tight md:text-5xl">
          Sabé exactamente cuándo tu bebé necesita dormir
        </h1>
        <p className="mx-auto mt-6 max-w-xl font-body text-lg text-textSecondary">
          Nada de adivinar la hora ni de noches de llanto por dormir tarde. Somni
          aprende el ritmo de tu bebé y te avisa el momento justo, antes de que se
          pase la ventana de sueño.
        </p>
        <div className="mt-10">
          <button
            onClick={scrollToPricing}
            className="rounded-button bg-brand-gradient px-8 py-4 font-body text-base font-medium text-white shadow-[0_8px_30px_-8px_rgba(155,107,242,0.6)] transition-[filter] hover:brightness-110"
          >
            Comprar acceso — $9.90
          </button>
        </div>
        <div className="mx-auto mt-20 max-w-xl">
          <div className="relative h-2 rounded-full bg-brand-gradient">
            <div className="absolute left-1/2 top-1/2 z-10 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-[#1a1a2e] bg-white shadow-[0_0_16px_4px_rgba(255,255,255,0.5)]" />
          </div>
          <div className="mt-3 flex justify-between font-body text-xs text-textSecondary">
            <span>Muy temprano</span>
            <span>Momento ideal</span>
            <span>Tarde</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
