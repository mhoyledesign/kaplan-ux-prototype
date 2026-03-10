import { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { TopBar } from './TopBar'
import { Sidebar } from './Sidebar'
import type { AuthUser, UserRole } from '@/hooks/useAuth'

interface AppShellProps {
  user: AuthUser
  onLogout: () => void
  onSetRole: (role: UserRole) => void
  showCms: boolean
  onToggleCms: () => void
}

export function AppShell({ user, onLogout, onSetRole, showCms, onToggleCms }: AppShellProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    onLogout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-background">
      <TopBar
        user={user}
        onLogout={handleLogout}
        onSetRole={onSetRole}
        onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
        showCms={showCms}
        onToggleCms={onToggleCms}
      />
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        isAdmin={user.role === 'admin'}
      />
      <main
        className={`
          pt-14 min-h-screen transition-all duration-200
          ${sidebarCollapsed ? 'pl-16' : 'pl-56'}
        `}
      >
        <div className="p-6">
          <Outlet context={{ showCms, user }} />
        </div>
      </main>
    </div>
  )
}
