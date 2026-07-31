const ROWS = [
  ['Desde $200 USD por consulta', 'Solo $7,99 USD al mes'],
  ['Debes agendar una cita', 'Disponible en cualquier momento'],
  ['Recomendaciones generales', 'Alertas personalizadas para tu bebé'],
  ['Pago único elevado', 'Suscripción mensual flexible'],
  ['No siempre disponible', 'Disponible 24/7'],
  ['Sin seguimiento diario', 'Te acompaña todos los días'],
]

function ProblemSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-12 md:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-2xl font-bold md:text-3xl">
          ¿Por qué pagar $7,99 al mes vale la pena?
        </h2>
        <p className="mt-4 font-body text-lg text-textSecondary">
          Dormir mejor no debería costar una fortuna.
        </p>
      </div>

      <div className="mx-auto mt-10 max-w-2xl overflow-x-auto">
        <table className="w-full min-w-[480px] overflow-hidden rounded-card border border-textPrimary/[0.08]">
          <thead>
            <tr className="bg-surface">
              <th className="px-4 py-3 text-left font-display text-sm font-bold text-textPrimary md:px-6">
                Consultora de Sueño
              </th>
              <th className="px-4 py-3 text-left font-display text-sm font-bold text-textPrimary md:px-6">
                Somni
              </th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map(([consultant, somni]) => (
              <tr key={consultant} className="border-t border-textPrimary/[0.08]">
                <td className="px-4 py-3 font-body text-sm text-textSecondary md:px-6">{consultant}</td>
                <td className="px-4 py-3 font-body text-sm text-textPrimary md:px-6">{somni}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mx-auto mt-8 max-w-md text-center font-body text-sm text-textSecondary">
        Por menos de lo que cuesta un café a la semana, tienes una guía
        diaria para ayudarte a encontrar el mejor momento para dormir a tu
        bebé.
      </p>
    </section>
  )
}

export default ProblemSection
