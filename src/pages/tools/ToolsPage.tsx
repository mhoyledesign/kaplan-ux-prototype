import { Link } from 'react-router-dom'
import { Truck, ExternalLink, Monitor } from 'lucide-react'

const tools = [
  {
    title: 'Equipment Unloading Locations',
    desc: 'Find approved unloading facilities by region and terminal. Includes dock assignments, check-in procedures, and contact information.',
    icon: Truck,
    to: '/tools/equipment',
    external: false,
  },
  {
    title: 'Trinium Dispatch',
    desc: 'Access the Trinium dispatch and load management system. Opens in a new browser tab.',
    icon: ExternalLink,
    href: 'https://trinium.kaplantruck.com',
    external: true,
  },
  {
    title: 'Remote Assistance (Splashtop SOS)',
    desc: 'Request remote IT support. Our IT team can connect to your computer to troubleshoot issues in real-time.',
    icon: Monitor,
    href: 'https://sos.bessemermanagement.com/web/sos',
    external: true,
  },
]

export function ToolsPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-semibold mb-1">Tools</h1>
      <p className="text-sm text-muted-foreground mb-6">
        Quick access to dispatch, IT support, and operational tools.
      </p>

      <div className="flex flex-col gap-3">
        {tools.map((tool) => {
          const Icon = tool.icon
          const content = (
            <div
              className="flex items-start gap-4 p-5 bg-card border border-border rounded-lg hover:border-[var(--brand-primary)]/30 transition-colors cursor-pointer"
              style={{ boxShadow: 'var(--shadow-2)' }}
            >
              <div
                className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0"
                style={{ backgroundColor: 'var(--brand-primary-light)' }}
              >
                <Icon size={22} style={{ color: 'var(--brand-primary)' }} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold">{tool.title}</h3>
                  {tool.external && (
                    <ExternalLink size={12} className="text-muted-foreground" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{tool.desc}</p>
              </div>
            </div>
          )

          if (tool.external && 'href' in tool) {
            return (
              <a key={tool.title} href={tool.href} target="_blank" rel="noopener noreferrer">
                {content}
              </a>
            )
          }
          return (
            <Link key={tool.title} to={tool.to!}>
              {content}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
