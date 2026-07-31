import PhoneFrame from './PhoneFrame'
import QuickLogDemo from './demos/QuickLogDemo'
import PredictionCardDemo from './demos/PredictionCardDemo'
import ChatDemo from './demos/ChatDemo'

const STEPS = [
  {
    number: '1',
    title: 'Registra cuándo se despierta tu bebé',
    caption: 'Solo presiona un botón cada vez que termine una siesta o despierte por la mañana.',
    Demo: QuickLogDemo,
  },
  {
    number: '2',
    title: 'Somni calcula la ventana de sueño ideal',
    caption: 'Analizamos el tiempo despierto recomendado según la edad de tu bebé para calcular el momento perfecto.',
    Demo: PredictionCardDemo,
  },
  {
    number: '3',
    title: 'Recibe una alerta antes del llanto',
    caption: 'Antes de que aparezca el cansancio excesivo, te avisamos para que puedas acostarlo a tiempo.',
    Demo: ChatDemo,
  },
]

function HowItWorks() {
  return (
    <section id="como-funciona" className="mx-auto max-w-6xl px-6 pt-12 pb-8 md:pt-24 md:pb-16">
      <h2 className="text-center font-display text-2xl font-bold md:text-3xl">Es tan simple como seguir estos 3 pasos</h2>

      <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-3">
        {STEPS.map(({ number, title, caption, Demo }) => (
          <div key={number} className="text-center">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-brand-gradient font-display text-base font-bold text-white">
              {number}
            </div>
            <h3 className="mt-3 font-display text-lg font-bold">{title}</h3>
            <div className="mt-5">
              <PhoneFrame className="max-w-[220px]">
                <Demo />
              </PhoneFrame>
            </div>
            <p className="mt-4 font-body text-sm text-textSecondary">{caption}</p>
          </div>
        ))}
      </div>

      <p className="mx-auto mt-10 max-w-xl text-center font-body text-sm text-textSecondary">
        El resultado es un bebé que suele dormirse con más facilidad y una
        rutina mucho más tranquila para toda la familia.
      </p>
    </section>
  )
}

export default HowItWorks
