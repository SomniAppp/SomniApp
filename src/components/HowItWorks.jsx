import PhoneFrame from './PhoneFrame'
import QuickLogDemo from './demos/QuickLogDemo'
import PredictionCardDemo from './demos/PredictionCardDemo'
import ChatDemo from './demos/ChatDemo'

const STEPS = [
  { number: '1', title: 'Registrá', caption: 'Anotalo en segundos', Demo: QuickLogDemo },
  { number: '2', title: 'Recibí la predicción', caption: 'La ventana ideal, al instante', Demo: PredictionCardDemo },
  { number: '3', title: 'Preguntá lo que quieras', caption: 'Chat con IA, siempre a mano', Demo: ChatDemo },
]

function HowItWorks() {
  return (
    <section id="como-funciona" className="mx-auto max-w-6xl px-6 pt-12 pb-8 md:pt-24 md:pb-16">
      <h2 className="text-center font-display text-2xl font-bold md:text-3xl">Cómo funciona</h2>

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
    </section>
  )
}

export default HowItWorks
