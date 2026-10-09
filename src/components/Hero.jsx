import { Link } from 'react-router-dom'
import {
  IconSearch,
  IconCheck,
  IconPill,
  IconBook,
  IconArrow,
} from './icons.jsx'
import './Hero.css'

const RING_R = 66
const CIRCUMFERENCE = 2 * Math.PI * RING_R
const CYCLE_DAYS = 28
const DAY = 12

function CycleMock() {
  const progress = DAY / CYCLE_DAYS
  return (
    <div className="hp-card hp-card--main">
      <div className="hp-card-head">
        <div>
          <span className="hp-eyebrow">Today</span>
          <strong className="hp-day">Day {DAY}</strong>
        </div>
        <span className="hp-chip">Follicular phase</span>
      </div>

      <div className="hp-ring-row">
        <svg className="hp-ring" viewBox="0 0 160 160" aria-hidden="true">
          <defs>
            <linearGradient id="heroGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ff8fb8" />
              <stop offset="100%" stopColor="#ff2d78" />
            </linearGradient>
          </defs>
          <circle className="hp-ring-track" cx="80" cy="80" r={RING_R} />
          <circle
            className="hp-ring-fill"
            cx="80"
            cy="80"
            r={RING_R}
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={CIRCUMFERENCE * (1 - progress)}
            transform="rotate(-90 80 80)"
          />
        </svg>

        <div className="hp-stats">
          <div className="hp-stat">
            <span>Next period</span>
            <strong>in 17 days</strong>
          </div>
          <div className="hp-stat">
            <span>Cycle length</span>
            <strong>{CYCLE_DAYS} days</strong>
          </div>
          <div className="hp-stat">
            <span>Health check-ins</span>
            <strong>Private by you</strong>
          </div>
        </div>
      </div>

      <div className="hp-row">
        <span className="hp-icon" aria-hidden="true">
          <IconPill size={16} />
        </span>
        <div className="hp-row-copy">
          <strong>Birth control pill</strong>
          <span>Reminder · Today · 9:00 PM</span>
        </div>
      </div>

      <div className="hp-row">
        <span className="hp-icon" aria-hidden="true">
          <IconBook size={16} />
        </span>
        <div className="hp-row-copy">
          <strong>Understanding Your Menstrual Cycle</strong>
          <span>New this week · 6 min read</span>
        </div>
      </div>
    </div>
  )
}

export default function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero-glow" aria-hidden="true" />

      <div className="container hero-grid">
        <div className="hero-copy">
          <span className="section-eyebrow reveal">
            Women&apos;s health, in one place
          </span>

          <h1 className="hero-title reveal">
            Your health.
            <br />
            Your body.
            <br />
            <em>Your GirlTalk.</em>
          </h1>

          <p className="hero-sub reveal">
            GirlTalk brings women&apos;s health information, cycle tracking,
            birth control and health reminders, and weekly wellness reads
            together — one welcoming, accessible platform built around your
            everyday wellness.
          </p>

          <div className="hero-actions reveal">
            <Link to="/login" className="btn btn-primary">
              Get Started
              <IconArrow size={16} />
            </Link>
            <a href="#topics" className="btn btn-ghost">
              Explore Health Topics
            </a>
          </div>

          <ul className="hero-trust reveal">
            <li>
              <span className="trust-check" aria-hidden="true">
                <IconCheck size={12} />
              </span>
              Free to join
            </li>
            <li>
              <span className="trust-check" aria-hidden="true">
                <IconCheck size={12} />
              </span>
              Private by design
            </li>
            <li>
              <span className="trust-check" aria-hidden="true">
                <IconCheck size={12} />
              </span>
              New articles weekly
            </li>
          </ul>

          <a href="#topics" className="hero-search reveal" aria-label="Search women's health topics">
            <IconSearch size={17} />
            <span>Search women&apos;s health topics&hellip;</span>
          </a>
        </div>

        <div className="hero-visual reveal">
          <div className="hero-blob" aria-hidden="true" />
          <CycleMock />
        </div>
      </div>
    </section>
  )
}
