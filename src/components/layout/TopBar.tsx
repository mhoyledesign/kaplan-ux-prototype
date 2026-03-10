import { Menu, Eye, EyeOff } from 'lucide-react'
import { useBrand } from '@/theme/BrandContext'
import { BrandSwitcher } from './BrandSwitcher'
import { UserMenu } from './UserMenu'
import type { AuthUser, UserRole } from '@/hooks/useAuth'

interface TopBarProps {
  user: AuthUser
  onLogout: () => void
  onSetRole: (role: UserRole) => void
  onToggleSidebar: () => void
  showCms: boolean
  onToggleCms: () => void
}

export function TopBar({ user, onLogout, onSetRole, onToggleSidebar, showCms, onToggleCms }: TopBarProps) {
  const { brand } = useBrand()

  return (
    <header
      className="fixed top-0 left-0 right-0 z-40 h-14 flex items-center px-4 gap-3"
      style={{ backgroundColor: 'var(--brand-primary)' }}
    >
      {/* Sidebar toggle */}
      <button
        onClick={onToggleSidebar}
        className="p-1.5 rounded-md text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
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

      {/* CMS toggle */}
      <button
        onClick={onToggleCms}
        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
          showCms
            ? 'bg-white/20 text-white'
            : 'text-white/60 hover:text-white/90 hover:bg-white/10'
        }`}
        title="Toggle CMS indicators"
      >
        {showCms ? <Eye size={14} /> : <EyeOff size={14} />}
        <span className="hidden md:inline">CMS</span>
      </button>

      {/* Brand Switcher */}
      <BrandSwitcher />

      {/* User Menu */}
      <UserMenu user={user} onLogout={onLogout} onSetRole={onSetRole} />
    </header>
  )
}
