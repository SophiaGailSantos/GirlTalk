import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import './AppNavbar.css'

export default function AppNavbar() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const handleLogout = async () => {
    try {
      await signOut()
    } finally {
      navigate('/')
    }
  }

  const close = () => setOpen(false)

  return (
    <header className="appnav">
      <div className="container appnav-inner">
        <Link to="/dashboard" className="appnav-logo" onClick={close}>
          <svg viewBox="0 0 32 32" width="26" height="26" aria-hidden="true">
            <path
              d="M16 27s-9.5-6-11-12C3.6 10.6 6.4 6.5 10.5 6.5c2.2 0 3.9 1.2 5.5 3.4 1.6-2.2 3.3-3.4 5.5-3.4 4.1 0 6.9 4.1 5.5 8.5C25.5 21 16 27 16 27z"
              fill="currentColor"
            />
            <circle cx="16" cy="16" r="3.1" fill="#faf5ef" />
          </svg>
          <span className="appnav-word">Girl<em>Talk</em></span>
        </Link>

        <nav className={`appnav-links ${open ? 'is-open' : ''}`} aria-label="App">
          <NavLink to="/dashboard" end onClick={close} className={({ isActive }) => (isActive ? 'is-active' : '')}>
            Dashboard
          </NavLink>
          <NavLink to="/tracker" onClick={close} className={({ isActive }) => (isActive ? 'is-active' : '')}>
            Cycle &amp; Reminders
          </NavLink>
          <NavLink to="/articles" onClick={close} className={({ isActive }) => (isActive ? 'is-active' : '')}>
            Articles
          </NavLink>
          <NavLink to="/community" onClick={close} className={({ isActive }) => (isActive ? 'is-active' : '')}>
            Community
          </NavLink>
          <NavLink to="/profile" onClick={close} className={({ isActive }) => (isActive ? 'is-active' : '')}>
            Profile
          </NavLink>

          <div className="appnav-user">
            <span className="appnav-avatar" aria-hidden="true">
              {user?.firstName?.charAt(0)?.toUpperCase() || 'G'}
            </span>
            <span className="appnav-hi">Hi, {user?.firstName || 'there'}</span>
            <button type="button" className="appnav-logout" onClick={handleLogout}>
              Log Out
            </button>
          </div>
        </nav>

        <button
          className="appnav-burger"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  )
}
