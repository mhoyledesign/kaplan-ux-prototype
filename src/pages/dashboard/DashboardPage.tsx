import { useState } from 'react'
import { useOutletContext, Link } from 'react-router-dom'
import {
  FileText, ExternalLink, Monitor, AlertTriangle, Info,
  CheckCircle2, ChevronRight, ChevronDown, Newspaper, Circle, ArrowRight,
  ClipboardCheck
} from 'lucide-react'
import { useBrand } from '@/theme/BrandContext'
import type { AuthUser } from '@/hooks/useAuth'

interface OutletCtx { showNotes: boolean; user: AuthUser }


interface Task {
  id: number
  title: string
  desc: string
  urgency: 'high' | 'medium' | 'low'
  date: string
  linkTo?: string
  linkLabel?: string
}

const tasks: Task[] = [
  {
    id: 1,
    title: 'Complete DOT Compliance Review',
    desc: 'Your annual DOT compliance review is due by March 15, 2026. Upload required documentation to avoid penalties.',
    urgency: 'high',
    date: 'Due Mar 15',
    linkTo: '/tools/safety',
    linkLabel: 'Go to Safety',
  },
  {
    id: 2,
    title: 'Review Updated Safety Policy Manual',
    desc: 'The 2026 Safety Policy Manual has been updated with new regulations. All agents must acknowledge review.',
    urgency: 'medium',
    date: 'Posted Feb 25',
    linkTo: '/library',
    linkLabel: 'Open in Library',
  },
  {
    id: 3,
    title: 'Download Latest Settlement Statement',
    desc: 'Your weekly settlement for Feb 24–28 ($34,521.80) is ready for download.',
    urgency: 'low',
    date: 'Posted Feb 28',
    linkTo: '/statements',
    linkLabel: 'View Statements',
  },
  {
    id: 4,
    title: 'Acknowledge New Rate Schedule',
    desc: 'Q1 2026 rate adjustments are in effect as of March 1. Review and confirm you\'ve updated your quoting.',
    urgency: 'medium',
    date: 'Due Mar 7',
  },
]

const urgencyConfig = {
  high: { color: '#d13438', bg: '#fde7e9', border: '#f5c2c7', label: 'Urgent', icon: AlertTriangle },
  medium: { color: '#f7630c', bg: '#fff4ec', border: '#ffe0c7', label: 'Action Needed', icon: Info },
  low: { color: 'var(--brand-primary)', bg: 'var(--brand-primary-lighter)', border: 'var(--brand-primary-light)', label: 'FYI', icon: Circle },
}

const quickAccess = [
  { label: 'Statements', desc: 'View & download settlements', icon: FileText, to: '/statements' },
  { label: 'Trinium Dispatch', desc: 'Open dispatch system', icon: ExternalLink, href: 'https://trinium.kaplantruck.com', external: true },
  { label: 'Carrier Approval', desc: 'RMIS broker setup', icon: ExternalLink, href: 'https://www.rmis.com', external: true },
  { label: 'Remote Assistance', desc: 'IT support via Splashtop', icon: Monitor, href: 'https://sos.bessemermanagement.com/web/sos', external: true },
]

const newsFeed = [
  { id: 1, title: 'Holiday Schedule: Memorial Day Operations', date: '2026-02-28', category: 'Operations', preview: 'All terminals will operate on modified schedules during the Memorial Day holiday weekend. Check with your terminal manager for specific hours.' },
  { id: 2, title: 'Updated Safety Policy Manual Available', date: '2026-02-25', category: 'Safety', preview: 'The 2026 Safety Policy Manual has been updated with new DOT regulations. All agents are required to review the changes.' },
  { id: 3, title: 'New Flat-Rate Pricing for Northeast Corridor', date: '2026-02-20', category: 'Company News', preview: 'Effective March 1, new flat-rate pricing applies to all Northeast corridor shipments. Contact your operations manager for details.' },
]

export function DashboardPage() {
  const { showNotes, user } = useOutletContext<OutletCtx>()
  const { brand } = useBrand()
  const [completedTasks, setCompletedTasks] = useState<number[]>([])
  const [showAllTasks, setShowAllTasks] = useState(false)
  const [expandedNews, setExpandedNews] = useState<number | null>(null)

  // Filter out statement-related tasks for users without statement access
  const visibleTasks = user.canViewStatements
    ? tasks
    : tasks.filter(t => t.linkTo !== '/statements')
  const pendingTasks = visibleTasks.filter(t => !completedTasks.includes(t.id))
  const doneTasks = visibleTasks.filter(t => completedTasks.includes(t.id))

  const handleComplete = (id: number) => {
    setCompletedTasks([...completedTasks, id])
  }

  return (
    <div className="max-w-5xl">
      <h1 className="text-2xl font-semibold mb-1">
        {brand.shortName} Portal Home
      </h1>
      <p className="text-muted-foreground text-sm mb-6">
        Hello, {user.name}. Here's what's happening today.
      </p>

      {/* Action Items / Tasks */}
      {pendingTasks.length > 0 && (
        <div className={`mb-8 ${showNotes ? 'notes-indicator' : ''}`}>
          <h2 className="text-xs font-semibold tracking-[0.1em] uppercase text-muted-foreground mb-3 flex items-center gap-2">
            <ClipboardCheck size={14} />
            Action Items
            <span
              className="ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold text-white"
              style={{ backgroundColor: 'var(--brand-primary)' }}
            >
              {pendingTasks.length}
            </span>
          </h2>
          <div className="relative">
            <div
              className="flex flex-col gap-2 overflow-hidden transition-all duration-300"
              style={!showAllTasks && pendingTasks.length > 2 ? { maxHeight: '18rem' } : undefined}
            >
              {pendingTasks.map((task) => {
                const cfg = urgencyConfig[task.urgency]
                const UrgencyIcon = cfg.icon
                return (
                  <div
                    key={task.id}
                    className="rounded-lg border p-4 transition-all duration-200"
                    style={{ backgroundColor: cfg.bg, borderColor: cfg.border }}
                  >
                    <div className="flex items-start gap-3">
                      {/* Urgency indicator */}
                      <div className="shrink-0 mt-0.5">
                        <UrgencyIcon size={18} style={{ color: cfg.color }} />
                      </div>

                      {/* Content + Actions */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                          <span className="text-sm font-semibold">{task.title}</span>
                          <span
                            className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full"
                            style={{ backgroundColor: cfg.color + '18', color: cfg.color }}
                          >
                            {cfg.label}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">{task.desc}</p>
                        <div className="text-[11px] text-muted-foreground mt-1.5">{task.date}</div>

                        {/* Actions — below content, stack vertically on small screens */}
                        <div className="flex flex-col sm:flex-row gap-2 mt-3">
                          {task.linkTo && (
                            <Link
                              to={task.linkTo}
                              className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium border bg-white hover:bg-neutral-grey-4 transition-colors cursor-pointer"
                              style={{ borderColor: cfg.border, color: cfg.color }}
                            >
                              {task.linkLabel || 'View'} <ArrowRight size={12} />
                            </Link>
                          )}

                          <button
                            onClick={() => handleComplete(task.id)}
                            className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium border bg-white hover:bg-neutral-grey-4 transition-colors cursor-pointer"
                            style={{ borderColor: cfg.border }}
                          >
                            <CheckCircle2 size={13} className="text-muted-foreground" /> Mark Completed
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Fade overlay when collapsed */}
            {!showAllTasks && pendingTasks.length > 2 && (
              <div
                className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
                style={{ background: 'linear-gradient(to bottom, transparent, var(--color-background))' }}
              />
            )}
          </div>

          {/* View all / collapse toggle */}
          {pendingTasks.length > 2 && (
            <button
              onClick={() => setShowAllTasks(!showAllTasks)}
              className="w-full flex items-center justify-center gap-1.5 mt-2 py-2 text-xs font-medium rounded-lg hover:bg-neutral-grey-4 transition-colors cursor-pointer"
              style={{ color: 'var(--brand-primary)' }}
            >
              {showAllTasks ? 'Show less' : `View all ${pendingTasks.length} action items`}
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${showAllTasks ? 'rotate-180' : ''}`}
              />
            </button>
          )}

          {/* Completed tasks (collapsed) */}
          {doneTasks.length > 0 && (
            <div className="mt-3 flex flex-col gap-1.5">
              {doneTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-lg bg-neutral-grey-4/50 border border-neutral-grey-12/50"
                >
                  <CheckCircle2 size={16} className="text-green-600 shrink-0" />
                  <span className="text-sm text-muted-foreground line-through flex-1">{task.title}</span>
                  <span className="text-[10px] text-muted-foreground">Completed</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Quick Access */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {quickAccess.filter(item => !('to' in item && item.to === '/statements') || user.canViewStatements).map((item) => {
          const Icon = item.icon
          const inner = (
            <div
              className="h-full p-4 rounded-lg bg-card border border-border hover:border-[var(--brand-primary)]/30 transition-colors cursor-pointer"
              style={{ boxShadow: 'var(--shadow-2)' }}
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center mb-3"
                style={{ backgroundColor: 'var(--brand-primary-light)' }}
              >
                <Icon size={18} style={{ color: 'var(--brand-primary)' }} />
              </div>
              <div className="text-sm font-semibold">{item.label}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{item.desc}</div>
            </div>
          )

          if ('to' in item && item.to) {
            return <Link key={item.label} to={item.to} className="block h-full">{inner}</Link>
          }
          return (
            <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" className="block h-full">
              {inner}
            </a>
          )
        })}
      </div>

      {/* News Feed Preview */}
      <div className={showNotes ? 'notes-indicator' : ''}>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Newspaper size={18} />
            Latest News
          </h2>
          <Link to="/news" className="text-sm font-medium hover:underline" style={{ color: 'var(--brand-primary)' }}>
            View All <ChevronRight size={14} className="inline" />
          </Link>
        </div>

        <div className="space-y-2">
          {newsFeed.map((item) => (
            <div
              key={item.id}
              className="bg-card border border-border rounded-lg p-4 cursor-pointer hover:border-[var(--brand-primary)]/20 transition-colors"
              style={{ boxShadow: 'var(--shadow-2)' }}
              onClick={() => setExpandedNews(expandedNews === item.id ? null : item.id)}
            >
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="text-[10px] font-semibold px-2 py-0.5 rounded-full text-white"
                  style={{ backgroundColor: 'var(--brand-primary)' }}
                >
                  {item.category}
                </span>
                <span className="text-xs text-muted-foreground">{item.date}</span>
              </div>
              <div className="text-sm font-semibold">{item.title}</div>
              {expandedNews === item.id && (
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                  {item.preview}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
