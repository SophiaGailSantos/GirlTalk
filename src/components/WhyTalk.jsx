import './WhyTalk.css'

export default function WhyTalk() {
  return (
    <section id="why" className="section why">
      <div className="why-glow" aria-hidden="true" />
      <div className="container">
        <div className="why-content reveal">
          <span className="section-eyebrow">Welcome to GirlTalk</span>
          <h2 className="why-title">
            A space made
            <br />
            <em>for women.</em>
          </h2>
          <p className="why-sub">
            GirlTalk brings the things women care about into one space — from
            understanding your cycle and discovering helpful health content to
            sharing experiences with a community that understands.
          </p>
        </div>

        <div className="why-stats reveal">
          <div className="why-stat">
            <strong>Track</strong>
            <span>Your cycle, your way</span>
          </div>
          <div className="why-stat">
            <strong>Learn</strong>
            <span>Content that actually helps</span>
          </div>
          <div className="why-stat">
            <strong>Connect</strong>
            <span>You&apos;re not alone in this</span>
          </div>
        </div>
      </div>
    </section>
  )
}
