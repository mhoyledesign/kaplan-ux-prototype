import { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { Search, MapPin, Phone, FileText, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { AuthUser } from '@/hooks/useAuth'

interface OutletCtx { showNotes: boolean; user: AuthUser }

const regions = ['All Regions', 'Northeast', 'Southeast', 'Midwest', 'Southwest', 'West']

const locations = [
  { id: 1, name: 'Port Newark Container Terminal', address: '102 Port St', city: 'Newark', state: 'NJ', region: 'Northeast', terminalCode: 'NWK-01', phone: '(973) 555-3001', instructions: 'Use gates 4-7 for container unloading. Check in at guard shack with BOL. Hard hats required.' },
  { id: 2, name: 'Baltimore Intermodal Yard', address: '2400 Broening Hwy', city: 'Baltimore', state: 'MD', region: 'Northeast', terminalCode: 'BAL-01', phone: '(410) 555-3002', instructions: 'Flatbed: Use docks 12-18. Container: Follow rail yard signs to crane area. TWIC card required.' },
  { id: 3, name: 'Boston Freight Hub', address: '50 Terminal St', city: 'Charlestown', state: 'MA', region: 'Northeast', terminalCode: 'BOS-01', phone: '(617) 555-3003', instructions: 'Check in at office building. Assigned dock numbers given at check-in. No overnight parking.' },
  { id: 4, name: 'Atlanta Distribution Center', address: '1500 Fulton Industrial Blvd', city: 'Atlanta', state: 'GA', region: 'Southeast', terminalCode: 'ATL-01', phone: '(404) 555-3004', instructions: 'Use dock 3-5 for flatbed loads. Crane available on-site for heavy lifts. Schedule crane 24hr ahead.' },
  { id: 5, name: 'Charlotte Freight Park', address: '4800 Old Pineville Rd', city: 'Charlotte', state: 'NC', region: 'Southeast', terminalCode: 'CLT-01', phone: '(704) 555-3005', instructions: 'Pull through docks A-F. Lumpers available $150-250 per load. Scale on premises.' },
  { id: 6, name: 'Jacksonville Port Terminal', address: '2831 Talleyrand Ave', city: 'Jacksonville', state: 'FL', region: 'Southeast', terminalCode: 'JAX-01', phone: '(904) 555-3006', instructions: 'Container terminal: follow JAXPORT signage. TWIC required. Check in at gate 2.' },
  { id: 7, name: 'Cleveland Main Yard', address: '4500 Industrial Pkwy', city: 'Cleveland', state: 'OH', region: 'Midwest', terminalCode: 'CLE-01', phone: '(216) 555-3007', instructions: 'Home terminal. Use any available dock. Check in with dispatch for dock assignment.' },
  { id: 8, name: 'Chicago Intermodal Hub', address: '6300 W 73rd St', city: 'Bedford Park', state: 'IL', region: 'Midwest', terminalCode: 'CHI-01', phone: '(708) 555-3008', instructions: 'BNSF rail yard: follow intermodal container signs. Drop trailers in lot C. Live unloads at docks 1-8.' },
  { id: 9, name: 'Indianapolis Cross-Dock', address: '5600 W Raymond St', city: 'Indianapolis', state: 'IN', region: 'Midwest', terminalCode: 'IND-01', phone: '(317) 555-3009', instructions: 'Cross-dock facility. Pull to assigned door number (given at check-in). Fast turnaround expected.' },
  { id: 10, name: 'Detroit Steel Yard', address: '1 Steel Dr', city: 'Ecorse', state: 'MI', region: 'Midwest', terminalCode: 'DET-01', phone: '(313) 555-3010', instructions: 'Steel unloading only. Flatbed required. Crane service available. PPE required: hard hat, steel toes, safety vest.' },
  { id: 11, name: 'Dallas Distribution Hub', address: '3500 Irving Blvd', city: 'Dallas', state: 'TX', region: 'Southwest', terminalCode: 'DAL-01', phone: '(214) 555-3011', instructions: 'Receiving hours 6AM-4PM CST. Docks 20-30 for inbound. Scale ticket required.' },
  { id: 12, name: 'Phoenix Freight Center', address: '4040 E Broadway Rd', city: 'Phoenix', state: 'AZ', region: 'Southwest', terminalCode: 'PHX-01', phone: '(602) 555-3012', instructions: 'Temp-controlled dock 1-4. Standard docks 5-12. Check in at main office. Water available for drivers.' },
  { id: 13, name: 'Houston Ship Channel Yard', address: '7600 Navigation Blvd', city: 'Houston', state: 'TX', region: 'Southwest', terminalCode: 'HOU-01', phone: '(713) 555-3013', instructions: 'Container and break-bulk. Follow port signage. TWIC required for restricted areas.' },
  { id: 14, name: 'Los Angeles Port Complex', address: '425 S Palos Verdes St', city: 'San Pedro', state: 'CA', region: 'West', terminalCode: 'LAX-01', phone: '(310) 555-3014', instructions: 'Container terminal: appointment required 48hr in advance. TWIC and clean truck program compliance required.' },
  { id: 15, name: 'Seattle Freight Terminal', address: '3700 E Marginal Way S', city: 'Seattle', state: 'WA', region: 'West', terminalCode: 'SEA-01', phone: '(206) 555-3015', instructions: 'Docks 1-6 for dry freight. Reefer docks 7-10. Lumper services available. 2-hour free time.' },
]

export function EquipmentUnloadingPage() {
  const { showNotes } = useOutletContext<OutletCtx>()
  const [region, setRegion] = useState('All Regions')
  const [search, setSearch] = useState('')

  const filtered = locations.filter((loc) => {
    const matchesRegion = region === 'All Regions' || loc.region === region
    const matchesSearch = `${loc.name} ${loc.city} ${loc.state} ${loc.terminalCode}`.toLowerCase().includes(search.toLowerCase())
    return matchesRegion && matchesSearch
  })

  return (
    <div className="max-w-5xl">
      <Link to="/tools" className="flex items-center gap-1.5 text-sm mb-4 hover:underline" style={{ color: 'var(--brand-primary)' }}>
        <ArrowLeft size={14} /> Back to Tools & Resources
      </Link>

      <h1 className="text-2xl font-semibold mb-1">Equipment Unloading Locations</h1>
      <p className="text-sm text-muted-foreground mb-6">
        Find approved unloading facilities with dock assignments and procedures.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, city, state, or terminal code..."
            className="w-full pl-10 pr-4 py-2.5 border border-input-border rounded-lg bg-input-background text-sm focus:outline-none focus:border-b-2 focus:border-b-[var(--brand-primary)]"
          />
        </div>
        <select
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          className="px-3 py-2.5 border border-input-border rounded-lg bg-input-background text-sm cursor-pointer"
        >
          {regions.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
      </div>

      <div className="text-xs text-muted-foreground mb-3">{filtered.length} location{filtered.length !== 1 ? 's' : ''} found</div>

      <div className={`space-y-3 ${showNotes ? 'notes-indicator' : ''}`}>
        {filtered.map((loc) => (
          <div
            key={loc.id}
            className="bg-card border border-border rounded-lg p-4"
            style={{ boxShadow: 'var(--shadow-2)' }}
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="text-sm font-semibold">{loc.name}</h3>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                  <MapPin size={12} />
                  <span>{loc.address}, {loc.city}, {loc.state}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0 flex-wrap">
                <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-secondary">{loc.terminalCode}</span>
                <span
                  className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: 'var(--brand-primary-light)', color: 'var(--brand-primary)' }}
                >
                  {loc.region}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
              <Phone size={12} />
              <span>{loc.phone}</span>
            </div>
            <div className="flex items-start gap-2 p-3 rounded-md bg-secondary">
              <FileText size={14} className="text-muted-foreground shrink-0 mt-0.5" />
              <p className="text-xs text-foreground leading-relaxed">{loc.instructions}</p>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <p className="text-sm">No locations found matching your search.</p>
        </div>
      )}
    </div>
  )
}
