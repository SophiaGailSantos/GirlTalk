import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import './Auth.css'

export default function Login() {
  const { signInWithPassword } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [notice, setNotice] = useState(() => location.state?.notice || '')
  const [showPassword, setShowPassword] = useState(false)
  const [busy, setBusy] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setNotice('')

    if (!email.trim() || !password) {
      setError('Please enter your email and password.')
      return
    }

    setBusy(true)
    try {
      await signInWithPassword(email.trim(), password)
      navigate('/dashboard')
    } catch (err) {
      // Surface the Supabase error message (e.g. invalid credentials).
      setError(err?.message || 'Unable to log in. Please try again.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="auth-page">
      {/* Left — branding / visual */}
      <div className="auth-visual">
        <div className="auth-visual-brand">
          <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true">
            <path
              d="M16 27s-9.5-6-11-12C3.6 10.6 6.4 6.5 10.5 6.5c2.2 0 3.9 1.2 5.5 3.4 1.6-2.2 3.3-3.4 5.5-3.4 4.1 0 6.9 4.1 5.5 8.5C25.5 21 16 27 16 27z"
              fill="currentColor"
            />
            <circle cx="16" cy="16" r="3.2" fill="#faf5ef" />
          </svg>
          <span className="logo-word">Girl<em>Talk</em></span>
        </div>

        <div className="auth-visual-content">
          <h2>
            Your health.<br />
            Your cycle.<br />
            <em>Your space.</em>
          </h2>
          <p>
            Track your cycle, discover helpful content, and connect with a
            community that understands.
          </p>

          <div className="auth-visual-app">
            <div className="auth-visual-app-ring">
              <svg viewBox="0 0 200 200">
                <circle className="ring-track" cx="100" cy="100" r="84" />
                <circle className="ring-fill" cx="100" cy="100" r="84" strokeDasharray="430" strokeDashoffset="210" />
              </svg>
              <div className="auth-visual-app-ring-text">
                <strong>Day 12</strong>
                <span>of 28</span>
              </div>
            </div>
            <div className="auth-visual-app-info">
              <span>Next period</span>
              <strong>16 days</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Right — form */}
      <div className="auth-panel">
        <div className="auth-card">
          <div className="auth-brand">
            <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true">
              <path
                d="M16 27s-9.5-6-11-12C3.6 10.6 6.4 6.5 10.5 6.5c2.2 0 3.9 1.2 5.5 3.4 1.6-2.2 3.3-3.4 5.5-3.4 4.1 0 6.9 4.1 5.5 8.5C25.5 21 16 27 16 27z"
                fill="currentColor"
              />
              <circle cx="16" cy="16" r="3.2" fill="#faf5ef" />
            </svg>
            <span className="logo-word">Girl<em>Talk</em></span>
          </div>

          <h1 className="auth-title">Welcome back</h1>
          <p className="auth-sub">Your space to track, learn, and connect.</p>

          <form onSubmit={handleSubmit} className="auth-form" noValidate>
            {notice && (
              <div className="auth-notice" role="status">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4M12 8h.01" />
                </svg>
                {notice}
              </div>
            )}

            {error && (
              <div className="auth-error" role="alert">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4M12 16h.01" />
                </svg>
                {error}
              </div>
            )}

            <div className="auth-field">
              <label htmlFor="login-email">Email</label>
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
            </div>

            <div className="auth-field">
              <label htmlFor="login-password">Password</label>
              <div className="auth-password-wrap">
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  className="auth-toggle"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <path d="M1 1l22 22" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="auth-row">
              <Link to="/signup" className="auth-link">Don&apos;t have an account? Sign Up</Link>
              <span className="auth-link auth-link--muted" title="Coming soon">Forgot password?</span>
            </div>

            <button
              type="submit"
              className="btn btn-primary auth-submit"
              disabled={busy}
            >
              {busy ? 'Logging in…' : 'Log In'}
            </button>
          </form>

          <p className="auth-back">
            <Link to="/" className="auth-link">&larr; Back to homepage</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
