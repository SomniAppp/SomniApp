import { NavLink, Outlet } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'

function HomeIcon({ active }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={active ? '#9B6BF2' : 'currentColor'}
      strokeWidth="2"
      className="h-6 w-6"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 11l9-8 9 8" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 10v10a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V10" />
    </svg>
  )
}

function ChatIcon({ active }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={active ? '#9B6BF2' : 'currentColor'}
      strokeWidth="2"
      className="h-6 w-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 5h16v10a1 1 0 0 1-1 1H9l-4 4v-4H5a1 1 0 0 1-1-1V5Z"
      />
    </svg>
  )
}

function HistoryIcon({ active }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={active ? '#9B6BF2' : 'currentColor'}
      strokeWidth="2"
      className="h-6 w-6"
    >
      <circle cx="12" cy="13" r="8" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4l3 2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 2h6" />
    </svg>
  )
}

function ProfileIcon({ active }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={active ? '#9B6BF2' : 'currentColor'}
      strokeWidth="2"
      className="h-6 w-6"
    >
      <circle cx="12" cy="8" r="4" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" />
    </svg>
  )
}

const NAV_ITEMS = [
  { to: '/app', label: 'Inicio', Icon: HomeIcon, end: true },
  { to: '/app/chat', label: 'Chat', Icon: ChatIcon, end: false },
  { to: '/app/historial', label: 'Historial', Icon: HistoryIcon, end: false },
  { to: '/app/perfil', label: 'Perfil', Icon: ProfileIcon, end: false },
]

function AppLayout() {
  useTheme()

  return (
    <div className="min-h-screen bg-background text-textPrimary">
      <Outlet />

      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-textPrimary/[0.08] bg-surface">
        <div className="mx-auto grid max-w-md grid-cols-4 px-4 py-2">
          {NAV_ITEMS.map(({ to, label, Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className="flex flex-col items-center gap-1 px-2 py-2"
            >
              {({ isActive }) => (
                <>
                  <Icon active={isActive} />
                  <span
                    className={`font-body text-xs ${isActive ? '' : 'text-textSecondary'}`}
                    style={isActive ? { color: '#9B6BF2' } : undefined}
                  >
                    {label}
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  )
}

export default AppLayout
