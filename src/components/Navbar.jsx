import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Services' },
  { label: 'Solutions' },
  { label: 'Work' },
  { label: 'About' },
  { label: 'Insights' },
]

function Brand() {
  return (
    <Link to="/" className="snai-brand" aria-label="SNAI home">
      <span className="snai-mark" aria-hidden="true">S</span>
      <span className="snai-wordmark">SNAI</span>
    </Link>
  )
}

function NavItem({ link, mobile = false, onSelect }) {
  if (link.to) {
    return (
      <NavLink
        to={link.to}
        end={link.to === '/'}
        className={({ isActive }) => `snai-nav-link ${isActive ? 'is-active' : ''}`.trim()}
        onClick={onSelect}
      >
        {link.label}
      </NavLink>
    )
  }

  return (
    <button
      type="button"
      className="snai-nav-link"
      aria-disabled="true"
      title={`${link.label} coming soon`}
      onClick={onSelect}
    >
      {link.label}
      {mobile && <span className="visually-hidden"> coming soon</span>}
    </button>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const reduceMotion = useReducedMotion()
  const { pathname } = useLocation()

  useEffect(() => { setMenuOpen(false) }, [pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen)
    return () => document.body.classList.remove('menu-open')
  }, [menuOpen])

  return (
    <>
      <header className={`snai-header ${scrolled ? 'is-scrolled' : ''} ${menuOpen ? 'is-open' : ''}`.trim()}>
        <div className="site-container snai-nav-shell">
          <Brand />

          <nav className="snai-desktop-nav" aria-label="Primary navigation">
            {navLinks.map(link => (
              <NavItem key={link.label} link={link} />
            ))}
          </nav>

          <div className="snai-header-actions">
            <Link to="/contact" className="btn-primary">
              Start a Project
            </Link>

            <button
              type="button"
              className="snai-menu-button"
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMenuOpen(open => !open)}
            >
              <span>Menu</span>
              <span className="snai-menu-lines" aria-hidden="true">
                <span />
                <span />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-navigation"
            className="snai-mobile-menu"
            initial={reduceMotion ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: reduceMotion ? 0 : 0.18, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <nav className="site-container snai-mobile-menu-inner" aria-label="Mobile navigation">
              {navLinks.map(link => (
                <NavItem key={link.label} link={link} mobile onSelect={() => !link.to && setMenuOpen(false)} />
              ))}
              <Link to="/contact" className="btn-primary" onClick={() => setMenuOpen(false)}>
                Start a Project
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
