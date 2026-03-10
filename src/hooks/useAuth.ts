import { useState, useCallback } from 'react'

export type UserRole = 'agent_owner' | 'employee' | 'admin'

export interface AuthUser {
  id: string
  name: string
  email: string
  role: UserRole
  terminals: string[]
  canViewStatements: boolean
}

const mockUsers: Record<UserRole, AuthUser> = {
  agent_owner: {
    id: '1',
    name: 'Robert Mitchell',
    email: 'rmitchell@example.com',
    role: 'agent_owner',
    terminals: ['CLE-01', 'CLE-02', 'AKR-01'],
    canViewStatements: true,
  },
  employee: {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sjohnson@example.com',
    role: 'employee',
    terminals: ['CLE-01'],
    canViewStatements: false,
  },
  admin: {
    id: '3',
    name: 'JD (IT Director)',
    email: 'jd@kaplantruck.com',
    role: 'admin',
    terminals: [],
    canViewStatements: true,
  },
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [role, setRoleState] = useState<UserRole>('agent_owner')

  const login = useCallback(() => {
    setUser(mockUsers[role])
  }, [role])

  const logout = useCallback(() => {
    setUser(null)
  }, [])

  const setRole = useCallback((r: UserRole) => {
    setRoleState(r)
    setUser(mockUsers[r])
  }, [])

  return { user, role, login, logout, setRole, isAdmin: user?.role === 'admin' }
}
