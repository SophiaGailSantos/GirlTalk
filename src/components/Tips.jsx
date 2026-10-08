import { IconArrow } from './icons.jsx'
import './Tips.css'

const TIPS = [
  { tag: 'General Health', text: 'Stay hydrated throughout the day — keep a water bottle within reach.' },
  { tag: 'Menstrual Health', text: 'Understanding your cycle can help you notice changes in your body.' },
  { tag: 'Self-Care', text: 'Keep track of important health appointments in one reminder list.' },
  { tag: 'Mental Wellness', text: 'A consistent bedtime can support your mood and energy.' },
  { tag: 'Nutrition', text: 'Build simple meals around vegetables, protein and whole grains.' },
  { tag: 'Fitness', text: 'Movement counts — a short daily walk is a great place to start.' },
]

export default function Tips() {
  return (
    <section id="tips" className="section tips-section">
      <div className="tips-glow" aria-hidden="true" />

      <div className="container">
        <div className="tips-head reveal">
          <div>
            <span className="section-eyebrow">Tips &amp; tricks</span>
            <h2 className="section-title">
              Small tips,
              <br />
              <em>real difference.</em>
            </h2>
            <p className="section-sub">
              Short, practical wellness habits you can actually keep — no
              overwhelm, no fads.
            </p>
          </div>

          <a href="#topics" className="tips-more">
            Browse more topics
            <IconArrow size={15} />
          </a>
        </div>

        <div className="tips-grid">
          {TIPS.map((t, i) => (
            <article key={t.text} className="tip-card reveal">
              <span className="tip-num" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <p>{t.text}</p>
              <span className="tip-tag">{t.tag}</span>
            </article>
          ))}
        </div>

        <p className="tips-note reveal">
          Tips are educational and general — not a substitute for professional
          medical advice.
        </p>
      </div>
    </section>
  )
}
