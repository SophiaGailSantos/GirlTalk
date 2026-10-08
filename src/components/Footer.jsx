import { Link } from 'react-router-dom'
import Logo from './Logo.jsx'
import './Footer.css'

const EXPLORE_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Health Topics', to: '/#topics' },
  { label: 'Blogs', to: '/#blogs' },
  { label: 'Period Tracker', to: '/#tracker' },
  { label: 'Reminders', to: '/#reminders' },
]

const COMPANY_LINKS = [
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
  { label: 'Privacy Policy', to: '/privacy' },
  { label: 'Terms of Service', to: '/terms' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Logo />
            <p className="footer-desc">
              An accessible women&apos;s health and wellness platform designed
              to help women learn, track, and manage their everyday health.
            </p>
            <p className="footer-tagline">Track. Learn. Remind. Discover.</p>
          </div>

          <nav className="footer-col" aria-label="Explore">
            <h4>Explore</h4>
            <ul>
              {EXPLORE_LINKS.map((l) => (
                <li key={l.label}>
                  <Link to={l.to}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="footer-col" aria-label="Company">
            <h4>Company</h4>
            <ul>
              {COMPANY_LINKS.map((l) => (
                <li key={l.label}>
                  <Link to={l.to}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="footer-bottom">
          <p>&copy; {year} GirlTalk. Made with care, for every woman.</p>
          <p className="footer-note">
            GirlTalk is not a substitute for professional medical advice.
          </p>
        </div>
      </div>
    </footer>
  )
}
