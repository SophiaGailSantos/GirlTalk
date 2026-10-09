import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ARTICLES } from '../data/articles.js'
import './ArticlesPage.css'


export default function Articles() {
  const [params, setParams] = useSearchParams()
  const slug = params.get('article')
  const selected = ARTICLES.find((a) => a.slug === slug) || null
  const featured = ARTICLES.find((a) => a.featured)
  const rest = ARTICLES.filter((a) => !a.featured)

  const open = (a) => setParams({ article: a.slug }, { replace: false })
  const close = () => setParams({}, { replace: true })

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [slug])

  if (selected) {
    return (
      <div className="page articles-page">
        <div className="container">
          <button type="button" className="ap-back" onClick={close}>
            &larr; Back to articles
          </button>
          <article className="ap-article">
            <div className="ap-article-hero">
              <img src={selected.image} alt="" loading="lazy" />
              <span className="ap-cat">{selected.cat}</span>
            </div>
            <h1>{selected.title}</h1>
            <p className="ap-article-meta">{selected.read}</p>
            {selected.body.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
            <a className="ap-credit" href={selected.photoCredit} target="_blank" rel="noreferrer">
              Photo via Pexels
            </a>
          </article>
        </div>
      </div>
    )
  }

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
          <div className="ap-cover">
            <img src={featured.image} alt="" />
            <span className="ap-cat">{featured.cat}</span>
          </div>
          <div className="ap-featured-body">
            <h3>{featured.title}</h3>
            <p>{featured.desc}</p>
            <div className="ap-foot">
              <span>{featured.read}</span>
              <button type="button" className="ap-link" onClick={() => open(featured)}>
                Read More
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </article>

        {/* Grid */}
        <div className="ap-grid">
          {rest.map((a) => (
            <article key={a.title} className="ap-card reveal">
              <div className="ap-card-cover">
                <img src={a.image} alt="" loading="lazy" />
                <span className="ap-cat">{a.cat}</span>
              </div>
              <div className="ap-card-body">
                <h3>{a.title}</h3>
                <p>{a.desc}</p>
                <div className="ap-foot">
                  <span>{a.read}</span>
                  <button type="button" className="ap-link" onClick={() => open(a)}>
                    Read More
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
