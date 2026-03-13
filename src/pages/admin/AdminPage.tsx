import { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import {
  UserPlus, Search, MoreHorizontal, Shield, Clock,
  CheckCircle2, XCircle, AlertTriangle
} from 'lucide-react'
import type { AuthUser } from '@/hooks/useAuth'

interface OutletCtx { showNotes: boolean; user: AuthUser }

const tabs = ['User Management', 'Activity Log']

const mockUsers = [
  { id: 1, name: 'Robert Mitchell', email: 'rmitchell@example.com', role: 'Agent (Owner)', terminals: ['CLE-01', 'CLE-02', 'AKR-01'], status: 'Active', lastLogin: '2026-03-04 08:32 AM' },
  { id: 2, name: 'Sarah Johnson', email: 'sjohnson@example.com', role: 'Agent (Employee)', terminals: ['CLE-01'], status: 'Active', lastLogin: '2026-03-03 02:15 PM' },
  { id: 3, name: 'Mike Chen', email: 'mchen@example.com', role: 'Agent (Owner)', terminals: ['PIT-01'], status: 'Active', lastLogin: '2026-03-04 09:10 AM' },
  { id: 4, name: 'Linda Torres', email: 'ltorres@example.com', role: 'Agent (Owner)', terminals: ['COL-01', 'CIN-01'], status: 'Active', lastLogin: '2026-02-28 11:45 AM' },
  { id: 5, name: 'James Brown', email: 'jbrown@example.com', role: 'Agent (Employee)', terminals: ['PIT-01'], status: 'Disabled', lastLogin: '2026-01-15 03:20 PM' },
  { id: 6, name: 'Angela Wright', email: 'awright@example.com', role: 'Agent (Owner)', terminals: ['IND-01'], status: 'Active', lastLogin: '2026-03-03 07:55 AM' },
  { id: 7, name: 'Patricia Davis', email: 'pdavis@example.com', role: 'Agent (Employee)', terminals: ['CLE-01'], status: 'Active', lastLogin: '2026-03-01 10:30 AM' },
  { id: 8, name: 'Kevin Park', email: 'kpark@example.com', role: 'Agent (Owner)', terminals: ['TOL-01', 'WHL-01'], status: 'Active', lastLogin: '2026-03-04 06:48 AM' },
  { id: 9, name: 'Dennis Hall', email: 'dhall@example.com', role: 'Agent (Employee)', terminals: ['AKR-01'], status: 'Disabled', lastLogin: '2025-12-20 04:10 PM' },
  { id: 10, name: 'JD Morrison', email: 'jd@kaplantruck.com', role: 'Admin', terminals: ['ALL'], status: 'Active', lastLogin: '2026-03-04 09:00 AM' },
]

const activityLog = [
  { id: 1, action: 'User created', user: 'Thomas Reed', performedBy: 'JD Morrison', time: '2026-03-04 09:15 AM', type: 'user_created' },
  { id: 2, action: 'Password reset', user: 'Sarah Johnson', performedBy: 'Steve Anderson', time: '2026-03-04 08:45 AM', type: 'password_reset' },
  { id: 3, action: 'User disabled', user: 'Dennis Hall', performedBy: 'JD Morrison', time: '2026-03-03 04:30 PM', type: 'user_disabled' },
  { id: 4, action: 'Role changed to Agent (Owner)', user: 'Angela Wright', performedBy: 'JD Morrison', time: '2026-03-03 02:00 PM', type: 'role_changed' },
  { id: 5, action: 'User created', user: 'Kevin Park', performedBy: 'Steve Anderson', time: '2026-03-02 10:20 AM', type: 'user_created' },
  { id: 6, action: 'Password reset', user: 'Mike Chen', performedBy: 'Adam Petrov', time: '2026-03-01 03:15 PM', type: 'password_reset' },
  { id: 7, action: 'User enabled', user: 'Patricia Davis', performedBy: 'JD Morrison', time: '2026-02-28 11:00 AM', type: 'user_enabled' },
  { id: 8, action: 'User disabled', user: 'James Brown', performedBy: 'JD Morrison', time: '2026-02-27 04:45 PM', type: 'user_disabled' },
  { id: 9, action: 'User created', user: 'Linda Torres', performedBy: 'Steve Anderson', time: '2026-02-26 09:30 AM', type: 'user_created' },
  { id: 10, action: 'Password reset', user: 'Robert Mitchell', performedBy: 'Adam Petrov', time: '2026-02-25 01:20 PM', type: 'password_reset' },
]

const typeIcons: Record<string, typeof CheckCircle2> = {
  user_created: UserPlus,
  user_disabled: XCircle,
  user_enabled: CheckCircle2,
  password_reset: Shield,
  role_changed: AlertTriangle,
}

export function AdminPage() {
  const { user } = useOutletContext<OutletCtx>()
  const [tab, setTab] = useState(tabs[0])
  const [search, setSearch] = useState('')
  const [showAddUser, setShowAddUser] = useState(false)

  if (user.role !== 'admin') {
    return (
      <div className="max-w-3xl">
        <h1 className="text-2xl font-semibold mb-4">Site Administration</h1>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 text-center">
          <Shield size={32} className="mx-auto text-amber-600 mb-3" />
          <h2 className="text-lg font-semibold mb-1">Access Restricted</h2>
          <p className="text-sm text-muted-foreground">
            You do not have administrator privileges. Switch to the Admin role using the demo role switcher in the user menu.
          </p>
        </div>
      </div>
    )
  }

  const filteredUsers = mockUsers.filter((u) =>
    `${u.name} ${u.email} ${u.role} ${u.terminals.join(' ')}`.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="max-w-5xl">
      <h1 className="text-2xl font-semibold mb-1">Site Administration</h1>
      <p className="text-sm text-muted-foreground mb-6">
        Manage portal users, roles, and permissions.
      </p>

      {/* Status cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        <div className="bg-card border border-border rounded-lg p-4" style={{ boxShadow: 'var(--shadow-2)' }}>
          <div className="text-2xl font-bold" style={{ color: 'var(--brand-primary)' }}>
            {mockUsers.filter(u => u.status === 'Active').length}
          </div>
          <div className="text-xs text-muted-foreground">Active Users</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4" style={{ boxShadow: 'var(--shadow-2)' }}>
          <div className="text-2xl font-bold text-amber-600">
            {mockUsers.filter(u => u.status === 'Disabled').length}
          </div>
          <div className="text-xs text-muted-foreground">Disabled Users</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4" style={{ boxShadow: 'var(--shadow-2)' }}>
          <div className="text-2xl font-bold text-blue-600">
            {new Set(mockUsers.flatMap(u => u.terminals)).size}
          </div>
          <div className="text-xs text-muted-foreground">Terminals Covered</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border mb-6">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2.5 text-sm font-medium transition-colors cursor-pointer ${
              tab === t
                ? 'border-b-2 text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
            style={tab === t ? { borderBottomColor: 'var(--brand-primary)' } : undefined}
          >
            {t}
          </button>
        ))}
      </div>

      {/* User Management */}
      {tab === 'User Management' && (
        <>
          <div className="flex items-center gap-3 mb-4">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search users..."
                className="w-full pl-10 pr-4 py-2 border border-input-border rounded-lg bg-input-background text-sm focus:outline-none focus:border-b-2 focus:border-b-[var(--brand-primary)]"
              />
            </div>
            <button
              onClick={() => setShowAddUser(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-medium cursor-pointer"
              style={{ backgroundColor: 'var(--brand-primary)' }}
            >
              <UserPlus size={16} /> Add User
            </button>
          </div>

          <div className="bg-card border border-border rounded-lg overflow-hidden" style={{ boxShadow: 'var(--shadow-2)' }}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-secondary/50">
                    <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wider text-muted-foreground">Name</th>
                    <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wider text-muted-foreground">Role</th>
                    <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wider text-muted-foreground">Terminals</th>
                    <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wider text-muted-foreground">Status</th>
                    <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wider text-muted-foreground">Last Login</th>
                    <th className="text-right px-4 py-3 font-semibold text-xs uppercase tracking-wider text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3">
                        <div className="font-medium">{u.name}</div>
                        <div className="text-xs text-muted-foreground">{u.email}</div>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className="text-xs font-medium px-2 py-0.5 rounded-full"
                          style={
                            u.role === 'Admin'
                              ? { backgroundColor: '#f4ecf7', color: '#6c3483' }
                              : u.role === 'Agent (Owner)'
                              ? { backgroundColor: 'var(--brand-primary-light)', color: 'var(--brand-primary)' }
                              : { backgroundColor: '#d6eaf8', color: '#1a5276' }
                          }
                        >
                          {u.role}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs text-muted-foreground">
                        {u.terminals.join(', ')}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`flex items-center gap-1.5 text-xs font-medium ${
                          u.status === 'Active' ? 'text-green-700' : 'text-red-600'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${u.status === 'Active' ? 'bg-green-500' : 'bg-red-500'}`} />
                          {u.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs text-muted-foreground">{u.lastLogin}</td>
                      <td className="px-4 py-3 text-right">
                        <button className="p-1.5 rounded-md hover:bg-muted transition-colors cursor-pointer">
                          <MoreHorizontal size={16} className="text-muted-foreground" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* Activity Log */}
      {tab === 'Activity Log' && (
        <div className="space-y-2">
          {activityLog.map((entry) => {
            const Icon = typeIcons[entry.type] || Clock
            return (
              <div
                key={entry.id}
                className="flex items-start gap-3 p-3 bg-card border border-border rounded-lg"
                style={{ boxShadow: 'var(--shadow-2)' }}
              >
                <Icon size={16} className="text-muted-foreground shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="text-sm">
                    <span className="font-medium">{entry.action}</span>
                    <span className="text-muted-foreground"> — </span>
                    <span className="font-medium">{entry.user}</span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    by {entry.performedBy} · {entry.time}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Add User Modal */}
      {showAddUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50" onClick={() => setShowAddUser(false)} />
          <div
            className="relative bg-white rounded-lg w-full max-w-md z-10"
            style={{ boxShadow: 'var(--shadow-16)' }}
          >
            <div className="px-5 py-4 border-b border-border">
              <h2 className="text-lg font-semibold">Add New User</h2>
            </div>
            <div className="px-5 py-4 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <input className="w-full px-3 py-2 border border-input-border rounded-md bg-input-background text-sm" placeholder="John Smith" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input className="w-full px-3 py-2 border border-input-border rounded-md bg-input-background text-sm" placeholder="jsmith@example.com" type="email" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Role</label>
                <select className="w-full px-3 py-2 border border-input-border rounded-md bg-input-background text-sm cursor-pointer">
                  <option>Agent (Owner)</option>
                  <option>Agent (Employee)</option>
                  <option>Admin</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Terminal(s)</label>
                <input className="w-full px-3 py-2 border border-input-border rounded-md bg-input-background text-sm" placeholder="CLE-01, AKR-01" />
                <p className="text-xs text-muted-foreground mt-1">Comma-separated terminal codes</p>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="viewStatements" className="cursor-pointer" />
                <label htmlFor="viewStatements" className="text-sm cursor-pointer">Can view settlement statements</label>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 px-5 py-4 border-t border-border">
              <button
                onClick={() => setShowAddUser(false)}
                className="px-4 py-2 rounded-md border border-border text-sm font-medium hover:bg-muted transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowAddUser(false)}
                className="px-4 py-2 rounded-md text-white text-sm font-medium cursor-pointer"
                style={{ backgroundColor: 'var(--brand-primary)' }}
              >
                Create User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
