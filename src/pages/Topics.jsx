import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  IconSearch,
  IconClose,
  IconDrop,
  IconOrbit,
  IconShield,
  IconPill,
  IconCalendar,
  IconLeaf,
  IconMoon,
  IconDumbbell,
  IconSparkle,
  IconPulse,
} from '../components/icons.jsx'
import { ARTICLES } from '../data/articles.js'
import { CATEGORIES, JOURNEYS, SYMPTOMS, SYMPTOM_GUIDE } from '../data/topics.js'
import './TopicsHub.css'

const ICONS = {
  drop: IconDrop,
  orbit: IconOrbit,
  shield: IconShield,
  pill: IconPill,
  calendar: IconCalendar,
  leaf: IconLeaf,
  moon: IconMoon,
  dumbbell: IconDumbbell,
  sparkle: IconSparkle,
  pulse: IconPulse,
}

const articleBySlug = Object.fromEntries(ARTICLES.map((a) => [a.slug, a]))

/*
 * The in-app Health Topics hub: journeys, a symptom check-in, search and the
 * full category library — each one linking back into the rest of GirlTalk
 * (cycle tracking, reminders, articles and the community).
 */
export default function TopicsPage() {
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(null)
  const [symptom, setSymptom] = useState('')

  const normalized = query.trim().toLowerCase()

  const matches = useMemo(() => {
    if (!normalized) return CATEGORIES
    return CATEGORIES.filter(
      (c) =>
        c.name.toLowerCase().includes(normalized) ||
        c.desc.toLowerCase().includes(normalized) ||
        (c.blurb || '').toLowerCase().includes(normalized) ||
        c.topics.some((t) => t.toLowerCase().includes(normalized))
    )
  }, [normalized])

  const symptomCategories = symptom
    ? (SYMPTOM_GUIDE[symptom] || []).map(
        (name) => CATEGORIES.find((c) => c.name === name)
      ).filter(Boolean)
    : []

  const openJourney = (journey) => {
    setActive(journey.categories[0])
    document
      .getElementById('topics-library')
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="hub">
      {/* Hero */}
      <header className="hub-hero">
        <span className="section-eyebrow">Health topics</span>
        <h1 className="hub-title">
          Your whole women&apos;s health
          <br />
          <em>companion.</em>
        </h1>
        <p className="hub-sub">
          Not just a period tracker. GirlTalk brings your cycle, reminders,
          articles and community together — so whatever you are trying to
          understand, there is a place for it here.
        </p>

        <div className="hub-pillars">
          <Link to="/tracker"><span>🌸</span> Cycle &amp; Reminders</Link>
          <Link to="/articles"><span>📚</span> Articles</Link>
          <Link to="/community"><span>💬</span> Community</Link>
          <a href="#topics-checkin"><span>🩺</span> Symptom check-in</a>
        </div>
      </header>

      {/* Journeys */}
      <section className="hub-block">
        <h2 className="hub-block-title">What would you like help with?</h2>
        <div className="hub-journeys">
          {JOURNEYS.map((j) => (
            <button
              key={j.id}
              type="button"
              className="hub-journey"
              onClick={() => openJourney(j)}
            >
              <span className="hub-emoji" aria-hidden="true">{j.emoji}</span>
              <strong>{j.title}</strong>
              <p>{j.text}</p>
              <span className="hub-journey-link">
                Start here <span aria-hidden="true">→</span>
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Symptom check-in */}
      <section className="hub-block" id="topics-checkin">
        <h2 className="hub-block-title">Not sure where to start?</h2>
        <p className="hub-block-sub">
          Pick what you are feeling and we&apos;ll point you to the most useful
          places in GirlTalk.
        </p>
        <div className="hub-symptoms">
          {SYMPTOMS.map((s) => (
            <button
              key={s}
              type="button"
              className={`hub-chip${symptom === s ? ' is-on' : ''}`}
              onClick={() => setSymptom(symptom === s ? '' : s)}
            >
              {s}
            </button>
          ))}
        </div>

        {symptom && (
          <div className="hub-result">
            <span className="hub-result-label">Suggested for “{symptom}”</span>
            <div className="hub-result-grid">
              {symptomCategories.map((c) => (
                <Link key={c.name} to={`#cat-${c.name}`} className="hub-result-card">
                  <strong>{c.name}</strong>
                  <p>{c.desc}</p>
                </Link>
              ))}
              <Link to="/tracker" className="hub-result-card hub-result-card--cta">
                <strong>Track my cycle</strong>
                <p>See where you are today and what comes next.</p>
              </Link>
              <Link to="/community" className="hub-result-card hub-result-card--cta">
                <strong>Ask the community</strong>
                <p>Hear from women who have been there.</p>
              </Link>
            </div>
          </div>
        )}
      </section>

      {/* Search + categories */}
      <section className="hub-block" id="topics-library">
        <h2 className="hub-block-title">Browse every topic</h2>

        <form className="hub-search" role="search" onSubmit={(e) => e.preventDefault()}>
          <span className="hub-search-icon" aria-hidden="true">
            <IconSearch size={19} />
          </span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search anything — PCOS, sleep, birth control..."
            aria-label="Search health topics"
          />
          {query && (
            <button
              type="button"
              className="hub-clear"
              onClick={() => setQuery('')}
              aria-label="Clear search"
            >
              <IconClose size={16} />
            </button>
          )}
        </form>

        <p className="hub-count" aria-live="polite">
          {normalized
            ? `${matches.length} of ${CATEGORIES.length} categories match "${query.trim()}"`
            : `${CATEGORIES.length} categories to explore`}
        </p>

        <div className="hub-grid">
          {matches.map((c) => {
            const Icon = ICONS[c.icon] || IconPulse
            const isActive = active === c.name
            const articles = (c.articles || []).map((s) => articleBySlug[s]).filter(Boolean)
            return (
              <div
                key={c.name}
                id={`cat-${c.name}`}
                className={`hub-card${isActive ? ' is-active' : ''}`}
              >
                <button
                  type="button"
                  className="hub-card-head"
                  onClick={() => setActive(isActive ? null : c.name)}
                  aria-expanded={isActive}
                >
                  <span className="hub-card-icon" aria-hidden="true">
                    <Icon size={19} />
                  </span>
                  <span>
                    <strong>{c.name}</strong>
                    <em>{c.desc}</em>
                  </span>
                </button>

                {isActive && (
                  <div className="hub-card-body">
                    <p className="hub-blurb">{c.blurb}</p>

                    <ul className="hub-topic-list">
                      {c.topics.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>

                    {articles.length > 0 && (
                      <div className="hub-related">
                        <span className="hub-related-label">Read next</span>
                        {articles.map((a) => (
                          <Link key={a.slug} to={`/articles?article=${a.slug}`} className="hub-related-item">
                            <img src={a.image} alt="" loading="lazy" />
                            <span>
                              <strong>{a.title}</strong>
                              <em>{a.read}</em>
                            </span>
                          </Link>
                        ))}
                      </div>
                    )}

                    <div className="hub-actions">
                      <Link to="/tracker" className="hub-action">Track my cycle</Link>
                      <Link to="/tracker" className="hub-action">Add a reminder</Link>
                      <Link to="/community" className="hub-action">Ask the community</Link>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {matches.length === 0 && (
          <div className="hub-none">
            <p>No topics match “{query.trim()}”. Try “cycle”, “sleep” or “birth control”.</p>
            <button type="button" className="btn btn-ghost btn-sm" onClick={() => setQuery('')}>
              Clear search
            </button>
          </div>
        )}

        <p className="hub-disclaimer">
          GirlTalk offers general wellness information, not medical advice. For
          personal concerns, please speak with a qualified healthcare provider.
        </p>
      </section>
    </div>
  )
}