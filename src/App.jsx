import { Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { BabyProvider } from './context/BabyContext'
import { SubscriptionProvider } from './context/SubscriptionContext'
import { ActivityProvider } from './context/ActivityContext'
import ProtectedRoute from './components/ProtectedRoute'
import Landing from './pages/Landing'
import Auth from './pages/Auth'
import Onboarding from './pages/Onboarding'
import AppLayout from './components/AppLayout'
import Dashboard from './pages/Dashboard'
import Chat from './pages/Chat'
import Historial from './pages/Historial'
import Perfil from './pages/Perfil'

function App() {
  return (
    <AuthProvider>
      <BabyProvider>
        <SubscriptionProvider>
          <ActivityProvider>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/auth" element={<Auth />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/onboarding" element={<Onboarding />} />
                <Route path="/app" element={<AppLayout />}>
                  <Route index element={<Dashboard />} />
                  <Route path="chat" element={<Chat />} />
                  <Route path="historial" element={<Historial />} />
                  <Route path="perfil" element={<Perfil />} />
                </Route>
              </Route>
            </Routes>
          </ActivityProvider>
        </SubscriptionProvider>
      </BabyProvider>
    </AuthProvider>
  )
}

export default App
