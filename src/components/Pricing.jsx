import CTAButton from './CTAButton'
import LaunchBadge from './LaunchBadge'

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 shrink-0">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.5 12l1.8 1.8L14.5 10" />
    </svg>
  )
}

const FEATURES = [
  'Sabés la próxima hora de dormir antes de que tu bebé se ponga a llorar',
  'Preguntás cualquier duda a las 2 AM y recibís respuesta al instante',
  'Registrás sueño, tomas y pañales en segundos, sin límite',
  'Funciona igual de bien con uno o dos bebés',
  'Ves el progreso de tu bebé semana a semana',
]

function Pricing() {
  return (
    <section id="precios" className="mx-auto max-w-6xl px-6 pt-8 pb-12 md:pt-16 md:pb-24">
      <h2 className="mx-auto max-w-2xl text-center font-display text-2xl font-bold md:text-3xl">
        Un pago. Acceso completo. Para siempre.
      </h2>

      <div className="mx-auto mt-12 max-w-md rounded-card bg-brand-gradient p-[1.5px]">
        <div className="rounded-card bg-surface p-8 text-center">
          <LaunchBadge />
          <p className="mt-4 font-body text-sm font-medium text-textSecondary">Pago único</p>
          <p className="mt-2 font-display text-4xl font-bold">$9.90</p>
          <p className="mt-1 font-body text-sm text-textSecondary">Acceso de por vida</p>

          <p className="mt-6 font-body text-sm font-medium text-textPrimary">Incluye:</p>
          <ul className="mt-4 space-y-3 text-left">
            {FEATURES.map((feature) => (
              <li key={feature} className="flex items-start gap-3 font-body text-sm text-textPrimary">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-0.5 h-5 w-5 shrink-0 text-textSecondary">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {feature}
              </li>
            ))}
          </ul>

          <p className="mt-8 font-body text-sm text-textSecondary">
            Sin mensualidad. Sin renovación automática. Sin sorpresas en la
            tarjeta el mes que viene.
          </p>

          <CTAButton className="mt-8 w-full" toCheckout />

          <p className="mt-4 font-body text-xs text-textSecondary">
            Se abre en una página segura de pago (Hotmart). Volvés acá para crear tu cuenta.
          </p>

          <p className="mt-4 flex items-center justify-center gap-2 font-body text-sm text-textSecondary">
            <ShieldIcon />
            Garantía de 7 días. Si no te convence, te devolvemos tu dinero.
          </p>

          <p className="mt-2 font-body text-xs text-textSecondary">
            Pago procesado por Hotmart, la plataforma de pagos más usada de Latinoamérica.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Pricing
