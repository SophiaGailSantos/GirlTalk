import { useState } from 'react'
import './Tracker.css'

function formatDate(date) {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function Tracker() {
  const [startDate, setStartDate] = useState('')
  const [cycleLength, setCycleLength] = useState('28')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setResult(null)

    if (!startDate) {
      setError('Please select your last period start date.')
      return
    }

    const length = parseInt(cycleLength, 10)
    if (isNaN(length) || length < 21 || length > 45) {
      setError('Please enter a cycle length between 21 and 45 days.')
      return
    }

    const start = new Date(startDate)
    if (isNaN(start.getTime())) {
      setError('Please enter a valid date.')
      return
    }

    const next = new Date(start)
    next.setDate(next.getDate() + length)

    const now = new Date()
    const diffDays = Math.ceil((next - now) / (1000 * 60 * 60 * 24))

    setResult({
      nextDate: formatDate(next),
      daysUntil: diffDays,
      cycleLength: length,
    })
  }

  return (
    <div className="page tracker-page">
      <div className="container">
        <header className="page-header reveal">
          <span className="section-eyebrow">Period Tracker</span>
          <h1 className="section-title">Track your cycle</h1>
          <p className="section-sub">
            Enter a few details and we&apos;ll estimate your next period date.
          </p>
        </header>

        <div className="tracker-grid">
          <form className="tracker-form reveal" onSubmit={handleSubmit} noValidate>
            <h2>Your cycle details</h2>

            {error && (
              <div className="auth-error" role="alert">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4M12 16h.01" />
                </svg>
                {error}
              </div>
            )}

            <div className="auth-field">
              <label htmlFor="tracker-start">Last period start date</label>
              <input
                id="tracker-start"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                max={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div className="auth-field">
              <label htmlFor="tracker-length">Average cycle length (days)</label>
              <input
                id="tracker-length"
                type="number"
                min="21"
                max="45"
                value={cycleLength}
                onChange={(e) => setCycleLength(e.target.value)}
              />
              <span className="tracker-hint">Typically between 21 and 45 days.</span>
            </div>

            <button type="submit" className="btn btn-primary tracker-submit">
              Calculate
            </button>

            <p className="tracker-disclaimer">
              Cycle predictions are estimates and may not be accurate for everyone.
              This is not medical advice. If you have concerns about your cycle,
              please consult a healthcare professional.
            </p>
          </form>

          <div className="tracker-result reveal">
            {result ? (
              <>
                <span className="result-label">Estimated next period</span>
                <strong className="result-date">{result.nextDate}</strong>
                <span className="result-days">
                  {result.daysUntil > 0
                    ? `About ${result.daysUntil} day${result.daysUntil === 1 ? '' : 's'} from now`
                    : result.daysUntil === 0
                      ? 'Expected around today'
                      : `Passed ${Math.abs(result.daysUntil)} day${Math.abs(result.daysUntil) === 1 ? '' : 's'} ago`}
                </span>
                <div className="result-card">
                  <div className="result-stat">
                    <span>Cycle length</span>
                    <strong>{result.cycleLength} days</strong>
                  </div>
                  <div className="result-stat">
                    <span>Fertile window</span>
                    <strong>~Day {Math.round(result.cycleLength * 0.5)}</strong>
                  </div>
                </div>
              </>
            ) : (
              <div className="tracker-empty">
                <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="3" y="5" width="18" height="16" rx="3" />
                  <path d="M8 3v4M16 3v4M3 10h18" />
                  <circle cx="12" cy="15.5" r="2.2" />
                </svg>
                <p>Fill in your cycle details and we&apos;ll show your estimated next period here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
