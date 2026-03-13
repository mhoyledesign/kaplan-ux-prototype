import { useState, useRef, useEffect } from 'react'
import { User, Key, Monitor, LogOut, ShieldCheck, Check } from 'lucide-react'
import { useBrand } from '@/theme/BrandContext'
import { brands, brandIds } from '@/theme/brands'
import { roleLabels } from '@/hooks/useAuth'
import type { AuthUser, UserRole } from '@/hooks/useAuth'

interface UserMenuProps {
  user: AuthUser
  onLogout: () => void
  onSetRole: (role: UserRole) => void
  showNotes: boolean
  onToggleNotes: () => void
}

export function UserMenu({ user, onLogout, onSetRole, showNotes, onToggleNotes }: UserMenuProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const { brand, setBrand } = useBrand()

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const initials = user.name.split(' ').map(n => n[0]).join('')

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-white/10 transition-colors cursor-pointer"
      >
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold text-white"
          style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
        >
          {initials}
        </div>
        <span className="text-sm text-white/90 hidden md:inline">{user.name}</span>
      </button>

      {open && (
        <div
          className="absolute top-full right-0 mt-1 w-64 bg-popover border border-border rounded-lg py-1 z-50 max-h-[calc(100vh-4rem)] overflow-y-auto"
          style={{ boxShadow: 'var(--shadow-8)' }}
        >
          {/* User info */}
          <div className="px-3 py-2 border-b border-border">
            <div className="text-sm font-semibold">{user.name}</div>
            <div className="text-xs text-muted-foreground">{user.email}</div>
            <div className="text-xs text-muted-foreground mt-0.5">
              Role: {roleLabels[user.role]}
            </div>
          </div>

          {/* Account actions */}
          <button className="w-full flex items-center gap-3 px-3 py-2 text-sm hover:bg-accent transition-colors cursor-pointer">
            <User size={16} className="text-muted-foreground" />
            Update Profile
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2 text-sm hover:bg-accent transition-colors cursor-pointer">
            <Key size={16} className="text-muted-foreground" />
            Change Password
          </button>
          <a
            href="https://sos.bessemermanagement.com/web/sos"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center gap-3 px-3 py-2 text-sm hover:bg-accent transition-colors"
          >
            <Monitor size={16} className="text-muted-foreground" />
            Remote Assistance
          </a>

          <div className="border-t border-border my-1" />

          {/* Demo section */}
          <div className="px-3 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Demo
          </div>

          {/* Notes Toggle */}
          <button
            onClick={onToggleNotes}
            className="w-full flex items-center justify-between px-3 py-2 text-sm hover:bg-accent transition-colors cursor-pointer"
          >
            <span className="text-sm">Notes</span>
            <div
              className="relative w-9 h-5 rounded-full transition-colors"
              style={{ backgroundColor: showNotes ? 'var(--brand-primary)' : 'var(--neutral-grey-14)' }}
            >
              <div
                className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                  showNotes ? 'translate-x-4' : 'translate-x-0.5'
                }`}
                style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.3)' }}
              />
            </div>
          </button>

          {/* Switch Company */}
          <div className="px-3 pt-3 pb-1 text-[11px] font-medium text-muted-foreground">
            Switch Company
          </div>
          {brandIds.map((id) => {
            const b = brands[id]
            const isActive = brand.id === id
            return (
              <button
                key={id}
                onClick={() => setBrand(id)}
                className={`w-full flex items-center gap-3 px-3 py-1.5 text-sm hover:bg-accent transition-colors cursor-pointer ${
                  isActive ? 'font-semibold' : ''
                }`}
              >
                <div
                  className="w-3.5 h-3.5 rounded-full shrink-0"
                  style={{ backgroundColor: b.colors.primary }}
                />
                <span className="flex-1 text-left">{b.name}</span>
                {isActive && <Check size={14} className="text-[var(--brand-primary)]" />}
              </button>
            )
          })}

          {/* Switch Role */}
          <div className="px-3 pt-3 pb-1 text-[11px] font-medium text-muted-foreground">
            Switch Role
          </div>
          {(['agent_owner', 'employee', 'admin'] as UserRole[]).map((role) => (
            <button
              key={role}
              onClick={() => { onSetRole(role); setOpen(false) }}
              className={`w-full flex items-center gap-3 px-3 py-1.5 text-sm hover:bg-accent transition-colors cursor-pointer ${
                user.role === role ? 'font-semibold text-[var(--brand-primary)]' : ''
              }`}
            >
              <ShieldCheck size={14} className="text-muted-foreground" />
              <span>{roleLabels[role]}</span>
            </button>
          ))}

          <div className="border-t border-border my-1" />

          <button
            onClick={() => { onLogout(); setOpen(false) }}
            className="w-full flex items-center gap-3 px-3 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors cursor-pointer"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      )}
    </div>
  )
}
