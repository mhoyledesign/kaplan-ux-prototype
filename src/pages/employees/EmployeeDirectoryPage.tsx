import { useState } from 'react'
import { Search, Phone, Mail, MapPin } from 'lucide-react'

const departments = ['All', 'Operations', 'Safety', 'Settlements', 'IT', 'HR', 'Executive']

const avatarColors = ['#2d5016', '#1a5276', '#922b21', '#6c3483', '#2c3e50', '#117a65', '#b9770e', '#1f618d']

const employees = [
  { id: 1, firstName: 'Dave', lastName: 'Kaplan', title: 'President', department: 'Executive', terminal: 'CLE-01', phone: '(216) 555-0101', email: 'dkaplan@kaplantruck.com' },
  { id: 2, firstName: 'JD', lastName: 'Morrison', title: 'IT Director', department: 'IT', terminal: 'CLE-01', phone: '(216) 555-0102', email: 'jd@kaplantruck.com' },
  { id: 3, firstName: 'Kristen', lastName: 'Hayes', title: 'HR & Communications Director', department: 'HR', terminal: 'CLE-01', phone: '(216) 555-0103', email: 'khayes@kaplantruck.com' },
  { id: 4, firstName: 'Steve', lastName: 'Anderson', title: 'IT Services Manager', department: 'IT', terminal: 'CLE-01', phone: '(216) 555-0104', email: 'sanderson@kaplantruck.com' },
  { id: 5, firstName: 'Adam', lastName: 'Petrov', title: 'Tech Services Specialist', department: 'IT', terminal: 'CLE-01', phone: '(216) 555-0105', email: 'apetrov@kaplantruck.com' },
  { id: 6, firstName: 'Sean', lastName: 'O\'Brien', title: 'Development Manager', department: 'IT', terminal: 'CLE-01', phone: '(216) 555-0106', email: 'sobrien@kaplantruck.com' },
  { id: 7, firstName: 'Maria', lastName: 'Gonzalez', title: 'Safety Director', department: 'Safety', terminal: 'CLE-01', phone: '(216) 555-0107', email: 'mgonzalez@kaplantruck.com' },
  { id: 8, firstName: 'Robert', lastName: 'Williams', title: 'Operations Manager', department: 'Operations', terminal: 'CLE-01', phone: '(216) 555-0108', email: 'rwilliams@kaplantruck.com' },
  { id: 9, firstName: 'Jennifer', lastName: 'Park', title: 'Settlements Supervisor', department: 'Settlements', terminal: 'CLE-01', phone: '(216) 555-0109', email: 'jpark@kaplantruck.com' },
  { id: 10, firstName: 'Michael', lastName: 'Thompson', title: 'Settlements Clerk', department: 'Settlements', terminal: 'AKR-01', phone: '(330) 555-0201', email: 'mthompson@kaplantruck.com' },
  { id: 11, firstName: 'Linda', lastName: 'Davis', title: 'HR Coordinator', department: 'HR', terminal: 'CLE-01', phone: '(216) 555-0110', email: 'ldavis@kaplantruck.com' },
  { id: 12, firstName: 'James', lastName: 'Wilson', title: 'Operations Coordinator', department: 'Operations', terminal: 'PIT-01', phone: '(412) 555-0301', email: 'jwilson@kaplantruck.com' },
  { id: 13, firstName: 'Patricia', lastName: 'Martinez', title: 'Safety Coordinator', department: 'Safety', terminal: 'COL-01', phone: '(614) 555-0401', email: 'pmartinez@kaplantruck.com' },
  { id: 14, firstName: 'Daniel', lastName: 'Brown', title: 'Terminal Manager', department: 'Operations', terminal: 'IND-01', phone: '(317) 555-0501', email: 'dbrown@kaplantruck.com' },
  { id: 15, firstName: 'Susan', lastName: 'Lee', title: 'Settlements Analyst', department: 'Settlements', terminal: 'CLE-01', phone: '(216) 555-0111', email: 'slee@kaplantruck.com' },
]

function getInitials(first: string, last: string) {
  return `${first[0]}${last[0]}`
}

function getAvatarColor(lastName: string) {
  const idx = lastName.charCodeAt(0) % avatarColors.length
  return avatarColors[idx]
}

export function EmployeeDirectoryPage() {
  const [search, setSearch] = useState('')
  const [dept, setDept] = useState('All')

  const filtered = employees.filter((e) => {
    const matchesSearch = `${e.firstName} ${e.lastName} ${e.title} ${e.terminal}`.toLowerCase().includes(search.toLowerCase())
    const matchesDept = dept === 'All' || e.department === dept
    return matchesSearch && matchesDept
  })

  return (
    <div className="max-w-5xl">
      <h1 className="text-2xl font-semibold mb-1">Employee Directory</h1>
      <p className="text-sm text-muted-foreground mb-6">
        Search by name, title, or terminal.
      </p>

      {/* Search */}
      <div className="relative mb-4">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search employees..."
          className="w-full pl-10 pr-4 py-2.5 border border-input-border rounded-lg bg-input-background text-sm focus:outline-none focus:border-b-2 focus:border-b-[var(--brand-primary)]"
        />
      </div>

      {/* Department filters */}
      <div className="flex items-center gap-2 mb-6 flex-wrap">
        {departments.map((d) => (
          <button
            key={d}
            onClick={() => setDept(d)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer ${
              dept === d
                ? 'text-white'
                : 'bg-secondary text-secondary-foreground hover:bg-muted'
            }`}
            style={dept === d ? { backgroundColor: 'var(--brand-primary)' } : undefined}
          >
            {d}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((e) => (
          <div
            key={e.id}
            className="bg-card border border-border rounded-lg p-4"
            style={{ boxShadow: 'var(--shadow-2)' }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold text-white shrink-0"
                style={{ backgroundColor: getAvatarColor(e.lastName) }}
              >
                {getInitials(e.firstName, e.lastName)}
              </div>
              <div>
                <div className="text-sm font-semibold">{e.firstName} {e.lastName}</div>
                <div className="text-xs text-muted-foreground">{e.title}</div>
              </div>
            </div>
            <div className="space-y-1.5 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <span
                  className="px-2 py-0.5 rounded-full text-[10px] font-semibold"
                  style={{ backgroundColor: 'var(--brand-primary-light)', color: 'var(--brand-primary)' }}
                >
                  {e.department}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={12} className="shrink-0" />
                <span>{e.terminal}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={12} className="shrink-0" />
                <span>{e.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={12} className="shrink-0" />
                <a href={`mailto:${e.email}`} className="hover:underline" style={{ color: 'var(--brand-primary)' }}>
                  {e.email}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <p className="text-sm">No employees found matching your search.</p>
        </div>
      )}
    </div>
  )
}
