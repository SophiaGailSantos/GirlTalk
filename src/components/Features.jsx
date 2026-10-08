import {
  IconDrop,
  IconPill,
  IconBell,
  IconBook,
  IconBulb,
  IconCompass,
  IconArrow,
} from './icons.jsx'
import './Features.css'

const CARDS = [
  {
    icon: IconPill,
    title: 'Birth Control Reminders',
    desc: 'Personal reminders for pills and routines — private, personal, and on your schedule.',
    to: '/#reminders',
    cta: 'See reminders',
  },
  {
    icon: IconBell,
    title: 'Health Reminders',
    desc: 'Medication, hydration, vitamins, and appointments — everyday nudges that keep you on track.',
    to: '/#reminders',
    cta: 'Stay on track',
  },
  {
    icon: IconBook,
    title: "Women's Health Blogs",
    desc: 'New educational articles every week on women\u2019s health, wellness, lifestyle, and self-care.',
    to: '/#blogs',
    cta: 'Read the blogs',
  },
  {
    icon: IconBulb,
    title: 'Health Tips & Tricks',
    desc: 'Short, useful, and easy-to-understand tips for menstrual health, hygiene, nutrition, and mental wellness.',
    to: '/#tips',
    cta: 'Get the tips',
  },
  {
    icon: IconCompass,
    title: 'Health Topics',
    desc: 'Search quickly and browse ten clear categories, from menstrual health to self-care.',
    to: '/#topics',
    cta: 'Browse topics',
  },
]

export default function Features() {
  return (
    <section id="features" className="section section-light features">
      <div className="container">
        <div className="features-head reveal">
          <span className="section-eyebrow">Everything you need</span>
          <h2 className="section-title">
            Everything you need,
            <br />
            <em>in one place.</em>
          </h2>
          <p className="section-sub">
            Track, learn, get reminded, and discover — GirlTalk keeps every
            part of your health routine together in one welcoming space.
          </p>
        </div>

        <div className="features-grid">
          {/* Featured: Period Tracker */}
          <a href="#tracker" className="feat feat--featured reveal">
            <div className="feat-featured-copy">
              <div className="feat-top">
                <span className="feat-icon feat-icon--pink">
                  <IconDrop size={21} />
                </span>
                <span className="feat-flag">Core feature</span>
              </div>
              <h3>Period Tracker</h3>
              <p>
                Log your period, follow your cycle day by day, and see
                predictions for what&apos;s coming next — in a private space
                that&apos;s only yours.
              </p>
              <span className="feat-link">
                See the tracker
                <IconArrow size={15} />
              </span>
            </div>

            <div className="feat-featured-tip" aria-hidden="true">
              <strong>Day 12</strong>
              <span>of a 28-day cycle</span>
              <em>Next period · Oct 29</em>
            </div>
          </a>

          {CARDS.map((c) => {
            const Icon = c.icon
            return (
              <a key={c.title} href={c.to} className="feat reveal">
                <div className="feat-top">
                  <span className="feat-icon">
                    <Icon size={20} />
                  </span>
                  <span className="feat-arrow" aria-hidden="true">
                    <IconArrow size={16} />
                  </span>
                </div>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
                <span className="feat-link">{c.cta}</span>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
