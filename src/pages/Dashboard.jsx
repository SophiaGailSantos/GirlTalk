import { useState, useEffect, useMemo, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { ARTICLES } from '../data/articles.js'
import { getProfile, saveProfile, cycleToday, dueReminders, reminderTimeLabel, toKey } from '../data/profile.js'
import { buildCarePlan } from '../data/selfCare.js'
import { ReminderAlert } from '../components/ReminderAlert.jsx'
import './Dashboard.css'

const DASH_ARTICLES = ARTICLES.slice(0, 3)

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


/* Loads this member's saved profile (cycle, reminders, check-ins) and keeps it fresh. */
function useProfile(userId) {
  const [profile, setProfile] = useState(() => (userId ? getProfile(userId) : null))

  useEffect(() => {
    const reload = () => setProfile(getProfile(userId))
    reload()
    window.addEventListener('focus', reload)
    return () => window.removeEventListener('focus', reload)
  }, [userId])

  const update = (patch) => {
    if (!userId) return
    setProfile(saveProfile(userId, patch))
  }

  return { profile, update }
}

/* Reminders that are due right now, plus a one-shot browser notification. */
function useDueReminders(profile, userId) {
  const notifiedFor = useRef(null)

  const due = useMemo(() => (profile ? dueReminders(profile) : []), [profile])
  const dueKey = due.map((r) => r.id).join('|')

  useEffect(() => {
    if (!profile || !userId || !due.length) return
    if (typeof Notification === 'undefined' || Notification.permission !== 'granted') return
    if (notifiedFor.current === dueKey) return
    due.forEach((r) => {
      const parsed = reminderTimeLabel(r)
      const title = typeof parsed === 'string' ? '⏰ GirlTalk reminder' : '⏰ GirlTalk reminder'
      const body = `${r.title}${typeof parsed === 'string' ? '' : ` — due ${parsed.label}`}`
      new Notification(title, { body, tag: r.id })
    })
    notifiedFor.current = dueKey
  }, [profile, userId, due, dueKey])

  return due
}

export default function Dashboard() {
  const { user } = useAuth()
  const { profile, update } = useProfile(user?.id)

  const todayKey = toKey(new Date())
  const todayCheckIn = profile?.checkIns?.[todayKey] || null

  const [mood, setMood] = useState(todayCheckIn?.mood || '')
  const [energy, setEnergy] = useState(todayCheckIn?.energy || '')
  const [symptoms, setSymptoms] = useState(todayCheckIn?.symptoms || [])
  const [note, setNote] = useState(todayCheckIn?.note || '')
  const [saved, setSaved] = useState(false)

  const cycle = useMemo(() => (profile ? cycleToday(profile) : null), [profile])

  const due = useDueReminders(profile, user?.id)

  const carePlan = useMemo(
    () =>
      buildCarePlan({
        mood,
        energy,
        symptoms,
        cycleDay: cycle?.day ?? null,
        cycleLength: cycle?.length ?? 28,
      }),
    [mood, energy, symptoms, cycle]
  )

  const toggleSymptom = (s) => {
    setSymptoms((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    )
  }

  const toggleReminder = (id) => {
    const doneList = profile?.remindersDone || []
    update({
      remindersDone: doneList.includes(id) ? doneList.filter((x) => x !== id) : [...doneList, id],
    })
  }

  const handleSave = (e) => {
    e.preventDefault()
    update({
      checkIns: {
        ...(profile?.checkIns || {}),
        [todayKey]: { mood, energy, symptoms, note, at: new Date().toISOString() },
      },
    })
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

        {/* Due reminder alert */}
        <ReminderAlert
          reminders={due}
          onDone={(id) => toggleReminder(id)}
          onDismiss={() => due.forEach((r) => toggleReminder(r.id))}
        />

        {/* Today's care plan — produced from the check-in above */}
        <section className="dash-careplan reveal">
          <div className="dash-section-head">
            <h2>Today&apos;s care plan</h2>
            {carePlan.phase && <span className="care-phase">{carePlan.phase.label}</span>}
          </div>
          <p className="care-focus">{carePlan.focus}</p>
          {carePlan.tips.length > 0 ? (
            <div className="care-grid">
              {carePlan.tips.map((t) => (
                <article key={t.title} className="care-card">
                  <span className="care-icon" aria-hidden="true">{t.icon}</span>
                  <div>
                    <strong>{t.title}</strong>
                    <p>{t.detail}</p>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="care-empty">
              Tap how you&apos;re feeling above and we&apos;ll build today&apos;s care plan.
            </p>
          )}
        </section>

        {/* Today's reminders */}
        <section className="dash-reminders reveal">
          <div className="dash-section-head">
            <h2>Today&apos;s reminders</h2>
            <Link to="/tracker" className="dash-section-link">
              Manage
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>

          {(profile?.reminders || []).length === 0 ? (
            <div className="rem-empty-dash">
              <p>No reminders yet. Add birth control or health reminders and they&apos;ll show up here every day.</p>
              <Link to="/tracker" className="btn btn-primary">Add my first reminder</Link>
            </div>
          ) : (
            <ul className="rem-dash-list">
              {(profile?.reminders || []).slice(0, 6).map((r) => {
                const isDone = (profile?.remindersDone || []).includes(r.id)
                const label = reminderTimeLabel(r)
                return (
                  <li key={r.id}>
                    <button
                      type="button"
                      className={`rem-item${isDone ? ' is-done' : ''}`}
                      onClick={() => toggleReminder(r.id)}
                      aria-pressed={isDone}
                    >
                      <span className="rem-check" aria-hidden="true">{isDone ? '✓' : ''}</span>
                      <span className="rem-item-copy">
                        <strong>{r.title}</strong>
                        <span>{typeof label === 'string' ? label : label.label}</span>
                      </span>
                      <span className="rem-group-tag">{r.group === 'pill' ? 'Birth control' : 'Health'}</span>
                    </button>
                  </li>
                )
              })}
            </ul>
          )}
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
            {DASH_ARTICLES.map((a) => (
              <Link key={a.slug} to={`/articles?article=${a.slug}`} className="dash-article-card">
                <div className="dash-article-cover">
                  <img src={a.image} alt="" loading="lazy" />
                  <span className="dash-article-cat">{a.cat}</span>
                </div>
                <div className="dash-article-body">
                  <strong>{a.title}</strong>
                  <span>{a.read}</span>
                </div>
              </Link>
            ))}
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
