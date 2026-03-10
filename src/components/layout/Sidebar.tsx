import { NavLink, useLocation } from 'react-router-dom'
import {
  Home, FileText, MapPin, Users, Newspaper, BookOpen,
  BarChart3, Shield, ExternalLink, Wrench, Settings,
  ChevronLeft, ChevronRight
} from 'lucide-react'
import { useBrand } from '@/theme/BrandContext'

const navItems = [
  { to: '/', label: 'Dashboard', icon: Home },
  { to: '/statements', label: 'Statements', icon: FileText },
  { to: '/terminals', label: 'Terminal List', icon: MapPin },
  { to: '/employees', label: 'Employee Directory', icon: Users },
  { to: '/news', label: 'News & Updates', icon: Newspaper },
  { to: '/library', label: 'Library', icon: BookOpen },
  { to: '/reports', label: 'Reports', icon: BarChart3 },
  { to: '/safety', label: 'Safety', icon: Shield },
]

const externalLinks = [
  { href: 'https://www.rmis.com', label: 'Carrier Approval', icon: ExternalLink },
]

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
  isAdmin: boolean
}

export function Sidebar({ collapsed, onToggle, isAdmin }: SidebarProps) {
  const { brand } = useBrand()
  const location = useLocation()

  return (
    <aside
      className={`
        fixed left-0 top-14 bottom-0 z-30 bg-sidebar border-r border-sidebar-border
        transition-all duration-200 flex flex-col
        ${collapsed ? 'w-16' : 'w-56'}
      `}
    >
      <nav className="flex-1 overflow-y-auto py-2 px-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = item.to === '/'
            ? location.pathname === '/'
            : location.pathname.startsWith(item.to)
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={`
                flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium
                transition-colors duration-150 mb-0.5
                ${isActive
                  ? 'text-[var(--brand-primary)]'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent'
                }
              `}
              style={isActive ? { backgroundColor: 'var(--brand-primary-light)' } : undefined}
            >
              <Icon size={18} strokeWidth={isActive ? 2 : 1.5} className="shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          )
        })}

        {/* External links */}
        {externalLinks.map((item) => {
          const Icon = item.icon
          return (
            <a
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent transition-colors duration-150 mb-0.5"
            >
              <Icon size={18} strokeWidth={1.5} className="shrink-0" />
              {!collapsed && (
                <>
                  <span className="flex-1">{item.label}</span>
                  <ExternalLink size={12} className="text-muted-foreground" />
                </>
              )}
            </a>
          )
        })}

        {/* Tools */}
        <NavLink
          to="/tools"
          className={`
            flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium
            transition-colors duration-150 mb-0.5
            ${location.pathname.startsWith('/tools')
              ? 'text-[var(--brand-primary)]'
              : 'text-sidebar-foreground hover:bg-sidebar-accent'
            }
          `}
          style={location.pathname.startsWith('/tools') ? { backgroundColor: 'var(--brand-primary-light)' } : undefined}
        >
          <Wrench size={18} strokeWidth={location.pathname.startsWith('/tools') ? 2 : 1.5} className="shrink-0" />
          {!collapsed && <span>Tools</span>}
        </NavLink>

        {/* Admin separator + link */}
        {isAdmin && (
          <>
            <div className="my-3 mx-3 border-t border-sidebar-border" />
            <NavLink
              to="/admin"
              className={`
                flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium
                transition-colors duration-150
                ${location.pathname === '/admin'
                  ? 'text-[var(--brand-primary)]'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent'
                }
              `}
              style={location.pathname === '/admin' ? { backgroundColor: 'var(--brand-primary-light)' } : undefined}
            >
              <Settings size={18} strokeWidth={location.pathname === '/admin' ? 2 : 1.5} className="shrink-0" />
              {!collapsed && <span>Site Admin</span>}
            </NavLink>
          </>
        )}
      </nav>

      {/* Collapse toggle */}
      <button
        onClick={onToggle}
        className="flex items-center justify-center h-10 border-t border-sidebar-border text-muted-foreground hover:text-foreground hover:bg-sidebar-accent transition-colors cursor-pointer"
      >
        {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>
    </aside>
  )
}
