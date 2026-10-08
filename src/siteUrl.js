/*
 * The public entry URL for this deployment.
 *
 * In local dev this resolves to whatever origin you opened in the browser
 * (e.g. http://localhost:4173). For a deployed site, set VITE_APP_URL in
 * `.env` (and whitelist it in Supabase → Authentication → URL Configuration),
 * so confirmation emails always point back to the real site.
 */
export const SITE_URL = (import.meta.env.VITE_APP_URL || window.location.origin).replace(/\/$/, '')
