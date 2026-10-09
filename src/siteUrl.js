/*
 * The public entry URL for this deployment.
 *
 * Google sign-in returns to this URL, so it must match the host the member
 * actually started on. Local addresses (localhost / LAN IPs) are the only case
 * where we honour VITE_APP_URL; on a real deployment we mirror the current
 * origin so the callback can never bounce someone to a different (possibly
 * preview) hostname. Whitelist your live domains in Supabase → Authentication →
 * URL Configuration.
 */
const isLocalAddress = (hostname) =>
  hostname === 'localhost' ||
  hostname.endsWith('.local') ||
  /^127\./.test(hostname) ||
  /^10\./.test(hostname) ||
  /^192\.168\./.test(hostname) ||
  /^172\.(1[6-9]|2\d|3[01])\./.test(hostname)

const origin = window.location.origin.replace(/\/$/, '')

export const SITE_URL = isLocalAddress(window.location.hostname)
  ? (import.meta.env.VITE_APP_URL || origin).replace(/\/$/, '')
  : origin