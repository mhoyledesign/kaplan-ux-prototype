import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import {
  Home, FileText, MapPin, Users, Newspaper, BookOpen,
  BarChart3, ExternalLink, Wrench, Settings,
  ChevronLeft, ChevronRight, Menu, X
} from 'lucide-react'
import { useBrand } from '@/theme/BrandContext'

const navItems = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/statements', label: 'Statements', icon: FileText },
  { to: '/terminals', label: 'Terminal List', icon: MapPin },
  { to: '/employees', label: 'Employee Directory', icon: Users },
  { to: '/news', label: 'News & Updates', icon: Newspaper },
  { to: '/library', label: 'Library', icon: BookOpen },
  { to: '/reports', label: 'Reports', icon: BarChart3 },
]

const externalLinks = [
  { href: 'https://www.rmis.com', label: 'Carrier Approval', icon: ExternalLink },
]

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
  isAdmin: boolean
  mobileOpen: boolean
  onMobileClose: () => void
}

export function Sidebar({ collapsed, onToggle, isAdmin, mobileOpen, onMobileClose }: SidebarProps) {
  const { brand } = useBrand()
  const location = useLocation()
  const navigate = useNavigate()

  const handleNavClick = () => {
    onMobileClose()
  }

  const sidebarContent = (
    <>
      {/* Desktop hamburger at top */}
      <div className="hidden md:flex items-center h-10 px-3 border-b border-sidebar-border">
        <button
          onClick={onToggle}
          className="flex items-center gap-3 px-3 py-1.5 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-sidebar-accent transition-colors cursor-pointer"
        >
          <Menu size={20} className="shrink-0" />
          {!collapsed && <span>Close menu</span>}
        </button>
      </div>

      {/* Mobile close button */}
      <div className="flex md:hidden items-center h-10 px-3 border-b border-sidebar-border">
        <button
          onClick={onMobileClose}
          className="flex items-center gap-3 px-3 py-1.5 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-sidebar-accent transition-colors cursor-pointer"
        >
          <X size={20} className="shrink-0" />
          <span>Close menu</span>
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto py-3 px-3">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = item.to === '/'
            ? location.pathname === '/'
            : location.pathname.startsWith(item.to)
          return (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={handleNavClick}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium
                transition-colors duration-150 mb-1
                ${isActive
                  ? 'text-[var(--brand-primary)]'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent'
                }
              `}
              style={isActive ? { backgroundColor: 'var(--brand-primary-light)' } : undefined}
            >
              <Icon size={20} strokeWidth={isActive ? 2 : 1.5} className="shrink-0" />
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
              className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent transition-colors duration-150 mb-1"
            >
              <Icon size={20} strokeWidth={1.5} className="shrink-0" />
              {!collapsed && (
                <>
                  <span className="flex-1">{item.label}</span>
                  <ExternalLink size={12} className="text-muted-foreground" />
                </>
              )}
            </a>
          )
        })}

        {/* Tools & Resources */}
        <NavLink
          to="/tools"
          onClick={handleNavClick}
          className={`
            flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium
            transition-colors duration-150 mb-1
            ${location.pathname.startsWith('/tools')
              ? 'text-[var(--brand-primary)]'
              : 'text-sidebar-foreground hover:bg-sidebar-accent'
            }
          `}
          style={location.pathname.startsWith('/tools') ? { backgroundColor: 'var(--brand-primary-light)' } : undefined}
        >
          <Wrench size={20} strokeWidth={location.pathname.startsWith('/tools') ? 2 : 1.5} className="shrink-0" />
          {!collapsed && <span>Tools & Resources</span>}
        </NavLink>

        {/* Admin separator + link */}
        {isAdmin && (
          <>
            <div className="my-3 border-t border-sidebar-border" />
            <NavLink
              to="/admin"
              onClick={handleNavClick}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium
                transition-colors duration-150
                ${location.pathname === '/admin'
                  ? 'text-[var(--brand-primary)]'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent'
                }
              `}
              style={location.pathname === '/admin' ? { backgroundColor: 'var(--brand-primary-light)' } : undefined}
            >
              <Settings size={20} strokeWidth={location.pathname === '/admin' ? 2 : 1.5} className="shrink-0" />
              {!collapsed && <span>Site Admin</span>}
            </NavLink>
          </>
        )}
      </nav>

      {/* Collapse toggle — desktop only */}
      <button
        onClick={onToggle}
        className="hidden md:flex items-center justify-center h-10 border-t border-sidebar-border text-muted-foreground hover:text-foreground hover:bg-sidebar-accent transition-colors cursor-pointer"
      >
        {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>
    </>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={`
          hidden md:flex fixed left-0 top-14 bottom-0 z-30 bg-sidebar border-r border-sidebar-border
          transition-all duration-200 flex-col
          ${collapsed ? 'w-16' : 'w-56'}
        `}
      >
        {sidebarContent}
      </aside>

      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={onMobileClose}
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={`
          fixed left-0 top-0 bottom-0 z-50 w-64 bg-sidebar border-r border-sidebar-border
          flex flex-col md:hidden
          transition-transform duration-200
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {sidebarContent}
      </aside>
    </>
  )
}
