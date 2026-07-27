import iconDark from '../assets/somni-icon-dark.png'
import iconLight from '../assets/somni-icon-light.png'
import wordmarkDark from '../assets/somni-wordmark-dark.png'
import wordmarkLight from '../assets/somni-wordmark-light.png'

function Footer({ theme }) {
  return (
    <footer className="border-t border-textPrimary/[0.08]">
      <div className="mx-auto max-w-6xl px-6 py-12 text-center md:py-20">
        <h2 className="font-display text-2xl font-bold md:text-3xl">
          Dejá de adivinar. Empezá a saber.
        </h2>
        <div className="mt-8">
          <button className="rounded-button bg-brand-gradient px-8 py-4 font-body text-base font-medium text-white transition-[filter] hover:brightness-110">
            Empezar gratis
          </button>
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 border-t border-textPrimary/[0.08] px-6 py-8 md:flex-row md:justify-between">
        <div className="flex items-center gap-3">
          <img
            src={theme === 'dark' ? iconDark : iconLight}
            alt="Somni"
            className="h-10 w-auto"
          />
          <img
            src={theme === 'dark' ? wordmarkDark : wordmarkLight}
            alt="Somni"
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
