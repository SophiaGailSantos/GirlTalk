import { Link } from 'react-router-dom'
import './Logo.css'

export default function Logo() {
  return (
    <Link to="/" className="brand" aria-label="GirlTalk home">
      <span className="brand-mark" aria-hidden="true">
        <svg
          viewBox="0 0 32 32"
          width="19"
          height="19"
          fill="none"
          stroke="#ffffff"
          strokeWidth="2.6"
          strokeLinecap="round"
        >
          {/* Open cycle ring */}
          <path d="M19.25 7.07A9.5 9.5 0 1 1 12.75 7.07" />
          {/* Today marker */}
          <circle cx="16" cy="16" r="3.1" fill="#ffffff" stroke="none" />
        </svg>
      </span>
      <span className="brand-word">
        Girl<em>Talk</em>
      </span>
    </Link>
  )
}
