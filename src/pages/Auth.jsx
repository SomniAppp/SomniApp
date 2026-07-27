import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'
import { useAuth } from '../context/AuthContext'
import iconDark from '../assets/somni-icon-dark.png'
import iconLight from '../assets/somni-icon-light.png'
import wordmarkDark from '../assets/somni-wordmark-dark.png'
import wordmarkLight from '../assets/somni-wordmark-light.png'

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5">
      <path
        fill="#4285F4"
        d="M23.52 12.27c0-.85-.08-1.67-.22-2.45H12v4.63h6.47a5.53 5.53 0 0 1-2.4 3.63v3h3.88c2.27-2.09 3.57-5.17 3.57-8.81Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.96-1.07 7.95-2.92l-3.88-3c-1.08.72-2.46 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96H1.26v3.11A11.99 11.99 0 0 0 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.27 14.27a7.2 7.2 0 0 1 0-4.54V6.62H1.26a12 12 0 0 0 0 10.76l4.01-3.11Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.76 0 3.35.6 4.6 1.79l3.44-3.44C17.95 1.19 15.24 0 12 0A11.99 11.99 0 0 0 1.26 6.62l4.01 3.11C6.22 6.86 8.87 4.75 12 4.75Z"
      />
    </svg>
  )
}

function Auth() {
  const navigate = useNavigate()
  const { theme } = useTheme()
  const { signUp, signIn, signInWithGoogle } = useAuth()
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

  async function handleGoogleSignIn() {
    setError('')
    try {
      await signInWithGoogle()
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6 text-textPrimary">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center md:mb-12">
          <img src={theme === 'dark' ? iconDark : iconLight} alt="Somni" className="h-8 w-auto" />
          <img
            src={theme === 'dark' ? wordmarkDark : wordmarkLight}
            alt="Somni"
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

        <div className="mt-8 flex items-center gap-4">
          <div className="h-px flex-1 bg-textPrimary/[0.08]" />
          <span className="font-body text-xs text-textSecondary">O</span>
          <div className="h-px flex-1 bg-textPrimary/[0.08]" />
        </div>

        <button
          onClick={handleGoogleSignIn}
          className="mt-6 flex w-full items-center justify-center gap-3 rounded-button border border-textPrimary/[0.08] bg-surface px-6 py-3 font-body text-base font-medium text-textPrimary transition-colors hover:bg-textPrimary/[0.04]"
        >
          <GoogleIcon />
          Continuar con Google
        </button>
      </div>
    </div>
  )
}

export default Auth
