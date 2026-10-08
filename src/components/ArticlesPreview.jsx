import { Link } from 'react-router-dom'
import { IconArrow, IconClock } from './icons.jsx'
import './ArticlesPreview.css'

const ARTICLES = [
  {
    cat: 'Menstrual Health',
    title: 'Understanding Your Menstrual Cycle',
    desc: 'What happens during each phase of your cycle — and what is completely normal.',
    read: '6 min read',
    img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=900&q=80&auto=format&fit=crop',
  },
  {
    cat: 'Hormonal Health',
    title: 'Things Every Woman Should Know About Hormonal Health',
    desc: 'How hormones shape your mood, energy, sleep, and your cycle.',
    read: '7 min read',
    img: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=900&q=80&auto=format&fit=crop',
  },
  {
    cat: 'Self-Care',
    title: 'Simple Ways to Take Better Care of Your Body',
    desc: 'Small, realistic habits that support your everyday wellbeing.',
    read: '5 min read',
    img: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=900&q=80&auto=format&fit=crop',
  },
  {
    cat: 'Birth Control',
    title: 'Understanding Your Birth Control Options',
    desc: 'A plain-language guide to common methods and how to stay on schedule.',
    read: '8 min read',
    img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=900&q=80&auto=format&fit=crop',
  },
]

export default function ArticlesPreview() {
  return (
    <section id="blogs" className="section section-light blogs">
      <div className="container">
        <div className="blogs-head reveal">
          <div>
            <span className="section-eyebrow">Weekly blogs</span>
            <h2 className="section-title">
              Learn something new
              <br />
              <em>about your health.</em>
            </h2>
            <p className="section-sub">
              Fresh, easy-to-read content on women&apos;s health, wellness,
              lifestyle and self-care — written to actually help.
            </p>
          </div>

          <Link to="/articles" className="blogs-all">
            View all articles
            <IconArrow size={15} />
          </Link>
        </div>

        <div className="blogs-grid">
          {ARTICLES.map((a) => (
            <article key={a.title} className="blog-card reveal">
              <Link to="/articles" className="blog-media" tabIndex={-1} aria-hidden="true">
                <img
                  src={a.img}
                  alt=""
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                />
                <span className="blog-cat">{a.cat}</span>
              </Link>

              <div className="blog-body">
                <h3>
                  <Link to="/articles">{a.title}</Link>
                </h3>
                <p>{a.desc}</p>
                <div className="blog-foot">
                  <span className="blog-read">
                    <IconClock size={13} />
                    {a.read}
                  </span>
                  <Link to="/articles" className="blog-more">
                    Read More
                    <IconArrow size={14} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="blogs-note reveal">
          New articles added every week · Educational content, not a substitute
          for professional medical advice.
        </p>
      </div>
    </section>
  )
}
