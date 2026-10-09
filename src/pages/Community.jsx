import { useState } from 'react'
import { Link } from 'react-router-dom'
import './CommunityPage.css'

const SEED_COMMENTS = {
  'How do you usually prepare for your period?': [
    { name: 'Ana', text: 'I mark the dates on my calendar and pack a little comfort kit the week before.' },
    { name: 'Maya', text: 'I make sure to plan easier workouts and keep heat pads ready.' },
  ],
  'What helped you understand your cycle better?': [
    { name: 'Jules', text: 'Tracking for a few months showed me patterns I never noticed.' },
  ],
  "What's one self-care habit you actually enjoy?": [
    { name: 'Bea', text: 'My 20-minute evening tea-and-journal routine. It changed everything.' },
  ],
  'How do you handle cramps at work?': [
    { name: 'Ria', text: 'Heat pad under my desk and saying no to extra tasks that week.' },
  ],
  'Gentle movement during your period — yay or nay?': [
    { name: 'Kira', text: 'Yay for yoga! Intense workouts just make cramps worse for me.' },
  ],
}

const DISCUSSIONS = [
  {
    topic: 'How do you usually prepare for your period?',
    cat: 'Period Experiences',
    replies: 42,
    likes: 128,
    preview: 'Stocking up on supplies, adjusting my schedule, and giving myself a little extra rest the week before…',
    color: 'rose',
  },
  {
    topic: 'What helped you understand your cycle better?',
    cat: 'Cycle Health',
    replies: 35,
    likes: 96,
    preview: 'Tracking for three months straight finally showed me the pattern I could never see before…',
    color: 'beige',
  },
  {
    topic: "What's one self-care habit you actually enjoy?",
    cat: 'Self-Care',
    replies: 56,
    likes: 203,
    preview: 'Mine is a 20-minute evening routine: herbal tea, stretching, and writing down three things that went well…',
    color: 'blush',
  },
  {
    topic: 'How do you handle cramps at work?',
    cat: 'Period Experiences',
    replies: 38,
    likes: 87,
    preview: 'Heat pads, gentle movement, and saying no to plans I don&apos;t have energy for. What about you?',
    color: 'rose',
  },
  {
    topic: 'Gentle movement during your period — yay or nay?',
    cat: 'Wellness',
    replies: 19,
    likes: 64,
    preview: 'I used to push through intense workouts, but switching to walks and yoga changed everything for me.',
    color: 'beige',
  },
]

export default function Community() {
  const [open, setOpen] = useState(null)
  const [draft, setDraft] = useState('')
  const [comments, setComments] = useState(() => ({ ...SEED_COMMENTS }))

  const postReply = (e) => {
    e.preventDefault()
    const text = draft.trim()
    if (!text || !open) return
    setComments((prev) => ({
      ...prev,
      [open.topic]: [...(prev[open.topic] || []), { name: 'You', text }],
    }))
    setDraft('')
  }

  if (open) {
    const list = comments[open.topic] || []
    return (
      <div className="page community-page">
        <div className="container">
          <button type="button" className="ap-back" onClick={() => { setOpen(null); setDraft('') }}>
            &larr; Back to community
          </button>
          <article className="community-card">
            <span className="community-cat">{open.cat}</span>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 32, margin: '10px 0' }}>{open.topic}</h1>
            <p style={{ color: 'var(--ink-soft)' }}>{open.preview}</p>
          </article>

          <div className="community-thread">
            <h3 style={{ margin: '28px 0 14px', color: 'var(--charcoal)' }}>{list.length} comment{list.length === 1 ? '' : 's'}</h3>
            {list.map((c, i) => (
              <div key={i} className="community-comment">
                <strong>{c.name}</strong>
                <p>{c.text}</p>
              </div>
            ))}
            <form onSubmit={postReply} className="community-reply-form">
              <textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Share your experience…"
                rows={3}
              />
              <button type="submit" className="btn btn-primary">Post reply</button>
            </form>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="page community-page">
      <div className="container">
        <header className="page-header reveal">
          <span className="section-eyebrow">Community</span>
          <h1 className="section-title">What&apos;s happening in the community?</h1>
          <p className="section-sub">
            Join conversations, share your experiences, and learn from other
            women in a moderated, supportive space.
          </p>
        </header>

        <div className="community-list">
          {DISCUSSIONS.map((d) => (
            <article key={d.topic} className="community-card reveal">
              <div className="community-card-main">
                <div className="community-card-top">
                  <span className="community-avatar" aria-hidden="true">
                    {d.topic.charAt(0)}
                  </span>
                  <div>
                    <span className="community-cat">{d.cat}</span>
                    <h3>{d.topic}</h3>
                  </div>
                </div>
                <p>{d.preview}</p>
              </div>
              <div className="community-card-side">
                <div className="community-metrics">
                  <span className="community-replies">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                    {d.replies} replies
                  </span>
                  <span className="community-likes">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M12 21s-7.5-4.7-10-9.3C.4 8.6 2.4 5 5.7 5c1.9 0 3.3 1 4.3 2.6h4c1-1.6 2.4-2.6 4.3-2.6 3.3 0 5.3 3.6 3.7 6.7C19.5 16.3 12 21 12 21z" />
                    </svg>
                    {d.likes}
                  </span>
                </div>
                <button type="button" className="community-view" onClick={() => setOpen(d)}>View Discussion</button>
              </div>
            </article>
          ))}
        </div>

        <div className="community-note reveal">
          <p>
            GirlTalk community members are fellow users sharing their own
            experiences and perspectives. They are not medical professionals.
            Always consult a healthcare provider for medical concerns.
          </p>
          <Link to="/profile" className="btn btn-primary community-explore">
            Explore Community
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}
