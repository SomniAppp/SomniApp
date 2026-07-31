import CTAButton from './CTAButton'
import LaunchBadge from './LaunchBadge'

function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-12 md:py-32">
      <div className="mx-auto max-w-3xl text-center">
        <p className="font-body text-sm uppercase tracking-widest text-textSecondary">
          Lo que ningún calculador de horarios te dice:
        </p>
        <h1 className="mt-4 font-display text-3xl font-bold leading-tight md:text-5xl">
          No es hambre. No es el pañal. Es que se pasó su ventana de sueño —
          y nadie te avisó.
        </h1>
        <p className="mx-auto mt-6 max-w-xl font-body text-lg text-textSecondary">
          Los horarios fijos por edad no funcionan porque el ritmo de tu bebé
          cambia cada semana. Somni aprende el patrón real, no una tabla
          genérica.
        </p>
        <div className="mt-10 flex flex-col items-center gap-3">
          <CTAButton />
          <p className="font-body text-xs text-textSecondary">
            Se abre en una página segura de pago (Hotmart). Volvés acá para crear tu cuenta.
          </p>
          <LaunchBadge />
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
      </div>
    </section>
  )
}

export default Hero
