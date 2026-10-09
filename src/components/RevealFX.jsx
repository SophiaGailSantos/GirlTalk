import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/*
 * Reveals elements with the .reveal class as they scroll into view.
 *
 * The animation is decorative, so it must never hide content: anything already
 * in the viewport is revealed immediately, and a safety timeout reveals
 * everything else in case the observer never fires.
 */
export default function RevealFX() {
  const { pathname } = useLocation()

  useEffect(() => {
    const els = Array.from(document.querySelectorAll('.reveal:not(.is-visible)'))

    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-visible'))
      return
    }

    const show = (el) => el.classList.add('is-visible')

    // First paint: reveal whatever is already on screen.
    const inViewport = () =>
      els.filter((el) => {
        const r = el.getBoundingClientRect()
        return r.top < window.innerHeight && r.bottom > 0
      })
    inViewport().forEach(show)

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            show(entry.target)
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.05, rootMargin: '0px 0px -5% 0px' }
    )
    els.forEach((el) => io.observe(el))

    // Safety net: never leave content invisible if the observer misses it.
    const timer = setTimeout(() => els.forEach(show), 1200)

    return () => {
      clearTimeout(timer)
      io.disconnect()
    }
  }, [pathname])

  return null
}