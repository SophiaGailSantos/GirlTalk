import { useState } from 'react'
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

const MOODS = ['Struggling', 'Low', 'Okay', 'Good', 'Great']
const ENERGY = ['Low', 'Okay', 'Good']
const SYMPTOMS = ['Cramps', 'Headache', 'Bloating', 'Fatigue', 'Other']

export default function Dashboard() {
  const { user } = useAuth()

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
          <div className="dash-tracker-main">
            <CycleRing day={12} length={28} />
            <div className="dash-tracker-info">
              <span className="dash-tracker-label">Your cycle</span>
              <div className="dash-tracker-stats">
                <div className="dash-stat">
                  <span>Next period</span>
                  <strong>16 days</strong>
                </div>
                <div className="dash-stat">
                  <span>Cycle length</span>
                  <strong>28 days</strong>
                </div>
                <div className="dash-stat">
                  <span>Period</span>
                  <strong>Day 12</strong>
                </div>
              </div>
              <Link to="/tracker" className="btn btn-primary dash-tracker-btn">
                Update My Cycle
              </Link>
            </div>
          </div>
          <p className="dash-disclaimer">
            Cycle predictions are estimates and may not be accurate for everyone.
            Your cycle information is for personal tracking and reference only —
            not medical advice.
          </p>
        </section>

        {/* Daily Health Check-In */}
        <section className="dash-checkin reveal">
          <h2>How are you feeling today?</h2>
          <form onSubmit={handleSave}>
            <div className="checkin-group">
              <span className="checkin-label">Mood</span>
              <div className="checkin-options">
                {MOODS.map((m) => (
                  <button
                    key={m}
                    type="button"
                    className={`checkin-chip ${mood === m ? 'is-on' : ''}`}
                    onClick={() => setMood(m)}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            <div className="checkin-group">
              <span className="checkin-label">Energy</span>
              <div className="checkin-options">
                {ENERGY.map((e) => (
                  <button
                    key={e}
                    type="button"
                    className={`checkin-chip ${energy === e ? 'is-on' : ''}`}
                    onClick={() => setEnergy(e)}
                  >
                    {e}
                  </button>
                ))}
              </div>
            </div>

            <div className="checkin-group">
              <span className="checkin-label">Symptoms</span>
              <div className="checkin-options">
                {SYMPTOMS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    className={`checkin-chip ${symptoms.includes(s) ? 'is-on' : ''}`}
                    onClick={() => toggleSymptom(s)}
                  >
                    {s}
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
              <div className="dash-article-cover dash-article-cover--rose" />
              <div className="dash-article-body">
                <span className="dash-article-cat">Period Health</span>
                <strong>Understanding Your Menstrual Cycle</strong>
                <span>6 min read</span>
              </div>
            </Link>
            <Link to="/articles" className="dash-article-card">
              <div className="dash-article-cover dash-article-cover--beige" />
              <div className="dash-article-body">
                <span className="dash-article-cat">Self-Care</span>
                <strong>Simple Ways to Take Care of Yourself During Your Period</strong>
                <span>5 min read</span>
              </div>
            </Link>
            <Link to="/articles" className="dash-article-card">
              <div className="dash-article-cover dash-article-cover--blush" />
              <div className="dash-article-body">
                <span className="dash-article-cat">Cycle Health</span>
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
          <h2>Daily self-care</h2>
          <ul>
            <li>
              <span className="selfcare-dot" aria-hidden="true" />
              Stay hydrated
            </li>
            <li>
              <span className="selfcare-dot" aria-hidden="true" />
              Make time to rest
            </li>
            <li>
              <span className="selfcare-dot" aria-hidden="true" />
              Track how you&apos;re feeling
            </li>
            <li>
              <span className="selfcare-dot" aria-hidden="true" />
              Do something you enjoy
            </li>
          </ul>
        </section>
      </div>
    </div>
  )
}
