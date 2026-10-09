import { Link } from 'react-router-dom'
import {
  IconCheck,
  IconChevronLeft,
  IconChevronRight,
  IconLock,
  IconArrow,
} from './icons.jsx'
import './TrackerPreview.css'

const RING_R = 66
const CIRCUMFERENCE = 2 * Math.PI * RING_R
const CYCLE_DAYS = 28
const TODAY_CYCLE_DAY = 12

/* Fictional "October 2026" preview: Oct 1 2026 starts on a Thursday. */
const MONTH_OFFSET = 4
const MONTH_DAYS = 31
const PERIOD_DAYS = new Set([1, 2, 3, 4, 5])
const PREDICTED_DAYS = new Set([29, 30, 31])
const TODAY_DATE = 12

const POINTS = [
  'Log your period in seconds — one tap',
  'See predictions for your next cycle',
  'Track mood, symptoms, and flow',
  'Your data stays private to you',
]

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

function CycleRing() {
  const progress = TODAY_CYCLE_DAY / CYCLE_DAYS

  return (
    <div className="tp-ring-wrap">
      <svg className="tp-ring" viewBox="0 0 160 160" aria-hidden="true">
        <defs>
          <linearGradient id="trackerGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ff8fb8" />
            <stop offset="100%" stopColor="#ff2d78" />
          </linearGradient>
        </defs>
        <circle className="tp-ring-track" cx="80" cy="80" r={RING_R} />
        <circle
          className="tp-ring-fill"
          cx="80"
          cy="80"
          r={RING_R}
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={CIRCUMFERENCE * (1 - progress)}
          transform="rotate(-90 80 80)"
        />
        {[1, 2, 3, 4, 5].map((i) => {
          const angle = -90 + (i / CYCLE_DAYS) * 360
          const rad = (angle * Math.PI) / 180
          return (
            <circle
              key={i}
              cx={80 + RING_R * Math.cos(rad)}
              cy={80 + RING_R * Math.sin(rad)}
              r="3.2"
              className="tp-ring-marker"
            />
          )
        })}
      </svg>

      <div className="tp-ring-label">
        <strong>Day {TODAY_CYCLE_DAY}</strong>
        <span>of {CYCLE_DAYS} days</span>
      </div>
    </div>
  )
}

function CycleCalendar() {
  const days = Array.from({ length: MONTH_DAYS }, (_, i) => i + 1)

  return (
    <div className="tp-cal">
      <div className="tp-cal-head">
        <strong>October 2026</strong>
        <span className="tp-cal-nav" aria-hidden="true">
          <IconChevronLeft size={13} />
          <IconChevronRight size={13} />
        </span>
      </div>

      <div className="tp-cal-weekdays" aria-hidden="true">
        {WEEKDAYS.map((d, i) => (
          <span key={`${d}-${i}`}>{d}</span>
        ))}
      </div>

      <div className="tp-cal-grid">
        {Array.from({ length: MONTH_OFFSET }).map((_, i) => (
          <span key={`blank-${i}`} className="tp-cell tp-cell--empty" />
        ))}
        {days.map((d) => {
          const cls = [
            'tp-cell',
            PERIOD_DAYS.has(d) ? 'is-period' : '',
            PREDICTED_DAYS.has(d) ? 'is-predicted' : '',
            d === TODAY_DATE ? 'is-today' : '',
          ]
            .filter(Boolean)
            .join(' ')
          return (
            <span key={d} className={cls}>
              {d}
            </span>
          )
        })}
      </div>

      <div className="tp-legend">
        <span>
          <i className="lg lg--period" /> Period
        </span>
        <span>
          <i className="lg lg--today" /> Today
        </span>
        <span>
          <i className="lg lg--predicted" /> Predicted
        </span>
      </div>
    </div>
  )
}

export default function TrackerPreview() {
  return (
    <section id="tracker" className="section tp-section">
      <div className="tp-glow" aria-hidden="true" />

      <div className="container tp-grid">
        <div className="tp-visual reveal">
          <div className="tp-dash">
            <div className="tp-dash-head">
              <div>
                <strong>Cycle Dashboard</strong>
                <span>Monday, October 12</span>
              </div>
              <span className="tp-app-chip">App preview</span>
            </div>

            <div className="tp-dash-body">
              <div className="tp-ring-col">
                <CycleRing />
                <span className="tp-phase">Follicular phase</span>
              </div>
              <CycleCalendar />
            </div>

            <div className="tp-stats">
              <div className="tp-stat">
                <span>Next period</span>
                <strong>Oct 29</strong>
                <em>in 17 days</em>
              </div>
              <div className="tp-stat">
                <span>Average cycle</span>
                <strong>{CYCLE_DAYS} days</strong>
                <em>last 3 cycles</em>
              </div>
              <div className="tp-stat">
                <span>Last period</span>
                <strong>Oct 1–5</strong>
                <em>5 days long</em>
              </div>
            </div>

            <div className="tp-dash-foot">
              <div className="tp-tags" aria-hidden="true">
                <span>Log today</span>
                <span>Add symptoms</span>
                <span>Export data</span>
              </div>
              <span className="tp-private">
                <IconLock size={13} />
                Private to you
              </span>
            </div>
          </div>
        </div>

        <div className="tp-copy reveal">
          <span className="section-eyebrow">Period Tracker</span>
          <h2 className="section-title">
            Know <em>your cycle.</em>
          </h2>
          <p className="section-sub">
            Your period, your patterns, your predictions — tracked in a
            simple, private dashboard that gets more useful every cycle.
          </p>

          <ul className="tp-points">
            {POINTS.map((p) => (
              <li key={p}>
                <span className="tp-check" aria-hidden="true">
                  <IconCheck size={12} />
                </span>
                <span>{p}</span>
              </li>
            ))}
          </ul>

          <div className="tp-actions">
            <Link to="/login" className="btn btn-primary">
              Track Your Cycle
              <IconArrow size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
