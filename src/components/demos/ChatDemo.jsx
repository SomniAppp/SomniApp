// Static clone of Chat (src/pages/Chat.jsx) with its own seed conversation,
// for use as a real-UI screenshot on the landing page.
const MESSAGES = [
  { id: 1, from: 'user', text: '¿Cuándo debería dormir la próxima siesta?' },
  {
    id: 2,
    from: 'ai',
    text: 'Según su ritmo de las últimas semanas, el mejor momento sería entre las 14:30 y las 15:00.',
  },
]

function MessageBubble({ from, text }) {
  const isUser = from === 'user'
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[80%] px-3 py-2 font-body text-xs ${
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

function ChatDemo() {
  return (
    <div className="flex h-full flex-col px-4 pt-8">
      <p className="font-display text-sm font-bold text-textPrimary">Preguntale a Somni</p>
      <div className="mt-4 flex flex-col gap-2">
        {MESSAGES.map((message) => (
          <MessageBubble key={message.id} from={message.from} text={message.text} />
        ))}
      </div>
      <div className="mt-auto mb-4 flex items-center gap-2 rounded-button border border-textPrimary/[0.08] bg-surface px-3 py-2.5">
        <span className="font-body text-xs text-textSecondary">Escribí tu pregunta...</span>
      </div>
    </div>
  )
}

export default ChatDemo
