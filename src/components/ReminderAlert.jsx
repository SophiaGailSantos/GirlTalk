import { useState } from 'react'
import { Link } from 'react-router-dom'
import './ReminderAlert.css'

/*
 * Nudges the member about reminders that are due right now. The list is
 * rendered by the caller; this just handles the alert chrome and the
 * browser-notification opt-in.
 */
export function ReminderAlert({ reminders, onDone, onDismiss }) {
  const [asked, setAsked] = useState(
    () => typeof Notification !== 'undefined' && Notification.permission === 'granted'
  )

  if (!reminders.length) return null

  const askPermission = async () => {
    if (typeof Notification === 'undefined') return
    const result = await Notification.requestPermission()
    if (result === 'granted') {
      setAsked(true)
      new Notification('⏰ GirlTalk reminders are on', {
        body: 'We’ll nudge you when a reminder is due.',
      })
    }
  }

  return (
    <div className="rem-alert" role="status">
      <div className="rem-alert-head">
        <span className="rem-alert-title">
          ⏰ {reminders.length} reminder{reminders.length === 1 ? '' : 's'} due now
        </span>
        <button type="button" className="rem-alert-x" onClick={onDismiss} aria-label="Hide reminders">
          ✕
        </button>
      </div>

      <ul>
        {reminders.map((r) => (
          <li key={r.id}>
            <span>
              <strong>{r.title}</strong>
              <em>
                {typeof reminderLabel(r.time) === 'string'
                  ? reminderLabel(r.time)
                  : `Due ${reminderLabel(r.time).label}`}
              </em>
            </span>
            <button type="button" onClick={() => onDone(r.id)}>
              Done
            </button>
          </li>
        ))}
      </ul>

      {!asked && typeof Notification !== 'undefined' && Notification.permission === 'default' && (
        <button type="button" className="rem-alert-ask" onClick={askPermission}>
          Turn on browser reminders
        </button>
      )}

      <Link to="/tracker" className="rem-alert-link">
        Manage reminders
      </Link>
    </div>
  )
}

/* Local copy of the label parser so the alert stays self-contained. */
function reminderLabel(time) {
  const match = String(time || '').match(/(\d{1,2}):(\d{2})\s*(am|pm)?/i)
  if (!match) return time || 'Anytime'
  let hour = parseInt(match[1], 10)
  const minute = match[2]
  const meridiem = (match[3] || '').toLowerCase()
  if (meridiem === 'pm' && hour < 12) hour += 12
  if (meridiem === 'am' && hour === 12) hour = 0
  return { label: `${hour % 12 === 0 ? 12 : hour % 12}:${minute} ${hour < 12 ? 'AM' : 'PM'}`, hour, minute: parseInt(minute, 10) }
}