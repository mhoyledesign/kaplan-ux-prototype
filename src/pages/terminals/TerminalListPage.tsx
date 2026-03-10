import { useState } from 'react'
import { Search, MapPin, Phone, Mail, Clock, ExternalLink } from 'lucide-react'

const terminals = [
  { id: 1, code: 'CLE-01', name: 'Cleveland Main Terminal', address: '4500 Industrial Pkwy', city: 'Cleveland', state: 'OH', zip: '44135', phone: '(216) 555-0100', manager: 'Tom Bradley', email: 'cleveland@kaplantruck.com', hours: 'Mon–Fri 6:00 AM – 6:00 PM' },
  { id: 2, code: 'AKR-01', name: 'Akron Terminal', address: '1200 Brittain Rd', city: 'Akron', state: 'OH', zip: '44305', phone: '(330) 555-0200', manager: 'Lisa Chen', email: 'akron@kaplantruck.com', hours: 'Mon–Fri 7:00 AM – 5:00 PM' },
  { id: 3, code: 'PIT-01', name: 'Pittsburgh Terminal', address: '800 Neville Island Blvd', city: 'Pittsburgh', state: 'PA', zip: '15225', phone: '(412) 555-0300', manager: 'Dave Kowalski', email: 'pittsburgh@kaplantruck.com', hours: 'Mon–Fri 6:00 AM – 6:00 PM' },
  { id: 4, code: 'COL-01', name: 'Columbus Terminal', address: '3200 Westbelt Dr', city: 'Columbus', state: 'OH', zip: '43228', phone: '(614) 555-0400', manager: 'Angela Morris', email: 'columbus@kaplantruck.com', hours: 'Mon–Fri 7:00 AM – 5:00 PM' },
  { id: 5, code: 'IND-01', name: 'Indianapolis Terminal', address: '5600 W Raymond St', city: 'Indianapolis', state: 'IN', zip: '46241', phone: '(317) 555-0500', manager: 'Rick Torres', email: 'indy@kaplantruck.com', hours: 'Mon–Sat 6:00 AM – 8:00 PM' },
  { id: 6, code: 'WHL-01', name: 'Wheeling Terminal', address: '100 Commerce St', city: 'Wheeling', state: 'WV', zip: '26003', phone: '(304) 555-0600', manager: 'Janet Webb', email: 'wheeling@kaplantruck.com', hours: 'Mon–Fri 7:00 AM – 4:00 PM' },
  { id: 7, code: 'CIN-01', name: 'Cincinnati Terminal', address: '2800 River Rd', city: 'Cincinnati', state: 'OH', zip: '45204', phone: '(513) 555-0700', manager: 'Mark Sullivan', email: 'cincinnati@kaplantruck.com', hours: 'Mon–Fri 6:00 AM – 6:00 PM' },
  { id: 8, code: 'TOL-01', name: 'Toledo Terminal', address: '1900 Front St', city: 'Toledo', state: 'OH', zip: '43605', phone: '(419) 555-0800', manager: 'Karen Nguyen', email: 'toledo@kaplantruck.com', hours: 'Mon–Fri 7:00 AM – 5:00 PM' },
]

export function TerminalListPage() {
  const [search, setSearch] = useState('')

  const filtered = terminals.filter((t) =>
    `${t.code} ${t.name} ${t.city} ${t.state}`.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="max-w-5xl">
      <h1 className="text-2xl font-semibold mb-1">Terminal List</h1>
      <p className="text-sm text-muted-foreground mb-6">
        Search by terminal name, code, city, or state.
      </p>

      {/* Search */}
      <div className="relative mb-6">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search terminals..."
          className="w-full pl-10 pr-4 py-2.5 border border-input-border rounded-lg bg-input-background text-sm focus:outline-none focus:border-b-2 focus:border-b-[var(--brand-primary)]"
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((t) => (
          <div
            key={t.id}
            className="bg-card border border-border rounded-lg overflow-hidden"
            style={{ boxShadow: 'var(--shadow-2)' }}
          >
            <div className="h-1" style={{ backgroundColor: 'var(--brand-primary)' }} />
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold">{t.name}</h3>
                <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-secondary text-muted-foreground">
                  {t.code}
                </span>
              </div>
              <div className="space-y-1.5 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin size={13} className="shrink-0" />
                  <span>{t.address}, {t.city}, {t.state} {t.zip}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={13} className="shrink-0" />
                  <span>{t.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={13} className="shrink-0" />
                  <span>{t.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={13} className="shrink-0" />
                  <span>{t.hours}</span>
                </div>
              </div>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                <span className="text-xs text-muted-foreground">Manager: <span className="font-medium text-foreground">{t.manager}</span></span>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(`${t.address}, ${t.city}, ${t.state} ${t.zip}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium flex items-center gap-1 hover:underline"
                  style={{ color: 'var(--brand-primary)' }}
                >
                  Directions <ExternalLink size={11} />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <MapPin size={32} className="mx-auto mb-3 opacity-50" />
          <p className="text-sm">No terminals found matching "{search}"</p>
        </div>
      )}
    </div>
  )
}
