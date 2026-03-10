import { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { ChevronDown, ChevronRight, FileText, Download } from 'lucide-react'
import type { AuthUser } from '@/hooks/useAuth'

interface OutletCtx { showCms: boolean; user: AuthUser }

const categories = ['All', 'Company News', 'Safety', 'Compliance', 'HR', 'Operations']

const newsItems = [
  { id: 1, title: 'New Columbus Terminal Opening March 15', date: '2026-03-03', category: 'Company News', preview: 'We are excited to announce the grand opening of our new Columbus terminal facility.', content: 'The new Columbus terminal at 3200 Westbelt Dr will feature expanded dock capacity, modern driver facilities, and a dedicated agent services office. The grand opening ceremony is scheduled for March 15 at 10:00 AM. All agents are invited to attend.', hasAttachment: true, attachmentName: 'Columbus-Terminal-Details.pdf', isNew: true },
  { id: 2, title: 'Q1 2026 Rate Adjustments', date: '2026-03-01', category: 'Operations', preview: 'Updated fuel surcharge rates effective March 1, 2026.', content: 'Effective March 1, 2026, fuel surcharge rates have been adjusted based on current DOE national average diesel prices. The new base rate is $0.52/mile for linehaul and $0.48/mile for intermodal. Please update your quoting systems accordingly.', hasAttachment: true, attachmentName: 'Q1-Rate-Schedule.pdf', isNew: true },
  { id: 3, title: 'Hours of Service Compliance Reminder', date: '2026-02-25', category: 'Compliance', preview: 'All drivers must comply with updated HOS regulations.', content: 'Per FMCSA regulations effective January 2026, all drivers must comply with updated Hours of Service requirements. Key changes include modified split sleeper berth provisions and updated short-haul exemptions. Ensure all drivers in your terminal are aware of these changes.', hasAttachment: false, isNew: false },
  { id: 4, title: 'Winter Weather Safety Advisory', date: '2026-02-20', category: 'Safety', preview: 'Important safety reminders for winter driving conditions.', content: 'With continued winter weather across the Midwest and Northeast, please remind all drivers to: conduct thorough pre-trip inspections focusing on tire condition and chains, maintain safe following distances, reduce speed in adverse conditions, and report any weather-related incidents immediately.', hasAttachment: false, isNew: false },
  { id: 5, title: 'Driver Recruitment Bonus Extended', date: '2026-02-15', category: 'HR', preview: 'The $2,000 driver referral bonus program has been extended.', content: 'Due to continued demand, the $2,000 driver referral bonus program has been extended through Q2 2026. Agents who refer qualified drivers who complete 90 days of employment will receive the full bonus. Contact HR for referral forms.', hasAttachment: true, attachmentName: 'Referral-Program-Details.pdf', isNew: false },
  { id: 6, title: 'Transflo Scanning System Update', date: '2026-02-10', category: 'Operations', preview: 'New version of Transflo scanning application available.', content: 'Transflo has released version 4.2 of their scanning application. Key improvements include faster document processing, improved image quality for mobile scans, and new barcode recognition. All terminals should update by February 28.', hasAttachment: false, isNew: false },
  { id: 7, title: 'CVSA Roadcheck Preparation', date: '2026-02-05', category: 'Safety', preview: 'Annual CVSA International Roadcheck scheduled for June.', content: 'The annual CVSA International Roadcheck is scheduled for June 3-5, 2026. This year\'s focus areas include brake systems and cargo securement. Begin preparing your fleet now by conducting thorough brake inspections and reviewing cargo securement training materials.', hasAttachment: false, isNew: false },
  { id: 8, title: 'Memorial Day Holiday Schedule', date: '2026-02-01', category: 'Company News', preview: 'Terminal operating schedules for Memorial Day weekend.', content: 'All terminals will operate on modified schedules during the Memorial Day holiday weekend (May 23-25). Most terminals will be closed Monday, May 25. Check with your terminal manager for specific hours and emergency contact numbers.', hasAttachment: false, isNew: false },
]

export function NewsPage() {
  const { showCms } = useOutletContext<OutletCtx>()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [expandedId, setExpandedId] = useState<number | null>(null)

  const filtered = newsItems.filter((n) => {
    const matchesCategory = category === 'All' || n.category === category
    const matchesSearch = n.title.toLowerCase().includes(search.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-semibold mb-1">News & Updates</h1>
      <p className="text-sm text-muted-foreground mb-6">
        Company announcements, policy changes, and operational updates.
      </p>

      {/* Filters */}
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer ${
              category === c
                ? 'text-white'
                : 'bg-secondary text-secondary-foreground hover:bg-muted'
            }`}
            style={category === c ? { backgroundColor: 'var(--brand-primary)' } : undefined}
          >
            {c}
          </button>
        ))}
      </div>

      {/* News list */}
      <div className={showCms ? 'cms-indicator' : ''}>
        <div className="space-y-2">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-card border border-border rounded-lg overflow-hidden cursor-pointer hover:border-[var(--brand-primary)]/20 transition-colors"
              style={{ boxShadow: 'var(--shadow-2)' }}
              onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
            >
              <div className="p-4">
                <div className="flex items-center gap-2 mb-1.5">
                  {item.isNew && (
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-destructive text-white uppercase tracking-wider">
                      New
                    </span>
                  )}
                  <span
                    className="text-[10px] font-semibold px-2 py-0.5 rounded-full text-white"
                    style={{ backgroundColor: 'var(--brand-primary)' }}
                  >
                    {item.category}
                  </span>
                  <span className="text-xs text-muted-foreground">{item.date}</span>
                </div>
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold">{item.title}</h3>
                  {expandedId === item.id ? (
                    <ChevronDown size={16} className="text-muted-foreground shrink-0" />
                  ) : (
                    <ChevronRight size={16} className="text-muted-foreground shrink-0" />
                  )}
                </div>
                {expandedId !== item.id && (
                  <p className="text-xs text-muted-foreground mt-1">{item.preview}</p>
                )}
              </div>

              {expandedId === item.id && (
                <div className="px-4 pb-4 border-t border-border pt-3">
                  <p className="text-sm text-foreground leading-relaxed">{item.content}</p>
                  {item.hasAttachment && (
                    <div className="mt-3 flex items-center gap-2 p-2 rounded-md bg-secondary">
                      <FileText size={16} className="text-muted-foreground" />
                      <span className="text-xs font-medium flex-1">{item.attachmentName}</span>
                      <button className="p-1 rounded hover:bg-muted cursor-pointer">
                        <Download size={14} style={{ color: 'var(--brand-primary)' }} />
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <p className="text-sm">No news items match your filter.</p>
        </div>
      )}
    </div>
  )
}
