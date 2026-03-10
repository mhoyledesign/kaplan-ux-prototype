import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from './utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-[var(--brand-primary)] text-white',
        secondary:
          'border-transparent bg-[var(--color-neutral-100)] text-[var(--color-neutral-900)]',
        outline:
          'border-[var(--color-neutral-300)] text-[var(--color-neutral-700)]',
        destructive:
          'border-transparent bg-red-100 text-red-700',
        warning:
          'border-transparent bg-amber-100 text-amber-800',
        success:
          'border-transparent bg-green-100 text-green-700',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
