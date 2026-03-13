import { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { FileText, Download, Eye, Printer, X, ChevronDown, ChevronRight, Loader2 } from 'lucide-react'
import type { AuthUser } from '@/hooks/useAuth'

interface OutletCtx { showNotes: boolean; user: AuthUser }

interface Statement {
  id: number
  startDate: string
  endDate: string
  postedDate: string
  amount: string
  fileSize: string
}

const allStatements: Statement[] = [
  { id: 1, startDate: '2026-02-24', endDate: '2026-02-28', postedDate: '2026-02-28', amount: '$34,521.80', fileSize: '285 KB' },
  { id: 2, startDate: '2026-02-17', endDate: '2026-02-21', postedDate: '2026-02-21', amount: '$28,943.15', fileSize: '267 KB' },
  { id: 3, startDate: '2026-02-10', endDate: '2026-02-14', postedDate: '2026-02-14', amount: '$31,207.42', fileSize: '294 KB' },
  { id: 4, startDate: '2026-02-03', endDate: '2026-02-07', postedDate: '2026-02-07', amount: '$26,875.30', fileSize: '252 KB' },
  { id: 5, startDate: '2026-01-27', endDate: '2026-01-31', postedDate: '2026-01-31', amount: '$33,112.67', fileSize: '301 KB' },
  { id: 6, startDate: '2026-01-20', endDate: '2026-01-24', postedDate: '2026-01-24', amount: '$29,456.89', fileSize: '278 KB' },
  { id: 7, startDate: '2026-01-13', endDate: '2026-01-17', postedDate: '2026-01-17', amount: '$35,678.21', fileSize: '312 KB' },
  { id: 8, startDate: '2026-01-06', endDate: '2026-01-10', postedDate: '2026-01-10', amount: '$27,234.56', fileSize: '245 KB' },
  { id: 9, startDate: '2025-12-29', endDate: '2026-01-02', postedDate: '2026-01-02', amount: '$22,891.03', fileSize: '231 KB' },
  { id: 10, startDate: '2025-12-22', endDate: '2025-12-26', postedDate: '2025-12-26', amount: '$18,543.77', fileSize: '198 KB' },
  { id: 11, startDate: '2025-12-15', endDate: '2025-12-19', postedDate: '2025-12-19', amount: '$31,876.44', fileSize: '289 KB' },
  { id: 12, startDate: '2025-12-08', endDate: '2025-12-12', postedDate: '2025-12-12', amount: '$29,102.38', fileSize: '265 KB' },
]

type Filter = 'recent' | 'week' | '2weeks' | 'range'

const filters: { id: Filter; label: string }[] = [
  { id: 'recent', label: 'Recent' },
  { id: 'week', label: 'Past Week' },
  { id: '2weeks', label: 'Past 2 Weeks' },
  { id: 'range', label: 'Date Range' },
]

function groupByMonth(stmts: Statement[]) {
  const groups: Record<string, Statement[]> = {}
  for (const s of stmts) {
    const d = new Date(s.postedDate)
    const key = `${d.toLocaleString('en', { month: 'long' })} ${d.getFullYear()}`
    if (!groups[key]) groups[key] = []
    groups[key].push(s)
  }
  return Object.entries(groups)
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export function StatementsPage() {
  const { showNotes, user } = useOutletContext<OutletCtx>()
  const [filter, setFilter] = useState<Filter>('recent')
  const [expanded, setExpanded] = useState<string | null>(null)
  const [viewingPdf, setViewingPdf] = useState<Statement | null>(null)
  const [pdfLoading, setPdfLoading] = useState(false)

  if (!user.canViewStatements) {
    return (
      <div className="max-w-3xl">
        <h1 className="text-2xl font-semibold mb-4">Settlement Statements</h1>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 text-center">
          <FileText size={32} className="mx-auto text-amber-600 mb-3" />
          <h2 className="text-lg font-semibold mb-1">Statement Access Not Enabled</h2>
          <p className="text-sm text-muted-foreground mb-3">
            Your account does not currently have permission to view settlement statements.
            Statement visibility is controlled by a permission setting in Trinium and must be enabled by an administrator.
          </p>
          <p className="text-xs text-muted-foreground">
            If you believe you should have access, contact your agent owner or IT support to update your Trinium permissions.
          </p>
        </div>
        {showNotes && (
          <div className="notes-indicator mt-4">
            <p className="text-xs text-muted-foreground p-2">
              Statement access is gated by a checkbox in Trinium (per-user setting). The API should validate this permission server-side before returning any statement data — the UI restriction alone is not sufficient for sensitive financial data.
            </p>
          </div>
        )}
      </div>
    )
  }

  const filtered = filter === 'week' ? allStatements.slice(0, 1)
    : filter === '2weeks' ? allStatements.slice(0, 2)
    : allStatements

  const grouped = groupByMonth(filtered)
  const latest = allStatements[0]

  const openPdf = (stmt: Statement) => {
    setViewingPdf(stmt)
    setPdfLoading(true)
    setTimeout(() => setPdfLoading(false), 1500)
  }

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-semibold mb-1">Settlement Statements</h1>
      <p className="text-sm text-muted-foreground mb-6">
        View and download your weekly settlement statements.
        {user.terminals.length > 1 && (
          <span className="ml-1">Showing statements for terminals: {user.terminals.join(', ')}</span>
        )}
      </p>

      {/* Current week hero */}
      <div
        className="rounded-lg p-5 mb-6 text-white"
        style={{ background: `linear-gradient(135deg, var(--brand-primary), var(--brand-primary-hover))` }}
      >
        <div className="flex items-center gap-3 mb-2">
          <FileText size={20} />
          <span className="text-sm font-medium text-white/80">Current Statement</span>
        </div>
        <div className="text-lg font-semibold mb-1">
          {formatDate(latest.startDate)} — {formatDate(latest.endDate)}
        </div>
        <div className="text-2xl font-bold mb-3">{latest.amount}</div>
        <div className="flex gap-2">
          <button
            onClick={() => openPdf(latest)}
            className="flex items-center gap-2 px-4 py-2 rounded-md bg-white/20 hover:bg-white/30 text-sm font-medium transition-colors cursor-pointer"
          >
            <Eye size={16} /> View
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-md bg-white/20 hover:bg-white/30 text-sm font-medium transition-colors cursor-pointer">
            <Download size={16} /> Download
          </button>
        </div>
      </div>

      {/* Previous Statement */}
      {allStatements[1] && (
        <div className="rounded-lg p-4 mb-6 bg-[var(--neutral-grey-4)] border border-border">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <div className="text-xs text-muted-foreground mb-0.5">Previous Statement</div>
              <div className="text-sm font-medium">
                {formatDate(allStatements[1].startDate)} — {formatDate(allStatements[1].endDate)}
              </div>
              <div className="text-base font-semibold mt-0.5">{allStatements[1].amount}</div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => openPdf(allStatements[1])}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border bg-white hover:bg-muted text-xs font-medium transition-colors cursor-pointer"
              >
                <Eye size={14} /> View
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border bg-white hover:bg-muted text-xs font-medium transition-colors cursor-pointer">
                <Download size={14} /> Download
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filter bar */}
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer ${
              filter === f.id
                ? 'text-white'
                : 'bg-secondary text-secondary-foreground hover:bg-muted'
            }`}
            style={filter === f.id ? { backgroundColor: 'var(--brand-primary)' } : undefined}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Date range inputs */}
      {filter === 'range' && (
        <div className="flex items-center gap-3 mb-4 p-3 bg-secondary rounded-lg">
          <input type="date" className="px-3 py-1.5 border border-input-border rounded-md text-sm bg-input-background" />
          <span className="text-sm text-muted-foreground">to</span>
          <input type="date" className="px-3 py-1.5 border border-input-border rounded-md text-sm bg-input-background" />
          <button
            className="px-4 py-1.5 rounded-md text-white text-sm font-medium cursor-pointer"
            style={{ backgroundColor: 'var(--brand-primary)' }}
          >
            Apply
          </button>
        </div>
      )}

      {/* Grouped statements */}
      <div className="space-y-2">
        {grouped.map(([month, stmts]) => (
          <div key={month} className="border border-border rounded-lg overflow-hidden">
            <button
              onClick={() => setExpanded(expanded === month ? null : month)}
              className="w-full flex items-center justify-between px-4 py-3 bg-card hover:bg-muted/50 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                {expanded === month ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                <span className="text-sm font-semibold">{month}</span>
              </div>
              <span className="text-xs text-muted-foreground">{stmts.length} statement{stmts.length > 1 ? 's' : ''}</span>
            </button>
            {expanded === month && (
              <div className="border-t border-border">
                {stmts.map((stmt) => (
                  <div key={stmt.id} className="flex items-center justify-between px-4 py-3 border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                    <div>
                      <div className="text-sm font-medium">
                        {formatDate(stmt.startDate)} — {formatDate(stmt.endDate)}
                      </div>
                      <div className="text-xs text-muted-foreground">{stmt.fileSize} · Posted {formatDate(stmt.postedDate)}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-semibold">{stmt.amount}</span>
                      <button onClick={() => openPdf(stmt)} className="p-1.5 rounded-md hover:bg-muted transition-colors cursor-pointer" title="View">
                        <Eye size={16} className="text-muted-foreground" />
                      </button>
                      <button className="p-1.5 rounded-md hover:bg-muted transition-colors cursor-pointer" title="Download">
                        <Download size={16} className="text-muted-foreground" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* PDF Modal */}
      {viewingPdf && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50" onClick={() => setViewingPdf(null)} />
          <div
            className="relative bg-white rounded-lg w-full max-w-2xl max-h-[85vh] flex flex-col z-10"
            style={{ boxShadow: 'var(--shadow-16)' }}
          >
            <div className="flex items-center justify-between px-5 py-3 border-b border-border">
              <div>
                <div className="text-sm font-semibold">Settlement Statement</div>
                <div className="text-xs text-muted-foreground">
                  {formatDate(viewingPdf.startDate)} — {formatDate(viewingPdf.endDate)}
                </div>
              </div>
              <button onClick={() => setViewingPdf(null)} className="p-1.5 rounded-md hover:bg-muted cursor-pointer">
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-auto p-6 bg-neutral-grey-4">
              {pdfLoading ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <Loader2 size={32} className="animate-spin mb-3" style={{ color: 'var(--brand-primary)' }} />
                  <span className="text-sm text-muted-foreground">Loading document...</span>
                  <div className="w-48 h-1.5 bg-border rounded-full mt-3 overflow-hidden">
                    <div
                      className="h-full rounded-full animate-pulse"
                      style={{ backgroundColor: 'var(--brand-primary)', width: '60%' }}
                    />
                  </div>
                </div>
              ) : (
                <div className="bg-white border border-border rounded-md p-8 min-h-[400px]" style={{ boxShadow: 'var(--shadow-4)' }}>
                  <div className="text-center mb-8">
                    <div className="text-lg font-bold mb-1" style={{ color: 'var(--brand-primary)' }}>
                      Settlement Statement
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Period: {formatDate(viewingPdf.startDate)} — {formatDate(viewingPdf.endDate)}
                    </div>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between border-b border-border pb-2">
                      <span className="text-muted-foreground">Agent Code</span>
                      <span className="font-medium">KAP-2847</span>
                    </div>
                    <div className="flex justify-between border-b border-border pb-2">
                      <span className="text-muted-foreground">Terminal</span>
                      <span className="font-medium">CLE-01</span>
                    </div>
                    <div className="flex justify-between border-b border-border pb-2">
                      <span className="text-muted-foreground">Total Revenue</span>
                      <span className="font-medium">$52,340.00</span>
                    </div>
                    <div className="flex justify-between border-b border-border pb-2">
                      <span className="text-muted-foreground">Deductions</span>
                      <span className="font-medium text-destructive">-$17,818.20</span>
                    </div>
                    <div className="flex justify-between pt-2 text-base">
                      <span className="font-semibold">Net Settlement</span>
                      <span className="font-bold" style={{ color: 'var(--brand-primary)' }}>{viewingPdf.amount}</span>
                    </div>
                  </div>
                  <div className="mt-8 pt-4 border-t border-border text-xs text-muted-foreground text-center">
                    This is a mock PDF preview for demonstration purposes.
                  </div>
                  {showNotes && (
                    <div className="notes-indicator-plain mt-4">
                      <p className="text-xs text-muted-foreground p-2">
                        Whether this displays as an embedded PDF viewer or native content layout depends on the client's preferred approach.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-2 px-5 py-3 border-t border-border">
              <button className="flex items-center gap-2 px-4 py-2 rounded-md border border-border text-sm font-medium hover:bg-muted transition-colors cursor-pointer">
                <Printer size={16} /> Print
              </button>
              <button
                className="flex items-center gap-2 px-4 py-2 rounded-md text-white text-sm font-medium transition-colors cursor-pointer"
                style={{ backgroundColor: 'var(--brand-primary)' }}
              >
                <Download size={16} /> Download PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
