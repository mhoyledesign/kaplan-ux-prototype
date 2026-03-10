import { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { Search, FileText, Play, GraduationCap, Download, ExternalLink } from 'lucide-react'
import type { AuthUser } from '@/hooks/useAuth'

interface OutletCtx { showCms: boolean; user: AuthUser }

const categories = ['All', 'Safety', 'Policy', 'Operations', 'Compliance']
const types = ['All', 'PDF', 'Video', 'Training']

const items = [
  { id: 1, title: 'Safety Policy Manual 2026', description: 'Complete safety policy manual including DOT compliance requirements and company safety procedures.', type: 'PDF', category: 'Safety', date: '2026-01-15', fileSize: '2.4 MB' },
  { id: 2, title: 'Personal Conveyance Rules', description: 'FMCSA guidelines on personal conveyance and how they apply to Kaplan drivers.', type: 'PDF', category: 'Compliance', date: '2025-11-20', fileSize: '580 KB' },
  { id: 3, title: 'Transflo Cover Sheet', description: 'Standard cover sheet template for Transflo document scanning submissions.', type: 'PDF', category: 'Operations', date: '2025-10-01', fileSize: '125 KB' },
  { id: 4, title: 'PM Requirements Guide', description: 'Preventive maintenance requirements and schedules for all fleet equipment.', type: 'PDF', category: 'Operations', date: '2025-09-15', fileSize: '1.1 MB' },
  { id: 5, title: 'Cargo Securement Training', description: 'Video training on proper cargo securement methods for flatbed and container operations.', type: 'Video', category: 'Safety', duration: '18 min', date: '2025-08-10' },
  { id: 6, title: 'ELD Compliance Overview', description: 'Electronic Logging Device compliance requirements and best practices for agents.', type: 'Video', category: 'Compliance', duration: '12 min', date: '2025-06-01' },
  { id: 7, title: 'Drug & Alcohol Testing Policy', description: 'Company policy on drug and alcohol testing procedures, including random testing protocols.', type: 'PDF', category: 'Policy', date: '2026-01-01', fileSize: '890 KB' },
  { id: 8, title: 'Agent Operating Agreement', description: 'Standard agent operating agreement template and reference guide.', type: 'PDF', category: 'Policy', date: '2025-12-01', fileSize: '1.5 MB' },
  { id: 9, title: 'New Agent Onboarding', description: 'Complete onboarding course for new agents covering portal systems, procedures, and contacts.', type: 'Training', category: 'Operations', duration: '45 min', date: '2026-02-01' },
  { id: 10, title: 'Pre-Trip Inspection Walkthrough', description: 'Step-by-step video guide for conducting thorough pre-trip vehicle inspections.', type: 'Video', category: 'Safety', duration: '22 min', date: '2025-04-15' },
  { id: 11, title: 'Hazmat Refresher Course', description: 'Required annual hazmat handling refresher training for all agents handling hazmat freight.', type: 'Training', category: 'Compliance', duration: '30 min', date: '2026-01-20' },
  { id: 12, title: 'Winter Driving Safety', description: 'Training module covering safe driving practices in winter weather conditions.', type: 'Training', category: 'Safety', duration: '25 min', date: '2025-11-01' },
]

const typeConfig = {
  PDF: { icon: FileText, color: '#107c10', bg: '#e8f5e8' },
  Video: { icon: Play, color: '#1a5276', bg: '#d6eaf8' },
  Training: { icon: GraduationCap, color: '#6c3483', bg: '#f4ecf7' },
}

export function LibraryPage() {
  const { showCms } = useOutletContext<OutletCtx>()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [type, setType] = useState('All')

  const filtered = items.filter((item) => {
    const matchesSearch = `${item.title} ${item.description}`.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = category === 'All' || item.category === category
    const matchesType = type === 'All' || item.type === type
    return matchesSearch && matchesCategory && matchesType
  })

  return (
    <div className="max-w-5xl">
      <h1 className="text-2xl font-semibold mb-1">Library</h1>
      <p className="text-sm text-muted-foreground mb-6">
        Documents, videos, and training resources.
      </p>

      {/* Search */}
      <div className="relative mb-4">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search library..."
          className="w-full pl-10 pr-4 py-2.5 border border-input-border rounded-lg bg-input-background text-sm focus:outline-none focus:border-b-2 focus:border-b-[var(--brand-primary)]"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-semibold text-muted-foreground">Category:</span>
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                category === c ? 'text-white' : 'bg-secondary text-secondary-foreground hover:bg-muted'
              }`}
              style={category === c ? { backgroundColor: 'var(--brand-primary)' } : undefined}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-semibold text-muted-foreground">Type:</span>
          {types.map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                type === t ? 'text-white' : 'bg-secondary text-secondary-foreground hover:bg-muted'
              }`}
              style={type === t ? { backgroundColor: 'var(--brand-primary)' } : undefined}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className={showCms ? 'cms-indicator' : ''}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((item) => {
            const cfg = typeConfig[item.type as keyof typeof typeConfig]
            const Icon = cfg.icon
            return (
              <div
                key={item.id}
                className="bg-card border border-border rounded-lg overflow-hidden hover:border-[var(--brand-primary)]/20 transition-colors cursor-pointer"
                style={{ boxShadow: 'var(--shadow-2)' }}
              >
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div
                      className="w-8 h-8 rounded-md flex items-center justify-center"
                      style={{ backgroundColor: cfg.bg }}
                    >
                      <Icon size={16} style={{ color: cfg.color }} />
                    </div>
                    <span
                      className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: cfg.bg, color: cfg.color }}
                    >
                      {item.type}
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold mb-1">{item.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{item.description}</p>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                    <span className="text-xs text-muted-foreground">
                      {item.fileSize || item.duration} · {item.date}
                    </span>
                    {item.type === 'PDF' ? (
                      <Download size={14} style={{ color: 'var(--brand-primary)' }} />
                    ) : (
                      <ExternalLink size={14} style={{ color: 'var(--brand-primary)' }} />
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <p className="text-sm">No resources found matching your filters.</p>
        </div>
      )}
    </div>
  )
}
