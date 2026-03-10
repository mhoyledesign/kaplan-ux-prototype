import * as React from 'react'
import { cn } from './utils'

export interface FilterChipsProps {
  options: string[]
  value: string
  onChange: (value: string) => void
  className?: string
}

function FilterChips({ options, value, onChange, className }: FilterChipsProps) {
  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onChange(option)}
          className={cn(
            'inline-flex items-center rounded-full px-3 py-1 text-sm font-medium transition-colors',
            option === value
              ? 'bg-[var(--brand-primary)] text-white'
              : 'bg-[var(--color-neutral-100)] text-[var(--color-neutral-700)] hover:bg-[var(--color-neutral-200)]'
          )}
        >
          {option}
        </button>
      ))}
    </div>
  )
}

export { FilterChips }
