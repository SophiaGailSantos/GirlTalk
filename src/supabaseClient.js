import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    'Missing Supabase configuration: VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY must be set in .env'
  )
}

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    // Email confirmation links must also work when opened on a different
    // device/browser than the one that started signup. PKCE (the default)
    // bakes a verifier into the originating browser only, so cross-device
    // email links fail with access_denied. Implicit includes the session in
    // the redirect URL, which any device can consume.
    flowType: 'implicit',
  },
})

export default supabase
