import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'
import { useAuth } from '../context/AuthContext'
import iconDark from '../assets/somni-icon-dark.png'
import iconLight from '../assets/somni-icon-light.png'
import wordmarkDark from '../assets/somni-wordmark-dark.png'
import wordmarkLight from '../assets/somni-wordmark-light.png'

function Auth() {
  const navigate = useNavigate()
  const { theme } = useTheme()
  const { signUp, signIn } = useAuth()
  const [searchParams] = useSearchParams()
  const [mode, setMode] = useState(searchParams.get('mode') === 'login' ? 'login' : 'signup')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const isSignup = mode === 'signup'

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')

    if (isSignup && password !== confirmPassword) {
      setError('Las contraseñas no coinciden')
      return
    }

    setSubmitting(true)
    try {
      if (isSignup) {
        await signUp(email, password)
      } else {
        await signIn(email, password)
      }
      navigate('/onboarding')
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6 text-textPrimary">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center md:mb-12">
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
            className="ml-2 h-6 w-auto"
          />
        </div>

        <h1 className="font-display text-2xl font-bold md:text-3xl">
          {isSignup ? 'Creá tu cuenta' : 'Iniciá sesión'}
        </h1>

        <form onSubmit={handleSubmit} className="mt-8">
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email"
            required
            className="w-full rounded-button border border-textPrimary/[0.08] bg-surface px-4 py-3 font-body text-base text-textPrimary outline-none placeholder:text-textSecondary focus:border-[#9B6BF2]"
          />

          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Contraseña"
            required
            className="mt-4 w-full rounded-button border border-textPrimary/[0.08] bg-surface px-4 py-3 font-body text-base text-textPrimary outline-none placeholder:text-textSecondary focus:border-[#9B6BF2]"
          />

          {isSignup && (
            <input
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              placeholder="Confirmar contraseña"
              required
              className="mt-4 w-full rounded-button border border-textPrimary/[0.08] bg-surface px-4 py-3 font-body text-base text-textPrimary outline-none placeholder:text-textSecondary focus:border-[#9B6BF2]"
            />
          )}

          {error && (
            <p className="mt-4 font-body text-sm text-red-500">{error}</p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="mt-6 w-full rounded-button bg-brand-gradient px-6 py-3 font-body text-base font-medium text-white transition-[filter] hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? 'Cargando...' : isSignup ? 'Crear cuenta' : 'Iniciar sesión'}
          </button>
        </form>

        <button
          onClick={() => setMode(isSignup ? 'login' : 'signup')}
          className="mt-4 w-full font-body text-sm text-textSecondary hover:text-textPrimary"
        >
          {isSignup ? '¿Ya tenés cuenta? Iniciá sesión' : '¿No tenés cuenta? Creá una'}
        </button>
      </div>
    </div>
  )
}

export default Auth
