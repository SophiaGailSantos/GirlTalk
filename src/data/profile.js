/*
 * Profile store — the single place that reads and writes a member's data.
 *
 * Everything is namespaced per user id and mirrored in localStorage, so the
 * app works instantly and each account keeps its own cycle days, reminders and
 * check-ins. (Swapping localStorage for Supabase tables later only touches
 * this file.)
 */

const KEY = 'girltalk:profile'

function readAll() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '{}') || {}
  } catch {
    return {}
  }
}

function writeAll(all) {
  localStorage.setItem(KEY, JSON.stringify(all))
}

export function emptyProfile() {
  return {
    setupDone: false,
    cycleLength: 28,
    periodDays: [],
    reminders: [],
    checkIns: {},
    onboardedAt: null,
  }
}

export function getProfile(userId) {
  const all = readAll()
  const stored = all[userId]
  const base = emptyProfile()
  if (!stored) return base
  return { ...base, ...stored }
}

export function saveProfile(userId, patch) {
  const all = readAll()
  all[userId] = { ...getProfile(userId), ...patch }
  writeAll(all)
  return all[userId]
}

/* ---- Cycle helpers ---- */

export function toKey(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function addDays(date, n) {
  const d = new Date(date)
  d.setDate(d.getDate() + n)
  return d
}

/* Start day of the most recent continuous run of marked period days. */
export function lastPeriodStart(periodDays) {
  const sorted = [...periodDays].sort()
  if (!sorted.length) return null
  let startKey = sorted[sorted.length - 1]
  for (let i = sorted.length - 2; i >= 0; i--) {
    const prev = new Date(sorted[i] + 'T00:00:00')
    const cur = new Date(sorted[i + 1] + 'T00:00:00')
    if ((cur - prev) / 86400000 === 1) startKey = sorted[i]
    else break
  }
  return new Date(startKey + 'T00:00:00')
}

/* Cycle day today, or null when nothing is tracked yet. */
export function cycleToday(profile) {
  const start = lastPeriodStart(profile.periodDays || [])
  if (!start) return null
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const day = Math.round((today - start) / 86400000) + 1
  const length = profile.cycleLength || 28
  if (day < 1) return null
  return { day, length, start, daysUntil: Math.ceil((addDays(start, length) - today) / 86400000) }
}

/* ---- Reminders ---- */

export function reminderTimeLabel(reminder) {
  if (!reminder.time) return 'Anytime'
  const match = String(reminder.time).match(/(\d{1,2}):(\d{2})\s*(am|pm)?/i)
  if (!match) return reminder.time
  let hour = parseInt(match[1], 10)
  const minute = match[2]
  const meridiem = (match[3] || '').toLowerCase()
  if (meridiem === 'pm' && hour < 12) hour += 12
  if (meridiem === 'am' && hour === 12) hour = 0
  return { label: `${hour % 12 === 0 ? 12 : hour % 12}:${minute} ${hour < 12 ? 'AM' : 'PM'}`, hour, minute: parseInt(minute, 10) }
}

/* Reminders that are due today and not yet ticked off. */
export function dueReminders(profile) {
  const done = profile.remindersDone || []
  const now = new Date()
  return (profile.reminders || []).filter((r) => {
    if (done.includes(r.id)) return false
    const parsed = reminderTimeLabel(r)
    if (typeof parsed === 'string' || parsed.hour === undefined) return true
    const due = new Date()
    due.setHours(parsed.hour, parsed.minute, 0, 0)
    return due <= now
  })
}