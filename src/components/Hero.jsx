import CTAButton from './CTAButton'

function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-12 md:py-32">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="font-display text-3xl font-bold leading-tight md:text-5xl">
          Tu bebé no llora porque no quiere dormir.
          <br />
          Llora porque la ventana de sueño ya pasó.
        </h1>
        <p className="mx-auto mt-6 max-w-xl font-body text-lg text-textSecondary">
          Somni predice el momento exacto en que tu bebé debe dormir, antes
          de que aparezcan el llanto, el cansancio excesivo y las largas
          noches sin descanso.
        </p>
        <p className="mx-auto mt-4 max-w-xl font-body text-base text-textSecondary">
          Con solo registrar cuándo se despierta, la inteligencia de Somni
          calcula automáticamente su próxima ventana de sueño y te avisa en
          el momento ideal para acostarlo.
        </p>
        <p className="mx-auto mt-4 max-w-xl font-body text-base text-textSecondary">
          Así, tu bebé se duerme más rápido, con menos estrés para él... y
          mucho más descanso para toda la familia.
        </p>
        <div className="mt-10 flex flex-col items-center gap-3">
          <CTAButton />
          <p className="font-body text-sm text-textSecondary">
            Cancela cuando quieras. Sin contratos.
          </p>
        </div>
        <div className="mx-auto mt-20 max-w-xl">
          <div className="relative h-2 rounded-full bg-brand-gradient">
            <div className="animate-sleep-window absolute top-1/2 z-10 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-background bg-white shadow-[0_0_16px_4px_rgba(255,255,255,0.5)]" />
          </div>
          <div className="mt-3 flex justify-between font-body text-xs text-textSecondary">
            <span>Muy temprano</span>
            <span>Momento ideal</span>
            <span>Tarde</span>
          </div>
        </div>
        <p className="mx-auto mt-10 max-w-md font-body text-sm text-textSecondary">
          💜 Tu consultor de sueño por solo <span className="font-medium text-textPrimary">$0,26 al día</span>. Mientras
          una consulta de sueño puede costar cientos de dólares, Somni está
          disponible todos los días, las 24 horas, directamente en tu
          teléfono.
        </p>
      </div>
    </section>
  )
}

export default Hero
