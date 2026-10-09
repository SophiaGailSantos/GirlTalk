import { Link } from 'react-router-dom'
import { IconArrow } from './icons.jsx'
import './CtaBanner.css'

export default function CtaBanner() {
  return (
    <section id="cta" className="cta-section">
      <div className="cta-glow" aria-hidden="true" />
      <div className="cta-rings" aria-hidden="true">
        <span />
        <span />
      </div>

      <div className="container cta-inner reveal">
        <span className="section-eyebrow">Start today</span>
        <h2 className="cta-title">
          Your health deserves
          <br />
          <em>a space of its own.</em>
        </h2>
        <p className="cta-sub">
          Learn, track, and take control of your everyday health and wellness
          with GirlTalk.
        </p>
        <div className="cta-actions">
          <Link to="/login" className="btn btn-primary btn-lg">
            Join GirlTalk
            <IconArrow size={17} />
          </Link>
        </div>
      </div>
    </section>
  )
}
