import { useState } from 'react'
import './ArticlesPage.css'

const ARTICLES = [
  {
    cat: 'Period Health',
    title: 'Understanding Your Menstrual Cycle',
    image: 'https://images.pexels.com/photos/5239919/pexels-photo-5239919.jpeg?auto=compress&cs=tinysrgb&w=1200',
    photoCredit: 'https://www.pexels.com/photo/5239919/',
    desc: 'What actually happens during each phase of your cycle — and why it matters for your energy, mood, and body.',
    read: '7 min read',
    accent: 'rose',
    featured: true,
    body: ["Your menstrual cycle is more than just your period. It is a roughly 28-day pattern (anything from 21 to 35 days is normal) driven by four shifting hormones: estrogen, progesterone, FSH, and LH.", "During your menstrual phase, which usually lasts 3 to 7 days, your uterine lining sheds, and this can come with cramps, fatigue, and mood changes.", "The follicular phase follows: estrogen rises and you may feel more energetic and clear-headed. This is your body preparing to release an egg.", "Around day 14, ovulation happens — one ovary releases an egg, and some people notice a small energy boost or mild one-sided discomfort.", "In the luteal phase, progesterone rises, and it's common to feel more tired, bloated, or emotional. If no pregnancy begins, hormone levels fall and the cycle restarts.", "Knowing your phases helps you plan workouts, rest days, and important events around your body's natural rhythm."],
  },
  {
    cat: 'Self-Care',
    title: 'Simple Ways to Practice Self-Care During Your Period',
    image: 'https://images.pexels.com/photos/6632930/pexels-photo-6632930.jpeg?auto=compress&cs=tinysrgb&w=1200',
    photoCredit: 'https://www.pexels.com/photo/6632930/',
    desc: 'Small, realistic habits that can help you feel more comfortable and rested on your period days.',
    read: '5 min read',
    accent: 'beige',
    body: ["Your period is a time to slow down. Even small comforts can make a difference.", "Warmth helps: a heating pad or a warm bath can ease cramps more effectively than many people expect.", "Stay hydrated and keep salty snacks to a minimum to reduce bloating. Ginger or chamomile tea is a gentle option.", "Prioritize rest — going to bed a little earlier or taking a short nap gives your body the energy to cope.", "Light movement like a short walk or a few stretches releases endorphins that act as natural pain relief.", "Most importantly, be kind to yourself. It's okay to say no to plans and to put your own comfort first."],
  },
  {
    cat: 'Cycle Health',
    title: 'When Should You Pay Attention to Changes in Your Cycle?',
    image: 'https://images.pexels.com/photos/10223038/pexels-photo-10223038.jpeg?auto=compress&cs=tinysrgb&w=1200',
    photoCredit: 'https://www.pexels.com/photo/10223038/',
    desc: 'Occasional variation is normal — but some changes are worth noting and discussing with a healthcare professional.',
    read: '6 min read',
    accent: 'blush',
    body: ["Some variation month to month is normal, especially if you are a teen, were recently pregnant, or are approaching menopause.", "Still, a few changes are worth noting: missing three or more periods in a row, bleeding much heavier than usual, severe pain that stops you from normal activities, or cycles consistently shorter than 21 or longer than 35 days.", "Spotting between periods, new intense pain during sex, or pain when urinating are also good reasons to check in with a professional.", "Keeping a simple log of your cycle days, flow, and symptoms gives any doctor useful context.", "If something feels off or is affecting your life, talk to a healthcare provider — your concerns are valid."],
  },
  {
    cat: 'Wellness',
    title: 'Sleep, Energy, and Your Cycle: What to Expect',
    image: 'https://images.pexels.com/photos/7622515/pexels-photo-7622515.jpeg?auto=compress&cs=tinysrgb&w=1200',
    photoCredit: 'https://www.pexels.com/photo/7622515/',
    desc: 'Why your energy levels shift throughout the month, and how to work with your body instead of against it.',
    read: '5 min read',
    accent: 'beige',
    body: ["Your energy follows your hormones throughout the month.", "In the follicular phase, rising estrogen often brings more energy, focus, and better sleep.", "Around ovulation, many people feel their most social and energetic — a great time for demanding work or workouts.", "After ovulation, progesterone rises and can make you sleepier or need more rest. Poor sleep is common in the days before your period.", "During your period, fatigue is common. Listen to your body: swap intense workouts for walks or yoga, and protect your sleep schedule.", "Small habits — consistent bedtimes, limiting caffeine late in the day, and planning easier days before your period — can make a big difference."],
  },
  {
    cat: 'Nutrition',
    title: 'Gentle Nutrition Tips for Every Phase of Your Cycle',
    image: 'https://images.pexels.com/photos/6823369/pexels-photo-6823369.jpeg?auto=compress&cs=tinysrgb&w=1200',
    photoCredit: 'https://www.pexels.com/photo/6823369/',
    desc: 'No strict diets — just simple, supportive food ideas that can help you feel your best all month long.',
    read: '4 min read',
    accent: 'blush',
    body: ["Food can support your body differently at different times of the month. No strict diets needed.", "During your period, iron-rich foods such as lentils, spinach, and lean meats can help replace what you lose. Pair them with vitamin C for better absorption.", "In the follicular phase, focus on fresh vegetables, whole grains, and lean proteins to support rising energy.", "Around ovulation, add healthy fats like avocado, nuts, and olive oil to help hormone production.", "In the luteal phase, magnesium-rich foods — bananas, dark chocolate, pumpkin seeds — can ease cramps and mood swings. Complex carbs help steady energy.", "Hydrate well and limit excess salt and sugar, especially right before your period, to reduce bloating."],
  },
  {
    cat: 'Mind',
    title: 'Cycle-Synced Journaling: A Beginner-Friendly Practice',
    image: 'https://images.pexels.com/photos/7623657/pexels-photo-7623657.jpeg?auto=compress&cs=tinysrgb&w=1200',
    photoCredit: 'https://www.pexels.com/photo/7623657/',
    desc: 'How a few minutes of journaling each day can help you notice patterns in your mood, energy, and cycle.',
    read: '6 min read',
    accent: 'rose',
    body: ["Cycle syncing your journal simply means noticing how your mood, energy, and focus change across the month.", "Each evening, write down three things: your energy level, your mood, and one sentence about your day. It takes two minutes.", "After a couple of months, read back through your entries. You may notice patterns — like creative bursts mid-cycle or a slump before your period.", "Use those insight to plan: schedule hard conversations during your high-energy days, and protect lighter, rest-focused days before your period.", "There's no right way to do this. The goal is awareness, not perfection — be curious, not critical."],
  },
]

export default function Articles() {
  const [selected, setSelected] = useState(null)
  const featured = ARTICLES.find((a) => a.featured)
  const rest = ARTICLES.filter((a) => !a.featured)

  if (selected) {
    return (
      <div className="page articles-page">
        <div className="container">
          <button type="button" className="ap-back" onClick={() => setSelected(null)}>
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
              <button type="button" className="ap-link" onClick={() => setSelected(featured)}>
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
                  <button type="button" className="ap-link" onClick={() => setSelected(a)}>
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
