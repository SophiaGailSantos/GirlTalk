import { useEffect, useMemo, useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import {
  getProfile,
  saveProfile,
  toKey,
  addDays,
  lastPeriodStart,
  reminderTimeLabel,
} from '../data/profile.js'
import './Tracker.css'

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

const REMINDER_GROUPS = [
  { key: 'pill', title: 'Birth control reminders', badge: 'Private', emoji: '💊' },
  { key: 'health', title: 'General health reminders', badge: 'Everyday', emoji: '🔔' },
]

/* Monotonic id helper — keeps React renders pure. */
let idCounter = 0
const nextId = () => {
  idCounter += 1
  return `r${idCounter}`
}

const SUGGESTIONS = {
  pill: ['Birth control pill', 'Refill prescription', 'Injection reminder'],
  health: ['Drink water', 'Vitamins', 'Skincare', 'Stretching', 'Sleep by 10 PM'],
}

export default function Tracker() {
  const { user } = useAuth()
  const [profile, setProfile] = useState(() => getProfile(user.id))
  const [viewDate, setViewDate] = useState(new Date())
  const [draft, setDraft] = useState({ group: 'pill', title: '', time: '' })
  const [notifyOn, setNotifyOn] = useState(
    () => typeof Notification !== 'undefined' && Notification.permission === 'granted'
  )

  const update = (patch) => setProfile(saveProfile(user.id, patch))

  /* ---- Cycle ---- */
  const cycleLength = profile.cycleLength || 28
  const periodDays = useMemo(() => profile.periodDays || [], [profile.periodDays])

  const lastStart = useMemo(() => lastPeriodStart(periodDays), [periodDays])

  const predictedKeys = useMemo(() => {
    const set = new Set()
    if (lastStart) {
      for (let i = 0; i < 5; i++) set.add(toKey(addDays(lastStart, cycleLength + i)))
    }
    return set
  }, [lastStart, cycleLength])

  const toggleDay = (key) => {
    const next = new Set(periodDays)
    if (next.has(key)) next.delete(key)
    else next.add(key)
    update({ periodDays: [...next].sort() })
  }

  const setCycleLength = (value) => {
    const length = Math.min(45, Math.max(21, parseInt(value, 10) || 28))
    update({ cycleLength: length })
  }

  /* ---- Reminders ---- */
  const reminders = profile.reminders || []
  const done = profile.remindersDone || []

  const addReminder = (e) => {
    e.preventDefault()
    const title = draft.title.trim()
    if (!title) return
    update({
      reminders: [
        ...reminders,
        { id: `${draft.group}-${nextId()}`, group: draft.group, title, time: draft.time.trim() || 'Anytime' },
      ],
    })
    setDraft((d) => ({ ...d, title: '', time: '' }))
  }

  const addSuggestion = (group, title) =>
    update({
      reminders: [...reminders, { id: `${group}-${nextId()}`, group, title, time: 'Anytime' }],
    })

  const removeReminder = (id) =>
    update({ reminders: reminders.filter((r) => r.id !== id) })

  const toggleDone = (id) =>
    update({ remindersDone: done.includes(id) ? done.filter((x) => x !== id) : [...done, id] })

  const askNotifications = async () => {
    if (typeof Notification === 'undefined') return
    const result = await Notification.requestPermission()
    setNotifyOn(result === 'granted')
    if (result === 'granted') {
      new Notification('⏰ GirlTalk reminders are on', {
        body: 'We’ll nudge you while you’re on GirlTalk when a reminder is due.',
      })
    }
  }

  /* ---- Calendar maths ---- */
  const firstOfMonth = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1)
  const startOffset = firstOfMonth.getDay()
  const daysInMonth = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0).getDate()
  const cells = []
  for (let i = 0; i < startOffset; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(viewDate.getFullYear(), viewDate.getMonth(), d))

  const todayKey = toKey(new Date())
  const monthLabel = viewDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  const daysUntilNext = lastStart
    ? Math.ceil((addDays(lastStart, cycleLength) - new Date()) / 86400000)
    : null

  useEffect(() => {
    /* keep the profile in sync if another tab changes it */
    const onFocus = () => setProfile(getProfile(user.id))
    window.addEventListener('focus', onFocus)
    return () => window.removeEventListener('focus', onFocus)
  }, [user.id])

  return (
    <div className="page tracker-page">
      <div className="container">
        <header className="page-header reveal">
          <span className="section-eyebrow">Period Tracker</span>
          <h1 className="section-title">Track your cycle</h1>
          <p className="section-sub">
            Tap the days you had your period to mark them. We&apos;ll estimate your next one.
          </p>
        </header>

        <div className="tracker-grid">
          <div className="tracker-calendar reveal">
            <div className="cal-stats">
              <div className="cal-stat">
                <span>Next period</span>
                <strong>
                  {lastStart
                    ? addDays(lastStart, cycleLength).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                    : '—'}
                </strong>
              </div>
              <div className="cal-stat">
                <span>Cycle length</span>
                <strong>{cycleLength} days</strong>
              </div>
              <div className="cal-stat">
                <span>Marked days</span>
                <strong>{periodDays.length}</strong>
              </div>
            </div>

            <div className="cal-head">
              <button
                type="button"
                className="cal-nav"
                onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1))}
                aria-label="Previous month"
              >
                ‹
              </button>
              <strong>{monthLabel}</strong>
              <button
                type="button"
                className="cal-nav"
                onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1))}
                aria-label="Next month"
              >
                ›
              </button>
            </div>

            <div className="cal-weekdays">
              {WEEKDAYS.map((w, i) => (
                <span key={i}>{w}</span>
              ))}
            </div>

            <div className="cal-grid">
              {cells.map((d, i) => {
                if (!d) return <span key={i} className="cal-cell cal-cell--blank" />
                const key = toKey(d)
                const isPeriod = periodDays.includes(key)
                const isPredicted = predictedKeys.has(key) && !isPeriod
                const isToday = key === todayKey
                return (
                  <button
                    type="button"
                    key={key}
                    className={`cal-day${isPeriod ? ' cal-day--period' : ''}${isPredicted ? ' cal-day--predicted' : ''}${isToday && !isPeriod ? ' cal-day--today' : ''}`}
                    onClick={() => toggleDay(key)}
                    aria-pressed={isPeriod}
                  >
                    {d.getDate()}
                  </button>
                )
              })}
            </div>

            <div className="cal-legend">
              <span><i className="dot dot--period" /> Period day</span>
              <span><i className="dot dot--predicted" /> Predicted</span>
              <span><i className="dot dot--today" /> Today</span>
            </div>

            <label className="cal-cycle">
              Cycle length
              <input
                type="number"
                min="21"
                max="45"
                value={cycleLength}
                onChange={(e) => setCycleLength(e.target.value)}
              />
              days
            </label>

            {periodDays.length > 0 && (
              <button type="button" className="cal-clear" onClick={() => update({ periodDays: [] })}>
                Clear marked days
              </button>
            )}
          </div>

          <div className="tracker-result reveal">
            {lastStart ? (
              <>
                <span className="result-label">Estimated next period</span>
                <strong className="result-date">
                  {addDays(lastStart, cycleLength).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </strong>
                <span className="result-days">
                  {daysUntilNext > 0
                    ? `About ${daysUntilNext} day${daysUntilNext === 1 ? '' : 's'} from now`
                    : daysUntilNext === 0
                      ? 'Expected around today'
                      : `Passed ${Math.abs(daysUntilNext)} day${Math.abs(daysUntilNext) === 1 ? '' : 's'} ago`}
                </span>
              </>
            ) : (
              <div className="tracker-empty">
                <p>
                  Mark the first day of your last period and we&apos;ll track your cycle day and
                  predict your next one.
                </p>
              </div>
            )}

            {!notifyOn && typeof Notification !== 'undefined' && (
              <button type="button" className="cal-notify" onClick={askNotifications}>
                🔔 Turn on browser reminders
              </button>
            )}
          </div>
        </div>

        {/* Reminders — birth control + general health, kept with the tracker */}
        <section className="tracker-reminders reveal">
          <div className="reminders-head">
            <h2>Reminders</h2>
            <span>Tap an item once you&apos;ve done it</span>
          </div>
          <div className="tracker-reminders-grid">
            {REMINDER_GROUPS.map((g) => {
              const items = reminders.filter((r) => r.group === g.key)
              return (
                <article key={g.key} className="rem-cardx">
                  <div className="rem-cardx-top">
                    <span className="rem-emoji" aria-hidden="true">{g.emoji}</span>
                    <div>
                      <h3>{g.title}</h3>
                      <span className="rem-badge">{g.badge}</span>
                    </div>
                  </div>

                  <form className="rem-add" onSubmit={addReminder}>
                    <input
                      type="text"
                      placeholder={`Add a ${g.key === 'pill' ? 'birth control' : 'health'} reminder`}
                      value={draft.group === g.key ? draft.title : ''}
                      onChange={(e) => setDraft((d) => ({ ...d, group: g.key, title: e.target.value }))}
                      onFocus={() => setDraft((d) => ({ ...d, group: g.key }))}
                    />
                    <input
                      type="text"
                      placeholder="Time"
                      className="rem-add-time"
                      value={draft.group === g.key ? draft.time : ''}
                      onChange={(e) => setDraft((d) => ({ ...d, group: g.key, time: e.target.value }))}
                      onFocus={() => setDraft((d) => ({ ...d, group: g.key }))}
                    />
                    <button type="submit" className="rem-add-btn" aria-label="Add reminder">
                      +
                    </button>
                  </form>

                  <ul>
                    {items.length === 0 ? (
                      <li className="rem-invite">
                        <p>No reminders here yet — add the ones you want to see every day.</p>
                        <div className="rem-suggest">
                          {SUGGESTIONS[g.key].map((s) => (
                            <button
                              key={s}
                              type="button"
                              className="rem-suggest-btn"
                              onClick={() => addSuggestion(g.key, s)}
                            >
                              + {s}
                            </button>
                          ))}
                        </div>
                      </li>
                    ) : (
                      items.map((item) => {
                        const isDone = done.includes(item.id)
                        const label = reminderTimeLabel(item)
                        return (
                          <li key={item.id} className="rem-row">
                            <button
                              type="button"
                              className={`rem-item${isDone ? ' is-done' : ''}`}
                              onClick={() => toggleDone(item.id)}
                              aria-pressed={isDone}
                            >
                              <span className="rem-check" aria-hidden="true">{isDone ? '✓' : ''}</span>
                              <span className="rem-item-copy">
                                <strong>{item.title}</strong>
                                <span>{typeof label === 'string' ? label : label.label}</span>
                              </span>
                            </button>
                            <button
                              type="button"
                              className="rem-delete"
                              onClick={() => removeReminder(item.id)}
                              aria-label={`Delete ${item.title}`}
                            >
                              ✕
                            </button>
                          </li>
                        )
                      })
                    )}
                  </ul>
                </article>
              )
            })}
          </div>
        </section>
      </div>
    </div>
  )
}