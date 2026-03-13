import { Link } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'
import { useBrand } from '@/theme/BrandContext'

export function ResetSuccessPage() {
  const { brand } = useBrand()

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-grey-4 p-4">
      <div className="w-full max-w-sm" style={{ boxShadow: 'var(--shadow-8)' }}>
        <div
          className="px-6 py-6 rounded-t-lg text-center"
          style={{ backgroundColor: 'var(--brand-primary)' }}
        >
          <img src={brand.logoWhite} alt={brand.name} className="h-8 mx-auto object-contain" />
        </div>
        <div className="bg-white rounded-b-lg px-6 py-10 text-center">
          <div
            className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
            style={{ backgroundColor: 'var(--brand-primary-light)' }}
          >
            <CheckCircle2 size={32} style={{ color: 'var(--brand-primary)' }} />
          </div>
          <h2 className="text-xl font-semibold mb-2">Password Reset!</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Your password has been successfully updated. You can now sign in with your new password.
          </p>
          <Link
            to="/sign-in"
            className="block w-full py-2.5 rounded-md text-white text-sm font-semibold text-center"
            style={{ backgroundColor: 'var(--brand-primary)' }}
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  )
}
