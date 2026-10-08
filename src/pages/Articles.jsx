import './ArticlesPage.css'

const ARTICLES = [
  {
    cat: 'Period Health',
    title: 'Understanding Your Menstrual Cycle',
    desc: 'What actually happens during each phase of your cycle — and why it matters for your energy, mood, and body.',
    read: '7 min read',
    accent: 'rose',
    featured: true,
  },
  {
    cat: 'Self-Care',
    title: 'Simple Ways to Practice Self-Care During Your Period',
    desc: 'Small, realistic habits that can help you feel more comfortable and rested on your period days.',
    read: '5 min read',
    accent: 'beige',
  },
  {
    cat: 'Cycle Health',
    title: 'When Should You Pay Attention to Changes in Your Cycle?',
    desc: 'Occasional variation is normal — but some changes are worth noting and discussing with a healthcare professional.',
    read: '6 min read',
    accent: 'blush',
  },
  {
    cat: 'Wellness',
    title: 'Sleep, Energy, and Your Cycle: What to Expect',
    desc: 'Why your energy levels shift throughout the month, and how to work with your body instead of against it.',
    read: '5 min read',
    accent: 'beige',
  },
  {
    cat: 'Nutrition',
    title: 'Gentle Nutrition Tips for Every Phase of Your Cycle',
    desc: 'No strict diets — just simple, supportive food ideas that can help you feel your best all month long.',
    read: '4 min read',
    accent: 'blush',
  },
  {
    cat: 'Mind',
    title: 'Cycle-Synced Journaling: A Beginner-Friendly Practice',
    desc: 'How a few minutes of journaling each day can help you notice patterns in your mood, energy, and cycle.',
    read: '6 min read',
    accent: 'rose',
  },
]

export default function Articles() {
  const featured = ARTICLES.find((a) => a.featured)
  const rest = ARTICLES.filter((a) => !a.featured)

  return (
    <div className="page articles-page">
      <div className="container">
        <header className="page-header reveal">
          <span className="section-eyebrow">Articles</span>
          <h1 className="section-title">Something new to read</h1>
          <p className="section-sub">
            Educational articles and practical guides on women&apos;s health,
            wellness, and everyday self-care.
          </p>
        </header>

        {/* Featured */}
        <article className="ap-featured reveal">
          <div className={`ap-cover ap-cover--${featured.accent}`}>
            <span className="ap-cat">{featured.cat}</span>
          </div>
          <div className="ap-featured-body">
            <h3>{featured.title}</h3>
            <p>{featured.desc}</p>
            <div className="ap-foot">
              <span>{featured.read}</span>
              <span className="ap-link">
                Read More
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
          </div>
        </article>

        {/* Grid */}
        <div className="ap-grid">
          {rest.map((a) => (
            <article key={a.title} className="ap-card reveal">
              <div className={`ap-card-cover ap-cover--${a.accent}`}>
                <span className="ap-cat">{a.cat}</span>
              </div>
              <div className="ap-card-body">
                <h3>{a.title}</h3>
                <p>{a.desc}</p>
                <div className="ap-foot">
                  <span>{a.read}</span>
                  <span className="ap-link">
                    Read More
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
