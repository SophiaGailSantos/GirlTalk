import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import supabase from '../supabaseClient.js'
import { SITE_URL } from '../siteUrl.js'

const AuthContext = createContext(null)

/*
 * Supabase users are shaped differently from what the app renders
 * (e.g. `user_metadata.first_name` instead of `user.firstName`), so every
 * user coming out of the client goes through this normaliser.
 */
function mapUser(supabaseUser) {
  if (!supabaseUser) return null
  const meta = supabaseUser.user_metadata || {}
  const firstName =
    meta.first_name ||
    meta.full_name ||
    (supabaseUser.email || '').split('@')[0] ||
    ''
  return { ...supabaseUser, firstName }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  /* Restore the stored session once on mount, then follow every auth change. */
  useEffect(() => {
    let cancelled = false

    supabase.auth
      .getSession()
      .then(({ data: { session } }) => {
        if (cancelled) return
        setUser(mapUser(session?.user ?? null))
        setLoading(false)
      })
      .catch((err) => {
        console.error('Failed to restore Supabase session:', err)
        if (!cancelled) setLoading(false)
      })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(mapUser(session?.user ?? null))
      setLoading(false)
    })

    return () => {
      cancelled = true
      subscription.unsubscribe()
    }
  }, [])

  /* Sign up — returns the Supabase response so callers can check for a session. */
  const signUp = useCallback(async (firstName, email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { first_name: firstName, full_name: firstName },
        emailRedirectTo: `${SITE_URL}/auth/callback`,
      },
    })
    if (error) throw error

    // Immediate session (email confirmation disabled) → the user is signed in.
    if (data.session) setUser(mapUser(data.user))
    return data
  }, [])

  /* Log in with email + password. */
  const signInWithPassword = useCallback(async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) throw error

    setUser(mapUser(data.user))
    return data
  }, [])

  /* Log out — clears the session locally and on the server. */
  const signOut = useCallback(async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    setUser(null)
  }, [])

  /* Update profile data through Supabase (first name in metadata, email change). */
  const updateProfile = useCallback(
    async (updates) => {
      const attrs = {}
      if (updates.firstName !== undefined) {
        attrs.data = {
          first_name: updates.firstName,
          full_name: updates.firstName,
        }
      }
      if (updates.email !== undefined && updates.email !== user?.email) {
        attrs.email = updates.email
      }
      if (Object.keys(attrs).length === 0) return null

      const { data, error } = await supabase.auth.updateUser(attrs)
      if (error) throw error

      setUser(mapUser(data.user))
      return data
    },
    [user]
  )

  return (
    <AuthContext.Provider
      value={{ user, loading, signUp, signInWithPassword, signOut, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  )
}

/* Hook export is intentional alongside AuthProvider — see eslint-disable below. */
// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext)
}
