import iconDark from '../assets/somni-icon-dark.png'
import iconLight from '../assets/somni-icon-light.png'
import wordmarkDark from '../assets/somni-wordmark-dark.png'
import wordmarkLight from '../assets/somni-wordmark-light.png'
import CTAButton from './CTAButton'

function Footer({ theme }) {
  return (
    <footer className="border-t border-textPrimary/[0.08]">
      <div className="mx-auto max-w-6xl px-6 py-12 text-center md:py-20">
        <h2 className="font-display text-2xl font-bold md:text-3xl">
          Dejá de adivinar a las 2 AM.
        </h2>
        <p className="mx-auto mt-4 max-w-xl font-body text-lg text-textSecondary">
          Un pago de $9.90. Sin mensualidad. Acceso para siempre.
        </p>
        <div className="mt-8">
          <CTAButton />
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 border-t border-textPrimary/[0.08] px-6 py-8 md:flex-row md:justify-between">
        <div className="flex items-center gap-3">
          <img
            src={theme === 'dark' ? iconDark : iconLight}
            alt="Somni"
            width={theme === 'dark' ? 63 : 39}
            height={40}
            loading="lazy"
            className="h-10 w-auto"
          />
          <img
            src={theme === 'dark' ? wordmarkDark : wordmarkLight}
            alt="Somni"
            width={theme === 'dark' ? 153 : 170}
            height={32}
            loading="lazy"
            className="h-8 w-auto"
          />
        </div>
        <p className="font-body text-xs text-textSecondary">
          © {new Date().getFullYear()} Somni. Todos los derechos reservados.
        </p>
        <div className="flex gap-6 font-body text-xs text-textSecondary">
          <a href="#" className="hover:text-textPrimary">Términos</a>
          <a href="#" className="hover:text-textPrimary">Privacidad</a>
          <a href="#" className="hover:text-textPrimary">Contacto</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
