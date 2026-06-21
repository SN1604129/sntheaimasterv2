import { motion } from 'framer-motion'

/**
 * ResearchCard — Displays a publication or research project.
 *
 * Props:
 *   type      — 'publication' | 'project'
 *   title     — paper/project title
 *   authors   — author string (publications only)
 *   venue     — conference or journal name (publications)
 *   year      — publication year
 *   publisher — IEEE / Taylor & Francis etc.
 *   abstract  — plain-language summary
 *   tags      — array of tag strings
 *   doi       — DOI link (publications)
 *   pdf       — PDF URL
 *   status    — Active / Completed / Prototype (projects)
 *   methodology — methodology string (projects)
 *   index     — stagger delay index
 */
export default function ResearchCard({
  type = 'publication',
  title,
  authors,
  venue,
  year,
  publisher,
  abstract,
  tags = [],
  doi,
  pdf,
  status,
  methodology,
  index = 0,
}) {
  const isPublication = type === 'publication'

  const statusColors = {
    'Active':    { bg: 'rgba(108, 99, 255, 0.12)', color: 'var(--indigo)' },
    'Completed': { bg: 'rgba(0, 212, 194, 0.12)',  color: 'var(--teal)' },
    'Prototype': { bg: 'rgba(255, 159, 67, 0.12)', color: 'var(--amber)' },
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      style={{
        background:   'var(--surface)',
        border:       '1px solid var(--border)',
        borderRadius: '4px',
        padding:      '2rem',
        transition:   'border-color 0.3s ease',
      }}
      whileHover={{ borderColor: 'var(--dim)' }}
    >
      {/* ── Top meta row ─────────────────────────────────────── */}
      <div style={{
        display:    'flex',
        alignItems: 'center',
        gap:        '0.75rem',
        flexWrap:   'wrap',
        marginBottom: '1rem',
      }}>
        {/* Type badge */}
        <span className="mono-label" style={{
          background:   isPublication ? 'rgba(108, 99, 255, 0.12)' : 'rgba(0, 212, 194, 0.12)',
          color:        isPublication ? 'var(--indigo)' : 'var(--teal)',
          padding:      '0.2rem 0.6rem',
          borderRadius: '2px',
          fontSize:     '0.62rem',
        }}>
          {isPublication ? 'Publication' : 'Research'}
        </span>

        {/* Status badge (projects) */}
        {!isPublication && status && (
          <span className="mono-label" style={{
            ...statusColors[status],
            padding:      '0.2rem 0.6rem',
            borderRadius: '2px',
            fontSize:     '0.62rem',
          }}>
            {status}
          </span>
        )}

        {/* Publisher / year */}
        {publisher && (
          <span style={{
            fontFamily:    'var(--font-mono)',
            fontSize:      '0.7rem',
            color:         'var(--dim)',
            letterSpacing: '0.04em',
          }}>
            {publisher} · {year}
          </span>
        )}
        {!publisher && year && (
          <span style={{
            fontFamily:    'var(--font-mono)',
            fontSize:      '0.7rem',
            color:         'var(--dim)',
            letterSpacing: '0.04em',
          }}>
            {year}
          </span>
        )}
      </div>

      {/* ── Title ────────────────────────────────────────────── */}
      <h3 style={{
        fontFamily:   'var(--font-display)',
        fontSize:     '1.1rem',
        fontWeight:   700,
        color:        'var(--warm-white)',
        lineHeight:   1.3,
        marginBottom: '0.5rem',
        letterSpacing: '-0.01em',
      }}>
        {title}
      </h3>

      {/* Authors (publications) */}
      {authors && (
        <p style={{
          fontFamily:   'var(--font-mono)',
          fontSize:     '0.72rem',
          color:        'var(--dim)',
          marginBottom: '0.5rem',
          letterSpacing: '0.02em',
        }}>
          {authors}
        </p>
      )}

      {/* Venue (publications) */}
      {venue && (
        <p style={{
          fontFamily:   'var(--font-body)',
          fontStyle:    'italic',
          fontSize:     '0.85rem',
          color:        'var(--muted)',
          marginBottom: '1rem',
        }}>
          {venue}
        </p>
      )}

      {/* ── Abstract / Description ───────────────────────────── */}
      {abstract && (
        <p className="serif-prose" style={{
          fontSize:     '0.9rem',
          marginBottom: '1rem',
          lineHeight:   1.75,
        }}>
          {abstract}
        </p>
      )}

      {/* Methodology (projects) */}
      {methodology && (
        <p style={{
          fontFamily:   'var(--font-mono)',
          fontSize:     '0.72rem',
          color:        'var(--indigo)',
          letterSpacing: '0.03em',
          marginBottom: '1rem',
          lineHeight:   1.6,
        }}>
          ↳ {methodology}
        </p>
      )}

      {/* ── Tags ─────────────────────────────────────────────── */}
      {tags.length > 0 && (
        <div style={{
          display:    'flex',
          flexWrap:   'wrap',
          gap:        '0.4rem',
          marginBottom: (doi || pdf) ? '1.25rem' : 0,
        }}>
          {tags.map(tag => (
            <span key={tag} style={{
              fontFamily:    'var(--font-mono)',
              fontSize:      '0.65rem',
              color:         'var(--dim)',
              border:        '1px solid var(--border)',
              borderRadius:  '2px',
              padding:       '0.2rem 0.5rem',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}>
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* ── Action links ─────────────────────────────────────── */}
      {(doi || pdf) && (
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          {doi && (
            <a
              href={doi}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily:    'var(--font-mono)',
                fontSize:      '0.72rem',
                color:         'var(--indigo)',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                transition:    'opacity 0.2s',
              }}
              onMouseEnter={e => e.target.style.opacity = '0.7'}
              onMouseLeave={e => e.target.style.opacity = '1'}
            >
              ↗ View DOI
            </a>
          )}
          {pdf && (
            <a
              href={pdf}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily:    'var(--font-mono)',
                fontSize:      '0.72rem',
                color:         'var(--teal)',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                transition:    'opacity 0.2s',
              }}
              onMouseEnter={e => e.target.style.opacity = '0.7'}
              onMouseLeave={e => e.target.style.opacity = '1'}
            >
              ↓ PDF
            </a>
          )}
        </div>
      )}
    </motion.article>
  )
}
