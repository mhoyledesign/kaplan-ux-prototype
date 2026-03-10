import * as React from 'react'

export interface CmsIndicatorProps {
  show: boolean
  children: React.ReactNode
}

function CmsIndicator({ show, children }: CmsIndicatorProps) {
  if (!show) {
    return <>{children}</>
  }

  return <div className="cms-indicator">{children}</div>
}

export { CmsIndicator }
