import { Link } from 'react-router-dom'
import { siteConfig } from '../data/siteData'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{
      borderTop:  '1px solid var(--border)',
      background: 'var(--void)',
      padding:    '3rem 0 2rem',
      marginTop:  '4rem',
    }}>
      <div className="site-container">
        {/* ── Top Row ─────────────────────────────────────────── */}
        <div style={{
          display:              'grid',
          gridTemplateColumns:  'auto 1fr auto',
          alignItems:           'start',
          gap:                  '2rem',
          marginBottom:         '3rem',
        }}
          className="footer-grid"
        >
          {/* Brand */}
          <div>
            <div style={{
              display:     'flex',
              alignItems:  'center',
              gap:         '0.75rem',
              marginBottom: '0.75rem',
            }}>
              <div style={{
                width:        '32px',
                height:       '32px',
                background:   'var(--indigo)',
                borderRadius: '2px',
                display:      'flex',
                alignItems:   'center',
                justifyContent: 'center',
                flexShrink:   0,
              }}>
                <span style={{
                  fontFamily:  'var(--font-display)',
                  fontWeight:  800,
                  fontSize:    '12px',
                  color:       '#fff',
                }}>SN</span>
              </div>
              <span style={{
                fontFamily:  'var(--font-display)',
                fontWeight:  700,
                fontSize:    '0.9rem',
                color:       'var(--warm-white)',
              }}>
                {siteConfig.name}
              </span>
            </div>
            <p style={{
              fontFamily:  'var(--font-mono)',
              fontSize:    '0.7rem',
              color:       'var(--dim)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}>
              Signal over noise.
            </p>
          </div>

          {/* Spacer */}
          <div />

          {/* Navigation columns */}
          <div style={{ display: 'flex', gap: '3rem' }}>
            {/* Navigate */}
            <div>
              <p className="mono-label" style={{ marginBottom: '1rem', fontSize: '0.65rem' }}>Navigate</p>
              <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {[
                  { label: 'Home',     to: '/' },
                  { label: 'Research', to: '/research' },
                  { label: 'Contact',  to: '/contact' },
                ].map(link => (
                  <Link
                    key={link.to}
                    to={link.to}
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize:   '0.85rem',
                      color:      'var(--muted)',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={e => e.target.style.color = 'var(--warm-white)'}
                    onMouseLeave={e => e.target.style.color = 'var(--muted)'}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Connect */}
            <div>
              <p className="mono-label" style={{ marginBottom: '1rem', fontSize: '0.65rem' }}>Connect</p>
              <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {[
                  { label: 'LinkedIn', href: siteConfig.linkedin },
                  { label: 'GitHub',   href: siteConfig.github },
                  { label: 'Email',    href: `mailto:${siteConfig.email}` },
                ].map(link => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize:   '0.85rem',
                      color:      'var(--muted)',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={e => e.target.style.color = 'var(--warm-white)'}
                    onMouseLeave={e => e.target.style.color = 'var(--muted)'}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* ── Bottom Bar ──────────────────────────────────────── */}
        <div style={{
          borderTop:      '1px solid var(--border)',
          paddingTop:     '1.5rem',
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'space-between',
          flexWrap:       'wrap',
          gap:            '0.75rem',
        }}>
          <p style={{
            fontFamily:  'var(--font-mono)',
            fontSize:    '0.7rem',
            color:       'var(--dim)',
            letterSpacing: '0.04em',
          }}>
            © {year} {siteConfig.name} · {siteConfig.location}
          </p>
          <p style={{
            fontFamily:  'var(--font-mono)',
            fontSize:    '0.7rem',
            color:       'var(--dim)',
            letterSpacing: '0.04em',
          }}>
            Built with purpose.
          </p>
        </div>
      </div>

      {/* Responsive footer grid */}
      <style>{`
        @media (max-width: 640px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  )
}
