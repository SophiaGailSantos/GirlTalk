import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import Logo from './Logo.jsx'
import './Navbar.css'

const LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Health Topics', to: '/#topics' },
  { label: 'Blogs', to: '/#blogs' },
  { label: 'Period Tracker', to: '/#tracker' },
  { label: 'Reminders', to: '/#reminders' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname, hash } = useLocation()
  const { user } = useAuth()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isActive = (to) =>
    to === '/' ? pathname === '/' && !hash : hash === to.slice(1)

  const close = () => setOpen(false)

  return (
    <header
      className={`nav ${scrolled ? 'nav--scrolled' : ''} ${
        open ? 'nav--menu-open' : ''
      }`}
    >
      <div className="container nav-inner">
        <Logo />

        <nav className={`nav-links ${open ? 'is-open' : ''}`} aria-label="Primary">
          {LINKS.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              end={l.to === '/'}
              className={isActive(l.to) ? 'is-active' : ''}
              onClick={close}
            >
              {l.label}
            </Link>
          ))}

          <div className="nav-mobile-cta">
            {user ? (
              <Link to="/dashboard" className="btn btn-primary btn-sm" onClick={close}>
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link to="/login" className="btn btn-ghost btn-sm" onClick={close}>
                  Log In
                </Link>
                <Link to="/signup" className="btn btn-primary btn-sm" onClick={close}>
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </nav>

        <div className="nav-cta">
          {user ? (
            <Link to="/dashboard" className="btn btn-primary btn-sm">
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link to="/login" className="nav-login">
                Log In
              </Link>
              <Link to="/signup" className="btn btn-primary btn-sm">
                Sign Up
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          className="nav-burger"
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
