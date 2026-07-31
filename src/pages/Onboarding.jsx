import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'
import { useAuth } from '../context/AuthContext'
import { useBabies } from '../context/BabyContext'
import { supabase } from '../lib/supabase'
import iconDark from '../assets/somni-icon-dark.png'
import iconLight from '../assets/somni-icon-light.png'
import wordmarkDark from '../assets/somni-wordmark-dark.png'
import wordmarkLight from '../assets/somni-wordmark-light.png'
import ProgressIndicator from '../components/onboarding/ProgressIndicator'
import StepName from '../components/onboarding/StepName'
import StepBirthdate from '../components/onboarding/StepBirthdate'
import StepConfirmation from '../components/onboarding/StepConfirmation'

function Onboarding() {
  const navigate = useNavigate()
  const { theme } = useTheme()
  const { user } = useAuth()
  const { setBabies, setActiveBabyId, setParentName } = useBabies()
  const [step, setStep] = useState(1)
  const [isTwins, setIsTwins] = useState(false)
  const [names, setNames] = useState(['', ''])
  const [parentNameInput, setParentNameInput] = useState('')
  const [birthdate, setBirthdate] = useState('')
  const [visible, setVisible] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    setVisible(true)
  }, [step])

  function goToStep(nextStep) {
    setVisible(false)
    setTimeout(() => setStep(nextStep), 150)
  }

  function handleChangeName(index, value) {
    setNames((prev) => {
      const next = [...prev]
      next[index] = value
      return next
    })
  }

  async function handleFinish() {
    const activeNames = isTwins ? names : [names[0]]
    setSaving(true)
    setError('')
    try {
      const rowsToInsert = activeNames.map((name) => ({
        user_id: user.id,
        name,
        birthdate,
      }))

      const [babiesResult, profileResult] = await Promise.all([
        supabase.from('babies').insert(rowsToInsert).select(),
        supabase.from('profiles').update({ parent_name: parentNameInput }).eq('id', user.id),
      ])

      if (babiesResult.error) throw babiesResult.error
      if (profileResult.error) throw profileResult.error

      const newBabies = babiesResult.data
      setBabies(newBabies)
      setActiveBabyId(newBabies[0].id)
      setParentName(parentNameInput)
      navigate('/app')
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
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

        <div className="mb-10">
          <ProgressIndicator step={step} />
        </div>

        <div className={`transition-opacity duration-150 ${visible ? 'opacity-100' : 'opacity-0'}`}>
          {step === 1 && (
            <StepName
              isTwins={isTwins}
              onToggleTwins={setIsTwins}
              names={names}
              onChangeName={handleChangeName}
              parentName={parentNameInput}
              onChangeParentName={setParentNameInput}
              onNext={() => goToStep(2)}
            />
          )}
          {step === 2 && (
            <StepBirthdate
              isTwins={isTwins}
              names={names}
              birthdate={birthdate}
              onChange={setBirthdate}
              onNext={() => goToStep(3)}
              onBack={() => goToStep(1)}
            />
          )}
          {step === 3 && (
            <StepConfirmation
              isTwins={isTwins}
              names={isTwins ? names : [names[0]]}
              parentName={parentNameInput}
              birthdate={birthdate}
              onFinish={handleFinish}
              saving={saving}
              error={error}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default Onboarding
