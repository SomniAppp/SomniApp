import { HOTMART_CHECKOUT_URL } from '../lib/checkout'

function scrollToPricing() {
  document.querySelector('#precios')?.scrollIntoView({ behavior: 'smooth' })
}

function CTAButton({ className = '', children = 'Comprar acceso', toCheckout = false }) {
  const sharedClassName = `inline-block rounded-button bg-brand-gradient px-8 py-4 font-body text-base font-medium text-white shadow-[0_8px_30px_-8px_rgba(155,107,242,0.6)] transition-[filter] hover:brightness-110 ${className}`

  if (toCheckout) {
    return (
      <a href={HOTMART_CHECKOUT_URL} target="_blank" rel="noopener noreferrer" className={sharedClassName}>
        {children}
      </a>
    )
  }

  return (
    <button type="button" onClick={scrollToPricing} className={sharedClassName}>
      {children}
    </button>
  )
}

export default CTAButton
