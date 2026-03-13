import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle2 } from 'lucide-react'
import { useBrand } from '@/theme/BrandContext'

const feedbackTypes = [
  { value: 'feature', label: 'Feature Request' },
  { value: 'issue', label: 'Report an Issue' },
  { value: 'general', label: 'General Feedback' },
  { value: 'content', label: 'Content Update Request' },
]

export function FeedbackPage() {
  const { brand } = useBrand()
  const [type, setType] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="max-w-xl">
        <Link to="/tools" className="flex items-center gap-1.5 text-sm mb-4 hover:underline" style={{ color: 'var(--brand-primary)' }}>
          <ArrowLeft size={14} /> Back to Tools & Resources
        </Link>
        <div className="bg-card border border-border rounded-lg p-8 text-center" style={{ boxShadow: 'var(--shadow-4)' }}>
          <CheckCircle2 size={48} className="mx-auto mb-4" style={{ color: 'var(--brand-primary)' }} />
          <h2 className="text-lg font-semibold mb-2">Thank You!</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Your feedback has been submitted to the {brand.name} portal team. We'll review it and follow up if needed.
          </p>
          <button
            onClick={() => { setSubmitted(false); setType(''); setSubject(''); setMessage('') }}
            className="px-4 py-2 rounded-md text-white text-sm font-medium cursor-pointer"
            style={{ backgroundColor: 'var(--brand-primary)' }}
          >
            Submit Another
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-xl">
      <Link to="/tools" className="flex items-center gap-1.5 text-sm mb-4 hover:underline" style={{ color: 'var(--brand-primary)' }}>
        <ArrowLeft size={14} /> Back to Tools & Resources
      </Link>

      <h1 className="text-2xl font-semibold mb-1">Feedback</h1>
      <p className="text-sm text-muted-foreground mb-6">
        Let us know how we can improve the portal experience.
      </p>

      <form onSubmit={handleSubmit} className="bg-card border border-border rounded-lg p-6" style={{ boxShadow: 'var(--shadow-2)' }}>
        {/* Feedback type */}
        <div className="mb-5">
          <label className="block text-sm font-medium mb-2">What type of feedback?</label>
          <div className="flex flex-col gap-2">
            {feedbackTypes.map((ft) => (
              <label key={ft.value} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="feedbackType"
                  value={ft.value}
                  checked={type === ft.value}
                  onChange={(e) => setType(e.target.value)}
                  className="accent-[var(--brand-primary)] cursor-pointer"
                />
                <span className="text-sm">{ft.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Subject */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Subject</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Brief summary of your feedback"
            className="w-full px-3 py-2 border border-input-border rounded-md bg-input-background text-sm focus:outline-none focus:border-b-2 focus:border-b-[var(--brand-primary)]"
          />
        </div>

        {/* Message */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Describe your feedback in detail..."
            rows={5}
            className="w-full px-3 py-2 border border-input-border rounded-md bg-input-background text-sm focus:outline-none focus:border-b-2 focus:border-b-[var(--brand-primary)] resize-vertical"
          />
        </div>

        {/* Brand context */}
        <div className="text-xs text-muted-foreground mb-5">
          Submitting to: <span className="font-medium">{brand.name}</span>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={!type || !subject || !message}
          className="w-full py-2.5 rounded-md text-white text-sm font-medium transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ backgroundColor: 'var(--brand-primary)' }}
        >
          Submit Feedback
        </button>
      </form>
    </div>
  )
}
