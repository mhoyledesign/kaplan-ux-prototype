import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Lock, Eye, EyeOff } from 'lucide-react'
import { useBrand } from '@/theme/BrandContext'

function getStrength(pw: string): { level: number; label: string; color: string } {
  let score = 0
  if (pw.length >= 8) score++
  if (pw.length >= 12) score++
  if (/[A-Z]/.test(pw)) score++
  if (/[0-9]/.test(pw)) score++
  if (/[^A-Za-z0-9]/.test(pw)) score++

  if (score <= 1) return { level: 1, label: 'Weak', color: '#d13438' }
  if (score <= 2) return { level: 2, label: 'Fair', color: '#f7630c' }
  if (score <= 3) return { level: 3, label: 'Good', color: '#ffc107' }
  return { level: 4, label: 'Strong', color: '#107c10' }
}

export function ResetPasswordPage() {
  const { brand } = useBrand()
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)

  const strength = getStrength(password)
  const mismatch = confirm.length > 0 && password !== confirm

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (mismatch || password.length < 8) return
    setLoading(true)
    setTimeout(() => navigate('/reset-success'), 1000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-grey-4 p-4">
      <div className="w-full max-w-sm" style={{ boxShadow: 'var(--shadow-8)' }}>
        <div
          className="px-6 py-6 rounded-t-lg text-center"
          style={{ backgroundColor: 'var(--brand-primary)' }}
        >
          <img src={brand.logoWhite} alt={brand.name} className="h-8 mx-auto mb-2 object-contain" />
          <div className="text-white/80 text-sm">Create New Password</div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-b-lg px-6 py-8">
          <p className="text-sm text-muted-foreground mb-4">
            Your new password must be at least 8 characters long.
          </p>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">New Password</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type={showPw ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 border border-input-border rounded-md bg-input-background text-sm focus:outline-none focus:border-b-2 focus:border-b-[var(--brand-primary)]"
                placeholder="New password"
                required
                minLength={8}
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
              >
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {/* Strength indicator */}
            {password.length > 0 && (
              <div className="mt-2">
                <div className="flex gap-1 mb-1">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="h-1 flex-1 rounded-full transition-colors"
                      style={{
                        backgroundColor: i <= strength.level ? strength.color : '#e0e0e0'
                      }}
                    />
                  ))}
                </div>
                <span className="text-xs" style={{ color: strength.color }}>
                  {strength.label}
                </span>
              </div>
            )}
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">Confirm Password</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type={showPw ? 'text' : 'password'}
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className={`w-full pl-10 pr-3 py-2.5 border rounded-md bg-input-background text-sm focus:outline-none focus:border-b-2 focus:border-b-[var(--brand-primary)] ${
                  mismatch ? 'border-destructive' : 'border-input-border'
                }`}
                placeholder="Confirm new password"
                required
              />
            </div>
            {mismatch && (
              <p className="text-xs text-destructive mt-1">Passwords do not match</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || mismatch || password.length < 8}
            className="w-full py-2.5 rounded-md text-white text-sm font-semibold cursor-pointer disabled:opacity-60"
            style={{ backgroundColor: 'var(--brand-primary)' }}
          >
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  )
}
