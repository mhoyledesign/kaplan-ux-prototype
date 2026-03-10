import { useState, useRef, useEffect } from 'react'
import { ChevronDown, Check } from 'lucide-react'
import { useBrand } from '@/theme/BrandContext'
import { brands, brandIds } from '@/theme/brands'

export function BrandSwitcher() {
  const { brand, setBrand } = useBrand()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium text-white/90 hover:bg-white/10 transition-colors cursor-pointer"
      >
        <div
          className="w-3 h-3 rounded-full border border-white/30"
          style={{ backgroundColor: brand.colors.primaryLight }}
        />
        {brand.shortName}
        <ChevronDown size={14} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div
          className="absolute top-full right-0 mt-1 w-56 bg-popover border border-border rounded-lg py-1 z-50"
          style={{ boxShadow: 'var(--shadow-8)' }}
        >
          <div className="px-3 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Switch Company
          </div>
          {brandIds.map((id) => {
            const b = brands[id]
            const isActive = brand.id === id
            return (
              <button
                key={id}
                onClick={() => { setBrand(id); setOpen(false) }}
                className={`
                  w-full flex items-center gap-3 px-3 py-2 text-sm text-left
                  hover:bg-accent transition-colors cursor-pointer
                  ${isActive ? 'font-semibold' : ''}
                `}
              >
                <div
                  className="w-4 h-4 rounded-full shrink-0"
                  style={{ backgroundColor: b.colors.primary }}
                />
                <span className="flex-1">{b.name}</span>
                {isActive && <Check size={14} className="text-[var(--brand-primary)]" />}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
