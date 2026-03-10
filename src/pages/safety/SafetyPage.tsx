import { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { Shield, FileText, MapPin, Building2, AlertTriangle, Phone, Download, Search } from 'lucide-react'
import type { AuthUser } from '@/hooks/useAuth'

interface OutletCtx { showCms: boolean; user: AuthUser }

const tabs = ['Documents', 'Inspection Stations', 'Clinic Locations', 'Accidents & Claims']

const safetyDocs = [
  { title: 'Safety Policy Manual 2026', desc: 'Complete company safety procedures and DOT compliance', date: '2026-01-15', size: '2.4 MB' },
  { title: 'Hazmat Handling Procedures', desc: 'Proper handling, documentation, and emergency response for hazmat freight', date: '2025-12-01', size: '1.8 MB' },
  { title: 'Accident Reporting Guide', desc: 'Step-by-step instructions for reporting accidents and incidents', date: '2025-11-15', size: '650 KB' },
  { title: 'Driver Safety Handbook', desc: 'Comprehensive safety guidelines for all company drivers', date: '2025-10-01', size: '3.1 MB' },
  { title: 'Emergency Response Plan', desc: 'Emergency procedures for terminals and on-road incidents', date: '2025-09-01', size: '1.2 MB' },
  { title: 'Workplace Safety Standards', desc: 'OSHA compliance requirements for terminal operations', date: '2025-08-15', size: '920 KB' },
]

const inspectionStations = [
  { name: 'Ohio State Highway Patrol - Berea', address: '480 Sheldon Rd', city: 'Berea', state: 'OH', phone: '(440) 555-1001', hours: '24/7' },
  { name: 'OSHP - Cambridge', address: '1700 Woodlawn Ave', city: 'Cambridge', state: 'OH', phone: '(740) 555-1002', hours: 'Mon-Fri 8AM-4PM' },
  { name: 'PA State Police - Meadville', address: '11176 Murray Rd', city: 'Meadville', state: 'PA', phone: '(814) 555-1003', hours: '24/7' },
  { name: 'PA State Police - Belle Vernon', address: '560 Circle Dr', city: 'Belle Vernon', state: 'PA', phone: '(724) 555-1004', hours: 'Mon-Sat 7AM-5PM' },
  { name: 'WV State Police - Wheeling', address: '1300 National Rd', city: 'Wheeling', state: 'WV', phone: '(304) 555-1005', hours: '24/7' },
  { name: 'Indiana State Police - Lowell', address: '2300 N Burr St', city: 'Lowell', state: 'IN', phone: '(219) 555-1006', hours: 'Mon-Fri 8AM-4PM' },
  { name: 'OSHP - Findlay', address: '1635 N Main St', city: 'Findlay', state: 'OH', phone: '(419) 555-1007', hours: 'Mon-Fri 7AM-3PM' },
  { name: 'PA State Police - New Castle', address: '3714 New Castle Rd', city: 'New Castle', state: 'PA', phone: '(724) 555-1008', hours: 'Mon-Fri 8AM-4PM' },
]

const clinics = [
  { name: 'Concentra Urgent Care - Cleveland', address: '6100 Rockside Rd', city: 'Independence', state: 'OH', phone: '(216) 555-2001', hours: 'Mon-Fri 8AM-5PM', services: 'DOT Physicals, Drug Testing, Work Injury' },
  { name: 'WorkHealth - Akron', address: '50 N Main St', city: 'Akron', state: 'OH', phone: '(330) 555-2002', hours: 'Mon-Fri 7AM-6PM', services: 'DOT Physicals, Drug Testing, Respiratory Fit' },
  { name: 'MedExpress - Pittsburgh', address: '4525 William Penn Hwy', city: 'Monroeville', state: 'PA', phone: '(412) 555-2003', hours: 'Daily 8AM-8PM', services: 'DOT Physicals, Drug Testing, Urgent Care' },
  { name: 'OhioHealth - Columbus', address: '700 Ackerman Rd', city: 'Columbus', state: 'OH', phone: '(614) 555-2004', hours: 'Mon-Fri 8AM-5PM', services: 'DOT Physicals, Drug Testing, Physical Therapy' },
  { name: 'Patient First - Wheeling', address: '400 Main St', city: 'Wheeling', state: 'WV', phone: '(304) 555-2005', hours: 'Mon-Sat 8AM-6PM', services: 'DOT Physicals, Drug Testing' },
  { name: 'Concentra - Indianapolis', address: '3850 Priority Way S Dr', city: 'Indianapolis', state: 'IN', phone: '(317) 555-2006', hours: 'Mon-Fri 8AM-5PM', services: 'DOT Physicals, Drug Testing, Work Injury' },
]

export function SafetyPage() {
  const { showCms } = useOutletContext<OutletCtx>()
  const [tab, setTab] = useState(tabs[0])
  const [stationSearch, setStationSearch] = useState('')
  const [clinicSearch, setClinicSearch] = useState('')

  return (
    <div className="max-w-5xl">
      <h1 className="text-2xl font-semibold mb-1">Safety</h1>
      <p className="text-sm text-muted-foreground mb-4">
        Safety resources, compliance documents, and approved facilities.
      </p>

      {/* Emergency banner */}
      <div className="flex items-center gap-3 p-3 rounded-lg bg-red-50 border border-red-200 mb-6">
        <Phone size={18} className="text-destructive shrink-0" />
        <div className="text-sm">
          <span className="font-semibold text-destructive">Emergency Hotline:</span>
          <span className="ml-2">(800) 555-SAFE (7233) — Available 24/7</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border mb-6 overflow-x-auto">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors cursor-pointer ${
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

      {/* Documents */}
      {tab === 'Documents' && (
        <div className={showCms ? 'cms-indicator' : ''}>
          <div className="space-y-2">
            {safetyDocs.map((doc) => (
              <div
                key={doc.title}
                className="flex items-center justify-between p-4 bg-card border border-border rounded-lg hover:border-[var(--brand-primary)]/20 transition-colors"
                style={{ boxShadow: 'var(--shadow-2)' }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-md bg-red-50 flex items-center justify-center">
                    <FileText size={18} className="text-red-600" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{doc.title}</div>
                    <div className="text-xs text-muted-foreground">{doc.desc}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{doc.size} · Updated {doc.date}</div>
                  </div>
                </div>
                <button className="p-2 rounded-md hover:bg-muted transition-colors cursor-pointer shrink-0">
                  <Download size={16} style={{ color: 'var(--brand-primary)' }} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Inspection Stations */}
      {tab === 'Inspection Stations' && (
        <>
          <div className="relative mb-4">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={stationSearch}
              onChange={(e) => setStationSearch(e.target.value)}
              placeholder="Search by name, city, or state..."
              className="w-full pl-10 pr-4 py-2.5 border border-input-border rounded-lg bg-input-background text-sm focus:outline-none focus:border-b-2 focus:border-b-[var(--brand-primary)]"
            />
          </div>
          <div className="space-y-2">
            {inspectionStations.filter(s => `${s.name} ${s.city} ${s.state}`.toLowerCase().includes(stationSearch.toLowerCase())).map((s) => (
              <div key={s.name} className="flex items-start gap-3 p-4 bg-card border border-border rounded-lg" style={{ boxShadow: 'var(--shadow-2)' }}>
                <Shield size={18} className="text-muted-foreground shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="text-sm font-semibold">{s.name}</div>
                  <div className="text-xs text-muted-foreground">{s.address}, {s.city}, {s.state}</div>
                  <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                    <span>{s.phone}</span>
                    <span>{s.hours}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Clinic Locations */}
      {tab === 'Clinic Locations' && (
        <>
          <div className="relative mb-4">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={clinicSearch}
              onChange={(e) => setClinicSearch(e.target.value)}
              placeholder="Search clinics..."
              className="w-full pl-10 pr-4 py-2.5 border border-input-border rounded-lg bg-input-background text-sm focus:outline-none focus:border-b-2 focus:border-b-[var(--brand-primary)]"
            />
          </div>
          <div className="space-y-2">
            {clinics.filter(c => `${c.name} ${c.city} ${c.state}`.toLowerCase().includes(clinicSearch.toLowerCase())).map((c) => (
              <div key={c.name} className="p-4 bg-card border border-border rounded-lg" style={{ boxShadow: 'var(--shadow-2)' }}>
                <div className="flex items-start gap-3">
                  <Building2 size={18} className="text-muted-foreground shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-semibold">{c.name}</div>
                    <div className="text-xs text-muted-foreground">{c.address}, {c.city}, {c.state}</div>
                    <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                      <span>{c.phone}</span>
                      <span>{c.hours}</span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {c.services.split(', ').map((s) => (
                        <span key={s} className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Accidents & Claims */}
      {tab === 'Accidents & Claims' && (
        <div className="space-y-4">
          <div className="p-5 bg-card border border-border rounded-lg" style={{ boxShadow: 'var(--shadow-2)' }}>
            <div className="flex items-center gap-3 mb-3">
              <AlertTriangle size={20} className="text-destructive" />
              <h3 className="text-base font-semibold">Report an Incident</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              All accidents and incidents must be reported within 24 hours. For emergencies, call the Safety Hotline immediately.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 rounded-lg bg-red-50 border border-red-200">
                <div className="text-sm font-semibold text-red-700">Emergency (Immediate)</div>
                <div className="text-sm text-red-600">(800) 555-SAFE (7233)</div>
                <div className="text-xs text-red-500 mt-1">Available 24/7</div>
              </div>
              <div className="p-3 rounded-lg bg-amber-50 border border-amber-200">
                <div className="text-sm font-semibold text-amber-700">Non-Emergency Reporting</div>
                <div className="text-sm text-amber-600">(800) 555-0199</div>
                <div className="text-xs text-amber-500 mt-1">Mon-Fri 8AM-5PM ET</div>
              </div>
            </div>
          </div>

          <div className="p-5 bg-card border border-border rounded-lg" style={{ boxShadow: 'var(--shadow-2)' }}>
            <h3 className="text-base font-semibold mb-3">Claims Process</h3>
            <ol className="space-y-3 text-sm text-muted-foreground">
              <li className="flex gap-3">
                <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0" style={{ backgroundColor: 'var(--brand-primary)' }}>1</span>
                <span>Report the incident to Safety immediately via hotline or your terminal manager.</span>
              </li>
              <li className="flex gap-3">
                <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0" style={{ backgroundColor: 'var(--brand-primary)' }}>2</span>
                <span>Complete the Accident Report Form and submit within 24 hours.</span>
              </li>
              <li className="flex gap-3">
                <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0" style={{ backgroundColor: 'var(--brand-primary)' }}>3</span>
                <span>Gather photos, witness information, and police report number if applicable.</span>
              </li>
              <li className="flex gap-3">
                <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0" style={{ backgroundColor: 'var(--brand-primary)' }}>4</span>
                <span>Safety team will follow up within 48 hours with next steps and claim assignment.</span>
              </li>
            </ol>
          </div>
        </div>
      )}
    </div>
  )
}
