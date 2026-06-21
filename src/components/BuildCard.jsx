import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const accentMap = {
  indigo: 'var(--indigo)',
  teal:   'var(--teal)',
  amber:  'var(--amber)',
}

/**
 * BuildCard — Displays one of the three "What I Build" domain cards.
 *
 * Props from buildDomains in siteData.js:
 *   icon, title, description, accent, link, linkLabel
 *   index — stagger delay index
 */
export default function BuildCard({ icon, title, description, accent, link, linkLabel, index = 0 }) {
  const accentColor = accentMap[accent] || 'var(--indigo)'

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      style={{
        background:    'var(--surface)',
        border:        '1px solid var(--border)',
        borderRadius:  '4px',
        padding:       '2rem',
        display:       'flex',
        flexDirection: 'column',
        gap:           '1rem',
        transition:    'border-color 0.3s ease, transform 0.3s ease',
        cursor:        'default',
        position:      'relative',
        overflow:      'hidden',
      }}
      whileHover={{
        borderColor: accentColor,
        y: -3,
      }}
    >
      {/* Top accent line */}
      <div style={{
        position:   'absolute',
        top:        0,
        left:       0,
        right:      0,
        height:     '2px',
        background: accentColor,
        opacity:    0.6,
      }} />

      {/* Icon glyph */}
      <span style={{
        fontFamily: 'var(--font-mono)',
        fontSize:   '1.5rem',
        color:      accentColor,
        lineHeight: 1,
      }}>
        {icon}
      </span>

      {/* Title */}
      <h3 style={{
        fontFamily:  'var(--font-display)',
        fontSize:    '1.15rem',
        fontWeight:  700,
        color:       'var(--warm-white)',
        letterSpacing: '-0.01em',
        lineHeight:  1.2,
      }}>
        {title}
      </h3>

      {/* Description */}
      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize:   '0.9rem',
        color:      'var(--muted)',
        lineHeight: 1.7,
        flexGrow:   1,
      }}>
        {description}
      </p>

      {/* Link */}
      {link && (
        <Link
          to={link}
          style={{
            fontFamily:    'var(--font-mono)',
            fontSize:      '0.75rem',
            color:         accentColor,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            transition:    'opacity 0.2s',
            marginTop:     '0.5rem',
          }}
          onMouseEnter={e => e.target.style.opacity = '0.7'}
          onMouseLeave={e => e.target.style.opacity = '1'}
        >
          {linkLabel}
        </Link>
      )}
    </motion.div>
  )
}
