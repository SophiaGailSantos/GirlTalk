import './Community.css'

const TOPICS = [
  'Period experiences',
  'Self-care routines',
  'Wellness discussions',
  'Questions & advice',
]

const THREADS = [
  {
    cat: 'Period experiences',
    title: 'How do you usually prepare for your period?',
    replies: 34,
    meta: 'Active 2h ago',
  },
  {
    cat: 'Self-care routines',
    title: 'What helps you feel better during your cycle?',
    replies: 21,
    meta: 'Active 5h ago',
  },
  {
    cat: 'Wellness discussions',
    title: "What's one self-care habit you actually enjoy?",
    replies: 18,
    meta: 'Active yesterday',
  },
]

export default function Community() {
  return (
    <section id="community" className="section community">
      <div className="community-glow" aria-hidden="true" />
      <div className="container">
        <div className="community-head reveal">
          <span className="section-eyebrow">Community</span>
          <h2 className="section-title">
            A community that
            <br />
            <em>gets it.</em>
          </h2>
          <p className="section-sub">
            Share experiences, start conversations, and connect with women who
            understand.
          </p>
        </div>

        <div className="community-grid">
          <div className="community-copy reveal">
            <div className="topic-chips">
              {TOPICS.map((t) => (
                <span key={t} className="topic-chip">{t}</span>
              ))}
            </div>

            <div className="community-note">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="note-icon" aria-hidden="true">
                <circle cx="12" cy="12" r="9.5" />
                <path d="M12 11v5.5" />
                <circle cx="12" cy="7.6" r="1.1" fill="currentColor" stroke="none" />
              </svg>
              <p>
                Community members are fellow users sharing their own experiences —
                not medical professionals. For medical concerns, always consult a
                healthcare provider.
              </p>
            </div>
          </div>

          <div className="threads reveal">
            <div className="threads-head">
              <h3>Happening now</h3>
              <span className="threads-badge">
                <span className="live-dot" aria-hidden="true" />
                2.4k online
              </span>
            </div>
            {THREADS.map((t) => (
              <article key={t.title} className="thread">
                <span className="thread-cat">{t.cat}</span>
                <h4>{t.title}</h4>
                <p>{t.replies} replies · {t.meta}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
