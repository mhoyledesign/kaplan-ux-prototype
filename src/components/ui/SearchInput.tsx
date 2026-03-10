import * as React from 'react'
import { Search, X } from 'lucide-react'
import { cn } from './utils'

export interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ value, onChange, placeholder = 'Search...', className }, ref) => (
    <div className={cn('relative', className)}>
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-neutral-400)]" />
      <input
        ref={ref}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          'flex h-10 w-full rounded-md border border-[var(--color-neutral-300)] bg-white pl-9 pr-9 py-2 text-sm',
          'placeholder:text-[var(--color-neutral-400)]',
          'focus:outline-none focus:border-b-2 focus:border-b-[var(--brand-primary)]'
        )}
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-neutral-400)] hover:text-[var(--color-neutral-600)]"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Clear search</span>
        </button>
      )}
    </div>
  )
)
SearchInput.displayName = 'SearchInput'

export { SearchInput }
