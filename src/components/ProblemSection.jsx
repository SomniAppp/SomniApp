import PhoneFrame from './PhoneFrame'
import proximaSiestaScreenshot from '../assets/IMG_5604.jpg'

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
          <img
            src={proximaSiestaScreenshot}
            alt="Dashboard de Somni con la próxima siesta"
            className="h-full w-full object-contain"
          />
        </PhoneFrame>
      </div>
    </section>
  )
}

export default ProblemSection
