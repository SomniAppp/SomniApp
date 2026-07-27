import { useEffect, useRef, useState } from 'react'
import PaywallModal from '../components/PaywallModal'
import { useSubscription } from '../context/SubscriptionContext'

// TODO: reemplazar por el nombre real del bebé desde el estado/backend
const BABY_NAME = 'Sofía'

// TODO: reemplazar por la conversación real (sin persistencia por ahora, se reinicia en cada visita)
const INITIAL_MESSAGES = [
  {
    id: 1,
    from: 'user',
    text: '¿Por qué se despertó 3 veces anoche?',
  },
  {
    id: 2,
    from: 'ai',
    text: 'Parece que anoche se pasó un poco la ventana de sueño antes de acostarla, lo que puede generar despertares más frecuentes. No te preocupes, es algo común y no significa que algo esté mal.',
  },
  {
    id: 3,
    from: 'user',
    text: '¿Cuándo debería dormir la próxima siesta?',
  },
  {
    id: 4,
    from: 'ai',
    text: 'Según su ritmo de las últimas semanas, el mejor momento sería entre las 14:30 y las 15:00. Te aviso apenas se acerque la hora.',
  },
]

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="h-8 w-8">
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  )
}

function SendIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="h-5 w-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 12l16-8-6 16-3-7-7-1Z" />
    </svg>
  )
}

function MessageBubble({ from, text }) {
  const isUser = from === 'user'
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[80%] px-4 py-3 font-body text-sm ${
          isUser
            ? 'rounded-card rounded-br-md bg-brand-gradient text-white'
            : 'rounded-card rounded-bl-md bg-surface text-textPrimary'
        }`}
      >
        {text}
      </div>
    </div>
  )
}

function Chat() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES)
  const [input, setInput] = useState('')
  const [showPaywall, setShowPaywall] = useState(false)
  const bottomRef = useRef(null)
  const { isPremium } = useSubscription()

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  function handleSend() {
    const text = input.trim()
    if (!text) return

    const userMessage = { id: Date.now(), from: 'user', text }
    setMessages((prev) => [...prev, userMessage])
    setInput('')

    // TODO: reemplazar por la integración real con la API de IA (Claude, etc.)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, from: 'ai', text: 'Esta función estará disponible próximamente.' },
      ])
    }, 800)
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      event.preventDefault()
      handleSend()
    }
  }

  if (!isPremium) {
    return (
      <div className="px-4 pb-24 pt-8">
        <h1 className="font-display text-2xl font-bold text-textPrimary">Preguntale a Somni</h1>
        <p className="mt-1 font-body text-sm text-textSecondary">
          Sabe todo sobre el sueño de {BABY_NAME}
        </p>

        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-gradient">
            <LockIcon />
          </div>
          <p className="mt-4 max-w-xs font-body text-base text-textSecondary">
            El chat con IA es parte de Somni Premium
          </p>
          <button
            onClick={() => setShowPaywall(true)}
            className="mt-6 rounded-button bg-brand-gradient px-6 py-3 font-body text-base font-medium text-white transition-[filter] hover:brightness-110"
          >
            Desbloquear
          </button>
        </div>

        {showPaywall && <PaywallModal onClose={() => setShowPaywall(false)} />}
      </div>
    )
  }

  return (
    <div className="px-4 pb-40 pt-8">
      <h1 className="font-display text-2xl font-bold text-textPrimary">Preguntale a Somni</h1>
      <p className="mt-1 font-body text-sm text-textSecondary">
        Sabe todo sobre el sueño de {BABY_NAME}
      </p>

      <div className="mt-6 flex flex-col gap-3">
        {messages.map((message) => (
          <MessageBubble key={message.id} from={message.from} text={message.text} />
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="fixed inset-x-0 bottom-[77px] border-t border-textPrimary/[0.08] bg-background px-4 py-3">
        <div className="mx-auto flex max-w-md items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Escribí tu pregunta..."
            className="flex-1 rounded-button border border-textPrimary/[0.08] bg-surface px-4 py-3 font-body text-sm text-textPrimary outline-none focus:border-[#9B6BF2]"
          />
          <button
            onClick={handleSend}
            aria-label="Enviar"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-gradient transition-[filter] hover:brightness-110"
          >
            <SendIcon />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Chat
