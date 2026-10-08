import { useMemo, useState } from 'react'
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
} from './icons.jsx'
import './Topics.css'

const CATEGORIES = [
  {
    name: 'Menstrual Health',
    icon: IconDrop,
    desc: 'Cycles, periods, symptoms and tracking',
    topics: ['Understanding your cycle', 'PMS and period symptoms', 'Irregular periods', 'When to see a doctor'],
  },
  {
    name: 'Reproductive Health',
    icon: IconOrbit,
    desc: 'Fertility, ovulation and reproductive care',
    topics: ['Fertility basics', 'Signs of ovulation', 'PCOS explained', 'Planning ahead'],
  },
  {
    name: 'Sexual Health',
    icon: IconShield,
    desc: 'Consent, protection and open conversations',
    topics: ['Safe practices', 'Talking with a partner', 'STI basics', 'Changes in libido'],
  },
  {
    name: 'Birth Control',
    icon: IconPill,
    desc: 'Methods, schedules and common questions',
    topics: ['Pill reminders', 'IUDs explained', 'What to do about missed doses', 'Choosing a method'],
  },
  {
    name: 'Pregnancy',
    icon: IconCalendar,
    desc: 'Trimesters, preparation and care',
    topics: ['Trimester guide', 'Prenatal vitamins', 'Appointment checklist', 'Postpartum basics'],
  },
  {
    name: 'Nutrition',
    icon: IconLeaf,
    desc: 'Everyday eating for energy and wellbeing',
    topics: ['Iron-rich foods', 'Cycle-friendly meals', 'Hydration habits', 'Simple meal prep'],
  },
  {
    name: 'Mental Wellness',
    icon: IconMoon,
    desc: 'Mood, stress, sleep and self-awareness',
    topics: ['Managing stress', 'Sleep habits', 'Mood swings across your cycle', 'Mindfulness basics'],
  },
  {
    name: 'Fitness',
    icon: IconDumbbell,
    desc: 'Movement that fits your cycle and life',
    topics: ['Exercise across your cycle', 'Beginner workouts', 'Why rest days matter', 'Staying active at your desk'],
  },
  {
    name: 'Self-Care',
    icon: IconSparkle,
    desc: 'Routines that help you recharge',
    topics: ['Evening routines', 'Digital detox', 'Skin and body care', 'Setting boundaries'],
  },
  {
    name: 'General Health',
    icon: IconPulse,
    desc: 'Everyday health habits and checkups',
    topics: ['Annual checkups', 'Vitamins and supplements', 'Healthy daily habits', 'Building a symptom journal'],
  },
]

export default function Topics() {
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(null)

  const normalized = query.trim().toLowerCase()

  const matches = useMemo(() => {
    if (!normalized) return CATEGORIES
    return CATEGORIES.filter(
      (c) =>
        c.name.toLowerCase().includes(normalized) ||
        c.desc.toLowerCase().includes(normalized) ||
        c.topics.some((t) => t.toLowerCase().includes(normalized))
    )
  }, [normalized])

  const activeCategory = matches.find((c) => c.name === active) || null

  const clear = () => {
    setQuery('')
    setActive(null)
  }

  return (
    <section id="topics" className="section topics-section">
      <div className="topics-glow" aria-hidden="true" />

      <div className="container">
        <div className="topics-head reveal">
          <span className="section-eyebrow">Health topics</span>
          <h2 className="section-title">
            Explore women&apos;s
            <br />
            <em>health topics.</em>
          </h2>
          <p className="section-sub">
            Search a question or browse by category — from menstrual health to
            mental wellness, it&apos;s all here in plain language.
          </p>
        </div>

        <form
          className="topics-search reveal"
          role="search"
          onSubmit={(e) => e.preventDefault()}
        >
          <span className="topics-search-icon" aria-hidden="true">
            <IconSearch size={19} />
          </span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search women's health topics..."
            aria-label="Search women's health topics"
          />
          {query && (
            <button
              type="button"
              className="topics-clear"
              onClick={clear}
              aria-label="Clear search"
            >
              <IconClose size={16} />
            </button>
          )}
        </form>

        <p className="topics-count" aria-live="polite">
          {normalized
            ? `${matches.length} of ${CATEGORIES.length} categories match "${query.trim()}"`
            : `${CATEGORIES.length} categories to explore`}
        </p>

        {matches.length === 0 ? (
          <div className="topics-empty">
            <span className="topics-empty-icon" aria-hidden="true">
              <IconSearch size={22} />
            </span>
            <p>No topics match "{query.trim()}". Try "cycle", "nutrition" or "sleep" instead.</p>
            <button type="button" className="btn btn-ghost btn-sm" onClick={clear}>
              Clear search
            </button>
          </div>
        ) : (
          <div className="topics-grid">
            {matches.map((c) => {
              const Icon = c.icon
              const isActive = active === c.name
              return (
                <button
                  key={c.name}
                  type="button"
                  className={`topic-card ${isActive ? 'is-active' : ''}`}
                  aria-pressed={isActive}
                  onClick={() => setActive(isActive ? null : c.name)}
                >
                  <span className="topic-icon" aria-hidden="true">
                    <Icon size={20} />
                  </span>
                  <span className="topic-name">{c.name}</span>
                  <span className="topic-desc">{c.desc}</span>
                </button>
              )
            })}
          </div>
        )}

        {activeCategory && (
          <div className="topics-panel">
            <div className="topics-panel-head">
              <span className="topics-panel-icon" aria-hidden="true">
                {(() => {
                  const Icon = activeCategory.icon
                  return <Icon size={20} />
                })()}
              </span>
              <div>
                <h3>{activeCategory.name}</h3>
                <p>{activeCategory.desc}</p>
              </div>
              <button
                type="button"
                className="topics-panel-close"
                onClick={() => setActive(null)}
                aria-label={`Close ${activeCategory.name} topics`}
              >
                <IconClose size={16} />
              </button>
            </div>
            <ul className="topics-panel-list">
              {activeCategory.topics.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  )
}
