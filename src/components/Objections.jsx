import { useState } from 'react'

const QUESTIONS = [
  {
    question: '¿Por qué es tan barato comparado con Huckleberry?',
    answer:
      'Porque no cobramos mensualidad. Un pago cubre el desarrollo del producto de una sola vez — vos no pagás por mantener una suscripción activa que quizás ni uses todos los meses.',
  },
  {
    question: '¿Cómo sé que la predicción va a ser precisa para MI bebé?',
    answer:
      'Somni no usa una tabla genérica por edad. Usa lo que vos registrás — sueño, mamadas, pañales — para calcular el patrón real de tu bebé, y lo actualiza semana a semana.',
  },
  {
    question: 'Tengo gemelos / mellizos, ¿esto funciona igual?',
    answer:
      'Sí. Somni tiene soporte para múltiples bebés desde el registro inicial — no es una función extra, es parte del producto.',
  },
  {
    question: 'Ya probé otras apps y no funcionaron',
    answer:
      'La mayoría de las apps de sueño son diarios: registran, pero no predicen. Somni usa esos registros para decirte el momento exacto — no solo para guardar el historial.',
  },
]

function ObjectionItem({ item, isOpen, onToggle }) {
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

function Objections() {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <section className="mx-auto max-w-6xl px-6 py-12 md:py-24">
      <h2 className="text-center font-display text-2xl font-bold md:text-3xl">
        Antes de que lo pienses dos veces
      </h2>

      <div className="mx-auto mt-10 flex max-w-2xl flex-col gap-4">
        {QUESTIONS.map((item, index) => (
          <ObjectionItem
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

export default Objections
