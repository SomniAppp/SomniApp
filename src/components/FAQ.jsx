import { useState } from 'react'

const QUESTIONS = [
  {
    question: '¿Funciona para cualquier bebé?',
    answer:
      'Sí. Somni está pensado para bebés de 0 a 12 meses y ajusta las predicciones a medida que el ritmo de tu bebé cambia con el tiempo.',
  },
  {
    question: '¿Necesito internet para usarlo?',
    answer:
      'Podés registrar siestas y tomas sin conexión. Las predicciones y el chat con la IA se actualizan apenas tengas internet de nuevo.',
  },
  {
    question: '¿Cuántos bebés puedo registrar?',
    answer: 'Tu cuenta permite registrar más de un bebé sin costo adicional.',
  },
  {
    question: '¿Cómo funciona el período de prueba?',
    answer:
      'Tenés acceso completo gratis por 14 días, sin necesidad de tarjeta. Podés cancelar en cualquier momento antes de que termine.',
  },
]

function FAQItem({ item, isOpen, onToggle }) {
  return (
    <div className="rounded-card border border-textPrimary/[0.08] bg-surface p-6">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between text-left font-body text-base font-medium text-textPrimary"
      >
        {item.question}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`h-5 w-5 shrink-0 text-textSecondary transition-transform ${isOpen ? 'rotate-45' : ''}`}
        >
          <path strokeLinecap="round" d="M12 5v14M5 12h14" />
        </svg>
      </button>
      {isOpen && (
        <p className="mt-3 font-body text-sm text-textSecondary">{item.answer}</p>
      )}
    </div>
  )
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <section id="preguntas" className="mx-auto max-w-6xl px-6 py-12 md:py-24">
      <h2 className="text-center font-display text-2xl font-bold md:text-3xl">
        Preguntas frecuentes
      </h2>

      <div className="mx-auto mt-10 flex max-w-2xl flex-col gap-4">
        {QUESTIONS.map((item, index) => (
          <FAQItem
            key={item.question}
            item={item}
            isOpen={openIndex === index}
            onToggle={() => setOpenIndex((prev) => (prev === index ? null : index))}
          />
        ))}
      </div>
    </section>
  )
}

export default FAQ
