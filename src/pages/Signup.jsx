import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import supabase from '../supabaseClient.js'
import { SITE_URL } from '../siteUrl.js'
import './Auth.css'

export default function Signup() {
  const { signUp } = useAuth()
  const navigate = useNavigate()

  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [agree, setAgree] = useState(false)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [busy, setBusy] = useState(false)
  const [resendBusy, setResendBusy] = useState(false)
  const [resendNote, setResendNote] = useState(null)

  const handleResend = async () => {
    setResendNote(null)
    setResendBusy(true)
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email.trim(),
        options: { emailRedirectTo: `${SITE_URL}/auth/callback` },
      })
      setResendNote(error ? { kind: 'error', text: error.message } : { kind: 'ok', text: 'A fresh confirmation email has been sent.' })
    } catch (err) {
      setResendNote({ kind: 'error', text: err?.message || 'Could not resend the email.' })
    } finally {
      setResendBusy(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setNotice('')

    if (!firstName.trim()) {
      setError('Please enter your first name.')
      return
    }
    if (!email.trim()) {
      setError('Please enter your email.')
      return
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }
    if (password !== confirm) {
      setError('Passwords do not match.')
      return
    }
    if (!agree) {
      setError('Please agree to the Terms & Privacy Policy.')
      return
    }

    setBusy(true)
    try {
      const data = await signUp(firstName.trim(), email.trim(), password)

      if (data?.session) {
        // Account created and signed in → continue to onboarding.
        navigate('/welcome')
      } else {
        // Email confirmation is enabled on this project.
        setNotice(
          'Your account was created! Check your email and click the confirmation link to continue to GirlTalk.'
        )
      }
    } catch (err) {
      // Surface the Supabase error message (e.g. email already registered).
      setError(err?.message || 'Unable to create your account. Please try again.')
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
            Start your<br />
            <em>wellness</em> journey
          </h2>
          <p>
            Track your cycle, learn about your body, and connect with women
            who get it — all in one private space.
          </p>

          <div className="auth-visual-app">
            <div className="auth-visual-app-ring">
              <svg viewBox="0 0 200 200">
                <circle className="ring-track" cx="100" cy="100" r="84" />
                <circle className="ring-fill" cx="100" cy="100" r="84" strokeDasharray="430" strokeDashoffset="210" />
              </svg>
              <div className="auth-visual-app-ring-text">
                <strong>Day 1</strong>
                <span>getting started</span>
              </div>
            </div>
            <div className="auth-visual-app-info">
              <span>Join today</span>
              <strong>Free forever</strong>
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

          <h1 className="auth-title">Create your account</h1>
          <p className="auth-sub">Join GirlTalk — your space to track, learn, and connect.</p>

          <form onSubmit={handleSubmit} className="auth-form" noValidate>
            {error && (
              <div className="auth-error" role="alert">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4M12 16h.01" />
                </svg>
                {error}
              </div>
            )}

            {notice && (
              <div className="auth-notice" role="status">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M8 12.5l2.5 2.5L16 9.5" />
                </svg>
                {notice}
              </div>
            )}

            {notice && (
              <>
                <button
                  type="button"
                  className="auth-resend"
                  onClick={handleResend}
                  disabled={resendBusy}
                >
                  {resendBusy ? 'Resending…' : 'Resend confirmation email'}
                </button>
                {resendNote && (
                  <p className={resendNote.kind === 'error' ? 'auth-resend-note auth-resend-note--error' : 'auth-resend-note'}>
                    {resendNote.text}
                  </p>
                )}
              </>
            )}

            <div className="auth-field">
              <label htmlFor="signup-name">First Name</label>
              <input
                id="signup-name"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Your first name"
                autoComplete="given-name"
                required
              />
            </div>

            <div className="auth-field">
              <label htmlFor="signup-email">Email</label>
              <input
                id="signup-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
            </div>

            <div className="auth-field">
              <label htmlFor="signup-password">Password</label>
              <div className="auth-password-wrap">
                <input
                  id="signup-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  autoComplete="new-password"
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

            <div className="auth-field">
              <label htmlFor="signup-confirm">Confirm Password</label>
              <input
                id="signup-confirm"
                type={showPassword ? 'text' : 'password'}
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="Re-enter your password"
                autoComplete="new-password"
                required
              />
            </div>

            <label className="auth-check">
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
              />
              <span>
                I agree to the <span className="auth-link">Terms of Service</span> and{' '}
                <span className="auth-link">Privacy Policy</span>
              </span>
            </label>

            <button
              type="submit"
              className="btn btn-primary auth-submit"
              disabled={busy}
            >
              {busy ? 'Creating Account…' : 'Create Account'}
            </button>
          </form>

          <p className="auth-switch">
            Already have an account?{' '}
            <Link to="/login" className="auth-link">Log In</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
