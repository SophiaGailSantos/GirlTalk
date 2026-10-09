import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import './Dashboard.css'

/* Circular cycle ring for the dashboard */
function CycleRing({ day = 12, length = 28 }) {
  const r = 84
  const circumference = 2 * Math.PI * r
  const progress = day / length

  return (
    <div className="dash-ring-wrap">
      <svg className="dash-ring" viewBox="0 0 200 200">
        <defs>
          <linearGradient id="dashGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#c97b8f" />
            <stop offset="100%" stopColor="#a85d72" />
          </linearGradient>
        </defs>
        <circle className="dash-ring-track" cx="100" cy="100" r={r} />
        <circle
          className="dash-ring-fill"
          cx="100"
          cy="100"
          r={r}
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - progress)}
        />
        {[0, 1, 2, 3, 4].map((i) => {
          const angle = -90 + (i / length) * 360
          const rad = (angle * Math.PI) / 180
          return (
            <circle
              key={i}
              cx={100 + r * Math.cos(rad)}
              cy={100 + r * Math.sin(rad)}
              r="4.5"
              className="dash-ring-marker"
            />
          )
        })}
      </svg>
      <div className="dash-ring-center">
        <span className="dash-ring-day">Day {day}</span>
        <span className="dash-ring-sub">of {length}</span>
      </div>
    </div>
  )
}

const MOODS = [
  { label: 'Struggling', emoji: '😔' },
  { label: 'Low', emoji: '😕' },
  { label: 'Okay', emoji: '😐' },
  { label: 'Good', emoji: '🙂' },
  { label: 'Great', emoji: '🤩' },
]
const ENERGY = [
  { label: 'Low', emoji: '🪫' },
  { label: 'Okay', emoji: '🔋' },
  { label: 'Good', emoji: '⚡' },
]
const SYMPTOMS = [
  { label: 'Cramps', emoji: '😖' },
  { label: 'Headache', emoji: '🤕' },
  { label: 'Bloating', emoji: '🎈' },
  { label: 'Fatigue', emoji: '🥱' },
  { label: 'Other', emoji: '✨' },
]

const SELFCARE = [
  { title: 'Stay hydrated', text: 'Keep water nearby and sip through the day.', emoji: '💧' },
  { title: 'Make time to rest', text: 'Even 20 quiet minutes counts as recovery.', emoji: '🛌' },
  { title: 'Track how you feel', text: 'Log your mood daily to spot patterns.', emoji: '📓' },
  { title: 'Do something you enjoy', text: 'A small pleasure goes a long way today.', emoji: '🌷' },
]

const COVER_ART = {
  cycle: (
    <svg viewBox="0 0 120 80" aria-hidden="true">
      <circle cx="60" cy="40" r="22" fill="none" stroke="rgba(207,27,92,0.45)" strokeWidth="6" strokeDasharray="95 45" strokeLinecap="round" transform="rotate(-90 60 40)" />
      <circle cx="60" cy="40" r="7" fill="#cf1b5c" />
      <path d="M60 8c8 10 8 20 0 32-8-12-8-22 0-32z" fill="rgba(207,27,92,0.35)" />
    </svg>
  ),
  care: (
    <svg viewBox="0 0 120 80" aria-hidden="true">
      <path d="M60 62s-20-13-24-27c-3-11 5-19 14-17 5 1 8 5 10 9 2-4 5-8 10-9 9-2 17 6 14 17-4 14-24 27-24 27z" fill="rgba(207,27,92,0.35)" />
      <circle cx="46" cy="32" r="5" fill="#cf1b5c" />
      <circle cx="72" cy="28" r="7" fill="rgba(207,27,92,0.6)" />
    </svg>
  ),
  health: (
    <svg viewBox="0 0 120 80" aria-hidden="true">
      <rect x="30" y="18" width="60" height="46" rx="10" fill="none" stroke="rgba(207,27,92,0.45)" strokeWidth="5" />
      <path d="M30 32h60M44 12v12M76 12v12" stroke="rgba(207,27,92,0.45)" strokeWidth="5" strokeLinecap="round" />
      <circle cx="60" cy="46" r="8" fill="#cf1b5c" />
    </svg>
  ),
  wellness: (
    <svg viewBox="0 0 120 80" aria-hidden="true">
      <path d="M24 58c10-22 24-30 36-30s26 8 36 30" fill="none" stroke="rgba(207,27,92,0.4)" strokeWidth="5" strokeLinecap="round" />
      <circle cx="60" cy="30" r="10" fill="#cf1b5c" />
      <path d="M40 66h40" stroke="rgba(207,27,92,0.4)" strokeWidth="5" strokeLinecap="round" />
    </svg>
  ),
}

/* Reads the cycle data the Period Tracker stores for this browser. */
function useCycleData() {
  const [cycle, setCycle] = useState(null)

  useEffect(() => {
    const load = () => {
      try {
        const days = JSON.parse(localStorage.getItem('girltalk:periodDays') || '[]')
        const length = parseInt(localStorage.getItem('girltalk:cycleLength') || '28', 10)
        if (!days.length) return setCycle(null)

        const sorted = [...days].sort()
        let startKey = sorted[sorted.length - 1]
        for (let i = sorted.length - 2; i >= 0; i--) {
          const prev = new Date(sorted[i] + 'T00:00:00')
          const cur = new Date(sorted[i + 1] + 'T00:00:00')
          if ((cur - prev) / 86400000 === 1) startKey = sorted[i]
          else break
        }

        const start = new Date(startKey + 'T00:00:00')
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        const day = Math.round((today - start) / 86400000) + 1
        const next = new Date(start)
        next.setDate(next.getDate() + length)
        setCycle({ day: Math.max(1, day), length, daysUntil: Math.ceil((next - today) / 86400000) })
      } catch {
        setCycle(null)
      }
    }
    load()
    window.addEventListener('focus', load)
    return () => window.removeEventListener('focus', load)
  }, [])

  return cycle
}

export default function Dashboard() {
  const { user } = useAuth()
  const cycle = useCycleData()

  const [mood, setMood] = useState('')
  const [energy, setEnergy] = useState('')
  const [symptoms, setSymptoms] = useState([])
  const [note, setNote] = useState('')
  const [saved, setSaved] = useState(false)

  const toggleSymptom = (s) => {
    setSymptoms((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    )
  }

  const handleSave = (e) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div className="dash-page">
      <div className="container">
        {/* Greeting */}
        <header className="dash-header reveal">
          <h1>Hi, {user?.firstName || 'there'}</h1>
          <p>Let&apos;s check in with your health today.</p>
        </header>

        {/* Period Tracker — dominant */}
        <section className="dash-tracker reveal">
          {cycle ? (
            <div className="dash-tracker-main">
              <CycleRing day={Math.min(cycle.day, cycle.length)} length={cycle.length} />
              <div className="dash-tracker-info">
                <span className="dash-tracker-label">Your cycle</span>
                <div className="dash-tracker-stats">
                  <div className="dash-stat">
                    <span>Next period</span>
                    <strong>
                      {cycle.daysUntil > 0
                        ? `${cycle.daysUntil} day${cycle.daysUntil === 1 ? '' : 's'}`
                        : cycle.daysUntil === 0
                          ? 'Today'
                          : `${Math.abs(cycle.daysUntil)} day${Math.abs(cycle.daysUntil) === 1 ? '' : 's'} ago`}
                    </strong>
                  </div>
                  <div className="dash-stat">
                    <span>Cycle length</span>
                    <strong>{cycle.length} days</strong>
                  </div>
                  <div className="dash-stat">
                    <span>Period</span>
                    <strong>Day {cycle.day}</strong>
                  </div>
                </div>
                <Link to="/tracker" className="btn btn-primary dash-tracker-btn">
                  Update My Cycle
                </Link>
              </div>
            </div>
          ) : (
            <div className="dash-tracker-main">
              <div className="dash-empty-ring" aria-hidden="true">
                <svg viewBox="0 0 200 200">
                  <circle cx="100" cy="100" r="84" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="10" strokeDasharray="14 12" />
                </svg>
                <span>?</span>
              </div>
              <div className="dash-tracker-info">
                <span className="dash-tracker-label">Your cycle</span>
                <h3 className="dash-empty-title">Let&apos;s set up your cycle</h3>
                <p className="dash-empty-text">
                  Mark the first day of your last period and we&apos;ll track your
                  cycle day, predict your next period, and keep you on track.
                </p>
                <Link to="/tracker" className="btn btn-primary dash-tracker-btn">
                  Set Up My Cycle
                </Link>
              </div>
            </div>
          )}
          <p className="dash-disclaimer">
            Cycle predictions are estimates and may not be accurate for everyone.
            Your cycle information is for personal tracking and reference only —
            not medical advice.
          </p>
        </section>

        {/* Daily Health Check-In */}
        <section className="dash-checkin reveal">
          <div className="checkin-head">
            <h2>How are you feeling today?</h2>
            <span className="checkin-date">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
            </span>
          </div>
          <form onSubmit={handleSave}>
            <div className="checkin-group">
              <span className="checkin-label">Mood</span>
              <div className="checkin-options">
                {MOODS.map((m) => (
                  <button
                    key={m.label}
                    type="button"
                    className={`checkin-chip ${mood === m.label ? 'is-on' : ''}`}
                    onClick={() => setMood(m.label)}
                  >
                    <span className="checkin-emoji" aria-hidden="true">{m.emoji}</span>
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="checkin-group">
              <span className="checkin-label">Energy</span>
              <div className="checkin-options">
                {ENERGY.map((e) => (
                  <button
                    key={e.label}
                    type="button"
                    className={`checkin-chip ${energy === e.label ? 'is-on' : ''}`}
                    onClick={() => setEnergy(e.label)}
                  >
                    <span className="checkin-emoji" aria-hidden="true">{e.emoji}</span>
                    {e.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="checkin-group">
              <span className="checkin-label">Symptoms</span>
              <div className="checkin-options">
                {SYMPTOMS.map((s) => (
                  <button
                    key={s.label}
                    type="button"
                    className={`checkin-chip ${symptoms.includes(s.label) ? 'is-on' : ''}`}
                    onClick={() => toggleSymptom(s.label)}
                  >
                    <span className="checkin-emoji" aria-hidden="true">{s.emoji}</span>
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="checkin-group">
              <span className="checkin-label">Notes</span>
              <textarea
                className="checkin-notes"
                placeholder="Write a short note about how you're feeling..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
                maxLength={280}
              />
            </div>

            <button type="submit" className="btn btn-primary checkin-save">
              {saved ? 'Saved ✓' : 'Save Check-In'}
            </button>
          </form>
        </section>

        {/* Latest Articles */}
        <section className="dash-section reveal">
          <div className="dash-section-head">
            <h2>Latest articles</h2>
            <Link to="/articles" className="dash-section-link">
              View all
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
          <div className="dash-articles">
            <Link to="/articles" className="dash-article-card">
              <div className="dash-article-cover dash-article-cover--rose">
                {COVER_ART.cycle}
                <span className="dash-article-cat">Period Health</span>
              </div>
              <div className="dash-article-body">
                <strong>Understanding Your Menstrual Cycle</strong>
                <span>6 min read</span>
              </div>
            </Link>
            <Link to="/articles" className="dash-article-card">
              <div className="dash-article-cover dash-article-cover--beige">
                {COVER_ART.care}
                <span className="dash-article-cat">Self-Care</span>
              </div>
              <div className="dash-article-body">
                <strong>Simple Ways to Take Care of Yourself During Your Period</strong>
                <span>5 min read</span>
              </div>
            </Link>
            <Link to="/articles" className="dash-article-card">
              <div className="dash-article-cover dash-article-cover--blush">
                {COVER_ART.health}
                <span className="dash-article-cat">Cycle Health</span>
              </div>
              <div className="dash-article-body">
                <strong>When to Pay Attention to Changes in Your Cycle</strong>
                <span>7 min read</span>
              </div>
            </Link>
          </div>
        </section>

        {/* Community preview */}
        <section className="dash-section reveal">
          <div className="dash-section-head">
            <h2>Community</h2>
            <Link to="/community" className="dash-section-link">
              Explore
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
          <div className="dash-threads">
            <Link to="/community" className="dash-thread">
              <span className="dash-thread-cat">Period experiences</span>
              <strong>How do you usually prepare for your period?</strong>
              <span>42 replies</span>
            </Link>
            <Link to="/community" className="dash-thread">
              <span className="dash-thread-cat">Self-care</span>
              <strong>Share your favorite self-care routine.</strong>
              <span>56 replies</span>
            </Link>
          </div>
        </section>

        {/* Self-care */}
        <section className="dash-selfcare reveal">
          <div className="dash-section-head">
            <h2>Daily self-care</h2>
          </div>
          <ul className="selfcare-grid">
            {SELFCARE.map((s) => (
              <li key={s.title} className="selfcare-card">
                <span className="selfcare-emoji" aria-hidden="true">{s.emoji}</span>
                <strong>{s.title}</strong>
                <p>{s.text}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}
