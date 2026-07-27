import { useEffect, useState } from 'react'

const CREATE_TITLES = {
  sueño: 'Registrar sueño',
  toma: 'Registrar toma',
  pañal: 'Registrar pañal',
}

const EDIT_TITLES = {
  sueño: 'Editar sueño',
  toma: 'Editar toma',
  pañal: 'Editar pañal',
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
    </svg>
  )
}

function ToggleButton({ active, children, ...props }) {
  return (
    <button
      type="button"
      className={`flex-1 rounded-button border px-4 py-3 font-body text-sm font-medium transition-colors ${
        active
          ? 'border-transparent bg-brand-gradient text-white'
          : 'border-textPrimary/[0.08] bg-background text-textSecondary hover:text-textPrimary'
      }`}
      {...props}
    >
      {children}
    </button>
  )
}

function SueñoForm({ existingEntry }) {
  const [mode, setMode] = useState(existingEntry ? 'manual' : 'now')
  const [start, setStart] = useState(existingEntry?.start ?? '')
  const [end, setEnd] = useState(existingEntry?.end ?? '')

  return (
    <div className="mt-6">
      <div className="flex gap-3">
        <ToggleButton active={mode === 'now'} onClick={() => setMode('now')}>
          Empezó ahora
        </ToggleButton>
        <ToggleButton active={mode === 'manual'} onClick={() => setMode('manual')}>
          Registrar manualmente
        </ToggleButton>
      </div>

      {mode === 'manual' && (
        <div className="mt-4 flex gap-3">
          <label className="flex-1">
            <span className="mb-1 block font-body text-xs text-textSecondary">Inicio</span>
            <input
              type="time"
              value={start}
              onChange={(event) => setStart(event.target.value)}
              className="w-full rounded-button border border-textPrimary/[0.08] bg-background px-3 py-2 font-body text-sm text-textPrimary outline-none focus:border-[#9B6BF2]"
            />
          </label>
          <label className="flex-1">
            <span className="mb-1 block font-body text-xs text-textSecondary">Fin</span>
            <input
              type="time"
              value={end}
              onChange={(event) => setEnd(event.target.value)}
              className="w-full rounded-button border border-textPrimary/[0.08] bg-background px-3 py-2 font-body text-sm text-textPrimary outline-none focus:border-[#9B6BF2]"
            />
          </label>
        </div>
      )}
    </div>
  )
}

function TomaForm({ existingEntry }) {
  const [tipo, setTipo] = useState(existingEntry?.tipo ?? 'pecho')
  const [value, setValue] = useState(existingEntry?.value ?? '')

  return (
    <div className="mt-6">
      <div className="flex gap-3">
        <ToggleButton active={tipo === 'pecho'} onClick={() => setTipo('pecho')}>
          Pecho
        </ToggleButton>
        <ToggleButton active={tipo === 'biberon'} onClick={() => setTipo('biberon')}>
          Biberón
        </ToggleButton>
      </div>

      <label className="mt-4 block">
        <span className="mb-1 block font-body text-xs text-textSecondary">
          {tipo === 'pecho' ? 'Duración (min)' : 'Cantidad (ml)'}
        </span>
        <input
          type="number"
          min="0"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder={tipo === 'pecho' ? 'Ej: 15' : 'Ej: 120'}
          className="w-full rounded-button border border-textPrimary/[0.08] bg-background px-4 py-3 font-body text-base text-textPrimary outline-none focus:border-[#9B6BF2]"
        />
      </label>
    </div>
  )
}

function PañalForm({ existingEntry }) {
  const [tipo, setTipo] = useState(existingEntry?.tipo ?? 'mojado')

  return (
    <div className="mt-6">
      <div className="flex gap-3">
        <ToggleButton active={tipo === 'mojado'} onClick={() => setTipo('mojado')}>
          Mojado
        </ToggleButton>
        <ToggleButton active={tipo === 'sucio'} onClick={() => setTipo('sucio')}>
          Sucio
        </ToggleButton>
        <ToggleButton active={tipo === 'ambos'} onClick={() => setTipo('ambos')}>
          Ambos
        </ToggleButton>
      </div>
    </div>
  )
}

function QuickLogModal({ type, existingEntry, onClose, onDelete }) {
  const [visible, setVisible] = useState(false)
  const [confirmingDelete, setConfirmingDelete] = useState(false)
  const isEditing = Boolean(existingEntry)

  useEffect(() => {
    const frame = requestAnimationFrame(() => setVisible(true))
    return () => cancelAnimationFrame(frame)
  }, [])

  function handleClose() {
    setVisible(false)
    setTimeout(onClose, 200)
  }

  function handleSave() {
    // TODO: persistir el registro (backend / estado global) cuando exista el motor de datos
    handleClose()
  }

  function handleDelete() {
    // TODO: eliminar el registro de la persistencia (backend / estado global) cuando exista el motor de datos
    onDelete?.(existingEntry)
    handleClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center md:items-center">
      <div
        className={`absolute inset-0 bg-black/50 transition-opacity duration-200 ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={handleClose}
      />

      <div
        className={`relative w-full max-w-md rounded-t-card bg-surface p-6 pb-8 transition-transform duration-200 md:rounded-card md:pb-6 ${
          visible ? 'translate-y-0' : 'translate-y-full md:translate-y-0 md:opacity-0'
        }`}
      >
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl font-bold">
            {isEditing ? EDIT_TITLES[type] : CREATE_TITLES[type]}
          </h2>
          <button
            onClick={handleClose}
            aria-label="Cerrar"
            className="flex h-8 w-8 items-center justify-center rounded-button text-textSecondary hover:text-textPrimary"
          >
            <CloseIcon />
          </button>
        </div>

        {type === 'sueño' && <SueñoForm existingEntry={existingEntry} />}
        {type === 'toma' && <TomaForm existingEntry={existingEntry} />}
        {type === 'pañal' && <PañalForm existingEntry={existingEntry} />}

        <button
          onClick={handleSave}
          className="mt-8 w-full rounded-button bg-brand-gradient px-6 py-3 font-body text-base font-medium text-white transition-[filter] hover:brightness-110"
        >
          {isEditing ? 'Guardar cambios' : 'Guardar'}
        </button>

        {isEditing && (
          <div className="mt-6 border-t border-textPrimary/[0.08] pt-4">
            {confirmingDelete ? (
              <div className="flex items-center justify-between gap-3">
                <span className="font-body text-sm text-textSecondary">¿Seguro?</span>
                <div className="flex gap-3">
                  <button
                    onClick={() => setConfirmingDelete(false)}
                    className="font-body text-sm text-textSecondary hover:text-textPrimary"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleDelete}
                    className="font-body text-sm font-medium text-red-400"
                  >
                    Sí, eliminar
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setConfirmingDelete(true)}
                className="w-full font-body text-sm font-medium text-red-400"
              >
                Eliminar registro
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default QuickLogModal
