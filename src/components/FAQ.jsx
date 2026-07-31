import { useState } from 'react'

const QUESTIONS = [
  {
    question: '¿Puedo cancelar mi suscripción cuando quiera?',
    answer:
      'Sí. Puedes cancelar tu suscripción en cualquier momento desde tu cuenta. No existen contratos de permanencia ni cargos ocultos.',
  },
  {
    question: '¿Cómo se realiza el cobro si vivo en México, Colombia o Chile?',
    answer:
      'El pago se procesa de forma segura mediante Hotmart. El importe se convierte automáticamente a la moneda de tu tarjeta según el tipo de cambio y las condiciones de tu banco. No necesitas hacer ninguna conversión manual.',
  },
  {
    question: '¿Funciona para bebés de cualquier edad?',
    answer:
      'Somni está diseñado para acompañar a familias con bebés desde el nacimiento hasta aproximadamente los 2 años, adaptando las recomendaciones a cada etapa del desarrollo.',
  },
  {
    question: '¿Necesito conocimientos sobre sueño infantil?',
    answer:
      'No. Somni fue creado precisamente para simplificar todo el proceso. Solo registras cuándo tu bebé despierta y la aplicación hace el resto.',
  },
  {
    question: '¿Recibiré recordatorios?',
    answer:
      'Sí. Somni te envía alertas antes de la próxima ventana de sueño para ayudarte a acostar a tu bebé en el momento ideal.',
  },
  {
    question: '¿Qué pasa si mi rutina cambia?',
    answer:
      'No hay problema. Puedes registrar nuevos despertares en cualquier momento y Somni recalculará automáticamente la siguiente ventana de sueño.',
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
