import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useBabies } from '../context/BabyContext'

function ProtectedRoute() {
  const { user, loading } = useAuth()
  const { babies, isLoadingBabies } = useBabies()
  const location = useLocation()

  if (loading) return null

  if (!user) return <Navigate to="/auth" replace />

  if (isLoadingBabies) return null

  if (location.pathname === '/onboarding' && babies.length > 0) {
    return <Navigate to="/app" replace />
  }

  return <Outlet />
}

export default ProtectedRoute
