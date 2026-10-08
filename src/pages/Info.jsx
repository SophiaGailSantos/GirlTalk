import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import './Info.css'

const PAGES = {
  about: {
    eyebrow: 'About GirlTalk',
    title: 'A space made for women.',
    lead: "GirlTalk is an accessible women's health and wellness platform designed to help women learn, track, and manage their everyday health — in one welcoming place.",
    blocks: [
      {
        h: 'What you can do on GirlTalk',
        list: [
          'Track your menstrual cycle and see predictions',
          'Read weekly women’s health blogs and wellness tips',
          'Set birth control reminders that keep you on schedule',
          'Set general health reminders for medications, appointments and routines',
          'Search for specific women’s health topics',
          'Browse health categories from menstrual health to mental wellness',
        ],
      },
      {
        h: 'Who it is for',
        p: 'GirlTalk is for anyone who wants clear, approachable information about women’s health, plus simple tools to manage everyday wellbeing without the clutter.',
      },
      {
        h: 'Our promise',
        p: 'Privacy first, plain language, and content that informs without alarming. GirlTalk is educational — for medical concerns, always consult a healthcare professional.',
      },
    ],
  },

  contact: {
    eyebrow: 'Contact',
    title: 'We’d love to hear from you.',
    lead: 'Questions, feedback, or an idea for GirlTalk? Send it our way — we read every message.',
    blocks: [
      {
        h: 'Email',
        p: 'hello@girltalk.health',
      },
      {
        h: 'What to expect',
        p: 'We aim to reply within a few working days. If you’re reporting a problem, include what you were doing and which device you used — it helps us fix things faster.',
      },
      {
        h: 'Medical questions',
        p: "GirlTalk can't provide personal medical advice. For anything about your health, please speak to a qualified healthcare professional.",
      },
    ],
  },

  privacy: {
    eyebrow: 'Privacy Policy',
    title: 'Your health information stays yours.',
    lead: 'Health information is personal. This policy explains what GirlTalk stores, what it doesn’t, and the choices you stay in control of.',
    blocks: [
      {
        h: 'What we store',
        p: 'Account details you provide (name, email, password) and the entries you create — cycles, symptoms, reminders — are stored locally in your browser on your device.',
      },
      {
        h: 'What we never do',
        p: 'We do not sell your data, and we do not use your health information for advertising.',
      },
      {
        h: 'Control & removal',
        p: 'You can update your profile at any time. Clearing your browser storage removes your local GirlTalk data from that device.',
      },
      {
        h: 'Questions',
        p: 'If you have questions about this policy, contact us at hello@girltalk.health.',
      },
    ],
  },

  terms: {
    eyebrow: 'Terms of Service',
    title: 'The simple version of our terms.',
    lead: 'By using GirlTalk you agree to these terms. They are written in plain language on purpose.',
    blocks: [
      {
        h: 'Using GirlTalk',
        p: 'You are responsible for keeping your account details safe and for using the platform and its content appropriately.',
      },
      {
        h: 'Not medical advice',
        p: 'GirlTalk provides general educational information and self-tracking tools. It is not a substitute for professional medical advice, diagnosis, or treatment.',
      },
      {
        h: 'Predictions & content',
        p: 'Cycle predictions, reminders and articles are estimates for general guidance. Always seek professional advice for health concerns.',
      },
      {
        h: 'Changes to these terms',
        p: 'We may update these terms as GirlTalk evolves. Continuing to use the platform means you accept the current version.',
      },
    ],
  },
}

const INFO_LINKS = [
  { label: 'About', to: '/about', key: 'about' },
  { label: 'Contact', to: '/contact', key: 'contact' },
  { label: 'Privacy Policy', to: '/privacy', key: 'privacy' },
  { label: 'Terms of Service', to: '/terms', key: 'terms' },
]

export default function Info({ page }) {
  const content = PAGES[page] || PAGES.about

  return (
    <>
      <Navbar />

      <main className="info-page">
        <section className="section section-light info-section">
          <div className="container info-container">
            <nav className="info-chips" aria-label="Information pages">
              {INFO_LINKS.map((l) => (
                <Link
                  key={l.key}
                  to={l.to}
                  className={l.key === page ? 'is-active' : ''}
                >
                  {l.label}
                </Link>
              ))}
            </nav>

            <span className="section-eyebrow">{content.eyebrow}</span>
            <h1 className="info-title">{content.title}</h1>
            <p className="info-lead">{content.lead}</p>

            <div className="info-blocks">
              {content.blocks.map((b) => (
                <div key={b.h} className="info-block">
                  <h2>{b.h}</h2>
                  {b.p && <p>{b.p}</p>}
                  {b.list && (
                    <ul>
                      {b.list.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>

            <Link to="/" className="info-back">
              Back to home
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
