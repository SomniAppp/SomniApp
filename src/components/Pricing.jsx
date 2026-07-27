const CHECKOUT_URL = 'https://pay.hotmart.com/A106776205M?off=1jk1sqvo'

const FEATURES = [
  'Predicción de la próxima ventana de sueño',
  'Registro ilimitado de siestas y tomas',
  'Chat con IA sobre el historial de tu bebé',
  'Recordatorios personalizados',
  'Soporte por email',
]

function Pricing() {
  return (
    <section id="precios" className="mx-auto max-w-6xl px-6 pt-8 pb-12 md:pt-16 md:pb-24">
      <h2 className="text-center font-display text-2xl font-bold md:text-3xl">Precios</h2>

      <div className="mx-auto mt-12 max-w-md rounded-card bg-brand-gradient p-[1.5px]">
        <div className="rounded-card bg-surface p-8 text-center">
          <p className="font-body text-sm font-medium text-textSecondary">Plan Somni</p>
          <p className="mt-2 font-display text-4xl font-bold">$9.90</p>
          <p className="mt-1 font-body text-sm text-textSecondary">Pago único · Acceso de por vida</p>
          <p className="mt-2 font-body text-sm text-textSecondary">
            Sin mensualidades. Pagás una vez, usás para siempre
          </p>

          <ul className="mt-8 space-y-3 text-left">
            {FEATURES.map((feature) => (
              <li key={feature} className="flex items-start gap-3 font-body text-sm text-textPrimary">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-0.5 h-5 w-5 shrink-0 text-textSecondary">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {feature}
              </li>
            ))}
          </ul>

          <a
            href={CHECKOUT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block w-full rounded-button bg-brand-gradient px-6 py-3 font-body text-base font-medium text-white transition-[filter] hover:brightness-110"
          >
            Empezar gratis
          </a>
        </div>
      </div>
    </section>
  )
}

export default Pricing
