import { useState, useEffect } from 'react'
import './Tracker.css'

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

function toKey(d) {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

function addDays(date, n) {
  const d = new Date(date)
  d.setDate(d.getDate() + n)
  return d
}

const REMINDERS = [
  {
    key: 'pill',
    title: 'Birth control reminders',
    badge: 'Private',
    emoji: '💊',
    items: [
      { label: 'Birth control pill', when: 'Today · 9:00 PM' },
      { label: 'Refill prescription', when: 'Friday · 10:00 AM' },
    ],
  },
  {
    key: 'health',
    title: 'General health reminders',
    badge: 'Everyday',
    emoji: '🔔',
    items: [
      { label: 'Drink water', when: 'Daily · all day' },
      { label: 'Vitamins', when: 'Daily · 8:00 AM' },
      { label: 'Check-in appointment', when: 'When booked' },
    ],
  },
]

export default function Tracker() {
  const [viewDate, setViewDate] = useState(new Date())
  const [cycleLength, setCycleLength] = useState(28)
  const [periodDays, setPeriodDays] = useState(() => {
    try {
      return new Set(JSON.parse(localStorage.getItem('girltalk:periodDays') || '[]'))
    } catch {
      return new Set()
    }
  })

  useEffect(() => {
    localStorage.setItem('girltalk:periodDays', JSON.stringify([...periodDays]))
  }, [periodDays])

  useEffect(() => {
    localStorage.setItem('girltalk:cycleLength', String(cycleLength))
  }, [cycleLength])

  const [selected, setSelected] = useState(null)
  const [done, setDone] = useState(() => {
    try {
      return new Set(JSON.parse(localStorage.getItem('girltalk:remindersDone') || '[]'))
    } catch {
      return new Set()
    }
  })

  useEffect(() => {
    localStorage.setItem('girltalk:remindersDone', JSON.stringify([...done]))
  }, [done])

  const toggleDone = (key) =>
    setDone((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })

  const toggleDay = (key) => {
    setPeriodDays((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  const sortedMarked = [...periodDays].sort()
  // Start of the most recent continuous run of marked period days.
  let lastStart = null
  if (sortedMarked.length) {
    let startKey = sortedMarked[sortedMarked.length - 1]
    for (let i = sortedMarked.length - 2; i >= 0; i--) {
      const prev = new Date(sortedMarked[i] + 'T00:00:00')
      const cur = new Date(sortedMarked[i + 1] + 'T00:00:00')
      if ((cur - prev) / (1000 * 60 * 60 * 24) === 1) startKey = sortedMarked[i]
      else break
    }
    lastStart = new Date(startKey + 'T00:00:00')
  }

  // Predicted next period = last period start + cycleLength (5-day window).
  const predictedKeys = new Set()
  if (lastStart) {
    for (let i = 0; i < 5; i++) predictedKeys.add(toKey(addDays(lastStart, cycleLength + i)))
  }

  const firstOfMonth = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1)
  const startOffset = firstOfMonth.getDay()
  const daysInMonth = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0).getDate()
  const cells = []
  for (let i = 0; i < startOffset; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(viewDate.getFullYear(), viewDate.getMonth(), d))

  const todayKey = toKey(new Date())
  const monthLabel = viewDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })

  const daysUntilNext = lastStart
    ? Math.ceil((addDays(lastStart, cycleLength) - new Date()) / (1000 * 60 * 60 * 24))
    : null

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
                <strong>{periodDays.size}</strong>
              </div>
            </div>

            <div className="cal-head">
              <button type="button" className="cal-nav" onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1))} aria-label="Previous month">‹</button>
              <strong>{monthLabel}</strong>
              <button type="button" className="cal-nav" onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1))} aria-label="Next month">›</button>
            </div>

            <div className="cal-weekdays">
              {WEEKDAYS.map((w, i) => <span key={i}>{w}</span>)}
            </div>

            <div className="cal-grid">
              {cells.map((d, i) => {
                if (!d) return <span key={i} className="cal-cell cal-cell--blank" />
                const key = toKey(d)
                const isPeriod = periodDays.has(key)
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
                onChange={(e) => setCycleLength(Math.min(45, Math.max(21, parseInt(e.target.value, 10) || 28)))}
              />
              days
            </label>
          </div>

          <div className="tracker-result reveal">
            {lastStart ? (
              <>
                <span className="result-label">Estimated next period</span>
                <strong className="result-date">
                  {addDays(lastStart, cycleLength).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </strong>
                <span className="result-days">
                  {daysUntilNext > 0
                    ? `About ${daysUntilNext} day${daysUntilNext === 1 ? '' : 's'} from now`
                    : daysUntilNext === 0
                      ? 'Expected around today'
                      : `Passed ${Math.abs(daysUntilNext)} day${Math.abs(daysUntilNext) === 1 ? '' : 's'} ago`}
                </span>
                <button type="button" className="cal-clear" onClick={() => setPeriodDays(new Set())}>
                  Clear marked days
                </button>
              </>
            ) : (
              <div className="tracker-empty">
                <p>Tap the dates you had your period on the calendar to see your prediction.</p>
              </div>
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
            {REMINDERS.map((r) => (
              <article key={r.key} className="rem-cardx">
                <div className="rem-cardx-top">
                  <span className="rem-emoji" aria-hidden="true">{r.emoji}</span>
                  <div>
                    <h3>{r.title}</h3>
                    <span className="rem-badge">{r.badge}</span>
                  </div>
                </div>
                <ul>
                  {r.items.map((item) => {
                    const key = `${r.key}:${item.label}`
                    const isDone = done.has(key)
                    return (
                      <li key={key}>
                        <button
                          type="button"
                          className={`rem-item${isDone ? ' is-done' : ''}`}
                          onClick={() => toggleDone(key)}
                          aria-pressed={isDone}
                        >
                          <span className="rem-check" aria-hidden="true">{isDone ? '✓' : ''}</span>
                          <span className="rem-item-copy">
                            <strong>{item.label}</strong>
                            <span>{item.when}</span>
                          </span>
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
