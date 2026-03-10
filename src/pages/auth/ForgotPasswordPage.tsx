import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, ArrowLeft } from 'lucide-react'
import { useBrand } from '@/theme/BrandContext'

export function ForgotPasswordPage() {
  const { brand } = useBrand()
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSent(true)
    }, 1000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-grey-4 p-4">
      <div className="w-full max-w-sm" style={{ boxShadow: 'var(--shadow-8)' }}>
        <div
          className="px-6 py-6 rounded-t-lg text-center"
          style={{ backgroundColor: 'var(--brand-primary)' }}
        >
          <img src={brand.logoWhite} alt={brand.name} className="h-8 mx-auto mb-2 object-contain" />
          <div className="text-white/80 text-sm">Password Reset</div>
        </div>

        <div className="bg-white rounded-b-lg px-6 py-8">
          {sent ? (
            <div className="text-center">
              <div className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: 'var(--brand-primary-light)' }}>
                <Mail size={24} style={{ color: 'var(--brand-primary)' }} />
              </div>
              <h2 className="text-lg font-semibold mb-2">Check Your Email</h2>
              <p className="text-sm text-muted-foreground mb-6">
                We've sent a password reset link to <strong>{email}</strong>. The link will expire in 15 minutes.
              </p>
              <Link
                to="/reset-password"
                className="block w-full py-2.5 rounded-md text-white text-sm font-semibold text-center transition-colors"
                style={{ backgroundColor: 'var(--brand-primary)' }}
              >
                Continue to Reset (Demo)
              </Link>
              <Link to="/login" className="block mt-4 text-sm text-[var(--brand-primary)] hover:underline">
                Back to Sign In
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <p className="text-sm text-muted-foreground mb-4">
                Enter your email address and we'll send you a link to reset your password.
              </p>
              <div className="mb-6">
                <label className="block text-sm font-medium mb-1">Email Address</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-3 py-2.5 border border-input-border rounded-md bg-input-background text-sm focus:outline-none focus:border-b-2 focus:border-b-[var(--brand-primary)]"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 rounded-md text-white text-sm font-semibold cursor-pointer disabled:opacity-60"
                style={{ backgroundColor: 'var(--brand-primary)' }}
              >
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>
              <Link to="/login" className="flex items-center justify-center gap-1.5 mt-4 text-sm text-[var(--brand-primary)] hover:underline">
                <ArrowLeft size={14} /> Back to Sign In
              </Link>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
