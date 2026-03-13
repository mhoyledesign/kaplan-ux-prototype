import { Menu } from 'lucide-react'
import { useBrand } from '@/theme/BrandContext'
import { UserMenu } from './UserMenu'
import type { AuthUser, UserRole } from '@/hooks/useAuth'

interface TopBarProps {
  user: AuthUser
  onLogout: () => void
  onSetRole: (role: UserRole) => void
  onToggleSidebar: () => void
  showNotes: boolean
  onToggleNotes: () => void
}

export function TopBar({ user, onLogout, onSetRole, onToggleSidebar, showNotes, onToggleNotes }: TopBarProps) {
  const { brand } = useBrand()

  return (
    <header
      className="fixed top-0 left-0 right-0 z-40 h-14 flex items-center px-4 gap-3"
      style={{ backgroundColor: 'var(--brand-primary)' }}
    >
      {/* Sidebar toggle — mobile only */}
      <button
        onClick={onToggleSidebar}
        className="p-1.5 rounded-md text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer md:hidden"
      >
        <Menu size={20} />
      </button>

      {/* Logo */}
      <img
        src={brand.logoWhite}
        alt={brand.name}
        className="h-7 object-contain"
      />

      <div className="h-5 w-px bg-white/20" />

      <span className="text-sm font-medium text-white/90 hidden sm:inline">
        Online Access Portal
      </span>

      <div className="flex-1" />

      {/* User Menu */}
      <UserMenu
        user={user}
        onLogout={onLogout}
        onSetRole={onSetRole}
        showNotes={showNotes}
        onToggleNotes={onToggleNotes}
      />
    </header>
  )
}
