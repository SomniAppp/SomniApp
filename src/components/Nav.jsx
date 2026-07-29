import iconDark from '../assets/somni-icon-dark.png'
import iconLight from '../assets/somni-icon-light.png'
import wordmarkDark from '../assets/somni-wordmark-dark.png'
import wordmarkLight from '../assets/somni-wordmark-light.png'
import { HOTMART_CHECKOUT_URL } from '../lib/checkout'

const NAV_LINKS = [
  { label: 'Cómo funciona', href: '#como-funciona' },
  { label: 'Precios', href: '#precios' },
  { label: 'Preguntas', href: '#preguntas' },
]

function scrollToId(id) {
  document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
      <circle cx="12" cy="12" r="4" />
      <path
        strokeLinecap="round"
        d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
      />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
    </svg>
  )
}

function Nav({ theme, toggleTheme }) {
  return (
    <header className="sticky top-0 z-50 border-b border-textPrimary/[0.08] bg-background/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <img
            src={theme === 'dark' ? iconDark : iconLight}
            alt="Somni"
            width={theme === 'dark' ? 51 : 31}
            height={32}
            className="h-8 w-auto"
          />
          <img
            src={theme === 'dark' ? wordmarkDark : wordmarkLight}
            alt="Somni"
            width={theme === 'dark' ? 114 : 127}
            height={24}
            className="h-6 w-auto"
          />
        </div>

        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollToId(link.href)}
              className="font-body text-sm text-textSecondary transition-colors hover:text-textPrimary"
            >
              {link.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            aria-label="Cambiar tema"
            className="flex h-9 w-9 items-center justify-center rounded-button border border-textPrimary/[0.08] text-textPrimary transition-colors hover:bg-surface"
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>
          <a
            href={HOTMART_CHECKOUT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-button bg-brand-gradient px-5 py-2 font-body text-sm font-medium text-white transition-[filter] hover:brightness-110"
          >
            Comprar acceso
          </a>
        </div>
      </nav>
    </header>
  )
}

export default Nav
