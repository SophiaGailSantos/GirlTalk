import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import './Profile.css'

export default function Profile() {
  const { user, signOut, updateProfile } = useAuth()
  const navigate = useNavigate()

  const [firstName, setFirstName] = useState(user?.firstName || '')
  const [email, setEmail] = useState(user?.email || '')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleSave = async (e) => {
    e.preventDefault()
    setMessage('')
    setError('')

    if (!firstName.trim()) {
      setError('First name cannot be empty.')
      return
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address.')
      return
    }

    try {
      await updateProfile({ firstName: firstName.trim(), email: email.trim() })
      setMessage('Profile updated successfully.')
    } catch (err) {
      setError(err?.message || 'Could not update profile. Please try again.')
    }
  }

  const handleLogout = async () => {
    try {
      await signOut()
    } finally {
      navigate('/')
    }
  }

  return (
    <div className="page profile-page">
      <div className="container">
        <header className="page-header reveal">
          <span className="section-eyebrow">Profile</span>
          <h1 className="section-title">Your account</h1>
          <p className="section-sub">Manage your basic profile information.</p>
        </header>

        <div className="profile-grid">
          <form className="profile-card reveal" onSubmit={handleSave} noValidate>
            <h2>Profile details</h2>

            {message && (
              <div className="profile-success" role="status">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M8 12.5l2.5 2.5L16 9.5" />
                </svg>
                {message}
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
              <label htmlFor="profile-name">First Name</label>
              <input
                id="profile-name"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                autoComplete="given-name"
              />
            </div>

            <div className="auth-field">
              <label htmlFor="profile-email">Email</label>
              <input
                id="profile-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>

            <div className="profile-actions">
              <button type="submit" className="btn btn-primary profile-save">
                Save Changes
              </button>
              <button type="button" className="btn btn-ghost profile-logout" onClick={handleLogout}>
                Log Out
              </button>
            </div>
          </form>

          <aside className="profile-side reveal">
            <div className="profile-avatar-large">
              {user?.firstName?.charAt(0)?.toUpperCase() || 'G'}
            </div>
            <h3>{user?.firstName}</h3>
            <p>{user?.email}</p>
            <div className="profile-info">
              <div className="profile-info-row">
                <span>Member since</span>
                <strong>{new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</strong>
              </div>
              <div className="profile-info-row">
                <span>Account type</span>
                <strong>Demo account</strong>
              </div>
            </div>
            <p className="profile-note">
              This is a front-end demo account. No real medical data is stored
              and no personal health information is collected here.
            </p>
          </aside>
        </div>
      </div>
    </div>
  )
}
