import { useState, useRef, useEffect } from 'react'
import { User, Key, Monitor, LogOut, ShieldCheck } from 'lucide-react'
import type { AuthUser, UserRole } from '@/hooks/useAuth'

interface UserMenuProps {
  user: AuthUser
  onLogout: () => void
  onSetRole: (role: UserRole) => void
}

export function UserMenu({ user, onLogout, onSetRole }: UserMenuProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

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
          className="absolute top-full right-0 mt-1 w-64 bg-popover border border-border rounded-lg py-1 z-50"
          style={{ boxShadow: 'var(--shadow-8)' }}
        >
          <div className="px-3 py-2 border-b border-border">
            <div className="text-sm font-semibold">{user.name}</div>
            <div className="text-xs text-muted-foreground">{user.email}</div>
            <div className="text-xs text-muted-foreground mt-0.5 capitalize">
              Role: {user.role.replace('_', ' ')}
            </div>
          </div>

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

          {/* Role Switcher (demo only) */}
          <div className="px-3 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Demo: Switch Role
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
              <span className="capitalize">{role.replace('_', ' ')}</span>
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
