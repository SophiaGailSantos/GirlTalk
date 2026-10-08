import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import './Welcome.css'

const PILLARS = [
  {
    num: '01',
    title: 'Track',
    desc: 'Keep track of your menstrual cycle and personal health information.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="5" width="18" height="16" rx="3" />
        <path d="M8 3v4M16 3v4M3 10h18" />
        <circle cx="12" cy="15.5" r="2.2" />
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Learn',
    desc: 'Read articles and discover helpful women\'s health content.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V4H6.5A2.5 2.5 0 0 0 4 6.5v13z" />
        <path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5" />
        <path d="M9 8h7M9 12h5" />
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Connect',
    desc: 'Join conversations and share experiences with the community.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
        <circle cx="11" cy="11" r="4" />
        <circle cx="22" cy="12" r="3.4" />
        <path d="M3.5 26c.6-4 3.8-6.5 7.5-6.5s6.9 2.5 7.5 6.5" />
        <path d="M19 26.5c.5-2.8 2.3-4.8 4.6-4.8 1.6 0 3 .9 3.8 2.4" />
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Care',
    desc: 'Discover simple self-care and wellness tips for everyday life.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 21s-7.5-4.7-10-9.3C.4 8.6 2.4 5 5.7 5c1.9 0 3.3 1 4.3 2.6h4c1-1.6 2.4-2.6 4.3-2.6 3.3 0 5.3 3.6 3.7 6.7C19.5 16.3 12 21 12 21z" />
      </svg>
    ),
  },
]

export default function Welcome() {
  const { user } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="welcome-page">
      <div className="welcome-shape welcome-shape--1" aria-hidden="true" />
      <div className="welcome-shape welcome-shape--2" aria-hidden="true" />

      <div className="welcome-inner">
        <div className="welcome-hero reveal">
          <span className="welcome-badge">You&apos;re in</span>
          <h1 className="welcome-title">
            Welcome to GirlTalk, <em>{user?.firstName || 'friend'}</em>!
          </h1>
          <p className="welcome-sub">
            Your space to track, learn, and connect.
          </p>
        </div>

        <div className="welcome-grid">
          {PILLARS.map((p) => (
            <article key={p.title} className="welcome-card reveal">
              <div className="welcome-card-top">
                <span className="welcome-icon" aria-hidden="true">{p.icon}</span>
                <span className="welcome-num">{p.num}</span>
              </div>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
            </article>
          ))}
        </div>

        <div className="welcome-cta reveal">
          <button
            type="button"
            className="btn btn-primary welcome-btn"
            onClick={() => navigate('/dashboard')}
          >
            Explore GirlTalk
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
