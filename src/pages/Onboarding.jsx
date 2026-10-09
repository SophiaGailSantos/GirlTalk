import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { saveProfile, getProfile, toKey } from '../data/profile.js'
import './Onboarding.css'

const SUGGESTIONS = {
  pill: [
    { title: 'Birth control pill', time: '9:00 PM' },
    { title: 'Refill prescription', time: '10:00 AM' },
  ],
  health: [
    { title: 'Drink water', time: 'All day' },
    { title: 'Vitamins', time: '8:00 AM' },
    { title: 'Evening wind-down', time: '10:00 PM' },
  ],
}

const STEPS = ['Your cycle', 'Your reminders', 'You’re ready']

export default function Onboarding() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const [step, setStep] = useState(0)
  const [cycleLength, setCycleLength] = useState('28')
  const [lastPeriod, setLastPeriod] = useState('')
  const [picked, setPicked] = useState([])
  const [custom, setCustom] = useState({ group: 'health', title: '', time: '' })
  const [error, setError] = useState('')

  const [today] = useState(() => toKey(new Date()))
  const [earliest] = useState(() => toKey(new Date(Date.now() - 90 * 86400000)))

  // Jump straight to the dashboard if this member has already set up.
  useEffect(() => {
    if (!user) return
    const profile = getProfile(user.id)
    if (profile.setupDone) navigate('/dashboard', { replace: true })
  }, [user, navigate])

  const togglePick = (s) =>
    setPicked((prev) => prev.some((p) => p.title === s.title) ? prev.filter((p) => p.title !== s.title) : [...prev, { ...s }])

  const addCustom = () => {
    const title = custom.title.trim()
    if (!title) return
    setPicked((prev) => [...prev, { title, time: custom.time.trim() || 'Anytime' }])
    setCustom((c) => ({ ...c, title: '', time: '' }))
  }

  const next = () => {
    setError('')
    if (step === 0) {
      if (!lastPeriod) {
        setError('Pick the day your last period started so we can track your cycle.')
        return
      }
      const length = parseInt(cycleLength, 10)
      if (Number.isNaN(length) || length < 21 || length > 45) {
        setError('Cycle length must be between 21 and 45 days.')
        return
      }
    }
    if (step === 1 && picked.length === 0) {
      setError('Add at least one reminder — or skip to the next step.')
      return
    }
    setStep((s) => s + 1)
  }

  const finish = () => {
    const length = parseInt(cycleLength, 10) || 28
    // Mark the last 5 days of the reported period window as period days.
    const start = new Date(lastPeriod + 'T00:00:00')
    const periodDays = []
    for (let i = 0; i < 5; i++) periodDays.push(toKey(new Date(start.getTime() + i * 86400000)))

    const reminders = picked.map((r, i) => ({
      id: `setup-${Date.now()}-${i}`,
      group: r.group || groupOf(r),
      title: r.title,
      time: r.time,
    }))

    saveProfile(user.id, {
      setupDone: true,
      onboardedAt: new Date().toISOString(),
      cycleLength: length,
      periodDays,
      reminders,
      remindersDone: [],
    })

    navigate('/dashboard', { replace: true })
  }

  const groupOf = (s) =>
    SUGGESTIONS.pill.some((x) => x.title === s.title) ? 'pill' : 'health'

  return (
    <div className="onb">
      <div className="onb-card">
        <div className="onb-steps">
          {STEPS.map((label, i) => (
            <span key={label} className={`onb-step${i <= step ? ' is-on' : ''}`}>
              <i>{i + 1}</i>
              {label}
            </span>
          ))}
        </div>

        {step === 0 && (
          <>
            <h1>Let&apos;s set up your cycle</h1>
            <p className="onb-sub">
              Two quick details and GirlTalk can track your cycle day, predict your
              next period and personalise your daily care.
            </p>

            {error && <div className="auth-error">{error}</div>}

            <div className="auth-field">
              <label htmlFor="onb-start">First day of your last period</label>
              <input
                id="onb-start"
                type="date"
                value={lastPeriod}
                min={earliest}
                max={today}
                onChange={(e) => setLastPeriod(e.target.value)}
              />
            </div>

            <div className="auth-field">
              <label htmlFor="onb-length">Average cycle length</label>
              <input
                id="onb-length"
                type="number"
                min="21"
                max="45"
                value={cycleLength}
                onChange={(e) => setCycleLength(e.target.value)}
              />
              <span className="onb-hint">Most cycles are between 21 and 35 days.</span>
            </div>
          </>
        )}

        {step === 1 && (
          <>
            <h1>What should we remind you about?</h1>
            <p className="onb-sub">
              Pick what you already do — you can add, edit or delete these any
              time on the Cycle &amp; Reminders page.
            </p>

            {error && <div className="auth-error">{error}</div>}

            <div className="onb-group">
              <span className="onb-label">Birth control</span>
              <div className="onb-suggest">
                {SUGGESTIONS.pill.map((s) => {
                  const on = picked.some((p) => p.title === s.title)
                  return (
                    <button
                      key={s.title}
                      type="button"
                      className={`onb-chip${on ? ' is-on' : ''}`}
                      onClick={() => togglePick({ ...s, group: 'pill' })}
                    >
                      {on ? '✓ ' : '+ '}{s.title}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="onb-group">
              <span className="onb-label">General health</span>
              <div className="onb-suggest">
                {SUGGESTIONS.health.map((s) => {
                  const on = picked.some((p) => p.title === s.title)
                  return (
                    <button
                      key={s.title}
                      type="button"
                      className={`onb-chip${on ? ' is-on' : ''}`}
                      onClick={() => togglePick({ ...s, group: 'health' })}
                    >
                      {on ? '✓ ' : '+ '}{s.title}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="onb-custom">
              <input
                type="text"
                placeholder="Add your own reminder"
                value={custom.title}
                onChange={(e) => setCustom((c) => ({ ...c, title: e.target.value }))}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addCustom())}
              />
              <input
                type="text"
                placeholder="Time (e.g. 9:00 PM)"
                value={custom.time}
                onChange={(e) => setCustom((c) => ({ ...c, time: e.target.value }))}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addCustom())}
              />
              <button type="button" onClick={addCustom}>Add</button>
            </div>

            {picked.length > 0 && (
              <p className="onb-count">{picked.length} reminder{picked.length === 1 ? '' : 's'} selected</p>
            )}
          </>
        )}

        {step === 2 && (
          <div className="onb-done">
            <span className="onb-emoji" aria-hidden="true">🌸</span>
            <h1>You&apos;re all set</h1>
            <p className="onb-sub">
              We&apos;ve created your cycle from the date you shared and set up your
              reminders. They&apos;ll show up on your dashboard every day.
            </p>
            <ul className="onb-summary">
              <li>Cycle length: <strong>{cycleLength} days</strong></li>
              <li>Reminders: <strong>{picked.length}</strong></li>
            </ul>
          </div>
        )}

        <div className="onb-actions">
          {step < 2 ? (
            <button type="button" className="btn btn-primary onb-btn" onClick={next}>
              {step === 1 ? 'Skip for now' : 'Continue'}
            </button>
          ) : (
            <button type="button" className="btn btn-primary onb-btn" onClick={finish}>
              Go to my dashboard
            </button>
          )}
        </div>

        {step === 0 && <p className="onb-foot">You can change all of this later in your profile.</p>}
      </div>
    </div>
  )
}