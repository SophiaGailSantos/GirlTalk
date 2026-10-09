import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import './Auth.css'

export default function Login() {
  const { signInWithGoogle } = useAuth()
  const location = useLocation()
  const [error, setError] = useState('')
  const [notice] = useState(() => location.state?.notice || '')

  const handleGoogle = async () => {
    setError('')
    try {
      await signInWithGoogle()
    } catch (err) {
      setError(err?.message || 'Could not start Google sign-in. Please try again.')
    }
  }

  return (
    <div className="auth-page app-theme-dark">
      {/* Left — branding / visual */}
      <div className="auth-visual">
        <Link to="/" className="auth-visual-brand" aria-label="GirlTalk home">
          <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true">
            <path
              d="M16 27s-9.5-6-11-12C3.6 10.6 6.4 6.5 10.5 6.5c2.2 0 3.9 1.2 5.5 3.4 1.6-2.2 3.3-3.4 5.5-3.4 4.1 0 6.9 4.1 5.5 8.5C25.5 21 16 27 16 27z"
              fill="currentColor"
            />
            <circle cx="16" cy="16" r="3.2" fill="#faf5ef" />
          </svg>
          <span className="logo-word">Girl<em>Talk</em></span>
        </Link>

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
          <Link to="/" className="auth-brand" aria-label="GirlTalk home">
            <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true">
              <path
                d="M16 27s-9.5-6-11-12C3.6 10.6 6.4 6.5 10.5 6.5c2.2 0 3.9 1.2 5.5 3.4 1.6-2.2 3.3-3.4 5.5-3.4 4.1 0 6.9 4.1 5.5 8.5C25.5 21 16 27 16 27z"
                fill="currentColor"
              />
              <circle cx="16" cy="16" r="3.2" fill="#faf5ef" />
            </svg>
            <span className="logo-word">Girl<em>Talk</em></span>
          </Link>

          <h1 className="auth-title">Welcome back</h1>
          <p className="auth-sub">Your space to track, learn, and connect.</p>

          {notice && (
            <div className="auth-notice" role="status">
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

          <div className="auth-form">
            <button type="button" className="auth-google" onClick={handleGoogle}>
              <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47a5.57 5.57 0 0 1-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"/>
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09A11.99 11.99 0 0 0 12 24z"/>
                <path fill="#FBBC05" d="M5.27 14.29A7.2 7.2 0 0 1 4.89 12c0-.8.14-1.57.38-2.29V6.62H1.29a12.04 12.04 0 0 0 0 10.76l3.98-3.09z"/>
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42A11.98 11.98 0 0 0 12 0 11.99 11.99 0 0 0 1.29 6.62l3.98 3.09C6.22 6.86 8.87 4.75 12 4.75z"/>
              </svg>
              Continue with Google
            </button>

            <p className="auth-switch">
              Don&apos;t have an account?{' '}
              <Link to="/signup" className="auth-link">Sign Up</Link>
            </p>

            <p className="auth-back">
              <Link to="/" className="auth-link">&larr; Back to homepage</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}