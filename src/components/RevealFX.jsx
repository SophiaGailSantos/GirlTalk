import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Reveals elements with the .reveal class as they scroll into view.
 * Re-scans whenever the route changes so newly mounted pages animate too.
 */
export default function RevealFX() {
  const { pathname } = useLocation()

  useEffect(() => {
    const els = Array.from(document.querySelectorAll('.reveal:not(.is-visible)'))

    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-visible'))
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 }
    )

    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [pathname])

  return null
}
