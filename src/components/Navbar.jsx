import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { siteConfig } from '../data/siteData'

const navLinks = [
  { label: 'Home',     to: '/' },
  { label: 'Research', to: '/research' },
  { label: 'Demo',     to: '/demo' },
  { label: 'Blog',     to: '/blog' },
]

export default function Navbar() {
  const [scrolled,     setScrolled]     = useState(false)
  const [menuOpen,     setMenuOpen]     = useState(false)
  const { pathname } = useLocation()

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false) }, [pathname])

  // Detect scroll to switch nav background
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <header
        style={{
          position:   'fixed',
          top:        0,
          left:       0,
          right:      0,
          zIndex:     100,
          height:     'var(--nav-height)',
          transition: 'background 0.3s ease, border-color 0.3s ease',
          background: scrolled
            ? 'rgba(5, 5, 8, 0.92)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled
            ? '1px solid var(--border)'
            : '1px solid transparent',
        }}
      >
        <div
          className="site-container"
          style={{
            height:         '100%',
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'space-between',
          }}
        >
          {/* ── Logo / Brand Mark ─────────────────────────────── */}
          <Link
            to="/"
            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}
            aria-label="Home"
          >
            {/* Logo image */}
            <img
              src="/logo.png"
              alt="SN The AI Master"
              style={{
                width:     '44px',
                height:    '44px',
                objectFit: 'contain',
                flexShrink: 0,
              }}
            />
            {/* Brand name — hidden on small screens */}
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}
                 className="hidden sm:flex">
              <span style={{
                fontFamily:    'var(--font-display)',
                fontWeight:    700,
                fontSize:      '0.95rem',
                color:         'var(--warm-white)',
                letterSpacing: '-0.01em',
              }}>
                {siteConfig.name}
              </span>
              <span style={{
                fontFamily:    'var(--font-mono)',
                fontSize:      '0.62rem',
                color:         'var(--teal)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}>
                The AI MasTer
              </span>
            </div>
          </Link>

          {/* ── Desktop Navigation ────────────────────────────── */}
          <nav className="hidden md:flex" style={{ alignItems: 'center', gap: '0.25rem' }}>
            {navLinks.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                style={({ isActive }) => ({
                  fontFamily:   'var(--font-body)',
                  fontSize:     '0.88rem',
                  fontWeight:   isActive ? 500 : 400,
                  color:        isActive ? 'var(--warm-white)' : 'var(--muted)',
                  padding:      '0.4rem 0.85rem',
                  borderRadius: '2px',
                  transition:   'color 0.2s ease',
                  position:     'relative',
                  textDecoration: 'none',
                })}
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        style={{
                          position:   'absolute',
                          bottom:     '-2px',
                          left:       '0.85rem',
                          right:      '0.85rem',
                          height:     '1.5px',
                          background: 'var(--indigo)',
                          borderRadius: '1px',
                        }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}

            {/* Contact CTA */}
            <Link
              to="/contact"
              className="btn-amber"
              style={{ marginLeft: '0.75rem', fontSize: '0.85rem', padding: '0.5rem 1.25rem' }}
            >
              Get in touch
            </Link>
          </nav>

          {/* ── Mobile Hamburger ──────────────────────────────── */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(v => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            style={{
              background: 'none',
              border:     'none',
              cursor:     'pointer',
              padding:    '0.5rem',
              color:      'var(--warm-white)',
              display:    'flex',
              flexDirection: 'column',
              gap:        '5px',
            }}
          >
            <span style={{
              display:    'block',
              width:      '22px',
              height:     '1.5px',
              background: 'var(--warm-white)',
              transition: 'all 0.3s ease',
              transform:  menuOpen ? 'rotate(45deg) translateY(6.5px)' : 'none',
            }} />
            <span style={{
              display:    'block',
              width:      '22px',
              height:     '1.5px',
              background: 'var(--warm-white)',
              transition: 'all 0.3s ease',
              opacity:    menuOpen ? 0 : 1,
            }} />
            <span style={{
              display:    'block',
              width:      '22px',
              height:     '1.5px',
              background: 'var(--warm-white)',
              transition: 'all 0.3s ease',
              transform:  menuOpen ? 'rotate(-45deg) translateY(-6.5px)' : 'none',
            }} />
          </button>
        </div>
      </header>

      {/* ── Mobile Full-Screen Menu ───────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{   opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              position:   'fixed',
              inset:      0,
              zIndex:     99,
              background: 'rgba(5, 5, 8, 0.97)',
              backdropFilter: 'blur(12px)',
              display:    'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap:        '2rem',
            }}
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.to}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
              >
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  onClick={() => setMenuOpen(false)}
                  style={({ isActive }) => ({
                    fontFamily:  'var(--font-display)',
                    fontSize:    '2rem',
                    fontWeight:  700,
                    color:       isActive ? 'var(--indigo)' : 'var(--warm-white)',
                    textDecoration: 'none',
                  })}
                >
                  {link.label}
                </NavLink>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navLinks.length * 0.07 }}
              style={{ marginTop: '1rem' }}
            >
              <Link
                to="/contact"
                className="btn-amber"
                onClick={() => setMenuOpen(false)}
                style={{ fontSize: '1rem', padding: '0.75rem 2rem' }}
              >
                Get in touch
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
