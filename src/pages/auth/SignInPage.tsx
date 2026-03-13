import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Eye, EyeOff, User, Lock } from 'lucide-react'
import { useBrand } from '@/theme/BrandContext'

interface SignInPageProps {
  onSignIn: () => void
}

export function SignInPage({ onSignIn }: SignInPageProps) {
  const { brand } = useBrand()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      onSignIn()
      navigate('/')
    }, 800)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-grey-4 p-4">
      <div className="w-full max-w-sm" style={{ boxShadow: 'var(--shadow-8)' }}>
        {/* Brand header */}
        <div
          className="px-6 py-8 rounded-t-lg text-center"
          style={{ backgroundColor: 'var(--brand-primary)' }}
        >
          <img
            src={brand.logoWhite}
            alt={brand.name}
            className="h-10 mx-auto mb-3 object-contain"
          />
          <div className="text-white/80 text-sm font-medium">
            Online Access Portal
          </div>
        </div>

        {/* Sign in form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-b-lg px-6 py-8">
          <div className="mb-4">
            <label className="block text-sm font-medium text-foreground mb-1">Username</label>
            <div className="relative">
              <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 border border-input-border rounded-md bg-input-background text-sm focus:outline-none focus:border-b-2 focus:border-b-[var(--brand-primary)] transition-colors"
                placeholder="Enter your username"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-foreground mb-1">Password</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 border border-input-border rounded-md bg-input-background text-sm focus:outline-none focus:border-b-2 focus:border-b-[var(--brand-primary)] transition-colors"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-md text-white text-sm font-semibold transition-colors cursor-pointer disabled:opacity-60"
            style={{ backgroundColor: 'var(--brand-primary)' }}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Signing in...
              </span>
            ) : 'Sign In'}
          </button>

          <div className="text-center mt-4">
            <Link
              to="/forgot-password"
              className="text-sm text-[var(--brand-primary)] hover:underline"
            >
              Forgot your password?
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
