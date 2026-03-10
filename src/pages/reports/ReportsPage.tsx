import { Link } from 'react-router-dom'
import { FileText, Eye, Download, ArrowRight } from 'lucide-react'

const categories = [
  {
    name: 'Financial',
    color: '#2d5016',
    bg: '#e8f3e0',
    description: 'Settlement and financial reporting tools',
    reports: [
      { name: 'Driver Sign On Documents', desc: 'View and manage driver sign-on documentation' },
      { name: 'Settlement Summary Report', desc: 'Aggregated settlement data by period' },
      { name: 'Revenue Analysis', desc: 'Revenue breakdown by terminal and period' },
    ],
  },
  {
    name: 'Safety',
    color: '#922b21',
    bg: '#fdedec',
    description: 'Safety compliance and incident reporting',
    reports: [
      { name: 'Roadside Inspection Reports', desc: 'DOT roadside inspection results and trends' },
      { name: 'Accidents & Claims Report', desc: 'Incident tracking and claims status' },
      { name: 'Remedial Review Report', desc: 'Driver remedial review and corrective actions' },
    ],
  },
  {
    name: 'Operations',
    color: '#1a5276',
    bg: '#d6eaf8',
    description: 'Operational metrics and driver management',
    reports: [
      { name: 'Pending Drivers Report', desc: 'Drivers awaiting approval or documentation' },
      { name: 'Driver Log Codes Report', desc: 'ELD log code analysis and violations' },
      { name: 'Fleet Utilization Report', desc: 'Equipment utilization rates by terminal' },
    ],
  },
  {
    name: 'Compliance',
    color: '#b9770e',
    bg: '#fef9e7',
    description: 'Regulatory compliance tracking',
    reports: [
      { name: 'Compliance Report', desc: 'Overall compliance status and upcoming deadlines' },
      { name: 'Approved Inspection Stations', desc: 'Directory of approved inspection facilities' },
      { name: 'Approved Clinic Locations', desc: 'Directory of approved medical examination clinics' },
    ],
  },
]

export function ReportsPage() {
  return (
    <div className="max-w-5xl">
      <h1 className="text-2xl font-semibold mb-1">Reports</h1>
      <p className="text-sm text-muted-foreground mb-6">
        Access all reporting tools and data exports.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {categories.map((cat) => (
          <div
            key={cat.name}
            className="bg-card border border-border rounded-lg overflow-hidden"
            style={{ boxShadow: 'var(--shadow-2)' }}
          >
            <div className="px-4 py-3" style={{ backgroundColor: cat.bg }}>
              <h3 className="text-sm font-semibold" style={{ color: cat.color }}>{cat.name}</h3>
              <p className="text-xs" style={{ color: cat.color, opacity: 0.7 }}>{cat.description}</p>
            </div>
            <div className="divide-y divide-border">
              {cat.reports.map((report) => (
                <div key={report.name} className="px-4 py-3 flex items-center justify-between hover:bg-muted/30 transition-colors cursor-pointer">
                  <div>
                    <div className="text-sm font-medium">{report.name}</div>
                    <div className="text-xs text-muted-foreground">{report.desc}</div>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0 ml-3">
                    <button className="p-1.5 rounded-md hover:bg-muted transition-colors cursor-pointer" title="View">
                      <Eye size={14} className="text-muted-foreground" />
                    </button>
                    <button className="p-1.5 rounded-md hover:bg-muted transition-colors cursor-pointer" title="Download">
                      <Download size={14} className="text-muted-foreground" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Quick link to statements */}
      <Link
        to="/statements"
        className="flex items-center gap-3 p-4 rounded-lg border border-border bg-card hover:border-[var(--brand-primary)]/30 transition-colors"
        style={{ boxShadow: 'var(--shadow-2)' }}
      >
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: 'var(--brand-primary-light)' }}
        >
          <FileText size={20} style={{ color: 'var(--brand-primary)' }} />
        </div>
        <div className="flex-1">
          <div className="text-sm font-semibold">Need your settlement statements?</div>
          <div className="text-xs text-muted-foreground">View and download weekly settlement PDFs</div>
        </div>
        <ArrowRight size={16} className="text-muted-foreground" />
      </Link>
    </div>
  )
}
