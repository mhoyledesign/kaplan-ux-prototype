export interface AdminAction {
  id: number
  action: string
  user: string
  performedBy: string
  timestamp: string
  type: 'user_created' | 'user_disabled' | 'user_enabled' | 'password_reset' | 'role_changed'
}

export const adminActions: AdminAction[] = [
  {
    id: 1,
    action: 'Created new user account',
    user: 'Jason Mercer',
    performedBy: 'Rachel Semple',
    timestamp: '2026-03-04T09:12:00',
    type: 'user_created',
  },
  {
    id: 2,
    action: 'Reset password',
    user: 'Bill Hargrove',
    performedBy: 'Nathan Graff',
    timestamp: '2026-03-03T15:44:00',
    type: 'password_reset',
  },
  {
    id: 3,
    action: 'Disabled user account',
    user: 'Carl Whitmore',
    performedBy: 'Rachel Semple',
    timestamp: '2026-03-03T11:20:00',
    type: 'user_disabled',
  },
  {
    id: 4,
    action: 'Changed role from Employee to Agent Owner',
    user: 'Diane Phelps',
    performedBy: 'Rachel Semple',
    timestamp: '2026-03-02T14:05:00',
    type: 'role_changed',
  },
  {
    id: 5,
    action: 'Created new user account',
    user: 'Kevin Stahl',
    performedBy: 'Nathan Graff',
    timestamp: '2026-03-02T10:30:00',
    type: 'user_created',
  },
  {
    id: 6,
    action: 'Reset password',
    user: 'Maria Santos',
    performedBy: 'Rachel Semple',
    timestamp: '2026-03-01T08:55:00',
    type: 'password_reset',
  },
  {
    id: 7,
    action: 'Re-enabled user account',
    user: 'Doug Linden',
    performedBy: 'Nathan Graff',
    timestamp: '2026-02-28T16:18:00',
    type: 'user_enabled',
  },
  {
    id: 8,
    action: 'Changed role from Agent Owner to Admin',
    user: 'Rachel Semple',
    performedBy: 'Linda Marsden',
    timestamp: '2026-02-27T09:40:00',
    type: 'role_changed',
  },
  {
    id: 9,
    action: 'Disabled user account',
    user: 'Frank Olesky',
    performedBy: 'Rachel Semple',
    timestamp: '2026-02-26T13:22:00',
    type: 'user_disabled',
  },
  {
    id: 10,
    action: 'Created new user account',
    user: 'Tammy Bristow',
    performedBy: 'Nathan Graff',
    timestamp: '2026-02-25T11:05:00',
    type: 'user_created',
  },
  {
    id: 11,
    action: 'Reset password',
    user: 'Greg Vanover',
    performedBy: 'Rachel Semple',
    timestamp: '2026-02-24T14:50:00',
    type: 'password_reset',
  },
  {
    id: 12,
    action: 'Created new user account',
    user: 'Lisa Chen',
    performedBy: 'Nathan Graff',
    timestamp: '2026-02-22T09:15:00',
    type: 'user_created',
  },
]
