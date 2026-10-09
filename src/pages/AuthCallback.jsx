import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import './Auth.css'

/* Supabase puts failures in the URL hash, e.g.
 * #error=access_denied&error_code=otp_expired&error_description=Email+link... */
function readHashError() {
  try {
    const params = new URLSearchParams(window.location.hash.replace(/^#/, ''))
    if (params.get('error') || params.get('error_code')) {
      return (
        params.get('error_description') ||
        params.get('error_code') ||
        params.get('error') ||
        'Something went wrong with your sign-in link.'
      )
    }
  } catch {
    // ignore malformed hash
  }
  return ''
}

export default function AuthCallback() {
  const { user, loading } = useAuth()
  const navigate = useNavigate()
  const [hashError] = useState(readHashError)

  useEffect(() => {
    if (hashError || loading) return

    if (user) {
      // Email confirmed / Google sign-in succeeded → dashboard.
      navigate('/dashboard', { replace: true })
    } else {
      // No usable session in the link.
      navigate('/login', {
        replace: true,
        state: {
          notice:
            "We couldn't confirm your account with that link. It may have expired or already been used — try logging in or signing up again.",
        },
      })
    }
  }, [user, loading, hashError, navigate])

  if (hashError) {
    return (
      <div className="auth-callback">
        <div className="auth-callback-card">
          <h1 className="auth-title">That link didn&apos;t work</h1>
          <div className="auth-error" role="alert">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v4M12 16h.01" />
            </svg>
            {hashError}
          </div>
          <p className="auth-sub">
            Confirmation links expire after a short time and can only be used
            once. Try logging in or request a fresh confirmation email.
          </p>
          <Link to="/login" className="btn btn-primary auth-submit">
            Back to Log In
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="auth-callback">
      <div className="route-loading-dot" aria-hidden="true" />
      <p className="auth-sub" style={{ marginTop: 18 }}>
        Confirming your account…
      </p>
    </div>
  )
}
