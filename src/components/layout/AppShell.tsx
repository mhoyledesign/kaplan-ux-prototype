import { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { TopBar } from './TopBar'
import { Sidebar } from './Sidebar'
import type { AuthUser, UserRole } from '@/hooks/useAuth'

interface AppShellProps {
  user: AuthUser
  onLogout: () => void
  onSetRole: (role: UserRole) => void
  showNotes: boolean
  onToggleNotes: () => void
}

export function AppShell({ user, onLogout, onSetRole, showNotes, onToggleNotes }: AppShellProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
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
        onToggleSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)}
        showNotes={showNotes}
        onToggleNotes={onToggleNotes}
      />
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        isAdmin={user.role === 'admin'}
        mobileOpen={mobileSidebarOpen}
        onMobileClose={() => setMobileSidebarOpen(false)}
      />
      <main
        className={`
          pt-14 min-h-screen transition-all duration-200
          pl-0 ${sidebarCollapsed ? 'md:pl-16' : 'md:pl-56'}
        `}
      >
        <div className="p-6">
          <Outlet context={{ showNotes, user }} />
        </div>
      </main>
    </div>
  )
}
