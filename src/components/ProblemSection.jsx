import PhoneFrame from './PhoneFrame'
import proximaSiestaScreenshot from '../assets/proxima-siesta-card.jpg'

function ProblemSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-12 md:py-24">
      <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
        <div className="text-center md:text-left">
          <h2 className="font-display text-2xl font-bold md:text-3xl">
            A las 2 AM no deberías estar adivinando.
          </h2>
          <p className="mt-6 font-body text-lg text-textSecondary">
            Tu bebé llora y vos no sabés si es hambre, sueño atrasado o "una mala
            noche". La ventana de sueño cambia cada semana — y nadie te avisa
            cuándo cambió.
          </p>
        </div>
        <PhoneFrame>
          <div className="flex h-full w-full items-center justify-center p-4">
            <img
              src={proximaSiestaScreenshot}
              alt="Próxima siesta en el Dashboard de Somni"
              className="w-full rounded-2xl object-contain shadow-[0_0_40px_-8px_rgba(155,107,242,0.55)]"
            />
          </div>
        </PhoneFrame>
      </div>
    </section>
  )
}

export default ProblemSection
